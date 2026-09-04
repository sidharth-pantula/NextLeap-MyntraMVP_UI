import { Product, UserPreferences, AdaptiveQuestion, AdaptiveOption, QuestionDimension } from '../types';

/**
 * Calculates the Shannon entropy of a distribution to measure discriminatory power.
 * Higher entropy means items are more evenly split across options (more informative question).
 */
function calculateEntropy(counts: number[], total: number): number {
  if (total === 0) return 0;
  return counts.reduce((acc, count) => {
    if (count === 0) return acc;
    const p = count / total;
    return acc - p * Math.log2(p);
  }, 0);
}

/**
 * Generates dynamic price bands based on actual item prices in the current candidate set.
 */
function generateDynamicPriceBands(candidates: Product[]): { options: AdaptiveOption[]; entropy: number } {
  if (candidates.length === 0) return { options: [], entropy: 0 };
  const prices = candidates.map(p => p.price).sort((a, b) => a - b);
  const minPrice = prices[0];
  const maxPrice = prices[prices.length - 1];

  // If price spread is very narrow (< ₹800 difference), entropy is low
  if (maxPrice - minPrice < 800) {
    return { options: [], entropy: 0.1 };
  }

  const p33 = prices[Math.floor(prices.length * 0.33)];
  const p66 = prices[Math.floor(prices.length * 0.66)];

  // Round thresholds to clean numbers
  const t1 = Math.max(1000, Math.round(p33 / 500) * 500);
  const t2 = Math.max(t1 + 500, Math.round(p66 / 500) * 500);

  const tier1Count = candidates.filter(p => p.price <= t1).length;
  const tier2Count = candidates.filter(p => p.price > t1 && p.price <= t2).length;
  const tier3Count = candidates.filter(p => p.price > t2).length;

  const options: AdaptiveOption[] = [
    {
      id: 'budget_tier_1',
      label: `Under ₹${t1.toLocaleString('en-IN')}`,
      desc: `Best value & affordable (${tier1Count} items)`,
      value: { max: t1, min: 0, label: `Under ₹${t1.toLocaleString('en-IN')}` },
      matchingCount: tier1Count,
      icon: 'savings'
    },
    {
      id: 'budget_tier_2',
      label: `₹${t1.toLocaleString('en-IN')} – ₹${t2.toLocaleString('en-IN')}`,
      desc: `Mid-range essentials (${tier2Count} items)`,
      value: { max: t2, min: t1, label: `₹${t1.toLocaleString('en-IN')} – ₹${t2.toLocaleString('en-IN')}` },
      matchingCount: tier2Count,
      icon: 'payments'
    },
    {
      id: 'budget_tier_3',
      label: `Above ₹${t2.toLocaleString('en-IN')}`,
      desc: `Premium designer picks (${tier3Count} items)`,
      value: { max: 999999, min: t2, label: `Above ₹${t2.toLocaleString('en-IN')}` },
      matchingCount: tier3Count,
      icon: 'diamond'
    }
  ];

  const entropy = calculateEntropy([tier1Count, tier2Count, tier3Count], candidates.length);
  return { options, entropy };
}

/**
 * Evaluates candidate questions and dynamically picks the single question with highest information gain / entropy.
 */
