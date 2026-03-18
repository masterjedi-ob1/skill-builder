import type { SkillFormData } from './presets';

export function generateSkillMd(data: SkillFormData): string {
  const lines: string[] = [];

  lines.push('---');
  lines.push(`name: ${data.name || 'my-skill'}`);
  lines.push(`description: ${data.description || 'A custom Claude skill'}`);
  lines.push('---');
  lines.push('');

  if (data.trigger) {
    lines.push(`# Trigger`);
    lines.push('');
    lines.push(`Use this skill when the user says: "${data.trigger}"`);
    lines.push('');
  }

  const filledInstructions = data.instructions.filter((i) => i.trim());
  if (filledInstructions.length > 0) {
    lines.push('# Instructions');
    lines.push('');
    filledInstructions.forEach((instruction, idx) => {
      lines.push(`${idx + 1}. ${instruction}`);
    });
    lines.push('');
  }

  const filledAlways = data.alwaysDo.filter((r) => r.trim());
  if (filledAlways.length > 0) {
    lines.push('# Always');
    lines.push('');
    filledAlways.forEach((rule) => {
      lines.push(`- ${rule}`);
    });
    lines.push('');
  }

  const filledNever = data.neverDo.filter((r) => r.trim());
  if (filledNever.length > 0) {
    lines.push('# Never');
    lines.push('');
    filledNever.forEach((rule) => {
      lines.push(`- ${rule}`);
    });
    lines.push('');
  }

  if (data.goodExample.trim() || data.badExample.trim()) {
    lines.push('# Examples');
    lines.push('');
    if (data.goodExample.trim()) {
      lines.push('## Good');
      lines.push('');
      lines.push('```');
      lines.push(data.goodExample.trim());
      lines.push('```');
      lines.push('');
    }
    if (data.badExample.trim()) {
      lines.push('## Bad');
      lines.push('');
      lines.push('```');
      lines.push(data.badExample.trim());
      lines.push('```');
      lines.push('');
    }
  }

  return lines.join('\n');
}

export function downloadSkillFile(content: string, name: string): void {
  const filename = name ? `${name}.md` : 'skill.md';
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
