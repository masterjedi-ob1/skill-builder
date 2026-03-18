export function BlueprintGrid() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="animate-grid-drift h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="fine-grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="#4A7FB5"
              strokeWidth="0.5"
              opacity="0.03"
            />
          </pattern>
          <pattern
            id="primary-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <rect width="40" height="40" fill="url(#fine-grid)" />
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#4A7FB5"
              strokeWidth="1"
              opacity="0.08"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#primary-grid)" />
      </svg>
    </div>
  );
}
