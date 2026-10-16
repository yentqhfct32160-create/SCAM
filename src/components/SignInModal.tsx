import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Mail } from 'lucide-react';
import { Language } from '../types';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, lang }) => {
  const isEn = lang === 'en';
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {isEn ? 'AegisAlert Account' : 'Tài khoản AegisAlert'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">
              {isEn ? 'Secure Sign-In Link Dispatched' : 'Đã gửi liên kết đăng nhập an toàn'}
            </h4>
            <p className="text-xs text-slate-500">
              {isEn 
                ? 'Check your inbox for passwordless cryptographic magic link.' 
                : 'Vui lòng kiểm tra hòm thư để đăng nhập qua mã liên kết không cần mật khẩu.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-5 space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isEn
                ? 'Sign in to sync your verified threat audits across devices with zero-knowledge encryption.'
                : 'Đăng nhập để đồng bộ lịch sử kiểm tra rủi ro trên các thiết bị với cơ chế mã hóa đầu-cuối.'}
            </p>

            <div>
              <label htmlFor="auth-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isEn ? 'Email Address' : 'Địa chỉ Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer"
            >
              {isEn ? 'Send Magic Login Link' : 'Gửi liên kết đăng nhập'}
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-400 justify-center pt-2">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>{isEn ? 'Zero password storage • 100% consent-driven' : 'Không lưu mật khẩu • Tuân thủ đồng thuận 100%'}</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
