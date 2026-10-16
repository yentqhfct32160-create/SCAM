import React, { useState } from 'react';
import { X, Headphones, CheckCircle2, Send, Shield } from 'lucide-react';
import { Language } from '../types';

interface AdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AdvisorModal: React.FC<AdvisorModalProps> = ({ isOpen, onClose, lang }) => {
  const isEn = lang === 'en';
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {isEn ? 'Cyber Safety Consultation' : 'Tư vấn An toàn Mạng'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEn ? 'Reach our incident response analysts' : 'Đội ngũ chuyên gia phản ứng sự cố'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">
              {isEn ? 'Inquiry Logged Securely' : 'Đã tiếp nhận yêu cầu tư vấn'}
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              {isEn
                ? 'An advisor will review the metadata and respond with actionable triage recommendations.'
                : 'Chuyên gia an toàn sẽ đối soát dữ liệu và gửi phản hồi định hướng xử lý sớm nhất.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-5 space-y-3.5 text-left text-xs sm:text-sm">
            <div>
              <label htmlFor="advisor-email" className="block font-semibold text-slate-700 mb-1">
                {isEn ? 'Your Contact Email' : 'Email liên hệ của bạn'}
              </label>
              <input
                id="advisor-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              />
            </div>

            <div>
              <label htmlFor="advisor-type" className="block font-semibold text-slate-700 mb-1">
                {isEn ? 'Type of Incident' : 'Hình thức rủi ro gặp phải'}
              </label>
              <select
                id="advisor-type"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              >
                <option value="">{isEn ? 'Select category...' : 'Chọn phân loại...'}</option>
                <option value="fake_bank">{isEn ? 'Fake Banking / Phishing' : 'Giả mạo ngân hàng / Đánh cắp OTP'}</option>
                <option value="impersonation">{isEn ? 'Police / Authority Impersonation' : 'Mạo danh cơ quan công an / thuế'}</option>
                <option value="fraud_transfer">{isEn ? 'Unauthorized Wire Transfer' : 'Đã lỡ chuyển khoản ngân hàng'}</option>
                <option value="crypto_ponzi">{isEn ? 'Telegram Investment Trap' : 'Bẫy đầu tư sàn ảo / việc làm online'}</option>
              </select>
            </div>

            <div>
              <label htmlFor="advisor-desc" className="block font-semibold text-slate-700 mb-1">
                {isEn ? 'Incident Details (Do not paste passwords/PINs)' : 'Chi tiết tình huống (Tuyệt đối KHÔNG gửi mật khẩu/PIN)'}
              </label>
              <textarea
                id="advisor-desc"
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={isEn ? 'Brief description of the suspicious message or situation...' : 'Mô tả ngắn gọn tin nhắn lạ hoặc nội dung bạn đang băn khoăn...'}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isEn ? 'Submit Consultation Request' : 'Gửi yêu cầu hỗ trợ'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
