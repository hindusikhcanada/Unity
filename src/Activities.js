import React, { useState } from 'react';
import './Activities.css';

const EVENTS = [
  {
    year: '2026',
    items: [
      {
        id: 'vishwa-bandhu',
        date: 'August 30, 2026',
        title: 'Hindu Vishwa Bandhu — Welcoming Dr. Mohan Bhagwat Ji',
        location: 'Toronto, Ontario',
        tag: 'Special Event',
        tagColor: '#7c3aed',
        summary: 'HSUF Canada members and leadership were present at Hindu Vishwa Bandhu, a landmark gathering organized by CHORD (Canadian Hindus for Outreach, Relations and Dialogue) in Toronto, welcoming Dr. Mohan Bhagwat Ji before an audience of over 2,500 attendees from across 8 Canadian provinces.',
        highlights: [
          'HSUF Canada leadership quoted in national press coverage of the event, reflecting the Forum\'s continued visibility within the broader Hindu-Sikh community landscape in Canada.',
          'One of the largest gatherings of the Canadian Hindu diaspora to date, featuring cultural performances and remarks from prominent community and civic figures.',
        ],
        dignitaries: [],
        attendance: '2,500+ attendees from across 8 Canadian provinces',
      },
    ]
  },
  {
    year: '2025',
    items: [
      {
        id: 'nagendra',
        date: 'October 1, 2025',
        title: 'An Inspiring Evening with Dr. H. R. Nagendra Ji',
        location: 'Brampton, Ontario',
        tag: 'Special Event',
        tagColor: '#7c3aed',
        images: ['/events/nagendra-group1.jpg', '/events/nagendra-group2.jpg', '/events/nagendra-stage.jpg', '/events/nagendra-memento.jpg'],
        summary: 'A historic evening hosted by HSUF Canada in collaboration with Vishav Punjabi Sabha Canada, featuring Dr. H. R. Nagendra, President of S-VYASA Bengaluru, Padma Shri Awardee and world-renowned yoga visionary.',
        highlights: [
          'Dr. Nagendra delivered a keynote on yoga\'s transformative power, drawing from Guru Nanak Dev Ji\'s teachings — Naam Japo, Keerat Karo, Vand Chhako.',
          'Explained the eight-fold Ashtanga Yoga path and its alignment with Guru Granth Sahib Ji\'s spiritual teachings.',
          'Emphasized Anna Daanam as the highest service, commending the Sikh tradition of Langar.',
          'Dr. N. K. Manjunath Sharma announced collaborations with Canadian universities and formal establishment of VYASA Canada.',
          'Participants engaged directly with speakers in a spiritually uplifting and intellectually enriching gathering.',
        ],
        dignitaries: [
          'Dr. H. R. Nagendra — Padma Shri, President S-VYASA Bengaluru, former NASA scientist, Top 2% Global Scientists (Stanford)',
          'Dr. N. K. Manjunath Sharma — Vice Chancellor, S-VYASA',
          'Dr. H. R. Dayananda Swamy — Director of Finance and Administration, S-VYASA',
          'Harji Bajwa ji — President, Hindu Sikh Unity Forum Canada',
          'Dr. Dalbir Singh Kathuria — Chairman, Vishav Punjabi Sabha Canada',
        ],
        attendance: 'Community leaders, civic engagement experts, interfaith representatives, and political dignitaries',
      },
      {
        id: 'balidaan-2025',
        date: 'November 29, 2025',
        title: '350th Balidaan Diwas of Guru Tegh Bahadur Ji',
        location: 'Hindu Sabha Temple, Brampton, Ontario',
        tag: 'Special Event',
        tagColor: '#7c3aed',
        images: ['/events/balidaan2025-crowd.jpg', '/events/balidaan2025-stage.jpg', '/events/balidaan2025-banner.jpg', '/events/balidaan2025-collage.jpg'],
        summary: 'Hundreds of community members gathered at Hindu Sabha Temple to commemorate the 350th Balidaan Diwas of Guru Tegh Bahadur Ji, honoured as Hind di Chadar for his courageous stand in defence of truth, human dignity, and the protection of Dharma.',
        highlights: [
          'Welcome address followed by an introduction to HSUF Canada\'s mission and work.',
          'Ceremonial lamp lighting and devotional Shabad Bhajan Kirtan led by temple priests.',
          'Spiritual reflections offered by Bhai Gurprakash Singh Ji, Pandit Abhaydev Shastri Ji, and Dr. Pargat Singh Bagga.',
          'Speakers reflected on Guru Tegh Bahadur Ji\'s historic sacrifice to protect the Kashmiri Pandits and the centuries-old Hindu-Sikh bond.',
        ],
        dignitaries: [
          'MP Ruby Sahota', 'MP Amarjeet Gill', 'MPP Amarjot Sandhu', 'MPP Deepak Anand', 'MPP Hardeep Grewal',
          'Numerous civic and community leaders',
        ],
        attendance: 'Hundreds of community members, elected representatives, and religious leaders',
      },
      {
        id: 'pahalgam',
        date: 'April 22–24, 2025',
        title: 'Solidarity After Pahalgam Terror Attack',
        location: 'Canada (Multiple Cities)',
        tag: 'Interfaith Vigil',
        tagColor: '#D4560A',
        summary: 'Forum statements and interfaith vigil in Canada expressing condolences and unity after the terror attack on Hindu pilgrims in Kashmir, emphasizing that terrorism is a common enemy and Hindus and Sikhs stand together for peace.',
        highlights: [
          'Joint statement condemning the attack on Hindu pilgrims in Pahalgam, Kashmir.',
          'Interfaith vigils held across Canada expressing solidarity.',
          'Message: terrorism is a common enemy; Hindus and Sikhs stand together for peace.',
        ],
        dignitaries: [],
        attendance: 'Hindu and Sikh community members across Canada',
      },
      {
        id: 'hsv-dialogue',
        date: 'July 12, 2025',
        title: 'Hindu–Sikh Voice Dialogue Series',
        location: 'Online / Social Media',
        tag: 'Dialogue',
        tagColor: '#1A3A6B',
        summary: 'Public rollout of the Hindu–Sikh Voice dialogue series featuring Sikh socio-political analyst Ramneek Singh Mann, focused on identity, history, extremism, and Hindu–Sikh solidarity in the diaspora.',
        highlights: [
          'Featured Sikh socio-political analyst Ramneek Singh Mann.',
          'Discussed identity, history, extremism, and importance of solidarity.',
          'Shared widely across social media platforms.',
        ],
        dignitaries: ['Ramneek Singh Mann — Sikh socio-political analyst'],
        attendance: 'Online audience across social media platforms',
      },
    ]
  },
  {
    year: '2024',
    items: [
      {
        id: 'vaisakhi-miss',
        date: 'April 20, 2024',
        title: 'Joint Vaisakhi · Ram Navami · Mahavir Jayanti Celebration',
        location: 'Mississauga, Ontario',
        tag: 'Celebration',
        tagColor: '#D4560A',
        images: ['/events/vaisakhi2024-poster.jpg', '/events/vaisakhi2024-dance.jpg', '/events/vaisakhi2024-hcfgroup.jpg', '/events/vaisakhi2024-friends.jpg', '/events/vaisakhi2024-applause.jpg', '/events/vaisakhi2024-crowd.jpg'],
        summary: 'A high-visibility showcase of unity in diversity with lamp-lighting, interfaith prayers, cultural performances, and a dhol dance finale.',
        highlights: [
          'Lamp-lighting ceremony, interfaith prayers, and cultural performances.',
          'Vibrant dhol dance finale celebrating shared joy.',
          'Approximately 200 attendees including civic leaders.',
          'High-visibility showcase of unity across Hindu, Sikh, and Jain traditions.',
        ],
        dignitaries: ['~200 attendees including civic leaders'],
        attendance: '~200 attendees',
      },
      {
        id: 'vaisakhi-brampton',
        date: 'April 22, 2024',
        title: 'Vaisakhi Celebration',
        location: 'Brampton, Ontario',
        tag: 'Celebration',
        tagColor: '#D4560A',
        summary: 'Vaisakhi celebrations supported by Hindu Canadian Foundation and Vishwa Jain Sangathan Canada, with speeches and cultural performances reinforcing inter-community solidarity.',
        highlights: [
          'Supported by Hindu Canadian Foundation and Vishwa Jain Sangathan Canada.',
          'Speeches and cultural performances reinforcing inter-community solidarity.',
        ],
        dignitaries: [],
        attendance: 'Members of Hindu, Sikh, and Jain communities',
      },
      {
        id: 'brampton-attack',
        date: 'October–November 2024',
        title: 'Standing Together After Brampton Temple Attack',
        location: 'Brampton, Ontario',
        tag: 'Solidarity',
        tagColor: '#991b1b',
        summary: 'Following violence at Hindu Sabha Mandir on November 3, HSUF leaders condemned hate, coordinated with authorities, and reinforced the message that an attack on one place of worship is an attack on both communities.',
        highlights: [
          'Leaders condemned the attack on Hindu Sabha Mandir on November 3.',
          'Coordinated with authorities to ensure safety of all places of worship.',
          'Encouraged calm and unity across both communities.',
          'Reinforced the message: an attack on one place of worship is an attack on both.',
        ],
        dignitaries: [],
        attendance: 'Hindu and Sikh community leaders',
      },
      {
        id: 'gtb-2024-series',
        date: 'December 25–29, 2024',
        title: 'Veer Baal Divas Series — GTA',
        location: 'Multiple Locations, Greater Toronto Area',
        tag: 'Veer Baal Divas',
        tagColor: '#1A3A6B',
        images: ['/events/vbd2024-triveni-1.jpg', '/events/vbd2024-triveni-2.jpg'],
        summary: 'A three-event series commemorating the sacrifice of the Sahibzade across the GTA, co-organized with Canadian Hindus for Harmony and Vishwa Jain Sangathan.',
        highlights: [
          'Dec 25 — Hindu Sabha Mandir, Brampton: Weeks after the attack; President Harji Bajwa called for steadfast unity. Bhajans, shabads, and langar.',
          'Dec 26 — Triveni Mandir, Brampton: Devotional program and community gathering.',
          'Dec 29 — Bharat Mata Mandir, Brampton: Concluding GTA observance with joint prayers and community meal.',
          'Supported by Canadian Hindu Chamber of Commerce.',
        ],
        dignitaries: ['Harji Bajwa — President, HSUF Canada'],
        attendance: 'Hindu and Sikh community members across GTA',
      },
    ]
  },
  {
    year: '2023',
    items: [
      {
        id: 'sukhmani',
        date: 'July 8, 2023',
        title: 'Sukhmani Sahib Path — Inaugural Event',
        location: 'Oakville Gurudwara (Dhan Dhan Baba Budha Ji Gurdwara Sahib)',
        tag: 'Inaugural',
        tagColor: '#D4560A',
        images: ['/events/sukhmani-poster.jpg', '/events/sukhmani-group.jpg', '/events/sukhmani-garland.jpg', '/events/sukhmani-podium.jpg'],
        summary: 'The inaugural event of HSUF Canada — a Sukhmani Sahib Path at Oakville Gurudwara, bringing together ~170 members of the Hindu-Sikh community. Despite external pressure to cancel the event, it was successfully held with the support of elected representatives at all levels of government.',
        highlights: [
          'Sukhmani Sahib Path recitation from 1:30 pm to 2:45 pm.',
          'Kirtan (devotional music) from 2:45 pm to 3:10 pm.',
          'Speeches emphasized Hindu-Sikh Unity as a much-needed initiative.',
          'Closed with vote of thanks, prayers, and langar in the langar hall.',
          'Despite external pressure from anti-India elements to cancel, the event proceeded successfully.',
        ],
        dignitaries: [
          'Leo (Leonidas) Housakos — Senator of Canada',
          'Rob Burton — Mayor of Oakville',
          'Deepak Anand — Member of Provincial Parliament, Ontario',
          'Dipika Damerla — Mississauga City Councillor (Former MPP)',
          'Nav Nanda — Town and Regional Councillor, Oakville',
          'Scott Xie — Town Councillor, Oakville',
          'Subhash Khanna — Chairman, Hindu Mission of Canada, Montreal',
          'Inderjit Singh Bal — Prev. Co-founder, World Sikh Organization',
          'Santokh Pahal — Vice President, Oakville Gurudwara',
          'Harji Bajwa — Chairman Oakville Gurudwara, President HSUF Canada',
          'Surinder Sharma — Chairman, HSUF Canada',
          'Dr. Rajesh Bhatia — Vice President & Secretary, HSUF Canada',
        ],
        attendance: '~170 members of the Hindu-Sikh community',
      },
      {
        id: 'vtb-2023',
        date: 'December 23–31, 2023',
        title: 'Veer Baal Divas — Inaugural Series',
        location: 'Oakville, Brampton & Montreal',
        tag: 'Veer Baal Divas',
        tagColor: '#1A3A6B',
        images: ['/events/vbd2023-banner.jpg', '/events/vbd2023-certificates.jpg', '/events/vbd2023-venue.jpg', '/events/vbd2023-montreal.jpg'],
        summary: 'The first national Veer Baal Divas series by HSUF Canada, taking the unity observance from the GTA to Montreal, establishing a collaborative template for annual interfaith commemorations.',
        highlights: [
          'Dec 23 — Vaishno Devi Temple, Oakville: Interfaith commemoration with Sikh granthis and Hindu priests; bhajans, kirtan, and langar.',
          'Dec 24 — Bharat Mata Mandir, Brampton: Joint prayers, tributes to the Sahibzade, and community langar.',
          'Dec 31 — Montreal (Hindu Temple): Regional gathering of Hindu and Sikh representatives; took the unity observance national.',
          'Established collaborative template for annual Veer Baal Divas observances.',
        ],
        dignitaries: ['Community scholars, Sikh granthis, and Hindu priests'],
        attendance: 'Hindu and Sikh families across the GTA and Montreal',
      },
      {
        id: 'seva-2023',
        date: 'Fall 2023',
        title: 'Joint Diwali Food Drive — Seva',
        location: 'North America',
        tag: 'Seva',
        tagColor: '#065f46',
        summary: 'Forum families joined wider Dharmic partners in Diwali food drive efforts across North America, showcasing joint Hindu–Sikh–Jain service and unity through community aid.',
        highlights: [
          'Forum families joined wider Dharmic partners in Diwali food drive.',
          'Showcased joint Hindu–Sikh–Jain service across North America.',
          'Reinforced unity through community aid and shared values.',
        ],
        dignitaries: [],
        attendance: 'Hindu, Sikh, and Jain community volunteers',
      },
    ]
  },
];

