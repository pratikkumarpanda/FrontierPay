// FrontierPay Logo — pure inline SVG, no image file needed
// Works on any background, any basePath, any deployment

interface LogoProps {
  /** Height in pixels. Width scales automatically. Default: 36 */
  height?: number;
  /** Use white wordmark for dark backgrounds. Default: false */
  white?: boolean;
  /** Extra className for the wrapper */
  className?: string;
}

export default function Logo({ height = 36, white = false, className = '' }: LogoProps) {
  const textColor = white ? '#ffffff' : '#0f1f3d';
  const payColor  = white ? '#6ee7a0' : '#1e7c3a';
  const scale     = height / 40; // base design is 40px tall

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 40"
      height={height}
      width={220 * scale}
      className={className}
      aria-label="FrontierPay"
      role="img"
    >
      {/* ── F Icon ── */}
      {/* Top blue swoosh */}
      <path
        d="M4 8 C4 4 7 2 11 2 L30 2 C22 6 16 12 15 20 L8 20 C5 20 4 17 4 14 Z"
        fill="url(#blueGrad)"
      />
      {/* Bottom green swoosh */}
      <path
        d="M6 24 C6 21 8 20 11 20 L22 20 C20 26 18 32 18 38 L10 38 C7 38 6 35 6 32 Z"
        fill="url(#greenGrad)"
      />

      {/* ── Gradients ── */}
      <defs>
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#5b8dee" />
          <stop offset="100%" stopColor="#3b5fe2" />
        </linearGradient>
        <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1e7c3a" />
          <stop offset="100%" stopColor="#145c2b" />
        </linearGradient>
      </defs>

      {/* ── Wordmark ── */}
      {/* "Frontier" */}
      <text
        x="42"
        y="28"
        fontFamily="'Outfit', 'Inter', Arial, sans-serif"
        fontWeight="700"
        fontSize="22"
        fill={textColor}
        letterSpacing="-0.5"
      >
        Frontier
      </text>
      {/* "Pay" */}
      <text
        x="138"
        y="28"
        fontFamily="'Outfit', 'Inter', Arial, sans-serif"
        fontWeight="700"
        fontSize="22"
        fill={payColor}
        letterSpacing="-0.5"
      >
        Pay
      </text>
    </svg>
  );
}
