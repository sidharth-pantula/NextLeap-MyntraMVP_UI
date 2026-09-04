import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AskAiWidget: React.FC = () => {
  const { askAiRefine, userPrefs } = useApp();
  const [inputText, setInputText] = useState<string>('');

  const quickRefinements = [
    { label: 'Show me something less flashy', value: 'less flashy' },
    { label: 'Find best value & price drops', value: 'best value' },
    { label: 'Prioritize Pure Cotton', value: 'pure cotton' },
    { label: 'Prioritize Pure Silk', value: 'pure silk' },
    { label: 'Show ethnic only', value: 'ethnic only' },
    { label: 'Under ₹3,000 only', value: 'under 3000' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim().length > 0) {
      askAiRefine(inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 px-4 md:px-10 pb-6 pt-10 pointer-events-none flex justify-center">
      {/* Background gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-surface via-surface/90 to-transparent -z-10"></div>
      
      <div className="ai-glass-panel w-full max-w-[900px] rounded-2xl border border-tertiary-fixed-dim p-4 md:p-5 shadow-[0_12px_40px_rgba(121,82,255,0.15)] pointer-events-auto flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-ai-gradient-start filled text-[20px]">
              auto_awesome
            </span>
            <span className="font-title-md text-sm md:text-base font-bold text-on-surface">
              Ask AI to refine ranking
            </span>
          </div>

          {userPrefs.activeRefinementFilters?.styleModifier && (
            <span className="text-[11px] font-bold text-tertiary bg-tertiary-fixed px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Active: {userPrefs.activeRefinementFilters.styleModifier.replace('_', ' ')}
            </span>
          )}
        </div>

        {/* Quick Refinement Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {quickRefinements.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => askAiRefine(chip.value)}
              className="flex-shrink-0 border border-surface-variant bg-surface-container-lowest rounded-full px-3.5 py-1.5 font-label-bold text-xs text-on-surface hover:border-primary hover:text-primary transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Refinement Text Input */}
        <form onSubmit={handleSubmit} className="relative w-full">
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your refinement... e.g. 'remove anything over 4000' or 'focus on cotton'"
            className="w-full bg-surface-container-lowest border border-surface-variant rounded-full pl-5 pr-14 py-2.5 font-body-sm text-sm text-on-surface focus:border-tertiary focus:ring-2 focus:ring-tertiary/20 outline-none transition-all shadow-inner"
          />
          <button 
            type="submit"
            disabled={inputText.trim().length === 0}
            className={`absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-2 flex items-center justify-center transition-all ${
              inputText.trim().length > 0 
                ? 'ai-gradient-bg text-white hover:scale-105 cursor-pointer shadow-md' 
                : 'bg-surface-container-high text-secondary opacity-50 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
