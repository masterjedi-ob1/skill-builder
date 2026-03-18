import { FileText, Brain, Cog, Lightbulb, Layers, Target } from 'lucide-react';

const cards = [
  {
    icon: FileText,
    title: "What's a Skill?",
    body: "A Skill is an SOP packaged for AI. It's a markdown file that teaches Claude your workflow, your rules, and your voice, so it follows them automatically in every conversation.",
  },
  {
    icon: Brain,
    title: 'Why Build Skills?',
    body: "Without a Skill, every new chat starts from zero. You re-type context, re-explain rules, re-describe your brand voice. A Skill remembers it all. It solves the Goldfish Problem: AI has no long-term memory unless you give it one.",
  },
  {
    icon: Cog,
    title: 'How It Works',
    body: 'Define your trigger, write your instructions in plain English, set your rules, and Claude follows them every time. No code, no API, no deployment. The workflow is simple: Define, Generate, Test.',
  },
];

const bestPractices = [
  {
    icon: Target,
    label: 'Concise',
    text: 'Keep SKILL.md under 500 lines. The context window is a shared resource; every token counts.',
  },
  {
    icon: Layers,
    label: 'Progressive',
    text: 'Use external /references and /scripts so Claude only reads what it needs, when it needs it.',
  },
  {
    icon: Lightbulb,
    label: 'Focused',
    text: 'One workflow per skill. Multiple focused skills compose better than one mega-skill.',
  },
];

export function LearnPanel() {
  return (
    <section className="relative z-10 px-5 pb-14 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Explainer cards */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="ob1-card animate-fade-in-up p-5 sm:p-6"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-orange/10">
                    <Icon size={20} className="text-orange" />
                  </div>
                  <h3
                    className="text-base font-bold text-charcoal sm:text-lg"
                    style={{ fontFamily: 'var(--ob1-font-heading)' }}
                  >
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-charcoal/80" style={{ fontFamily: 'var(--ob1-font-body)' }}>
                  {card.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Best practices strip */}
        <div className="mt-10 sm:mt-12">
          <p className="section-label mb-5 sm:mb-6" style={{ fontFamily: 'var(--ob1-font-body)' }}>
            Best Practices
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {bestPractices.map((bp, idx) => {
              const Icon = bp.icon;
              return (
                <div
                  key={bp.label}
                  className="animate-fade-in-up flex items-start gap-3 rounded-md border border-line/20 bg-navy/60 p-4"
                  style={{ animationDelay: `${300 + idx * 80}ms` }}
                >
                  <Icon size={18} className="mt-0.5 shrink-0 text-orange" />
                  <div>
                    <p className="text-sm font-semibold text-parchment" style={{ fontFamily: 'var(--ob1-font-body)' }}>
                      {bp.label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-cream/70" style={{ fontFamily: 'var(--ob1-font-body)' }}>
                      {bp.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
