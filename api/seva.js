const GROQ_API_KEY = process.env.GROQ_API_KEY;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  const fallbacks = [
    'Both traditions celebrate Seva (selfless service) as a direct path to the divine. Guru Nanak and the Hindu Bhakti saints both taught that serving others is serving God.',
    'Guru Nanak Dev Ji was profoundly influenced by the Hindu Bhakti movement. His teachings bridge both traditions through devotional love and Nam Simran.',
    'The Guru Granth Sahib contains compositions by Hindu saints including Kabir, Namdev, and Ravidas — a beautiful weaving of both traditions.',
    'Ek Onkar (One God) in Sikhism resonates with the Advaita Vedanta teaching of Ekam Brahm — the ultimate unity of all existence.',
    'Langar, the community meal in every Gurdwara, reflects the Hindu value of Annadana — feeding all without distinction.',
  ];

  if (!GROQ_API_KEY) {
    return res.status(200).json({
      response: fallbacks[Math.floor(Math.random() * fallbacks.length)]
    });
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 500,
        messages: [
          {
            role: 'system',
            content: `You are Seva AI, a warm and knowledgeable spiritual guide for the Hindu Sikh Unity Forum Canada. 
You share wisdom about Hindu-Sikh unity, shared heritage, Gurbani, Vedic teachings, and interfaith harmony. 
Keep responses concise (2-4 sentences), warm, and uplifting. 
Focus on what unites both traditions. Never mention conflicts or divisions.
Always end on a note of unity, love, or shared purpose.`
          },
          { role: 'user', content: message }
        ],
      }),
    });

    const data = await groqRes.json();
    const response = data?.choices?.[0]?.message?.content;

    if (!response) throw new Error('No response from Groq');

    return res.status(200).json({ response });
  } catch (err) {
    console.error('Seva AI error:', err);
    return res.status(200).json({
      response: fallbacks[Math.floor(Math.random() * fallbacks.length)]
    });
  }
};
