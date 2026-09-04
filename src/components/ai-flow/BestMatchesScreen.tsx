import React from 'react';
import { useApp } from '../../context/AppContext';
import { AskAiWidget } from './AskAiWidget';

export const BestMatchesScreen: React.FC = () => {
  const { 
    scores, 
    userPrefs, 
    openPdp, 
    addToBag, 
    setCurrentView,
    startAiFlow,
    resetAiPrioritization 
  } = useApp();

  // Return Top 10 highest-relevance wishlist items
  const top10Matches = scores.slice(0, 10);
  const topMatch = top10Matches[0];
  const remainingMatches = top10Matches.slice(1);

  return (
    <div className="w-full pb-36 font-sans">
      {/* Header Section */}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display-lg text-2xl md:text-4xl font-black text-on-surface tracking-tight">
              Top 10 AI Prioritized Matches
            </h1>
            <span className="ai-gradient-bg text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
              Ranked #1 – #{top10Matches.length}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed-variant px-3.5 py-1.5 rounded-full font-label-bold text-xs mt-3 border border-tertiary-fixed-dim shadow-xs flex-wrap">
            <span className="material-symbols-outlined text-[15px] filled">auto_awesome</span>
            <span>
              Adaptive Result for: {userPrefs.need || 'Any Need'} 
              {userPrefs.look ? ` • ${userPrefs.look} Look` : ''} 
              {userPrefs.fabric ? ` • ${userPrefs.fabric}` : ''}
              {userPrefs.preference ? ` • Focus on ${userPrefs.preference}` : ''}
              {userPrefs.budgetLabel ? ` • ${userPrefs.budgetLabel}` : ''}
            </span>
          </div>
        </div>

        {/* View Switchers & Reset */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button 
            onClick={startAiFlow}
            className="ai-gradient-bg text-white font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm hover:opacity-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Re-run AI Survey</span>
          </button>

          <button 
            onClick={() => setCurrentView('prioritized-grid')}
            className="border border-surface-variant bg-surface-container-lowest hover:border-primary text-on-surface font-bold text-xs md:text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">grid_view</span>
            <span>All Prioritized ({scores.length})</span>
          </button>

          <button 
            onClick={() => {
              resetAiPrioritization();
              setCurrentView('wishlist');
            }}
            className="text-secondary hover:text-error text-xs font-bold px-3 py-2 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>Reset</span>
          </button>
        </div>
      </header>

      {/* Top 10 Ranked Matches */}
      {topMatch ? (
        <div className="space-y-6">
          {/* #1 Featured Hero Match */}
          <article className="bg-surface-container-lowest rounded-2xl border-2 border-primary/40 overflow-hidden flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-300 shadow-md relative">
            {/* Crown / Best Match Ribbon */}
            <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-ai-gradient-start to-ai-gradient-end text-white px-3.5 py-1.5 rounded-full font-label-bold text-xs flex items-center gap-1.5 shadow-lg">
              <span className="material-symbols-outlined text-[16px] filled">military_tech</span>
              <span>#1 Best Match • {topMatch.matchScore}% Match Score</span>
            </div>

            {/* Product Image */}
            <div 
              onClick={() => openPdp(topMatch.product)}
              className="w-full md:w-5/12 relative flex-shrink-0 aspect-[4/3] md:aspect-[3/4] overflow-hidden bg-bg-off-white cursor-pointer"
            >
              <img 
                src={topMatch.product.images[0]} 
                alt={topMatch.product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              {topMatch.signalBadges.length > 0 && (
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                  {topMatch.signalBadges.map((badge, bIdx) => (
                    <span key={bIdx} className="bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content Details */}
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
                  <span className="font-price-main text-2xl md:text-3xl font-bold text-on-surface">
                    ₹{topMatch.product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="font-price-mrp text-sm text-mrp-strikethrough line-through">
                    ₹{topMatch.product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="font-label-bold text-sm text-primary-brand font-bold">
                    ({topMatch.product.discountPercentage}% OFF)
                  </span>
                </div>

                {/* Why It Matches Box (2-3 concise reasons) */}
                <div className="bg-surface-container-low rounded-xl p-4 mb-6 border border-surface-variant/50">
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
                  className="flex-1 bg-primary text-white font-label-bold text-sm py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-container transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  <span>ADD TO BAG</span>
                </button>
                <button 
                  onClick={() => openPdp(topMatch.product)}
                  className="px-6 py-3.5 rounded-xl border border-surface-variant text-on-surface font-label-bold text-sm hover:border-primary hover:text-primary transition-colors cursor-pointer"
                >
                  VIEW DETAILS
                </button>
              </div>
            </div>
          </article>

          {/* Matches #2 through #10 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {remainingMatches.map((item) => (
              <article 
                key={item.productId}
                className="bg-surface-container-lowest rounded-2xl border border-surface-variant overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 shadow-sm"
              >
                {/* Image & Rank Badge */}
                <div 
                  onClick={() => openPdp(item.product)}
                  className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden bg-bg-off-white cursor-pointer"
                >
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Rank & Score Pill */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full font-label-bold flex items-center gap-1 text-[11px] shadow-md">
                    <span className="font-black text-primary">#{item.rank}</span>
                    <span>• {item.matchScore}% Match</span>
                  </div>

                  {/* Signal Badge */}
                  {item.signalBadges.length > 0 && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-primary/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                        {item.signalBadges[0]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Meta & Match Reasons */}
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-label-bold text-secondary uppercase tracking-wider text-[11px] font-bold">
                        {item.product.brand}
                      </h3>
                      <div className="flex items-center gap-0.5 text-xs font-bold text-on-surface">
                        <span>{item.product.rating}</span>
                        <span className="material-symbols-outlined filled text-[13px] text-amber-500">star</span>
                      </div>
                    </div>

                    <h2 
                      onClick={() => openPdp(item.product)}
                      className="font-title-md text-on-surface text-sm font-bold truncate mt-0.5 cursor-pointer hover:text-primary transition-colors"
                    >
                      {item.product.title}
                    </h2>

                    <div className="flex items-baseline gap-2 my-2">
                      <span className="font-price-main text-base font-bold text-on-surface">
                        ₹{item.product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="font-price-mrp text-xs text-mrp-strikethrough line-through">
                        ₹{item.product.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-primary-brand font-bold">
                        {item.product.discountPercentage}% OFF
                      </span>
                    </div>

                    {/* 2-3 Concise Reasons */}
                    <div className="bg-surface-container-low rounded-xl p-2.5 mb-3 border border-surface-variant/40">
                      <p className="font-label-bold text-[10px] text-secondary uppercase font-bold mb-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-tertiary filled">check_circle</span>
                        Key Match Reasons:
                      </p>
                      <ul className="space-y-1.5 text-xs text-on-surface-variant">
                        {item.matchReasons.slice(0, 2).map((reason, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-1.5 leading-snug">
                            <span className="material-symbols-outlined text-success-green text-[14px] shrink-0 mt-0.5">
                              check
                            </span>
                            <span className="line-clamp-2">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button 
                      onClick={() => addToBag(item.product, item.product.sizes[0] || 'M')}
                      className="flex-1 bg-surface-variant text-on-surface hover:bg-primary hover:text-white font-label-bold py-2.5 rounded-lg text-xs transition-colors shadow-xs cursor-pointer"
                    >
                      ADD TO BAG
                    </button>
                    <button 
                      onClick={() => openPdp(item.product)}
                      className="p-2 border border-surface-variant rounded-lg hover:border-primary text-secondary hover:text-primary transition-colors cursor-pointer"
                      title="View product details"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-surface-variant p-8">
          <p className="text-secondary text-sm">No items found matching your criteria. Try adjusting your preferences.</p>
        </div>
      )}

      {/* Floating Ask AI Refinement Widget */}
      <AskAiWidget />
    </div>
  );
};
