import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, UserIntent, MatchScoreResult, CartItem, AppView } from '../types';
import { MOCK_PRODUCTS, INITIAL_WISHLIST_IDS } from '../data/mockProducts';
import { parseIntentFromText } from '../engine/intentParser';
import { calculateWishlistScores } from '../engine/scorer';
import { applyRefinement } from '../engine/refinementHandler';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  products: Product[];
  wishlistIds: string[];
  wishlistProducts: Product[];
  cartItems: CartItem[];
  selectedProduct: Product;
  userIntent: UserIntent;
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
  
  // AI Actions
  startAiFlow: () => void;
  submitIntent: (promptText: string) => void;
  updateIntentField: (field: keyof UserIntent, value: any) => void;
  runAiMatching: () => void;
  askAiRefine: (refinementText: string) => void;
  showToast: (msg: string) => void;
  resetAiPrioritization: () => void;
  placeOrder: () => void;
}

const defaultIntent: UserIntent = {
  rawPrompt: '',
  occasion: undefined,
  style: undefined,
  budgetMax: undefined,
  budgetLabel: undefined,
  category: undefined,
  colorPreference: undefined,
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
  const [userIntent, setUserIntent] = useState<UserIntent>(defaultIntent);
  const [scores, setScores] = useState<MatchScoreResult[]>([]);
  const [isAiPrioritized, setIsAiPrioritized] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showBagDrawer, setShowBagDrawer] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  // Derived saved wishlist items
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

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

  const startAiFlow = () => {
    setUserIntent(defaultIntent);
    setCurrentView('ai-intent');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitIntent = (promptText: string) => {
    const parsed = parseIntentFromText(promptText);
    const updated = { ...defaultIntent, ...parsed, rawPrompt: promptText };
    setUserIntent(updated);

    // Always start at Question 1 so the user goes through all 4 questions
    setCurrentView('ai-question-1');
  };

  const updateIntentField = (field: keyof UserIntent, value: any) => {
    setUserIntent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const runAiMatching = () => {
    setCurrentView('ai-loading');
    setTimeout(() => {
      // Calculate scores on user's current saved wishlist products
      const activeWishlist = products.filter((p) => wishlistIds.includes(p.id));
      const calculatedScores = calculateWishlistScores(activeWishlist, userIntent);
      setScores(calculatedScores);
      setIsAiPrioritized(true);
      setCurrentView('best-matches');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  };

  const askAiRefine = (refinementText: string) => {
    const updated = applyRefinement(userIntent, refinementText);
    setUserIntent(updated);
    
    // Re-calculate scores dynamically
    const activeWishlist = products.filter((p) => wishlistIds.includes(p.id));
    const newScores = calculateWishlistScores(activeWishlist, updated);
    setScores(newScores);
    showToast(`Prioritization updated for "${refinementText}"`);
  };

  const resetAiPrioritization = () => {
    setIsAiPrioritized(false);
    setUserIntent(defaultIntent);
    setScores([]);
  };

  const placeOrder = () => {
    setOrderSuccess(true);
    setCartItems([]);
    showToast('Order placed successfully! 🎉');
  };

  // Keep scores updated if items are deleted or added to wishlist
  useEffect(() => {
    if (isAiPrioritized) {
      const activeWishlist = products.filter((p) => wishlistIds.includes(p.id));
      const calculatedScores = calculateWishlistScores(activeWishlist, userIntent);
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
        cartItems,
        selectedProduct,
        userIntent,
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
        updateIntentField,
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
