import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// ── Unsplash image library (verified popular IDs) ───────
const IMG = {
  // Hero slides - 6 real photographs of sacred sites
  kailash:        '/sacred/kailash.png',
  harmandirSahib: '/sacred/harmandir.jpg',
  hemkuntSahib:   '/sacred/hemkunt.png',
  kedarnath:      '/sacred/kedarnath.jpg',
  patnaSahib:     '/sacred/patna-sahib.jpg',
  nainaDevi:      '/sacred/naina-devi.jpg',
  // Gallery panels - real sacred moment photos
  prayerHands:    '/gallery/sadh-sangat.jpg',       // Sikh congregation in prayer
  diyaLamps:      '/gallery/diya-aarti.jpg',         // Gangotri Aarti with lamps
  lotus:          '/gallery/gurbani_103.jpg',         // Beautiful spiritual landscape
  kirtan:         '/gallery/gurdwara-scene.jpg',      // Gurdwara scene
  havan:          '/gallery/temple-prayer.jpg',       // Temple ritual/prayer
  turban:         '/gallery/turban.jpg',              // Nihang Sikh turban
  // Card headers - contextually relevant real photos
  memberCard:     '/sacred/harmandir-best.png',      // Golden Temple = sacred membership
  community:      '/gallery/sadh-sangat.jpg',         // Congregation = connect board
  business:       '/gallery/community-gathering.jpg', // Community = business directory
  calendar:       '/gallery/temple-pilgrims.jpg',     // Pilgrims at temple = events
  articles:       '/gallery/gurbani_101.jpg',         // Gurbani quote landscape = articles
  seva:           '/gallery/seva-langar.jpg',          // Langar seva = Seva AI
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
  { img: IMG.kailash,        title: 'Kailash Mansarovar',   sub: 'ਕੈਲਾਸ਼ ਮਾਨਸਰੋਵਰ • कैलाश मानसरोवर — Abode of Shiva, Sacred to All' },
  { img: IMG.harmandirSahib, title: 'Harmandir Sahib',      sub: 'ਹਰਿਮੰਦਰ ਸਾਹਿਬ — The Golden Temple, Amritsar' },
  { img: IMG.hemkuntSahib,   title: 'Hemkunt Sahib',        sub: 'ਹੇਮਕੁੰਟ ਸਾਹਿਬ — Where Guru Gobind Singh Meditated' },
  { img: IMG.kedarnath,      title: 'Kedarnath Temple',     sub: 'केदारनाथ मंदिर — Ancient Shiva Shrine in the Himalayas' },
  { img: IMG.patnaSahib,     title: 'Patna Sahib Gurdwara', sub: 'ਪਟਨਾ ਸਾਹਿਬ — Birthplace of Guru Gobind Singh Ji' },
  { img: IMG.nainaDevi,      title: 'Naina Devi Temple',    sub: 'नैना देवी मंदिर — Sacred Shakti Peeth, Himachal Pradesh' },
];

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
        <div className="hero-badge">🇨🇦 Celebrating Unity Since 2019</div>
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
    { id: 'events', label: 'Events' }, { id: 'directory', label: 'Directory' },
    { id: 'connect', label: 'Connect' }, { id: 'articles', label: 'Articles' },
    { id: 'seva', label: 'Seva AI' },
  ];
  const go = (id) => { setPage(id); setOpen(false); window.scrollTo(0, 0); };

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="shimmer-bar" />
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => go('home')}>
          <div className="logo-circle">
            <span className="logo-ik">ੴ</span>
            <span className="logo-om">ॐ</span>
          </div>
          <span className="logo-name">HSUF Canada</span>
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
    { img: IMG.prayerHands, caption: 'Sadh Sangat — The Holy Congregation', wide: true },
    { img: IMG.diyaLamps,   caption: 'Ganga Aarti — Sacred Fire & Light',     wide: false },
    { img: IMG.lotus,       caption: 'Gurbani — Divine Wisdom',               wide: false },
    { img: IMG.kirtan,      caption: 'Gurdwara Seva — Sacred Service',        wide: false },
    { img: IMG.havan,       caption: 'Badrinath — Himalayan Pilgrimage',      wide: false },
    { img: IMG.turban,      caption: 'Dastar — The Nihang Crown of Honour',   wide: true },
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

// ── HOME ─────────────────────────────────────────────────
function Home({ setPage }) {
  return (
    <div className="page-home">
      <HeroSlider setPage={setPage} />
      <section className="stats-bar">
        <Counter end={5000} label="Members" />
        <Counter end={12}   label="Cities" />
        <Counter end={5}    label="Years of Unity" />
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
function Footer({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo(0, 0); };
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo-circle"><span>ੴ</span><span>ॐ</span></div>
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
        <p>© 2024 Hindu Sikh Unity Forum Canada. All rights reserved. Celebrating shared heritage.</p>
      </div>
    </footer>
  );
}

// ── APP ROOT ─────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('home');
  const goTo = (p) => { setPage(p); window.scrollTo(0, 0); };
  return (
    <div className="app">
      <Nav page={page} setPage={goTo} />
      {page === 'home'       && <Home setPage={goTo} />}
      {page === 'membership' && <Membership />}
      {page === 'events'     && <Events />}
      {page === 'directory'  && <Directory />}
      {page === 'connect'    && <Connect />}
      {page === 'articles'   && <Articles />}
      {page === 'seva'       && <Seva />}
      <Footer setPage={goTo} />
    </div>
  );
}
