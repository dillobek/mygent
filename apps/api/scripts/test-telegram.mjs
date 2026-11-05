// Sinov xabari yuboradi: npm run test:telegram
import { readEnv } from './env.mjs';

const env = readEnv();
const token = env.TELEGRAM_BOT_TOKEN;
const ids = (env.TELEGRAM_CHAT_ID ?? '').split(',').map((s) => s.trim()).filter(Boolean);

if (!token || ids.length === 0) {
  console.error('❌ Avval .env da TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID bo‘lishi kerak (npm run chat-id).');
  process.exit(1);
}

for (const chat_id of ids) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id, text: '✅ Mygent sayti botga ulandi. Arizalar shu yerga keladi.' }),
  }).then((r) => r.json());
  console.log(res.ok ? `✅ ${chat_id} ga yuborildi` : `❌ ${chat_id}: ${res.description}`);
}
