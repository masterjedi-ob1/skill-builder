import type { VercelRequest, VercelResponse } from '@vercel/node';

const LC_BASE_URL = 'https://rest.gohighlevel.com/v1';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers for the SPA
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const data = req.body as {
    name: string;
    email: string;
    company?: string;
  };

  if (!data.name || !data.email) {
    return res.status(400).json({ ok: false, error: 'name and email required' });
  }

  const nameParts = data.name.trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  const email = data.email.trim();
  const company = data.company || '';
  const timestamp = new Date().toISOString();

  console.log(`[LEAD] ${timestamp} | ${email} | ${data.name} | ${company}`);

  // ---- Backup: Google Sheets via Apps Script Web App ----
  // This always works, zero auth needed. Create a Google Apps Script:
  // 1. New Google Sheet > Extensions > Apps Script
  // 2. Paste: function doPost(e) { var d=JSON.parse(e.postData.contents); SpreadsheetApp.getActive().getSheets()[0].appendRow([new Date(),d.name,d.email,d.company]); return ContentService.createTextOutput("ok"); }
  // 3. Deploy as web app (anyone can access)
  // 4. Set GOOGLE_SHEET_WEBHOOK env var to the web app URL
  const sheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK;
  if (sheetWebhook) {
    fetch(sheetWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: data.name.trim(), email, company, timestamp }),
    }).catch((e) => console.warn('Google Sheet backup failed:', e));
  }

  // ---- Primary: LeadConnector CRM ----
  const LC_API_KEY = process.env.LC_API_KEY;
  const LC_LOCATION_ID = process.env.LC_LOCATION_ID;

  if (!LC_API_KEY || !LC_LOCATION_ID) {
    console.warn('LeadConnector env vars not set, lead saved to logs only');
    return res.status(200).json({ ok: true, fallback: 'logs-only', email });
  }

  const contactPayload = {
    firstName,
    lastName,
    email,
    companyName: company,
    source: 'Skill Builder - skills.ob1ai.co',
  };

  try {
    console.log('[LC] Creating contact:', JSON.stringify(contactPayload));

    const createRes = await fetch(`${LC_BASE_URL}/contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LC_API_KEY}`,
      },
      body: JSON.stringify(contactPayload),
    });

    const responseText = await createRes.text();
    console.log('[LC] Response:', createRes.status, responseText);

    if (!createRes.ok) {
      console.error('[LC] Contact creation failed:', createRes.status, responseText);
      return res.status(200).json({ ok: false, error: responseText, fallback: 'logs' });
    }

    let contactId = '';
    try {
      const parsed = JSON.parse(responseText);
      contactId = parsed.contact?.id || '';
    } catch {
      console.warn('[LC] Could not parse response');
    }

    // Add tags (non-blocking)
    if (contactId) {
      const tags = ['skill-builder', 'lead-magnet', 'ai-woodstock'];
      fetch(`${LC_BASE_URL}/contacts/${contactId}/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LC_API_KEY}`,
          },
        body: JSON.stringify({ tags }),
      }).catch((e) => console.warn('[LC] Tag assignment failed:', e));
    }

    console.log('[LC] Lead captured:', contactId, email);
    return res.status(200).json({ ok: true, contactId });
  } catch (e) {
    console.error('[LC] Capture error:', e);
    return res.status(200).json({ ok: false, error: String(e), fallback: 'logs' });
  }
}
