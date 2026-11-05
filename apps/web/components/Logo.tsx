/** Mygent belgisi: M shakli + pastga yo'nalgan tasdiq ritmi + aqua uchqun (Brandbook 1.0) */
export function LogoMark({ size = 34, inverse = false }: { size?: number; inverse?: boolean }) {
  const leg = inverse ? '#FFFFFF' : 'var(--logo-leg)';
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M20 1.5C20.8 5.5 22.5 7.2 26.5 8C22.5 8.8 20.8 10.5 20 14.5C19.2 10.5 17.5 8.8 13.5 8C17.5 7.2 19.2 5.5 20 1.5Z"
        fill="#2AD6C9"
      />
      <rect x="4" y="16" width="9" height="22" rx="4.5" style={{ fill: leg }} />
      <rect x="27" y="16" width="9" height="22" rx="4.5" style={{ fill: leg }} />
      <path
        d="M8.5 20.5L20 29L31.5 20.5"
        fill="none"
        stroke="#0A68F5"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" className="logo" aria-label="Mygent — bosh sahifa" style={inverse ? { color: '#fff' } : undefined}>
      <LogoMark inverse={inverse} />
      <span className="logo__word">mygent</span>
    </a>
  );
}
