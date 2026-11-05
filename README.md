# Mygent — rasmiy sayt

- `apps/web` — **Next.js 15** sayt (dark/light, RWD, 5 soniyalik ro‘yxatdan o‘tish modali, SEO)
- `apps/api` — **NestJS 11** API: `POST /api/leads` → arizani Telegram botga yuboradi

Kerak: **Node.js 20+**

## 1. O‘rnatish

```bash
cd C:\Users\user\Desktop\mygent
npm install
```

## 2. Telegram botni ulash (bir marta)

1. Telegramda botingizni oching va **/start** yuboring.
   Arizalar guruhga kelsin desangiz — botni guruhga qo‘shib, guruhda biror xabar yozing.
2. So‘ng:

```bash
npm run chat-id
```

Skript chat ID ni topib, `apps/api/.env` dagi `TELEGRAM_CHAT_ID` ga o‘zi yozadi.

3. Tekshirish (botdan sinov xabari keladi):

```bash
npm run test:telegram
```

## 3. Ishga tushirish

```bash
npm run dev
```

- Sayt: http://localhost:3000
- API:  http://localhost:4000/api/health

Formani to‘ldiring — ariza bot orqali Telegramga keladi.

## Production

```bash
npm run build
npm start
```

Serverda Nginx 80/443 → `localhost:3000` (sayt) ga yo‘naltiriladi. Sayt `/api/*` so‘rovlarini o‘zi NestJS ga (`API_URL`) uzatadi,
shuning uchun 4000-portni tashqariga ochish shart emas.

### Server deploy

Production deploy Docker orqali ishlaydi:

```bash
docker compose up -d --build
```

- sayt hostda faqat `127.0.0.1:4701` portida ochiladi;
- `restart: unless-stopped` konteynerni xato yoki server rebootidan keyin qayta ishga tushiradi;
- `deploy/mygent-update.timer` GitHub `main` branch'ini har daqiqada tekshiradi;
- `deploy/nginx.mygent.uz.conf` domen va HTTPS reverse-proxy konfiguratsiyasi.

## Sozlamalar

| Fayl | Nima |
|---|---|
| `apps/api/.env` | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `PORT`, `CORS_ORIGIN` |
| `apps/web/.env.local` | `API_URL` (NestJS manzili), `NEXT_PUBLIC_SITE_URL` (domen) |
| `apps/web/lib/site.ts` | Telegram, telefon, Instagram havolalari, savol-javoblar |
| `apps/web/components/LeadProvider.tsx` | `AUTO_OPEN_MS` — modal necha ms dan keyin ochiladi |

`.env` fayllari `.gitignore` da — tokenni GitHub ga yuklamang.

## Telegramga keladigan xabar

```
🆕 Yangi ariza — mygent.uz
👤 Ism · 📞 Telefon · ✈️ Telegram · 🏷 Soha · 📝 Izoh
📍 Manba (modal / hero / aloqa formasi) · 📊 UTM · 🕒 Vaqt
```

UTM belgilari (`?utm_source=facebook&utm_campaign=...`) avtomatik ushlanadi — qaysi reklamadan ariza kelganini ko‘rasiz.
Ariza yuborilganda `window` da `mygent:lead` hodisasi chiqadi — Meta Pixel ulansa, shu yerda `fbq('track', 'Lead')` chaqiriladi.

## Himoya

- Server tomonda validatsiya (class-validator)
- Bitta IP dan 10 daqiqada 5 tadan ortiq ariza yuborilmaydi
- Spam-botlar uchun yashirin "honeypot" maydon
- Bot token faqat serverda, brauzer kodida yo‘q
