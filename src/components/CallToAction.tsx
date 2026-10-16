import React from 'react';
import { ShieldCheck, Headphones } from 'lucide-react';
import { Language } from '../types';

interface CallToActionProps {
  lang: Language;
  onGetStarted: () => void;
  onOpenAdvisor: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  lang,
  onGetStarted,
  onOpenAdvisor
}) => {
  const isEn = lang === 'en';

  return (
    <section className="bg-[#0B132B] text-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-5">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance text-white">
          {isEn ? 'Stop guessing, start verifying safely' : 'Ngừng hoang mang, bắt đầu kiểm chứng an toàn'}
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal text-balance">
          {isEn
            ? 'Protect yourself and your family with clear, calm alerts. Sign up for a free audit check today.'
            : 'Bảo vệ bản thân và gia đình trước mọi chiêu trò gian lận bằng cảnh báo điềm tĩnh và rõ ràng. Bắt đầu kiểm tra miễn phí ngay hôm nay.'}
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-lg shadow-blue-500/25 transition-all cursor-pointer whitespace-nowrap"
          >
            <ShieldCheck className="w-5 h-5 mr-2" />
            <span>{isEn ? 'Get Started Free' : 'Bắt đầu miễn phí'}</span>
          </button>

          <button
            onClick={onOpenAdvisor}
            className="inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-900 bg-white hover:bg-slate-100 active:bg-slate-200 rounded-xl transition-all cursor-pointer whitespace-nowrap"
          >
            <Headphones className="w-5 h-5 mr-2 text-slate-700" />
            <span>{isEn ? 'Speak to Safety Advisors' : 'Tư vấn cùng chuyên gia'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