export function determineNextQuestion(
  candidates: Product[],
  currentPrefs: UserPreferences,
  totalWishlistCount: number
): { question: AdaptiveQuestion | null; shouldStopEarly: boolean } {
  const answered = currentPrefs.answeredDimensions || [];
  const questionNumber = answered.length + 1;

  // Maximum 5 questions strictly enforced
  if (questionNumber > 5 || candidates.length === 0) {
    return { question: null, shouldStopEarly: true };
  }

  // Early convergence stopping: if candidate pool is already tightly narrowed (<= 8 items) with clear ranking
  if (candidates.length <= 8 && questionNumber >= 3) {
    return { question: null, shouldStopEarly: true };
  }

  // ==========================================
  // DIMENSION A: NEED (Q1 - Always First)
  // ==========================================
  if (!answered.includes('NEED')) {
    const needCounts: Record<string, number> = {
      'Casual': 0,
      'Party': 0,
      'Wedding': 0,
      'Vacation': 0,
      'Work': 0,
      'Everyday': 0
    };

    candidates.forEach(p => {
      p.attributes.occasions.forEach(occ => {
        if (needCounts[occ] !== undefined) needCounts[occ]++;
      });
    });

    const needOptions: AdaptiveOption[] = [
      { id: 'need_casual', label: 'Casual', desc: 'Relaxed brunches, daily wear & hangouts', value: 'Casual', matchingCount: needCounts['Casual'], icon: 'coffee' },
      { id: 'need_party', label: 'Party', desc: 'Cocktails, club nights & celebrations', value: 'Party', matchingCount: needCounts['Party'], icon: 'celebration' },
      { id: 'need_wedding', label: 'Wedding', desc: 'Ceremonies, sangeet, reception & bridal', value: 'Wedding', matchingCount: needCounts['Wedding'], icon: 'favorite' },
      { id: 'need_vacation', label: 'Vacation', desc: 'Resort, beach & holiday travel', value: 'Vacation', matchingCount: needCounts['Vacation'], icon: 'flight_takeoff' },
      { id: 'need_work', label: 'Work', desc: 'Office wear, meetings & formal', value: 'Work', matchingCount: needCounts['Work'], icon: 'work' },
      { id: 'need_everyday', label: 'Everyday', desc: 'Comfort essentials for daily routine', value: 'Everyday', matchingCount: needCounts['Everyday'] || needCounts['Casual'], icon: 'check_circle' }
    ];

    return {
      question: {
        id: 'q_need',
        dimension: 'NEED',
        questionNumber: 1,
        title: 'What are you shopping for right now?',
        subtitle: 'Select your immediate need to filter your wishlist items',
        aiRationale: `Evaluating ${candidates.length} saved wishlist items across primary occasions`,
        options: needOptions,
        canSkip: false
      },
      shouldStopEarly: false
    };
  }

  // =========================================================================
  // DIMENSIONS B, C, D: Evaluate Discriminatory Entropy Across Remaining Pool
  // =========================================================================
  interface CandidateEvaluator {
    dimension: QuestionDimension;
    entropy: number;
    builder: () => AdaptiveQuestion;
  }

  const evaluators: CandidateEvaluator[] = [];

  // --- Dimension B1: Look Aesthetic (Elegant | Trendy | Minimal | Statement) ---
  if (!answered.includes('STYLE_LOOK')) {
    const counts: Record<string, number> = { 'Elegant': 0, 'Trendy': 0, 'Minimal': 0, 'Statement': 0 };
    candidates.forEach(p => {
      const look = p.attributes.look;
      if (counts[look] !== undefined) counts[look]++;
    });

    const activeLooks = Object.entries(counts).filter(([_, count]) => count > 0);
    const entropy = calculateEntropy(Object.values(counts), candidates.length);

    if (activeLooks.length >= 2) {
      evaluators.push({
        dimension: 'STYLE_LOOK',
        entropy: entropy * 1.25, // Look is a strong human aesthetic filter
        builder: () => ({
          id: 'q_style_look',
          dimension: 'STYLE_LOOK',
          questionNumber,
          title: 'Which look is closer to what you want?',
          subtitle: 'Choose the visual style that matches your mood',
          aiRationale: `Distinguishing between ${activeLooks.map(l => l[0]).join(', ')} styles in your wishlist`,
          options: [
            { id: 'look_elegant', label: 'Elegant', desc: 'Sophisticated, refined & timeless grace', value: 'Elegant', matchingCount: counts['Elegant'], icon: 'auto_awesome' },
            { id: 'look_trendy', label: 'Trendy', desc: 'Contemporary, bold & on-trend cuts', value: 'Trendy', matchingCount: counts['Trendy'], icon: 'trending_up' },
            { id: 'look_minimal', label: 'Minimal', desc: 'Clean lines, understated & subtle', value: 'Minimal', matchingCount: counts['Minimal'], icon: 'check_box_outline_blank' },
            { id: 'look_statement', label: 'Statement', desc: 'Head-turning, dramatic & vibrant', value: 'Statement', matchingCount: counts['Statement'], icon: 'local_fire_department' }
          ].filter(opt => (opt.matchingCount || 0) > 0),
          canSkip: true
        })
      });
    }
  }

  // --- Dimension B2: Type (Western | Ethnic | Fusion) ---
  if (!answered.includes('STYLE_TYPE')) {
    const counts: Record<string, number> = { 'Western': 0, 'Ethnic': 0, 'Fusion': 0 };
    candidates.forEach(p => {
      const t = p.attributes.productType || 'Western';
      if (counts[t] !== undefined) counts[t]++;
    });
    const activeTypes = Object.entries(counts).filter(([_, count]) => count > 0);
    const entropy = calculateEntropy(Object.values(counts), candidates.length);

    if (activeTypes.length >= 2) {
      evaluators.push({
        dimension: 'STYLE_TYPE',
        entropy: entropy * 1.2,
        builder: () => ({
          id: 'q_style_type',
          dimension: 'STYLE_TYPE',
          questionNumber,
          title: 'Which type would you prefer?',
          subtitle: 'Narrow down the garment category',
          aiRationale: `Candidates are divided across Western (${counts['Western']}), Ethnic (${counts['Ethnic']}) & Fusion (${counts['Fusion']})`,
          options: [
            { id: 'type_western', label: 'Western', desc: 'Dresses, blazers, shirts & trousers', value: 'Western', matchingCount: counts['Western'], icon: 'apparel' },
            { id: 'type_ethnic', label: 'Ethnic', desc: 'Lehengas, sarees, suits & anarkalis', value: 'Ethnic', matchingCount: counts['Ethnic'], icon: 'styler' },
            { id: 'type_fusion', label: 'Fusion', desc: 'Modern Indo-Western fusion styles', value: 'Fusion', matchingCount: counts['Fusion'], icon: 'flare' }
          ].filter(opt => (opt.matchingCount || 0) > 0),
          canSkip: true
        })
      });
    }
  }

  // --- Dimension B3: Fabric (Cotton | Silk | Satin | Linen | No preference) ---
  if (!answered.includes('STYLE_FABRIC')) {
    const counts: Record<string, number> = {};
    candidates.forEach(p => {
      const f = p.attributes.fabric;
      counts[f] = (counts[f] || 0) + 1;
    });

    const activeFabrics = Object.entries(counts).filter(([_, count]) => count > 0);
    const entropy = calculateEntropy(Object.values(counts), candidates.length);

    if (activeFabrics.length >= 2) {
      evaluators.push({
        dimension: 'STYLE_FABRIC',
        entropy: entropy * 1.1,
        builder: () => ({
          id: 'q_style_fabric',
          dimension: 'STYLE_FABRIC',
          questionNumber,
          title: 'Which fabric would you prefer?',
          subtitle: 'Select the material that feels best for you',
          aiRationale: `Different materials (${activeFabrics.slice(0, 3).map(f => f[0]).join(', ')}) distinguish remaining items`,
          options: [
            ...activeFabrics.slice(0, 4).map(([fabric, count]) => ({
              id: `fabric_${fabric.toLowerCase()}`,
              label: fabric,
              desc: `${count} items in wishlist`,
              value: fabric,
              matchingCount: count,
              icon: 'texture'
            })),
            { id: 'fabric_no_pref', label: 'No preference', desc: 'Keep all fabrics eligible', value: undefined, icon: 'all_inclusive' }
          ],
          canSkip: true
        })
      });
    }
  }

  // --- Dimension B4: Fit (Regular | Slim | Relaxed | Oversized) ---
  if (!answered.includes('STYLE_FIT')) {
    const counts: Record<string, number> = { 'Regular': 0, 'Slim': 0, 'Relaxed': 0, 'Oversized': 0 };
    candidates.forEach(p => {
      const fit = p.attributes.fit;
      if (counts[fit] !== undefined) counts[fit]++;
    });

    const activeFits = Object.entries(counts).filter(([_, count]) => count > 0);
    const entropy = calculateEntropy(Object.values(counts), candidates.length);

    if (activeFits.length >= 2) {
      evaluators.push({
        dimension: 'STYLE_FIT',
        entropy: entropy * 1.0,
        builder: () => ({
          id: 'q_style_fit',
          dimension: 'STYLE_FIT',
          questionNumber,
          title: 'What fit are you looking for?',
          subtitle: 'Choose your desired silhouette',
          aiRationale: `Evaluating fit distribution across remaining items`,
          options: [
            { id: 'fit_regular', label: 'Regular', desc: 'Standard classic everyday fit', value: 'Regular', matchingCount: counts['Regular'], icon: 'straighten' },
            { id: 'fit_slim', label: 'Slim', desc: 'Contoured, tailored & sleek profile', value: 'Slim', matchingCount: counts['Slim'], icon: 'straighten' },
            { id: 'fit_relaxed', label: 'Relaxed', desc: 'Easy-going, comfortable drape', value: 'Relaxed', matchingCount: counts['Relaxed'], icon: 'accessibility_new' },
            { id: 'fit_oversized', label: 'Oversized', desc: 'Modern relaxed boxy aesthetic', value: 'Oversized', matchingCount: counts['Oversized'], icon: 'fullscreen' }
          ].filter(opt => (opt.matchingCount || 0) > 0),
          canSkip: true
        })
      });
    }
  }

  // --- Dimension C1: PREFERENCE (Comfort | Durability | Quality | Versatility) ---
  if (!answered.includes('PREFERENCE')) {
    evaluators.push({
      dimension: 'PREFERENCE',
      entropy: 1.4, // Consistent strong differentiator
      builder: () => ({
        id: 'q_preference',
        dimension: 'PREFERENCE',
        questionNumber,
        title: 'What matters most for this purchase?',
        subtitle: 'Select the core benefit you want to prioritize',
        aiRationale: 'Determining key decision factor to weigh top items',
        options: [
          { id: 'pref_comfort', label: 'Comfort', desc: 'Soft fabrics, breathable feel & easy wear', value: 'Comfort', icon: 'spa' },
          { id: 'pref_durability', label: 'Durability', desc: 'Sturdy long-lasting build & resilience', value: 'Durability', icon: 'shield' },
          { id: 'pref_quality', label: 'Quality', desc: 'Premium finish & superior craftsmanship', value: 'Quality', icon: 'verified' },
          { id: 'pref_versatility', label: 'Versatility', desc: 'Multi-occasion styling flexibility', value: 'Versatility', icon: 'swap_horiz' }
        ],
        canSkip: true
      })
    });
  }

  // --- Dimension C2: BUDGET / VALUE (Dynamic Price Bands) ---
  if (!answered.includes('BUDGET')) {
    const { options: budgetOptions, entropy: budgetEntropy } = generateDynamicPriceBands(candidates);
    if (budgetOptions.length >= 2) {
      evaluators.push({
        dimension: 'BUDGET',
        entropy: budgetEntropy * 1.35,
        builder: () => ({
          id: 'q_budget',
          dimension: 'BUDGET',
          questionNumber,
          title: 'What price range works for you?',
          subtitle: 'Price bands computed directly from your saved wishlist items',
          aiRationale: `Remaining items span from ₹${candidates[0]?.price.toLocaleString('en-IN') || 0} to ₹${candidates[candidates.length - 1]?.price.toLocaleString('en-IN') || 0}`,
          options: budgetOptions,
          canSkip: true
        })
      });
    }
  }

  // --- Dimension E: FINAL ADAPTIVE QUESTION (Trade-off when uncertainty remains) ---
  if (questionNumber >= 4 && !answered.includes('ADAPTIVE_TRADE_OFF')) {
    evaluators.push({
      dimension: 'ADAPTIVE_TRADE_OFF',
      entropy: 0.95,
      builder: () => ({
        id: 'q_trade_off',
        dimension: 'ADAPTIVE_TRADE_OFF',
        questionNumber,
        title: 'Would you prefer the option that lasts longer or the one that is more affordable?',
        subtitle: 'Final adaptive tie-breaker to lock in your top 10 rankings',
        aiRationale: 'Resolving remaining trade-off between price value and long-term durability',
        options: [
          { id: 'trade_value', label: 'Affordable & Best Value', desc: 'Prioritize recent price drops and deepest discounts', value: 'high_discount', icon: 'percent' },
          { id: 'trade_durability', label: 'Durable & Long-lasting', desc: 'Prioritize premium fabrics and high craftsmanship ratings', value: 'durability_over_price', icon: 'verified' },
          { id: 'trade_interest', label: 'Strongest Interest', desc: 'Prioritize items you viewed often or added to bag', value: 'high_interest', icon: 'visibility' }
        ],
        canSkip: true
      })
    });
  }

  // Pick the question with highest entropy
  evaluators.sort((a, b) => b.entropy - a.entropy);

  if (evaluators.length > 0) {
    return {
      question: evaluators[0].builder(),
      shouldStopEarly: false
    };
  }

  // Stop early if no more questions
  return { question: null, shouldStopEarly: true };
}
