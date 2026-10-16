import React from 'react';
import { Language } from '../types';

interface TestimonialsProps {
  lang: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ lang }) => {
  const isEn = lang === 'en';

  const reviews = [
    {
      quoteEn: "AegisAlert caught a fake USPS shipment text that looked identical to the real tracking notices. The calm breakdown explaining exactly why it was fraudulent saved me from entering my credit card.",
      quoteVi: "AegisAlert đã phát hiện tin nhắn giả mạo giao hàng bưu điện giống hệt thông báo thật. Lời phân tích điềm đạm giải thích rõ lý do lừa đảo đã giúp tôi kịp dừng lại trước khi nhập thẻ thanh toán.",
      author: "Marcus K.",
      roleEn: "Technical Lead",
      roleVi: "Trưởng nhóm Kỹ thuật"
    },
    {
      quoteEn: "I set this up for my elderly parents. They forward suspicious billing emails directly to Aegis, and get an instant, non-frightening 'safe to ignore' notice back.",
      quoteVi: "Tôi đã hướng dẫn cho bố mẹ sử dụng AegisAlert. Mỗi khi nhận email lạ đòi tiền điện hay cước phí, ông bà chỉ cần kiểm tra là nhận được thông báo 'an tâm bỏ qua' mà không hề hoảng sợ.",
      author: "Clara S.",
      roleEn: "Caregiver & Architect",
      roleVi: "Kiến trúc sư & Người chăm sóc gia đình"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto text-center space-y-4">
        {/* Section Headline (Screenshot 6) */}
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'Backed by simple, honest customer reviews' : 'Đánh giá chân thực từ những người dùng an tâm'}
        </h2>

        {/* 2 Testimonial Cards (Screenshot 6) */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 bg-slate-50/70 border border-slate-200/80 rounded-2xl flex flex-col justify-between"
            >
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal mb-6">
                "{isEn ? rev.quoteEn : rev.quoteVi}"
              </p>

              <div className="text-xs sm:text-sm font-semibold text-blue-600">
                — {rev.author}, <span className="font-medium text-slate-500">{isEn ? rev.roleEn : rev.roleVi}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
