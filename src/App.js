import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [searchBiz, setSearchBiz] = useState('');
  const [filterEvent, setFilterEvent] = useState('All');

  return (
    <div className="app">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-container">
          <button className="logo" onClick={()=>setPage('home')}>
            <span className="logo-symbols">ॐ ☬</span>
            <span className="logo-text">HSUF Canada</span>
          </button>
          <div className="nav-links">
            {[
              {id:'home',label:'Home'},
              {id:'membership',label:'Membership'},
              {id:'events',label:'Events'},
              {id:'directory',label:'Directory'},
              {id:'connect',label:'Connect'},
              {id:'articles',label:'Articles'},
              {id:'seva',label:'Seva AI'}
            ].map(item => (
              <button key={item.id} onClick={()=>setPage(item.id)} className={page===item.id?'active':''}>{item.label}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* HOME */}
      {page==='home' && (
        <div className="page">
          <section className="hero">
            <div className="hero-content">
              <h1>Hindu Sikh Unity Forum Canada</h1>
              <p className="hero-tagline">Stronger Together</p>
              <p className="hero-subtitle">Celebrating shared heritage, fostering unity and understanding across communities</p>
              <div className="hero-cta">
                <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-forum-canadas-membership" target="_blank" rel="noreferrer" className="btn btn-primary">Join Now — $1</a>
                <button onClick={()=>setPage('seva')} className="btn btn-secondary">Talk to Seva AI</button>
              </div>
            </div>
          </section>

          <section className="features">
            <h2>Our Community Platform</h2>
            <div className="features-grid">
              {[
                {icon:'🎫',title:'Member Card',desc:'Verified digital membership'},
                {icon:'👥',title:'Connect',desc:'Network by city'},
                {icon:'🏪',title:'Directory',desc:'Business listings'},
                {icon:'📅',title:'Events',desc:'Festivals & gatherings'},
                {icon:'📖',title:'Articles',desc:'Shared heritage stories'},
                {icon:'🤖',title:'Seva AI',desc:'Community wisdom'}
              ].map((f,i) => (
                <div key={i} className="feature-item">
                  <div className="feature-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="cta-section">
            <h2>Join Our Community</h2>
            <p>Become a verified member</p>
            <div className="price">$1</div>
            <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-forum-canadas-membership" target="_blank" rel="noreferrer" className="btn btn-white">Become a Member</a>
          </section>
        </div>
      )}

      {/* MEMBERSHIP */}
      {page==='membership' && (
        <div className="page">
          <section className="page-header">
            <h1>Join Us</h1>
            <p>$1 verified membership</p>
          </section>
          <div className="content-container">
            <div className="benefits-grid">
              {[
                {icon:'🎫',title:'Digital Card'},
                {icon:'👥',title:'Connect Board'},
                {icon:'📅',title:'Exclusive Events'},
                {icon:'🏪',title:'Directory'},
                {icon:'📚',title:'Premium Content'},
                {icon:'🤝',title:'Community'}
              ].map((b,i) => (
                <div key={i} className="benefit-card">
                  <div className="feature-icon">{b.icon}</div>
                  <h3>{b.title}</h3>
                </div>
              ))}
            </div>
            <div className="cta-section" style={{marginTop:'3rem'}}>
              <div className="price">$1</div>
              <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-forum-canadas-membership" target="_blank" rel="noreferrer" className="btn btn-white">Join Now</a>
            </div>
          </div>
        </div>
      )}

      {/* EVENTS */}
      {page==='events' && (
        <div className="page">
          <section className="page-header">
            <h1>Community Events</h1>
            <p>Hindu, Sikh and shared celebrations across Canada</p>
          </section>
          <div className="content-container">
            <div className="filter-buttons">
              {['All','Hindu','Sikh','Shared'].map(f => (
                <button key={f} onClick={()=>setFilterEvent(f)} className={filterEvent===f?'active':''}>{f}</button>
              ))}
            </div>
            <div className="events-grid">
              {[
                {icon:'🪔',name:'Diwali Celebration',date:'Nov 1, 2024',time:'6 PM',loc:'Toronto',cat:'Hindu'},
                {icon:'☬',name:'Guru Nanak Jayanti',date:'Nov 15, 2024',time:'10 AM',loc:'Vancouver',cat:'Sikh'},
                {icon:'🤝',name:'HSUF Unity Meet',date:'Dec 8, 2024',time:'5 PM',loc:'Montreal',cat:'Shared'},
                {icon:'🎨',name:'Holi Festival',date:'Mar 25, 2025',time:'12 PM',loc:'Toronto',cat:'Hindu'},
                {icon:'💃',name:'Vaisakhi',date:'Apr 14, 2025',time:'10 AM',loc:'Winnipeg',cat:'Sikh'},
              ].filter(e => filterEvent==='All' || e.cat===filterEvent).map((e,i) => (
                <div key={i} className={`event-card cat-${e.cat}`}>
                  <span className="event-icon">{e.icon}</span>
                  <h3>{e.name}</h3>
                  <p>{e.date} • {e.time}</p>
                  <p>{e.loc}</p>
                  <span className="badge">{e.cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DIRECTORY */}
      {page==='directory' && (
        <div className="page">
          <section className="page-header">
            <h1>Business Directory</h1>
            <p>Verified Hindu & Sikh businesses</p>
          </section>
          <div className="content-container">
            <input className="search-box" type="text" placeholder="Search businesses..." value={searchBiz} onChange={e=>setSearchBiz(e.target.value)}/>
            <div className="biz-grid">
              {[
                {icon:'🍛',name:'Ananda Restaurant',city:'Toronto',rate:4.8},
                {icon:'🤝',name:'Sikh Services',city:'Vancouver',rate:4.9},
                {icon:'👗',name:'Sacred Textiles',city:'Montreal',rate:4.7},
                {icon:'⚕️',name:'Dr. Sharma Clinic',city:'Calgary',rate:4.9},
                {icon:'📚',name:'Guru Nanak Academy',city:'Winnipeg',rate:4.8},
                {icon:'🎉',name:'Unity Events',city:'Toronto',rate:4.7},
              ].filter(b => b.name.toLowerCase().includes(searchBiz.toLowerCase())).map((b,i) => (
                <div key={i} className="biz-card">
                  <span className="biz-icon">{b.icon}</span>
                  <h3>{b.name}</h3>
                  <p>{b.city}</p>
                  <p className="rating">⭐ {b.rate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONNECT */}
      {page==='connect' && (
        <div className="page">
          <section className="page-header">
            <h1>Connect Board</h1>
            <p>City-based community networking</p>
          </section>
          <div className="content-container">
            <div className="posts">
              {[
                {avatar:'👨',name:'Rajesh Kumar',city:'Toronto',text:'Volunteers needed for Diwali!'},
                {avatar:'👩',name:'Simran Kaur',city:'Vancouver',text:'Just opened a yoga studio!'},
                {avatar:'👨',name:'Amit Patel',city:'Montreal',text:'Seeking Gurudwara recommendations'},
              ].map((p,i) => (
                <div key={i} className="post-card">
                  <span className="post-avatar">{p.avatar}</span>
                  <div>
                    <strong>{p.name}</strong>
                    <p className="post-meta">{p.city}</p>
                    <p>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ARTICLES */}
      {page==='articles' && (
        <div className="page">
          <section className="page-header">
            <h1>Articles & Stories</h1>
            <p>Celebrating shared heritage</p>
          </section>
          <div className="content-container">
            <div className="articles">
              {[
                {icon:'🙏',title:'Spiritual Roots',author:'Dr. Priya Sharma'},
                {icon:'📖',title:'Gurbani Wisdom',author:'Harpreet Singh'},
                {icon:'🎨',title:'Festival Celebrations',author:'Anjali Patel'},
                {icon:'🤝',title:'Seva Stories',author:'Community'},
              ].map((a,i) => (
                <div key={i} className="article-card">
                  <span className="article-icon">{a.icon}</span>
                  <h3>{a.title}</h3>
                  <p className="article-author">{a.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SEVA AI */}
      {page==='seva' && (
        <div className="page seva-page">
          <section className="seva-header">
            <h1>Seva AI</h1>
            <p>Wisdom on Hindu-Sikh Unity & Shared Heritage</p>
          </section>
          <div className="seva-chat">
            <div className="chat-message bot">
              <p>Namaskar! I am Seva (सेवा / ਸੇਵਾ) — your guide on Hindu-Sikh unity and shared heritage. Ask me about Gurbani wisdom, Vedic philosophy, our shared history, or anything about our beautiful traditions. 🙏</p>
            </div>
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Ask about Hindu-Sikh heritage..." />
            <button>Send</button>
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
