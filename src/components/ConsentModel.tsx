import React from 'react';
import { Language } from '../types';

interface ConsentModelProps {
  lang: Language;
}

export const ConsentModel: React.FC<ConsentModelProps> = ({ lang }) => {
  const isEn = lang === 'en';

  const steps = [
    {
      num: 1,
      titleEn: 'You Choose What to Connect',
      titleVi: 'Chủ động lựa chọn nội dung kiểm tra',
      descEn: 'Explicitly connect your inbox, upload a suspicious screenshot, or paste a link. We never passively scan or track your private activity.',
      descVi: 'Chỉ phân tích khi bạn chủ động gửi link, dán nội dung hoặc tải ảnh chụp tin nhắn. Tuyệt đối không có hành vi theo dõi ngầm hay đọc trộm dữ liệu cá nhân.'
    },
    {
      num: 2,
      titleEn: 'Consent-Driven Analysis',
      titleVi: 'Phân tích dựa trên sự đồng thuận',
      descEn: 'Our secure platform parses metadata against our global threat registry to identify pattern matching, domain age, and scam history.',
      descVi: 'Hệ thống an ninh trích xuất siêu dữ liệu, đối soát với danh sách đen toàn cầu, kiểm tra tuổi đời tên miền và lịch sử lừa đảo kỹ thuật số.'
    },
    {
      num: 3,
      titleEn: 'Clear, Actionable Alerts',
      titleVi: 'Cảnh báo bình tĩnh, hành động tức thì',
      descEn: 'If something is wrong, we send a calm, structured alert. No alarmist language—just a clear explanation and instant recovery steps.',
      descVi: 'Khi phát hiện nguy cơ, hệ thống gửi cảnh báo có cấu trúc mạch lạc, không hù dọa hoảng loạn, kèm kế hoạch ứng phó từng bước rõ ràng.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        {/* Kicker (Screenshot 2) */}
        <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">
          {isEn ? 'DESIGNED FOR CLARITY & PRIVACY' : 'THIẾT KẾ CHO SỰ MINH BẠCH & BẢO MẬT'}
        </p>

        {/* Section Headline (Screenshot 2) */}
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'A cyber-safety model built on strict consent' : 'Mô hình an toàn mạng xây dựng trên sự cho phép'}
        </h2>

        {/* 3 Numbered Cards (Screenshot 2) */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {steps.map((item) => (
            <div
              key={item.num}
              className="p-7 sm:p-8 bg-white border border-slate-200/80 rounded-2xl hover:border-slate-300 hover:shadow-xs transition-all flex flex-col"
            >
              <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center mb-6 shrink-0">
                {item.num}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">
                {isEn ? item.titleEn : item.titleVi}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {isEn ? item.descEn : item.descVi}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
