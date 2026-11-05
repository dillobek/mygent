'use client';

import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { IconClose, IconMenu, IconMoon, IconSun } from './Icons';
import { useLeadModal } from './LeadProvider';

const LINKS = [
  { href: '#muammo', label: 'Muammo' },
  { href: '#agentlar', label: 'Agentlar' },
  { href: '#jarayon', label: 'Qanday ishlaydi' },
  { href: '#nazorat', label: 'Nazorat' },
  { href: '#savollar', label: 'Savollar' },
];

type Theme = 'light' | 'dark';

export function Header() {
  const { open } = useLeadModal();
  const [menu, setMenu] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) || 'light');
  }, []);

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('mg_theme', next);
    } catch {}
  }

  return (
    <header className="header">
      <div className="wrap header__bar">
        <Logo />
        <nav className="nav" aria-label="Asosiy menyu">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <div className="header__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Yorug‘ rejimga o‘tish' : 'Qorong‘i rejimga o‘tish'}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
          <button type="button" className="btn btn--primary btn--sm hide-sm" onClick={() => open('header')}>
            Ro‘yxatdan o‘tish
          </button>
          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={() => setMenu((m) => !m)}
            aria-expanded={menu}
            aria-controls="mobile-nav"
            aria-label={menu ? 'Menyuni yopish' : 'Menyuni ochish'}
          >
            {menu ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
      {menu && (
        <div className="mobile-nav" id="mobile-nav">
          <nav className="wrap" aria-label="Mobil menyu">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenu(false)}>{l.label}</a>
            ))}
            <button
              type="button"
              className="btn btn--primary btn--block"
              onClick={() => {
                setMenu(false);
                open('header');
              }}
            >
              Ro‘yxatdan o‘tish
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
