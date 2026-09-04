import React from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    wishlistProducts, 
    cartItems, 
    setShowBagDrawer,
    startAiFlow 
  } = useApp();

  const totalBagCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Desktop Sticky Header */}
      <header className="hidden md:flex fixed top-0 w-full z-50 justify-between items-center px-4 md:px-10 h-20 bg-surface-container-lowest shadow-sm border-b border-surface-variant transition-all duration-300">
        {/* Brand Logo & Main Category Navigation */}
        <div className="flex items-center gap-8 h-full">
          <button 
            onClick={() => setCurrentView('home')} 
            className="font-headline-lg text-headline-lg font-black text-primary tracking-tighter cursor-pointer flex items-center gap-1 focus:outline-none"
          >
            Myntra
          </button>
          <nav className="hidden lg:flex space-x-6 xl:space-x-8 items-center h-full">
            <button 
              onClick={() => setCurrentView('home')}
              className={`h-full flex items-center font-bold px-2 transition-colors cursor-pointer text-[14px] uppercase tracking-wider ${
                currentView === 'home' ? 'text-primary border-b-4 border-primary' : 'text-on-surface hover:text-primary'
              }`}
            >
              Men
            </button>
            <button 
              onClick={() => setCurrentView('home')}
              className="h-full flex items-center text-on-surface font-bold hover:text-primary transition-colors px-2 cursor-pointer text-[14px] uppercase tracking-wider"
            >
              Women
            </button>
            <button 
              onClick={() => setCurrentView('home')}
              className="h-full flex items-center text-on-surface font-bold hover:text-primary transition-colors px-2 cursor-pointer text-[14px] uppercase tracking-wider"
            >
              Kids
            </button>
            <button 
              onClick={() => setCurrentView('home')}
              className="h-full flex items-center text-on-surface font-bold hover:text-primary transition-colors px-2 cursor-pointer text-[14px] uppercase tracking-wider"
            >
              Home & Living
            </button>
            <button 
              onClick={() => setCurrentView('home')}
              className="h-full flex items-center text-on-surface font-bold hover:text-primary transition-colors px-2 cursor-pointer text-[14px] uppercase tracking-wider"
            >
              Beauty
            </button>
            <button 
              onClick={() => setCurrentView('home')}
              className="h-full flex items-center text-on-surface font-bold hover:text-primary transition-colors px-2 cursor-pointer relative text-[14px] uppercase tracking-wider group"
            >
              Studio 
              <sup className="text-[10px] text-primary font-bold ml-1 absolute top-5 -right-4 group-hover:animate-pulse">NEW</sup>
            </button>
          </nav>
        </div>

        {/* Search Bar & Action Icons */}
        <div className="flex items-center space-x-6 w-full lg:w-auto justify-end">
          <div className="relative hidden md:block w-72 lg:w-96 group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors text-[20px]">
              search
            </span>
            <input 
              className="w-full bg-surface-container-low border border-surface-variant rounded-full py-2 pl-12 pr-10 text-body-sm focus:outline-none focus:border-primary focus:bg-white transition-all focus:shadow-[0_0_0_2px_rgba(185,0,65,0.1)] placeholder:text-secondary/70" 
              placeholder="Search for products, brands and more" 
              type="text"
            />
            <button 
              onClick={startAiFlow}
              title="Voice / AI search"
              className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-tertiary cursor-pointer hover:scale-110 transition-transform text-[20px]"
            >
              mic
            </button>
          </div>

          <div className="flex space-x-5 items-center">
            {/* Profile */}
            <button className="flex flex-col items-center group cursor-pointer text-secondary hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[22px]">person</span>
              <span className="text-[10px] font-bold text-secondary group-hover:text-primary hidden xl:block mt-0.5">Profile</span>
            </button>

            {/* Wishlist */}
            <button 
              onClick={() => setCurrentView('wishlist')}
              className={`flex flex-col items-center group cursor-pointer relative transition-colors ${
                currentView === 'wishlist' || currentView === 'prioritized-grid' || currentView === 'best-matches'
                  ? 'text-primary'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              <span className={`material-symbols-outlined text-[22px] ${
                currentView === 'wishlist' || currentView === 'prioritized-grid' || currentView === 'best-matches'
                  ? 'filled text-primary'
                  : ''
              }`}>
                favorite
              </span>
              <span className="text-[10px] font-bold hidden xl:block mt-0.5">Wishlist</span>
              {wishlistProducts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistProducts.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button 
              onClick={() => setShowBagDrawer(true)}
              className="flex flex-col items-center group cursor-pointer relative text-secondary hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              <span className="text-[10px] font-bold text-secondary group-hover:text-primary hidden xl:block mt-0.5">Bag</span>
              {totalBagCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {totalBagCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Top Header */}
      <nav className="md:hidden fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-surface-container-lowest shadow-sm border-b border-surface-variant">
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentView('home')} className="material-symbols-outlined text-secondary">
            menu
          </button>
          <span onClick={() => setCurrentView('home')} className="font-headline-lg-mobile text-headline-lg-mobile font-black text-primary cursor-pointer">
            Myntra
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={startAiFlow} className="material-symbols-outlined text-tertiary">
            auto_awesome
          </button>
          <button onClick={() => setCurrentView('wishlist')} className="relative text-secondary hover:text-primary">
            <span className="material-symbols-outlined">favorite</span>
            {wishlistProducts.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistProducts.length}
              </span>
            )}
          </button>
          <button onClick={() => setShowBagDrawer(true)} className="relative text-secondary hover:text-primary">
            <span className="material-symbols-outlined">shopping_bag</span>
            {totalBagCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalBagCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
