import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onStartBuilding: () => void;
}

export function Hero({ onStartBuilding }: HeroProps) {
  return (
    <section className="relative z-10 px-5 py-14 text-center sm:px-8 md:py-24">
      <div className="animate-fade-in-up mx-auto max-w-3xl">
        <p className="section-label mb-5" style={{ fontFamily: 'var(--ob1-font-body)' }}>
          Skill Builder
        </p>
        <h1
          className="mb-5 text-[2.4rem] font-bold leading-[1.15] tracking-tight text-parchment sm:text-5xl lg:text-6xl"
          style={{ fontFamily: 'var(--ob1-font-heading)' }}
        >
          Build Your First
          <br />
          <span className="text-cream/90">Claude Skill</span>
        </h1>
        <p
          className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-cream/70 sm:text-lg"
          style={{ fontFamily: 'var(--ob1-font-body)' }}
        >
          Turn repetitive workflows into reusable AI expertise.
          <br className="hidden sm:block" />
          No code required.
        </p>
        <button
          type="button"
          onClick={onStartBuilding}
          className="ob1-btn-primary inline-flex cursor-pointer items-center gap-2 px-8 py-4 text-base sm:text-lg"
        >
          Start Building
          <ArrowDown size={20} />
        </button>
      </div>
    </section>
  );
}
