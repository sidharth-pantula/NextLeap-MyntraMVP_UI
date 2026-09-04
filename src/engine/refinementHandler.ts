import { UserPreferences } from '../types';

export function applyRefinement(
  currentPrefs: UserPreferences,
  refinementText: string
): UserPreferences {
  const text = refinementText.toLowerCase().trim();
  const updatedPrefs: UserPreferences = {
    ...currentPrefs,
    activeRefinementFilters: { ...(currentPrefs.activeRefinementFilters || {}) },
  };

  if (/less flashy|subtle|sober|simple|minimal/i.test(text)) {
    updatedPrefs.activeRefinementFilters!.styleModifier = 'less_flashy';
    updatedPrefs.look = 'Minimal';
  } else if (/best value|value for money|cheapest|best discount/i.test(text)) {
    updatedPrefs.activeRefinementFilters!.styleModifier = 'best_value';
    updatedPrefs.preference = 'Best Value';
    updatedPrefs.tradeOff = 'high_discount';
  } else if (/durable|long lasting|quality/i.test(text)) {
    updatedPrefs.preference = 'Durability';
    updatedPrefs.tradeOff = 'durability_over_price';
  } else if (/cotton|pure cotton/i.test(text)) {
    updatedPrefs.fabric = 'Cotton';
  } else if (/silk|pure silk/i.test(text)) {
    updatedPrefs.fabric = 'Silk';
  } else if (/only dresses|show dresses|dresses only/i.test(text)) {
    updatedPrefs.productType = 'Western';
  } else if (/ethnic only|only lehenga|traditional only/i.test(text)) {
    updatedPrefs.productType = 'Ethnic';
  } else if (/under\s*(?:rs\.?|inr|₹)?\s*(\d+)/i.test(text)) {
    const match = text.match(/\d+/);
    if (match) {
      const amount = parseInt(match[0], 10);
      updatedPrefs.budgetMax = amount;
      updatedPrefs.budgetLabel = `Under ₹${amount.toLocaleString('en-IN')}`;
    }
  }

  return updatedPrefs;
}
