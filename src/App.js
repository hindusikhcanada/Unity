import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [searchBiz, setSearchBiz] = useState('');
  const [filterEvent, setFilterEvent] = useState('All');
  const [filterCity, setFilterCity] = useState('All');
  const [filterArt, setFilterArt] = useState('All');
  const [chatMsgs, setChatMsgs] = useState([{role:'bot',text:'Namaskar! I am Seva. Ask me about Hindu-Sikh unity! 🙏'}]);
  const [chatInput, setChatInput] = useState('');

  const events = [
    {icon:'🪔',title:'Diwali Celebration',date:'Nov 1, 2024',time:'6:00 PM',loc:'Toronto Convention Centre',cat:'Hindu',desc:'Grand Diwali with lights, music and community gathering'},
    {icon:'☬',title:'Guru Nanak Jayanti',date:'Nov 15, 2024',time:'10:00 AM',loc:'Gurudwara Sahib, Vancouver',cat:'Sikh',desc:'Celebrate the birth of Guru Nanak with kirtan and langar'},
    {icon:'🤝',title:'HSUF Unity Meet',date:'Dec 8, 2024',time:'5:00 PM',loc:'Community Centre, Montreal',cat:'Shared',desc:'Network and celebrate shared values together'},
    {icon:'🎨',title:'Holi Festival',date:'Mar 25, 2025',time:'12:00 PM',loc:"Queen's Park, Toronto",cat:'Hindu',desc:'Holi with traditional games and food'},
    {icon:'💃',title:'Vaisakhi Celebration',date:'Apr 14, 2025',time:'10:00 AM',loc:'Kitchener-Waterloo',cat:'Sikh',desc:'Traditional Bhangra and cultural performances'},
  ];

  const biz = [
    {icon:'🍛',name:'Ananda Restaurant',cat:'Food & Dining',city:'Toronto',phone:'416-555-0101',rate:4.8,trad:'Hindu',desc:'Authentic North Indian cuisine with vegetarian options'},
    {icon:'🤝',name:'Sikh Community Services',cat:'Community',city:'Vancouver',phone:'604-555-0202',rate:4.9,trad:'Sikh',desc:'Social services and counseling for Sikh families'},
    {icon:'👗',name:'Sacred Textiles',cat:'Clothing',city:'Montreal',phone:'514-555-0303',rate:4.7,trad:'Both',desc:'Traditional sarees, sherwanis, turbans and more'},
    {icon:'⚕️',name:'Dr. Sharma Medical',cat:'Healthcare',city:'Calgary',phone:'403-555-0404',rate:4.9,trad:'Hindu',desc:'Family medicine with culturally sensitive approach'},
    {icon:'📚',name:'Guru Nanak Academy',cat:'Education',city:'Winnipeg',phone:'204-555-0505',rate:4.8,trad:'Sikh',desc:'Punjabi language and traditions education'},
    {icon:'🎉',name:'Unity Event Planning',cat:'Events',city:'Toronto',phone:'416-555-0606',rate:4.7,trad:'Both',desc:'Hindu and Sikh weddings and community gatherings'},
  ];

  const posts = [
    {avatar:'👨',name:'Rajesh Kumar',city:'Toronto',time:'2 hours ago',text:'Looking for volunteers for Diwali celebration! 🪔'},
    {avatar:'👩',name:'Simran Kaur',city:'Vancouver',time:'5 hours ago',text:'Just opened a new yoga studio! Join our classes 🙏'},
    {avatar:'👨',name:'Amit Patel',city:'Montreal',time:'1 day ago',text:'Seeking Gurudwara recommendations. New to the city!'},
    {avatar:'👩',name:'Priya Singh',city:'Calgary',time:'2 days ago',text:'Beautiful Diwali rangoli designs shared! ✨'},
  ];

  const articles = [
    {icon:'🙏',title:'Spiritual Roots: Hindu & Sikh Philosophy',cat:'Spirituality',author:'Dr. Priya Sharma',read:'8 min',featured:true},
    {icon:'📖',title:'Gurbani Wisdom: Lessons for Modern Life',cat:'Culture',author:'Harpreet Singh',read:'6 min',featured:true},
    {icon:'🎨',title:'Celebrating Hindu and Sikh Festivals',cat:'Festivals',author:'Anjali Patel',read:'5 min',featured:false},
    {icon:'🤝',title:'Seva in Action: Community Stories',cat:'Community',author:'Contributors',read:'7 min',featured:false},
    {icon:'🍴',title:'The Langar Tradition',cat:'Spirituality',author:'Dr. Rajesh Kumar',read:'6 min',featured:false},
    {icon:'💜',title:'Bhakti & Devotion: Shared Path',cat:'Culture',author:'Simran Kaur',read:'7 min',featured:false},
  ];

  const sendChat = () => {
    if(!chatInput.trim()) return;
    setChatMsgs([...chatMsgs, {role:'user',text:chatInput}]);
    setChatInput('');
    setTimeout(() => {
      const responses = [
        'The Bhakti tradition in Hinduism and Sikhism both celebrate devotion to the divine through love and surrender. 🙏',
        'Guru Nanak taught that all people are equal regardless of caste, creed, or gender - a revolutionary message for his time.',
        'Langar (community meal) in Sikhism reflects the Hindu concept of Naivedya (offering food to all) - both celebrate sharing and equality.',
        'The concept of Dharma (duty) is central to both Hindu and Sikh teachings about living a righteous life.',
        'Both traditions emphasize Seva (selfless service) as a path to spiritual growth and community welfare.'
      ];
      setChatMsgs(m => [...m, {role:'bot',text:responses[Math.floor(Math.random()*responses.length)]}]);
    }, 500);
  };

  return (
    <div className="app">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <button className="logo" onClick={()=>setPage('home')}>ॐ ☬ HSUF</button>
          <div className="nav-links">
            {['home','membership','events','directory','connect','articles','seva'].map(p => (
              <button key={p} onClick={()=>setPage(p)} className={page===p?'active':''}>{p.charAt(0).toUpperCase()+p.slice(1)}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* HOME */}
      {page==='home' && (
        <div className="section">
          <div className="hero">
            <div className="emoji">🙏</div>
            <h1>Hindu Sikh Unity Forum Canada</h1>
            <p className="tagline">Stronger Together</p>
            <p className="subtitle">Celebrating shared heritage, fostering unity and understanding</p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={()=>setPage('membership')}>Join Now — $1</button>
              <button className="btn-outline" onClick={()=>setPage('seva')}>Talk to Seva AI</button>
            </div>
          </div>

          <div className="features">
            <h2>Our Community Platform</h2>
            <div className="grid">
              {[
                {icon:'🎫',title:'Digital Member Card',desc:'Verified QR code membership card'},
                {icon:'👥',title:'Connect Board',desc:'Network with members by city'},
                {icon:'🏪',title:'Business Directory',desc:'Verified Hindu & Sikh businesses'},
                {icon:'📅',title:'Events Calendar',desc:'Hindu & Sikh festivals and events'},
                {icon:'📖',title:'Articles & Blog',desc:'Unity stories and heritage'},
                {icon:'🤖',title:'Seva AI',desc:'Wisdom on shared heritage'},
              ].map((f,i) => (
                <div key={i} className="feature-card">
                  <div className="icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="cta">
            <h2>Join Our Community</h2>
            <p>Become a verified member</p>
            <div className="price">$1</div>
            <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-forum-canadas-membership" target="_blank" rel="noreferrer" className="btn-white">
              Become a Member
            </a>
          </div>
        </div>
      )}

      {/* MEMBERSHIP */}
      {page==='membership' && (
        <div className="section">
          <div className="page-header"><div className="emoji">🎫</div><h1>Join Us</h1><p>$1 verified membership</p></div>
          <div className="benefits-grid">
            {[
              {icon:'🎫',title:'Digital Card',desc:'QR verified membership'},
              {icon:'👥',title:'Connect Board',desc:'Network by city'},
              {icon:'📅',title:'Exclusive Events',desc:'Early access'},
              {icon:'🏪',title:'Directory',desc:'Support local businesses'},
              {icon:'📚',title:'Premium Content',desc:'Exclusive articles'},
              {icon:'🤝',title:'Community',desc:'Unity movement'},
            ].map((b,i) => (
              <div key={i} className="feature-card" style={{background:'#fff8f0'}}>
                <div className="icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="cta">
            <h2>Ready to Join?</h2>
            <div className="price">$1</div>
            <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-forum-canadas-membership" target="_blank" rel="noreferrer" className="btn-white">
              Join Now — $1
            </a>
          </div>
        </div>
      )}

      {/* EVENTS */}
      {page==='events' && (
        <div className="section">
          <div className="page-header"><div className="emoji">📅</div><h1>Community Events</h1><p>Hindu, Sikh and shared celebrations</p></div>
          <div className="filter-bar">
            {['All','Hindu','Sikh','Shared'].map(f => (
              <button key={f} onClick={()=>setFilterEvent(f)} className={filterEvent===f?'active':''}>{f}</button>
            ))}
          </div>
          <div className="grid">
            {events.filter(e => filterEvent==='All'||e.cat===filterEvent).map((e,i) => (
              <div key={i} className={`event-card cat-${e.cat}`}>
                <div className="event-top"><span className="icon">{e.icon}</span><span className="badge">{e.cat}</span></div>
                <h3>{e.title}</h3>
                <p>📅 {e.date}</p>
                <p>🕐 {e.time}</p>
                <p>📍 {e.loc}</p>
                <p style={{marginTop:'0.8rem'}}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DIRECTORY */}
      {page==='directory' && (
        <div className="section">
          <div className="page-header"><div className="emoji">🏪</div><h1>Business Directory</h1><p>Verified Hindu & Sikh businesses</p></div>
          <input className="search" type="text" placeholder="Search by name or category..." value={searchBiz} onChange={e=>setSearchBiz(e.target.value)}/>
          <div className="grid">
            {biz.filter(b => b.name.toLowerCase().includes(searchBiz.toLowerCase())||b.cat.toLowerCase().includes(searchBiz.toLowerCase())).map((b,i) => (
              <div key={i} className="biz-card">
                <div className="biz-header"><span className="icon">{b.icon}</span><span className="rating">⭐ {b.rate}</span></div>
                <h3>{b.name}</h3>
                <div className="badges"><span className="badge-cat">{b.cat}</span><span className={`badge-trad trad-${b.trad}`}>{b.trad}</span></div>
                <p style={{fontSize:'0.9rem',margin:'0.5rem 0'}}>{b.desc}</p>
                <p style={{fontSize:'0.85rem',color:'#999'}}>📍 {b.city} · 📞 {b.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONNECT */}
      {page==='connect' && (
        <div className="section">
          <div className="page-header"><div className="emoji">👥</div><h1>Connect Board</h1><p>City-based community networking</p></div>
          <div className="filter-bar">
            {['All','Toronto','Vancouver','Montreal','Calgary'].map(c => (
              <button key={c} onClick={()=>setFilterCity(c)} className={filterCity===c?'active':''}>{c}</button>
            ))}
          </div>
          <div className="posts-list">
            {posts.filter(p => filterCity==='All'||p.city===filterCity).map((p,i) => (
              <div key={i} className="post">
                <span className="avatar">{p.avatar}</span>
                <div className="post-content">
                  <strong>{p.name}</strong>
                  <p style={{fontSize:'0.85rem',color:'#888'}}>{p.city} · {p.time}</p>
                  <p>{p.text}</p>
                  <div className="post-actions">
                    <button>❤️ Like</button>
                    <button>💬 Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ARTICLES */}
      {page==='articles' && (
        <div className="section">
          <div className="page-header"><div className="emoji">📖</div><h1>Articles & Stories</h1><p>Celebrating shared heritage</p></div>
          <h3 style={{marginBottom:'1.5rem'}}>Featured</h3>
          <div className="grid" style={{marginBottom:'2rem'}}>
            {articles.filter(a=>a.featured).map((a,i) => (
              <div key={i} className="article-featured">
                <span className="icon">{a.icon}</span>
                <h3>{a.title}</h3>
                <p style={{fontSize:'0.85rem',color:'#888'}}>{a.author} · {a.read}</p>
              </div>
            ))}
          </div>
          <div className="filter-bar">
            {['All','Spirituality','Culture','Festivals','Community'].map(f => (
              <button key={f} onClick={()=>setFilterArt(f)} className={filterArt===f?'active':''}>{f}</button>
            ))}
          </div>
          <div className="articles-list">
            {articles.filter(a => filterArt==='All'||a.cat===filterArt).map((a,i) => (
              <div key={i} className="article-item">
                <span className="icon">{a.icon}</span>
                <div>
                  <span className="badge-cat">{a.cat}</span>
                  <h3>{a.title}</h3>
                  <p style={{fontSize:'0.85rem',color:'#888'}}>{a.author} · {a.read}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEVA */}
      {page==='seva' && (
        <div className="section seva-section">
          <div className="seva-header">
            <div className="emoji">🙏</div>
            <h1>Seva AI</h1>
            <p>Wisdom on Hindu-Sikh Unity & Shared Heritage</p>
          </div>
          <div className="chat">
            {chatMsgs.map((m,i) => (
              <div key={i} className={`msg msg-${m.role}`}>
                <div className="bubble">{m.text}</div>
              </div>
            ))}
          </div>
          <div className="chat-input-area">
            <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendChat()} 
              placeholder="Ask about Hindu-Sikh heritage..."/>
            <button onClick={sendChat}>Send</button>
          </div>
        </div>
      )}

      <footer>
        <p>© 2024 Hindu Sikh Unity Forum Canada</p>
        <p>Stronger Together • Celebrating Shared Heritage</p>
      </footer>
    </div>
  );
}
