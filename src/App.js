import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// ── Scroll-reveal hook ──────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay=0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`, opacity: visible?1:0, transform: visible?'translateY(0)':'translateY(40px)' }}>
      {children}
    </div>
  );
}

// ── Particle Canvas ─────────────────────────────────────
function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const symbols = ['ॐ','☬','✦','◈','⬡'];
    const particles = Array.from({length:35}, () => ({
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4,
      symbol: symbols[Math.floor(Math.random()*symbols.length)],
      size: 12 + Math.random()*22, opacity: .07 + Math.random()*.12,
      color: Math.random()>.5 ? '#D4560A' : '#F0C060',
    }));
    let raf;
    function draw() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.x<0) p.x=canvas.width; if(p.x>canvas.width) p.x=0;
        if(p.y<0) p.y=canvas.height; if(p.y>canvas.height) p.y=0;
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.font = `${p.size}px serif`;
        ctx.fillText(p.symbol, p.x, p.y);
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}} />;
}

// ── Counter Animation ───────────────────────────────────
function Counter({ end, label }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
    if(!visible) return;
    let start = 0;
    const step = end / 60;
    const t = setInterval(() => { start += step; if(start>=end){ setCount(end); clearInterval(t); } else setCount(Math.floor(start)); }, 20);
    return () => clearInterval(t);
  }, [visible, end]);
  return (
    <div ref={ref} className="stat-item">
      <span className="stat-num">{count.toLocaleString()}+</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// ── Nav ─────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = ['home','membership','events','directory','connect','articles','seva'];
  return (
    <nav className={`nav ${scrolled?'scrolled':''}`}>
      <div className="nav-container">
        <button className="logo" onClick={()=>{ setPage('home'); setOpen(false); }}>
          <span className="logo-symbols">ॐ ☬</span>
          <span className="logo-text">HSUF Canada</span>
        </button>
        <div className={`nav-links ${open?'open':''}`}>
          {links.map(p => (
            <button key={p} onClick={()=>{ setPage(p); setOpen(false); window.scrollTo(0,0); }} className={page===p?'active':''}>
              {p.charAt(0).toUpperCase()+p.slice(1)}
            </button>
          ))}
        </div>
        <button className="hamburger" onClick={()=>setOpen(!open)}>{open?'✕':'☰'}</button>
      </div>
    </nav>
  );
}

