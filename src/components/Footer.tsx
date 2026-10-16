import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  onOpenPrivacyPledge: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenPrivacyPledge }) => {
  const isEn = lang === 'en';

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12 pb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5 text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                AegisAlert
              </span>
            </a>

            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              {isEn
                ? 'Providing clear, calm cybersecurity risk intelligence to consumers without backgrounds tracking or fearmongering tactics.'
                : 'Cung cấp thông tin cảnh báo an ninh mạng minh bạch, điềm tĩnh cho người dùng mà không theo dõi ngầm hay sử dụng chiêu trò hù dọa.'}
            </p>
          </div>

          {/* Product Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {isEn ? 'Product' : 'Sản phẩm'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#threat-input" className="hover:text-blue-600 transition-colors">
                  {isEn ? 'Url Audit' : 'Kiểm tra đường link'}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
                  {isEn ? 'Inbox Sync' : 'Đồng bộ hòm thư'}
                </a>
              </li>
              <li>
                <a href="#alert-experience" className="hover:text-blue-600 transition-colors">
                  {isEn ? 'Safe Steps' : 'Quy trình tự vệ'}
                </a>
              </li>
              <li>
                <a href="#protected-scams" className="hover:text-blue-600 transition-colors">
                  {isEn ? 'Scam Database' : 'Cơ sở dữ liệu lừa đảo'}
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & Privacy Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {isEn ? 'Trust & Privacy' : 'Bảo mật & Niềm tin'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={onOpenPrivacyPledge}
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  {isEn ? 'Consent Pledge' : 'Cam kết đồng thuận'}
                </button>
              </li>
              <li>
                <a href="#privacy" className="hover:text-blue-600 transition-colors">
                  {isEn ? 'Encryption Specs' : 'Chuẩn mã hóa AES-256'}
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-blue-600 transition-colors">
                  {isEn ? 'Data Security' : 'An toàn dữ liệu'}
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-blue-600 transition-colors">
                  {isEn ? 'Safe Audit Standards' : 'Tiêu chuẩn kiểm định an toàn'}
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              {isEn ? 'Company' : 'Tổ chức'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#faq" className="hover:text-blue-600 transition-colors">
                  {isEn ? 'Safety Blog' : 'Cẩm nang an toàn'}
                </a>
              </li>
              <li>
                <a href="mailto:support@aegisalert.org" className="hover:text-blue-600 transition-colors">
                  {isEn ? 'Press Inquiries' : 'Liên hệ báo chí'}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
                  {isEn ? 'Security Team' : 'Đội ngũ chuyên gia'}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  {isEn ? 'Careers' : 'Cơ hội nghề nghiệp'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar (Screenshot 8) */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AegisAlert Inc. {isEn ? 'All rights reserved.' : 'Bản quyền đã được bảo hộ.'}</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#privacy" className="hover:text-slate-900 transition-colors">
              {isEn ? 'Privacy Policy' : 'Chính sách bảo mật'}
            </a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">
              {isEn ? 'Terms of Use' : 'Điều khoản sử dụng'}
            </a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">
              {isEn ? 'Regulatory Disclosures' : 'Công bố pháp lý'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
