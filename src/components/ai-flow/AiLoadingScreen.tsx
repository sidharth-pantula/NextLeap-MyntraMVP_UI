import React from 'react';
import { useApp } from '../../context/AppContext';

export const AiLoadingScreen: React.FC = () => {
  const { wishlistProducts, userPrefs } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl p-6 font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-tertiary/20 rounded-full blur-[120px] pointer-events-none animate-pulse-subtle"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none animate-pulse-subtle"></div>

      <div className="relative z-10 flex flex-col items-center max-w-md text-center">
        {/* Animated AI Orb Container */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-8">
          {/* Outer rotating gradient ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-ai-gradient-start via-primary to-ai-gradient-start p-1 animate-spin-slow opacity-80 blur-[2px]"></div>
          
          {/* Inner frosted sphere */}
          <div className="relative w-28 h-28 rounded-full bg-white/90 backdrop-blur-md shadow-2xl flex items-center justify-center border border-white">
            <span className="material-symbols-outlined text-4xl text-tertiary animate-pulse filled">
              auto_awesome
            </span>
          </div>

          {/* Orbiting particles */}
          <div className="absolute -top-1 right-2 w-3 h-3 rounded-full bg-primary animate-ping"></div>
          <div className="absolute -bottom-1 left-2 w-3.5 h-3.5 rounded-full bg-tertiary animate-ping delay-300"></div>
        </div>

        {/* Loading Headings */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-[14px]">psychology</span>
          <span>Adaptive Ranking Engine</span>
        </div>

        <h2 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface mb-2 ai-gradient-text">
          Evaluating Top 10 Matches
        </h2>

        <p className="font-body-lg text-secondary text-sm md:text-base mb-6">
          Scoring <span className="font-bold text-on-surface">{wishlistProducts.length} saved items</span> across {userPrefs.need || 'your need'}, buying signals, price drops, and style affinities...
        </p>

        {/* Shimmer Progress Bar */}
        <div className="w-64 h-2 bg-surface-container rounded-full overflow-hidden relative shadow-inner">
          <div className="h-full bg-gradient-to-r from-ai-gradient-start to-ai-gradient-end w-full animate-pulse"></div>
        </div>

        <span className="text-[11px] text-secondary mt-3 tracking-wide">
          Generating match reasons & final rankings
        </span>
      </div>
    </div>
  );
};
