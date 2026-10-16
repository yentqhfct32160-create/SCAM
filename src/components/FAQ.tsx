import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { FAQS } from '../data/scamDatabase';

interface FAQProps {
  lang: Language;
}

export const FAQ: React.FC<FAQProps> = ({ lang }) => {
  const isEn = lang === 'en';
  // Open the first 3 by default or allow toggling
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1, 2]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="text-center">
          {/* Kicker (Screenshot 7) */}
          <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">
            {isEn ? 'COMMON QUESTIONS' : 'GIẢI ĐÁP THẮC MẮC PHỔ BIẾN'}
          </p>

          {/* Section Headline (Screenshot 7) */}
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            {isEn ? 'Frequently Asked Questions' : 'Câu hỏi thường gặp'}
          </h2>
        </div>

        {/* FAQ List (Screenshot 7) */}
        <div className="pt-8 border-t border-slate-200 divide-y divide-slate-150">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                >
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors pr-4">
                    {isEn ? faq.questionEn : faq.questionVi}
                  </h3>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 text-slate-400 group-hover:text-blue-600 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3.5 pr-8 animate-fade-in">
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {isEn ? faq.answerEn : faq.answerVi}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
