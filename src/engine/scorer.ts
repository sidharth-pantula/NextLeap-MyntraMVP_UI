import { Product, UserPreferences, MatchScoreResult } from '../types';
import { generateMatchReasons } from './reasonGenerator';

/**
 * Filter down active candidate items based on hard constraints and high-affinity answers.
 * Returns sorted subset of viable candidates for entropy calculations and next-question selection.
 */
export function getFilteredCandidates(
  allWishlistProducts: Product[],
  prefs: UserPreferences
): Product[] {
  let candidates = [...allWishlistProducts];

  // 1. Need / Occasion filtering
  if (prefs.need) {
    const needFiltered = candidates.filter(p =>
      p.attributes.occasions.some(occ => occ.toLowerCase() === prefs.need?.toLowerCase())
    );
    // If strict match has enough items (>= 3), narrow down; otherwise keep broader
    if (needFiltered.length >= 2) {
      candidates = needFiltered;
    }
  }

  // 2. Style Look filtering
  if (prefs.look) {
    const lookFiltered = candidates.filter(p =>
      p.attributes.look === prefs.look || p.attributes.styles.includes(prefs.look as any)
    );
    if (lookFiltered.length >= 2) {
      candidates = lookFiltered;
    }
  }

  // 3. Product Type filtering
  if (prefs.productType) {
    const typeFiltered = candidates.filter(p => p.attributes.productType === prefs.productType);
    if (typeFiltered.length >= 2) {
      candidates = typeFiltered;
    }
  }

  // 4. Fabric filtering
  if (prefs.fabric) {
    const fabricFiltered = candidates.filter(p =>
      p.attributes.fabric.toLowerCase() === prefs.fabric?.toLowerCase()
    );
    if (fabricFiltered.length >= 1) {
      candidates = fabricFiltered;
    }
  }

  // 5. Fit filtering
  if (prefs.fit) {
    const fitFiltered = candidates.filter(p => p.attributes.fit === prefs.fit);
    if (fitFiltered.length >= 2) {
      candidates = fitFiltered;
    }
  }

  // 6. Dynamic Budget filtering
  if (prefs.budgetMax) {
    const budgetFiltered = candidates.filter(p => {
      const min = prefs.budgetMin || 0;
      return p.price >= min && p.price <= (prefs.budgetMax! * 1.15); // allow small leeway
    });
    if (budgetFiltered.length >= 2) {
      candidates = budgetFiltered;
    }
  }

  return candidates;
}

/**
 * Scores every wishlist item using the multi-signal model:
 * Need (25%) + Style/Look (25%) + Preference/Value (15%) + Dynamic Budget (15%) + Implicit Signals (20%)
 */
