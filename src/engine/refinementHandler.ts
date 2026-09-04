import { UserIntent } from '../types';

export function applyRefinement(
  currentIntent: UserIntent,
  refinementText: string
): UserIntent {
  const text = refinementText.toLowerCase().trim();
  const updatedIntent: UserIntent = {
    ...currentIntent,
    activeRefinementFilters: { ...(currentIntent.activeRefinementFilters || {}) },
  };

  if (/less flashy|subtle|sober|simple|minimal/i.test(text)) {
    updatedIntent.activeRefinementFilters!.styleModifier = 'less_flashy';
    updatedIntent.style = 'Minimal';
  } else if (/best value|value for money|cheapest|best discount/i.test(text)) {
    updatedIntent.activeRefinementFilters!.styleModifier = 'best_value';
  } else if (/pastel|change to pastel|soft colors/i.test(text)) {
    updatedIntent.colorPreference = 'Pastel';
  } else if (/only dresses|show dresses|dresses only/i.test(text)) {
    updatedIntent.activeRefinementFilters!.onlyCategory = 'dress';
    updatedIntent.category = 'Western Wear';
  } else if (/ethnic only|only lehenga|traditional only/i.test(text)) {
    updatedIntent.activeRefinementFilters!.onlyCategory = 'ethnic';
    updatedIntent.category = 'Ethnic Wear';
  } else if (/under\s*(?:rs\.?|inr|₹)?\s*(\d+)/i.test(text) || /remove anything over\s*(?:rs\.?|inr|₹)?\s*(\d+)/i.test(text)) {
    const match = text.match(/\d+/);
    if (match) {
      const amount = parseInt(match[0], 10);
      updatedIntent.budgetMax = amount;
      updatedIntent.budgetLabel = `Under ₹${amount.toLocaleString('en-IN')}`;
    }
  } else if (/under 5k|under 5000/i.test(text)) {
    updatedIntent.budgetMax = 5000;
    updatedIntent.budgetLabel = 'Under ₹5,000';
  }

  return updatedIntent;
}
