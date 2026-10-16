import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, Trash2 } from 'lucide-react';
import { Language } from '../types';

interface ConsentPledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ConsentPledgeModal: React.FC<ConsentPledgeModalProps> = ({ isOpen, onClose, lang }) => {
  const isEn = lang === 'en';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {isEn ? 'The AegisAlert Consent Pledge' : 'Cam kết Đồng thuận AegisAlert'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="flex items-start gap-3">
            <EyeOff className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">{isEn ? '1. No Passive Monitoring: ' : '1. Không giám sát ngầm: '}</strong>
              {isEn 
                ? 'We never inspect unsubmitted browser tabs, keyboard keystrokes, or background traffic.'
                : 'Chúng tôi không bao giờ quét các tab trình duyệt khác, không theo dõi thao tác phím hay lưu lượng mạng ngầm.'}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Trash2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">{isEn ? '2. Immediate Ephemeral Destruction: ' : '2. Giải phóng bộ nhớ tức thì: '}</strong>
              {isEn 
                ? 'Raw text payloads, phone numbers, and recipient addresses are cleared from memory upon completing risk scoring.'
                : 'Toàn bộ nội dung văn bản, số điện thoại hay liên kết được xóa hoàn toàn khỏi bộ nhớ RAM ngay sau khi hiển thị kết quả.'}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">{isEn ? '3. Anti-Alarmist Communication: ' : '3. Cảnh báo điềm tĩnh, không gieo rắc sợ hãi: '}</strong>
              {isEn 
                ? 'We reject screaming countdown popups that induce panic, delivering objective analysis and clear next steps.'
                : 'Chúng tôi kiên quyết không dùng popup nhấp nháy đỏ hay đồng hồ đếm ngược hù dọa, mà chỉ cung cấp phân tích khách quan và hướng dẫn tự chủ.'}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
          >
            {isEn ? 'Understood' : 'Đã hiểu'}
          </button>
        </div>
      </div>
    </div>
  );
};
