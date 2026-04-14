import { NextResponse } from "next/server";

const POWER_WORDS = ["exclusive", "limited", "proven", "guaranteed", "special", "now", "join", "save", "free", "priority", "best"];

function powerMatches(text: string) {
  const lowered = text.toLowerCase();
  return POWER_WORDS.filter(w => lowered.includes(w));
}

function effectiveness(text: string, tone: string) {
  const base = 55;
  const matches = powerMatches(text).length;
  const extra = Math.min(30, matches * 6) + (text.length > 80 ? 10 : 0) + (tone !== 'Neutral' ? 5 : 0);
  return Math.min(95, base + extra);
}

// Simple in-memory cache for generated variants (TTL in seconds)
const VARIANTS_CACHE_TTL = Number(process.env.VARIANTS_CACHE_TTL || '300');
const variantsCache: Map<string, { variants: any[]; expiresAt: number }> = new Map();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const platform = body?.platform || 'LinkedIn';
    const tone = body?.tone || 'Neutral';
    const experience = body?.experience || '';
    const length = body?.length || 'medium';
    const goal = body?.goal || '';
    const count = Number(body?.count || 3);

    // Check cache first
    try {
      const cacheKey = JSON.stringify({ platform, tone, experience, length, goal, count });
      const now = Date.now();
      const existing = variantsCache.get(cacheKey);
      if (existing && existing.expiresAt > now) {
        return NextResponse.json({ variants: existing.variants, cached: true });
      }
    } catch (e) {
      // ignore cache errors
    }

    // Prefer GroqAPI when configured (GROQ_API_KEY and GROQ_API_URL). If not configured or an error occurs, fall back to local generation.
    const groqKey = process.env.GROQ_API_KEY;
    const groqUrl = process.env.GROQ_API_URL; // e.g. https://api.groq.ai/v1/models/groq-1/generate
    const groqModel = process.env.GROQ_MODEL || 'groq-1';

    if (groqKey && groqUrl) {
      try {
        const userPrompt = `Generate ${count} distinct outreach message variants for the following inputs:\n- Platform: ${platform}\n- Tone: ${tone}\n- Experience: ${experience}\n- Length: ${length}\n- Goal: ${goal}\n\nReturn a JSON array like this:\n[{\"label\":\"A\",\"text\":\"...\",\"effectiveness\":72,\"powerWords\":[\"exclusive\"]}, ...]\n\nOnly return valid JSON.`;

        const resp = await fetch(groqUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`,
          },
          body: JSON.stringify({ model: groqModel, prompt: userPrompt, max_tokens: 800, temperature: 0.7 }),
        });

        const text = await resp.text();
        // Try to extract JSON substring from provider output
        let jsonText = (text || '').trim();
        const first = jsonText.indexOf('[');
        const last = jsonText.lastIndexOf(']');
        if (first !== -1 && last !== -1) jsonText = jsonText.slice(first, last + 1);

        try {
          const parsed = JSON.parse(jsonText);
          const variants = Array.isArray(parsed) ? parsed.map((p: any, i: number) => ({
            id: p.id || `v-${Date.now()}-${i}`,
            label: p.label || String.fromCharCode(65 + i),
            text: p.text || p.message || '',
            platform,
            tone,
            length,
            effectiveness: p.effectiveness ?? Math.round(effectiveness(p.text || p.message || '', tone)),
            powerWords: p.powerWords ?? powerMatches(p.text || p.message || ''),
          })) : [];

          // Cache result
          try {
            const cacheKey = JSON.stringify({ platform, tone, experience, length, goal, count });
            variantsCache.set(cacheKey, { variants, expiresAt: Date.now() + VARIANTS_CACHE_TTL * 1000 });
          } catch (e) { /* ignore cache failures */ }

          return NextResponse.json({ variants });
        } catch (err) {
          // fall through to fallback generation
        }
      } catch (e) {
        // provider error; continue to fallback
      }
    }

    // Fallback: simple deterministic variation generation on server
    const variants: Array<any> = [];
    const baseGoal = goal || 'share something that could help you';
    let base = '';
    if (platform === 'LinkedIn') base = `Hi there,\n\nI'm reaching out because ${baseGoal}.`;
    else if (platform === 'WhatsApp') base = `Hey! ${baseGoal}.`;
    else base = `Hello,\n\nI hope you're well. ${baseGoal}.`;

    if (experience) base += ` I have ${experience} experience that may be relevant.`;

    for (let i = 0; i < count; i++) {
      let text = base;
      if (i === 1) text = `Would you be open to a brief chat?\n\n${base}`;
      else if (i === 2) {
        const pw = POWER_WORDS[Math.floor(Math.random() * POWER_WORDS.length)];
        text = `${base}\n\nP.S. ${pw} opportunity — let me know.`;
      } else if (i > 2) text = `Hi! Hope you're doing well — ${base}`;

      const pws = Array.from(new Set(powerMatches(text)));
      const eff = effectiveness(text, tone);

      variants.push({
        id: `v-${Date.now()}-${i}`,
        label: String.fromCharCode(65 + i),
        text,
        platform,
        tone,
        length,
        effectiveness: Math.round(eff),
        powerWords: pws,
      });
    }

    return NextResponse.json({ variants });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate variants' }, { status: 500 });
  }
}
