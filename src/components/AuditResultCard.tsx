import React, { useState } from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  Check, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { AuditResult, Language } from '../types';

interface AuditResultCardProps {
  result: AuditResult;
  lang: Language;
  onClear?: () => void;
  onMarkHandled?: () => void;
  isStandalone?: boolean;
}

export const AuditResultCard: React.FC<AuditResultCardProps> = ({
  result,
  lang,
  onClear,
  onMarkHandled,
  isStandalone = false
}) => {
  const isEn = lang === 'en';
  const [isHandled, setIsHandled] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [copiedReply, setCopiedReply] = useState(false);

  const isSafe = result.threatLevel === 'LEGITIMATE_SAFE';

  const handleMark = () => {
    setIsHandled(true);
    if (onMarkHandled) onMarkHandled();
  };

  const handleDelete = () => {
    setIsDeleted(true);
    setTimeout(() => {
      if (onClear) onClear();
      setIsDeleted(false);
    }, 1200);
  };

  const handleCopyReply = () => {
    const replyText = result.recommendedReply || (isEn 
      ? 'I do not process financial requests or verify links over SMS/email. Please send official correspondence via certified post.'
      : 'Tôi không thực hiện giao dịch hay bấm vào đường link qua tin nhắn/email. Vui lòng liên hệ qua văn bản hoặc kênh làm việc chính thức.');
    
    navigator.clipboard.writeText(replyText);
    setCopiedReply(true);
    setTimeout(() => setCopiedReply(false), 2000);
  };

  if (isDeleted) {
    return (
      <div className="w-full max-w-3xl mx-auto p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center animate-fade-in">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <Trash2 className="w-6 h-6" />
        </div>
        <h4 className="text-base font-semibold text-slate-900 mb-1">
          {isEn ? 'Submission Safely Cleared' : 'Đã xóa an toàn thông tin'}
        </h4>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          {isEn 
            ? 'All analyzed payload and metadata have been purged from volatile RAM. Zero residual data is stored.'
            : 'Toàn bộ nội dung và dữ liệu tạm thời đã được giải phóng khỏi bộ nhớ RAM. Không có dữ liệu nào bị lưu trữ.'}
        </p>
      </div>
    );
  }

  return (
    <div 
      className={`w-full max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
        isSafe 
          ? 'border border-emerald-400/90 shadow-sm' 
          : 'border border-amber-300 shadow-sm'
      }`}
    >
      {/* 1. Header Alert Banner (Exact Match to Screenshot 3) */}
      <div 
        className={`px-5 sm:px-6 py-4 flex items-start sm:items-center gap-3.5 ${
          isSafe ? 'bg-emerald-50/90 text-emerald-900' : 'bg-[#FEF3C7] text-amber-950'
        }`}
      >
        <div className="shrink-0 mt-0.5 sm:mt-0">
          {isSafe ? (
            <ShieldCheck className="w-5 h-5 text-emerald-600 stroke-[2.2]" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-600 stroke-[2.2]" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className={`text-xs sm:text-sm font-bold tracking-wide uppercase ${isSafe ? 'text-emerald-800' : 'text-amber-800'}`}>
              {result.badgeTitle}
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${isSafe ? 'text-emerald-700' : 'text-amber-700'}`}>
            {result.badgeSubtitle}
          </p>
        </div>
        {isHandled && (
          <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
            <Check className="w-3.5 h-3.5" />
            {isEn ? 'Handled' : 'Đã xử lý'}
          </span>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-7 space-y-6">
        {/* Section: Why we flagged this message */}
        <div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-3.5 flex items-center justify-between">
            <span>{isSafe ? (isEn ? 'Why this was verified:' : 'Lý do được xác thực an toàn:') : (isEn ? 'Why we flagged this message:' : 'Lý do hệ thống cảnh báo tin nhắn này:')}</span>
            <span className="text-xs font-medium text-slate-400 tabular-nums">
              {isEn ? `Confidence: ${result.confidenceScore}%` : `Độ tin cậy: ${result.confidenceScore}%`}
            </span>
          </h4>

          <div className="space-y-3">
            {result.whyFlagged.map((flag, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                <div className="shrink-0 mt-0.5">
                  {isSafe ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                  )}
                </div>
                <div>
                  <span className="font-semibold text-slate-900">{flag.title}: </span>
                  <span className="leading-relaxed">{flag.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hairline Divider */}
        <hr className="border-t border-slate-100" />

        {/* Section: Your safe response plan */}
        <div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-3.5">
            {isEn ? 'Your safe response plan:' : 'Kế hoạch xử lý an toàn dành cho bạn:'}
          </h4>

          <ol className="space-y-2.5 text-sm text-slate-600">
            {result.safeResponsePlan.map((step) => (
              <li key={step.step} className="flex items-start gap-2.5">
                <span className="font-bold text-slate-900 tabular-nums shrink-0">
                  {step.step}.
                </span>
                <div>
                  <span className="font-semibold text-slate-900">{step.actionTitle}: </span>
                  <span className="leading-relaxed">{step.actionDesc}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Optional: Official Channel link */}
        {result.officialChannel && (
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="truncate">
              <span className="text-slate-500">{isEn ? 'Verified official portal: ' : 'Trang chủ chính thức đã kiểm định: '}</span>
              <span className="font-semibold text-slate-900">{result.officialChannel.name}</span>
            </div>
            <a 
              href={result.officialChannel.url} 
              target="_blank" 
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 shrink-0"
            >
              <span>{isEn ? 'Visit safely' : 'Truy cập an toàn'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Action Buttons Row (Exact match to Screenshot 3) */}
        <div className="pt-2 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100">
          <button
            onClick={handleCopyReply}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer mr-auto"
            title={isEn ? 'Copy pre-written refusal template' : 'Sao chép câu từ chối mẫu'}
          >
            {copiedReply ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copiedReply ? (isEn ? 'Copied reply!' : 'Đã sao chép phản hồi!') : (isEn ? 'Copy Safe Reply' : 'Sao chép mẫu từ chối')}</span>
          </button>

          <button
            onClick={handleDelete}
            className="px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 active:bg-blue-200/80 rounded-lg transition-colors cursor-pointer"
          >
            {isEn ? 'Safely Delete Submission' : 'Xóa an toàn'}
          </button>

          <button
            onClick={handleMark}
            disabled={isHandled}
            className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white rounded-lg transition-all cursor-pointer ${
              isHandled 
                ? 'bg-emerald-600 cursor-default' 
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm shadow-blue-500/20'
            }`}
          >
            <span>{isHandled ? (isEn ? 'Marked as Handled' : 'Đã xử lý xong') : (isEn ? 'Mark as Handled' : 'Đánh dấu đã xử lý')}</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