const TAG_COLORS = {
  'Special Event': '#7c3aed',
  'Celebration': '#D4560A',
  'Interfaith Vigil': '#D4560A',
  'Dialogue': '#1A3A6B',
  'Veer Baal Divas': '#1A3A6B',
  'Solidarity': '#991b1b',
  'Inaugural': '#D4560A',
  'Seva': '#065f46',
};

export default function Activities() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId(openId === id ? null : id);

  const stats = [
    { num: '15+', label: 'Events Organized' },
    { num: '5+', label: 'Cities Reached' },
    { num: '1000+', label: 'Lives Touched' },
    { num: '2023', label: 'Founded' },
  ];

  return (
    <div className="activities-page">

      {/* Page Hero */}
      <div className="activities-hero">
        <div className="activities-hero-content">
          <h1>Our Activities</h1>
          <p>A chronicle of Hindu-Sikh unity in action across Canada</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="activities-stats">
        {stats.map((s, i) => (
          <div key={i} className="act-stat">
            <span className="act-stat-num">{s.num}</span>
            <span className="act-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Intro */}
      <div className="activities-intro">
        <div className="activities-intro-inner">
          <div className="activities-intro-flags">
            <img src="/events/unity-flags.png" alt="Hindu Sikh Unity Flags" />
          </div>
          <div className="activities-intro-text">
            <h2>Stronger Together Since 2023</h2>
            <p>From our inaugural Sukhmani Sahib Path in Oakville to solidarity vigils after acts of hate, HSUF Canada has consistently brought Hindus and Sikhs together in prayer, service, and community.</p>
            <p>We have organized events from Victoria, British Columbia to Montreal, Quebec — honoring shared heritage, celebrating common festivals, and standing together in times of challenge.</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="activities-timeline">
        {EVENTS.map(yearGroup => (
          <div key={yearGroup.year} className="year-group">
            <div className="year-marker">
              <span>{yearGroup.year}</span>
            </div>
            <div className="year-events">
              {yearGroup.items.map(event => (
                <div key={event.id} className={`event-card ${openId === event.id ? 'open' : ''}`}>
                  <div className="event-header" onClick={() => toggle(event.id)}>
                    <div className="event-header-left">
                      <span className="event-tag" style={{ background: TAG_COLORS[event.tag] || '#666', color: '#fff' }}>
                        {event.tag}
                      </span>
                      <div>
                        <h3>{event.title}</h3>
                        <div className="event-meta">
                          <span>📅 {event.date}</span>
                          <span>📍 {event.location}</span>
                        </div>
                      </div>
                    </div>
                    <button className="toggle-btn">{openId === event.id ? '▲' : '▼'}</button>
                  </div>

                  {openId === event.id && (
                    <div className="event-body">
                      <p className="event-summary">{event.summary}</p>

                      {event.images && event.images.length > 0 && (
                        <div className="event-gallery">
                          {event.images.map((src, i) => (
                            <div key={i} className="event-gallery-item">
                              <img src={src} alt={`${event.title} ${i + 1}`} loading="lazy" />
                            </div>
                          ))}
                        </div>
                      )}

                      {event.attendance && (
                        <div className="event-section">
                          <h4>👥 Attendance</h4>
                          <p>{event.attendance}</p>
                        </div>
                      )}

                      {event.highlights.length > 0 && (
                        <div className="event-section">
                          <h4>✨ Highlights</h4>
                          <ul>
                            {event.highlights.map((h, i) => <li key={i}>{h}</li>)}
                          </ul>
                        </div>
                      )}

                      {event.dignitaries.length > 0 && (
                        <div className="event-section">
                          <h4>🏛️ Distinguished Guests & Leaders</h4>
                          <ul className="dignitaries">
                            {event.dignitaries.map((d, i) => <li key={i}>{d}</li>)}
                          </ul>
                        </div>
                      )}

                      {/* Special media for specific events */}
                      {event.id === 'sukhmani' && (
                        <div className="event-media">
                          <p className="media-caption">📸 Event held at Oakville Gurudwara with ~170 community members, attended by Senator, Mayor, and MPPs</p>
                        </div>
                      )}
                      {event.id === 'nagendra' && (
                        <div className="event-media">
                          <p className="media-caption">🎓 Dr. Nagendra — Padma Shri Awardee, former NASA scientist, Top 2% Global Scientists (Stanford University), author of 150+ research papers</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Ongoing Activities */}
      <div className="ongoing-section">
        <h2>Ongoing & Recurring Activities</h2>
        <div className="ongoing-grid">
          {[
            { icon: '🙏', title: 'Annual Veer Baal Divas & Shaheedi Saptah', desc: 'Ceremonies in multiple Gurdwaras and Mandirs across cities with Sikh scholars and Granthis leading discourses, prayers, tributes, and Langar.' },
            { icon: '🤝', title: 'Pro-Unity Civic Partnerships', desc: 'Collaboration with elected representatives who champion harmony; constructive input on security for temples and Gurdwaras, hate-crime response, and balanced public narratives.' },
            { icon: '📖', title: 'Shared-Heritage Storytelling', desc: 'Active social channels highlighting joint roots, common struggles, and cultural interconnections — Vaisakhi, Ram Navami, Mahavir Jayanti, Gurpurabs.' },
            { icon: '🏛️', title: 'Engagement with Sikh Intellectuals', desc: 'Regular meetings and talks with scholars, influencers, and professionals to co-design initiatives and strengthen bonds.' },
            { icon: '🕌', title: 'Joint Temple & Gurdwara Engagement', desc: 'Identifying pro-unity advocates and maintaining a directory of receptive places of worship for collaborative programs.' },
            { icon: '🌟', title: 'Youth Engagement & Career Support', desc: 'Heritage education, immigration guidance, and placements within Hindu–Sikh-owned businesses; fostering ties with Bharat for cultural immersion and civic advocacy.' },
          ].map((item, i) => (
            <div key={i} className="ongoing-card">
              <span className="ongoing-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GTB Banner */}
      <div className="gtb-banner-section">
        <img src="/events/gtb-banner.jpg" alt="Guru Teg Bahadur Balidaan Diwas" className="gtb-banner-img" />
      </div>

      {/* CTA */}
      <div className="activities-cta">
        <h2>Be Part of Our Story</h2>
        <p>Join HSUF Canada and participate in building lasting Hindu-Sikh unity</p>
        <a href="https://www.zeffy.com/en-CA/ticketing/hindu-sikh-unity-forum-canadas-membership"
          target="_blank" rel="noreferrer" className="btn-join">
          Join for $1 →
        </a>
      </div>

    </div>
  );
}
