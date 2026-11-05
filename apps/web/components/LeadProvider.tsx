'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { LeadForm } from './LeadForm';
import { IconClose, Spark } from './Icons';

/** Sahifa ochilgandan necha soniyadan keyin modal chiqadi */
const AUTO_OPEN_MS = 5000;
const SEEN_KEY = 'mg_lead_modal_seen';

type Ctx = { open: (source?: string) => void };
const LeadCtx = createContext<Ctx>({ open: () => {} });
export const useLeadModal = () => useContext(LeadCtx);

function ss(fn: () => void) {
  try {
    fn();
  } catch {}
}

export function LeadProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [source, setSource] = useState('modal');
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((src = 'modal') => {
    lastFocus.current = document.activeElement as HTMLElement;
    setSource(src);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    ss(() => sessionStorage.setItem(SEEN_KEY, '1'));
    lastFocus.current?.focus?.();
  }, []);

  // UTM belgilarini saqlab qo'yamiz (reklama samaradorligini ko'rish uchun)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const parts = keys.filter((k) => p.get(k)).map((k) => `${k.replace('utm_', '')}=${p.get(k)}`);
    if (p.get('fbclid')) parts.push('fbclid');
    if (parts.length) ss(() => sessionStorage.setItem('mg_utm', parts.join(', ')));
  }, []);

  // 5 soniyadan keyin avtomatik ochish (sessiyada bir marta)
  useEffect(() => {
    let seen = false;
    ss(() => {
      seen = sessionStorage.getItem(SEEN_KEY) === '1' || sessionStorage.getItem('mg_lead_sent') === '1';
    });
    if (seen) return;
    const t = window.setTimeout(() => {
      setOpen((already) => {
        if (!already) {
          lastFocus.current = document.activeElement as HTMLElement;
          setSource('modal');
        }
        return true;
      });
    }, AUTO_OPEN_MS);
    return () => window.clearTimeout(t);
  }, []);

  // Ochiq paytda: scroll bloklash, Esc bilan yopish, fokusni ichkarida ushlash
  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add('no-scroll');
    // Fokus oynaning o'ziga: telefonda klaviatura o'zi ochilib ketmasin
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && dialogRef.current) {
        const els = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([tabindex="-1"]), select, textarea',
        );
        if (!els.length) return;
        const a = els[0];
        const b = els[els.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          b.focus();
        } else if (!e.shiftKey && document.activeElement === b) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  return (
    <LeadCtx.Provider value={{ open }}>
      {children}
      {isOpen && (
        <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div ref={dialogRef} className="modal__card" tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="lead-title">
            <button type="button" className="icon-btn modal__close" onClick={close} aria-label="Oynani yopish">
              <IconClose />
            </button>
            <div className="modal__head">
              <span className="pill"><Spark size={14} /> Ro‘yxatdan o‘tish</span>
              <h2 id="lead-title">Sohangiz uchun AI agentni birga loyihalaymiz</h2>
              <p className="muted" style={{ fontSize: 15 }}>
                Ma’lumot qoldiring — mutaxassisimiz siz bilan Telegram yoki telefon orqali bog‘lanadi.
              </p>
            </div>
            <LeadForm source={source} closable onDone={close} titleId="lead-title-done" />
          </div>
        </div>
      )}
    </LeadCtx.Provider>
  );
}

/** Istalgan joyda modalni ochadigan tugma */
export function OpenLeadButton({
  source,
  className = 'btn btn--primary',
  children,
}: {
  source: string;
  className?: string;
  children: ReactNode;
}) {
  const { open } = useLeadModal();
  return (
    <button type="button" className={className} onClick={() => open(source)}>
      {children}
    </button>
  );
}
