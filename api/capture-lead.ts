import type { VercelRequest, VercelResponse } from '@vercel/node';

const LC_BASE_URL = 'https://services.leadconnectorhq.com';
const LC_API_VERSION = '2021-07-28';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const LC_API_KEY = process.env.LC_API_KEY;
  const LC_LOCATION_ID = process.env.LC_LOCATION_ID;

  if (!LC_API_KEY || !LC_LOCATION_ID) {
    console.warn('LeadConnector env vars not set, lead not captured');
    return res.status(200).json({ ok: false, error: 'env vars not set' });
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

  const contactPayload = {
    firstName,
    lastName,
    email: data.email.trim(),
    companyName: data.company || '',
    locationId: LC_LOCATION_ID,
    source: 'Skill Builder - skills.ob1ai.co',
  };

  try {
    const createRes = await fetch(`${LC_BASE_URL}/contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LC_API_KEY}`,
        Version: LC_API_VERSION,
      },
      body: JSON.stringify(contactPayload),
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      console.error('LC contact creation failed:', createRes.status, err);
      return res.status(200).json({ ok: false, error: err });
    }

    const { contact } = (await createRes.json()) as { contact: { id: string } };
    const contactId = contact.id;

    // Add tags
    const tags = ['skill-builder', 'lead-magnet', 'ai-woodstock'];
    await fetch(`${LC_BASE_URL}/contacts/${contactId}/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LC_API_KEY}`,
        Version: LC_API_VERSION,
      },
      body: JSON.stringify({ tags }),
    }).catch((e) => console.warn('LC tag assignment failed:', e));

    console.log('LC lead captured:', contactId, data.email);
    return res.status(200).json({ ok: true, contactId });
  } catch (e) {
    console.error('LC capture error:', e);
    return res.status(200).json({ ok: false, error: String(e) });
  }
}
