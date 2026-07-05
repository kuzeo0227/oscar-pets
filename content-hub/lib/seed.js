// Seed data for first run. Computed at seed time so "current week" is always
// the week the dashboard is first launched.

const { v4: uuid } = require('uuid');

// Monday-start week containing `date`, as YYYY-MM-DD.
function mondayOf(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

function plusDays(ymd, n) {
  const d = new Date(ymd + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function buildSeed() {
  const now = new Date().toISOString();
  const weekStart = mondayOf(new Date());

  const ideaGut = {
    id: uuid(),
    weekStart,
    platform: 'tiktok',
    goal: 'trust',
    title: 'Why your dog’s "sensitive stomach" might be a gut flora problem',
    angle: 'Reframe recurring soft stools as a microbiome imbalance, not a food brand issue.',
    format: '30s vertical video, talking head + b-roll',
    suggestedDate: plusDays(weekStart, 2),
    hookReference: 'Myth-flip hook: "Everyone blames the kibble. It’s usually not the kibble."',
    sourceLinks: [
      {
        url: 'https://www.tiktok.com/@vetnutritiontips/video/7301122334455',
        platform: 'tiktok',
        note: 'original hook reference — myth-flip opener',
      },
      {
        url: 'https://www.instagram.com/p/doggutscience123/',
        platform: 'instagram',
        note: 'carousel structure reference',
      },
    ],
    status: 'approved',
    createdBy: 'ai',
    createdAt: now,
  };

  const ideaClimate = {
    id: uuid(),
    weekStart,
    platform: 'instagram',
    goal: 'reach',
    title: 'Malaysian heat and your dog’s appetite: what humidity does to digestion',
    angle: 'Tropical-climate angle — why dogs eat less and digest worse in 33°C humidity, and what helps.',
    format: 'carousel, 6 slides',
    suggestedDate: plusDays(weekStart, 4),
    hookReference: 'Local-specific hook: name the city temperature in the first line.',
    sourceLinks: [
      {
        url: 'https://www.tiktok.com/@sgpetcare/video/7299887766554',
        platform: 'tiktok',
        note: 'SEA climate pet care trend',
      },
    ],
    status: 'pending',
    createdBy: 'ai',
    createdAt: now,
  };

  const ideaProbiotic = {
    id: uuid(),
    weekStart,
    platform: 'shopee',
    goal: 'convert',
    title: '3 signs your dog needs a probiotic (checklist)',
    angle: 'Simple symptom checklist that ends on the product as the obvious next step.',
    format: '15s vertical video, text overlay checklist',
    suggestedDate: plusDays(weekStart, 5),
    hookReference: 'Checklist hook: "If your dog does 2 of these 3 things, keep watching."',
    sourceLinks: [
      {
        url: 'https://shopee.com.my/video/petsupplements-checklist-demo',
        platform: 'shopee',
        note: 'Shopee video checklist format reference',
      },
    ],
    status: 'pending',
    createdBy: 'ai',
    createdAt: now,
  };

  const sampleScript = {
    id: uuid(),
    ideaId: ideaGut.id,
    topic: 'Why your dog’s "sensitive stomach" might be a gut flora problem',
    hook: 'Everyone blames the kibble. Three brand switches later, the soft stools are still there — because it was never the kibble.',
    insight: 'About 70% of your dog’s immune system lives in the gut. When the good bacteria get wiped out — antibiotics, stress, heat, diet changes — digestion breaks down no matter which premium brand you buy. Rebuilding the gut flora is what actually fixes the pattern, and that’s exactly what a daily probiotic does.',
    cta: 'If your dog has been through 2 or more food switches this year, check the link in bio — Oscar’s daily probiotic chew is made for exactly this.',
    filmingNotes: [
      { section: 'hook', note: 'Talking head, tight crop, hold a kibble bag then drop it out of frame on "never the kibble".' },
      { section: 'insight', note: 'B-roll: dog eating, then simple 70% stat as on-screen text.' },
      { section: 'cta', note: 'Product in hand, natural window light, no hard sell tone.' },
    ],
    editingNotes: [
      { section: 'hook', note: 'Cut on the bag drop — keep hook under 3 seconds.' },
      { section: 'insight', note: 'Caption keywords only, not full subtitles. Zoom punch on the stat.' },
      { section: 'cta', note: 'End card 1.5s: product + "link in bio".' },
    ],
    caption: 'Switched food 3 times and the tummy issues keep coming back? It might not be the food. 🐶 Gut flora is the real story — here’s why.',
    hashtags: ['#dogguthealth', '#dogprobiotics', '#malaysiadogs', '#sensitivestomach', '#oscarpetslab'],
    archived: false,
    createdAt: now,
  };

  return {
    meta: {
      schemaVersion: 1,
      lastModifiedBy: 'claude',
      lastModifiedAt: now,
    },
    ideas: [ideaGut, ideaClimate, ideaProbiotic],
    inbox: [
      {
        id: uuid(),
        url: 'https://www.tiktok.com/@petfluencer.my/video/7310098877665',
        platform: 'tiktok',
        note: 'Strong first-3-seconds hook — dog reaction shot before any talking',
        status: 'unprocessed',
        addedAt: now,
      },
      {
        id: uuid(),
        url: 'https://www.xiaohongshu.com/explore/dogsupplement-notes-88',
        platform: 'rednote',
        note: 'RedNote style: before/after stool chart (tasteful) performs well',
        status: 'unprocessed',
        addedAt: now,
      },
    ],
    scripts: [sampleScript],
    schedule: [
      {
        id: uuid(),
        refType: 'idea',
        refId: ideaGut.id,
        platform: 'tiktok',
        suggestedDate: ideaGut.suggestedDate,
        actualPostedDate: null,
      },
    ],
    tasks: [
      {
        id: uuid(),
        assignedTo: 'claude',
        description: 'Process Link Inbox: extract hook patterns from 2 unprocessed URLs and generate ideas',
        status: 'pending',
        createdAt: now,
      },
      {
        id: uuid(),
        assignedTo: 'claude',
        description: 'Research TikTok Creative Center SEA pet trends for next week’s idea batch',
        status: 'pending',
        createdAt: now,
      },
    ],
    aiLog: [
      {
        id: uuid(),
        agent: 'claude',
        action: 'Seeded content.json with initial week plan (3 ideas, 1 script, 2 inbox links)',
        timestamp: now,
      },
      {
        id: uuid(),
        agent: 'claude',
        action: `Generated 3 ideas for week of ${weekStart} (gut health, tropical climate, probiotic checklist)`,
        timestamp: now,
      },
    ],
  };
}

module.exports = { buildSeed, mondayOf };
