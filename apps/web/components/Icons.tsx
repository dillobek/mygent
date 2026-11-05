import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, strokeWidth = 2, ...rest }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconCheck = (p: P) => <Base strokeWidth={2.4} {...p}><path d="M5 12l5 5 9-10" /></Base>;
export const IconArrow = (p: P) => <Base strokeWidth={2.2} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Base>;
export const IconChevron = (p: P) => <Base {...p}><path d="M6 9l6 6 6-6" /></Base>;
export const IconClose = (p: P) => <Base strokeWidth={2.2} {...p}><path d="M6 6l12 12M18 6L6 18" /></Base>;
export const IconMenu = (p: P) => <Base {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Base>;
export const IconSun = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Base>
);
export const IconMoon = (p: P) => <Base {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></Base>;
export const IconClock = (p: P) => <Base {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Base>;
export const IconChat = (p: P) => <Base {...p}><path d="M4 5h16v11H8l-4 4V5z" /></Base>;
export const IconChatLines = (p: P) => <Base {...p}><path d="M4 5h16v11H8l-4 4V5z" /><path d="M8 9h8M8 12h5" /></Base>;
export const IconDoc = (p: P) => <Base {...p}><path d="M6 3h9l4 4v14H6z" /><path d="M9 12h7M9 16h7" /></Base>;
export const IconStethoscope = (p: P) => (
  <Base {...p}><path d="M5 3v5a5 5 0 0 0 10 0V3" /><path d="M10 13v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></Base>
);
export const IconCalculator = (p: P) => (
  <Base {...p}><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h8" /></Base>
);
export const IconTarget = (p: P) => (
  <Base {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></Base>
);
export const IconMegaphone = (p: P) => <Base {...p}><path d="M3 10v4h4l6 4V6L7 10H3z" /><path d="M17 8.5a5 5 0 0 1 0 7" /></Base>;
export const IconBag = (p: P) => <Base {...p}><path d="M5 7h14l-1 13H6L5 7z" /><path d="M9 7a3 3 0 0 1 6 0" /></Base>;
export const IconPlus = (p: P) => <Base strokeWidth={2.2} {...p}><path d="M12 5v14M5 12h14" /></Base>;
export const IconLink = (p: P) => (
  <Base {...p}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></Base>
);
export const IconShield = (p: P) => <Base {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /></Base>;
export const IconUser = (p: P) => <Base {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Base>;
export const IconChart = (p: P) => <Base {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></Base>;
export const IconSend = (p: P) => <Base {...p}><path d="M21 4L3 11l6 2 2 6 3-4 5 4 2-15z" /></Base>;
export const IconPhone = (p: P) => (
  <Base {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></Base>
);
export const IconGlobe = (p: P) => (
  <Base {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></Base>
);

/** Brend uchquni (aqua) */
export function Spark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 2C21.4 11 29 18.6 38 20C29 21.4 21.4 29 20 38C18.6 29 11 21.4 2 20C11 18.6 18.6 11 20 2Z" fill="#2AD6C9" />
    </svg>
  );
}
