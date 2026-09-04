import { Product, UserPreferences, AdaptiveQuestion, AdaptiveOption, QuestionDimension } from '../types';

/**
 * Calculates the Shannon entropy of a distribution to measure discriminatory power.
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
  const prices = (candidates.length > 0 ? candidates : []).map(p => p.price).sort((a, b) => a - b);
  const minPrice = prices[0] || 1500;
  const maxPrice = prices[prices.length - 1] || 12000;

  const p33 = prices[Math.floor(prices.length * 0.33)] || 2500;
  const p66 = prices[Math.floor(prices.length * 0.66)] || 6000;

  const t1 = Math.max(1500, Math.round(p33 / 500) * 500);
  const t2 = Math.max(t1 + 1000, Math.round(p66 / 500) * 500);

  const options: AdaptiveOption[] = [
    {
      id: 'budget_tier_1',
      label: `Under ₹${t1.toLocaleString('en-IN')}`,
      desc: 'Best value & budget-friendly essentials',
      value: { max: t1, min: 0, label: `Under ₹${t1.toLocaleString('en-IN')}` },
      icon: 'savings'
    },
    {
      id: 'budget_tier_2',
      label: `₹${t1.toLocaleString('en-IN')} – ₹${t2.toLocaleString('en-IN')}`,
      desc: 'Mid-range curated styles & premium brands',
      value: { max: t2, min: t1, label: `₹${t1.toLocaleString('en-IN')} – ₹${t2.toLocaleString('en-IN')}` },
      icon: 'payments'
    },
    {
      id: 'budget_tier_3',
      label: `Above ₹${t2.toLocaleString('en-IN')}`,
      desc: 'Luxury designer handcrafted collections',
      value: { max: 999999, min: t2, label: `Above ₹${t2.toLocaleString('en-IN')}` },
      icon: 'diamond'
    }
  ];

  return { options, entropy: 1.3 };
}

/**
 * Evaluates candidate questions and picks the next question across the 4 dimensions.
 * Guarantees a comprehensive, adaptive 5-question experience.
 */
