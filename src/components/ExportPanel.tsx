import { useState } from 'react';
import { Copy, Download, Check, FolderOpen } from 'lucide-react';
import type { SkillFormData } from '../lib/presets';
import { generateSkillMd, downloadSkillFile, copyToClipboard } from '../lib/skillGenerator';

interface ExportPanelProps {
  formData: SkillFormData;
}

export function ExportPanel({ formData }: ExportPanelProps) {
  const [copied, setCopied] = useState(false);
  const content = generateSkillMd(formData);

  async function handleCopy() {
    const ok = await copyToClipboard(content);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleDownload() {
    downloadSkillFile(content, formData.name);
  }

  return (
    <section className="relative z-10 px-6 pb-16">
      <div className="mx-auto max-w-3xl">
        <p className="section-label mb-6">Export Your Skill</p>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Copy */}
          <button
            type="button"
            onClick={handleCopy}
            className="ob1-card flex cursor-pointer items-center gap-4 p-6 transition-shadow duration-200 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange/10">
              {copied ? (
                <Check size={24} className="text-green-600" />
              ) : (
                <Copy size={24} className="text-orange" />
              )}
            </div>
            <div className="text-left">
              <p className="font-bold text-charcoal">
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </p>
              <p className="text-xs text-stone">
                One-click copy of the full SKILL.md content.
              </p>
            </div>
          </button>

          {/* Download */}
          <button
            type="button"
            onClick={handleDownload}
            className="ob1-card flex cursor-pointer items-center gap-4 p-6 transition-shadow duration-200 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange/10">
              <Download size={24} className="text-orange" />
            </div>
            <div className="text-left">
              <p className="font-bold text-charcoal">Download .md File</p>
              <p className="text-xs text-stone">
                Save as {formData.name || 'skill'}.md to your machine.
              </p>
            </div>
          </button>
        </div>

        {/* Install instructions */}
        <div className="mt-8">
          <div className="ob1-card p-6">
            <div className="mb-3 flex items-center gap-2">
              <FolderOpen size={18} className="text-orange" />
              <h3 className="font-bold text-charcoal">How to Install</h3>
            </div>
            <ol className="space-y-2 text-sm text-charcoal/80">
              <li className="flex gap-2">
                <span className="shrink-0 font-bold text-orange">1.</span>
                <span>
                  Create a folder:{' '}
                  <code
                    className="rounded bg-navy px-2 py-0.5 text-xs text-parchment"
                    style={{ fontFamily: 'var(--ob1-font-mono)' }}
                  >
                    skills/{formData.name || 'your-skill-name'}/
                  </code>
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 font-bold text-orange">2.</span>
                <span>
                  Save this file as{' '}
                  <code
                    className="rounded bg-navy px-2 py-0.5 text-xs text-parchment"
                    style={{ fontFamily: 'var(--ob1-font-mono)' }}
                  >
                    SKILL.md
                  </code>{' '}
                  inside that folder.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 font-bold text-orange">3.</span>
                <span>Claude will automatically detect and use your skill.</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
