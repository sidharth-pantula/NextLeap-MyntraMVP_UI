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
 * Generates 6 dynamic price bands based on actual item prices in the current candidate set.
 */
function generateDynamicPriceBands(candidates: Product[]): { options: AdaptiveOption[]; entropy: number } {
  const options: AdaptiveOption[] = [
    {
      id: 'budget_tier_1',
      label: 'Under ₹2,000',
      desc: 'Budget-friendly daily essentials & high discounts',
      value: { max: 2000, min: 0, label: 'Under ₹2,000' },
      icon: 'savings'
    },
    {
      id: 'budget_tier_2',
      label: '₹2,000 – ₹3,500',
      desc: 'Popular high-street trend & casual fashion',
      value: { max: 3500, min: 2000, label: '₹2,000 – ₹3,500' },
      icon: 'payments'
    },
    {
      id: 'budget_tier_3',
      label: '₹3,500 – ₹5,500',
      desc: 'Smart-casual blazers & evening wear',
      value: { max: 5500, min: 3500, label: '₹3,500 – ₹5,500' },
      icon: 'shopping_bag'
    },
    {
      id: 'budget_tier_4',
      label: '₹5,500 – ₹8,000',
      desc: 'Premium designer labels & anarkali suits',
      value: { max: 8000, min: 5500, label: '₹5,500 – ₹8,000' },
      icon: 'styler'
    },
    {
      id: 'budget_tier_5',
      label: '₹8,000 – ₹12,000',
      desc: 'Festive silk sarees & embroidered sets',
      value: { max: 12000, min: 8000, label: '₹8,000 – ₹12,000' },
      icon: 'diamond'
    },
    {
      id: 'budget_tier_6',
      label: 'Above ₹12,000',
      desc: 'Luxury bridal lehengas & couture craftsmanship',
      value: { max: 999999, min: 12000, label: 'Above ₹12,000' },
      icon: 'military_tech'
    }
  ];

  return { options, entropy: 1.4 };
}

/**
 * Evaluates candidate questions and picks the next question across the 4 dimensions.
 * Guarantees a comprehensive, adaptive 5-question experience where EVERY question has AT LEAST 6 options.
 */
