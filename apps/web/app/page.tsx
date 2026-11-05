import { Header } from '@/components/Header';
import { LeadForm } from '@/components/LeadForm';
import { LeadProvider, OpenLeadButton } from '@/components/LeadProvider';
import { Logo } from '@/components/Logo';
import {
  IconArrow,
  IconBag,
  IconCalculator,
  IconChart,
  IconChat,
  IconChatLines,
  IconChevron,
  IconCheck,
  IconClock,
  IconDoc,
  IconGlobe,
  IconLink,
  IconMegaphone,
  IconPhone,
  IconPlus,
  IconSend,
  IconShield,
  IconStethoscope,
  IconTarget,
  IconUser,
} from '@/components/Icons';
import { FAQ, SITE, SITE_URL } from '@/lib/site';

const AGENTS = [
  {
    name: 'MedAgent',
    for: 'Shifokorlar va klinikalar uchun',
    icon: <IconStethoscope size={26} />,
    live: true,
    tasks: ['Ijtimoiy tarmoqlar uchun kontent', 'Ssenariy va video subtitrlar', 'Bemorlar savollariga javob'],
  },
  {
    name: 'BuxAgent',
    for: 'Buxgalterlar va moliya bo‘limlari uchun',
    icon: <IconCalculator size={26} />,
    tasks: ['Hujjatlarni saralash va tekshirish', 'Hisobot qoralamalari', 'Muddatlar haqida eslatmalar'],
  },
  {
    name: 'TargetAgent',
    for: 'Targetologlar uchun',
    icon: <IconTarget size={26} />,
    tasks: ['Ko‘p kabinetlarni kunlik kuzatish', 'Kreativ va matn g‘oyalari', 'Mijozlar uchun hisobotlar'],
  },
  {
    name: 'MarketAgent',
    for: 'Marketing agentliklari uchun',
    icon: <IconMegaphone size={26} />,
    tasks: ['Kontent-reja va postlar', 'Brend ovozida matnlar', 'Mijozlar bilan yozishmalar'],
  },
  {
    name: 'SavdoAgent',
    for: 'Savdo va xizmat ko‘rsatish uchun',
    icon: <IconBag size={26} />,
    tasks: ['Buyurtma va savollarni qabul qilish', 'Mahsulot bo‘yicha maslahat', 'Telegram va Instagramda 24/7'],
  },
];

const PAINS = [
  { icon: <IconClock size={24} />, t: 'Kontentga vaqt yetmaydi', d: 'Post, ssenariy va video uchun g‘oya topish, yozish va tayyorlash soatlab vaqt oladi.' },
  { icon: <IconChat size={24} />, t: 'Bir xil savollar qayta-qayta', d: 'Mijoz va bemorlarning odatiy savollariga javob berish kun bo‘yi davom etadi.' },
  { icon: <IconDoc size={24} />, t: 'Hujjat va hisobotlar to‘planadi', d: 'Hisobotlar, jadvallar va yozishmalar asosiy ishdan keyin, kechqurun qoladi.' },
];

const STEPS = [
  { t: 'Tanishuv', d: 'Kuningiz qanday o‘tishini va qaysi ishlar vaqtni ko‘p olishini birga ko‘rib chiqamiz.' },
  { t: 'Loyihalash', d: 'Agent nima qiladi, nima qilmaydi va qayerda sizning tasdig‘ingiz kerak — aniq belgilaymiz.' },
  { t: 'Ulash', d: 'Telegram, Instagram, CRM yoki jadvallaringizga ulaymiz va real vazifalarda sinaymiz.' },
  { t: 'Qo‘llab-quvvatlash', d: 'Ishga tushgandan keyin ham agentni kuzatamiz va ish uslubingizga moslab boramiz.' },
];

const FEATURES = [
  { icon: <IconChatLines size={22} />, t: 'O‘zbek va rus tillarida', d: 'Matn va ovozli xabarlarni tushunadi, mijozlaringiz tilida javob beradi.' },
  { icon: <IconLink size={22} />, t: 'Siz ishlatadigan joyda', d: 'Telegram, Instagram, CRM va jadvallar bilan ulanadi — yangi dastur o‘rganish shart emas.' },
  { icon: <IconClock size={22} />, t: 'Kecha-kunduz tayyor', d: 'Siz dam olayotganda ham agent savollarni qabul qiladi va navbatni tartiblaydi.' },
  { icon: <IconShield size={22} />, t: 'Ma’lumotlar himoyada', d: 'Kirish huquqlari aniq belgilanadi, ma’lumotlaringiz uchinchi shaxslarga berilmaydi.' },
  { icon: <IconUser size={22} />, t: 'Uslubingizni o‘rganadi', d: 'Tahrirlaringizdan saboq oladi — har safar sizning ovozingizga yaqinroq yozadi.' },
  { icon: <IconChart size={22} />, t: 'Shaffof hisobot', d: 'Agent nima qilgani va qancha vaqt tejalgani bir sahifada ko‘rinadi.' },
];

