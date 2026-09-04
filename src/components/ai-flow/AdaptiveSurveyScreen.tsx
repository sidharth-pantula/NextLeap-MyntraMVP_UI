import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdaptiveOption } from '../../types';

export const AdaptiveSurveyScreen: React.FC = () => {
  const { 
    currentQuestion, 
    userPrefs, 
    answerQuestion, 
    skipQuestion, 
    setCurrentView 
  } = useApp();

  const [selectedOption, setSelectedOption] = useState<AdaptiveOption | null>(null);

  if (!currentQuestion) {
    return null;
  }

  const handleSelectOption = (option: AdaptiveOption) => {
    setSelectedOption(option);
  };

  const handleConfirm = () => {
    if (selectedOption) {
      answerQuestion(currentQuestion.dimension, selectedOption.value);
      setSelectedOption(null);
    }
  };

  const handleSkip = () => {
    setSelectedOption(null);
    skipQuestion(currentQuestion.dimension);
  };

  const totalQuestions = 5;
  const progressPercent = Math.min(100, Math.round((currentQuestion.questionNumber / totalQuestions) * 100));

  return (
    <div className="min-h-screen bg-surface-bright flex flex-col font-sans selection:bg-primary-container selection:text-white">
      {/* Top Fixed Header & Adaptive Progress Bar */}
      <header className="fixed top-0 w-full z-50 glass-panel shadow-sm border-b border-surface-variant/40 bg-white/95 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
          <button 
            onClick={() => setCurrentView('wishlist')}
            className="flex items-center text-on-surface hover:text-primary transition-colors group cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="ml-1.5 text-xs font-bold uppercase tracking-wider text-secondary">Exit Survey</span>
          </button>
          
          <div className="flex items-center gap-2 font-bold text-on-surface text-sm md:text-base">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-black">
              AI
            </span>
            <span>Adaptive Wishlist Prioritizer</span>
            <span className="material-symbols-outlined text-primary text-[18px] filled">auto_awesome</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-secondary">
              Question {currentQuestion.questionNumber} of 5
            </span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-surface-variant h-1.5 overflow-hidden">
          <div 
            className="ai-gradient-bg h-1.5 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-24 pb-32 px-4 md:px-8 max-w-[920px] mx-auto w-full">
        {/* Step Indicator & AI Rationale */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-tertiary-fixed to-primary/10 border border-tertiary-fixed-dim text-on-tertiary-fixed-variant px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs">
            <span className="material-symbols-outlined text-[15px] text-tertiary filled">psychology</span>
            <span>AI Reasoning: {currentQuestion.aiRationale}</span>
          </div>

          <span className="text-xs font-bold text-secondary uppercase tracking-widest hidden sm:inline">
            Step {currentQuestion.questionNumber} / 5
          </span>
        </div>

        {/* Question Title & Subtitle */}
        <div className="mb-8 mt-2">
          <h1 className="font-display-lg text-2xl md:text-3xl lg:text-4xl font-black text-on-surface tracking-tight mb-2">
            {currentQuestion.title}
          </h1>
          <p className="font-body-lg text-secondary text-sm md:text-base">
            {currentQuestion.subtitle}
          </p>
        </div>

        {/* Dynamic Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4 w-full">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedOption?.id === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                className={`group relative rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 border text-left min-h-[110px] shadow-sm ${
                  isSelected
                    ? 'border-2 border-primary bg-primary/5 shadow-md shadow-primary/10 ring-2 ring-primary/20 scale-[1.01]'
                    : 'border-surface-variant bg-surface-container-lowest hover:border-primary/40 hover:bg-surface-container-low/50 hover:shadow'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    {opt.icon && (
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected 
                          ? 'bg-primary text-white shadow-sm' 
                          : 'bg-surface-container-low text-primary group-hover:bg-primary/10'
                      }`}>
                        <span className="material-symbols-outlined text-[20px]">{opt.icon}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-title-md text-base font-bold text-on-surface leading-snug">
                    {opt.label}
                  </h3>
                  {opt.desc && (
                    <p className="text-xs text-secondary mt-1 line-clamp-2">
                      {opt.desc}
                    </p>
                  )}
                </div>

                {/* Selection Radio / Check Indicator */}
                <div className="mt-3 flex items-center justify-end">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-primary text-white scale-100 shadow-xs' : 'border border-surface-variant bg-white group-hover:border-primary/60'
                  }`}>
                    <span className={`material-symbols-outlined text-[14px] font-bold ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                      check
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Previously Inferred Context Summary */}
        {userPrefs.answeredDimensions && userPrefs.answeredDimensions.length > 0 && (
          <div className="mt-10 pt-6 border-t border-surface-variant/60">
            <h4 className="text-[11px] font-bold text-secondary uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-tertiary filled">check_circle</span>
              Current Inferred Context:
            </h4>
            <div className="flex flex-wrap gap-2">
              {userPrefs.need && (
                <span className="bg-white border border-surface-variant px-3 py-1 rounded-full text-xs font-semibold text-on-surface shadow-xs">
                  Occasion: <strong className="text-primary">{userPrefs.need}</strong>
                </span>
              )}
              {userPrefs.look && (
                <span className="bg-white border border-surface-variant px-3 py-1 rounded-full text-xs font-semibold text-on-surface shadow-xs">
                  Look: <strong className="text-tertiary">{userPrefs.look}</strong>
                </span>
              )}
              {userPrefs.productType && (
                <span className="bg-white border border-surface-variant px-3 py-1 rounded-full text-xs font-semibold text-on-surface shadow-xs">
                  Type: <strong className="text-secondary">{userPrefs.productType}</strong>
                </span>
              )}
              {userPrefs.fabric && (
                <span className="bg-white border border-surface-variant px-3 py-1 rounded-full text-xs font-semibold text-on-surface shadow-xs">
                  Fabric: <strong className="text-primary">{userPrefs.fabric}</strong>
                </span>
              )}
              {userPrefs.fit && (
                <span className="bg-white border border-surface-variant px-3 py-1 rounded-full text-xs font-semibold text-on-surface shadow-xs">
                  Fit: <strong className="text-secondary">{userPrefs.fit}</strong>
                </span>
              )}
              {userPrefs.preference && (
                <span className="bg-white border border-surface-variant px-3 py-1 rounded-full text-xs font-semibold text-on-surface shadow-xs">
                  Focus: <strong className="text-success-green">{userPrefs.preference}</strong>
                </span>
              )}
              {userPrefs.budgetLabel && (
                <span className="bg-white border border-surface-variant px-3 py-1 rounded-full text-xs font-semibold text-on-surface shadow-xs">
                  Budget: <strong className="text-success-green">{userPrefs.budgetLabel}</strong>
                </span>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Sticky Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 w-full p-4 md:p-5 bg-white/95 backdrop-blur-md border-t border-surface-variant z-40 flex justify-center shadow-lg">
        <div className="w-full max-w-[640px] flex items-center gap-3">
          {currentQuestion.canSkip && (
            <button 
              onClick={handleSkip}
              className="flex-1 py-3.5 px-4 rounded-xl border border-surface-variant text-secondary hover:text-on-surface font-bold text-xs md:text-sm hover:bg-surface-container-low transition-colors cursor-pointer text-center"
            >
              Skip Question
            </button>
          )}
          <button 
            onClick={handleConfirm}
            disabled={!selectedOption}
            className={`flex-[2] py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
              selectedOption
                ? 'ai-gradient-bg text-white shadow-tertiary/20 hover:scale-[1.01] active:scale-95'
                : 'bg-surface-variant text-secondary opacity-50 cursor-not-allowed'
            }`}
          >
            <span>{currentQuestion.questionNumber === 5 ? 'Finish & Show Top 10' : 'Continue'}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
