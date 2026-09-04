import React from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

export const BagDrawer: React.FC = () => {
  const { 
    cartItems, 
    showBagDrawer, 
    setShowBagDrawer, 
    removeFromBag, 
    updateBagQuantity, 
    openPdp,
    placeOrder,
    orderSuccess,
    setOrderSuccess,
    setCurrentView 
  } = useApp();

  if (!showBagDrawer) return null;

  const totalMrp = cartItems.reduce((acc, item) => acc + (item.product.originalPrice * item.quantity), 0);
  const totalSellingPrice = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalDiscount = totalMrp - totalSellingPrice;
  const convenienceFee = totalSellingPrice > 0 ? 99 : 0;
  const finalPayable = totalSellingPrice > 0 ? totalSellingPrice + convenienceFee : 0;

  const handleOrder = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    placeOrder();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={() => {
          setShowBagDrawer(false);
          setOrderSuccess(false);
        }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-surface-variant flex items-center justify-between bg-surface-container-lowest">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">shopping_bag</span>
            <h2 className="font-title-md text-lg font-bold text-on-surface">
              Shopping Bag ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </h2>
          </div>
          <button 
            onClick={() => {
              setShowBagDrawer(false);
              setOrderSuccess(false);
            }}
            className="p-1.5 rounded-full hover:bg-surface-variant text-secondary hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Order Success State */}
        {orderSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-success-green/10 text-success-green flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl filled">check_circle</span>
            </div>
            <h3 className="font-headline-lg text-2xl font-bold text-on-surface mb-2">Order Confirmed!</h3>
            <p className="text-secondary text-sm mb-6">
              Thank you for shopping with Myntra. Your order has been placed and will be delivered within 2-3 business days.
            </p>
            <button 
              onClick={() => {
                setShowBagDrawer(false);
                setOrderSuccess(false);
                setCurrentView('home');
              }}
              className="bg-primary text-white font-bold py-3 px-8 rounded shadow-md hover:opacity-90"
            >
              Continue Shopping
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Bag */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <span className="material-symbols-outlined text-secondary text-6xl mb-4">shopping_bag</span>
            <h3 className="font-title-md text-lg font-bold mb-2">Hey, it feels so light!</h3>
            <p className="text-secondary text-sm mb-6">There is nothing in your bag. Let's add some items.</p>
            <button 
              onClick={() => {
                setShowBagDrawer(false);
                setCurrentView('home');
              }}
              className="border-2 border-primary text-primary font-bold py-2.5 px-6 rounded hover:bg-primary/5"
            >
              Explore Products
            </button>
          </div>
        ) : (
          /* Bag Items List */
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {cartItems.map((item, idx) => (
              <div 
                key={`${item.product.id}-${item.selectedSize}-${idx}`}
                className="flex gap-4 p-3 rounded-lg border border-surface-variant bg-surface-container-lowest relative group"
              >
                {/* Product Thumbnail */}
                <div 
                  onClick={() => {
                    openPdp(item.product);
                    setShowBagDrawer(false);
                  }}
                  className="w-20 h-26 rounded bg-bg-off-white overflow-hidden shrink-0 cursor-pointer"
                >
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.title}
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start pr-6">
                      <h4 className="font-title-md text-sm font-bold text-on-surface truncate">
                        {item.product.brand}
                      </h4>
                    </div>
                    <p className="text-xs text-secondary truncate mt-0.5">
                      {item.product.title}
                    </p>

                    {/* Size & Quantity Control */}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="bg-surface-container-low px-2 py-0.5 rounded text-[11px] font-bold text-on-surface">
                        Size: {item.selectedSize}
                      </span>
                      <div className="flex items-center border border-surface-variant rounded">
                        <button 
                          onClick={() => updateBagQuantity(item.product.id, item.selectedSize, -1)}
                          className="px-2 py-0.5 text-xs text-secondary hover:text-primary hover:bg-surface-container-low"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateBagQuantity(item.product.id, item.selectedSize, 1)}
                          className="px-2 py-0.5 text-xs text-secondary hover:text-primary hover:bg-surface-container-low"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-bold text-sm text-on-surface">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-mrp-strikethrough line-through">
                      ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-success-green font-bold">
                      {item.product.discountPercentage}% OFF
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button 
                  onClick={() => removeFromBag(item.product.id, item.selectedSize)}
                  className="absolute top-2 right-2 text-secondary hover:text-error transition-colors p-1"
                  title="Remove"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            ))}

            {/* Price Details Summary */}
            <div className="border border-surface-variant rounded-lg p-4 bg-surface-container-low/50 space-y-2 mt-4 text-xs">
              <h5 className="font-label-bold uppercase text-secondary tracking-wider font-bold mb-2">Price Details</h5>
              <div className="flex justify-between text-secondary">
                <span>Total MRP</span>
                <span>₹{totalMrp.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-success-green font-medium">
                <span>Discount on MRP</span>
                <span>-₹{totalDiscount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Convenience Fee</span>
                <span>₹{convenienceFee}</span>
              </div>
              <div className="border-t border-surface-variant pt-2 flex justify-between font-bold text-sm text-on-surface">
                <span>Total Amount</span>
                <span className="text-primary">₹{finalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Checkout CTA */}
        {!orderSuccess && cartItems.length > 0 && (
          <div className="p-4 md:p-6 border-t border-surface-variant bg-surface-container-lowest">
            <button 
              onClick={handleOrder}
              className="w-full bg-primary text-white font-label-bold text-sm py-4 rounded shadow-lg shadow-primary/20 hover:bg-primary-container transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-95"
            >
              <span>PLACE ORDER • ₹{finalPayable.toLocaleString('en-IN')}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
