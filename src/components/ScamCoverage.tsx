import React, { useState } from 'react';
import { Mail, PhoneCall, CreditCard, UserCheck, ChevronRight, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Language, ScamCategoryItem } from '../types';
import { SCAM_CATEGORIES } from '../data/scamDatabase';

interface ScamCoverageProps {
  lang: Language;
}

export const ScamCoverage: React.FC<ScamCoverageProps> = ({ lang }) => {
  const isEn = lang === 'en';
  const [activeCategory, setActiveCategory] = useState<ScamCategoryItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'mail':
        return <Mail className="w-5 h-5 text-blue-600" />;
      case 'phone':
        return <PhoneCall className="w-5 h-5 text-blue-600" />;
      case 'credit-card':
        return <CreditCard className="w-5 h-5 text-blue-600" />;
      case 'user':
      default:
        return <UserCheck className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="protected-scams" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto text-center space-y-4">
        {/* Kicker (Screenshot 4) */}
        <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">
          {isEn ? 'BROAD SCAM COVERAGE' : 'DANH MỤC NHẬN DIỆN MỞ RỘNG'}
        </p>

        {/* Section Headline (Screenshot 4) */}
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'What we identify for you' : 'Các hình thức lừa đảo AegisAlert nhận diện'}
        </h2>

        {/* 2x2 Grid of Cards (Screenshot 4) */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {SCAM_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className="p-6 sm:p-7 bg-white border border-slate-200/80 rounded-2xl hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer flex items-start gap-5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center shrink-0 group-hover:bg-blue-100/80 transition-colors">
                {getIcon(cat.iconName)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {isEn ? cat.titleEn : cat.titleVi}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {isEn ? cat.descEn : cat.descVi}
                </p>
                <div className="mt-3 text-xs font-semibold text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{isEn ? 'View red flags & prevention tips' : 'Xem dấu hiệu & cách phòng tránh'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Drawer when category is clicked */}
      {activeCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  {getIcon(activeCategory.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {isEn ? activeCategory.titleEn : activeCategory.titleVi}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isEn ? 'Threat Intelligence & Defensive Guidelines' : 'Cơ sở dữ liệu nhận diện & Hướng dẫn phòng vệ'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveCategory(null)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-6 text-sm">
              {/* Description */}
              <p className="text-slate-600 leading-relaxed">
                {isEn ? activeCategory.descEn : activeCategory.descVi}
              </p>

              {/* Red flags */}
              <div>
                <h4 className="font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>{isEn ? 'Common Tell-Tale Red Flags:' : 'Dấu hiệu nhận diện đặc trưng:'}</span>
                </h4>
                <ul className="space-y-2 text-slate-600">
                  {(isEn ? activeCategory.commonSignsEn : activeCategory.commonSignsVi).map((sign, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold shrink-0">•</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention tips */}
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>{isEn ? 'Defensive Action Checklist:' : 'Quy tắc tự vệ bắt buộc:'}</span>
                </h4>
                <ul className="space-y-1.5 text-blue-800 text-xs sm:text-sm">
                  {(isEn ? activeCategory.preventionTipsEn : activeCategory.preventionTipsVi).map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold shrink-0">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveCategory(null)}
                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
              >
                {isEn ? 'Close Details' : 'Đã hiểu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
