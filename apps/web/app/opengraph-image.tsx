import { ImageResponse } from 'next/og';

export const alt = 'Mygent — biznes uchun AI agentlar';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Telegram, Facebook, Instagram'da havola ulashilganda chiqadigan rasm
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#071B45',
          color: '#FFFFFF',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="72" height="72" viewBox="0 0 40 40">
            <path d="M20 1.5C20.8 5.5 22.5 7.2 26.5 8C22.5 8.8 20.8 10.5 20 14.5C19.2 10.5 17.5 8.8 13.5 8C17.5 7.2 19.2 5.5 20 1.5Z" fill="#2AD6C9" />
            <rect x="4" y="16" width="9" height="22" rx="4.5" fill="#FFFFFF" />
            <rect x="27" y="16" width="9" height="22" rx="4.5" fill="#FFFFFF" />
            <path d="M8.5 20.5L20 29L31.5 20.5" fill="none" stroke="#0A68F5" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -2 }}>mygent</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            Takroriy ishni AI agent bajaradi.
          </div>
          <div style={{ fontSize: 30, color: '#B9C7E4' }}>
            Shifokor · Buxgalter · Targetolog · Marketing agentligi
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#2AD6C9', fontWeight: 600 }}>mygent.uz</div>
      </div>
    ),
    size,
  );
}
