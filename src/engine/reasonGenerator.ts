import { Product, UserIntent } from '../types';

export function generateMatchReasons(
  product: Product,
  intent: UserIntent,
  highlights: {
    budgetMatch: boolean;
    occasionMatch: boolean;
    styleMatch: boolean;
    categoryMatch: boolean;
    colorMatch: boolean;
  }
): string[] {
  const reasons: string[] = [];

  // 1. Budget Reason
  if (highlights.budgetMatch) {
    if (intent.budgetMax && product.price <= intent.budgetMax) {
      if (product.discountPercentage >= 30) {
        reasons.push(`Fits your budget (₹${product.price.toLocaleString('en-IN')}) with great ${product.discountPercentage}% discount`);
      } else {
        reasons.push(`Fits your budget perfectly within ${intent.budgetLabel || `₹${intent.budgetMax.toLocaleString('en-IN')}`}`);
      }
    } else {
      reasons.push(`Priced reasonably at ₹${product.price.toLocaleString('en-IN')}`);
    }
  }

  // 2. Occasion Reason
  if (highlights.occasionMatch && intent.occasion) {
    if (intent.occasion === 'Wedding') {
      if (product.attributes.formality === 'Ultra Formal') {
        reasons.push(`Suitable for wedding ceremony & reception events`);
      } else {
        reasons.push(`Great silhouette ideal for wedding guests`);
      }
    } else if (intent.occasion === 'Party' || intent.occasion === 'Cocktail') {
      reasons.push(`Perfect match for evening parties and cocktail events`);
    } else if (intent.occasion === 'Work') {
      reasons.push(`Polished aesthetic appropriate for work & formal settings`);
    } else if (intent.occasion === 'Vacation') {
      reasons.push(`Breathable, relaxed cut ideal for resort & holiday wear`);
    } else {
      reasons.push(`Matches your ${intent.occasion} occasion requirement`);
    }
  }

  // 3. Style Reason
  if (highlights.styleMatch && intent.style) {
    if (intent.style === 'Elegant') {
      reasons.push(`Features your preferred 'Elegant' silhouette with premium ${product.attributes.fabric} fabric`);
    } else if (intent.style === 'Traditional') {
      reasons.push(`Classic ethnic craftsmanship with traditional styling`);
    } else if (intent.style === 'Minimal') {
      reasons.push(`Clean, understated lines matching your minimalist preference`);
    } else if (intent.style === 'Trendy') {
      reasons.push(`Modern contemporary cut on-trend for this season`);
    } else {
      reasons.push(`Matches your ${intent.style} style preference`);
    }
  }

  // 4. Category/Color/Fabric Reason
  if (highlights.colorMatch && intent.colorPreference) {
    reasons.push(`Features your preferred ${product.attributes.color} (${product.attributes.colorFamily}) tone`);
  } else if (product.attributes.fabric) {
    reasons.push(`Crafted from luxurious ${product.attributes.fabric} with premium drape`);
  }

  // Ensure minimum 2-3 reasons
  if (reasons.length === 0) {
    reasons.push(`High customer rating (${product.rating} ★ based on ${product.ratingCount}+ reviews)`);
    reasons.push(`Versatile piece from ${product.brand}`);
  } else if (reasons.length === 1) {
    reasons.push(`High customer satisfaction rating of ${product.rating} ★`);
  }

  return reasons.slice(0, 3);
}
