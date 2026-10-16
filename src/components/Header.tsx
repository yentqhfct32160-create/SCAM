import React from 'react';
import { ShieldCheck, Globe, HelpCircle, AlertTriangle } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenQuiz: () => void;
  onOpenEmergency: () => void;
  onOpenSignIn: () => void;
  onScrollToAudit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenQuiz,
  onOpenEmergency,
  onOpenSignIn,
  onScrollToAudit,
}) => {
  const isEn = lang === 'en';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-slate-900 group whitespace-nowrap shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
            <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            AegisAlert
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors whitespace-nowrap">
            {isEn ? 'How it works' : 'Cách hoạt động'}
          </a>
          <a href="#protected-scams" className="hover:text-blue-600 transition-colors whitespace-nowrap">
            {isEn ? 'Protected Scams' : 'Dạng lừa đảo'}
          </a>
          <a href="#alert-experience" className="hover:text-blue-600 transition-colors whitespace-nowrap">
            {isEn ? 'Alert Experience' : 'Trải nghiệm cảnh báo'}
          </a>
          <button 
            onClick={onOpenQuiz} 
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <span>{isEn ? 'Spot the Scam' : 'Thử tài nhận diện'}</span>
          </button>
          <a href="#privacy" className="hover:text-blue-600 transition-colors whitespace-nowrap">
            {isEn ? 'Privacy Policy' : 'Chính sách bảo mật'}
          </a>
          <a href="#faq" className="hover:text-blue-600 transition-colors whitespace-nowrap">
            {isEn ? 'FAQ' : 'Hỏi & Đáp'}
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Emergency Guide button */}
          <button
            onClick={onOpenEmergency}
            title={isEn ? 'Emergency incident assistance' : 'Hướng dẫn khẩn cấp khi đã lỡ chuyển tiền'}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>{isEn ? 'Emergency Help' : 'Hỗ trợ khẩn cấp'}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200/80 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{isEn ? 'VI 🇻🇳' : 'EN 🇺🇸'}</span>
          </button>

          {/* Sign In */}
          <button
            onClick={onOpenSignIn}
            className="hidden md:inline-block text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors px-2 py-1.5 cursor-pointer whitespace-nowrap"
          >
            {isEn ? 'Sign In' : 'Đăng nhập'}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onScrollToAudit}
            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm shadow-blue-500/20 transition-all cursor-pointer whitespace-nowrap"
          >
            {isEn ? 'Free Threat Check' : 'Kiểm tra rủi ro'}
          </button>
        </div>
      </div>
    </header>
  );
};
