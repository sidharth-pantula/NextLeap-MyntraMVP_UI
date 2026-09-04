export type Category = 'Men' | 'Women' | 'Kids' | 'Home & Living' | 'Beauty' | 'Studio';

export type ProductType = 'Ethnic' | 'Western' | 'Fusion';
export type LookStyle = 'Elegant' | 'Trendy' | 'Minimal' | 'Statement' | 'Casual' | 'Classic';
export type FabricType = 'Cotton' | 'Silk' | 'Satin' | 'Linen' | 'Georgette' | 'Velvet' | 'Denim' | 'Poly Viscose' | 'Chiffon';
export type FitType = 'Regular' | 'Slim' | 'Relaxed' | 'Oversized' | 'Tailored';
export type PrimaryNeed = 'Casual' | 'Party' | 'Wedding' | 'Vacation' | 'Work' | 'Everyday';
export type PrimaryPreference = 'Comfort' | 'Durability' | 'Quality' | 'Versatility' | 'Best Value';

export interface ProductSignals {
  viewsCount: number;
  addedDaysAgo: number;
  inCart: boolean;
  priceDropAmount?: number; // e.g., ₹1000 dropped
  priceDropPercentage?: number; // e.g., 20% drop
  popularityScore: number; // 0-100
  stockCount: number; // scarcity signal if <= 3
}

export interface ProductAttributes {
  occasions: ('Wedding' | 'Cocktail' | 'Party' | 'Work' | 'Vacation' | 'Casual' | 'Everyday' | 'Daily Wear' | 'Festive' | 'Formal')[];
  styles: LookStyle[];
  look: LookStyle;
  productType: ProductType;
  fabric: FabricType;
  fit: FitType;
  color: string;
  colorFamily: 'Pastel' | 'Dark' | 'Bright' | 'Neutral' | 'Metallic';
  formality?: 'Ultra Formal' | 'Semi-Formal' | 'Casual' | 'Smart Casual';
  isFlashy?: boolean;
  durabilityRating?: number; // 1-5
  comfortRating?: number; // 1-5
  versatilityRating?: number; // 1-5
  pattern?: 'Solid' | 'Floral' | 'Embroidered' | 'Printed' | 'Striped' | 'Geometric';
  tags: string[];
}

export interface Product {
  id: string;
  brand: string;
  title: string;
  description: string;
  category: Category;
  subCategory: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  ratingCount: number;
  images: string[];
  sizes: string[];
  inStock: boolean;
  attributes: ProductAttributes;
  signals: ProductSignals;
}

export interface UserPreferences {
  rawPrompt?: string;
  need?: PrimaryNeed | string;
  look?: LookStyle | string;
  productType?: ProductType | string;
  fabric?: FabricType | string;
  fit?: FitType | string;
  preference?: PrimaryPreference | string;
  budgetMax?: number;
  budgetMin?: number;
  budgetLabel?: string;
  tradeOff?: 'durability_over_price' | 'value_over_durability' | 'high_interest' | 'high_discount' | string;
  answeredDimensions: string[]; // ['NEED', 'STYLE_LOOK', etc.]
  activeRefinementFilters?: {
    onlyCategory?: string;
    maxPrice?: number;
    tone?: string;
    styleModifier?: string;
  };
}

export interface AdaptiveOption {
  id: string;
  label: string;
  desc?: string;
  value: any;
  matchingCount?: number;
  icon?: string;
  badge?: string;
}

export type QuestionDimension = 
  | 'NEED'
  | 'STYLE_LOOK'
  | 'STYLE_TYPE'
  | 'STYLE_FABRIC'
  | 'STYLE_FIT'
  | 'PREFERENCE'
  | 'BUDGET'
  | 'ADAPTIVE_TRADE_OFF';

export interface AdaptiveQuestion {
  id: string;
  dimension: QuestionDimension;
  questionNumber: number; // 1 to 5
  title: string;
  subtitle: string;
  aiRationale: string;
  options: AdaptiveOption[];
  canSkip: boolean;
}

export interface MatchScoreResult {
  productId: string;
  product: Product;
  matchScore: number; // 0 - 100
  rank: number;
  matchReasons: string[];
  signalBadges: string[];
  matchHighlights: {
    needMatch: boolean;
    styleMatch: boolean;
    preferenceMatch: boolean;
    budgetMatch: boolean;
    priceDropMatch: boolean;
    highEngagementMatch: boolean;
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
  | 'ai-adaptive-survey'
  | 'ai-loading'
  | 'best-matches'
  | 'prioritized-grid'
  | 'pdp';

