import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  /** Bitta IP dan 10 daqiqada ko'pi bilan 5 ta ariza */
  @Throttle({ default: { ttl: 600_000, limit: 5 } })
  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateLeadDto) {
    return this.leads.create(dto);
  }
}
