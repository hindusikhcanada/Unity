import { useState } from 'react';
import GURBANI_ARTICLE from './ArticleGurbani';

// Images keyed by section index — same visuals apply across all languages, captions localized
const SECTION_IMAGES = {
  0: {
    src: '/articles/ik-onkar-divine.jpg',
    caption: { en: 'Ik Onkar — the oneness of the Divine', pa: 'ਇੱਕ ਓਅੰਕਾਰ, ਰੱਬ ਦੀ ਇੱਕਤਾ', hi: 'इक ओंकार, परमात्मा की एकता' },
  },
  2: {
    src: '/articles/takht-canopy.jpg',
    caption: { en: 'Guru Granth Sahib Ji, seated with reverence', pa: 'ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ, ਸਤਿਕਾਰ ਸਹਿਤ ਬਿਰਾਜਮਾਨ', hi: 'श्री गुरु ग्रंथ साहिब जी, श्रद्धा सहित विराजमान' },
  },
  5: {
    src: '/articles/family-generations.jpg',
    caption: { en: 'One practice, every generation', pa: 'ਇੱਕ ਅਭਿਆਸ, ਹਰ ਪੀੜ੍ਹੀ', hi: 'एक अभ्यास, हर पीढ़ी' },
  },
};

function ArticleImage({ img, lang }) {
  if (!img) return null;
  return (
    <figure className="article-figure">
      <img src={img.src} alt={img.caption[lang]} loading="lazy" />
      <figcaption>{img.caption[lang]}</figcaption>
    </figure>
  );
}

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
              <ArticleImage img={SECTION_IMAGES[i]} lang={lang} />
            </section>
          ))}

          <p className="article-signoff">{a.signoff}</p>
        </article>
      </div>
    </div>
  );
}
