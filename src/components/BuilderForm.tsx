import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Tooltip } from './Tooltip';
import type { SkillFormData } from '../lib/presets';
import { presets } from '../lib/presets';

interface BuilderFormProps {
  formData: SkillFormData;
  onChange: (data: SkillFormData) => void;
  errors: Record<string, boolean>;
}

export function BuilderForm({ formData, onChange, errors }: BuilderFormProps) {
  const [showExamples, setShowExamples] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>('meeting-prep');

  function updateField<K extends keyof SkillFormData>(key: K, value: SkillFormData[K]) {
    onChange({ ...formData, [key]: value });
  }

  function updateListItem(key: 'instructions' | 'alwaysDo' | 'neverDo', idx: number, value: string) {
    const list = [...formData[key]];
    list[idx] = value;
    onChange({ ...formData, [key]: list });
  }

  function addListItem(key: 'instructions' | 'alwaysDo' | 'neverDo') {
    onChange({ ...formData, [key]: [...formData[key], ''] });
  }

  function removeListItem(key: 'instructions' | 'alwaysDo' | 'neverDo', idx: number) {
    const minCount = key === 'instructions' ? 1 : 1;
    if (formData[key].length <= minCount) return;
    const list = formData[key].filter((_, i) => i !== idx);
    onChange({ ...formData, [key]: list });
  }

  function loadPreset(presetName: string) {
    const preset = presets.find((p) => p.data.name === presetName);
    if (preset) {
      onChange({ ...preset.data });
      setActivePreset(presetName);
      setShowExamples(
        Boolean(preset.data.goodExample.trim() || preset.data.badExample.trim())
      );
    }
  }

  function handleNameChange(value: string) {
    const sanitized = value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40);
    updateField('name', sanitized);
    setActivePreset(null);
  }

  return (
    <div className="space-y-7">
      {/* Preset selector */}
      <div>
        <p className="section-label mb-4" style={{ fontFamily: 'var(--ob1-font-body)' }}>Templates</p>
        <div className="m-[10px] flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.data.name}
              type="button"
              onClick={() => loadPreset(preset.data.name)}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                activePreset === preset.data.name
                  ? 'bg-orange text-white'
                  : 'bg-parchment/10 text-parchment hover:bg-parchment/20'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Name */}
      <div>
        <label htmlFor="skill-name" className="mb-1.5 flex items-center text-sm font-semibold text-parchment">
          Skill Name
          <Tooltip content="Use lowercase with hyphens. This becomes the folder name. Example: meeting-prep" />
        </label>
        <input
          id="skill-name"
          type="text"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g. meeting-prep"
          className={`ob1-input ${errors.name ? 'error' : ''}`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-[#e74c3c]">Required: lowercase letters and hyphens only.</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="skill-desc" className="mb-1.5 flex items-center text-sm font-semibold text-parchment">
          Description
          <Tooltip content="This is the ~100 token metadata Claude always sees. It determines when Claude triggers this skill. Be specific about the use case." />
        </label>
        <input
          id="skill-desc"
          type="text"
          value={formData.description}
          onChange={(e) => {
            updateField('description', e.target.value.slice(0, 200));
            setActivePreset(null);
          }}
          placeholder="e.g. Prep talking points for any meeting"
          maxLength={200}
          className={`ob1-input ${errors.description ? 'error' : ''}`}
        />
        <div className="mt-1 flex justify-between text-xs text-stone">
          {errors.description ? (
            <span className="text-[#e74c3c]">Required.</span>
          ) : (
            <span />
          )}
          <span>{formData.description.length}/200</span>
        </div>
      </div>

      {/* Trigger */}
      <div>
        <label htmlFor="skill-trigger" className="mb-1.5 flex items-center text-sm font-semibold text-parchment">
          Trigger Phrase
          <Tooltip content="What would a user type that should activate this skill? Think about natural language." />
        </label>
        <input
          id="skill-trigger"
          type="text"
          value={formData.trigger}
          onChange={(e) => {
            updateField('trigger', e.target.value);
            setActivePreset(null);
          }}
          placeholder='e.g. prep me for a meeting with...'
          className={`ob1-input ${errors.trigger ? 'error' : ''}`}
        />
        {errors.trigger && (
          <p className="mt-1 text-xs text-[#e74c3c]">Required.</p>
        )}
      </div>

      {/* Instructions */}
      <div>
        <label className="mb-1.5 flex items-center text-sm font-semibold text-parchment">
          Instructions
          <Tooltip content="Step-by-step instructions Claude follows. Be specific but concise. Each instruction should be one clear action." />
        </label>
        <div className="space-y-2">
          {formData.instructions.map((instruction, idx) => (
            <div key={idx} className="animate-row-in flex items-start gap-2">
              <span className="mt-3 shrink-0 text-xs font-bold text-orange">{idx + 1}.</span>
              <textarea
                value={instruction}
                onChange={(e) => {
                  updateListItem('instructions', idx, e.target.value);
                  setActivePreset(null);
                }}
                placeholder="e.g. Research the person's LinkedIn and company"
                rows={2}
                className="ob1-input resize-none"
                aria-label={`Instruction ${idx + 1}`}
              />
              {formData.instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeListItem('instructions', idx)}
                  className="mt-2.5 shrink-0 cursor-pointer text-stone transition-colors duration-150 hover:text-[#e74c3c]"
                  aria-label={`Remove instruction ${idx + 1}`}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
        {errors.instructions && (
          <p className="mt-1 text-xs text-[#e74c3c]">At least one instruction is required.</p>
        )}
        <button
          type="button"
          onClick={() => addListItem('instructions')}
          className="ob1-btn-outline mt-2 inline-flex cursor-pointer items-center gap-1 px-3 py-1.5 text-xs"
        >
          <Plus size={14} />
          Add instruction
        </button>
      </div>

      {/* Always Do */}
      <div>
        <label className="mb-1.5 flex items-center text-sm font-semibold text-parchment">
          Always Do
          <Tooltip content="Guardrails. What must Claude do every time this skill runs?" />
        </label>
        <div className="space-y-2">
          {formData.alwaysDo.map((rule, idx) => (
            <div key={idx} className="animate-row-in flex items-center gap-2">
              <input
                type="text"
                value={rule}
                onChange={(e) => {
                  updateListItem('alwaysDo', idx, e.target.value);
                  setActivePreset(null);
                }}
                placeholder="e.g. Include their name in the first line"
                className="ob1-input"
                aria-label={`Always do rule ${idx + 1}`}
              />
              {formData.alwaysDo.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeListItem('alwaysDo', idx)}
                  className="shrink-0 cursor-pointer text-stone transition-colors duration-150 hover:text-[#e74c3c]"
                  aria-label={`Remove always rule ${idx + 1}`}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => addListItem('alwaysDo')}
          className="ob1-btn-outline mt-2 inline-flex cursor-pointer items-center gap-1 px-3 py-1.5 text-xs"
        >
          <Plus size={14} />
          Add rule
        </button>
      </div>

      {/* Never Do */}
      <div>
        <label className="mb-1.5 flex items-center text-sm font-semibold text-parchment">
          Never Do
          <Tooltip content='Anti-patterns. What should Claude avoid? These are your "nega-prompts."' />
        </label>
        <div className="space-y-2">
          {formData.neverDo.map((rule, idx) => (
            <div key={idx} className="animate-row-in flex items-center gap-2">
              <input
                type="text"
                value={rule}
                onChange={(e) => {
                  updateListItem('neverDo', idx, e.target.value);
                  setActivePreset(null);
                }}
                placeholder="e.g. Use generic openers"
                className="ob1-input"
                aria-label={`Never do rule ${idx + 1}`}
              />
              {formData.neverDo.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeListItem('neverDo', idx)}
                  className="shrink-0 cursor-pointer text-stone transition-colors duration-150 hover:text-[#e74c3c]"
                  aria-label={`Remove never rule ${idx + 1}`}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => addListItem('neverDo')}
          className="ob1-btn-outline mt-2 inline-flex cursor-pointer items-center gap-1 px-3 py-1.5 text-xs"
        >
          <Plus size={14} />
          Add rule
        </button>
      </div>

      {/* Examples (collapsible) */}
      <div>
        <div className="flex w-full items-center gap-2">
          <button
            type="button"
            onClick={() => setShowExamples(!showExamples)}
            className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-parchment"
          >
            Examples (optional)
            {showExamples ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <Tooltip content="Examples are the most powerful teaching tool. Show Claude what great output looks like, and what to avoid." />
        </div>
        {showExamples && (
          <div className="animate-row-in mt-3 space-y-4">
            <div>
              <label htmlFor="good-example" className="mb-1.5 block text-xs font-semibold text-parchment/80">
                Good Example
              </label>
              <textarea
                id="good-example"
                value={formData.goodExample}
                onChange={(e) => {
                  updateField('goodExample', e.target.value);
                  setActivePreset(null);
                }}
                placeholder="Show Claude what great output looks like..."
                rows={5}
                className="ob1-input resize-y"
                style={{ fontFamily: 'var(--ob1-font-mono)', fontSize: '13px', fontWeight: 600 }}
              />
            </div>
            <div>
              <label htmlFor="bad-example" className="mb-1.5 block text-xs font-semibold text-parchment/80">
                Bad Example
              </label>
              <textarea
                id="bad-example"
                value={formData.badExample}
                onChange={(e) => {
                  updateField('badExample', e.target.value);
                  setActivePreset(null);
                }}
                placeholder="Show Claude what to avoid..."
                rows={5}
                className="ob1-input resize-y"
                style={{ fontFamily: 'var(--ob1-font-mono)', fontSize: '13px', fontWeight: 600 }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