export function calculateWishlistScores(
  products: Product[],
  prefs: UserPreferences
): MatchScoreResult[] {
  const scoredItems: MatchScoreResult[] = products.map((product) => {
    let totalScore = 0;
    const highlights = {
      needMatch: false,
      styleMatch: false,
      preferenceMatch: false,
      budgetMatch: false,
      priceDropMatch: false,
      highEngagementMatch: false,
    };

    // --- Factor 1: NEED / OCCASION MATCH (Max 25 pts) ---
    const weightNeed = 25;
    if (prefs.need) {
      const matchExact = product.attributes.occasions.some(
        (o) => o.toLowerCase() === prefs.need?.toLowerCase()
      );
      if (matchExact) {
        totalScore += weightNeed;
        highlights.needMatch = true;
      } else {
        // Partial affinity (e.g. Wedding & Festive, Party & Cocktail)
        const isRelated = 
          (prefs.need === 'Wedding' && product.attributes.occasions.includes('Festive')) ||
          (prefs.need === 'Party' && product.attributes.occasions.includes('Cocktail')) ||
          (prefs.need === 'Casual' && product.attributes.occasions.includes('Everyday'));
        if (isRelated) {
          totalScore += weightNeed * 0.7;
          highlights.needMatch = true;
        } else {
          totalScore += weightNeed * 0.2;
        }
      }
    } else {
      totalScore += weightNeed * 0.7;
    }

    // --- Factor 2: STYLE, LOOK & ATTRIBUTES (Max 25 pts) ---
    const weightStyle = 25;
    let styleScore = 0;
    let styleChecks = 0;

    if (prefs.look) {
      styleChecks++;
      if (product.attributes.look === prefs.look || product.attributes.styles.includes(prefs.look as any)) {
        styleScore += 10;
        highlights.styleMatch = true;
      } else {
        styleScore += 2;
      }
    }

    if (prefs.productType) {
      styleChecks++;
      if (product.attributes.productType === prefs.productType) {
        styleScore += 6;
        highlights.styleMatch = true;
      } else {
        styleScore += 1;
      }
    }

    if (prefs.fabric) {
      styleChecks++;
      if (product.attributes.fabric.toLowerCase() === prefs.fabric.toLowerCase()) {
        styleScore += 5;
        highlights.styleMatch = true;
      }
    }

    if (prefs.fit) {
      styleChecks++;
      if (product.attributes.fit === prefs.fit) {
        styleScore += 4;
        highlights.styleMatch = true;
      }
    }

    if (styleChecks === 0) {
      totalScore += weightStyle * 0.7;
    } else {
      totalScore += Math.min(weightStyle, (styleScore / (styleChecks * 6)) * weightStyle);
    }

    // --- Factor 3: PREFERENCE & CORE VALUE (Max 15 pts) ---
    const weightPref = 15;
    if (prefs.preference) {
      if (prefs.preference === 'Comfort') {
        const rating = product.attributes.comfortRating || 4;
        totalScore += (rating / 5) * weightPref;
        highlights.preferenceMatch = rating >= 4;
      } else if (prefs.preference === 'Durability') {
        const rating = product.attributes.durabilityRating || 4;
        totalScore += (rating / 5) * weightPref;
        highlights.preferenceMatch = rating >= 4;
      } else if (prefs.preference === 'Versatility') {
        const rating = product.attributes.versatilityRating || 4;
        totalScore += (rating / 5) * weightPref;
        highlights.preferenceMatch = rating >= 4;
      } else if (prefs.preference === 'Quality') {
        const rating = (product.rating / 5);
        totalScore += rating * weightPref;
        highlights.preferenceMatch = product.rating >= 4.5;
      } else {
        totalScore += weightPref * 0.75;
      }
    } else {
      totalScore += weightPref * 0.7;
    }

    // --- Factor 4: DYNAMIC BUDGET MATCH (Max 15 pts) ---
    const weightBudget = 15;
    if (prefs.budgetMax) {
      const min = prefs.budgetMin || 0;
      if (product.price >= min && product.price <= prefs.budgetMax) {
        totalScore += weightBudget;
        highlights.budgetMatch = true;
      } else if (product.price <= prefs.budgetMax * 1.2) {
        totalScore += weightBudget * 0.6;
      } else {
        totalScore += weightBudget * 0.2;
      }
    } else {
      totalScore += weightBudget * 0.75;
    }

    // --- Factor 5: IMPLICIT BUYING SIGNALS (Max 20 pts) ---
    // A. Price drop signal (+7 pts)
    if (product.signals.priceDropAmount && product.signals.priceDropAmount > 0) {
      totalScore += 7;
      highlights.priceDropMatch = true;
    } else if (product.discountPercentage >= 40) {
      totalScore += 4;
    }

    // B. User activity signal: views, cart, recency (+7 pts)
    if (product.signals.inCart) {
      totalScore += 7;
      highlights.highEngagementMatch = true;
    } else if (product.signals.viewsCount >= 15) {
      totalScore += 5;
      highlights.highEngagementMatch = true;
    } else if (product.signals.addedDaysAgo <= 2) {
      totalScore += 4;
    }

    // C. Popularity & Rating (+6 pts)
    const popRatio = (product.signals.popularityScore || 80) / 100;
    totalScore += popRatio * 6;

    // --- Trade-Off Modifier ---
    if (prefs.tradeOff === 'high_discount' && product.discountPercentage >= 40) {
      totalScore += 6;
    } else if (prefs.tradeOff === 'high_interest' && (product.signals.inCart || product.signals.viewsCount >= 15)) {
      totalScore += 6;
    } else if (prefs.tradeOff === 'durability_over_price' && (product.attributes.durabilityRating || 0) >= 4) {
      totalScore += 6;
    }

    // Clamp score cleanly between 45% and 99%
    const finalScore = Math.min(99, Math.max(45, Math.round(totalScore)));

    const { reasons, signalBadges } = generateMatchReasons(product, prefs, highlights);

    return {
      productId: product.id,
      product,
      matchScore: finalScore,
      rank: 0, // Assigned after sorting
      matchReasons: reasons,
      signalBadges,
      matchHighlights: highlights,
    };
  });

  // Sort descending by score; if tied, sort by price drop then rating
  scoredItems.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    const dropB = b.product.signals.priceDropAmount || 0;
    const dropA = a.product.signals.priceDropAmount || 0;
    if (dropB !== dropA) return dropB - dropA;
    return b.product.rating - a.product.rating;
  });

  // Assign 1-indexed ranks
  scoredItems.forEach((item, index) => {
    item.rank = index + 1;
  });

  return scoredItems;
}
