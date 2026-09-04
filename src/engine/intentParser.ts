import { UserIntent } from '../types';

export function parseIntentFromText(rawText: string): Partial<UserIntent> {
  const text = rawText.toLowerCase().trim();
  const extracted: Partial<UserIntent> = {
    rawPrompt: rawText,
  };

  // 1. Detect Occasion
  if (/wedding|shaadi|marriage|sangeet|reception|mehendi|haldi|bridal|groom|baraat/i.test(text)) {
    extracted.occasion = 'Wedding';
  } else if (/party|night out|club|cocktail|gala|celebration|birthday/i.test(text)) {
    extracted.occasion = 'Party';
  } else if (/work|office|meeting|formal|interview|corporate|business/i.test(text)) {
    extracted.occasion = 'Work';
  } else if (/vacation|holiday|trip|beach|resort|travel|summer trip|brunch/i.test(text)) {
    extracted.occasion = 'Vacation';
  } else if (/casual|daily|everyday|chill|weekend|hangout/i.test(text)) {
    extracted.occasion = 'Casual';
  }

  // 2. Detect Style
  if (/traditional|ethnic|desi|indian|cultural/i.test(text)) {
    extracted.style = 'Traditional';
  } else if (/elegant|sophisticated|classy|graceful|luxury|regal/i.test(text)) {
    extracted.style = 'Elegant';
  } else if (/minimal|simple|clean|sober|subtle|understated|basic/i.test(text)) {
    extracted.style = 'Minimal';
  } else if (/trendy|streetwear|bold|modern|fashionable|stylish|cool/i.test(text)) {
    extracted.style = 'Trendy';
  } else if (/boho|bohemian|relaxed|flowy/i.test(text)) {
    extracted.style = 'Boho';
  }

  // 3. Detect Budget
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
  } else if (/cheap|budget-friendly|affordable|low price|under 2k|under 2000/i.test(text)) {
    extracted.budgetMax = 2000;
    extracted.budgetLabel = 'Under ₹2,000';
  } else if (/5000\s*-\s*10000|5k\s*-\s*10k|5k to 10k|premium/i.test(text)) {
    extracted.budgetMax = 10000;
    extracted.budgetLabel = '₹5,000–₹10,000';
  } else if (/2000\s*-\s*5000|2k\s*-\s*5k|2k to 5k|mid range/i.test(text)) {
    extracted.budgetMax = 5000;
    extracted.budgetLabel = '₹2,000–₹5,000';
  } else if (/10000\+|10k\+|luxury|designer/i.test(text)) {
    extracted.budgetMax = 25000;
    extracted.budgetLabel = '₹10,000+';
  }

  // 4. Detect Category
  if (/lehenga|saree|sari|kurta|anarkali|sherwani|ethnic/i.test(text)) {
    extracted.category = 'Ethnic Wear';
  } else if (/dress|maxi|gown|gown dress|co-ord|blazer|shirt|trousers|western/i.test(text)) {
    extracted.category = 'Western Wear';
  } else if (/heels|shoes|stilettos|footwear|sandals/i.test(text)) {
    extracted.category = 'Footwear';
  } else if (/bag|handbag|potli|satchel|purse|accessories|jewelry/i.test(text)) {
    extracted.category = 'Accessories';
  }

  // 5. Detect Color/Tone
  if (/pastel|peach|blush|dusty rose|mint|lavender|pale/i.test(text)) {
    extracted.colorPreference = 'Pastel';
  } else if (/emerald|dark|black|navy|crimson|maroon|deep/i.test(text)) {
    extracted.colorPreference = 'Dark';
  } else if (/gold|silver|rose gold|champagne|metallic|shiny|sequin/i.test(text)) {
    extracted.colorPreference = 'Metallic';
  } else if (/white|ivory|cream|neutral|beige/i.test(text)) {
    extracted.colorPreference = 'Neutral';
  }

  return extracted;
}
