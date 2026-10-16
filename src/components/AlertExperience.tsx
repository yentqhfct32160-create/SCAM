import React, { useState } from 'react';
import { ShieldCheck, Mail, Phone, Building2, ShieldAlert } from 'lucide-react';
import { Language, AuditResult } from '../types';
import { PRESET_SAMPLES } from '../data/scamDatabase';
import { analyzeThreatQuery } from '../utils/analyzer';
import { AuditResultCard } from './AuditResultCard';

interface AlertExperienceProps {
  lang: Language;
}

export const AlertExperience: React.FC<AlertExperienceProps> = ({ lang }) => {
  const isEn = lang === 'en';
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);

  const currentResult: AuditResult = analyzeThreatQuery(
    PRESET_SAMPLES[selectedSampleIndex].query,
    lang
  );

  return (
    <section id="alert-experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-5xl mx-auto text-center space-y-4">
        {/* Kicker (Screenshot 3) */}
        <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">
          {isEn ? 'ACCESSIBLE WARNING HIERARCHY' : 'PHÂN CẤP CẢNH BÁO MINH BẠCH & DỄ TIẾP CẬN'}
        </p>

        {/* Section Headline (Screenshot 3) */}
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
          {isEn ? 'Calm alerts that point the way forward' : 'Cảnh báo bình tĩnh chỉ dẫn hướng đi an toàn'}
        </h2>

        {/* Subtitle (Screenshot 3) */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
          {isEn 
            ? 'We replace screaming red warning popups with clear, easy-to-understand breakdowns that help you take control without panic.'
            : 'Thay vì những popup cảnh báo đỏ chói lóa gây hoảng loạn, AegisAlert mang lại phân tích cấu trúc rõ ràng, giải thích cặn kẽ và các bước tự chủ không sợ hãi.'}
        </p>

        {/* Interactive Scenario Switcher */}
        <div className="pt-6 pb-2 flex flex-wrap items-center justify-center gap-2">
          {PRESET_SAMPLES.map((sample, idx) => {
            const isSelected = selectedSampleIndex === idx;
            return (
              <button
                key={sample.id}
                onClick={() => setSelectedSampleIndex(idx)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {isEn ? sample.labelEn : sample.labelVi}
              </button>
            );
          })}
        </div>

        {/* Live Alert Showcase Card (Screenshot 3) */}
        <div className="pt-4 text-left">
          <AuditResultCard 
            result={currentResult} 
            lang={lang} 
            isStandalone={true}
          />
        </div>
      </div>
    </section>
  );
};
