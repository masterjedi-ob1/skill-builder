import { CodeBlock } from './CodeBlock';
import type { SkillFormData } from '../lib/presets';
import { generateSkillMd } from '../lib/skillGenerator';

interface SkillPreviewProps {
  formData: SkillFormData;
}

export function SkillPreview({ formData }: SkillPreviewProps) {
  const content = generateSkillMd(formData);

  return (
    <div>
      <p className="section-label mb-3">Live Preview</p>
      <CodeBlock
        content={content}
        filename={formData.name ? `${formData.name}/SKILL.md` : 'SKILL.md'}
      />
    </div>
  );
}
