import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const AiQuestionStyle: React.FC = () => {
  const { userIntent, updateIntentField, setCurrentView } = useApp();
  const [selectedStyle, setSelectedStyle] = useState<string>(
    userIntent.style || 'Elegant'
  );

  useEffect(() => {
    if (userIntent.style) {
      setSelectedStyle(userIntent.style);
    }
  }, [userIntent.style]);

  const styleOptions = [
    {
      label: 'Elegant',
      desc: 'Sophisticated & Timeless',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlEvY_zJCwMOZgnk4mQqpppPKMDJpLVjGNQoIfFMeCroviPY1op8CsOBY3VDAmE9hcbI8sWpTPuYktFwVe_FID1mcTaWNJmrj7NfKDVHDZWta8ap3x3RsVncnPQ7jbnYNCEh4QubY4ODr0nc23CEBCcsXUTEptCgVw_gm9X5r0JdoffnLuBcbbsjqa8yrNaPVtnDjOcM1pRW2TKMNI-laK52nuk7Ullukhd1gG921IjMSap9Yl2ade'
    },
    {
      label: 'Minimal',
      desc: 'Clean & Simple Lines',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCJk5RwERQdHypdHHgiI_GJIS7Gp1hDF60s3YzLKn6IJl2NeckT--dIMXEHcDrCgR9eXGXXUBw0ZsMXO1yPeKsbw3BvrO8OJSsy4k2W4fmTH24V7fJtikXreovx7zu3GoQJh520o0cil3s9JDTZT4P1a3dg5PgdQXjPQPfMWFYW9I18VaS2Z-eNCISVvVtD_lzBy3v-5DR_AEx1eZABuWUtIfgytIdr7y_1fAT1opgmEsfgpUzu3fM'
    },
    {
      label: 'Trendy',
      desc: 'Bold & Current',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkR5LlgIuBvS9njxab4bqC5vbXETsEBjxBXsxgl3a-t7ILijW8SwOMDwMR0CBnULrhHDqMB5XfWoazqYSPL1x-jAAh9Qx9t2UCbCtaQdIdx2-sqo1xy_7jv--7CrZplRIWcYe5P8Ii2hjEPGjj9rFOmerCEmyrQqYDpQanw0fGNMbq83kWMzbAg5b3y3f1mh-Dx1h5NFv0djW18ditDCutRNv8ikXOu3EHyJJLRPmsMVLbNnQEoiH'
    },
    {
      label: 'Traditional',
      desc: 'Classic Ethnic Wear',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsuU7XZLew7TPOAt10TmqCfbGOovjKXxmANOiGoCkqlTMovA5c9-F2R2lEzw4cCaMfrRbR4fweA-RVS5QTINQ0YGGcoWIpvF5XuPs0eQe-xZTmn9NtjxgglfjaAHFjHnKIil9YaJ0BGN0-nwkbn2bcclamAn7VNeqhATva0BzPG3j9Vhuqmwl6FALlnYaOgV5qNZE-qKnaISzO2nhnJQDzJ4T14DEDnxvI5MDxI13CnOhj1NBUrDUJ'
    },
    {
      label: 'Casual',
      desc: 'Relaxed & Everyday',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM-0RRb7rtE4mrZs2GthE_2fiuiOmgZ_HatdtrJq0zZ0TC6FBlajYkd_ia7zrjURto4blM38haxw2p6xZEpExbwa4axx0zzK-o-I4g8oNnVgh0nRGObvrWe8jM7VCAzGPIb1rKEfpMB-rXVr9zFRL9tCQelu3yc9BZCkvqtB8sSmuGBrHvBvD7pYaV0xl7_3XE_f8jeA0zRX9c3kbYRvtFiEMK0KcSpNW3p45myiUjMwls5_tkniNS'
    }
  ];

  const handleContinue = () => {
    updateIntentField('style', selectedStyle);
    setCurrentView('ai-question-3'); // Step 3: Budget
  };

  return (
    <div className="min-h-screen bg-surface-bright flex flex-col font-sans">
      {/* Top Header & Progress */}
      <header className="fixed top-0 w-full z-50 glass-panel shadow-sm border-b border-surface-variant/40 bg-white/90 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
          <button 
            onClick={() => setCurrentView('ai-question-1')}
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

        {/* Progress Bar (50%) */}
        <div className="w-full bg-surface-variant h-1">
          <div className="bg-primary h-1 w-2/4 transition-all duration-500 ease-out"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-24 pb-32 px-4 md:px-10 max-w-[1000px] mx-auto w-full">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-label-bold text-xs text-secondary uppercase tracking-widest font-bold">
            Step 2 of 4
          </span>
          <span className="font-label-bold text-xs ai-gradient-text flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            Aesthetic Preference
          </span>
        </div>

        {/* Question Heading */}
        <div className="text-center mb-8">
          <h2 className="font-display-lg text-3xl md:text-4xl font-extrabold text-on-surface mb-2">
            What's your preferred style?
          </h2>
          <p className="font-body-lg text-secondary text-sm md:text-base">
            Choose an aesthetic that matches what you have in mind.
          </p>
        </div>

        {/* Style Photo Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
          {styleOptions.map((opt) => {
            const isSelected = selectedStyle === opt.label;
            return (
              <div
                key={opt.label}
                onClick={() => setSelectedStyle(opt.label)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer h-60 md:h-72 transition-all duration-300 shadow-md ${
                  isSelected
                    ? 'ring-4 ring-primary shadow-xl scale-[1.02]'
                    : 'border border-surface-variant hover:shadow-lg'
                }`}
              >
                {/* Background Image */}
                <img 
                  src={opt.img} 
                  alt={opt.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />

                {/* Dark Gradient Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  isSelected ? 'bg-primary/25' : 'bg-black/20 group-hover:bg-black/10'
                }`} />

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 z-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white">
                  <h3 className="font-title-md text-lg md:text-xl font-bold mb-0.5 drop-shadow-md">
                    {opt.label}
                  </h3>
                  <p className="text-xs text-white/90 font-medium">
                    {opt.desc}
                  </p>
                </div>

                {/* Checkmark Radio */}
                <div className={`absolute top-3.5 right-3.5 z-30 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected ? 'bg-primary text-white scale-100 shadow-md' : 'border-2 border-white/70 bg-black/20 text-transparent'
                }`}>
                  <span className="material-symbols-outlined text-[16px] font-bold">check</span>
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
            onClick={() => setCurrentView('ai-question-1')}
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
