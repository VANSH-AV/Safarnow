export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  } catch {
    res.status(400).json({ error: 'Invalid JSON payload' });
    return;
  }

  const { messages = [], dataContext = {} } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'No messages provided' });
    return;
  }

  if (!apiKey) {
    res.status(500).json({ error: 'AI service is not configured yet. Add GEMINI_API_KEY in your server environment.' });
    return;
  }

  const model = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const contents = messages
    .filter((m) => m && typeof m.content === 'string' && m.content.trim())
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content.trim() }],
    }));

  if (contents.length === 0) {
    res.status(400).json({ error: 'No messages provided' });
    return;
  }

  try {
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: buildSystemPrompt(dataContext) }] },
        contents,
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!geminiRes.ok) {
      await geminiRes.text().catch(() => '');
      res.status(502).json({ error: `AI service returned an error (${geminiRes.status}). Please try again.` });
      return;
    }

    const data = await geminiRes.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!text) {
      res.status(502).json({ error: 'AI service returned an empty response. Please try again.' });
      return;
    }
    res.status(200).json({ reply: text });
  } catch (err) {
    res.status(502).json({ error: err?.message || 'Could not reach the AI service.' });
  }
}

function buildSystemPrompt(dataContext) {
  const {
    destinations = [],
    packages = [],
    hotels = [],
    bookings = [],
    savedTrips = [],
  } = dataContext || {};

  return `You are "Safarnow AI", a friendly, helpful travel assistant embedded inside the Safarnow app (AI-powered smart tourism for India and beyond).

RULES - READ CAREFULLY:
- Base every answer ONLY on the catalog data provided below inside <DATA> tags, plus the ongoing conversation.
- NEVER invent, guess, or reuse destinations, hotels, packages, prices, ratings, durations, or availability that are not listed below. This is critical: if a requested item or detail is not in the data, say so clearly, e.g. "That isn't currently listed in our catalog", and suggest the closest real alternative that IS in the data.
- All money values are in Indian Rupees (₹) and must be quoted exactly as they appear in the data.
- If the user references their own bookings or saved trips (included below), use them; otherwise do not pretend to know the user's trips.
- Keep answers concise and scannable: short bullet lists, bold key names, a short intro line. Favor useful recommendations over long prose.
- Respond in the same language the user writes in (Hindi, English, Hinglish, etc.).
- You may ask one clarifying question if the request is ambiguous, then give a best-effort answer.

<DATA>
DESTINATIONS:
${trimSafe(destinations)}

PACKAGES:
${trimSafe(packages)}

HOTELS:
${trimSafe(hotels)}

USER BOOKINGS:
${trimSafe(bookings)}

USER SAVED TRIPS:
${trimSafe(savedTrips)}
</DATA>

Answer the user's request now.`;
}

function trimSafe(value) {
  try {
    return JSON.stringify(value, null, 0);
  } catch {
    return '[]';
  }
}