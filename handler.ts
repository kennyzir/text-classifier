// ClawHub Local Skill - runs entirely in your agent, no API key required
// Text Classifier - Classify text into predefined or custom categories

const PREDEFINED: Record<string, string[]> = {
  'technology': ['software','hardware','ai','machine learning','cloud','api','database','programming','code','algorithm','server','deploy','kubernetes','docker','javascript','python','typescript','react','node','gpu','cpu','blockchain','crypto'],
  'business': ['revenue','profit','market','investment','startup','funding','ipo','acquisition','merger','stock','valuation','growth','strategy','enterprise','b2b','saas','roi','kpi'],
  'science': ['research','experiment','hypothesis','study','journal','peer-reviewed','data','analysis','biology','chemistry','physics','genome','molecule','quantum','climate','species'],
  'health': ['medical','health','disease','treatment','patient','doctor','hospital','symptom','diagnosis','therapy','vaccine','drug','clinical','mental health','wellness','nutrition'],
  'sports': ['game','team','player','score','championship','league','tournament','coach','athlete','match','season','goal','win','loss','stadium','olympic'],
  'politics': ['government','election','president','congress','senate','policy','law','regulation','vote','democrat','republican','legislation','campaign','political','diplomat'],
  'entertainment': ['movie','film','music','album','concert','actor','actress','director','show','series','streaming','netflix','spotify','celebrity','award','oscar','grammy'],
  'education': ['school','university','student','teacher','course','degree','curriculum','learning','academic','scholarship','exam','lecture','professor','campus','graduate'],
};

function classifyText(text: string, categories?: Record<string, string[]>) {
  const cats = categories || PREDEFINED;
  const lower = text.toLowerCase();
  const words = lower.split(/\W+/).filter(w => w.length > 2);
  const totalWords = words.length || 1;
  const scores: Record<string, number> = {};
  for (const [category, keywords] of Object.entries(cats)) {
    let matchCount = 0;
    for (const keyword of keywords) {
      const kw = keyword.toLowerCase();
      if (kw.includes(' ')) {
        const re = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        const matches = lower.match(re);
        if (matches) matchCount += matches.length * 2;
      } else {
        matchCount += words.filter(w => w === kw).length;
      }
    }
    scores[category] = Math.round((matchCount / totalWords) * 1000) / 10;
  }
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topCategory = sorted[0]?.[0] || 'unknown';
  const topScore = sorted[0]?.[1] || 0;
  const confidence = Math.min(100, Math.round((topScore / 50) * 100));
  return { category: topCategory, confidence, scores };
}

export async function run(input: { text: string; categories?: Record<string, string[]> }) {
  if (!input.text || typeof input.text !== 'string' || input.text.length < 10) throw new Error('text required (min 10 chars)');
  if (input.text.length > 50000) throw new Error('Text too long (max 50,000 chars)');
  const startTime = Date.now();
  const result = classifyText(input.text, input.categories);
  const ranked = Object.entries(result.scores).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([cat, score]) => ({ category: cat, score }));
  return {
    category: result.category, confidence: result.confidence, top_categories: ranked, all_scores: result.scores,
    using_custom: !!input.categories,
    _meta: { skill: 'text-classifier', latency_ms: Date.now() - startTime, text_length: input.text.length, categories_count: Object.keys(result.scores).length },
  };
}
export default run;