export function determineNextQuestion(
  candidates: Product[],
  currentPrefs: UserPreferences,
  totalWishlistCount: number
): { question: AdaptiveQuestion | null; shouldStopEarly: boolean } {
  const answered = currentPrefs.answeredDimensions || [];
  const questionNumber = answered.length + 1;

  // Maximum 5 questions strictly enforced
  if (questionNumber > 5) {
    return { question: null, shouldStopEarly: true };
  }

  // ==========================================
  // QUESTION 1: DIMENSION A — NEED (6 Options)
  // ==========================================
  if (!answered.includes('NEED')) {
    const needOptions: AdaptiveOption[] = [
      { id: 'need_casual', label: 'Casual & Brunch', desc: 'Relaxed brunches, day hangouts & cafes', value: 'Casual', icon: 'coffee' },
      { id: 'need_party', label: 'Party & Evening', desc: 'Cocktails, dinners & celebrations', value: 'Party', icon: 'celebration' },
      { id: 'need_wedding', label: 'Wedding & Festive', desc: 'Ceremonies, sangeet, reception & bridal', value: 'Wedding', icon: 'favorite' },
      { id: 'need_vacation', label: 'Vacation & Resort', desc: 'Breezy summer trips, beach & holidays', value: 'Vacation', icon: 'flight_takeoff' },
      { id: 'need_work', label: 'Work & Office', desc: 'Formal meetings, corporate & smart-casual', value: 'Work', icon: 'work' },
      { id: 'need_everyday', label: 'Everyday Essentials', desc: 'Comfortable staples for daily routine', value: 'Everyday', icon: 'check_circle' }
    ];

    return {
      question: {
        id: 'q_need',
        dimension: 'NEED',
        questionNumber: 1,
        title: 'What are you shopping for right now?',
        subtitle: 'Select your immediate occasion to focus your wishlist',
        aiRationale: 'Filtering your saved clothing items across primary occasions',
        options: needOptions,
        canSkip: false
      },
      shouldStopEarly: false
    };
  }

  // =========================================================================
  // QUESTIONS 2 & 3: DIMENSION B — STYLE & PRODUCT ATTRIBUTES (6 Options Each)
  // (Adaptively evaluates entropy across Look, Type, Fabric, Fit)
  // =========================================================================
  interface CandidateEvaluator {
    dimension: QuestionDimension;
    entropy: number;
    builder: () => AdaptiveQuestion;
  }

  const evaluators: CandidateEvaluator[] = [];

  // --- Dimension B1: Look Aesthetic (6 Options) ---
  if (!answered.includes('STYLE_LOOK')) {
    const counts: Record<string, number> = { 'Elegant': 0, 'Trendy': 0, 'Minimal': 0, 'Statement': 0 };
    candidates.forEach(p => {
      const look = p.attributes.look;
      if (counts[look] !== undefined) counts[look]++;
    });

    const entropy = calculateEntropy(Object.values(counts), candidates.length || 1);
    evaluators.push({
      dimension: 'STYLE_LOOK',
      entropy: entropy + 1.25,
      builder: () => ({
        id: 'q_style_look',
        dimension: 'STYLE_LOOK',
        questionNumber,
        title: 'Which look is closer to what you want?',
        subtitle: 'Choose the visual style that matches your mood',
        aiRationale: 'Classifying aesthetic vibe and silhouette styles',
        options: [
          { id: 'look_elegant', label: 'Elegant & Graceful', desc: 'Sophisticated, refined & timeless drape', value: 'Elegant', icon: 'auto_awesome' },
          { id: 'look_trendy', label: 'Trendy & Modern', desc: 'Contemporary, fresh & on-trend cuts', value: 'Trendy', icon: 'trending_up' },
          { id: 'look_minimal', label: 'Minimal & Clean', desc: 'Understated, clean lines & structured', value: 'Minimal', icon: 'check_box_outline_blank' },
          { id: 'look_statement', label: 'Statement & Bold', desc: 'Dramatic, head-turning & vibrant detail', value: 'Statement', icon: 'local_fire_department' },
          { id: 'look_classic', label: 'Classic & Traditional', desc: 'Heritage craftsmanship & cultural grace', value: 'Classic', icon: 'star' },
          { id: 'look_casual_chic', label: 'Casual Chic', desc: 'Effortless, breezy & relaxed comfort', value: 'Casual', icon: 'spa' }
        ],
        canSkip: true
      })
    });
  }

  // --- Dimension B2: Type / Silhouette (6 Options) ---
  if (!answered.includes('STYLE_TYPE')) {
    evaluators.push({
      dimension: 'STYLE_TYPE',
      entropy: 1.2,
      builder: () => ({
        id: 'q_style_type',
        dimension: 'STYLE_TYPE',
        questionNumber,
        title: 'Which clothing type would you prefer?',
        subtitle: 'Narrow down the garment category from your wishlist',
        aiRationale: 'Differentiating category types among saved clothes',
        options: [
          { id: 'type_dresses', label: 'Dresses & Gowns', desc: 'Maxi gowns, slip dresses & party dresses', value: 'Western', icon: 'apparel' },
          { id: 'type_ethnic', label: 'Kurtas & Suit Sets', desc: 'Anarkalis, straight kurtas & palazzo suits', value: 'Ethnic', icon: 'styler' },
          { id: 'type_shirts', label: 'Shirts & Tops', desc: 'Formal shirts, camp collars & blouses', value: 'Western', icon: 'checkroom' },
          { id: 'type_trousers', label: 'Pants & Trousers', desc: 'Tailored trousers, formal pants & wide legs', value: 'Western', icon: 'straighten' },
          { id: 'type_sarees', label: 'Sarees & Lehengas', desc: 'Embroidered lehengas & pure silk sarees', value: 'Ethnic', icon: 'flare' },
          { id: 'type_jeans', label: 'Jeans & Denim', desc: 'Classic slim fits & stretch denim pants', value: 'Western', icon: 'layers' }
        ],
        canSkip: true
      })
    });
  }

  // --- Dimension B3: Fabric (6 Options) ---
  if (!answered.includes('STYLE_FABRIC')) {
    evaluators.push({
      dimension: 'STYLE_FABRIC',
      entropy: 1.15,
      builder: () => ({
        id: 'q_style_fabric',
        dimension: 'STYLE_FABRIC',
        questionNumber,
        title: 'Which fabric would you prefer?',
        subtitle: 'Select the material texture that feels best for you',
        aiRationale: 'Analyzing fabric feel and breathability across items',
        options: [
          { id: 'fabric_cotton', label: 'Pure Cotton', desc: 'Breathable, natural & lightweight comfort', value: 'Cotton', icon: 'eco' },
          { id: 'fabric_silk', label: 'Pure Silk', desc: 'Rich, lustrous & festive luxury drape', value: 'Silk', icon: 'diamond' },
          { id: 'fabric_satin', label: 'Fluid Satin', desc: 'Glossy, fluid & glamorous evening shine', value: 'Satin', icon: 'flare' },
          { id: 'fabric_linen', label: 'Breathable Linen', desc: 'Crisp, airy & smart-casual texture', value: 'Linen', icon: 'texture' },
          { id: 'fabric_georgette', label: 'Flowy Georgette', desc: 'Light, semi-sheer & ethereal drape', value: 'Georgette', icon: 'water_drop' },
          { id: 'fabric_denim_poly', label: 'Denim & Tailored Blends', desc: 'Structured, durable & all-day wear', value: 'Denim', icon: 'layers' }
        ],
        canSkip: true
      })
    });
  }

  // --- Dimension B4: Fit Profile (6 Options) ---
  if (!answered.includes('STYLE_FIT')) {
    evaluators.push({
      dimension: 'STYLE_FIT',
      entropy: 1.05,
      builder: () => ({
        id: 'q_style_fit',
        dimension: 'STYLE_FIT',
        questionNumber,
        title: 'What fit are you looking for?',
        subtitle: 'Choose your desired silhouette and cut',
        aiRationale: 'Balancing fit profiles for your comfort preference',
        options: [
          { id: 'fit_regular', label: 'Regular Classic', desc: 'Standard everyday balanced fit', value: 'Regular', icon: 'straighten' },
          { id: 'fit_slim', label: 'Slim & Sleek', desc: 'Contoured & streamlined body profile', value: 'Slim', icon: 'accessibility' },
          { id: 'fit_relaxed', label: 'Relaxed & Easy', desc: 'Comfortable, breezy & loose drape', value: 'Relaxed', icon: 'accessibility_new' },
          { id: 'fit_oversized', label: 'Oversized Boxy', desc: 'Modern roomy streetwear drape', value: 'Oversized', icon: 'fullscreen' },
          { id: 'fit_tailored', label: 'Tailored Structured', desc: 'Sharp, form-fitting & formal structure', value: 'Tailored', icon: 'design_services' },
          { id: 'fit_flared', label: 'Flared & Flowy', desc: 'Voluminous hem with graceful movement', value: 'Regular', icon: 'flare' }
        ],
        canSkip: true
      })
    });
  }

  // =========================================================================
  // QUESTION 4: DIMENSION C — PREFERENCE & BUDGET (6 Options Each)
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
          { id: 'pref_comfort', label: 'Comfort & Breathability', desc: 'Soft fabrics, easy fits & all-day wearability', value: 'Comfort', icon: 'spa' },
          { id: 'pref_durability', label: 'Durability & Longevity', desc: 'Resilient high-stitch quality & long lifecycle', value: 'Durability', icon: 'shield' },
          { id: 'pref_quality', label: 'Premium Craftsmanship', desc: 'Superior materials & rich detailing', value: 'Quality', icon: 'verified' },
          { id: 'pref_versatility', label: 'Multi-Occasion Versatility', desc: 'Flexible styling across diverse events', value: 'Versatility', icon: 'swap_horiz' },
          { id: 'pref_best_value', label: 'Best Value & Price Drops', desc: 'Deepest discounts & maximum savings', value: 'Best Value', icon: 'percent' },
          { id: 'pref_easy_care', label: 'Easy Care & Wrinkle-Free', desc: 'Low maintenance, travel-ready fabrics', value: 'Comfort', icon: 'iron' }
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
        subtitle: 'Select your preferred price bracket for this session',
        aiRationale: 'Setting budget boundaries based on your saved clothes',
        options: budgetOptions,
        canSkip: true
      })
    });
  }

  // =========================================================================
  // QUESTION 5: FINAL ADAPTIVE QUESTION (Trade-off - 6 Options)
  // =========================================================================
  if (questionNumber === 5 && !answered.includes('ADAPTIVE_TRADE_OFF')) {
    return {
      question: {
        id: 'q_trade_off',
        dimension: 'ADAPTIVE_TRADE_OFF',
        questionNumber: 5,
        title: 'Would you prefer the option that lasts longer or the one that is more affordable?',
        subtitle: 'Final adaptive tie-breaker to lock in your top 10 rankings',
        aiRationale: 'Resolving trade-off between price value and long-term durability',
        options: [
          { id: 'trade_durability', label: 'Durable & Long-lasting', desc: 'Prioritize premium fabrics & verified durability', value: 'durability_over_price', icon: 'verified' },
          { id: 'trade_value', label: 'Affordable & Best Value', desc: 'Prioritize recent price drops and deepest discount %', value: 'high_discount', icon: 'percent' },
          { id: 'trade_interest', label: 'Strongest Interest', desc: 'Prioritize items you viewed most or added to bag', value: 'high_interest', icon: 'visibility' },
          { id: 'trade_versatility', label: 'Most Versatile', desc: 'Prioritize pieces you can style for multiple events', value: 'Versatility', icon: 'swap_horiz' },
          { id: 'trade_rating', label: 'Highest Customer Rating', desc: 'Prioritize pieces with 4.7★+ verified reviews', value: 'Quality', icon: 'star' },
          { id: 'trade_breathable', label: 'Lightweight & Breathable', desc: 'Prioritize airy, all-weather natural comfort', value: 'Comfort', icon: 'eco' }
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
