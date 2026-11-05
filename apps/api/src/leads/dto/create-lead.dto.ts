import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString, Length, Matches, MaxLength } from 'class-validator';

export const LEAD_FIELDS = [
  'Shifokor / klinika',
  'Buxgalteriya',
  'Targetolog',
  'Marketing agentligi',
  'Savdo / xizmat',
  'Boshqa soha',
] as const;

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

export class CreateLeadDto {
  @Transform(trim)
  @IsString()
  @Length(2, 80, { message: 'Ismni to‘g‘ri kiriting' })
  name: string;

  @Transform(trim)
  @IsString()
  @Matches(/^\+?[0-9\s\-()]{9,20}$/, { message: 'Telefon raqamini to‘g‘ri kiriting' })
  phone: string;

  @IsOptional()
  @Transform(trim)
  @IsString()
  @Matches(/^@?[A-Za-z0-9_]{4,32}$/, { message: 'Telegram username noto‘g‘ri' })
  telegram?: string;

  @Transform(trim)
  @IsIn(LEAD_FIELDS as unknown as string[], { message: 'Sohani tanlang' })
  field: string;

  @IsOptional()
  @Transform(trim)
  @IsString()
  @MaxLength(1000)
  note?: string;

  /** Qayerdan yuborildi: modal, aloqa bo'limi va h.k. */
  @IsOptional()
  @IsString()
  @MaxLength(40)
  source?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  page?: string;

  /** utm_source, utm_campaign ... (reklama tahlili uchun) */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  utm?: string;

  /** Bot-tuzoq (honeypot): odam uni ko'rmaydi, to'ldirilsa — spam */
  @IsOptional()
  @IsString()
  website?: string;
}
