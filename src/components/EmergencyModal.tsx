import React, { useState } from 'react';
import { X, PhoneCall, AlertTriangle, ShieldAlert, Check, Copy, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { EMERGENCY_CONTACTS } from '../data/scamDatabase';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose, lang }) => {
  const isEn = lang === 'en';
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const emergencySteps = [
    {
      timeframeEn: 'Within 0 - 15 Minutes',
      timeframeVi: 'Trong vòng 0 - 15 phút đầu',
      titleEn: 'Immediate Credential Freeze',
      titleVi: 'Khóa thẻ và đóng băng tài khoản ngay lập tức',
      descEn: 'Open your bank official mobile app, navigate to Card Management, and toggle "Lock Card". Lower your daily online transfer limit to 0 VND.',
      descVi: 'Mở app ngân hàng chính chủ trên điện thoại, vào mục Quản lý thẻ và bấm "Khóa thẻ khẩn cấp". Hạ hạn mức giao dịch trực tuyến ngày về 0 đồng.'
    },
    {
      timeframeEn: 'Within 15 - 60 Minutes',
      timeframeVi: 'Trong vòng 15 - 60 phút',
      titleEn: 'Call Bank 24/7 Hotline & Halt Transfers',
      titleVi: 'Gọi hotline ngân hàng yêu cầu tra soát giao dịch',
      descEn: 'Call your bank 24/7 hotline. State clearly: "I was defrauded via phishing. Please log a trace and request an emergency recall to the receiving bank."',
      descVi: 'Gọi ngay tổng đài 24/7 của ngân hàng. Nêu rõ: "Tôi vừa bị lừa đảo giao dịch trực tuyến, đề nghị ngân hàng tra soát khẩn cấp và gửi điện phong tỏa tài khoản thụ hưởng."'
    },
    {
      timeframeEn: 'Within 1 - 24 Hours',
      timeframeVi: 'Trong vòng 1 - 24 giờ',
      titleEn: 'Preserve Evidence & File Police Report',
      titleVi: 'Lưu giữ bằng chứng và trình báo cơ quan chức năng',
      descEn: 'Do not delete the chat log. Take full-page screenshots showing sender number, transaction ID, bank accounts, and file a formal report with local police.',
      descVi: 'Không xóa tin nhắn hay lịch sử chat. Chụp toàn bộ ảnh màn hình số điện thoại đối tượng, biên lai giao dịch, STK nhận tiền và gửi đơn tố giác tội phạm tới cơ quan Công an.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-amber-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {isEn ? 'Emergency Incident Response Protocol' : 'Kế hoạch ứng phó khẩn cấp khi bị lừa đảo'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEn ? 'Action checklist if you clicked a link or transferred funds' : 'Quy trình xử lý nhanh nếu đã lỡ click vào link lạ hoặc chuyển tiền'}
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

        {/* 3 Step Protocol */}
        <div className="py-5 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {isEn ? 'Sequential Action Plan:' : 'Các bước hành động theo thứ tự ưu tiên:'}
          </h4>

          <div className="space-y-3">
            {emergencySteps.map((step, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold text-amber-800 mb-1">
                  <span>{isEn ? step.timeframeEn : step.timeframeVi}</span>
                  <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-900 mb-1">
                  {isEn ? step.titleEn : step.titleVi}
                </h5>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {isEn ? step.descEn : step.descVi}
                </p>
              </div>
            ))}
          </div>

          {/* Directory of Emergency Contacts */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              {isEn ? 'Official Anti-Fraud Hotlines & Portals:' : 'Đường dây nóng hỗ trợ & tiếp nhận phản ánh:'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EMERGENCY_CONTACTS.map((contact, idx) => (
                <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-slate-900 truncate">{contact.name}</p>
                    <p className="text-slate-500 text-[11px] truncate">{contact.scope}</p>
                  </div>

                  {contact.phone ? (
                    <button
                      onClick={() => handleCopy(contact.phone)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 font-mono font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors cursor-pointer shrink-0"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>{contact.phone}</span>
                      {copiedPhone === contact.phone ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
                    </button>
                  ) : contact.website ? (
                    <a
                      href={contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors shrink-0"
                    >
                      <span>Web</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            {isEn ? 'Close' : 'Đóng hướng dẫn'}
          </button>
        </div>
      </div>
    </div>
  );
};
