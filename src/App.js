import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Activities from './Activities';

// ── Unsplash image library (verified popular IDs) ───────
const IMG = {
  // Hero slides - real photographs of sacred sites
  kailash:        '/sacred/kailash-hero.jpg',      // Kailash peak + Mansarovar lake
  harmandirSahib: '/sacred/harmandir.jpg',
  hemkuntSahib:   '/sacred/hemkunt.jpg',
  kedarnath:      '/sacred/kedarnath.jpg',
  patnaSahib:     '/sacred/patna-sahib.jpg',
  nainaDevi:      '/sacred/naina-devi.jpg',
  anandpurSahib:  '/sacred/anandpur-sahib.jpg',
  kartarpurSahib: '/sacred/kartarpur-sahib.jpg',   // Darbar Sahib Kartarpur
  // Gallery panels - real sacred moment photos
  prayerHands:    '/gallery/sadh-sangat.jpg',
  diyaLamps:      '/gallery/diya-aarti.jpg',
  lotus:          '/gallery/gurbani_103.jpg',
  kirtan:         '/gallery/gurdwara-scene.jpg',
  havan:          '/gallery/temple-prayer.jpg',
  turban:         '/gallery/turban.jpg',
  // Feature card headers - contextually accurate contemporary photos
  memberCard:     '/cards/membership.jpg',
  community:      '/cards/connect.jpg',
  business:       '/cards/directory.jpg',
  calendar:       '/cards/events.jpg',
  articles:       '/cards/articles.png',
  seva:           '/cards/seva.jpg',
  // Additional references used in Events, Directory, Articles, Unity sections
  diya:           '/gallery/diya-aarti.jpg',
  prayer:         '/gallery/sadh-sangat.jpg',
  langar:         '/gallery/langar.jpg',
  procession:     '/gallery/sikh-festivals.jpg',
  goldenTemple:   '/sacred/harmandir.jpg',
};

// ── Intersection Observer hook ──────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      transition: `opacity .8s ease ${delay}s, transform .8s ease ${delay}s`,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(50px)',
    }}>
      {children}
    </div>
  );
}

