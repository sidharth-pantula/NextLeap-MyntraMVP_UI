import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  UserPreferences, 
  MatchScoreResult, 
  CartItem, 
  AppView, 
  AdaptiveQuestion,
  QuestionDimension 
} from '../types';
import { MOCK_PRODUCTS, INITIAL_WISHLIST_IDS } from '../data/mockProducts';
import { parseIntentFromText } from '../engine/intentParser';
import { calculateWishlistScores, getFilteredCandidates } from '../engine/scorer';
import { determineNextQuestion } from '../engine/adaptiveEngine';
import { applyRefinement } from '../engine/refinementHandler';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  products: Product[];
  wishlistIds: string[];
  wishlistProducts: Product[];
  candidates: Product[];
  cartItems: CartItem[];
  selectedProduct: Product;
  userPrefs: UserPreferences;
  currentQuestion: AdaptiveQuestion | null;
  scores: MatchScoreResult[];
  isAiPrioritized: boolean;
  toastMessage: string | null;
  showBagDrawer: boolean;
  setShowBagDrawer: (show: boolean) => void;
  orderSuccess: boolean;
  setOrderSuccess: (val: boolean) => void;
  
  // Actions
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  addToBag: (product: Product, size: string) => void;
  removeFromBag: (productId: string, size: string) => void;
  updateBagQuantity: (productId: string, size: string, delta: number) => void;
  openPdp: (product: Product) => void;
  
  // AI Adaptive Actions
  startAiFlow: () => void;
  submitIntent: (promptText: string) => void;
  answerQuestion: (dimension: QuestionDimension, value: any) => void;
  skipQuestion: (dimension: QuestionDimension) => void;
  runAiMatching: (overridePrefs?: UserPreferences) => void;
  askAiRefine: (refinementText: string) => void;
  showToast: (msg: string) => void;
  resetAiPrioritization: () => void;
  placeOrder: () => void;
}

