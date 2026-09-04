import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const AiQuestionOccasion: React.FC = () => {
  const { userIntent, updateIntentField, setCurrentView } = useApp();
  const [selectedOccasion, setSelectedOccasion] = useState<string>(
    userIntent.occasion || 'Wedding'
  );

  useEffect(() => {
    if (userIntent.occasion) {
      setSelectedOccasion(userIntent.occasion);
    }
  }, [userIntent.occasion]);

  const occasionOptions = [
    { label: 'Wedding', icon: 'favorite', desc: 'Ceremony, Reception, Sangeet' },
    { label: 'Party', icon: 'celebration', desc: 'Cocktails, Night Out, Celebrations' },
    { label: 'Work', icon: 'work', desc: 'Office, Meetings, Corporate' },
    { label: 'Vacation', icon: 'flight_takeoff', desc: 'Resort, Beach, Summer Trip' },
    { label: 'Casual', icon: 'coffee', desc: 'Brunch, Everyday, Hangouts' },
    { label: 'Festive', icon: 'flare', desc: 'Diwali, Puja, Cultural Events' },
  ];

  const handleContinue = () => {
    updateIntentField('occasion', selectedOccasion);
    setCurrentView('ai-question-2'); // Step 2: Style
  };

  return (
    <div className="min-h-screen bg-surface-bright flex flex-col font-sans">
      {/* Top Header & Progress */}
      <header className="fixed top-0 w-full z-50 glass-panel shadow-sm border-b border-surface-variant/40 bg-white/90 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
          <button 
            onClick={() => setCurrentView('ai-intent')}
            className="flex items-center text-on-surface hover:text-primary transition-colors group cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="ml-1 text-xs font-bold hidden md:inline uppercase">Back</span>
          </button>
          
          <div className="flex items-center gap-1.5 font-bold text-on-surface text-base md:text-lg">
            <span>AI Wishlist Match</span>
            <span className="material-symbols-outlined text-primary text-[18px] filled">auto_awesome</span>
          </div>

          <button 
            onClick={() => setCurrentView('wishlist')}
            className="text-xs text-secondary hover:text-on-surface font-medium"
          >
            Cancel
          </button>
        </div>

        {/* Progress Bar (25%) */}
        <div className="w-full bg-surface-variant h-1">
          <div className="bg-primary h-1 w-1/4 transition-all duration-500 ease-out"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-24 pb-32 px-4 md:px-10 max-w-[900px] mx-auto w-full">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-label-bold text-xs text-secondary uppercase tracking-widest font-bold">
            Step 1 of 4
          </span>
          <span className="font-label-bold text-xs ai-gradient-text flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            Personalizing
          </span>
        </div>

        {/* Question Heading */}
        <div className="text-center mb-8">
          <h2 className="font-display-lg text-3xl md:text-4xl font-extrabold text-on-surface mb-2">
            What's the occasion?
          </h2>
          <p className="font-body-lg text-secondary text-sm md:text-base">
            Select an event to help us tailor your AI recommendations from saved products.
          </p>
        </div>

        {/* 2x3 Bento Options Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
          {occasionOptions.map((opt) => {
            const isSelected = selectedOccasion === opt.label;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSelectedOccasion(opt.label)}
                className={`group relative rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 cursor-pointer text-center aspect-[4/3] md:aspect-square ${
                  isSelected
                    ? 'border-2 border-primary bg-primary/5 shadow-lg shadow-primary/10 scale-[1.02]'
                    : 'border border-surface-variant bg-surface-container-lowest hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                  isSelected 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-surface-container-low text-primary group-hover:bg-primary/10'
                }`}>
                  <span className="material-symbols-outlined text-[28px]">{opt.icon}</span>
                </div>

                <div>
                  <h3 className="font-title-md text-base md:text-lg font-bold text-on-surface">
                    {opt.label}
                  </h3>
                  <p className="text-[11px] text-secondary mt-0.5 line-clamp-1">
                    {opt.desc}
                  </p>
                </div>

                {/* Checkmark Badge */}
                <div className={`absolute top-3 right-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center transition-all ${
                  isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}>
                  <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      {/* Sticky Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 w-full p-4 md:p-6 bg-white/95 backdrop-blur-md border-t border-surface-variant z-40 flex justify-center shadow-lg">
        <div className="w-full max-w-[600px] flex gap-4">
          <button 
            onClick={() => setCurrentView('ai-intent')}
            className="flex-1 py-3.5 px-6 rounded border border-surface-variant text-on-surface font-bold text-sm hover:bg-surface-container-low transition-colors"
          >
            Back
          </button>
          <button 
            onClick={handleContinue}
            className="flex-[2] py-3.5 px-6 rounded bg-primary-brand text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-[#e02e5a] transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Continue</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
