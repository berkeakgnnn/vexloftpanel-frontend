export function Logo({ size = "default" }: { size?: "default" | "large" }) {
  const isLarge = size === "large";

  return (
    <div className="flex items-center gap-2">
      {/* V icon */}
      <svg
        width={isLarge ? 32 : 26}
        height={isLarge ? 32 : 26}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 6L16 28L26 6"
          stroke="#18181b"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 6L16 16"
          stroke="#6366f1"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* Text */}
      <span
        className={`font-bold tracking-tight text-foreground ${
          isLarge ? "text-2xl" : "text-lg"
        }`}
      >
        <span className="text-foreground">V</span>
        <span className="text-foreground">exloft</span>
      </span>
    </div>
  );
}

export function LogoIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6L16 28L26 6"
        stroke="currentColor"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 6L16 16"
        stroke="#6366f1"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
