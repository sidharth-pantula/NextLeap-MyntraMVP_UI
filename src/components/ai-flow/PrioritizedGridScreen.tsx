import React from 'react';
import { useApp } from '../../context/AppContext';
import { AskAiWidget } from './AskAiWidget';

export const PrioritizedGridScreen: React.FC = () => {
  const { 
    scores, 
    userIntent, 
    removeFromWishlist, 
    openPdp, 
    addToBag, 
    setCurrentView,
    resetAiPrioritization,
    startAiFlow 
  } = useApp();

  return (
    <div className="w-full pb-36">
      {/* Header & Prioritization Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-headline-lg text-2xl md:text-3xl text-on-surface font-black">
              AI Prioritized Wishlist
            </h1>
            <span className="ai-gradient-bg text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {scores.length} Items Reordered
            </span>
          </div>
          <p className="font-body-lg text-secondary text-sm mt-1">
            Your saved wishlist ranked dynamically by match score for your current shopping session.
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-3 flex-wrap">
          <button 
            onClick={() => setCurrentView('best-matches')}
            className="border border-tertiary text-tertiary bg-tertiary-fixed/30 hover:bg-tertiary-fixed font-bold text-xs md:text-sm px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] filled">auto_awesome</span>
            <span>Top 5 Bento View</span>
          </button>

          <button 
            onClick={() => {
              resetAiPrioritization();
              setCurrentView('wishlist');
            }}
            className="text-secondary hover:text-error text-xs font-bold px-3 py-2 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>Reset AI</span>
          </button>
        </div>
      </div>

      {/* Active AI Constraints Banner / Filter Chips */}
      <div className="ai-glass rounded-xl p-4 md:p-5 mb-8 border border-tertiary-fixed-dim flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider mr-1">
            Active Intent:
          </span>
          {userIntent.occasion && (
            <span className="bg-white border border-surface-variant text-on-surface text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
              <span>Occasion:</span>
              <span className="text-primary">{userIntent.occasion}</span>
            </span>
          )}
          {userIntent.style && (
            <span className="bg-white border border-surface-variant text-on-surface text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
              <span>Style:</span>
              <span className="text-tertiary">{userIntent.style}</span>
            </span>
          )}
          {userIntent.budgetMax && (
            <span className="bg-white border border-surface-variant text-on-surface text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
              <span>Budget:</span>
              <span className="text-success-green">{userIntent.budgetLabel || `Under ₹${userIntent.budgetMax.toLocaleString('en-IN')}`}</span>
            </span>
          )}
          {userIntent.category && userIntent.category !== 'All Categories' && (
            <span className="bg-white border border-surface-variant text-on-surface text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
              <span>Category:</span>
              <span className="text-secondary">{userIntent.category}</span>
            </span>
          )}
          {userIntent.activeRefinementFilters?.styleModifier && (
            <span className="bg-tertiary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
              <span>Refinement:</span>
              <span>{userIntent.activeRefinementFilters.styleModifier.replace('_', ' ')}</span>
            </span>
          )}
        </div>

        <button 
          onClick={startAiFlow}
          className="text-xs text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">edit</span>
          <span>Modify Preferences</span>
        </button>
      </div>

      {/* 4-Column Prioritized Wishlist Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {scores.map((item) => {
          const isHighMatch = item.matchScore >= 90;
          const isMidMatch = item.matchScore >= 80;

          return (
            <div 
              key={item.productId}
              className="product-card group relative bg-surface-container-lowest rounded-xl border border-surface-variant overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col"
            >
              {/* Product Image */}
              <div 
                onClick={() => openPdp(item.product)}
                className="relative aspect-[3/4] bg-bg-off-white overflow-hidden cursor-pointer"
              >
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />

                {/* Score Tag */}
                <div className={`absolute top-2 left-2 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-md ${
                  isHighMatch
                    ? 'bg-gradient-to-r from-ai-gradient-start to-ai-gradient-end text-white'
                    : isMidMatch
                    ? 'bg-tertiary text-white'
                    : 'bg-surface-dim text-secondary'
                }`}>
                  <span className="material-symbols-outlined text-[13px] filled">auto_awesome</span>
                  <span>#{item.rank} &bull; {item.matchScore}%</span>
                </div>

                {/* Remove button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(item.productId);
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
                      addToBag(item.product, item.product.sizes[0] || 'M');
                    }}
                    className="w-full bg-primary text-on-primary font-label-bold text-[12px] py-2.5 rounded text-center shadow-md hover:bg-primary-container transition-colors"
                  >
                    MOVE TO BAG
                  </button>
                </div>
              </div>

              {/* Card Meta & Highlights */}
              <div 
                onClick={() => openPdp(item.product)}
                className="p-3.5 flex flex-col flex-grow justify-between cursor-pointer"
              >
                <div>
                  <h3 className="font-title-md text-[14px] font-bold leading-tight text-on-surface truncate">
                    {item.product.brand}
                  </h3>
                  <p className="font-body-sm text-xs text-secondary truncate mt-0.5">
                    {item.product.title}
                  </p>

                  <div className="flex items-baseline gap-1.5 mt-2 mb-2.5">
                    <span className="font-price-main text-price-main text-on-surface font-bold">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="font-price-mrp text-xs text-mrp-strikethrough line-through">
                      ₹{item.product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="font-label-bold text-[11px] text-primary-brand font-bold">
                      {item.product.discountPercentage}% OFF
                    </span>
                  </div>

                  {/* Concise Match Reason */}
                  {item.matchReasons.length > 0 && (
                    <div className="bg-surface-container-low rounded p-2 text-[11px] text-on-surface-variant flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-success-green text-[14px] shrink-0">check</span>
                      <span className="truncate">{item.matchReasons[0]}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Ask AI Widget */}
      <AskAiWidget />
    </div>
  );
};
