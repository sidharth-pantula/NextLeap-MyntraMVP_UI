import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const PdpScreen: React.FC = () => {
  const { 
    selectedProduct, 
    addToBag, 
    wishlistIds, 
    toggleWishlist, 
    setCurrentView,
    userIntent,
    scores 
  } = useApp();

  const [selectedSize, setSelectedSize] = useState<string>(
    selectedProduct.sizes[0] || 'M'
  );
  const [pincode, setPincode] = useState<string>('560001');
  const [deliveryChecked, setDeliveryChecked] = useState<boolean>(false);

  const isWishlisted = wishlistIds.includes(selectedProduct.id);

  // Find match score if AI matched
  const currentMatch = scores.find((s) => s.productId === selectedProduct.id);

  return (
    <div className="w-full">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-secondary mb-6">
        <button onClick={() => setCurrentView('home')} className="hover:text-primary">Home</button>
        <span>/</span>
        <button onClick={() => setCurrentView('home')} className="hover:text-primary">{selectedProduct.category}</button>
        <span>/</span>
        <span className="text-on-surface font-medium truncate max-w-[200px]">{selectedProduct.brand}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Side: Product Image Gallery (2x2 Grid) */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {selectedProduct.images.map((imgUrl, idx) => (
            <div 
              key={idx}
              className="aspect-[3/4] rounded-lg overflow-hidden bg-bg-off-white border border-surface-variant group relative"
            >
              <img 
                src={imgUrl} 
                alt={`${selectedProduct.title} view ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
              />
            </div>
          ))}
          {/* If single image, repeat view variations */}
          {selectedProduct.images.length === 1 && (
            <>
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-bg-off-white border border-surface-variant group relative">
                <img 
                  src={selectedProduct.images[0]} 
                  alt={`${selectedProduct.title} detail`}
                  className="w-full h-full object-cover scale-125 object-top group-hover:scale-130 transition-transform duration-500 cursor-zoom-in"
                />
              </div>
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-bg-off-white border border-surface-variant group relative hidden sm:block">
                <img 
                  src={selectedProduct.images[0]} 
                  alt={`${selectedProduct.title} closeup`}
                  className="w-full h-full object-cover scale-150 object-center group-hover:scale-155 transition-transform duration-500 cursor-zoom-in"
                />
              </div>
            </>
          )}
        </div>

        {/* Right Side: Product Details & Sticky Buy Box */}
        <div className="md:col-span-5 flex flex-col gap-6 sticky top-24 self-start">
          {/* Header Info */}
          <div className="border-b border-surface-variant pb-6">
            <h1 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface mb-1">
              {selectedProduct.brand}
            </h1>
            <h2 className="font-title-md text-base md:text-lg text-secondary font-normal mb-4">
              {selectedProduct.title}
            </h2>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1 bg-success-green text-white px-2 py-0.5 rounded text-xs font-bold shadow-sm">
                <span>{selectedProduct.rating}</span>
                <span className="material-symbols-outlined filled text-[13px]">star</span>
              </div>
              <span className="text-body-sm text-secondary">
                | {selectedProduct.ratingCount.toLocaleString('en-IN')} Verified Ratings
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="border-b border-surface-variant pb-6">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
                ₹{selectedProduct.price.toLocaleString('en-IN')}
              </span>
              <span className="font-price-mrp text-base text-mrp-strikethrough line-through">
                MRP ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="font-label-bold text-base text-[#FF905A] font-bold">
                ({selectedProduct.discountPercentage}% OFF)
              </span>
            </div>
            <p className="text-xs text-success-green font-bold">inclusive of all taxes</p>
          </div>

          {/* AI Context Card (If navigated from AI flow or matches available) */}
          <div className="relative overflow-hidden rounded-xl border border-tertiary-fixed-dim bg-surface-container-lowest p-5 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-ai-gradient-start/5 to-ai-gradient-end/5 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-ai-gradient-start filled text-[20px]">
                    auto_awesome
                  </span>
                  <h3 className="font-title-md text-sm font-bold text-on-surface">
                    Why this matches your style
                  </h3>
                </div>
                {currentMatch && (
                  <span className="bg-gradient-to-r from-ai-gradient-start to-ai-gradient-end text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {currentMatch.matchScore}% Match
                  </span>
                )}
              </div>

              <ul className="space-y-2">
                {currentMatch && currentMatch.matchReasons.length > 0 ? (
                  currentMatch.matchReasons.map((reason, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-success-green text-[16px] mt-0.5 shrink-0">
                        check_circle
                      </span>
                      <span>{reason}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-ai-gradient-start text-[16px] mt-0.5 shrink-0">
                        check_circle
                      </span>
                      <span>
                        Tailored for {selectedProduct.attributes.occasions.join(' & ')} occasions with {selectedProduct.attributes.styles.join(', ')} aesthetic.
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-ai-gradient-start text-[16px] mt-0.5 shrink-0">
                        check_circle
                      </span>
                      <span>
                        Crafted from premium {selectedProduct.attributes.fabric} fabric in {selectedProduct.attributes.color} ({selectedProduct.attributes.colorFamily} tone).
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Size Selection */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h3 className="font-label-bold text-xs font-bold text-on-surface tracking-wider uppercase">
                Select Size
              </h3>
              <button className="font-label-bold text-xs text-primary font-bold hover:underline">
                SIZE CHART &gt;
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {selectedProduct.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full font-label-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-2 border-primary text-primary font-bold bg-primary/5 scale-105 shadow-sm'
                        : 'border border-surface-variant text-on-surface hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <button 
              onClick={() => addToBag(selectedProduct, selectedSize)}
              className="flex-1 bg-primary-brand text-on-primary font-label-bold text-sm py-4 rounded flex items-center justify-center gap-2 hover:bg-[#ED3A64] transition-all cursor-pointer shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span>ADD TO BAG</span>
            </button>

            <button 
              onClick={() => toggleWishlist(selectedProduct.id)}
              className={`px-5 rounded border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isWishlisted
                  ? 'border-primary bg-primary/10 text-primary font-bold'
                  : 'border-surface-variant text-on-surface hover:border-primary hover:text-primary'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isWishlisted ? 'filled text-primary' : ''}`}>
                favorite
              </span>
              <span className="font-label-bold text-xs">{isWishlisted ? 'WISHLISTED' : 'WISHLIST'}</span>
            </button>
          </div>

          {/* Delivery & Services */}
          <div className="border-t border-surface-variant pt-6 flex flex-col gap-3">
            <h3 className="font-label-bold text-xs font-bold text-on-surface tracking-wider uppercase">
              Delivery Options
            </h3>
            <div className="flex items-center gap-2">
              <input 
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Pincode"
                className="border border-surface-variant rounded px-3 py-2 text-sm w-44 focus:outline-none focus:border-primary"
              />
              <button 
                onClick={() => setDeliveryChecked(true)}
                className="text-primary text-xs font-bold uppercase hover:underline px-2 py-2"
              >
                Check
              </button>
            </div>
            {deliveryChecked && (
              <p className="text-xs text-success-green flex items-center gap-1 mt-1 font-medium">
                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                Get it by Tomorrow, Express Delivery available
              </p>
            )}

            <div className="flex flex-col gap-2 mt-4 text-xs text-secondary">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>100% Original Products</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">currency_rupee</span>
                <span>Pay on delivery available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">replay</span>
                <span>Easy 14 days returns and exchanges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
