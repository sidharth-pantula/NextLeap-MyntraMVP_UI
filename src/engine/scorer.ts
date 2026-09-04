import { Product, UserIntent, MatchScoreResult } from '../types';
import { generateMatchReasons } from './reasonGenerator';

export function calculateWishlistScores(
  products: Product[],
  intent: UserIntent
): MatchScoreResult[] {
  const scoredItems: MatchScoreResult[] = products.map((product) => {
    let totalScore = 0;
    const highlights = {
      budgetMatch: false,
      occasionMatch: false,
      styleMatch: false,
      categoryMatch: false,
      colorMatch: false,
    };

    // --- Factor 1: Occasion Match (Weight: 35 points) ---
    const weightOccasion = 35;
    if (intent.occasion) {
      const matchExact = product.attributes.occasions.some(
        (o) => o.toLowerCase() === intent.occasion?.toLowerCase()
      );
      if (matchExact) {
        totalScore += weightOccasion;
        highlights.occasionMatch = true;
      } else {
        // Related occasions partial credit
        const isFestiveWedding = (intent.occasion === 'Wedding' && product.attributes.occasions.includes('Festive')) ||
                                 (intent.occasion === 'Party' && product.attributes.occasions.includes('Cocktail'));
        if (isFestiveWedding) {
          totalScore += weightOccasion * 0.7;
          highlights.occasionMatch = true;
        } else {
          totalScore += weightOccasion * 0.15; // baseline
        }
      }
    } else {
      totalScore += weightOccasion * 0.7; // default average if unselected
    }

    // --- Factor 2: Style & Aesthetics Match (Weight: 25 points) ---
    const weightStyle = 25;
    if (intent.style) {
      const matchExactStyle = product.attributes.styles.some(
        (s) => s.toLowerCase() === intent.style?.toLowerCase()
      );
      if (matchExactStyle) {
        totalScore += weightStyle;
        highlights.styleMatch = true;
      } else {
        // Partial compatibility (e.g. Traditional + Elegant, Minimal + Chic)
        const isCompatible = (intent.style === 'Elegant' && product.attributes.styles.includes('Traditional')) ||
                             (intent.style === 'Traditional' && product.attributes.styles.includes('Elegant')) ||
                             (intent.style === 'Minimal' && product.attributes.styles.includes('Classic'));
        if (isCompatible) {
          totalScore += weightStyle * 0.65;
          highlights.styleMatch = true;
        } else {
          totalScore += weightStyle * 0.2;
        }
      }
    } else {
      totalScore += weightStyle * 0.7;
    }

    // --- Factor 3: Budget Match (Weight: 20 points) ---
    const weightBudget = 20;
    if (intent.budgetMax) {
      if (product.price <= intent.budgetMax) {
        totalScore += weightBudget;
        highlights.budgetMatch = true;
      } else {
        const exceedRatio = (product.price - intent.budgetMax) / intent.budgetMax;
        if (exceedRatio <= 0.2) {
          totalScore += weightBudget * 0.6; // Slightly over budget
        } else if (exceedRatio <= 0.5) {
          totalScore += weightBudget * 0.3;
        } else {
          totalScore += weightBudget * 0.05; // Heavy penalty
        }
      }
    } else {
      totalScore += weightBudget * 0.8;
    }

    // --- Factor 4: Category Fit (Weight: 15 points) ---
    const weightCategory = 15;
    if (intent.category && intent.category !== 'All Categories') {
      const matchCat = product.subCategory.toLowerCase() === intent.category.toLowerCase() ||
                       product.category.toLowerCase() === intent.category.toLowerCase() ||
                       (intent.category === 'Ethnic Wear' && (product.subCategory === 'Ethnic Wear' || product.subCategory === 'Kurtas')) ||
                       (intent.category === 'Western Wear' && (product.subCategory === 'Western Wear' || product.subCategory === 'Dresses'));
      if (matchCat) {
        totalScore += weightCategory;
        highlights.categoryMatch = true;
      } else {
        totalScore += weightCategory * 0.1;
      }
    } else {
      totalScore += weightCategory * 0.85;
      highlights.categoryMatch = true;
    }

    // --- Factor 5: Color, Fabric & Tone Synergy (Weight: 5 points) ---
    const weightColor = 5;
    if (intent.colorPreference) {
      if (product.attributes.colorFamily.toLowerCase() === intent.colorPreference.toLowerCase()) {
        totalScore += weightColor;
        highlights.colorMatch = true;
      } else {
        totalScore += weightColor * 0.3;
      }
    } else {
      totalScore += weightColor * 0.7;
    }

    // --- Factor 6: Active Refinements ---
    if (intent.activeRefinementFilters) {
      const ref = intent.activeRefinementFilters;
      // "Less flashy"
      if (ref.styleModifier === 'less_flashy') {
        if (product.attributes.isFlashy) {
          totalScore -= 18;
        } else if (product.attributes.styles.includes('Minimal') || product.attributes.styles.includes('Classic')) {
          totalScore += 12;
        }
      }
      // "Best value"
      if (ref.styleModifier === 'best_value') {
        if (product.discountPercentage >= 40) {
          totalScore += 10;
        }
        if (product.price < 3000) {
          totalScore += 8;
        }
      }
      // Category lock
      if (ref.onlyCategory) {
        if (product.subCategory.toLowerCase().includes(ref.onlyCategory.toLowerCase()) || 
            product.attributes.tags.some(t => t.includes(ref.onlyCategory!))) {
          totalScore += 15;
        } else {
          totalScore -= 25;
        }
      }
    }

    // Clamp score between 30 and 99
    let finalPercentage = Math.min(98, Math.max(32, Math.round(totalScore)));

    // Generate explanations
    const reasons = generateMatchReasons(product, intent, highlights);

    return {
      productId: product.id,
      product,
      matchScore: finalPercentage,
      rank: 0, // Assigned after sorting
      matchReasons: reasons,
      matchHighlights: highlights,
    };
  });

  // Sort descending by score; if tied, sort by discount or rating
  scoredItems.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return b.product.discountPercentage - a.product.discountPercentage;
  });

  // Assign 1-indexed ranks
  scoredItems.forEach((item, index) => {
    item.rank = index + 1;
  });

  return scoredItems;
}
