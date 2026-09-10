const MODEL = 'gemini-2.5-flash';

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

  if (!apiKey) {
    res.status(500).json({ error: 'AI service is not configured yet. Add GEMINI_API_KEY in your server environment.' });
    return;
  }

  const model = process.env.GEMINI_MODEL || MODEL;

  if (body.mode === 'itinerary') {
    await handleItinerary(req, res, apiKey, model, body);
    return;
  }

  await handleChat(req, res, apiKey, model, body);
}

// ---------------------------------------------------------------------------
// Chat (existing assistant used by the floating chat widget)
// ---------------------------------------------------------------------------
async function handleChat(req, res, apiKey, model, body) {
  const { messages = [], dataContext = {} } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'No messages provided' });
    return;
  }

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

// ---------------------------------------------------------------------------
// AI Trip Planner: structured itinerary generation
// ---------------------------------------------------------------------------
async function handleItinerary(req, res, apiKey, model, body) {
  const { itineraryRequest = {}, dataContext = {} } = body;

  const destination = itineraryRequest?.destination;
  const travellers = Number(itineraryRequest?.travellers) || 0;
  const duration = Number(itineraryRequest?.duration) || 0;

  if (!destination) {
    res.status(400).json({ error: 'Destination is required.' });
    return;
  }
  if (travellers < 1 || duration < 1) {
    res.status(400).json({ error: 'Travellers and duration are required.' });
    return;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  try {
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: buildItineraryPrompt(itineraryRequest, dataContext) }] },
        contents: [{ role: 'user', parts: [{ text: `Generate the itinerary for ${destination} now. Return only the JSON object.` }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!geminiRes.ok) {
      await geminiRes.text().catch(() => '');
      res.status(502).json({ error: 'The AI service could not generate an itinerary right now. Please try again.' });
      return;
    }

    const data = await geminiRes.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!text) {
      res.status(502).json({ error: 'The AI returned an empty response. Please regenerate.' });
      return;
    }

    const parsed = parseItineraryJson(text);
    if (!parsed || !Array.isArray(parsed.days) || parsed.days.length === 0) {
      res.status(502).json({ error: 'We received an incomplete itinerary. Please regenerate.' });
      return;
    }

    res.status(200).json({ itinerary: parsed });
  } catch (err) {
    res.status(502).json({ error: err?.message || 'Could not reach the AI service.' });
  }
}

function parseItineraryJson(text) {
  const t = String(text).trim();
  try {
    return JSON.parse(t);
  } catch {
    // Be tolerant of stray text or code fences around the JSON object.
    const match = t.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

function buildItineraryPrompt(req, dataContext) {
  const {
    travellers,
    duration,
    travelStyle = 'balanced',
    interests = [],
    budget = null,
    budgetTier = 'moderate',
    currency = 'INR',
    startDate = '',
    endDate = '',
    budgetTight = false,
  } = req;

  const budgetLine = budget
    ? `TOTAL trip budget: ${currency} ${Number(budget).toLocaleString()} (tier: ${budgetTier})${budgetTight ? `. This is the HARD CEILING - the estimated_total must be at or below ${currency} ${Number(budget).toLocaleString()}, so favour cheaper hotels, activities and transport.` : '. Aim to keep the estimated_total at or below this.'}`
    : `Budget tier: ${budgetTier}. Pick options that fit this tier.`;

  return `You are the "Safarnow AI Trip Planner", the built-in trip planner of the Safarnow travel website. A user has given you real preferences and the Safarnow catalog below. Create ONE realistic, day-by-day itinerary.

RULES - READ CAREFULLY:
- Use ONLY the catalog data inside <DATA>. Never invent destinations, hotels, attractions, prices or locations that are not present in <DATA>. If the catalog lacks something, adapt using the closest available item or leave a sensible gap - never fabricate.
- Exactly ${duration} day(s) of itinerary. ${startDate ? `Trip dates: ${startDate} to ${endDate}. Take season/short-range context into account where sensible.` : ''}
- Travellers: ${travellers}. Every currency amount below is the TOTAL for the whole trip (all travellers combined), in ${currency}.
- Travel style: ${travelStyle} (relaxed = 2 activities/day, balanced = 3/day, adventure/luxury/packed = up to 4/day).
- Interests to prioritise: ${Array.isArray(interests) && interests.length ? interests.join(', ') : 'a balanced mix of culture, nature and local experiences'}.
- ${budgetLine}
- Costs must be realistic in ${currency} and internally consistent with the catalog prices and the budget.
- Recommend up to 3 real hotels from the hotels list in <DATA> that fit the budget tier. If a hotel is missing entirely, you may omit a recommendation rather than invent one.
- Include 2-4 practical safety notes grounded in the destination's safetyScore/description, marked with a level: "green" (safe), "yellow" (moderate caution) or "red" (higher caution).
- Include up to 5 short plain-text tips.
- estimated_total must equal the sum of the budget_breakdown (stay + food + transport + activities + other).

OUTPUT: Return ONLY a single valid JSON object (no markdown fences, no commentary) matching EXACTLY this schema:
{
  "trip_summary": { "destination": string, "state": string, "duration": number, "travellers": number, "start_date": string|null, "end_date": string|null, "estimated_total": number },
  "days": [ { "day": number, "title": string, "weather": string, "rain_probability": number, "activities": [ { "time": string, "title": string, "description": string, "estimated_cost": number, "category": string } ] } ],
  "budget_breakdown": { "stay": number, "food": number, "transport": number, "activities": number, "other": number, "total": number },
  "hotel_recommendations": [ { "name": string, "location": string, "stars": number, "price_per_night": number, "reason": string } ],
  "safety_notes": [ { "level": "green"|"yellow"|"red", "note": string } ],
  "tips": [ string ]
}

<DATA>
DESTINATION:
${trimSafe(dataContext?.destination)}

HOTELS:
${trimSafe(dataContext?.hotels)}

PACKAGES:
${trimSafe(dataContext?.packages)}
</DATA>`;
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
- Keep answers concise and scannable but write in PLAIN TEXT. STRICT FORMATTING RULE: output only plain text - never use Markdown, never use the symbols * # _ ~ > (and never use a backtick), never use emoji, and never use the star/gem emoji characters (⭐ ★ ☆ ✦). Start list items with a simple bullet dot (•), write ratings as "4.6 out of 5", and write hotel star levels as "5-star" or "4 Stars" in plain words. Do not wrap words in asterisks or dashes for emphasis.
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