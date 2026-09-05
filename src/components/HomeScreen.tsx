import React from 'react';
import { useApp } from '../context/AppContext';

export const HomeScreen: React.FC = () => {
  const { 
    products, 
    wishlistIds, 
    toggleWishlist, 
    openPdp, 
    startAiFlow,
    addToBag 
  } = useApp();

  return (
    <div className="w-full">
      {/* Hero Promo Banner */}
      <section className="mt-4 mb-10 relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-[360px] md:h-[460px]">
        {/* Crisp High-Resolution Fashion Background */}
        <div 
          className="bg-cover bg-center w-full h-full absolute inset-0 transform group-hover:scale-105 transition-transform duration-700" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80')` 
          }}
        />
        {/* High-Contrast Gradient Backdrop so text is 100% sharp and readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent flex items-center">
          <div className="p-6 md:p-14 text-left w-full md:w-3/5 lg:w-1/2 text-white">
            <span className="inline-block px-3.5 py-1 bg-primary text-white font-label-bold text-xs uppercase tracking-widest rounded-full mb-3 shadow-md">
              BIGGEST FASHION SALE
            </span>
            <h1 className="font-display-lg text-3xl md:text-5xl font-black text-white mb-2 leading-tight tracking-tight">
              End of Season Sale
            </h1>
            <p className="text-white/90 text-sm md:text-base font-medium mb-6 leading-relaxed max-w-md">
              50–80% OFF on Top Trending Brands &amp; Designer Labels
            </p>
            <div className="flex items-center gap-3.5 flex-wrap">
              <button 
                onClick={() => {
                  window.scrollTo({ top: 520, behavior: 'smooth' });
                }}
                className="bg-white text-primary font-bold py-3.5 px-6 rounded-xl flex items-center space-x-2 hover:bg-bg-off-white transition-all shadow-md text-sm cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <span>Explore Catalog</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button 
                onClick={startAiFlow}
                className="ai-gradient-bg text-white font-bold py-3.5 px-6 rounded-xl flex items-center space-x-2 hover:opacity-95 transition-all shadow-lg shadow-tertiary/20 text-sm cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <span className="material-symbols-outlined text-sm filled">auto_awesome</span>
                <span>Prioritise Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="mb-14">
        <h2 className="font-headline-lg text-xl md:text-2xl text-on-surface font-black mb-6 uppercase tracking-wider">
          Shop by Category
        </h2>
        <div className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 hide-scrollbar snap-x">
          {/* Category Item 1 */}
          <div 
            onClick={() => window.scrollTo({ top: 520, behavior: 'smooth' })}
            className="snap-start shrink-0 w-28 md:w-40 group cursor-pointer flex flex-col items-center"
          >
            <div className="w-full aspect-square rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-colors p-1 bg-surface-container-low shadow-sm">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400&auto=format&fit=crop&q=80')` }}
              />
            </div>
            <p className="text-center font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
              Men's Casuals
            </p>
          </div>

          {/* Category Item 2 */}
          <div 
            onClick={() => window.scrollTo({ top: 520, behavior: 'smooth' })}
            className="snap-start shrink-0 w-28 md:w-40 group cursor-pointer flex flex-col items-center"
          >
            <div className="w-full aspect-square rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-colors p-1 bg-surface-container-low shadow-sm">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&auto=format&fit=crop&q=80')` }}
              />
            </div>
            <p className="text-center font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
              Ethnic Wear
            </p>
          </div>

          {/* Category Item 3 */}
          <div 
            onClick={() => window.scrollTo({ top: 520, behavior: 'smooth' })}
            className="snap-start shrink-0 w-28 md:w-40 group cursor-pointer flex flex-col items-center"
          >
            <div className="w-full aspect-square rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-colors p-1 bg-surface-container-low shadow-sm">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&auto=format&fit=crop&q=80')` }}
              />
            </div>
            <p className="text-center font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
              Footwear
            </p>
          </div>

          {/* Category Item 4 */}
          <div 
            onClick={() => window.scrollTo({ top: 520, behavior: 'smooth' })}
            className="snap-start shrink-0 w-28 md:w-40 group cursor-pointer flex flex-col items-center"
          >
            <div className="w-full aspect-square rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-colors p-1 bg-surface-container-low shadow-sm">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&auto=format&fit=crop&q=80')` }}
              />
            </div>
            <p className="text-center font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
              Western Dresses
            </p>
          </div>

          {/* Category Item 5 */}
          <div 
            onClick={() => window.scrollTo({ top: 520, behavior: 'smooth' })}
            className="snap-start shrink-0 w-28 md:w-40 group cursor-pointer flex flex-col items-center"
          >
            <div className="w-full aspect-square rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-colors p-1 bg-surface-container-low shadow-sm">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=80')` }}
              />
            </div>
            <p className="text-center font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
              Accessories
            </p>
          </div>

          {/* AI Match Feature Chip */}
          <div 
            onClick={startAiFlow}
            className="snap-start shrink-0 w-28 md:w-40 group cursor-pointer flex flex-col items-center"
          >
            <div className="w-full aspect-square rounded-full overflow-hidden mb-3 border-2 border-tertiary transition-all p-1 relative bg-gradient-to-tr from-ai-gradient-start/20 to-ai-gradient-end/20 flex items-center justify-center shadow-md group-hover:scale-105">
              <span className="material-symbols-outlined text-tertiary text-4xl animate-pulse filled">
                auto_awesome
              </span>
            </div>
            <p className="text-center font-bold text-sm ai-gradient-text">
              ✨ Prioritise AI
            </p>
          </div>
        </div>
      </section>

      {/* Product Discovery Grid */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="font-headline-lg text-xl md:text-2xl text-on-surface font-black uppercase tracking-wider">
              Trending Products
            </h2>
            <p className="text-body-sm text-secondary">Handpicked styles tailored for you</p>
          </div>
          <span className="text-secondary text-sm font-bold bg-surface-container-low px-3 py-1 rounded-full border border-surface-variant/40">
            {products.length} Products
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div 
                key={product.id}
                className="group flex flex-col relative bg-surface-container-lowest border border-surface-variant hover:border-transparent hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden cursor-pointer"
              >
                {/* Image Container */}
                <div 
                  onClick={() => openPdp(product)}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-bg-off-white"
                >
                  <img 
                    src={product.images[0]} 
                    alt={product.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                  />

                  {/* Rating Tag */}
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 flex items-center space-x-1 rounded text-[11px] font-bold shadow-sm">
                    <span>{product.rating}</span>
                    <span className="material-symbols-outlined filled text-success-green text-[12px]">star</span>
                    <span className="text-secondary pl-1 border-l border-surface-variant font-normal">
                      {product.ratingCount >= 1000 ? `${(product.ratingCount / 1000).toFixed(1)}k` : product.ratingCount}
                    </span>
                  </div>

                  {/* Wishlist Toggle Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110 active:scale-95 z-10 shadow-sm ${
                      isWishlisted 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-white/85 text-secondary hover:text-primary'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isWishlisted ? 'filled' : ''}`}>
                      favorite
                    </span>
                  </button>

                  {/* Slide-up Actions on Hover */}
                  <div className="hover-action absolute bottom-0 left-0 w-full p-2.5 bg-gradient-to-t from-black/60 to-transparent">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToBag(product, product.sizes[0] || 'M');
                      }}
                      className="w-full bg-white text-on-surface font-label-bold text-[11px] py-2.5 rounded-lg text-center shadow-md hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      ADD TO BAG
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div 
                  onClick={() => openPdp(product)}
                  className="p-3.5 flex flex-col flex-grow justify-between"
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
                      ({product.discountPercentage}% OFF)
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
