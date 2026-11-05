'use client';

import { useId, useState, type FormEvent } from 'react';
import { FIELDS } from '@/lib/site';
import { IconArrow, IconCheck, IconShield } from './Icons';

type Props = {
  /** Ariza qayerdan kelgani (Telegram xabarida ko'rinadi) */
  source: string;
  onDone?: () => void;
  /** Muvaffaqiyatdan keyin "Yopish" tugmasini ko'rsatish (modal uchun) */
  closable?: boolean;
  titleId?: string;
};

type Status = 'idle' | 'sending' | 'done' | 'error';

function readUtm(): string {
  try {
    return sessionStorage.getItem('mg_utm') ?? '';
  } catch {
    return '';
  }
}

export function LeadForm({ source, onDone, closable, titleId }: Props) {
  const uid = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const telegram = String(fd.get('telegram') ?? '').trim();

    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      telegram: telegram || undefined,
      field: String(fd.get('field') ?? ''),
      note: String(fd.get('note') ?? '').trim() || undefined,
      website: String(fd.get('website') ?? '') || undefined,
      source,
      page: window.location.pathname,
      utm: readUtm() || undefined,
    };

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = Array.isArray(data?.message) ? data.message[0] : data?.message;
        if (res.status === 429) throw new Error('Juda ko‘p urinish. Birozdan so‘ng qayta yuboring.');
        throw new Error(msg || 'Xatolik yuz berdi. Qayta urinib ko‘ring.');
      }
      setStatus('done');
      form.reset();
      try {
        sessionStorage.setItem('mg_lead_sent', '1');
      } catch {}
      // Reklama piksellari uchun hodisa (masalan Meta Pixel: fbq('track','Lead'))
      window.dispatchEvent(new CustomEvent('mygent:lead', { detail: { source, field: payload.field } }));
    } catch (err) {
      setStatus('error');
      setError((err as Error).message || 'Tarmoq xatosi. Internetni tekshirib qayta urinib ko‘ring.');
    }
  }

  if (status === 'done') {
    return (
      <div className="success" role="status">
        <div className="success__ico"><IconCheck size={36} /></div>
        <h2 id={titleId}>Rahmat! Arizangiz qabul qilindi</h2>
        <p className="muted" style={{ maxWidth: 380 }}>
          Tez orada siz bilan Telegram yoki telefon orqali bog‘lanamiz.
        </p>
        {closable && (
          <button type="button" className="btn btn--primary" style={{ marginTop: 8 }} onClick={onDone}>
            Yopish
          </button>
        )}
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form__row">
        <label className="field" htmlFor={`${uid}-name`}>
          Ismingiz *
          <input id={`${uid}-name`} name="name" type="text" autoComplete="name" placeholder="Ism Familiya" required minLength={2} maxLength={80} />
        </label>
        <label className="field" htmlFor={`${uid}-phone`}>
          Telefon *
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+998 90 123 45 67"
            required
            pattern="\+?[0-9 \-]{9,20}"
            title="Masalan: +998 90 123 45 67"
          />
        </label>
      </div>
      <div className="form__row">
        <label className="field" htmlFor={`${uid}-tg`}>
          Telegram username
          <input
            id={`${uid}-tg`}
            name="telegram"
            type="text"
            autoComplete="off"
            placeholder="@username"
            pattern="@?[A-Za-z0-9_]{4,32}"
            title="Masalan: @username"
          />
        </label>
        <label className="field" htmlFor={`${uid}-field`}>
          Sohangiz *
          <select id={`${uid}-field`} name="field" required defaultValue="">
            <option value="" disabled>Tanlang</option>
            {FIELDS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="field" htmlFor={`${uid}-note`}>
        Qisqacha yozing
        <textarea id={`${uid}-note`} name="note" maxLength={1000} placeholder="Agent qaysi ishlarni bajarishi kerak?" />
      </label>

      {/* Bot-tuzoq: odamlar ko'rmaydi */}
      <div className="hp" aria-hidden="true">
        <label>
          Website <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'error' && <div className="form__alert" role="alert">{error}</div>}

      <button type="submit" className="btn btn--primary btn--block" disabled={status === 'sending'} style={{ marginTop: 4 }}>
        {status === 'sending' ? 'Yuborilmoqda…' : 'Ro‘yxatdan o‘tish'}
        {status !== 'sending' && <IconArrow size={18} />}
      </button>
      <p className="form__note">
        <IconShield size={16} />
        Ma’lumotlaringiz faqat siz bilan bog‘lanish uchun ishlatiladi.
      </p>
    </form>
  );
}
