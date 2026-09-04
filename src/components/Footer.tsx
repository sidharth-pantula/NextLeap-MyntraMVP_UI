import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-low text-on-surface-variant border-t border-surface-variant mt-20 pb-20 md:pb-12 pt-12">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Online Shopping */}
          <div className="flex flex-col gap-3">
            <h4 className="font-label-bold text-label-bold uppercase text-on-surface tracking-wider">Online Shopping</h4>
            <a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">Men</a>
            <a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">Women</a>
            <a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">Kids</a>
            <a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">Home & Living</a>
            <a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">Beauty</a>
            <a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">Gift Cards</a>
          </div>

          {/* Customer Policies */}
          <div className="flex flex-col gap-3">
            <h4 className="font-label-bold text-label-bold uppercase text-on-surface tracking-wider">Customer Policies</h4>
            <a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">Contact Us</a>
            <a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">FAQ</a>
            <a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">T&C</a>
            <a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">Terms Of Use</a>
            <a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">Track Orders</a>
            <a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">Shipping & Returns</a>
          </div>

          {/* Experience Myntra App */}
          <div className="flex flex-col gap-3">
            <h4 className="font-label-bold text-label-bold uppercase text-on-surface tracking-wider">Experience Myntra App</h4>
            <div className="flex flex-col gap-2">
              <div className="bg-black text-white px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer w-fit">
                <span className="material-symbols-outlined text-[20px]">shop</span>
                <span className="text-[11px] font-bold">Google Play</span>
              </div>
              <div className="bg-black text-white px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer w-fit">
                <span className="material-symbols-outlined text-[20px]">apple</span>
                <span className="text-[11px] font-bold">App Store</span>
              </div>
            </div>
          </div>

          {/* Guarantees */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">verified</span>
              <div>
                <p className="font-bold text-body-sm text-on-surface">100% ORIGINAL</p>
                <p className="text-[12px] text-secondary">guarantee for all products at myntra.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">replay</span>
              <div>
                <p className="font-bold text-body-sm text-on-surface">Return within 14days</p>
                <p className="text-[12px] text-secondary">of receiving your order</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-surface-variant pt-6 flex flex-col md:flex-row justify-between items-center text-[12px] text-secondary gap-4">
          <p>© 2026 www.myntra.com. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-tertiary font-bold">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              AI-Powered Wishlist MVP
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
