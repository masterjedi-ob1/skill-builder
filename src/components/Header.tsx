export function Header() {
  return (
    <header className="relative z-10 border-b-2 border-orange bg-blue">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 sm:py-5">
        {/* Brand wordmark */}
        <a
          href="https://ob1ai.co"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-0.5 no-underline transition-opacity duration-150 hover:opacity-80"
          aria-label="OB.1 AI Solutions homepage"
        >
          <span
            className="text-sm font-extrabold tracking-[0.18em] text-orange uppercase sm:text-base"
            style={{ fontFamily: 'var(--ob1-font-body)' }}
          >
            OB.1 AI SOLUTIONS
          </span>
          <span
            className="hidden text-[10px] tracking-widest text-parchment/40 uppercase sm:block"
            style={{ fontFamily: 'var(--ob1-font-body)' }}
          >
            From Assessment to Architecture.
          </span>
        </a>

        {/* Tool name — Playfair for editorial weight */}
        <div className="flex flex-col items-end gap-0.5">
          <span
            className="text-lg font-bold text-parchment sm:text-xl"
            style={{ fontFamily: 'var(--ob1-font-heading)' }}
          >
            Skill Builder
          </span>
          <span
            className="hidden text-[10px] tracking-widest text-parchment/40 uppercase sm:block"
            style={{ fontFamily: 'var(--ob1-font-body)' }}
          >
            Rules Before Tools.
          </span>
        </div>
      </div>
    </header>
  );
}
