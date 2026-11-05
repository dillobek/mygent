import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/** Telegram HTML parse_mode uchun maxsus belgilarni ekranlash */
export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly logger = new Logger(TelegramService.name);
  private readonly token: string;
  private readonly chatIds: string[];

  constructor(config: ConfigService) {
    this.token = (config.get<string>('TELEGRAM_BOT_TOKEN') ?? '').trim();
    this.chatIds = (config.get<string>('TELEGRAM_CHAT_ID') ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  onModuleInit() {
    if (!this.token) {
      this.logger.error('TELEGRAM_BOT_TOKEN .env da yo‘q — arizalar Telegramga yuborilmaydi.');
    } else if (this.chatIds.length === 0) {
      this.logger.warn(
        'TELEGRAM_CHAT_ID bo‘sh. Botga /start yozing va "npm run chat-id" ni ishga tushiring.',
      );
    } else {
      this.logger.log(`Telegram tayyor: ${this.chatIds.length} ta chatga yuboriladi.`);
    }
  }

  isConfigured(): boolean {
    return Boolean(this.token) && this.chatIds.length > 0;
  }

  /** Barcha chatlarga xabar yuboradi. Kamida bittasiga yetib borsa — true. */
  async send(html: string): Promise<boolean> {
    if (!this.isConfigured()) {
      this.logger.warn('Telegram sozlanmagan, xabar yuborilmadi:\n' + html);
      return false;
    }

    const results = await Promise.all(
      this.chatIds.map(async (chatId) => {
        try {
          const res = await fetch(`https://api.telegram.org/bot${this.token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: html,
              parse_mode: 'HTML',
              link_preview_options: { is_disabled: true },
            }),
            signal: AbortSignal.timeout(10_000),
          });
          const data = (await res.json()) as { ok: boolean; description?: string };
          if (!data.ok) {
            this.logger.error(`Telegram xato (chat ${chatId}): ${data.description}`);
          }
          return data.ok;
        } catch (err) {
          this.logger.error(`Telegramga ulanib bo‘lmadi (chat ${chatId}): ${(err as Error).message}`);
          return false;
        }
      }),
    );

    return results.some(Boolean);
  }
}