// ── HOME ─────────────────────────────────────────────────
function Home({ setPage }) {
  const features = [
    {icon:'🎫',title:'Digital Member Card',desc:'QR-verified membership for community events',color:'#fff8f0'},
    {icon:'👥',title:'Connect Board',desc:'City-based networking across Canada',color:'#f0f4ff'},
    {icon:'🏪',title:'Business Directory',desc:'Verified Hindu & Sikh businesses',color:'#f0fff4'},
    {icon:'📅',title:'Events Calendar',desc:'Festivals and community gatherings',color:'#fff0f8'},
    {icon:'📖',title:'Articles & Blog',desc:'Unity stories and cultural heritage',color:'#fffbf0'},
    {icon:'🤖',title:'Seva AI',desc:'Wisdom on Hindu-Sikh heritage',color:'#f8f0ff'},
  ];

  return (
    <div className="page-home">
      {/* HERO */}
      <section className="hero">
        <Particles />
        <div className="hero-glow glow1" />
        <div className="hero-glow glow2" />
        <div className="hero-content">
          <div className="hero-badge">🇨🇦 Celebrating Unity in Canada</div>
          <h1>
            <span className="line1">Hindu Sikh</span>
            <span className="line2">Unity Forum</span>
            <span className="line3">Canada</span>
          </h1>
          <p className="hero-tagline">Stronger Together</p>
          <p className="hero-sub">Celebrating shared heritage, fostering unity and understanding across Canada's vibrant communities</p>
          <div className="hero-btns">
            <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-forum-canadas-membership" target="_blank" rel="noreferrer" className="btn btn-hero">
              <span>Join Now — $1</span><span className="btn-arrow">→</span>
            </a>
            <button className="btn btn-ghost" onClick={()=>setPage('seva')}>Talk to Seva AI ✨</button>
          </div>
          <div className="hero-symbols">
            <span>ॐ</span><span className="divider">|</span><span>☬</span>
          </div>
        </div>
        <div className="scroll-hint">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <Counter end={5000} label="Members" />
        <Counter end={12} label="Cities" />
        <Counter end={200} label="Events" />
        <Counter end={50} label="Businesses" />
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <Reveal><h2 className="section-title">Our Community Platform</h2></Reveal>
        <Reveal delay={.1}><p className="section-sub">Everything you need to connect, celebrate, and grow together</p></Reveal>
        <div className="features-grid">
          {features.map((f,i) => (
            <Reveal key={i} delay={i*.08}>
              <div className="feat-card" style={{background:f.color}}>
                <div className="feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="feat-arrow">→</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* UNITY VISUAL */}
      <section className="unity-section">
        <Reveal>
          <div className="unity-visual">
            <div className="unity-circle circle-left">
              <span className="big-symbol">ॐ</span>
              <p>Hindu</p>
            </div>
            <div className="unity-center">
              <span>🤝</span>
              <p>Together</p>
            </div>
            <div className="unity-circle circle-right">
              <span className="big-symbol">☬</span>
              <p>Sikh</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={.2}>
          <h2>Rooted in Shared Values</h2>
          <p>Both traditions celebrate seva (service), devotion, community, and the divine light within all people. Our differences enrich us — our shared values unite us.</p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <Reveal>
          <h2>Ready to Join?</h2>
          <p>Become a verified member of HSUF Canada today</p>
          <div className="big-price">$1</div>
          <p className="price-note">One-time membership · Digital card · Full community access</p>
          <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-forum-canadas-membership" target="_blank" rel="noreferrer" className="btn btn-cta">Become a Member →</a>
        </Reveal>
      </section>
    </div>
  );
}

// ── MEMBERSHIP ───────────────────────────────────────────
function Membership() {
  const benefits = [
    {icon:'🎫',title:'Digital Member Card',desc:'QR-verified card accepted at all HSUF events and partner businesses'},
    {icon:'👥',title:'Connect Board Access',desc:'Post, network and meet community members in your city'},
    {icon:'📅',title:'Event Early Access',desc:'First access to Hindu & Sikh festivals and community gatherings'},
    {icon:'🏪',title:'Business Directory',desc:'Full access to verified Hindu & Sikh businesses across Canada'},
    {icon:'📚',title:'Premium Articles',desc:'Exclusive access to cultural heritage resources and stories'},
    {icon:'🤝',title:'Unity Community',desc:'Join thousands of members celebrating shared heritage'},
  ];
  return (
    <div className="page">
      <div className="page-hero-strip">
        <Reveal><div className="page-emoji">🎫</div></Reveal>
        <Reveal delay={.1}><h1>Join HSUF Canada</h1></Reveal>
        <Reveal delay={.2}><p>One membership, full community access</p></Reveal>
      </div>
      <div className="container">
        <div className="bento-grid">
          {benefits.map((b,i) => (
            <Reveal key={i} delay={i*.07}>
              <div className="bento-card">
                <span className="bento-icon">{b.icon}</span>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={.3}>
          <div className="cta-section" style={{marginTop:'3rem'}}>
            <h2>One Payment. Full Access.</h2>
            <div className="big-price">$1</div>
            <p className="price-note">No recurring fees · No hidden charges</p>
            <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-forum-canadas-membership" target="_blank" rel="noreferrer" className="btn btn-cta">Join Now →</a>
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
    {icon:'🪔',name:'Diwali Celebration 2024',date:'November 1, 2024',time:'6:00 PM',loc:'Toronto Convention Centre',cat:'Hindu',color:'#fff8f0',border:'#fda'},
    {icon:'☬',name:'Guru Nanak Jayanti',date:'November 15, 2024',time:'10:00 AM',loc:'Gurudwara Sahib, Vancouver',cat:'Sikh',color:'#f0f4ff',border:'#c3d4ff'},
    {icon:'🤝',name:'HSUF Unity Meet & Greet',date:'December 8, 2024',time:'5:00 PM',loc:'Community Centre, Montreal',cat:'Shared',color:'#f8f0ff',border:'#dcc3ff'},
    {icon:'🎨',name:'Holi Festival of Colors',date:'March 25, 2025',time:'12:00 PM',loc:"Queen's Park, Toronto",cat:'Hindu',color:'#fff8f0',border:'#fda'},
    {icon:'💃',name:'Vaisakhi Celebration',date:'April 14, 2025',time:'10:00 AM',loc:'Kitchener-Waterloo',cat:'Sikh',color:'#f0f4ff',border:'#c3d4ff'},
    {icon:'📖',name:'Shared Wisdom Series',date:'Every Sunday',time:'7:00 PM',loc:'Online via Zoom',cat:'Shared',color:'#f8f0ff',border:'#dcc3ff'},
  ];
  const filtered = filter==='All' ? events : events.filter(e=>e.cat===filter);
  return (
    <div className="page">
      <div className="page-hero-strip">
        <Reveal><div className="page-emoji">📅</div></Reveal>
        <Reveal delay={.1}><h1>Community Events</h1></Reveal>
        <Reveal delay={.2}><p>Hindu, Sikh and shared celebrations across Canada</p></Reveal>
      </div>
      <div className="container">
        <Reveal>
          <div className="filter-tabs">
            {['All','Hindu','Sikh','Shared'].map(f => (
              <button key={f} onClick={()=>setFilter(f)} className={filter===f?'active':''}>{f}</button>
            ))}
          </div>
        </Reveal>
        <div className="events-grid">
          {filtered.map((e,i) => (
            <Reveal key={i} delay={i*.06}>
              <div className="event-card" style={{background:e.color, borderColor:e.border}}>
                <div className="event-top">
                  <span className="event-icon">{e.icon}</span>
                  <span className={`badge badge-${e.cat}`}>{e.cat}</span>
                </div>
                <h3>{e.name}</h3>
                <p>📅 {e.date}</p>
                <p>🕐 {e.time}</p>
                <p>📍 {e.loc}</p>
                <button className="event-btn">Learn More →</button>
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
    {icon:'🍛',name:'Ananda Restaurant',cat:'Food & Dining',city:'Toronto',rate:4.8,trad:'Hindu',desc:'Authentic North Indian vegetarian cuisine'},
    {icon:'🤝',name:'Sikh Community Services',cat:'Community',city:'Vancouver',rate:4.9,trad:'Sikh',desc:'Social services and family counseling'},
    {icon:'👗',name:'Sacred Textiles',cat:'Clothing',city:'Montreal',rate:4.7,trad:'Both',desc:'Sarees, turbans, sherwanis and kurtas'},
    {icon:'⚕️',name:'Dr. Sharma Medical',cat:'Healthcare',city:'Calgary',rate:4.9,trad:'Hindu',desc:'Culturally sensitive family medicine'},
    {icon:'📚',name:'Guru Nanak Academy',cat:'Education',city:'Winnipeg',rate:4.8,trad:'Sikh',desc:'Punjabi language and traditions'},
    {icon:'🎉',name:'Unity Event Planning',cat:'Events',city:'Toronto',rate:4.7,trad:'Both',desc:'Hindu & Sikh weddings and events'},
  ];
  const filtered = biz.filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.cat.toLowerCase().includes(search.toLowerCase()));
  const tradColor = {Hindu:{bg:'#fef3c7',text:'#92400e'}, Sikh:{bg:'#dbeafe',text:'#1e40af'}, Both:{bg:'#f3e8ff',text:'#6b21a8'}};
  return (
    <div className="page">
      <div className="page-hero-strip">
        <Reveal><div className="page-emoji">🏪</div></Reveal>
        <Reveal delay={.1}><h1>Business Directory</h1></Reveal>
        <Reveal delay={.2}><p>Verified Hindu & Sikh businesses across Canada</p></Reveal>
      </div>
      <div className="container">
        <Reveal>
          <input className="search-input" type="text" placeholder="🔍 Search by name or category..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </Reveal>
        <div className="biz-grid">
          {filtered.map((b,i) => (
            <Reveal key={i} delay={i*.06}>
              <div className="biz-card">
                <div className="biz-top">
                  <span className="biz-icon">{b.icon}</span>
                  <span className="biz-rating">⭐ {b.rate}</span>
                </div>
                <h3>{b.name}</h3>
                <div className="biz-badges">
                  <span className="biz-cat">{b.cat}</span>
                  <span className="biz-trad" style={{background:tradColor[b.trad]?.bg, color:tradColor[b.trad]?.text}}>{b.trad}</span>
                </div>
                <p className="biz-desc">{b.desc}</p>
                <p className="biz-city">📍 {b.city}</p>
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
    {avatar:'👨',name:'Rajesh Kumar',city:'Toronto',time:'2h ago',tag:'Events',text:'Looking for volunteers for Diwali celebration in October! Great opportunity to give back to our community 🪔'},
    {avatar:'👩',name:'Simran Kaur',city:'Vancouver',time:'5h ago',tag:'Business',text:'Just opened a new yoga studio focusing on traditional Hindu & Sikh practices. All welcome! 🙏'},
    {avatar:'👨',name:'Amit Patel',city:'Montreal',time:'1d ago',tag:'Help',text:'New to Montreal — seeking a good Gurudwara recommendation. Any suggestions?'},
    {avatar:'👩',name:'Priya Singh',city:'Calgary',time:'2d ago',tag:'Culture',text:'Beautiful Diwali rangoli tutorial video — sharing with the community ✨'},
    {avatar:'👨',name:'Gurpreet Bains',city:'Toronto',time:'3d ago',tag:'Events',text:'Incredible turnout at last weekend\'s Unity picnic! Thank you all who came 🤝'},
  ];
  const filtered = city==='All' ? posts : posts.filter(p=>p.city===city);
  const tagColor = {Events:'#fee2b3',Business:'#dbeafe',Help:'#d1fae5',Culture:'#f3e8ff'};
  return (
    <div className="page">
      <div className="page-hero-strip">
        <Reveal><div className="page-emoji">👥</div></Reveal>
        <Reveal delay={.1}><h1>Connect Board</h1></Reveal>
        <Reveal delay={.2}><p>City-based community networking — verified members only</p></Reveal>
      </div>
      <div className="container">
        <Reveal>
          <div className="filter-tabs">
            {['All','Toronto','Vancouver','Montreal','Calgary','Winnipeg'].map(c => (
              <button key={c} onClick={()=>setCity(c)} className={city===c?'active':''}>{c}</button>
            ))}
          </div>
        </Reveal>
        <div className="connect-compose">
          <p>💬 <strong>Share with your community</strong></p>
          <textarea disabled placeholder="Verified members can post here..."></textarea>
        </div>
        <div className="posts-list">
          {filtered.map((p,i) => (
            <Reveal key={i} delay={i*.05}>
              <div className="post-card">
                <span className="post-avatar">{p.avatar}</span>
                <div className="post-body">
                  <div className="post-head">
                    <strong>{p.name}</strong>
                    <span className="post-meta">{p.city} · {p.time}</span>
                  </div>
                  <span className="post-tag" style={{background:tagColor[p.tag]}}>{p.tag}</span>
                  <p className="post-text">{p.text}</p>
                  <div className="post-actions">
                    <button>❤️ Like</button>
                    <button>💬 Reply</button>
                    <button>↗ Share</button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ARTICLES ─────────────────────────────────────────────
function Articles() {
  const [filter, setFilter] = useState('All');
  const articles = [
    {icon:'🙏',title:'Spiritual Roots: Common Philosophy in Hinduism and Sikhism',cat:'Spirituality',author:'Dr. Priya Sharma',read:'8 min',featured:true,desc:'Explore the profound spiritual connections between Hindu Vedantic philosophy and Sikh teachings.'},
    {icon:'📖',title:'Gurbani Wisdom: Lessons from Guru Granth Sahib',cat:'Culture',author:'Harpreet Singh',read:'6 min',featured:true,desc:'Timeless wisdom and how its teachings apply to modern life in Canada.'},
    {icon:'🎨',title:'Celebrating Hindu and Sikh Festivals Together',cat:'Festivals',author:'Anjali Patel',read:'5 min',featured:false,desc:'A journey through vibrant festivals celebrating shared values.'},
    {icon:'🤝',title:'Seva in Action: Community Service Stories',cat:'Community',author:'Contributors',read:'7 min',featured:false,desc:'Real stories of community members putting selfless service into action.'},
    {icon:'🍴',title:'The Langar Tradition',cat:'Spirituality',author:'Dr. Rajesh Kumar',read:'6 min',featured:false,desc:'Understanding Langar and its parallels in Hindu culture.'},
    {icon:'💜',title:'Bhakti and Devotion: A Shared Path',cat:'Culture',author:'Simran Kaur',read:'7 min',featured:false,desc:'Celebrating love of the divine across both traditions.'},
  ];
  const filtered = filter==='All' ? articles : articles.filter(a=>a.cat===filter);
  return (
    <div className="page">
      <div className="page-hero-strip">
        <Reveal><div className="page-emoji">📖</div></Reveal>
        <Reveal delay={.1}><h1>Articles & Stories</h1></Reveal>
        <Reveal delay={.2}><p>Celebrating Hindu-Sikh unity and shared heritage</p></Reveal>
      </div>
      <div className="container">
        <h2 style={{marginBottom:'1.5rem',fontSize:'1.5rem'}}>✨ Featured</h2>
        <div className="featured-grid">
          {articles.filter(a=>a.featured).map((a,i) => (
            <Reveal key={i} delay={i*.1}>
              <div className="featured-card">
                <div className="featured-icon">{a.icon}</div>
                <span className="feat-badge">{a.cat}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <div className="art-meta">{a.author} · {a.read} read</div>
                <button className="read-btn">Read Article →</button>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="filter-tabs" style={{marginTop:'3rem'}}>
            {['All','Spirituality','Culture','Festivals','Community'].map(f => (
              <button key={f} onClick={()=>setFilter(f)} className={filter===f?'active':''}>{f}</button>
            ))}
          </div>
        </Reveal>
        <div className="art-list">
          {filtered.map((a,i) => (
            <Reveal key={i} delay={i*.05}>
              <div className="art-item">
                <span className="art-icon">{a.icon}</span>
                <div>
                  <span className="feat-badge">{a.cat}</span>
                  <h3>{a.title}</h3>
                  <p style={{color:'#666',marginTop:'.4rem'}}>{a.desc}</p>
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
    {role:'bot',text:'Namaskar! I am Seva (सेवा / ਸੇਵਾ) — your guide on Hindu-Sikh unity and shared heritage. Ask me about Gurbani wisdom, Vedic philosophy, our shared history, or anything about our beautiful traditions. 🙏'}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const replies = [
    'Both Hinduism and Sikhism celebrate Seva (selfless service) as a path to divine connection and community wellbeing. 🙏',
    'Guru Nanak was deeply influenced by the Bhakti movement in Hinduism — both traditions share this devotional heart.',
    'The concept of Ek Onkar (One God) in Sikhism resonates deeply with Advaita Vedanta\'s teaching of universal divine unity.',
    'Langar (community meal) in Sikhism reflects the Hindu value of Annadana — both celebrate nourishing all without discrimination.',
    'The Guru Granth Sahib contains verses from Hindu saints like Kabir and Namdev, beautifully weaving both traditions.',
    'Both traditions teach that the divine light (Jyoti / Jot) resides in every being — the foundation of mutual respect.',
  ];
  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:'smooth'}); }, [msgs]);

  const send = async () => {
    if(!input.trim() || loading) return;
    setMsgs(m => [...m, {role:'user',text:input}]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/seva', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({message: input})
      });
      const data = await res.json();
      setMsgs(m => [...m, {role:'bot', text: data.response || replies[Math.floor(Math.random()*replies.length)]}]);
    } catch {
      setMsgs(m => [...m, {role:'bot', text: replies[Math.floor(Math.random()*replies.length)]}]);
    }
    setLoading(false);
  };

  return (
    <div className="page seva-page">
      <div className="seva-header">
        <Reveal><div className="seva-orb">🙏</div></Reveal>
        <Reveal delay={.1}><h1>Seva AI</h1></Reveal>
        <Reveal delay={.2}><p>Wisdom on Hindu-Sikh Unity & Shared Heritage</p></Reveal>
        <div className="seva-glow" />
      </div>
      <div className="container">
        <div className="chat-box">
          {msgs.map((m,i) => (
            <div key={i} className={`chat-msg ${m.role}`}>
              {m.role==='bot' && <span className="chat-avatar">🙏</span>}
              <div className="chat-bubble">{m.text}</div>
              {m.role==='user' && <span className="chat-avatar">👤</span>}
            </div>
          ))}
          {loading && (
            <div className="chat-msg bot">
              <span className="chat-avatar">🙏</span>
              <div className="chat-bubble typing"><span/><span/><span/></div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="chat-form">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
            placeholder="Ask about Hindu-Sikh wisdom, unity, heritage..." disabled={loading}/>
          <button onClick={send} disabled={loading||!input.trim()}>Send →</button>
        </div>
        <div className="seva-prompts">
          {['What do Hinduism & Sikhism share?','Tell me about Guru Nanak','What is Seva?','Explain Bhakti tradition'].map((q,i) => (
            <button key={i} onClick={()=>{ setInput(q); }}>💡 {q}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── APP ROOT ─────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('home');
  const goTo = (p) => { setPage(p); window.scrollTo(0,0); };

  return (
    <div className="app">
      <Nav page={page} setPage={goTo} />
      {page==='home' && <Home setPage={goTo}/>}
      {page==='membership' && <Membership/>}
      {page==='events' && <Events/>}
      {page==='directory' && <Directory/>}
      {page==='connect' && <Connect/>}
      {page==='articles' && <Articles/>}
      {page==='seva' && <Seva/>}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-symbols">ॐ ☬</span>
            <h3>Hindu Sikh Unity Forum Canada</h3>
            <p>Stronger Together</p>
          </div>
          <div className="footer-links">
            {['home','membership','events','directory','connect','articles','seva'].map(p => (
              <button key={p} onClick={()=>goTo(p)}>{p.charAt(0).toUpperCase()+p.slice(1)}</button>
            ))}
          </div>
        </div>
        <p className="footer-copy">© 2024 HSUF Canada. All rights reserved. Celebrating shared heritage.</p>
      </footer>
    </div>
  );
}
