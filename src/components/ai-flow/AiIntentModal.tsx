import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AiIntentModal: React.FC = () => {
  const { submitIntent, setCurrentView } = useApp();
  const [inputText, setInputText] = useState<string>('');

  const quickChips = [
    { label: 'Wedding', prompt: "I need an elegant outfit for my friend's wedding" },
    { label: 'Vacation', prompt: "Looking for casual summer dresses for a beach vacation under ₹2,000" },
    { label: 'Work', prompt: "Minimal formal office wear and blazers" },
    { label: 'Party', prompt: "Trendy cocktail party dresses and heels" },
    { label: 'Birthday / Gift', prompt: "A stylish ethnic gift set under ₹3,000" },
    { label: 'Festive', prompt: "Traditional silk lehenga or kurta for Diwali" },
  ];

  const handleChipClick = (prompt: string) => {
    setInputText(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim().length > 0) {
      submitIntent(inputText.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-tertiary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl border border-tertiary-fixed-dim rounded-2xl p-6 md:p-10 shadow-[0_16px_48px_rgba(121,82,255,0.12)] my-8 z-10">
        {/* Close button */}
        <button 
          onClick={() => setCurrentView('wishlist')}
          className="absolute top-4 right-4 p-2 text-secondary hover:text-on-surface rounded-full hover:bg-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-surface-container-low rounded-full px-3 py-1 mb-3 shadow-sm border border-tertiary-fixed-dim">
            <span className="material-symbols-outlined text-tertiary mr-1 text-[16px]">auto_awesome</span>
            <span className="font-label-bold text-xs ai-gradient-text uppercase tracking-widest font-bold">AI Stylist</span>
          </div>
          <h1 className="font-headline-lg text-2xl md:text-3xl text-on-background font-extrabold mb-1">
            Prioritise your wishlist
          </h1>
          <p className="font-body-lg text-secondary text-sm md:text-base">
            What are you shopping for? Tell us what you need right now.
          </p>
        </div>

        {/* Form & Input Area */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="relative">
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value.slice(0, 150))}
                rows={3}
                placeholder="e.g. I need something elegant for a wedding under ₹5,000..."
                className="w-full bg-surface-container-lowest border border-surface-variant rounded-xl p-4 font-body-lg text-sm md:text-base text-on-background placeholder:text-secondary/60 focus:border-tertiary focus:ring-2 focus:ring-tertiary/20 transition-all resize-none shadow-inner outline-none"
              />
              <button 
                type="button"
                onClick={() => setInputText("I need an elegant outfit for my friend's wedding under ₹8,000")}
                title="Use sample voice input"
                className="absolute bottom-3 right-3 bg-surface-container hover:bg-surface-variant rounded-full p-2 transition-colors text-tertiary hover:scale-110"
              >
                <span className="material-symbols-outlined text-[18px]">mic</span>
              </button>
            </div>
            <div className="flex justify-between items-center mt-1.5 px-1">
              <span className="text-[11px] text-secondary">Be as specific as you like (occasion, budget, style)</span>
              <span className="text-[11px] text-secondary font-medium">{inputText.length}/150 characters</span>
            </div>
          </div>

          {/* Suggestions Section */}
          <div className="mb-8">
            <h3 className="font-label-bold text-[11px] text-secondary uppercase tracking-widest mb-3 font-bold">
              Quick Suggestions
            </h3>
            <div className="flex flex-wrap gap-2">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChipClick(chip.prompt)}
                  className="px-3.5 py-1.5 rounded-full border border-surface-variant bg-surface-container-lowest hover:border-tertiary hover:bg-surface-container-low font-body-sm text-xs text-on-surface-variant transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button 
            type="submit"
            disabled={inputText.trim().length === 0}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-title-md text-sm md:text-base font-bold transition-all duration-300 shadow-md ${
              inputText.trim().length > 0
                ? 'ai-gradient-bg text-white hover:opacity-95 cursor-pointer hover:scale-[1.01] active:scale-95 shadow-tertiary/20'
                : 'bg-surface-variant text-secondary opacity-60 cursor-not-allowed'
            }`}
          >
            <span>Continue</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

        <p className="text-center font-body-sm text-xs text-secondary mt-4">
          Our AI analyzes only your saved wishlist items to find the best match for your need.
        </p>
      </div>
    </div>
  );
};