const FLOW = [
  { t: 'Vazifa keladi', d: 'Mavzu, savol yoki hujjat', bg: '#0D2556', fg: '#fff', border: '1px solid #2A4686' },
  { t: 'Agent qoralama tayyorlaydi', d: 'Sizning uslubingiz va qoidalaringiz asosida', bg: '#0A68F5', fg: '#fff' },
  { t: 'Siz ko‘rib chiqasiz', d: 'Tasdiqlaysiz, tahrirlaysiz yoki qaytarasiz', bg: '#2AD6C9', fg: '#071B45' },
];

function jsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#org`,
        name: 'Mygent',
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        description: SITE.description,
        areaServed: 'UZ',
        sameAs: [SITE.telegram, SITE.instagram],
      },
      {
        '@type': 'Service',
        name: 'Biznes uchun maxsus AI agentlar',
        provider: { '@id': `${SITE_URL}/#org` },
        areaServed: 'UZ',
        serviceType: 'AI agent ishlab chiqish',
        audience: AGENTS.map((a) => ({ '@type': 'Audience', audienceType: a.for })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

export default function Home() {
  return (
    <LeadProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <Header />

      <main id="top">
        {/* ===== HERO ===== */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero__grid">
            <div className="hero__text">
              <p className="hook">
                <IconClock size={18} />
                Kuningiz javob yozish, post va hisobotlarga ketyaptimi?
              </p>
              <h1 id="hero-title" className="h-display">
                Takroriy ishni <span className="accent">AI agent</span> bajaradi. Siz — asosiy ishingizni.
              </h1>
              <p className="lead">
                Shifokor, buxgalter, targetolog va marketing agentliklari uchun maxsus AI agentlar yasaymiz. O‘zbek
                tilida ishlaydi, Telegram va Instagram bilan ulanadi. Yakuniy qaror — sizda.
              </p>
              <div className="cta-row">
                <OpenLeadButton source="hero">
                  Ro‘yxatdan o‘tish <IconArrow size={18} />
                </OpenLeadButton>
                <a href="#agentlar" className="btn btn--ghost">Agentlarni ko‘rish</a>
              </div>
              <ul className="checks">
                <li><IconCheck size={18} />O‘zbek tilida</li>
                <li><IconCheck size={18} />Telegram va Instagram bilan</li>
                <li><IconCheck size={18} />Siz nazoratda</li>
              </ul>
            </div>
            <figure className="hero__visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero.svg"
                width={1120}
                height={1000}
                fetchPriority="high"
                alt="Mygent AI agenti Telegramda mijoz bilan yozishmoqda, Instagram postini tasdiqlashga tayyorlagan va yangi arizani qabul qilgan"
              />
            </figure>
          </div>
        </section>

        {/* ===== PILLARS ===== */}
        <section className="pillars" aria-label="Mygent tamoyillari">
          <div className="wrap g3">
            <div className="pillar">
              <span className="pillar__tag" style={{ color: 'var(--brand-text)' }}>MY</span>
              <h2 className="h-card">Shaxsiy</h2>
              <p className="muted">Har bir agent kasbingiz, maqsadingiz va ish uslubingizga moslashadi.</p>
            </div>
            <div className="pillar">
              <span className="pillar__tag" style={{ color: 'var(--aqua-text)' }}>GENT</span>
              <h2 className="h-card">Ishonchli hamroh</h2>
              <p className="muted">Vazifani tushunadigan, muloyim va doim tayyor raqamli yordamchi.</p>
            </div>
            <div className="pillar">
              <span className="pillar__tag">CONTROL</span>
              <h2 className="h-card">Nazorat</h2>
              <p className="muted">Yakuniy qaror va tasdiq har doim mutaxassisning o‘zida qoladi.</p>
            </div>
          </div>
        </section>

        {/* ===== MUAMMO ===== */}
        <section id="muammo" className="sec" aria-labelledby="muammo-title">
          <div className="wrap stack">
            <div className="sec-head">
              <span className="eyebrow eyebrow--coral">Muammo</span>
              <h2 id="muammo-title" className="h-sec">Vaqtingiz takroriy ishlarga ketmoqda.</h2>
              <p className="lead">Mutaxassis o‘z ishiga emas, uning atrofidagi mayda vazifalarga kun bo‘yi chalg‘iydi.</p>
            </div>
            <div className="g3">
              {PAINS.map((p) => (
                <div key={p.t} className="card">
                  <div className="ico ico--coral">{p.icon}</div>
                  <h3 className="h-card" style={{ fontSize: 20 }}>{p.t}</h3>
                  <p className="muted">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== AGENTLAR ===== */}
        <section id="agentlar" className="sec sec--alt" aria-labelledby="agentlar-title">
          <div className="wrap stack">
            <div className="sec-head sec-head--row">
              <div className="sec-head">
                <span className="eyebrow">Agentlar</span>
                <h2 id="agentlar-title" className="h-sec">Har bir soha — o‘z agenti.</h2>
                <p className="lead">
                  Bitta brend, ko‘p maxsus yordamchi. Har bir agent sohangizning ish jarayoni uchun alohida loyihalanadi.
                </p>
              </div>
              <div className="naming">Nomlash: <strong>[soha] + Agent</strong></div>
            </div>
            <div className="g3">
              {AGENTS.map((a) => (
                <article key={a.name} className="card card--agent">
                  <div className="card__top">
                    <div className={`ico ${a.live ? 'ico--blue' : 'ico--chip'}`}>{a.icon}</div>
                    {a.live && <span className="badge badge--aqua">Mavjud mahsulot</span>}
                  </div>
                  <div>
                    <h3 className="h-card" style={{ fontSize: 22 }}>{a.name}</h3>
                    <p className="muted" style={{ fontSize: 15, marginTop: 4 }}>{a.for}</p>
                  </div>
                  <ul className="ticks">
                    {a.tasks.map((t) => (
                      <li key={t}><IconCheck size={16} />{t}</li>
                    ))}
                  </ul>
                </article>
              ))}
              <article className="card card--agent card--dashed">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div className="ico ico--aqua"><IconPlus size={26} /></div>
                  <div>
                    <h3 className="h-card" style={{ fontSize: 22 }}>Sizning agentingiz</h3>
                    <p className="muted" style={{ fontSize: 15, marginTop: 4 }}>
                      Ta’lim, yuridik xizmat, ko‘chmas mulk yoki boshqa soha — jarayoningizga moslab yasaymiz.
                    </p>
                  </div>
                </div>
                <OpenLeadButton source="agents" className="link-arrow">
                  Sohangizni ayting <IconArrow size={16} />
                </OpenLeadButton>
              </article>
            </div>
          </div>
        </section>

        {/* ===== JARAYON ===== */}
        <section id="jarayon" className="sec" aria-labelledby="jarayon-title">
          <div className="wrap stack">
            <div className="sec-head">
              <span className="eyebrow">Qanday ishlaydi</span>
              <h2 id="jarayon-title" className="h-sec">To‘rt qadamda tayyor agent.</h2>
            </div>
            <ol className="g4 steps">
              {STEPS.map((s, i) => (
                <li key={s.t} className="step">
                  <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="h-card" style={{ fontSize: 20 }}>{s.t}</h3>
                  <p className="muted">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== NAZORAT ===== */}
        <section id="nazorat" style={{ paddingBottom: 112 }} aria-labelledby="nazorat-title">
          <div className="wrap">
            <div className="band split">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <span className="eyebrow eyebrow--aqua">Nazorat</span>
                <h2 id="nazorat-title" className="h-sec">Agent tayyorlaydi. Siz tasdiqlaysiz.</h2>
                <p className="lead">
                  Mygent mutaxassisning o‘rnini egallamaydi. U takroriy ishni tartibga soladi, muhim qarorlarni esa doim
                  sizga qoldiradi.
                </p>
                <div className="band__points">
                  <div className="band__point"><IconCheck size={20} />Hech narsa sizning roziligingizsiz e’lon qilinmaydi.</div>
                  <div className="band__point"><IconCheck size={20} />Har bir harakat tarixda ko‘rinadi — kim, qachon, nima qildi.</div>
                </div>
              </div>
              <ol className="flow">
                {FLOW.map((f, i) => (
                  <li key={f.t}>
                    <div className="flow__rail">
                      <span className="flow__dot" style={{ background: f.bg, color: f.fg, border: f.border }}>{i + 1}</span>
                      <span className="flow__line" />
                    </div>
                    <div className="flow__body">
                      <div className="flow__title">{f.t}</div>
                      <div className="flow__sub">{f.d}</div>
                    </div>
                  </li>
                ))}
                <li>
                  <div className="flow__rail">
                    <span className="flow__dot" style={{ background: '#fff', color: '#071B45' }}><IconCheck size={18} /></span>
                  </div>
                  <div>
                    <div className="flow__title">Natija ishga tushadi</div>
                    <div className="flow__sub">Faqat tasdiqdan keyin</div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* ===== IMKONIYATLAR ===== */}
        <section className="sec sec--alt" aria-labelledby="imkon-title">
          <div className="wrap stack">
            <div className="sec-head">
              <span className="eyebrow">Imkoniyatlar</span>
              <h2 id="imkon-title" className="h-sec">Texnologiya emas — vaqtingiz haqida.</h2>
            </div>
            <div className="g3">
              {FEATURES.map((f) => (
                <div key={f.t} className="feature">
                  <div className="ico ico--sm ico--outline">{f.icon}</div>
                  <div>
                    <h3>{f.t}</h3>
                    <p>{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SAVOLLAR ===== */}
        <section id="savollar" className="sec" aria-labelledby="faq-title">
          <div className="wrap split split--top">
            <div className="sec-head">
              <span className="eyebrow">Savollar</span>
              <h2 id="faq-title" className="h-sec">Ko‘p so‘raladigan savollar.</h2>
              <p className="lead">
                Javob topmadingizmi? <a href="#aloqa">Bizga yozing</a> — tushunarli qilib tushuntiramiz.
              </p>
            </div>
            <div className="faq">
              {FAQ.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>
                    {f.q}
                    <IconChevron />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ALOQA ===== */}
        <section id="aloqa" style={{ paddingBottom: 112 }} aria-labelledby="aloqa-title">
          <div className="wrap">
            <div className="contact split split--top">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <span className="eyebrow">Aloqa</span>
                <h2 id="aloqa-title" className="h-sec">Agentingizni birga loyihalaymiz.</h2>
                <p className="lead">
                  Sohangiz va vazifalaringizni yozing. Biz siz bilan bog‘lanib, birinchi suhbatni belgilaymiz.
                </p>
                <div className="contact__links">
                  <a href={SITE.telegram} target="_blank" rel="noopener">
                    <span className="ico ico--sm ico--chip"><IconSend size={20} /></span>Telegram: {SITE.telegramLabel}
                  </a>
                  <a href={`tel:${SITE.phone}`}>
                    <span className="ico ico--sm ico--chip"><IconPhone size={20} /></span>{SITE.phoneLabel}
                  </a>
                  <a href={SITE_URL}>
                    <span className="ico ico--sm ico--chip"><IconGlobe size={20} /></span>mygent.uz
                  </a>
                </div>
              </div>
              <div className="form-box">
                <LeadForm source="contact" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="wrap footer__grid">
          <div className="footer__col" style={{ gap: 16, maxWidth: 340 }}>
            <Logo inverse />
            <p style={{ margin: 0, color: '#B9C7E4' }}>Aqlli yordam. Siz nazoratda. Har bir soha uchun maxsus AI agentlar.</p>
          </div>
          <nav className="footer__col" aria-label="Agentlar">
            <strong>Agentlar</strong>
            {AGENTS.slice(0, 4).map((a) => (
              <a key={a.name} href="#agentlar">{a.name}</a>
            ))}
          </nav>
          <nav className="footer__col" aria-label="Kompaniya">
            <strong>Kompaniya</strong>
            <a href="#jarayon">Qanday ishlaydi</a>
            <a href="#nazorat">Nazorat</a>
            <a href="#savollar">Savollar</a>
          </nav>
          <nav className="footer__col" aria-label="Aloqa">
            <strong>Aloqa</strong>
            <a href={SITE.telegram} target="_blank" rel="noopener">Telegram</a>
            <a href={SITE.instagram} target="_blank" rel="noopener">Instagram</a>
            <a href="#aloqa">Ariza qoldirish</a>
          </nav>
        </div>
        <div className="wrap footer__bottom">
          <span>© {new Date().getFullYear()} Mygent. Barcha huquqlar himoyalangan.</span>
          <span>Toshkent, O‘zbekiston</span>
        </div>
      </footer>
    </LeadProvider>
  );
}
