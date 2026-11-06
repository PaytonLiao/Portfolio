/* Small animated SVG illustrations, one per project. Colours come from CSS. */

export default function ProjectArt({ kind }) {
  switch (kind) {
    case 'baby':
      return (
        <svg viewBox="0 0 200 140" className="art art-baby" aria-hidden="true">
          <circle cx="100" cy="34" r="16" className="art-line" />
          <path d="M100 50 V92 M100 60 Q78 70 70 88 M100 60 Q122 70 132 52 M100 92 L84 122 M100 92 L116 122" className="art-line" />
          {[[100, 34], [70, 88], [132, 52], [100, 76], [84, 122], [116, 122]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" className="art-touch" style={{ animationDelay: `${i * 0.5}s` }} />
          ))}
          <text x="10" y="132" className="art-mono">touch → latent z</text>
        </svg>
      )
    case 'vae':
      return (
        <svg viewBox="0 0 200 140" className="art" aria-hidden="true">
          <path d="M20 20 L80 55 L80 85 L20 120 Z" className="art-fill" />
          <path d="M180 20 L120 55 L120 85 L180 120 Z" className="art-fill" />
          <rect x="88" y="58" width="24" height="24" rx="4" className="art-core" />
          {Array.from({ length: 9 }).map((_, i) => (
            <circle key={i} cx={30 + (i % 3) * 14} cy={50 + Math.floor(i / 3) * 18} r="2.4" className="art-dot" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
          <text x="66" y="134" className="art-mono">17,555 → z</text>
        </svg>
      )
    case 'gripper':
      return (
        <svg viewBox="0 0 200 140" className="art" aria-hidden="true">
          <g className="art-grip">
            <rect x="92" y="6" width="16" height="30" className="art-fill" />
            <path d="M100 36 L72 70 L80 92 M100 36 L128 70 L120 92 M100 36 L100 80" className="art-line" />
          </g>
          <rect x="82" y="96" width="36" height="28" rx="3" className="art-obj" />
          <line x1="20" y1="126" x2="180" y2="126" className="art-line" />
          <text x="132" y="40" className="art-mono">p(success)</text>
        </svg>
      )
    case 'launcher':
      return (
        <svg viewBox="0 0 200 140" className="art" aria-hidden="true">
          <g className="art-track">
            <circle cx="100" cy="64" r="26" className="art-line" />
            <path d="M100 30 V46 M100 82 V98 M66 64 H82 M118 64 H134" className="art-line" />
            <circle cx="100" cy="64" r="3" className="art-core" />
          </g>
          <circle cx="0" cy="0" r="4" className="art-candy" />
          <text x="10" y="132" className="art-mono">face lock · ToF 1.42 m</text>
        </svg>
      )
    case 'game':
      return (
        <svg viewBox="0 0 200 140" className="art art-pixel" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x={(i * 37) % 180 + 6} y={(i * 53) % 100 + 10} width="10" height="10" className="art-obj" />
          ))}
          <g className="art-bot">
            <rect x="0" y="0" width="16" height="16" className="art-core" />
            <rect x="4" y="4" width="3" height="3" fill="#000" />
            <rect x="10" y="4" width="3" height="3" fill="#000" />
          </g>
          <text x="148" y="24" fontSize="16">🍔</text>
          <text x="10" y="132" className="art-mono">▶ playable</text>
        </svg>
      )
    default:
      return null
  }
}
