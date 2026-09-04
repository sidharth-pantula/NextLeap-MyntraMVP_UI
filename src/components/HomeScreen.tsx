import React from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

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
      <section className="mt-4 mb-10 relative rounded-xl overflow-hidden shadow-sm group cursor-pointer h-[340px] md:h-[460px]">
        <div 
          className="bg-cover bg-center w-full h-full absolute inset-0 transform group-hover:scale-105 transition-transform duration-700" 
          style={{ 
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAFSJYeIeulVXVSGfQHA1C8PRUjcMmcY6Wda02XVUmzXGnxwCMkfrkEb2QHS6klaen7ChO09lmjnKh7ndePhqSpST3R-YdZW0-i8MeuOLwV-BBaBwv8LXpEaUjK7SPJPatAEoaR3zWqe4f5aWJsCs4dgb0GTWuKp6t7HnSREBxfdlmHwP9JTJbhj6DIL8ZleLYWIAQ3dzUHW1CWSe9aZNwydDou_uBNqNPiES2Mp_0iZskfbIRVbX7i')` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent flex items-center">
          <div className="p-6 md:p-14 text-left w-full md:w-2/3 lg:w-1/2 text-white">
            <span className="inline-block px-3 py-1 bg-primary text-white font-label-bold text-label-bold uppercase tracking-widest rounded mb-3 shadow-sm animate-pulse">
              Biggest Fashion Sale
            </span>
            <h1 className="font-display-lg text-3xl md:text-5xl font-extrabold text-white mb-2 leading-tight">
              End of Reason <br/>
              <span className="text-primary-brand drop-shadow-md">FESTIVE EDIT</span>
            </h1>
            <p className="text-white text-body-lg md:text-title-md font-medium mb-6 opacity-90">
              50–80% OFF on Top Trending Designer Brands
            </p>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  window.scrollTo({ top: 500, behavior: 'smooth' });
                }}
                className="bg-white text-primary font-bold py-3 px-6 rounded flex items-center space-x-2 hover:bg-bg-off-white transition-colors shadow-md text-sm"
              >
                <span>Explore Catalog</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button 
                onClick={startAiFlow}
                className="ai-gradient-bg text-white font-bold py-3 px-6 rounded flex items-center space-x-2 hover:opacity-90 transition-opacity shadow-md text-sm"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>Try AI Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="mb-14">
        <h2 className="font-headline-lg text-xl md:text-2xl text-on-surface mb-6 uppercase tracking-wider">
          Shop by Category
        </h2>
        <div className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 hide-scrollbar snap-x">
          {/* Category Item 1 */}
          <div 
            onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
            className="snap-start shrink-0 w-28 md:w-40 group cursor-pointer flex flex-col items-center"
          >
            <div className="w-full aspect-square rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-colors p-1 bg-surface-container-low">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3B5s235tyDKYAcv5gfvHn5xrzHnQNokSJqL-bjhDl51i66pjYX-tkUv78y_wT4lqXLlVrumC-uoSQJpAegK60Wp3ZrA304znWtOukX1YSWlnTsdhPOLgoNEOLLFDtft6rDNh8BITU_CTcHAKWUKLYlSLic5bH7u7M_Kkf_n9aDXXaxNHHsua-B-IHDcLfI5Nqqma03B2VfYhDXxFfOwD2HK8zRyFlOl5jyzoox6_mNwu8AiGyLsV_')` }}
              />
            </div>
            <p className="text-center font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
              Men's Casuals
            </p>
          </div>

          {/* Category Item 2 */}
          <div 
            onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
            className="snap-start shrink-0 w-28 md:w-40 group cursor-pointer flex flex-col items-center"
          >
            <div className="w-full aspect-square rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-colors p-1 bg-surface-container-low">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-OixsJTAGjlOT8MMJd4fsvUyR4OVAZL8CbFB3KShnf0fNPfu5grC9qUFNeZ4-NGPbWnp9CNQVIp2zAy3Hx5SXpi3QY4LirLaNPhYuZIw2BKlVTY7s_Lxu5zPqkr3VWkcJFKGfyVNl8Ry8RyhVLXM3Bz2UPnrtI85auKxJbIsMe3_ylPR5w0IhFa0lcGgba6bVX0nilVXSayPDHfqPjSJ1zVdTn7I7bBOQbhkvjhlyZz5Z-FyOa3hy')` }}
              />
            </div>
            <p className="text-center font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
              Ethnic Wear
            </p>
          </div>

          {/* Category Item 3 */}
          <div 
            onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
            className="snap-start shrink-0 w-28 md:w-40 group cursor-pointer flex flex-col items-center"
          >
            <div className="w-full aspect-square rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-colors p-1 bg-surface-container-low">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAZv5fpmJ2gxyC3yk1rFWFgjtBpHYeVa4I5xI1kH8xu6mZ9k9wtSlzKa17irODYyeP4dHaWwCBtLKHwfTzXcLnqRgXha3UnRJUOg7puUeO-q-5EMwTRnuVZys4P61kec1dYPc1KY-VxN88DpGUbjErxoIAUXG1sEtW3zgOrA5qc8vHNlcHeRJK-6ID6Qb55ljqKgM6PcefEiQ8NGG5yeXWDA4zzrzU1_MunA4cU90oUq7r8_XEj47Fi')` }}
              />
            </div>
            <p className="text-center font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
              Footwear
            </p>
          </div>

          {/* Category Item 4 */}
          <div 
            onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
            className="snap-start shrink-0 w-28 md:w-40 group cursor-pointer flex flex-col items-center"
          >
            <div className="w-full aspect-square rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-colors p-1 bg-surface-container-low">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAOZiTCqlXomuyn10dIqfhAV3dSEcm4_d5t8UCfYDsLnchAtYfzQd6J6sC3aB7qNiW9gSQvbt5ifvV11ltnd1DJhHTnE6pk7f-peEl6ByMcXwFTjebAggIOTucVW2MzZ7dPzAAsiGhUkrCN1HfxjN_GHRcobkQ3irGR0d_g9O8Uchc7m-BL9wVRYf5g3hyYoZHl_OciFJn3DpYZNxNMib2j7dpJGptTPj0gw_lfE-hI5ToYw-3q5EsT')` }}
              />
            </div>
            <p className="text-center font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
              Western Dresses
            </p>
          </div>

          {/* Category Item 5 */}
          <div 
            onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
            className="snap-start shrink-0 w-28 md:w-40 group cursor-pointer flex flex-col items-center"
          >
            <div className="w-full aspect-square rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-colors p-1 bg-surface-container-low">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvC9UKyNnMZ3qm_a05Mq6q7PXQZWXhrQ0Hnp5RjMpuHqU1zSerWQUuhyn3C6r3EouFYJTnCL8KJXD77d6G36j3pzIHgVlZlbS2pYG_bhzzH9g8R6WNe2x4e53zEa4anfcA6ViL3sJpQQsqneA3loeMZS09pWBK6b4uZa2MI-fKnzQKpE65UYmvaEjiT7sZIMsEo0GjYGuzEtLrzwsQkwerhV1w1_FpV0ukcoTz_pgTks0j6wlYgZGk')` }}
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
              <span className="material-symbols-outlined text-tertiary text-4xl animate-pulse">
                auto_awesome
              </span>
            </div>
            <p className="text-center font-bold text-sm ai-gradient-text">
              ✨ AI Match
            </p>
          </div>
        </div>
      </section>

      {/* Product Discovery Grid */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="font-headline-lg text-xl md:text-2xl text-on-surface uppercase tracking-wider">
              Trending Products
            </h2>
            <p className="text-body-sm text-secondary">Handpicked styles tailored for you</p>
          </div>
          <span className="text-secondary text-sm font-medium">{products.length} Products</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div 
                key={product.id}
                className="group flex flex-col relative bg-surface-container-lowest border border-surface-variant hover:border-transparent hover:shadow-xl transition-all duration-300 rounded overflow-hidden cursor-pointer"
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
                    className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-all hover:scale-110 active:scale-95 z-10 ${
                      isWishlisted 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-white/80 text-secondary hover:text-primary'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isWishlisted ? 'filled' : ''}`}>
                      favorite
                    </span>
                  </button>

                  {/* Slide-up Actions on Hover */}
                  <div className="hover-action absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToBag(product, product.sizes[0] || 'M');
                      }}
                      className="w-full bg-white text-on-surface font-label-bold text-[11px] py-2.5 rounded text-center shadow-md hover:bg-primary hover:text-white transition-colors"
                    >
                      ADD TO BAG
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div 
                  onClick={() => openPdp(product)}
                  className="p-3 flex flex-col flex-grow justify-between"
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
