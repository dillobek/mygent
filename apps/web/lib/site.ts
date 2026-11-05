export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mygent.uz').replace(/\/$/, '');

export const SITE = {
  name: 'Mygent',
  title: 'Mygent — biznes uchun AI agentlar | O‘zbekiston',
  description:
    'Shifokor, buxgalter, targetolog va marketing agentliklari uchun maxsus AI agentlar. O‘zbek tilida ishlaydi, Telegram va Instagram bilan ulanadi. Takroriy ishni agent bajaradi — yakuniy qaror sizda.',
  // Aloqa ma'lumotlari — haqiqiy qiymatlar bilan almashtiring
  telegram: 'https://t.me/mygent_uz',
  telegramLabel: '@mygent_uz',
  phone: '+998000000000',
  phoneLabel: '+998 00 000 00 00',
  instagram: 'https://instagram.com/mygent.uz',
};

export const FIELDS = [
  'Shifokor / klinika',
  'Buxgalteriya',
  'Targetolog',
  'Marketing agentligi',
  'Savdo / xizmat',
  'Boshqa soha',
] as const;

export const FAQ = [
  {
    q: 'Agent mening o‘rnimga qaror qabul qiladimi?',
    a: 'Yo‘q. Agent qoralama tayyorlaydi va ishni tartiblaydi. Muhim qaror va har qanday e’lon faqat sizning tasdig‘ingizdan keyin amalga oshadi.',
  },
  {
    q: 'Agent yasash qancha vaqt oladi?',
    a: 'Muddat vazifalar soni va ulanishlarga bog‘liq. Birinchi suhbatdan keyin aniq reja va muddatni aytamiz.',
  },
  {
    q: 'Qaysi platformalar bilan ishlaydi?',
    a: 'Telegram, Instagram, Google Sheets va ko‘plab CRM tizimlari. Sizda boshqa tizim bo‘lsa, ulash imkonini birga ko‘rib chiqamiz.',
  },
  {
    q: 'Narxi qanday belgilanadi?',
    a: 'Narx agent vazifalari va ulanishlar hajmiga qarab belgilanadi. Ariza qoldiring — sizga mos taklif tayyorlaymiz.',
  },
];
