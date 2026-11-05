// Botga /start yozgan chatlarni topadi va TELEGRAM_CHAT_ID ni .env ga yozadi.
// Ishga tushirish: npm run chat-id
import { readEnv, setEnvValue } from './env.mjs';

const env = readEnv();
const token = env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('❌ apps/api/.env da TELEGRAM_BOT_TOKEN yo‘q');
  process.exit(1);
}

const me = await fetch(`https://api.telegram.org/bot${token}/getMe`).then((r) => r.json());
if (!me.ok) {
  console.error('❌ Token noto‘g‘ri:', me.description);
  process.exit(1);
}
console.log(`🤖 Bot: @${me.result.username}`);

const upd = await fetch(`https://api.telegram.org/bot${token}/getUpdates`).then((r) => r.json());
if (!upd.ok) {
  console.error('❌ getUpdates xato:', upd.description);
  process.exit(1);
}

const chats = new Map();
for (const u of upd.result) {
  const msg = u.message ?? u.my_chat_member ?? u.channel_post;
  const chat = msg?.chat;
  if (chat) chats.set(String(chat.id), chat);
}

if (chats.size === 0) {
  console.log(`\n⚠️  Hali hech kim yozmagan. Telegramda @${me.result.username} ni oching,`);
  console.log('   /start yuboring va shu buyruqni qayta ishga tushiring: npm run chat-id');
  process.exit(0);
}

console.log('\nTopilgan chatlar:');
for (const [id, c] of chats) {
  const name = c.title ?? [c.first_name, c.last_name].filter(Boolean).join(' ');
  console.log(`  ${id}  —  ${name}${c.username ? ' (@' + c.username + ')' : ''}  [${c.type}]`);
}

if (chats.size === 1) {
  const [id] = chats.keys();
  setEnvValue('TELEGRAM_CHAT_ID', id);
  console.log(`\n✅ TELEGRAM_CHAT_ID=${id} apps/api/.env ga yozildi. API ni qayta ishga tushiring.`);
} else {
  console.log('\nBir nechta chat topildi. Keraklisini apps/api/.env dagi TELEGRAM_CHAT_ID ga yozing');
  console.log('(bir nechtasini vergul bilan yozish ham mumkin).');
}