const defaultPreferences: UserPreferences = {
  rawPrompt: '',
  need: undefined,
  look: undefined,
  productType: undefined,
  fabric: undefined,
  fit: undefined,
  preference: undefined,
  budgetMax: undefined,
  budgetMin: undefined,
  budgetLabel: undefined,
  tradeOff: undefined,
  answeredDimensions: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [wishlistIds, setWishlistIds] = useState<string[]>(INITIAL_WISHLIST_IDS);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: MOCK_PRODUCTS[1], // Sera Gown
      selectedSize: 'M',
      quantity: 1,
    }
  ]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(MOCK_PRODUCTS[0]);
  const [userPrefs, setUserPrefs] = useState<UserPreferences>(defaultPreferences);
  const [currentQuestion, setCurrentQuestion] = useState<AdaptiveQuestion | null>(null);
  const [scores, setScores] = useState<MatchScoreResult[]>([]);
  const [isAiPrioritized, setIsAiPrioritized] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showBagDrawer, setShowBagDrawer] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  // Active saved wishlist items
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  // Current dynamic candidates based on user preferences
  const candidates = getFilteredCandidates(wishlistProducts, userPrefs);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const addToWishlist = (productId: string) => {
    if (!wishlistIds.includes(productId)) {
      setWishlistIds((prev) => [...prev, productId]);
      showToast('Added to your Wishlist');
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
    showToast('Removed from Wishlist');
  };

  const toggleWishlist = (productId: string) => {
    if (wishlistIds.includes(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const addToBag = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, selectedSize: size, quantity: 1 }];
    });
    showToast(`Added ${product.brand} (${size}) to Shopping Bag`);
    setShowBagDrawer(true);
  };

  const removeFromBag = (productId: string, size: string) => {
    setCartItems((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedSize === size)));
  };

  const updateBagQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const openPdp = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const advanceAdaptiveQuestion = (updatedPrefs: UserPreferences) => {
    const activeCandidates = getFilteredCandidates(wishlistProducts, updatedPrefs);
    const { question, shouldStopEarly } = determineNextQuestion(
      activeCandidates,
      updatedPrefs,
      wishlistProducts.length
    );

    if (shouldStopEarly || !question) {
      runAiMatching(updatedPrefs);
    } else {
      setCurrentQuestion(question);
      setCurrentView('ai-adaptive-survey');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Directly start the adaptive questioning survey with Q1
  const startAiFlow = () => {
    setUserPrefs(defaultPreferences);
    advanceAdaptiveQuestion(defaultPreferences);
  };

  const submitIntent = (promptText: string) => {
    const parsed = parseIntentFromText(promptText);
    const updated: UserPreferences = { 
      ...defaultPreferences, 
      ...parsed, 
      rawPrompt: promptText,
      answeredDimensions: parsed.answeredDimensions || []
    };
    setUserPrefs(updated);
    advanceAdaptiveQuestion(updated);
  };

  const answerQuestion = (dimension: QuestionDimension, value: any) => {
    const updated: UserPreferences = {
      ...userPrefs,
      answeredDimensions: Array.from(new Set([...userPrefs.answeredDimensions, dimension]))
    };

    if (dimension === 'NEED') {
      updated.need = value;
    } else if (dimension === 'STYLE_LOOK') {
      updated.look = value;
    } else if (dimension === 'STYLE_TYPE') {
      updated.productType = value;
    } else if (dimension === 'STYLE_FABRIC') {
      updated.fabric = value;
    } else if (dimension === 'STYLE_FIT') {
      updated.fit = value;
    } else if (dimension === 'PREFERENCE') {
      updated.preference = value;
    } else if (dimension === 'BUDGET') {
      if (value) {
        updated.budgetMax = value.max;
        updated.budgetMin = value.min;
        updated.budgetLabel = value.label;
      }
    } else if (dimension === 'ADAPTIVE_TRADE_OFF') {
      updated.tradeOff = value;
    }

    setUserPrefs(updated);
    advanceAdaptiveQuestion(updated);
  };

  const skipQuestion = (dimension: QuestionDimension) => {
    const updated: UserPreferences = {
      ...userPrefs,
      answeredDimensions: Array.from(new Set([...userPrefs.answeredDimensions, dimension]))
    };
    setUserPrefs(updated);
    advanceAdaptiveQuestion(updated);
  };

  const runAiMatching = (overridePrefs?: UserPreferences) => {
    const targetPrefs = overridePrefs || userPrefs;
    setCurrentView('ai-loading');
    setTimeout(() => {
      const activeWishlist = products.filter((p) => wishlistIds.includes(p.id));
      const calculatedScores = calculateWishlistScores(activeWishlist, targetPrefs);
      setScores(calculatedScores);
      setIsAiPrioritized(true);
      setCurrentView('best-matches');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const askAiRefine = (refinementText: string) => {
    const updated = applyRefinement(userPrefs, refinementText);
    setUserPrefs(updated);
    
    // Re-calculate scores dynamically
    const activeWishlist = products.filter((p) => wishlistIds.includes(p.id));
    const newScores = calculateWishlistScores(activeWishlist, updated);
    setScores(newScores);
    showToast(`Prioritization updated for "${refinementText}"`);
  };

  const resetAiPrioritization = () => {
    setIsAiPrioritized(false);
    setUserPrefs(defaultPreferences);
    setScores([]);
  };

  const placeOrder = () => {
    setOrderSuccess(true);
    setCartItems([]);
    showToast('Order placed successfully! 🎉');
  };

  // Keep scores updated if items are modified
  useEffect(() => {
    if (isAiPrioritized) {
      const activeWishlist = products.filter((p) => wishlistIds.includes(p.id));
      const calculatedScores = calculateWishlistScores(activeWishlist, userPrefs);
      setScores(calculatedScores);
    }
  }, [wishlistIds]);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        products,
        wishlistIds,
        wishlistProducts,
        candidates,
        cartItems,
        selectedProduct,
        userPrefs,
        currentQuestion,
        scores,
        isAiPrioritized,
        toastMessage,
        showBagDrawer,
        setShowBagDrawer,
        orderSuccess,
        setOrderSuccess,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        addToBag,
        removeFromBag,
        updateBagQuantity,
        openPdp,
        startAiFlow,
        submitIntent,
        answerQuestion,
        skipQuestion,
        runAiMatching,
        askAiRefine,
        showToast,
        resetAiPrioritization,
        placeOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
