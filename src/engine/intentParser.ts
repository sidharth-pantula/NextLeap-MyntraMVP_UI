import { UserPreferences, PrimaryNeed, LookStyle, ProductType } from '../types';

export function parseIntentFromText(rawText: string): Partial<UserPreferences> {
  const text = rawText.toLowerCase().trim();
  const extracted: Partial<UserPreferences> = {
    rawPrompt: rawText,
    answeredDimensions: []
  };

  // 1. Detect Need
  if (/wedding|shaadi|marriage|sangeet|reception|mehendi|haldi|bridal|groom|baraat/i.test(text)) {
    extracted.need = 'Wedding';
    extracted.answeredDimensions?.push('NEED');
  } else if (/party|night out|club|cocktail|gala|celebration|birthday/i.test(text)) {
    extracted.need = 'Party';
    extracted.answeredDimensions?.push('NEED');
  } else if (/work|office|meeting|formal|interview|corporate|business/i.test(text)) {
    extracted.need = 'Work';
    extracted.answeredDimensions?.push('NEED');
  } else if (/vacation|holiday|trip|beach|resort|travel|summer trip|brunch/i.test(text)) {
    extracted.need = 'Vacation';
    extracted.answeredDimensions?.push('NEED');
  } else if (/casual|daily|everyday|chill|weekend|hangout/i.test(text)) {
    extracted.need = 'Casual';
    extracted.answeredDimensions?.push('NEED');
  }

  // 2. Detect Look & Style
  if (/elegant|sophisticated|classy|graceful|luxury|regal/i.test(text)) {
    extracted.look = 'Elegant';
    extracted.answeredDimensions?.push('STYLE_LOOK');
  } else if (/minimal|simple|clean|sober|subtle|understated|basic/i.test(text)) {
    extracted.look = 'Minimal';
    extracted.answeredDimensions?.push('STYLE_LOOK');
  } else if (/trendy|streetwear|bold|modern|fashionable|stylish|cool/i.test(text)) {
    extracted.look = 'Trendy';
    extracted.answeredDimensions?.push('STYLE_LOOK');
  } else if (/statement|flashy|glamorous|showstopper/i.test(text)) {
    extracted.look = 'Statement';
    extracted.answeredDimensions?.push('STYLE_LOOK');
  }

  // 3. Detect Product Type
  if (/traditional|ethnic|desi|indian|lehenga|saree|kurta|anarkali/i.test(text)) {
    extracted.productType = 'Ethnic';
    extracted.answeredDimensions?.push('STYLE_TYPE');
  } else if (/western|dress|gown|blazer|shirt|trousers|jeans/i.test(text)) {
    extracted.productType = 'Western';
    extracted.answeredDimensions?.push('STYLE_TYPE');
  } else if (/fusion|indo-western/i.test(text)) {
    extracted.productType = 'Fusion';
    extracted.answeredDimensions?.push('STYLE_TYPE');
  }

  // 4. Detect Budget
  const underMatch = text.match(/under\s*(?:rs\.?|inr|₹)?\s*(\d+)(?:k)?/i) ||
                     text.match(/below\s*(?:rs\.?|inr|₹)?\s*(\d+)(?:k)?/i) ||
                     text.match(/within\s*(?:rs\.?|inr|₹)?\s*(\d+)(?:k)?/i) ||
                     text.match(/less than\s*(?:rs\.?|inr|₹)?\s*(\d+)(?:k)?/i);

  if (underMatch) {
    let amount = parseInt(underMatch[1], 10);
    if (underMatch[0].toLowerCase().includes('k') && amount < 100) {
      amount *= 1000;
    }
    extracted.budgetMax = amount;
    extracted.budgetLabel = `Under ₹${amount.toLocaleString('en-IN')}`;
    extracted.answeredDimensions?.push('BUDGET');
  } else if (/cheap|budget-friendly|affordable|low price/i.test(text)) {
    extracted.budgetMax = 2500;
    extracted.budgetLabel = 'Under ₹2,500';
    extracted.answeredDimensions?.push('BUDGET');
  }

  return extracted;
}