// ── Animated Counter ────────────────────────────────────
function Counter({ end, suffix = '+', label }) {
  const [n, setN] = useState(0);
  const [ref, visible] = useReveal(0.5);
  useEffect(() => {
    if (!visible) return;
    const dur = 1800, steps = 60, step = end / steps;
    let cur = 0, t = setInterval(() => {
      cur += step; if (cur >= end) { setN(end); clearInterval(t); } else setN(Math.floor(cur));
    }, dur / steps);
    return () => clearInterval(t);
  }, [visible, end]);
  return (
    <div ref={ref} className="stat-item">
      <span className="stat-num">{n.toLocaleString()}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// ── Hero Slideshow ──────────────────────────────────────
const SLIDES = [
  { img: IMG.kailash,        title: 'Kailash Mansarovar',      sub: 'ਕੈਲਾਸ਼ ਮਾਨਸਰੋਵਰ • कैलाश मानसरोवर — Sacred Peak & Holy Lake, Abode of Shiva' },
  { img: IMG.harmandirSahib, title: 'Harmandir Sahib',         sub: 'ਹਰਿਮੰਦਰ ਸਾਹਿਬ — The Golden Temple, Amritsar' },
  { img: IMG.hemkuntSahib,   title: 'Hemkunt Sahib',           sub: 'ਹੇਮਕੁੰਟ ਸਾਹਿਬ — Where Guru Gobind Singh Meditated' },
  { img: IMG.kedarnath,      title: 'Kedarnath Temple',        sub: 'केदारनाथ मंदिर — Ancient Shiva Shrine in the Himalayas' },
  { img: IMG.patnaSahib,     title: 'Patna Sahib Gurdwara',    sub: 'ਪਟਨਾ ਸਾਹਿਬ — Birthplace of Guru Gobind Singh Ji' },
  { img: IMG.nainaDevi,      title: 'Naina Devi Temple',       sub: 'नैना देवी मंदिर — Sacred Shakti Peeth, Himachal Pradesh' },
  { img: IMG.anandpurSahib,  title: 'Anandpur Sahib',          sub: 'ਅਨੰਦਪੁਰ ਸਾਹਿਬ — City of Divine Bliss, Birth of the Khalsa' },
  { img: IMG.kartarpurSahib, title: 'Kartarpur Sahib',         sub: 'ਕਰਤਾਰਪੁਰ ਸਾਹਿਬ — Where Guru Nanak Dev Ji Spent His Final Years' },
];

// ── CONVENTION 2026 ──────────────────────────────────────
function ConventionCountdown() {
  const target = new Date('2026-08-22T10:00:00-04:00').getTime();
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000) % 24,
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return (
    <div className="conv-countdown">
      {[['Days', t.d], ['Hours', t.h], ['Minutes', t.m], ['Seconds', t.s]].map(([label, val]) => (
        <div key={label} className="conv-count-box">
          <div className="conv-count-num">{String(val).padStart(2, '0')}</div>
          <div className="conv-count-label">{label}</div>
        </div>
      ))}
    </div>
  );
}

function ConventionSection({ setPage }) {
  const tiers = [
    { name: 'Platinum', price: '$7,500', qty: 'Exclusive · 1 only', color: '#1A3A6B' },
    { name: 'Gold', price: '$5,000', qty: 'Up to 2 available', color: '#B8893B' },
    { name: 'Silver', price: '$2,500', qty: 'Up to 3 available', color: '#6b6b6b' },
    { name: 'Bronze', price: '$1,000', qty: 'Up to 5 available', color: '#8a5a2b' },
  ];

  const stats = [
    { num: '250', label: 'Senior Leaders' },
    { num: '25', label: 'Tables of Ten' },
    { num: '10', label: 'Community Awards' },
    { num: '4', label: 'Hours of Impact' },
  ];

  return (
    <section className="conv-section">
      <div className="conv-bg" style={{ backgroundImage: 'url(/sacred/golden_temple.jpg)' }} />
      <div className="conv-overlay" />

      <div className="conv-content">
        <p className="conv-eyebrow">✦ Save The Date ✦</p>
        <h2 className="conv-title">Hindu Sikh Unity<br/>Convention 2026</h2>
        <p className="conv-theme">"Saanjhi Virasat, Saanjha Bhavishya"</p>
        <p className="conv-subtheme">Shared Heritage · Shared Future</p>

        <div className="conv-details">
          <div className="conv-detail"><span className="conv-icon">📅</span> Saturday, August 22, 2026</div>
          <div className="conv-detail"><span className="conv-icon">🕙</span> 10:00 AM – 2:00 PM</div>
          <div className="conv-detail"><span className="conv-icon">📍</span> Chandni Victoria Convention Centre, Mississauga</div>
        </div>

        <ConventionCountdown />

        <p className="conv-narrative">
          A landmark North American gathering where the senior-most Hindu and Sikh leadership —
          religious, political, corporate, and civic — come together not to talk about unity,
          but to demonstrate it and deliver on it. Witness the signing of the <strong>Unity Compact</strong> by
          20+ senior leaders on stage.
        </p>

        <div className="conv-stats">
          {stats.map(s => (
            <div key={s.label} className="conv-stat">
              <div className="conv-stat-num">{s.num}</div>
              <div className="conv-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="conv-cta-row">
          <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-convention--2026"
            target="_blank" rel="noreferrer" className="btn conv-btn-primary">
            Reserve Your Seat — Early Bird $120 →
          </a>
          <button onClick={() => setPage && setPage('convention')} className="btn conv-btn-secondary">
            View Full Details
          </button>
        </div>
        <p className="conv-deadline">⏳ Early bird pricing ends July 20, 2026 · By invitation</p>

        <div className="conv-sponsor-strip">
          <p className="conv-sponsor-label">Become a Unity Partner</p>
          <div className="conv-tiers">
            {tiers.map(t => (
              <div key={t.name} className="conv-tier" style={{ borderTopColor: t.color }}>
                <div className="conv-tier-name" style={{ color: t.color }}>{t.name}</div>
                <div className="conv-tier-price">{t.price}</div>
                <div className="conv-tier-qty">{t.qty}</div>
              </div>
            ))}
          </div>
          <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-convention--2026"
            target="_blank" rel="noreferrer"
            className="conv-sponsor-link">Become a Sponsor — Register Now →</a>
        </div>
      </div>
    </section>
  );
}

// ── CONVENTION 2026 FULL PAGE ───────────────────────────
function ConventionPage() {
  const [tab, setTab] = useState('overview');

  const schedule = [
    ['10:00 – 10:30', 'Registration & Welcome Reception', 'Chai, coffee, samosas, jalebi station'],
    ['10:30 – 10:45', 'Opening Ceremony', 'Joint invocation, O Canada, MC welcome'],
    ['10:45 – 11:00', 'Presidential Welcome', 'Harji Bajwa sets the vision for the day'],
    ['11:00 – 11:20', 'Keynote I', '"Hindu-Sikh Unity as a Canadian Strength"'],
    ['11:20 – 11:35', 'Cultural Performance', 'Joint Shabad + Bhajan medley'],
    ['11:35 – 11:55', 'Keynote II', '"Centuries of Shared Heritage"'],
    ['11:55 – 12:25', 'Awards Ceremony — Part I', 'Community Heroes (6 awards)'],
    ['12:25 – 1:10', 'Working Lunch', 'Vegetarian buffet, table-talk prompts'],
    ['1:10 – 1:25', 'Fireside Conversation', 'Granthi Sahib & Pandit Ji in dialogue'],
    ['1:25 – 1:45', 'Awards Ceremony — Part II', 'Excellence Awards (4 awards)'],
    ['1:45 – 1:55', 'The Unity Compact', '20+ leaders sign on stage · group photo'],
    ['1:55 – 2:00', 'Closing Prayer & Vote of Thanks', ''],
  ];

  const awards = [
    'Lifetime Achievement in Hindu-Sikh Unity', 'Religious Leadership Award (Sikh Tradition)',
    'Religious Leadership Award (Hindu Tradition)', 'Community Builder of the Year',
    'Humanitarian / Seva Award', 'Law Enforcement Liaison Award',
    'Youth Leadership Award (Under 30)', 'Women in Leadership Award',
    'Excellence in Business / Public Service', 'Unity Champion Award',
  ];

  const attendees = [
    ['Religious Leadership', 40, 'Mandirs & Gurdwaras across the GTA'],
    ['Elected Officials', 35, 'Federal, Provincial & Municipal'],
    ['Corporate & Professional', 40, 'Executives, entrepreneurs, professionals'],
    ['Community Organizations', 40, 'Non-profits & cultural associations'],
    ['Youth & Next Generation', 30, 'Student leaders & young professionals'],
    ['Academia & Media', 25, 'Faculty, editors, correspondents'],
    ['Law Enforcement & Public Safety', 15, 'Peel Police, RCMP liaisons'],
    ['HSUF Executive & Honoured Guests', 25, 'Awardees, sponsors & family'],
  ];

  const tiers = [
    {
      name: 'Platinum Unity Partner', price: '$7,500', qty: 'Exclusive · Only 1 available', color: '#1A3A6B',
      benefits: ['Title designation: "Presented in Partnership with [Sponsor]"', '1 premium front-row table of 10',
        'Logo on ALL materials: flyer, social, email, website, banners', 'Back cover full-page ad in programme book',
        '3-minute on-stage moment & photo with chief guests', 'Sponsor banners at registration & main stage',
        'Press release inclusion', 'Recognition plaque on stage', 'Permanent sponsor wall listing']
    },
    {
      name: 'Gold Unity Partner', price: '$5,000', qty: 'Up to 2 available', color: '#B8893B',
      benefits: ['6 complimentary seats, premium placement', 'Full-page ad inside programme book',
        'Logo on flyer, social media, website, programme book', '1-minute on-stage recognition',
        'Branded signage at venue', 'Recognition plaque on stage', 'Website listing under "Unity Partners"']
    },
    {
      name: 'Silver Unity Partner', price: '$2,500', qty: 'Up to 3 available', color: '#6b6b6b',
      benefits: ['4 complimentary seats', 'Half-page ad in programme book', 'Logo in programme book & website',
        'Name recognition from stage', 'Recognition certificate', 'Website listing under "Unity Partners"']
    },
    {
      name: 'Bronze Unity Partner', price: '$1,000', qty: 'Up to 5 available', color: '#8a5a2b',
      benefits: ['2 complimentary seats', 'Quarter-page logo block in programme book',
        'Listed in event programme & website', 'Recognition certificate', 'Website listing under "Unity Partners"']
    },
  ];

  const dates = [
    ['July 15, 2026', 'Platinum partner deadline (exclusive title designation)'],
    ['July 20, 2026', 'Early bird ticket deadline'],
    ['July 31, 2026', 'All sponsors deadline (for inclusion in printed materials)'],
    ['August 10, 2026', 'Late partnership window (digital-only) · Ticket sales close'],
    ['August 22, 2026', '✦ The Convention'],
  ];

  return (
    <div className="inner-page conv-page">
      {/* Hero */}
      <div className="conv-page-hero" style={{ backgroundImage: 'url(/sacred/golden_temple.jpg)' }}>
        <div className="conv-page-hero-overlay" />
        <div className="conv-page-hero-text">
          <p className="conv-eyebrow">Hindu Sikh Unity Forum Canada Presents</p>
          <h1>Hindu Sikh Unity Convention 2026</h1>
          <p className="conv-theme">"Saanjhi Virasat, Saanjha Bhavishya"</p>
          <p className="conv-subtheme">Shared Heritage · Shared Future</p>
          <div className="conv-page-details">
            <span>📅 Saturday, August 22, 2026</span>
            <span>🕙 10:00 AM – 2:00 PM</span>
            <span>📍 Chandni Victoria Convention Centre, Mississauga</span>
          </div>
          <ConventionCountdown />
        </div>
      </div>

      <div className="container conv-page-body">

        {/* Tabs */}
        <div className="conv-tabs">
          {['overview', 'schedule', 'awards', 'sponsorship', 'attendees', 'tickets'].map(t => (
            <button key={t} className={`conv-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <Reveal>
            <div className="conv-tab-content">
              <h2 className="conv-section-h">A Landmark Working Convention</h2>
              <p className="conv-body-text">
                A landmark North American gathering where the senior-most Hindu and Sikh leadership —
                religious, political, corporate, and civic — come together not to talk about unity,
                but to demonstrate it and deliver on it. This is a working convention with productive
                outcomes, a statement of shared identity and Canadian belonging, and a bridge-building
                moment with concrete deliverables.
              </p>
              <div className="conv-stats-grid">
                {[['250', 'Senior Leaders'], ['25', 'Tables of Ten'], ['10', 'Community Awards'], ['4', 'Hours of Impact']].map(([n, l]) => (
                  <div key={l} className="conv-stat-card">
                    <div className="conv-stat-card-num">{n}</div>
                    <div className="conv-stat-card-label">{l}</div>
                  </div>
                ))}
              </div>

              <h3 className="conv-section-h" style={{ marginTop: '2.5rem' }}>The Unity Compact</h3>
              <p className="conv-body-text">
                A short, calligraphed document signed by 20+ senior leaders on stage at 1:45 PM,
                committing signatories to:
              </p>
              <ul className="conv-list">
                <li>Respect and celebrate each other's religious traditions, festivals, and sacred spaces</li>
                <li>Stand together against hatred, violence, and external forces seeking to divide</li>
                <li>Cooperate on joint celebrations, starting with Diwali / Bandi Chhor Divas 2026</li>
                <li>Support each other's youth, women's, and seniors' programs</li>
                <li>Form a Standing Council that meets quarterly with rotating leadership</li>
                <li>Speak with one voice on matters affecting both communities in Canada</li>
              </ul>
            </div>
          </Reveal>
        )}

        {/* SCHEDULE */}
        {tab === 'schedule' && (
          <Reveal>
            <div className="conv-tab-content">
              <h2 className="conv-section-h">Programme — Run of Show</h2>
              <div className="conv-schedule">
                {schedule.map(([time, title, desc]) => (
                  <div key={title} className="conv-schedule-row">
                    <div className="conv-schedule-time">{time}</div>
                    <div className="conv-schedule-info">
                      <div className="conv-schedule-title">{title}</div>
                      {desc && <div className="conv-schedule-desc">{desc}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* AWARDS */}
        {tab === 'awards' && (
          <Reveal>
            <div className="conv-tab-content">
              <h2 className="conv-section-h">10 Community Awards</h2>
              <p className="conv-body-text">Honouring those quietly building unity in their communities.</p>
              <div className="conv-awards-grid">
                {awards.map((a, i) => (
                  <div key={a} className="conv-award-card">
                    <div className="conv-award-num">{String(i + 1).padStart(2, '0')}</div>
                    <div className="conv-award-name">{a}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* SPONSORSHIP */}
        {tab === 'sponsorship' && (
          <Reveal>
            <div className="conv-tab-content">
              <h2 className="conv-section-h">Become a Unity Partner</h2>
              <p className="conv-body-text">
                This is not a banquet or a fundraiser disguised as advertising — it's a working
                convention with a tangible deliverable. Your partnership will be honoured, not commercialized.
              </p>
              <div className="conv-tiers-detailed">
                {tiers.map(t => (
                  <div key={t.name} className="conv-tier-detailed" style={{ borderTopColor: t.color }}>
                    <div className="conv-tier-detailed-name" style={{ color: t.color }}>{t.name}</div>
                    <div className="conv-tier-detailed-price">{t.price}</div>
                    <div className="conv-tier-detailed-qty">{t.qty}</div>
                    <ul className="conv-tier-benefits">
                      {t.benefits.map(b => <li key={b}>✓ {b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="conv-not-included">
                <h4>Sponsors do not receive:</h4>
                <p>Product booths or sales activity · Promotional speeches beyond Platinum's 3-minute moment · Flyers in welcome bags · Pop-up banners except at the designated partner wall</p>
              </div>
              <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-convention--2026"
                  target="_blank" rel="noreferrer" className="btn conv-btn-primary">
                  Register as a Sponsor →
                </a>
                <a href="mailto:info@hindusikhunity.com?subject=Sponsorship Inquiry - HSUC 2026" className="btn conv-btn-secondary">
                  Enquire by Email →
                </a>
              </div>
            </div>
          </Reveal>
        )}

        {/* ATTENDEES */}
        {tab === 'attendees' && (
          <Reveal>
            <div className="conv-tab-content">
              <h2 className="conv-section-h">Who Will Be in the Room</h2>
              <div className="conv-attendees-grid">
                {attendees.map(([name, num, desc]) => (
                  <div key={name} className="conv-attendee-card">
                    <div className="conv-attendee-num">{num}</div>
                    <div>
                      <div className="conv-attendee-name">{name}</div>
                      <div className="conv-attendee-desc">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* TICKETS */}
        {tab === 'tickets' && (
          <Reveal>
            <div className="conv-tab-content">
              <h2 className="conv-section-h">Ticket Pricing</h2>
              <div className="conv-pricing-grid">
                <div className="conv-price-card highlight">
                  <div className="conv-price-badge">Early Bird</div>
                  <div className="conv-price-amt">$120</div>
                  <div className="conv-price-label">Individual Seat</div>
                  <div className="conv-price-deadline">Until July 20, 2026</div>
                </div>
                <div className="conv-price-card">
                  <div className="conv-price-amt">$150</div>
                  <div className="conv-price-label">Individual Seat</div>
                  <div className="conv-price-deadline">Jul 21 – Aug 10, 2026</div>
                </div>
                <div className="conv-price-card highlight">
                  <div className="conv-price-badge">Early Bird</div>
                  <div className="conv-price-amt">$1,000</div>
                  <div className="conv-price-label">Table of 10</div>
                  <div className="conv-price-deadline">Until July 20, 2026</div>
                </div>
                <div className="conv-price-card">
                  <div className="conv-price-amt">$1,200</div>
                  <div className="conv-price-label">Table of 10</div>
                  <div className="conv-price-deadline">Jul 21 – Aug 10, 2026</div>
                </div>
              </div>
              <p className="conv-body-text" style={{ textAlign: 'center', marginTop: '1.5rem' }}>Registration closes August 19, 2026</p>

              <h3 className="conv-section-h" style={{ marginTop: '2.5rem' }}>Key Dates</h3>
              <div className="conv-dates-list">
                {dates.map(([date, desc]) => (
                  <div key={date} className="conv-date-row">
                    <div className="conv-date-badge">{date}</div>
                    <div className="conv-date-desc">{desc}</div>
                  </div>
                ))}
              </div>

              <div className="conv-final-cta">
                <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-convention--2026"
                  target="_blank" rel="noreferrer" className="btn conv-btn-primary">
                  Reserve Your Seat Now →
                </a>
              </div>
            </div>
          </Reveal>
        )}

      </div>
    </div>
  );
}

function HeroSlider({ setPage }) {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setPrev(cur);
      setFading(true);
      setTimeout(() => {
        setCur(c => (c + 1) % SLIDES.length);
        setFading(false);
        setPrev(null);
      }, 1000);
    }, 6000);
    return () => clearInterval(t);
  }, [cur]);

  return (
    <section className="hero">
      {/* Previous slide (fading out) */}
      {prev !== null && (
        <div className="hero-slide hero-slide-prev" style={{ backgroundImage: `url(${SLIDES[prev].img})` }} />
      )}
      {/* Current slide */}
      <div className={`hero-slide hero-slide-cur ${fading ? 'fade-out' : 'fade-in'}`}
        style={{ backgroundImage: `url(${SLIDES[cur].img})` }} />

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Floating particles */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
            fontSize: `${0.8 + Math.random() * 1.2}rem`,
          }}>
            {i % 2 === 0 ? '✦' : '◈'}
          </div>
        ))}
      </div>

      {/* Dual symbol animation */}
      <div className="hero-symbols-float">
        <div className="symbol-ring ring-om">
          <span className="sym-text">ॐ</span>
          <svg className="ring-svg" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(240,192,96,.4)" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(240,192,96,.2)" strokeWidth="1" />
          </svg>
        </div>
        <div className="symbol-ring ring-ik">
          <span className="sym-text">ੴ</span>
          <svg className="ring-svg" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(240,192,96,.4)" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(240,192,96,.2)" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-logo-lockup">
          <img src="/logo.jpg" alt="HSUF Canada" className="hero-logo-img" />
          <div className="hero-org-name">
            <span className="hero-org-main">Hindu Sikh Unity Forum Canada</span>
            <span className="hero-org-tagline">Stronger Together · ਸਾਂਝ ਵਿੱਚ ਸ਼ਕਤੀ · साझा विरासत</span>
          </div>
        </div>
        <h1 className="hero-title">{SLIDES[cur].title}</h1>
        <p className="hero-script">{SLIDES[cur].sub}</p>
        <div className="hero-btns">
          <button onClick={() => setPage('seva')} className="btn btn-gold">Talk to Seva AI</button>
          <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-forum-canadas-membership"
            target="_blank" rel="noreferrer" className="btn btn-outline-white">Join for $1</a>
          <button onClick={() => setPage('membership')} className="btn btn-outline-gold">Member Card</button>
        </div>
      </div>

      {/* Slide dots */}
      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCur(i)} className={`dot ${i === cur ? 'active' : ''}`} />
        ))}
      </div>
    </section>
  );
}

// ── Nav ─────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [
    { id: 'home', label: 'Home' }, { id: 'membership', label: 'Membership' },
    { id: 'events', label: 'Events' }, { id: 'activities', label: 'Activities' },
    { id: 'directory', label: 'Directory' },
    { id: 'convention', label: 'Convention 2026' },
    { id: 'connect', label: 'Connect' }, { id: 'articles', label: 'Articles' },
    { id: 'seva', label: 'Seva AI' },
  ];
  const go = (id) => { setPage(id); setOpen(false); window.scrollTo(0, 0); };

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="shimmer-bar" />
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => go('home')}>
          <img src="/logo.jpg" alt="HSUF Canada Logo" className="nav-logo-img" />
          <div className="nav-logo-text">
            <span className="nav-logo-name">Hindu Sikh Unity Forum</span>
            <span className="nav-logo-sub">Canada · Stronger Together</span>
          </div>
        </button>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)} className={page === l.id ? 'active' : ''}>{l.label}</button>
          ))}
          <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-forum-canadas-membership"
            target="_blank" rel="noreferrer" className="nav-join">Join $1</a>
        </div>
        <button className="hamburger" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
      </div>
    </nav>
  );
}

// ── Gallery ─────────────────────────────────────────────
function Gallery() {
  const panels = [
    { img: IMG.prayerHands, caption: 'Gurdwara Darbar Hall — The Sacred Diwan',       wide: true  },
    { img: IMG.diyaLamps,   caption: 'Badrinath Dham — Adorned for the Divine',        wide: false },
    { img: IMG.lotus,       caption: 'Gangotri — Source of the Sacred Ganga',          wide: false },
    { img: IMG.kirtan,      caption: 'Harmandir Sahib — The Golden Temple, Amritsar',  wide: false },
    { img: IMG.havan,       caption: 'Holi — Festival of Colour & Community',          wide: false },
    { img: IMG.turban,      caption: 'Gurdwara Sahib — A House of the Divine',         wide: true  },
  ];
  return (
    <section className="gallery-section">
      <Reveal><h2 className="section-title">Sacred Moments</h2></Reveal>
      <Reveal delay={0.1}><p className="section-sub">Where tradition, devotion and community come alive</p></Reveal>
      <div className="gallery-grid">
        {panels.map((p, i) => (
          <Reveal key={i} delay={i * 0.07} className={`gallery-item ${p.wide ? 'wide' : ''}`}>
            <div className="gallery-img-wrap">
              <img src={p.img} alt={p.caption} loading="lazy" />
              <div className="gallery-caption">{p.caption}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Features ─────────────────────────────────────────────
function Features({ setPage }) {
  const cards = [
    { img: IMG.memberCard, title: 'Digital Member Card',    desc: 'QR-verified membership recognized at all HSUF events and partner businesses.', page: 'membership' },
    { img: IMG.community,  title: 'Connect Board',          desc: 'City-based networking. Meet, collaborate and grow with community members.', page: 'connect' },
    { img: IMG.business,   title: 'Business Directory',     desc: 'Verified Hindu and Sikh businesses across Canada, reviewed by members.', page: 'directory' },
    { img: IMG.calendar,   title: 'Events Calendar',        desc: 'Hindu and Sikh festivals, pujas, kirtan, and community gatherings.', page: 'events' },
    { img: IMG.articles,   title: 'Articles & Heritage',    desc: 'Stories of unity, cultural heritage, and shared spiritual wisdom.', page: 'articles' },
    { img: IMG.seva,       title: 'Seva AI',                desc: 'AI guide on Hindu-Sikh unity, Gurbani, Vedic wisdom, and shared heritage.', page: 'seva' },
  ];
  return (
    <section className="features-section">
      <Reveal><h2 className="section-title">Our Community Platform</h2></Reveal>
      <Reveal delay={0.1}><p className="section-sub">Everything you need to connect, celebrate, and grow together</p></Reveal>
      <div className="features-grid">
        {cards.map((c, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="feat-card" onClick={() => setPage(c.page)}>
              <div className="feat-img-wrap">
                <img src={c.img} alt={c.title} loading="lazy" />
              </div>
              <div className="feat-body">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="feat-link">Explore →</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Unity Section ────────────────────────────────────────
function UnitySection() {
  return (
    <section className="unity-section" style={{ backgroundImage: `url(${IMG.goldenTemple})` }}>
      <div className="unity-overlay" />
      <div className="unity-content">
        <Reveal><h2 className="unity-title">One Root — Two Traditions</h2></Reveal>
        <Reveal delay={0.1}><p className="unity-ekam">Ik Onkar — Ekam Sat</p></Reveal>
        <div className="unity-split">
          <Reveal delay={0.15} className="unity-side sikh-side">
            <div className="unity-sym">ੴ</div>
            <h3>Sikh Tradition</h3>
            <blockquote>"ਸਭੁ ਕੋ ਊਚਾ ਆਖੀਐ ਨੀਚੁ ਨ ਦੀਸੈ ਕੋਇ"</blockquote>
            <p>All are called high — none appears low. <br /><em>— Guru Granth Sahib</em></p>
          </Reveal>
          <div className="unity-divider">
            <div className="divider-line" />
            <span className="divider-sym">✦</span>
            <div className="divider-line" />
          </div>
          <Reveal delay={0.15} className="unity-side hindu-side">
            <div className="unity-sym">ॐ</div>
            <h3>Hindu Tradition</h3>
            <blockquote>"वसुधैव कुटुम्बकम्"</blockquote>
            <p>The world is one family. <br /><em>— Maha Upanishad</em></p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── MISSION / VISION ─────────────────────────────────────
function MissionVision() {
  return (
    <section className="mv-section">
      {/* Canadian identity bar */}
      <div className="mv-canada-bar">
        <span className="mv-maple">🍁</span>
        <span className="mv-canada-text">Proudly Serving Hindu &amp; Sikh Canadians Since April 2023</span>
        <span className="mv-maple">🍁</span>
      </div>

      <div className="mv-inner">
        {/* Vision */}
        <Reveal className="mv-card mv-vision">
          <div className="mv-icon">ੴ ॐ</div>
          <div className="mv-label">Our Vision</div>
          <h3>A Harmonious Canada Where Two Great Traditions Thrive as One</h3>
          <p>A society where Hindu and Sikh Canadians celebrate shared values and cultural heritage — fostering mutual respect, interfaith unity, and active civic engagement for the betterment of <em>all</em> Canadians.</p>
        </Reveal>

        <div className="mv-divider">
          <div className="mv-div-line" />
          <div className="mv-div-leaf">🍁</div>
          <div className="mv-div-line" />
        </div>

        {/* Mission */}
        <Reveal delay={0.15} className="mv-card mv-mission">
          <div className="mv-icon">🤝</div>
          <div className="mv-label">Our Mission</div>
          <h3>Uniting Communities. Empowering Canadians. Building Tomorrow Together.</h3>
          <p>Strengthening bonds between Hindu and Sikh communities through cultural, educational, humanitarian, and advocacy work — organizing events, supporting charitable projects, and advocating for fair representation in Canada's democracy.</p>
        </Reveal>
      </div>

      {/* Key pillars */}
      <div className="mv-pillars">
        {[
          { icon: '🎉', title: 'Cultural Exchange',       desc: 'Joint Diwali, Gurpurab & shared festival celebrations' },
          { icon: '🕊️', title: 'Interfaith Dialogue',    desc: 'Open platforms for respectful conversation & learning' },
          { icon: '🎓', title: 'Education & Heritage',    desc: 'Programs on our intertwined histories & shared roots' },
          { icon: '🙌', title: 'Humanitarian Seva',       desc: 'Charitable projects, disaster relief & social services' },
          { icon: '🗳️', title: 'Civic Advocacy',         desc: 'Fair political representation for both communities' },
          { icon: '🍁', title: 'Stronger Canada',        desc: 'Diversity, inclusion & unity enriching the national fabric' },
        ].map((p, i) => (
          <Reveal key={i} delay={i * 0.07} className="mv-pillar">
            <span className="mv-pillar-icon">{p.icon}</span>
            <strong>{p.title}</strong>
            <span>{p.desc}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── HOME ─────────────────────────────────────────────────
function Home({ setPage }) {
  return (
    <div className="page-home">
      <HeroSlider setPage={setPage} />
      <ConventionSection setPage={setPage} />
      <MissionVision />
      <section className="stats-bar">
        <Counter end={5000} label="Members" />
        <Counter end={12}   label="Cities" />
        <Counter end={3}    label="Years of Unity" />
        <Counter end={200}  label="Events Hosted" />
      </section>
      <Features setPage={setPage} />
      <Gallery />
      <UnitySection />
      <section className="cta-section">
        <Reveal>
          <h2>Join Our Community</h2>
          <p>One membership. Every community platform. A lifetime of connection.</p>
          <div className="big-price">$1</div>
          <p className="price-note">One-time · No recurring fees · Digital member card included</p>
          <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-forum-canadas-membership"
            target="_blank" rel="noreferrer" className="btn btn-cta-large">Become a Member →</a>
        </Reveal>
      </section>
    </div>
  );
}

// ── MEMBERSHIP ───────────────────────────────────────────
function Membership() {
  return (
    <div className="inner-page">
      <div className="inner-hero" style={{ backgroundImage: `url(${IMG.memberCard})` }}>
        <div className="inner-overlay" />
        <div className="inner-hero-text">
          <h1>Join HSUF Canada</h1>
          <p>One membership. Full community access.</p>
        </div>
      </div>
      <div className="container">
        <div className="bento-grid">
          {[
            { img: IMG.memberCard, title: 'Digital Member Card',  desc: 'QR-verified card for all HSUF events and partners' },
            { img: IMG.community,  title: 'Connect Board',        desc: 'Network with members city-by-city across Canada' },
            { img: IMG.calendar,   title: 'Event Early Access',   desc: 'First access to Hindu and Sikh festivals' },
            { img: IMG.business,   title: 'Business Directory',   desc: 'Full verified directory of Hindu and Sikh businesses' },
            { img: IMG.articles,   title: 'Premium Articles',     desc: 'Exclusive cultural heritage and unity content' },
            { img: IMG.seva,       title: 'Seva AI Access',       desc: 'Full access to our AI guide on shared heritage' },
          ].map((b, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="bento-card">
                <img src={b.img} alt={b.title} />
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <div className="cta-section" style={{ marginTop: '3rem' }}>
            <h2>One Payment. Full Access.</h2>
            <div className="big-price">$1</div>
            <p className="price-note">No recurring fees</p>
            <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-forum-canadas-membership"
              target="_blank" rel="noreferrer" className="btn btn-cta-large">Join Now →</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ── EVENTS ───────────────────────────────────────────────
function Events() {
  const [filter, setFilter] = useState('All');
  const events = [
    { img: IMG.diya,       name: 'Diwali Celebration 2024',  date: 'November 1, 2024',    time: '6:00 PM', loc: 'Toronto', cat: 'Hindu' },
    { img: IMG.goldenTemple, name: 'Guru Nanak Jayanti',     date: 'November 15, 2024',   time: '10:00 AM',loc: 'Vancouver', cat: 'Sikh' },
    { img: IMG.prayer,     name: 'HSUF Unity Meet',          date: 'December 8, 2024',    time: '5:00 PM', loc: 'Montreal', cat: 'Shared' },
    { img: IMG.havan,      name: 'Holi Festival of Colors',  date: 'March 25, 2025',      time: '12:00 PM',loc: 'Toronto', cat: 'Hindu' },
    { img: IMG.procession, name: 'Vaisakhi Celebration',     date: 'April 14, 2025',      time: '10:00 AM',loc: 'Winnipeg', cat: 'Sikh' },
    { img: IMG.kirtan,     name: 'Shared Wisdom Series',     date: 'Every Sunday',        time: '7:00 PM', loc: 'Online',  cat: 'Shared' },
  ];
  const filtered = filter === 'All' ? events : events.filter(e => e.cat === filter);
  return (
    <div className="inner-page">
      <div className="inner-hero" style={{ backgroundImage: `url(${IMG.procession})` }}>
        <div className="inner-overlay" />
        <div className="inner-hero-text"><h1>Community Events</h1><p>Hindu, Sikh & shared celebrations across Canada</p></div>
      </div>
      <div className="container">
        <Reveal>
          <div className="filter-tabs">
            {['All', 'Hindu', 'Sikh', 'Shared'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'active' : ''}>{f}</button>
            ))}
          </div>
        </Reveal>
        <div className="events-grid">
          {filtered.map((e, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="event-card">
                <div className="event-img"><img src={e.img} alt={e.name} /></div>
                <div className="event-body">
                  <span className={`badge badge-${e.cat}`}>{e.cat}</span>
                  <h3>{e.name}</h3>
                  <p>{e.date} · {e.time}</p>
                  <p>{e.loc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── DIRECTORY ────────────────────────────────────────────
function Directory() {
  const [search, setSearch] = useState('');
  const biz = [
    { img: IMG.langar,     name: 'Ananda Restaurant',       cat: 'Food', city: 'Toronto',   rate: '4.8', trad: 'Hindu', desc: 'Authentic North Indian vegetarian cuisine' },
    { img: IMG.community,  name: 'Sikh Community Services', cat: 'Community', city: 'Vancouver', rate: '4.9', trad: 'Sikh',  desc: 'Social services and family counseling' },
    { img: IMG.prayer,     name: 'Sacred Textiles',         cat: 'Clothing', city: 'Montreal',  rate: '4.7', trad: 'Both',  desc: 'Sarees, turbans, sherwanis and more' },
    { img: IMG.articles,   name: 'Dr. Sharma Medical',      cat: 'Health', city: 'Calgary',   rate: '4.9', trad: 'Hindu', desc: 'Culturally sensitive family medicine' },
    { img: IMG.kirtan,     name: 'Guru Nanak Academy',      cat: 'Education', city: 'Winnipeg',  rate: '4.8', trad: 'Sikh',  desc: 'Punjabi language and traditions' },
    { img: IMG.procession, name: 'Unity Event Planning',    cat: 'Events', city: 'Toronto',   rate: '4.7', trad: 'Both',  desc: 'Hindu and Sikh weddings and events' },
  ];
  const filtered = biz.filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.cat.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="inner-page">
      <div className="inner-hero" style={{ backgroundImage: `url(${IMG.business})` }}>
        <div className="inner-overlay" />
        <div className="inner-hero-text"><h1>Business Directory</h1><p>Verified Hindu and Sikh businesses across Canada</p></div>
      </div>
      <div className="container">
        <Reveal><input className="search-input" type="text" placeholder="Search by name or category..." value={search} onChange={e => setSearch(e.target.value)} /></Reveal>
        <div className="biz-grid">
          {filtered.map((b, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="biz-card">
                <div className="biz-img"><img src={b.img} alt={b.name} /></div>
                <div className="biz-body">
                  <div className="biz-meta-row">
                    <span className={`trad-badge trad-${b.trad}`}>{b.trad}</span>
                    <span className="biz-rating">★ {b.rate}</span>
                  </div>
                  <h3>{b.name}</h3>
                  <p className="biz-cat">{b.cat} · {b.city}</p>
                  <p className="biz-desc">{b.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── CONNECT ──────────────────────────────────────────────
function Connect() {
  const [city, setCity] = useState('All');
  const posts = [
    { name: 'Rajesh Kumar',   city: 'Toronto',   time: '2h ago', tag: 'Events',   text: 'Volunteers needed for Diwali! Great opportunity to give back to our community.' },
    { name: 'Simran Kaur',    city: 'Vancouver', time: '5h ago', tag: 'Business',  text: 'Just opened a new yoga studio focusing on traditional practices. All welcome!' },
    { name: 'Amit Patel',     city: 'Montreal',  time: '1d ago', tag: 'Help',      text: 'New to Montreal — seeking Gurudwara recommendations. Any suggestions?' },
    { name: 'Priya Singh',    city: 'Calgary',   time: '2d ago', tag: 'Culture',   text: 'Beautiful Diwali rangoli tutorial — sharing with our community!' },
    { name: 'Gurpreet Bains', city: 'Toronto',   time: '3d ago', tag: 'Events',    text: 'Incredible turnout at the Unity picnic! Thank you everyone who came.' },
  ];
  const filtered = city === 'All' ? posts : posts.filter(p => p.city === city);
  return (
    <div className="inner-page">
      <div className="inner-hero" style={{ backgroundImage: `url(${IMG.community})` }}>
        <div className="inner-overlay" />
        <div className="inner-hero-text"><h1>Connect Board</h1><p>City-based community networking</p></div>
      </div>
      <div className="container">
        <Reveal>
          <div className="filter-tabs">
            {['All', 'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Winnipeg'].map(c => (
              <button key={c} onClick={() => setCity(c)} className={city === c ? 'active' : ''}>{c}</button>
            ))}
          </div>
        </Reveal>
        <div className="posts-list">
          {filtered.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="post-card">
                <div className="post-avatar-circle">{p.name.charAt(0)}</div>
                <div className="post-body">
                  <div className="post-head"><strong>{p.name}</strong><span className="post-time">{p.city} · {p.time}</span></div>
                  <span className={`post-tag tag-${p.tag}`}>{p.tag}</span>
                  <p className="post-text">{p.text}</p>
                  <div className="post-actions">
                    <button>Like</button><button>Reply</button><button>Share</button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <div className="connect-cta">
            <p>Post and reply as a verified member</p>
            <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-forum-canadas-membership"
              target="_blank" rel="noreferrer" className="btn btn-gold">Become a Member</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ── ARTICLES ─────────────────────────────────────────────
function Articles() {
  const [filter, setFilter] = useState('All');
  const arts = [
    { img: IMG.prayer,    title: 'Spiritual Roots: Common Philosophy', cat: 'Spirituality', author: 'Dr. Priya Sharma', read: '8 min', featured: true,  desc: 'Explore the profound connections between Hindu Vedantic philosophy and Sikh teachings.' },
    { img: IMG.kirtan,    title: 'Gurbani Wisdom: Lessons for Modern Life', cat: 'Culture', author: 'Harpreet Singh',    read: '6 min', featured: true,  desc: 'Timeless wisdom from the Guru Granth Sahib applied to contemporary Canadian life.' },
    { img: IMG.diya,      title: 'Celebrating Hindu and Sikh Festivals', cat: 'Festivals',    author: 'Anjali Patel',      read: '5 min', featured: false, desc: 'A journey through vibrant festivals celebrating shared values of joy and community.' },
    { img: IMG.langar,    title: 'Seva in Action: Community Stories',   cat: 'Community',    author: 'Contributors',      read: '7 min', featured: false, desc: 'Real stories of members putting selfless service into action across Canada.' },
    { img: IMG.havan,     title: 'The Langar Tradition',                cat: 'Spirituality', author: 'Dr. Rajesh Kumar',  read: '6 min', featured: false, desc: 'Understanding Langar and its deep parallels in Hindu culture and hospitality.' },
    { img: IMG.lotus,     title: 'Bhakti and Devotion: A Shared Path',  cat: 'Culture',      author: 'Simran Kaur',       read: '7 min', featured: false, desc: 'The Bhakti tradition and its resonance in Sikh devotion — love as the path.' },
  ];
  const filtered = filter === 'All' ? arts : arts.filter(a => a.cat === filter);
  return (
    <div className="inner-page">
      <div className="inner-hero" style={{ backgroundImage: `url(${IMG.articles})` }}>
        <div className="inner-overlay" />
        <div className="inner-hero-text"><h1>Articles & Stories</h1><p>Celebrating Hindu-Sikh unity and shared heritage</p></div>
      </div>
      <div className="container">
        <h2 className="sub-heading">Featured</h2>
        <div className="featured-grid">
          {arts.filter(a => a.featured).map((a, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="featured-card">
                <img src={a.img} alt={a.title} />
                <div className="featured-body">
                  <span className="feat-badge">{a.cat}</span>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                  <div className="art-meta">{a.author} · {a.read} read</div>
                  <button className="read-btn">Read Article →</button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal><div className="filter-tabs" style={{ margin: '3rem 0 2rem' }}>
          {['All', 'Spirituality', 'Culture', 'Festivals', 'Community'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'active' : ''}>{f}</button>
          ))}
        </div></Reveal>
        <div className="art-list">
          {filtered.map((a, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="art-item">
                <img src={a.img} alt={a.title} className="art-thumb" />
                <div>
                  <span className="feat-badge">{a.cat}</span>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                  <p className="art-meta">{a.author} · {a.read} read</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}


// ── CONTACT ──────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errMsg, setErrMsg] = useState('');


  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      setErrMsg('Please fill in your name, email and message.'); return;
    }
    setStatus('sending'); setErrMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) { setStatus('success'); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }
      else { setStatus('error'); setErrMsg(data.error || 'Something went wrong.'); }
    } catch {
      setStatus('error'); setErrMsg('Network error. Please try again.');
    }
  };

  return (
    <div className="inner-page">
      <div className="inner-hero" style={{ background: 'linear-gradient(135deg,#1A3A6B 0%,#D4560A 100%)' }}>
        <div className="inner-overlay" style={{ background: 'rgba(0,0,0,0.35)' }} />
        <div className="inner-hero-text">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you — reach out anytime</p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 860, padding: '3rem 1.5rem' }}>

        {/* Info cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.2rem', marginBottom: '2.5rem' }}>
          {[
            { icon: '🌐', label: 'Website', val: 'www.hindusikhunity.com' },
            { icon: '📧', label: 'Email', val: 'info@hindusikhunity.com' },
            { icon: '📍', label: 'Address', val: '130 Dundas St East, Suite 406, Mississauga ON L5A 3V8' },
          ].map(({ icon, label, val }) => (
            <div key={label} style={{ background: '#FAF3E0', borderRadius: 12, padding: '1.2rem', borderLeft: '4px solid #D4560A', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
              <div style={{ color: '#888', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{label}</div>
              <div style={{ color: '#1A3A6B', fontWeight: 700, fontSize: 13 }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 30px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(135deg,#1A3A6B,#D4560A)', padding: '1.5rem 2rem' }}>
            <h2 style={{ color: '#fff', margin: 0, fontSize: '1.4rem' }}>Send Us a Message</h2>
            <p style={{ color: '#FFD98A', margin: '4px 0 0', fontSize: 13 }}>We'll get back to you within 24–48 hours</p>
          </div>

          <div style={{ padding: '2rem' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🙏</div>
                <h3 style={{ color: '#1A3A6B', marginBottom: 8 }}>Thank You!</h3>
                <p style={{ color: '#555', lineHeight: 1.7 }}>Your message has been received. We'll be in touch shortly.<br/>A confirmation has been sent to your email.</p>
                <button onClick={() => setStatus('idle')} style={{ marginTop: 20, padding: '10px 28px', background: '#D4560A', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>Send Another</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#555', marginBottom: 6 }}>Full Name *</label>
                    <input name="name" value={form.name} onChange={handle} placeholder="Harpreet Singh"
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#555', marginBottom: 6 }}>Email Address *</label>
                    <input name="email" value={form.email} onChange={handle} placeholder="you@email.com" type="email"
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#555', marginBottom: 6 }}>Phone (optional)</label>
                    <input name="phone" value={form.phone} onChange={handle} placeholder="+1 (416) 000-0000"
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#555', marginBottom: 6 }}>Subject</label>
                    <select name="subject" value={form.subject} onChange={handle}
                      style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', background: '#fff', outline: 'none' }}>
                      <option value="">Select a subject...</option>
                      {['General Inquiry','Membership','Events & Activities','Volunteer Opportunities','Media & Press','Partnership','Other'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#555', marginBottom: 6 }}>Message *</label>
                  <textarea name="message" value={form.message} onChange={handle} rows={5} placeholder="How can we help you?"
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }} />
                </div>
                {errMsg && <p style={{ color: '#c0392b', fontSize: 13, margin: 0 }}>⚠️ {errMsg}</p>}
                <button onClick={submit} disabled={status === 'sending'}
                  style={{ padding: '13px 32px', background: status === 'sending' ? '#aaa' : 'linear-gradient(135deg,#D4560A,#b84000)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: status === 'sending' ? 'not-allowed' : 'pointer', transition: 'all 0.2s', alignSelf: 'flex-start' }}>
                  {status === 'sending' ? 'Sending... 🙏' : 'Send Message →'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Leadership */}
        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <h3 style={{ color: '#1A3A6B', marginBottom: '1.5rem' }}>Our Leadership</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1rem' }}>
            {[
              { name: 'Harji Bajwa', role: 'President' },
              { name: 'Surinder Sharma', role: 'Chairman' },
              { name: 'Dr. Rajesh Bhatia', role: 'VP & Secretary' },
            ].map(({ name, role }) => (
              <div key={name} style={{ background: '#FAF3E0', borderRadius: 12, padding: '1.2rem', border: '1px solid #F0C060' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#D4560A,#1A3A6B)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: '#fff', fontWeight: 700, fontSize: 18 }}>{name[0]}</div>
                <div style={{ fontWeight: 700, color: '#1A3A6B', fontSize: 14 }}>{name}</div>
                <div style={{ color: '#D4560A', fontSize: 12, marginTop: 2 }}>{role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SEVA AI ──────────────────────────────────────────────
function Seva() {
  const [msgs, setMsgs] = useState([
    { role: 'bot', text: 'Namaskar! I am Seva (सेवा / ਸੇਵਾ). I can guide you on Hindu-Sikh unity, Gurbani wisdom, Vedic philosophy, and our shared cultural heritage. What would you like to explore? 🙏' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const suggested = [
    'What do Hinduism and Sikhism share?',
    'Tell me about Guru Nanak Dev Ji',
    'What is the meaning of Seva?',
    'Explain the Bhakti tradition',
    'What is Langar?',
    'Share a Gurbani verse',
  ];
  const fallbacks = [
    'Both traditions celebrate Seva (selfless service) as a direct path to the divine. Guru Nanak and the Hindu Bhakti saints both taught that serving others is serving God.',
    'Guru Nanak Dev Ji was profoundly influenced by the Hindu Bhakti movement. His teachings bridge both traditions through the concepts of Nam Simran and devotional love.',
    'The Guru Granth Sahib contains compositions by Hindu saints including Kabir, Namdev, and Ravidas — a beautiful weaving of both traditions.',
    'Ek Onkar (One God) in Sikhism resonates with the Advaita Vedanta teaching of Ekam Brahm — the ultimate unity of all existence.',
    'Langar, the community meal in every Gurdwara, reflects the Hindu value of Annadana — feeding all without distinction. Both celebrate nourishing humanity.',
  ];
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const send = async (text) => {
    const msg = text || input;
    if (!msg.trim() || loading) return;
    setMsgs(m => [...m, { role: 'user', text: msg }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/seva', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: msg }) });
      const data = await res.json();
      setMsgs(m => [...m, { role: 'bot', text: data.response || fallbacks[Math.floor(Math.random() * fallbacks.length)] }]);
    } catch {
      setMsgs(m => [...m, { role: 'bot', text: fallbacks[Math.floor(Math.random() * fallbacks.length)] }]);
    }
    setLoading(false);
  };

  return (
    <div className="inner-page seva-page">
      <div className="seva-hero" style={{ backgroundImage: `url(${IMG.prayerHands})` }}>
        <div className="inner-overlay" />
        <div className="inner-hero-text">
          <div className="seva-icon-row">
            <span className="seva-sym">ੴ</span>
            <span className="seva-plus">+</span>
            <span className="seva-sym">ॐ</span>
          </div>
          <h1>Seva AI</h1>
          <p>Wisdom on Hindu-Sikh Unity and Shared Heritage</p>
        </div>
      </div>
      <div className="container">
        <div className="chat-box" id="chat-box">
          {msgs.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>
              {m.role === 'bot' && <div className="chat-av bot-av">ੴ</div>}
              <div className="chat-bubble">{m.text}</div>
              {m.role === 'user' && <div className="chat-av user-av">You</div>}
            </div>
          ))}
          {loading && (
            <div className="chat-msg bot">
              <div className="chat-av bot-av">ੴ</div>
              <div className="chat-bubble typing"><span /><span /><span /></div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="chat-form">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask about Hindu-Sikh heritage, Gurbani, Vedas..." disabled={loading} />
          <button onClick={() => send()} disabled={loading || !input.trim()}>Send</button>
        </div>
        <div className="seva-prompts">
          {suggested.map((q, i) => <button key={i} onClick={() => send(q)}>{q}</button>)}
        </div>
      </div>
    </div>
  );
}

// ── FOOTER ───────────────────────────────────────────────
function VipRsvp() {
  return (
    <div className="inner-page vip-rsvp-page">
      <div className="vip-rsvp-hero" style={{ backgroundImage: 'url(/sacred/harmandir.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="vip-rsvp-hero-overlay" />
        <div className="vip-rsvp-hero-content">
          <div className="vip-rsvp-badge">V I P</div>
          <div className="vip-rsvp-presents">HINDU SIKH UNITY FORUM CANADA &nbsp;·&nbsp; BY INVITATION ONLY</div>
          <h1 className="vip-rsvp-title">Hindu Sikh Unity Convention 2026</h1>
          <p className="vip-rsvp-theme">"Saanjhi Virasat, Saanjha Bhavishya"</p>
          <p className="vip-rsvp-subtheme">Shared Heritage &middot; Shared Future</p>
        </div>
      </div>

      <div className="container vip-rsvp-body">
        <div className="vip-rsvp-intro">
          <p className="vip-rsvp-intro-text">
            You have been personally selected as an <strong>Honoured VIP Guest</strong> of the
            Hindu Sikh Unity Convention 2026 — a landmark gathering of 250 senior Hindu and Sikh
            leaders from across North America.
          </p>
          <p className="vip-rsvp-intro-text">
            This is a working convention featuring keynote addresses, ten Community Excellence Awards,
            the signing of the Unity Compact, and a formal luncheon. Your presence will honour
            this historic occasion.
          </p>
        </div>

        <div className="vip-rsvp-details">
          <div className="vip-detail-card">
            <div className="vip-detail-label">DATE</div>
            <div className="vip-detail-value">Saturday, August 22, 2026</div>
          </div>
          <div className="vip-detail-card">
            <div className="vip-detail-label">TIME</div>
            <div className="vip-detail-value">10:00 AM – 2:00 PM</div>
            <div className="vip-detail-sub">Please arrive by 9:45 AM</div>
          </div>
          <div className="vip-detail-card">
            <div className="vip-detail-label">VENUE</div>
            <div className="vip-detail-value">Chandni Victoria Convention Centre</div>
            <div className="vip-detail-sub">2935 Drew Rd, Mississauga, ON L4T 0A1</div>
          </div>
        </div>

        <div className="vip-rsvp-programme">
          <h2 className="vip-section-heading">Programme Highlights</h2>
          <div className="vip-programme-grid">
            {[
              { icon: '🕙', label: 'Welcome Reception', desc: 'Arrival, registration and networking with distinguished guests' },
              { icon: '🎤', label: 'Keynote Addresses', desc: 'Addresses by senior Hindu and Sikh community leaders from across North America' },
              { icon: '🏅', label: 'Community Excellence Awards', desc: 'Recognition of ten outstanding individuals for their contribution to Hindu-Sikh unity' },
              { icon: '📜', label: 'Unity Compact Signing', desc: 'Historic signing of the Unity Compact — a living document of shared values and commitment' },
              { icon: '🎶', label: 'Cultural Programme', desc: 'Performances celebrating the shared heritage of Hindu and Sikh traditions' },
              { icon: '🍽️', label: 'Formal Luncheon', desc: 'Vegetarian luncheon with Jain options — seated by table of honour' },
            ].map((item, i) => (
              <div key={i} className="vip-programme-item">
                <div className="vip-programme-icon">{item.icon}</div>
                <div>
                  <div className="vip-programme-label">{item.label}</div>
                  <div className="vip-programme-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="vip-rsvp-cta-section">
          <div className="vip-rsvp-cta-card">
            <div className="vip-rsvp-cta-badge">RSVP REQUESTED</div>
            <h2 className="vip-rsvp-cta-heading">Confirm Your Attendance</h2>
            <p className="vip-rsvp-cta-text">
              Kindly RSVP by <strong>August 10, 2026</strong> so our VIP Protocol team can
              confirm your seating and arrange your arrival experience.
            </p>
            <p className="vip-rsvp-cta-text">
              This invitation is <strong>personal and non-transferable</strong>. A member of
              our team will follow up after your RSVP with further details.
            </p>
            <a
              href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-convention-2026-vip-rsvp"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-vip-rsvp"
            >
              Confirm My Attendance
            </a>
            <p className="vip-rsvp-contact">
              Enquiries: <a href="mailto:info@hindusikhunity.com">info@hindusikhunity.com</a>
              &nbsp;&nbsp;·&nbsp;&nbsp;
              <a href="https://www.hindusikhunity.com" target="_blank" rel="noopener noreferrer">www.hindusikhunity.com</a>
            </p>
          </div>
        </div>

        <div className="vip-rsvp-quote">
          <blockquote>
            "Two traditions, woven by centuries of shared sacrifice and devotion,
            walking forward as one — Stronger Together."
          </blockquote>
          <cite>— Harji Bajwa &amp; Surinder Sharma, Hindu Sikh Unity Forum Canada</cite>
        </div>
      </div>
    </div>
  );
}

function Footer({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo(0, 0); };
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.name || !form.email || !form.message) { setStatus('error'); return; }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subject: 'Website Contact Form' })
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  const inp = { style: { width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' } };

  return (
    <footer className="footer">
      {/* Contact Section */}
      <div style={{ background: 'linear-gradient(135deg,#0E1A35 0%,#1a0a04 100%)', borderTop: '3px solid #D4560A', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '3rem', alignItems: 'start' }}>
          
          {/* Contact Info */}
          <div>
            <h3 style={{ color: '#F0C060', fontFamily: 'Yeseva One, serif', fontSize: '1.6rem', marginBottom: '1rem' }}>Get In Touch</h3>
            <p style={{ color: 'rgba(255,255,255,.75)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              We'd love to hear from you. Reach out for membership inquiries, event information, or partnership opportunities.
            </p>
            {[
              { icon: '🌐', label: 'Website', val: 'www.hindusikhunity.com' },
              { icon: '📧', label: 'Email', val: 'info@hindusikhunity.com' },
              { icon: '📍', label: 'Address', val: '130 Dundas St East, Suite 406, Mississauga ON L5A 3V8' },
              { icon: '👤', label: 'President', val: 'Harji Bajwa — 416-895-6788' },
              { icon: '👤', label: 'Chairman', val: 'Surinder Sharma — 416-871-1718' },
            ].map(({ icon, label, val }) => (
              <div key={label} style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.8rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18, marginTop: 2 }}>{icon}</span>
                <div>
                  <div style={{ color: '#F0C060', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
                  <div style={{ color: 'rgba(255,255,255,.85)', fontSize: 13 }}>{val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div>
            <h3 style={{ color: '#F0C060', fontFamily: 'Yeseva One, serif', fontSize: '1.6rem', marginBottom: '1rem' }}>Send a Message</h3>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,.05)', borderRadius: 12 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🙏</div>
                <p style={{ color: '#FFD98A', fontWeight: 700, marginBottom: 8 }}>Thank you!</p>
                <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 13 }}>We'll get back to you shortly. A confirmation has been sent to your email.</p>
                <button onClick={() => { setStatus('idle'); setForm({ name:'', email:'', phone:'', message:'' }); }}
                  style={{ marginTop: 16, padding: '8px 20px', background: '#D4560A', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>Send Another</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '0.8rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,.6)', fontSize: 12, marginBottom: 4 }}>Full Name *</label>
                    <input name="name" value={form.name} onChange={handle} placeholder="Your name" {...inp} />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,.6)', fontSize: 12, marginBottom: 4 }}>Email *</label>
                    <input name="email" value={form.email} onChange={handle} placeholder="you@email.com" type="email" {...inp} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,.6)', fontSize: 12, marginBottom: 4 }}>Phone (optional)</label>
                  <input name="phone" value={form.phone} onChange={handle} placeholder="+1 (416) 000-0000" {...inp} />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,.6)', fontSize: 12, marginBottom: 4 }}>Message *</label>
                  <textarea name="message" value={form.message} onChange={handle} rows={4} placeholder="How can we help you?"
                    style={{ ...inp.style, resize: 'vertical' }} />
                </div>
                {status === 'error' && <p style={{ color: '#ff8a80', fontSize: 12, margin: 0 }}>⚠️ Please fill all required fields and try again.</p>}
                <button onClick={submit} disabled={status === 'sending'}
                  style={{ padding: '12px 28px', background: status === 'sending' ? '#666' : 'linear-gradient(135deg,#D4560A,#b84000)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
                  {status === 'sending' ? 'Sending... 🙏' : 'Send Message →'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/logo.jpg" alt="HSUF Canada Logo" className="footer-logo-img" />
          <h3>Hindu Sikh Unity Forum Canada</h3>
          <p>Stronger Together</p>
          <p className="footer-script">ਸਾਂਝ ਵਿੱਚ ਸ਼ਕਤੀ • साझा विरासत</p>
        </div>
        <div className="footer-col">
          <h4>Platform</h4>
          <button onClick={() => go('membership')}>Membership</button>
          <button onClick={() => go('directory')}>Business Directory</button>
          <button onClick={() => go('connect')}>Connect Board</button>
          <button onClick={() => go('seva')}>Seva AI</button>
        </div>
        <div className="footer-col">
          <h4>Community</h4>
          <button onClick={() => go('events')}>Events Calendar</button>
          <button onClick={() => go('activities')}>Past Activities</button>
          <button onClick={() => go('articles')}>Articles</button>
          <button onClick={() => go('connect')}>City Networks</button>
        </div>
        <div className="footer-col">
          <h4>Organization</h4>
          <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-forum-canadas-membership"
            target="_blank" rel="noreferrer">Join for $1</a>
          <button onClick={() => go('membership')}>Member Card</button>
          <button onClick={() => go('home')}>About</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Hindu Sikh Unity Forum Canada. All rights reserved. Established April 17, 2023 · Celebrating shared heritage.</p>
      </div>
    </footer>
  );
}

// ── APP ROOT ─────────────────────────────────────────────
export default function App() {
  const getInitialPage = () => {
    if (window.location.hash === '#vip-2026') return 'vip';
    return 'home';
  };
  const [page, setPage] = useState(getInitialPage);
  const goTo = (p) => { setPage(p); window.scrollTo(0, 0); };
  return (
    <div className="app">
      <Nav page={page} setPage={goTo} />
      {page === 'home'       && <Home setPage={goTo} />}
      {page === 'membership' && <Membership />}
      {page === 'events'     && <Events />}
      {page === 'activities' && <Activities />}
      {page === 'directory'  && <Directory />}
      {page === 'connect'    && <Connect />}
      {page === 'articles'   && <Articles />}
      {page === 'seva'       && <Seva />}
      {page === 'contact'    && <Contact />}
      {page === 'convention'  && <ConventionPage />}
      {page === 'vip'        && <VipRsvp />}
      <Footer setPage={goTo} />
    </div>
  );
}
