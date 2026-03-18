export function Header() {
  return (
    <header className="relative z-10 border-b-2 border-orange bg-blue">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8">
        <span
          className="text-base font-extrabold tracking-[0.15em] text-orange uppercase sm:text-lg"
          style={{ fontFamily: 'var(--ob1-font-heading)' }}
        >
          OB.1 AI SOLUTIONS
        </span>
        <span
          className="text-sm font-semibold tracking-[0.1em] text-parchment/80 uppercase sm:text-base"
          style={{ fontFamily: 'var(--ob1-font-heading)' }}
        >
          SKILL BUILDER
        </span>
      </div>
    </header>
  );
}
