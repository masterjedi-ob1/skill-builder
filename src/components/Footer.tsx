export function Footer() {
  return (
    <footer className="relative z-10 border-t-[3px] border-orange bg-blue">
      <div className="mx-auto max-w-7xl px-5 py-5 text-center sm:px-8 sm:py-6">
        <p className="text-sm font-semibold text-parchment" style={{ fontFamily: 'var(--ob1-font-body)' }}>
          Built with Claude Skills by OB.1 AI Solutions
        </p>
        <p className="mt-1 text-xs text-stone" style={{ fontFamily: 'var(--ob1-font-body)' }}>
          <a
            href="https://ob1ai.co"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150 hover:text-orange"
          >
            ob1ai.co
          </a>
          {' '}·{' '}
          <a
            href="mailto:chris@ob1ai.co"
            className="transition-colors duration-150 hover:text-orange"
          >
            chris@ob1ai.co
          </a>
          {' '}·{' '}234.602.0500
        </p>
        <p
          className="mt-2 text-xs font-bold tracking-widest text-orange uppercase"
          style={{ fontFamily: 'var(--ob1-font-body)' }}
        >
          Rules Before Tools.
        </p>
      </div>
    </footer>
  );
}
