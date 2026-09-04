import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const WishlistScreen: React.FC = () => {
  const { 
    wishlistProducts, 
    removeFromWishlist, 
    openPdp, 
    addToBag, 
    startAiFlow,
    setCurrentView 
  } = useApp();

  const [sortBy, setSortBy] = useState<string>('latest');

  // Sorting
  const sortedProducts = [...wishlistProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
    return 0; // default latest
  });

  return (
    <div className="w-full">
      {/* Header & Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="font-headline-lg text-2xl md:text-3xl text-on-surface font-black">
            My Wishlist
          </h1>
          <p className="font-body-lg text-secondary mt-0.5">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="relative w-full md:w-auto">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-52 h-10 pl-4 pr-10 rounded border border-surface-variant bg-surface-container-lowest focus:outline-none focus:border-primary font-body-sm text-sm appearance-none cursor-pointer text-on-surface"
          >
            <option value="latest">Sort by: Latest Added</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Discount</option>
          </select>
          <span className="material-symbols-outlined absolute right-3 top-2.5 text-secondary pointer-events-none text-[18px]">
            expand_more
          </span>
        </div>
      </div>

      {/* AI Marquee Banner */}
      <div className="ai-glass rounded-xl p-6 md:p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-tertiary-fixed-dim relative overflow-hidden shadow-sm">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-tertiary opacity-5 pointer-events-none"></div>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[14px] filled">auto_awesome</span>
            AI Wishlist Prioritization
          </div>
          <h2 className="font-title-md text-xl md:text-2xl ai-gradient-text font-bold flex items-center gap-2">
            Make your wishlist work for you
          </h2>
          <p className="font-body-lg text-on-surface-variant mt-1 text-sm md:text-base">
            Tell us what you're shopping for and we'll find the most relevant items from your wishlist.
          </p>
        </div>

        <button 
          onClick={startAiFlow}
          className="relative z-10 ai-gradient-bg text-on-primary font-label-bold text-sm px-6 py-3.5 rounded hover:opacity-95 transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-tertiary/20 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          <span>Prioritise Wishlist</span>
        </button>
      </div>

      {/* Empty State */}
      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-lowest rounded-xl border border-surface-variant p-8">
          <span className="material-symbols-outlined text-secondary text-6xl mb-4">favorite_border</span>
          <h3 className="font-headline-lg text-xl font-bold mb-2">Your wishlist is empty</h3>
          <p className="text-secondary text-sm mb-6">Explore our catalog and add items you love to your wishlist.</p>
          <button 
            onClick={() => setCurrentView('home')}
            className="bg-primary text-white font-bold py-3 px-8 rounded hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        /* Product Grid (4 Columns) */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {sortedProducts.map((product) => (
            <div 
              key={product.id}
              className="product-card group relative bg-surface-container-lowest rounded border border-surface-variant overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col"
            >
              {/* Image Box */}
              <div 
                onClick={() => openPdp(product)}
                className="relative aspect-[3/4] bg-bg-off-white overflow-hidden cursor-pointer"
              >
                <img 
                  src={product.images[0]} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />

                {/* Remove button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(product.id);
                  }}
                  title="Remove from wishlist"
                  className="absolute top-2 right-2 p-1.5 bg-surface-container-lowest/80 backdrop-blur-sm rounded-full text-secondary hover:text-error hover:bg-white transition-colors flex items-center justify-center shadow-sm z-10"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>

                {/* Move to Bag Hover Overlay */}
                <div className="hover-action absolute bottom-0 left-0 w-full p-2.5 bg-gradient-to-t from-black/60 to-transparent">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToBag(product, product.sizes[0] || 'M');
                    }}
                    className="w-full bg-primary text-on-primary font-label-bold text-[12px] py-2.5 rounded text-center shadow-md hover:bg-primary-container transition-colors"
                  >
                    MOVE TO BAG
                  </button>
                </div>
              </div>

              {/* Card Meta */}
              <div 
                onClick={() => openPdp(product)}
                className="p-3 flex flex-col flex-grow justify-between cursor-pointer"
              >
                <div>
                  <h3 className="font-title-md text-[14px] font-bold leading-tight text-on-surface truncate">
                    {product.brand}
                  </h3>
                  <p className="font-body-sm text-xs text-secondary truncate mt-0.5">
                    {product.title}
                  </p>
                </div>

                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="font-price-main text-price-main text-on-surface font-bold">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="font-price-mrp text-xs text-mrp-strikethrough line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="font-label-bold text-[11px] text-primary-brand font-bold">
                    {product.discountPercentage}% OFF
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
