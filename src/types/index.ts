export type Category = 'Men' | 'Women' | 'Kids' | 'Home & Living' | 'Beauty' | 'Studio';

export interface ProductAttributes {
  occasions: ('Wedding' | 'Cocktail' | 'Party' | 'Work' | 'Vacation' | 'Casual' | 'Daily Wear' | 'Festive' | 'Formal')[];
  styles: ('Traditional' | 'Elegant' | 'Minimal' | 'Trendy' | 'Casual' | 'Chic' | 'Boho' | 'Classic' | 'Glamorous')[];
  color: string;
  colorFamily: 'Pastel' | 'Dark' | 'Bright' | 'Neutral' | 'Metallic';
  fabric: string;
  fit?: 'Slim' | 'Regular' | 'Relaxed' | 'Oversized' | 'Tailored' | 'Straight';
  formality?: 'Ultra Formal' | 'Semi-Formal' | 'Casual' | 'Smart Casual';
  isFlashy?: boolean;
  tags: string[];
}

export interface Product {
  id: string;
  brand: string;
  title: string;
  description: string;
  category: Category;
  subCategory: string; // e.g. "Ethnic Wear", "Western Wear", "Dresses", "Footwear", "T-Shirts", "Shirts", "Kurtas", "Accessories"
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  ratingCount: number;
  images: string[];
  sizes: string[];
  inStock: boolean;
  attributes: ProductAttributes;
}

export interface UserIntent {
  rawPrompt: string;
  occasion?: string;
  style?: string;
  budgetMax?: number;
  budgetLabel?: string;
  category?: string;
  colorPreference?: string;
  preferredTags?: string[];
  negativeTags?: string[];
  activeRefinementFilters?: {
    onlyCategory?: string;
    maxPrice?: number;
    tone?: string;
    styleModifier?: string;
  };
}

export interface MatchScoreResult {
  productId: string;
  product: Product;
  matchScore: number; // 0 - 100
  rank: number;
  matchReasons: string[];
  matchHighlights: {
    budgetMatch: boolean;
    occasionMatch: boolean;
    styleMatch: boolean;
    categoryMatch: boolean;
    colorMatch: boolean;
  };
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export type AppView = 
  | 'home' 
  | 'wishlist' 
  | 'ai-intent' 
  | 'ai-question-1' // Occasion
  | 'ai-question-2' // Style
  | 'ai-question-3' // Budget
  | 'ai-question-4' // Category
  | 'ai-loading'
  | 'best-matches'
  | 'prioritized-grid'
  | 'pdp';
