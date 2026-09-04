import React from 'react';
import { useApp } from '../../context/AppContext';
import { AskAiWidget } from './AskAiWidget';

export const BestMatchesScreen: React.FC = () => {
  const { 
    scores, 
    userIntent, 
    openPdp, 
    addToBag, 
    setCurrentView,
    resetAiPrioritization 
  } = useApp();

  const topMatch = scores[0];
  const nextMatches = scores.slice(1, 5);

  return (
    <div className="w-full pb-36">
      {/* Header Section */}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display-lg text-2xl md:text-4xl font-extrabold text-on-surface">
              Your Best Matches
            </h1>
            <span className="ai-gradient-bg text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Top 5
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed-variant px-3.5 py-1.5 rounded-full font-label-bold text-xs mt-3 border border-tertiary-fixed-dim shadow-sm">
            <span className="material-symbols-outlined text-[15px] filled">auto_awesome</span>
            <span>
              Ranked for: {userIntent.occasion || 'Occasion'} &bull; {userIntent.style || 'Style'} &bull; {userIntent.budgetLabel || `Under ₹${userIntent.budgetMax?.toLocaleString('en-IN') || '10,000'}`}
            </span>
          </div>
        </div>

        {/* View Switchers & Reset */}
        <div className="flex items-center gap-3 flex-wrap">
          <button 
            onClick={() => setCurrentView('prioritized-grid')}
            className="border border-surface-variant bg-surface-container-lowest hover:border-primary text-on-surface font-bold text-xs md:text-sm px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">grid_view</span>
            <span>View All Prioritized ({scores.length})</span>
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
      </header>

      {/* Bento Grid Layout for Matches */}
      {topMatch ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Featured Top Match (#1 Large Horizontal Card) */}
          <article className="col-span-12 bg-surface-container-lowest rounded-2xl border border-surface-variant overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-all duration-300 shadow-sm">
            {/* Image Box */}
            <div 
              onClick={() => openPdp(topMatch.product)}
              className="w-full md:w-5/12 relative flex-shrink-0 aspect-[4/3] md:aspect-[3/4] overflow-hidden bg-bg-off-white cursor-pointer"
            >
              <img 
                src={topMatch.product.images[0]} 
                alt={topMatch.product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Match Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-ai-gradient-start to-ai-gradient-end text-white px-3.5 py-1.5 rounded-full font-label-bold text-xs flex items-center gap-1.5 shadow-lg">
                <span className="material-symbols-outlined text-[16px] filled">auto_awesome</span>
                <span>#1 Best Match &bull; {topMatch.matchScore}% Match</span>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                      {topMatch.product.brand}
                    </span>
                    <h2 
                      onClick={() => openPdp(topMatch.product)}
                      className="font-headline-lg text-xl md:text-2xl font-bold text-on-surface hover:text-primary transition-colors cursor-pointer mt-0.5"
                    >
                      {topMatch.product.title}
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-1 bg-success-green/10 text-success-green px-2.5 py-1 rounded text-xs font-bold">
                    <span>{topMatch.product.rating}</span>
                    <span className="material-symbols-outlined filled text-[14px]">star</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2.5 mb-5 mt-2">
                  <span className="font-price-main text-2xl font-bold text-on-surface">
                    ₹{topMatch.product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="font-price-mrp text-sm text-mrp-strikethrough line-through">
                    ₹{topMatch.product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="font-label-bold text-sm text-primary-brand font-bold">
                    ({topMatch.product.discountPercentage}% OFF)
                  </span>
                </div>

                {/* Why It Matches Box */}
                <div className="bg-surface-container-low rounded-xl p-4 mb-6 border border-surface-variant/40">
                  <h3 className="font-label-bold text-xs uppercase tracking-wider text-secondary font-bold mb-2.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[16px] filled">psychology</span>
                    Why it's your #1 match:
                  </h3>
                  <ul className="space-y-2">
                    {topMatch.matchReasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-success-green text-[18px] shrink-0">
                          check_circle
                        </span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => addToBag(topMatch.product, topMatch.product.sizes[0] || 'M')}
                  className="flex-1 bg-primary text-white font-label-bold text-sm py-3.5 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-container transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  <span>ADD TO BAG</span>
                </button>
                <button 
                  onClick={() => openPdp(topMatch.product)}
                  className="px-6 py-3.5 rounded-lg border border-surface-variant text-on-surface font-label-bold text-sm hover:border-primary hover:text-primary transition-colors cursor-pointer"
                >
                  VIEW PRODUCT
                </button>
              </div>
            </div>
          </article>

          {/* Cards #2 to #5 */}
          {nextMatches.map((matchItem) => (
            <article 
              key={matchItem.productId}
              className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-3 bg-surface-container-lowest rounded-xl border border-surface-variant overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 shadow-sm"
            >
              {/* Card Thumbnail */}
              <div 
                onClick={() => openPdp(matchItem.product)}
                className="relative w-full aspect-[3/4] overflow-hidden bg-bg-off-white cursor-pointer"
              >
                <img 
                  src={matchItem.product.images[0]} 
                  alt={matchItem.product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {/* Match Badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-ai-gradient-start to-ai-gradient-end text-white px-2.5 py-1 rounded-full font-label-bold flex items-center gap-1 shadow-md text-[11px]">
                  <span className="material-symbols-outlined text-[13px] filled">auto_awesome</span>
                  <span>#{matchItem.rank} &bull; {matchItem.matchScore}% Match</span>
                </div>
              </div>

              {/* Card Meta & Reasons */}
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-label-bold text-secondary uppercase tracking-wider text-[11px] font-bold">
                    {matchItem.product.brand}
                  </h3>
                  <h2 
                    onClick={() => openPdp(matchItem.product)}
                    className="font-title-md text-on-surface text-sm font-bold truncate mt-0.5 cursor-pointer hover:text-primary transition-colors"
                  >
                    {matchItem.product.title}
                  </h2>

                  <div className="flex items-baseline gap-2 my-2">
                    <span className="font-price-main text-base font-bold text-on-surface">
                      ₹{matchItem.product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="font-price-mrp text-xs text-mrp-strikethrough line-through">
                      ₹{matchItem.product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-primary-brand font-bold">
                      {matchItem.product.discountPercentage}% OFF
                    </span>
                  </div>

                  {/* Why it matches */}
                  <div className="bg-surface-container-low rounded-lg p-2.5 mb-3">
                    <p className="font-label-bold text-[10px] text-secondary uppercase font-bold mb-1.5">
                      Match Highlights:
                    </p>
                    <ul className="space-y-1 text-xs text-on-surface-variant">
                      {matchItem.matchReasons.slice(0, 2).map((reason, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-1.5 leading-snug">
                          <span className="material-symbols-outlined text-success-green text-[14px] shrink-0 mt-0.5">
                            check
                          </span>
                          <span className="line-clamp-1">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button 
                    onClick={() => addToBag(matchItem.product, matchItem.product.sizes[0] || 'M')}
                    className="flex-1 bg-surface-variant text-on-surface hover:bg-primary hover:text-white font-label-bold py-2 rounded text-xs transition-colors shadow-sm"
                  >
                    ADD TO BAG
                  </button>
                  <button 
                    onClick={() => openPdp(matchItem.product)}
                    className="p-2 border border-surface-variant rounded hover:border-primary text-secondary hover:text-primary transition-colors"
                    title="View details"
                  >
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-surface-variant p-8">
          <p className="text-secondary text-sm">No matches found for this filter. Try adjusting your preferences.</p>
        </div>
      )}

      {/* Floating Ask AI Refinement Widget */}
      <AskAiWidget />
    </div>
  );
};
