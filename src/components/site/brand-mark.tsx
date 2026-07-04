export function BrandMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="25" cy="29" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M43 15c-8 5-11 12-8 19 2 5 8 7 10 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M36 36c3 5 2 10-4 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M41 36l10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
