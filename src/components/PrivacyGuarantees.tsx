import React from 'react';
import { ShieldCheck, Lock, HeartHandshake } from 'lucide-react';
import { Language } from '../types';

interface PrivacyGuaranteesProps {
  lang: Language;
}

export const PrivacyGuarantees: React.FC<PrivacyGuaranteesProps> = ({ lang }) => {
  const isEn = lang === 'en';

  const guarantees = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      titleEn: 'Zero Data Preservation',
      titleVi: 'Không lưu giữ dữ liệu người dùng',
      descEn: 'Once analysis completes, submitted details are instantly cleared from standard RAM memory. We retain only anonymous metadata to keep our scam registry fresh.',
      descVi: 'Ngay khi phân tích xong, toàn bộ nội dung gửi lên sẽ được xóa sạch khỏi bộ nhớ RAM. Chúng tôi chỉ giữ lại mẫu băm ẩn danh để cập nhật kho dữ liệu phòng thủ.'
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-600" />,
      titleEn: 'No Passive Snooping',
      titleVi: 'Không theo dõi ngầm thụ động',
      descEn: 'We do not sell background trackers, extensions that watch everything you type, or passive network monitoring tools. You are always in control of what is audited.',
      descVi: 'Không phần mềm ngầm ghi lại bàn phím, không tiện ích quét trộm trình duyệt. Bạn luôn là người quyết định chính xác nội dung nào được kiểm tra.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-blue-600" />,
      titleEn: 'No Commercial Brokerage',
      titleVi: 'Không kinh doanh dữ liệu cá nhân',
      descEn: 'We make money strictly from user subscriptions. We never monetize, package, or sell consumer safety queries to advertising databases or risk brokers.',
      descVi: 'Chúng tôi hoạt động minh bạch từ tài trợ và gói nâng cao. Tuyệt đối không bao giờ đóng gói hay bán dữ liệu truy vấn của người dùng cho các bên quảng cáo.'
    }
  ];

  return (
    <section id="privacy" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        {/* Kicker (Screenshot 5) */}
        <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">
          {isEn ? 'PRIVACY & SAFETY GUARANTEES' : 'CAM KẾT BẢO MẬT BẰNG THIẾT KẾ KỸ THUẬT'}
        </p>

        {/* Section Headline (Screenshot 5) */}
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'Secured by technical design, not promises' : 'Bảo đảm an toàn bằng công nghệ, không bằng lời hứa suông'}
        </h2>

        {/* 3 Cards (Screenshot 5) */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {guarantees.map((item, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 bg-white border border-slate-200/80 rounded-2xl hover:border-slate-300 hover:shadow-xs transition-all flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100/60 flex items-center justify-center mb-6 shrink-0">
                {item.icon}
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
