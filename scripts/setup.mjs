// setup.local.json dan .env fayllarini yaratadi: npm run setup
// Mavjud .env dagi TELEGRAM_CHAT_ID saqlanib qoladi.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cfgPath = join(root, 'setup.local.json');

if (!existsSync(cfgPath)) {
  console.error('❌ setup.local.json topilmadi. apps/api/.env.example va apps/web/.env.example dan nusxa oling.');
  process.exit(1);
}
const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));

function readEnv(p) {
  const out = {};
  if (!existsSync(p)) return out;
  for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

function write(p, values) {
  const old = readEnv(p);
  const merged = { ...values };
  for (const [k, v] of Object.entries(old)) if (!merged[k] && v) merged[k] = v; // eski qiymat bo'sh joyni to'ldiradi
  writeFileSync(p, Object.entries(merged).map(([k, v]) => `${k}=${v}`).join('\n') + '\n');
  console.log('✅', p.replace(root, '.'));
}

write(join(root, 'apps', 'api', '.env'), cfg.api);
write(join(root, 'apps', 'web', '.env.local'), cfg.web);
console.log('\nKeyingi qadam: Telegramda botga /start yozing, so‘ng: npm run chat-id');
