import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onStartBuilding: () => void;
}

export function Hero({ onStartBuilding }: HeroProps) {
  return (
    <section className="relative z-10 px-6 py-16 text-center md:py-24">
      <div className="animate-fade-in-up mx-auto max-w-3xl">
        <p className="section-label mb-6">Skill Builder</p>
        <h1
          className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-parchment md:text-5xl lg:text-6xl"
          style={{ fontFamily: 'var(--ob1-font-heading)' }}
        >
          Build Your First Claude Skill
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-cream/80">
          Turn your repetitive workflows into reusable AI expertise. No code required.
        </p>
        <button
          type="button"
          onClick={onStartBuilding}
          className="ob1-btn-primary inline-flex cursor-pointer items-center gap-2 px-8 py-4 text-lg"
        >
          Start Building
          <ArrowDown size={20} />
        </button>
      </div>
    </section>
  );
}
