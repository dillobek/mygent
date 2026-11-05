import { Controller, Get } from '@nestjs/common';
import { TelegramService } from './telegram/telegram.service';

@Controller('health')
export class HealthController {
  constructor(private readonly telegram: TelegramService) {}

  @Get()
  health() {
    return {
      ok: true,
      telegram: this.telegram.isConfigured() ? 'configured' : 'missing TELEGRAM_CHAT_ID',
      time: new Date().toISOString(),
    };
  }
}
