import { useState } from 'react';
import GURBANI_ARTICLE from './ArticleGurbani';

export default function GurbaniArticlePage({ setPage }) {
  const [lang, setLang] = useState('en');
  const a = GURBANI_ARTICLE[lang];
  const isRTLish = false;

  return (
    <div className="inner-page">
      <div className="inner-hero" style={{ backgroundImage: `url(/articles/guru-granth-sahib.jpg)` }}>
        <div className="inner-overlay" />
        <div className="inner-hero-text">
          <h1>{GURBANI_ARTICLE.en.title.split(':')[0]}</h1>
          <p>The Living Guru, and daily paath for every generation</p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 860 }}>
        <button className="art-back-btn" onClick={() => setPage('articles')}>&larr; Back to Articles</button>

        <div className="lang-tabs">
          {Object.keys(GURBANI_ARTICLE).map(key => (
            <button
              key={key}
              className={lang === key ? 'active' : ''}
              onClick={() => setLang(key)}
            >
              {GURBANI_ARTICLE[key].lang}
            </button>
          ))}
        </div>

        <article className="article-body" lang={lang} dir={isRTLish ? 'rtl' : 'ltr'}>
          <h1 className="article-title">{a.title}</h1>
          <p className="article-intro">{a.intro}</p>

          {a.sections.map((sec, i) => (
            <section key={i} className="article-section">
              {sec.heading && <h2>{sec.heading}</h2>}
              {sec.body && sec.body.map((p, j) => <p key={j}>{p}</p>)}
              {sec.list && (
                <ul className="article-list">
                  {sec.list.map(([label, text], k) => (
                    <li key={k}><strong>{label}</strong> {text}</li>
                  ))}
                </ul>
              )}
              {sec.subsections && sec.subsections.map(([sub, text], k) => (
                <div key={k} className="article-subsection">
                  <h3>{sub}</h3>
                  <p>{text}</p>
                </div>
              ))}
              {sec.after && <p>{sec.after}</p>}
            </section>
          ))}

          <p className="article-signoff">{a.signoff}</p>
        </article>
      </div>
    </div>
  );
}
