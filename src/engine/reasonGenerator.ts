import { Product, UserPreferences } from '../types';

export function generateMatchReasons(
  product: Product,
  prefs: UserPreferences,
  highlights: {
    needMatch: boolean;
    styleMatch: boolean;
    preferenceMatch: boolean;
    budgetMatch: boolean;
    priceDropMatch: boolean;
    highEngagementMatch: boolean;
  }
): { reasons: string[]; signalBadges: string[] } {
  const reasons: string[] = [];
  const signalBadges: string[] = [];

  // Signal Badges
  if (product.signals.priceDropAmount && product.signals.priceDropAmount > 0) {
    signalBadges.push(`₹${product.signals.priceDropAmount.toLocaleString('en-IN')} Price Drop`);
  }
  if (product.signals.inCart) {
    signalBadges.push('In Your Bag');
  } else if (product.signals.viewsCount >= 15) {
    signalBadges.push('High Interest (Viewed often)');
  }
  if (product.signals.stockCount <= 3) {
    signalBadges.push(`Only ${product.signals.stockCount} left`);
  }
  if (product.rating >= 4.7) {
    signalBadges.push(`${product.rating}★ Top Rated`);
  }

  // Reason 1: Need / Occasion Fit
  if (highlights.needMatch && prefs.need) {
    if (prefs.need === 'Wedding') {
      reasons.push(`Perfect for wedding occasions with festive ${product.attributes.fabric} detailing`);
    } else if (prefs.need === 'Party') {
      reasons.push(`Ideal evening party silhouette in ${product.attributes.look.toLowerCase()} styling`);
    } else if (prefs.need === 'Work') {
      reasons.push(`Polished office-appropriate aesthetic with comfortable ${product.attributes.fit.toLowerCase()} fit`);
    } else if (prefs.need === 'Vacation') {
      reasons.push(`Breathable, relaxed cut designed for vacation & leisure`);
    } else {
      reasons.push(`Matches your ${prefs.need} requirement with ${product.attributes.look} aesthetic`);
    }
  }

  // Reason 2: Style & Attribute Precision (Look / Fabric / Fit / Type)
  if (prefs.look && (product.attributes.look === prefs.look || product.attributes.styles.includes(prefs.look as any))) {
    reasons.push(`Features your preferred '${prefs.look}' look in rich ${product.attributes.fabric}`);
  } else if (prefs.fabric && product.attributes.fabric.toLowerCase() === prefs.fabric.toLowerCase()) {
    reasons.push(`Crafted in your chosen ${prefs.fabric} material with fine drape`);
  } else if (prefs.productType && product.attributes.productType === prefs.productType) {
    reasons.push(`Authentic ${prefs.productType} wear design tailored by ${product.brand}`);
  } else if (prefs.fit && product.attributes.fit === prefs.fit) {
    reasons.push(`Tailored in your requested ${prefs.fit} fit profile`);
  }

  // Reason 3: Buying Signals & Value Highlights
  if (product.signals.priceDropAmount && product.signals.priceDropAmount > 0) {
    reasons.push(`High value: Price recently dropped by ₹${product.signals.priceDropAmount.toLocaleString('en-IN')} (${product.discountPercentage}% total off)`);
  } else if (highlights.budgetMatch && prefs.budgetMax && product.price <= prefs.budgetMax) {
    reasons.push(`Fits within your budget at ₹${product.price.toLocaleString('en-IN')}`);
  } else if (prefs.preference === 'Comfort' && (product.attributes.comfortRating || 4) >= 4) {
    reasons.push(`High comfort score with breathable ${product.attributes.fabric} fabric`);
  } else if (prefs.preference === 'Durability' && (product.attributes.durabilityRating || 4) >= 4) {
    reasons.push(`Top-rated durability and high stitch quality`);
  } else if (prefs.preference === 'Versatility' && (product.attributes.versatilityRating || 4) >= 4) {
    reasons.push(`Versatile piece easily paired across multiple occasions`);
  } else if (product.rating >= 4.5) {
    reasons.push(`Exceptional ${product.rating}★ rating from ${product.ratingCount}+ customers`);
  }

  // Fallbacks if fewer than 2 reasons
  if (reasons.length < 2) {
    reasons.push(`Highly saved item with ${product.discountPercentage}% discount on MRP`);
  }
  if (reasons.length < 2) {
    reasons.push(`Quality craftsmanship from ${product.brand}`);
  }

  return {
    reasons: reasons.slice(0, 3),
    signalBadges: signalBadges.slice(0, 2)
  };
}
