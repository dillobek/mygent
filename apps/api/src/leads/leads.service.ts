import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { escapeHtml, TelegramService } from '../telegram/telegram.service';
import { CreateLeadDto } from './dto/create-lead.dto';

const SOURCE_LABELS: Record<string, string> = {
  modal: 'Modal oyna',
  hero: 'Hero tugmasi',
  header: 'Header tugmasi',
  contact: 'Aloqa bo‘limi formasi',
};

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(private readonly telegram: TelegramService) {}

  async create(dto: CreateLeadDto) {
    // Honeypot to'ldirilgan bo'lsa — jim qabul qilamiz, lekin yubormaymiz
    if (dto.website) {
      this.logger.warn('Spam ariza (honeypot) rad etildi');
      return { ok: true };
    }

    const text = this.format(dto);
    const sent = await this.telegram.send(text);
    if (!sent) {
      throw new ServiceUnavailableException(
        'Arizani hozir yuborib bo‘lmadi. Iltimos, birozdan so‘ng qayta urinib ko‘ring.',
      );
    }
    this.logger.log(`Yangi ariza: ${dto.name} (${dto.field})`);
    return { ok: true };
  }

  private format(dto: CreateLeadDto): string {
    const e = (v?: string) => escapeHtml(v ?? '');
    const phoneDigits = dto.phone.replace(/[^\d+]/g, '');
    const tg = dto.telegram ? dto.telegram.replace(/^@/, '') : '';
    const time = new Intl.DateTimeFormat('uz-UZ', {
      timeZone: 'Asia/Tashkent',
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date());

    const lines = [
      '🆕 <b>Yangi ariza — mygent.uz</b>',
      '',
      `👤 <b>Ism:</b> ${e(dto.name)}`,
      `📞 <b>Telefon:</b> <a href="tel:${e(phoneDigits)}">${e(dto.phone)}</a>`,
      `✈️ <b>Telegram:</b> ${tg ? `<a href="https://t.me/${e(tg)}">@${e(tg)}</a>` : '—'}`,
      `🏷 <b>Soha:</b> ${e(dto.field)}`,
      `📝 <b>Izoh:</b> ${dto.note ? e(dto.note) : '—'}`,
      '',
      `📍 <b>Manba:</b> ${e(SOURCE_LABELS[dto.source ?? ''] ?? dto.source ?? 'sayt')}`,
    ];
    if (dto.utm) lines.push(`📊 <b>UTM:</b> ${e(dto.utm)}`);
    if (dto.page) lines.push(`🔗 <b>Sahifa:</b> ${e(dto.page)}`);
    lines.push(`🕒 ${e(time)}`);

    return lines.join('\n');
  }
}
