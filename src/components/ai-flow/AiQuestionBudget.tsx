import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const AiQuestionBudget: React.FC = () => {
  const { userIntent, updateIntentField, setCurrentView } = useApp();
  
  const [selectedBudget, setSelectedBudget] = useState<number>(
    userIntent.budgetMax || 10000
  );

  useEffect(() => {
    if (userIntent.budgetMax) {
      setSelectedBudget(userIntent.budgetMax);
    }
  }, [userIntent.budgetMax]);

  const budgetTiers = [
    { max: 2000, label: 'Under ₹2,000', desc: 'Budget-friendly & everyday essentials' },
    { max: 5000, label: '₹2,000 – ₹5,000', desc: 'Popular premium high-street fashion' },
    { max: 10000, label: '₹5,000 – ₹10,000', desc: 'Festive occasion wear & designer labels' },
    { max: 25000, label: '₹10,000+', desc: 'Luxury handcrafted & couture collections' },
  ];

  const handleContinue = () => {
    const tier = budgetTiers.find((b) => b.max === selectedBudget) || budgetTiers[2];
    updateIntentField('budgetMax', tier.max);
    updateIntentField('budgetLabel', tier.label);
    setCurrentView('ai-question-4'); // Step 4: Category
  };

  return (
    <div className="min-h-screen bg-surface-bright flex flex-col font-sans">
      {/* Top Header & Progress */}
      <header className="fixed top-0 w-full z-50 glass-panel shadow-sm border-b border-surface-variant/40 bg-white/90 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
          <button 
            onClick={() => setCurrentView('ai-question-2')}
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

        {/* Progress Bar (75%) */}
        <div className="w-full bg-surface-variant h-1">
          <div className="bg-primary h-1 w-3/4 transition-all duration-500 ease-out"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-24 pb-32 px-4 md:px-10 max-w-[800px] mx-auto w-full">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-label-bold text-xs text-secondary uppercase tracking-widest font-bold">
            Step 3 of 4
          </span>
          <span className="font-label-bold text-xs ai-gradient-text flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            Budget Guidance
          </span>
        </div>

        {/* Question Heading */}
        <div className="text-center mb-8">
          <h2 className="font-display-lg text-3xl md:text-4xl font-extrabold text-on-surface mb-2">
            What's your budget?
          </h2>
          <p className="font-body-lg text-secondary text-sm md:text-base">
            We'll prioritize wishlist items that fit comfortably within your target spend.
          </p>
        </div>

        {/* Budget Options Form */}
        <div className="flex flex-col gap-4 w-full">
          {budgetTiers.map((tier) => {
            const isSelected = selectedBudget === tier.max;
            return (
              <div
                key={tier.max}
                onClick={() => setSelectedBudget(tier.max)}
                className={`w-full rounded-2xl p-5 md:p-6 flex items-center justify-between cursor-pointer transition-all duration-300 relative overflow-hidden shadow-sm ${
                  isSelected
                    ? 'border-2 border-primary bg-primary/5 shadow-md scale-[1.01]'
                    : 'border border-surface-variant bg-surface-container-lowest hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base transition-colors ${
                    isSelected ? 'bg-primary text-white' : 'bg-surface-container-low text-secondary'
                  }`}>
                    ₹
                  </div>
                  <div>
                    <h3 className="font-title-md text-lg md:text-xl font-bold text-on-surface">
                      {tier.label}
                    </h3>
                    <p className="text-xs text-secondary mt-0.5">
                      {tier.desc}
                    </p>
                  </div>
                </div>

                {/* Radio Checkmark */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected ? 'bg-primary text-white scale-100' : 'border-2 border-surface-variant bg-white'
                }`}>
                  <span className={`material-symbols-outlined text-[16px] font-bold ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                    check
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Sticky Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 w-full p-4 md:p-6 bg-white/95 backdrop-blur-md border-t border-surface-variant z-40 flex justify-center shadow-lg">
        <div className="w-full max-w-[600px] flex gap-4">
          <button 
            onClick={() => setCurrentView('ai-question-2')}
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
