import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { WishlistScreen } from './components/WishlistScreen';
import { PdpScreen } from './components/PdpScreen';
import { BagDrawer } from './components/BagDrawer';
import { AiIntentModal } from './components/ai-flow/AiIntentModal';
import { AdaptiveSurveyScreen } from './components/ai-flow/AdaptiveSurveyScreen';
import { AiLoadingScreen } from './components/ai-flow/AiLoadingScreen';
import { BestMatchesScreen } from './components/ai-flow/BestMatchesScreen';
import { PrioritizedGridScreen } from './components/ai-flow/PrioritizedGridScreen';

const MainRouter: React.FC = () => {
  const { currentView } = useApp();

  switch (currentView) {
    case 'home':
      return <HomeScreen />;
    case 'wishlist':
      return <WishlistScreen />;
    case 'best-matches':
      return <BestMatchesScreen />;
    case 'prioritized-grid':
      return <PrioritizedGridScreen />;
    case 'pdp':
      return <PdpScreen />;
    case 'ai-adaptive-survey':
      return <AdaptiveSurveyScreen />;
    default:
      return <HomeScreen />;
  }
};

const AppContent: React.FC = () => {
  const { currentView, toastMessage } = useApp();

  const isFullscreenAiStep = currentView === 'ai-adaptive-survey';

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary-container selection:text-white">
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-inverse-surface text-on-primary px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-white/20 animate-bounce">
          <span className="material-symbols-outlined text-primary text-[20px] filled">info</span>
          <span className="text-body-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Header (Hidden on Fullscreen Stepper) */}
      {!isFullscreenAiStep && <Header />}

      {/* Main Content Viewport */}
      <main className={`flex-grow ${!isFullscreenAiStep ? 'pt-20 md:pt-24 max-w-[1280px] mx-auto px-4 md:px-10 w-full pb-12' : ''}`}>
        <MainRouter />
      </main>

      {/* AI Intent Modal Overlay */}
      {currentView === 'ai-intent' && <AiIntentModal />}

      {/* AI Loading Screen Overlay */}
      {currentView === 'ai-loading' && <AiLoadingScreen />}

      {/* Shopping Bag Slide-over Drawer */}
      <BagDrawer />

      {/* Global Footer (Hidden on Fullscreen Stepper) */}
      {!isFullscreenAiStep && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