export function determineNextQuestion(
  candidates: Product[],
  currentPrefs: UserPreferences,
  totalWishlistCount: number
): { question: AdaptiveQuestion | null; shouldStopEarly: boolean } {
  const answered = currentPrefs.answeredDimensions || [];
  const questionNumber = answered.length + 1;

  // After 5 questions are answered, complete the survey
  if (questionNumber > 5) {
    return { question: null, shouldStopEarly: true };
  }

  // ==========================================
  // QUESTION 1: DIMENSION A — NEED
  // ==========================================
  if (!answered.includes('NEED')) {
    const needOptions: AdaptiveOption[] = [
      { id: 'need_casual', label: 'Casual', desc: 'Relaxed brunches, daily wear & hangouts', value: 'Casual', icon: 'coffee' },
      { id: 'need_party', label: 'Party', desc: 'Cocktails, club nights & celebrations', value: 'Party', icon: 'celebration' },
      { id: 'need_wedding', label: 'Wedding', desc: 'Ceremonies, sangeet, reception & bridal', value: 'Wedding', icon: 'favorite' },
      { id: 'need_vacation', label: 'Vacation', desc: 'Resort, beach & holiday travel', value: 'Vacation', icon: 'flight_takeoff' },
      { id: 'need_work', label: 'Work', desc: 'Office wear, meetings & corporate formal', value: 'Work', icon: 'work' },
      { id: 'need_everyday', label: 'Everyday', desc: 'Comfort essentials for your daily routine', value: 'Everyday', icon: 'check_circle' }
    ];

    return {
      question: {
        id: 'q_need',
        dimension: 'NEED',
        questionNumber: 1,
        title: 'What are you shopping for right now?',
        subtitle: 'Select your immediate need to focus your wishlist',
        aiRationale: 'Classifying occasion intent across your saved wishlist items',
        options: needOptions,
        canSkip: false
      },
      shouldStopEarly: false
    };
  }

  // =========================================================================
  // QUESTIONS 2 & 3: DIMENSION B — STYLE & PRODUCT ATTRIBUTES
  // (Adaptively evaluates entropy across Look, Type, Fabric, Fit)
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

    const entropy = calculateEntropy(Object.values(counts), candidates.length || 1);
    evaluators.push({
      dimension: 'STYLE_LOOK',
      entropy: entropy + 1.2, // High aesthetic significance
      builder: () => ({
        id: 'q_style_look',
        dimension: 'STYLE_LOOK',
        questionNumber,
        title: 'Which look is closer to what you want?',
        subtitle: 'Choose the aesthetic vibe that best suits your vision',
        aiRationale: 'Analyzing aesthetic distribution across remaining candidates',
        options: [
          { id: 'look_elegant', label: 'Elegant', desc: 'Sophisticated, refined & timeless grace', value: 'Elegant', icon: 'auto_awesome' },
          { id: 'look_trendy', label: 'Trendy', desc: 'Modern, fresh & contemporary silhouettes', value: 'Trendy', icon: 'trending_up' },
          { id: 'look_minimal', label: 'Minimal', desc: 'Clean, understated & structured lines', value: 'Minimal', icon: 'check_box_outline_blank' },
          { id: 'look_statement', label: 'Statement', desc: 'Bold, head-turning & vibrant detail', value: 'Statement', icon: 'local_fire_department' }
        ],
        canSkip: true
      })
    });
  }

  // --- Dimension B2: Type (Western | Ethnic | Fusion) ---
  if (!answered.includes('STYLE_TYPE')) {
    const counts: Record<string, number> = { 'Western': 0, 'Ethnic': 0, 'Fusion': 0 };
    candidates.forEach(p => {
      const t = p.attributes.productType || 'Western';
      if (counts[t] !== undefined) counts[t]++;
    });
    const entropy = calculateEntropy(Object.values(counts), candidates.length || 1);

    evaluators.push({
      dimension: 'STYLE_TYPE',
      entropy: entropy + 1.1,
      builder: () => ({
        id: 'q_style_type',
        dimension: 'STYLE_TYPE',
        questionNumber,
        title: 'Which type would you prefer?',
        subtitle: 'Choose between traditional, western, or modern fusion',
        aiRationale: 'Differentiating category type among relevant items',
        options: [
          { id: 'type_western', label: 'Western', desc: 'Dresses, blazers, shirts & tailored trousers', value: 'Western', icon: 'apparel' },
          { id: 'type_ethnic', label: 'Ethnic', desc: 'Lehengas, sarees, suits & traditional sets', value: 'Ethnic', icon: 'styler' },
          { id: 'type_fusion', label: 'Fusion', desc: 'Contemporary Indo-Western silhouettes', value: 'Fusion', icon: 'flare' }
        ],
        canSkip: true
      })
    });
  }

  // --- Dimension B3: Fabric (Cotton | Silk | Satin | Linen | No preference) ---
  if (!answered.includes('STYLE_FABRIC')) {
    evaluators.push({
      dimension: 'STYLE_FABRIC',
      entropy: 1.15,
      builder: () => ({
        id: 'q_style_fabric',
        dimension: 'STYLE_FABRIC',
        questionNumber,
        title: 'Which fabric would you prefer?',
        subtitle: 'Select the material feel that you prefer',
        aiRationale: 'Evaluating material and texture preferences for remaining items',
        options: [
          { id: 'fabric_cotton', label: 'Cotton', desc: 'Breathable, lightweight & natural comfort', value: 'Cotton', icon: 'eco' },
          { id: 'fabric_silk', label: 'Silk', desc: 'Lustrous, luxurious & festive drape', value: 'Silk', icon: 'diamond' },
          { id: 'fabric_satin', label: 'Satin', desc: 'Glossy, fluid & glamorous evening finish', value: 'Satin', icon: 'flare' },
          { id: 'fabric_linen', label: 'Linen', desc: 'Crisp, airy & effortless smart-casual texture', value: 'Linen', icon: 'texture' },
          { id: 'fabric_no_pref', label: 'No preference', desc: 'Keep all fabrics eligible', value: undefined, icon: 'all_inclusive' }
        ],
        canSkip: true
      })
    });
  }

  // --- Dimension B4: Fit (Regular | Slim | Relaxed | Oversized) ---
  if (!answered.includes('STYLE_FIT')) {
    evaluators.push({
      dimension: 'STYLE_FIT',
      entropy: 1.0,
      builder: () => ({
        id: 'q_style_fit',
        dimension: 'STYLE_FIT',
        questionNumber,
        title: 'What fit are you looking for?',
        subtitle: 'Choose your desired silhouette and cut',
        aiRationale: 'Optimizing fit and cut profiles for recommendations',
        options: [
          { id: 'fit_regular', label: 'Regular', desc: 'Standard classic everyday fit', value: 'Regular', icon: 'straighten' },
          { id: 'fit_slim', label: 'Slim', desc: 'Contoured, tailored & sleek profile', value: 'Slim', icon: 'straighten' },
          { id: 'fit_relaxed', label: 'Relaxed', desc: 'Easy-going, comfortable drape', value: 'Relaxed', icon: 'accessibility_new' },
          { id: 'fit_oversized', label: 'Oversized', desc: 'Modern relaxed boxy aesthetic', value: 'Oversized', icon: 'fullscreen' }
        ],
        canSkip: true
      })
    });
  }

  // =========================================================================
  // QUESTION 4: DIMENSION C — PREFERENCE & BUDGET
  // =========================================================================
  if (!answered.includes('PREFERENCE')) {
    evaluators.push({
      dimension: 'PREFERENCE',
      entropy: 1.45,
      builder: () => ({
        id: 'q_preference',
        dimension: 'PREFERENCE',
        questionNumber,
        title: 'What matters most for this purchase?',
        subtitle: 'Select the core quality attribute that drives your decision',
        aiRationale: 'Applying key value weighting to fine-tune rankings',
        options: [
          { id: 'pref_comfort', label: 'Comfort', desc: 'Soft fabrics, breathable feel & all-day ease', value: 'Comfort', icon: 'spa' },
          { id: 'pref_durability', label: 'Durability', desc: 'Resilient high-stitch quality & long lifecycle', value: 'Durability', icon: 'shield' },
          { id: 'pref_quality', label: 'Quality', desc: 'Premium materials & impeccable craftsmanship', value: 'Quality', icon: 'verified' },
          { id: 'pref_versatility', label: 'Versatility', desc: 'Flexible styling across multiple occasions', value: 'Versatility', icon: 'swap_horiz' }
        ],
        canSkip: true
      })
    });
  }

  if (!answered.includes('BUDGET')) {
    const { options: budgetOptions, entropy: budgetEntropy } = generateDynamicPriceBands(candidates);
    evaluators.push({
      dimension: 'BUDGET',
      entropy: budgetEntropy * 1.35,
      builder: () => ({
        id: 'q_budget',
        dimension: 'BUDGET',
        questionNumber,
        title: 'What price range works for you?',
        subtitle: 'Dynamic price bands calculated directly from your saved wishlist items',
        aiRationale: 'Setting target budget bounds based on your saved products',
        options: budgetOptions,
        canSkip: true
      })
    });
  }

  // =========================================================================
  // QUESTION 5: FINAL ADAPTIVE QUESTION (Trade-off)
  // =========================================================================
  if (questionNumber === 5 && !answered.includes('ADAPTIVE_TRADE_OFF')) {
    return {
      question: {
        id: 'q_trade_off',
        dimension: 'ADAPTIVE_TRADE_OFF',
        questionNumber: 5,
        title: 'Would you prefer the option that lasts longer or the one that is more affordable?',
        subtitle: 'Final adaptive tie-breaker to lock in your top 10 rankings',
        aiRationale: 'Resolving final trade-off between price value and long-term durability',
        options: [
          { id: 'trade_durability', label: 'Durable & Long-lasting', desc: 'Prioritize premium materials, higher durability & craftsmanship', value: 'durability_over_price', icon: 'verified' },
          { id: 'trade_value', label: 'Affordable & Best Value', desc: 'Prioritize recent price drops and deepest discount percentages', value: 'high_discount', icon: 'percent' },
          { id: 'trade_interest', label: 'Strongest Interest', desc: 'Prioritize items you viewed most or added to bag', value: 'high_interest', icon: 'visibility' }
        ],
        canSkip: true
      },
      shouldStopEarly: false
    };
  }

  // Sort candidate evaluators by highest entropy / discriminatory power
  evaluators.sort((a, b) => b.entropy - a.entropy);

  if (evaluators.length > 0) {
    return {
      question: evaluators[0].builder(),
      shouldStopEarly: false
    };
  }

  return { question: null, shouldStopEarly: true };
}
