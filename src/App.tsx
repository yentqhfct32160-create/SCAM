import React, { useState } from 'react';
import { Language } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ConsentModel } from './components/ConsentModel';
import { AlertExperience } from './components/AlertExperience';
import { ScamCoverage } from './components/ScamCoverage';
import { PrivacyGuarantees } from './components/PrivacyGuarantees';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { QuizModal } from './components/QuizModal';
import { EmergencyModal } from './components/EmergencyModal';
import { SignInModal } from './components/SignInModal';
import { AdvisorModal } from './components/AdvisorModal';
import { ConsentPledgeModal } from './components/ConsentPledgeModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Default to Vietnamese as the user prompted in Vietnamese, with smooth English switcher
  const [lang, setLang] = useState<Language>('vi');
  
  // Modals state
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isPledgeOpen, setIsPledgeOpen] = useState(false);

  // Reassurance toast when a threat is marked as handled
  const [handledToast, setHandledToast] = useState(false);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'vi' : 'en'));
  };

  const handleThreatHandled = () => {
    setHandledToast(true);
    setTimeout(() => {
      setHandledToast(false);
    }, 3000);
  };

  const scrollToAudit = () => {
    const inputElement = document.getElementById('threat-input');
    if (inputElement) {
      inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      inputElement.focus();
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Top Navigation Bar (Strict Top Bar Contract) */}
      <Header
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenSignIn={() => setIsSignInOpen(true)}
        onScrollToAudit={scrollToAudit}
      />

      <main className="flex-1">
        {/* 2. Hero Section with Live Threat Scanner (Screenshot 1 & 3) */}
        <Hero 
          lang={lang} 
          onThreatHandled={handleThreatHandled} 
        />

        {/* 3. Consent Model 3-Step Flow (Screenshot 2) */}
        <ConsentModel lang={lang} />

        {/* 4. Accessible Warning Hierarchy Experience (Screenshot 3) */}
        <AlertExperience lang={lang} />

        {/* 5. Broad Scam Coverage 2x2 Grid (Screenshot 4) */}
        <ScamCoverage lang={lang} />

        {/* 6. Privacy & Safety Guarantees (Screenshot 5) */}
        <PrivacyGuarantees lang={lang} />

        {/* 7. Honest Customer Reviews (Screenshot 6) */}
        <Testimonials lang={lang} />

        {/* 8. Frequently Asked Questions (Screenshot 7) */}
        <FAQ lang={lang} />

        {/* 9. Dark Navy Call-To-Action Banner (Screenshot 8) */}
        <CallToAction
          lang={lang}
          onGetStarted={scrollToAudit}
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
        />
      </main>

      {/* 10. Comprehensive Trust Footer (Screenshot 8) */}
      <Footer
        lang={lang}
        onOpenPrivacyPledge={() => setIsPledgeOpen(true)}
      />

      {/* Floating Handled Reassurance Notification */}
      {handledToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm animate-fade-in border border-slate-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            {lang === 'en'
              ? 'Threat neutralized & marked as handled! Great reflex.'
              : 'Đã xử lý an toàn nguy cơ lừa đảo! Bạn đã phản xạ rất tốt.'}
          </span>
        </div>
      )}

      {/* Modals */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        lang={lang}
      />

      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        lang={lang}
      />

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        lang={lang}
      />

      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        lang={lang}
      />

      <ConsentPledgeModal
        isOpen={isPledgeOpen}
        onClose={() => setIsPledgeOpen(false)}
        lang={lang}
      />
    </div>
  );
}
