/** Horizontal rule with a soft wave */
export function WavyRule({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-6 w-full ${className}`} aria-hidden>
      <svg
        className="absolute left-0 right-0 top-1/2 h-3 w-full -translate-y-1/2 text-line/25 dark:text-line/20"
        preserveAspectRatio="none"
        viewBox="0 0 1200 12"
      >
        <path
          d="M0 6 Q 30 0 60 6 T 120 6 T 180 6 T 240 6 T 300 6 T 360 6 T 420 6 T 480 6 T 540 6 T 600 6 T 660 6 T 720 6 T 780 6 T 840 6 T 900 6 T 960 6 T 1020 6 T 1080 6 T 1140 6 T 1200 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
