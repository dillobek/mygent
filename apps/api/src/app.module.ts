import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { HealthController } from './health.controller';
import { LeadsModule } from './leads/leads.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Bitta IP dan 1 daqiqada ko'pi bilan 20 ta so'rov (arizalar uchun alohida, qattiqroq limit bor)
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 20 }]),
    TelegramModule,
    LeadsModule,
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
