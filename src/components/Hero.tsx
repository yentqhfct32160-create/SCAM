import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Lock, 
  Database, 
  Sparkles, 
  RotateCcw,
  UploadCloud,
  FileText
} from 'lucide-react';
import { Language, AuditResult, PresetSample } from '../types';
import { PRESET_SAMPLES } from '../data/scamDatabase';
import { analyzeThreatQuery } from '../utils/analyzer';
import { AuditResultCard } from './AuditResultCard';

interface HeroProps {
  lang: Language;
  onThreatHandled: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onThreatHandled }) => {
  const isEn = lang === 'en';
  const [query, setQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepText, setScanStepText] = useState('');
  
  // Default to the initial sample so user sees the exact layout from Screenshot 1 & 3 immediately!
  const [activeResult, setActiveResult] = useState<AuditResult>(() => 
    analyzeThreatQuery(PRESET_SAMPLES[0].query, lang)
  );

  const handleAnalyze = (targetQuery?: string) => {
    const textToScan = targetQuery !== undefined ? targetQuery : query;
    if (!textToScan.trim()) return;

    setIsScanning(true);
    setScanStepText(isEn ? 'Parsing URL domain and WHOIS records...' : 'Đang phân tích tên miền và hồ sơ WHOIS...');

    setTimeout(() => {
      setScanStepText(isEn ? 'Evaluating social engineering & urgency markers...' : 'Đang kiểm tra dấu hiệu thao túng tâm lý và thúc ép thời gian...');
    }, 400);

    setTimeout(() => {
      setScanStepText(isEn ? 'Cross-referencing global threat registry...' : 'Đối soát cơ sở dữ liệu lừa đảo toàn cầu...');
    }, 800);

    setTimeout(() => {
      const result = analyzeThreatQuery(textToScan, lang);
      setActiveResult(result);
      setIsScanning(false);
      setScanStepText('');
    }, 1100);
  };

  const handleSelectPreset = (sample: PresetSample) => {
    setQuery(sample.query);
    handleAnalyze(sample.query);
  };

  const handleClear = () => {
    setQuery('');
    setActiveResult(analyzeThreatQuery('https://www.netflix.com', lang));
  };

  return (
    <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/70 to-white">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Kicker Badge (Screenshot 1) */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block"></span>
          <span>
            {isEn ? 'CONSUMER PRIVACY-FIRST RISK AUDITING' : 'PHÒNG CHỐNG LỪA ĐẢO BẢO VỆ RIÊNG TƯ'}
          </span>
        </div>

        {/* Hero Title (Screenshot 1) */}
        <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
          {isEn ? 'Clear, calm protection against digital scams' : 'Bảo vệ bình tĩnh, minh bạch trước mọi cạm bẫy lừa đảo'}
        </h1>

        {/* Subtitle (Screenshot 1) */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal text-balance">
          {isEn 
            ? 'We securely analyze only the messages, links, or files you explicitly submit. No invasive background monitoring. Just clear warnings and simple, actionable next steps.'
            : 'Phân tích an toàn chỉ những đường link, tin nhắn hoặc thông tin bạn chủ động gửi. Không theo dõi ngầm, không gây hoang mang. Chỉ đưa ra cảnh báo minh bạch và các bước xử lý bình tĩnh.'}
        </p>

        {/* Audit Search Box (Screenshot 1) */}
        <div className="pt-4 text-left">
          <div className="max-w-3xl mx-auto bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-slate-300 transition-all">
            <label 
              htmlFor="threat-input"
              className="block text-xs sm:text-sm font-semibold text-slate-900 mb-2.5"
            >
              {isEn 
                ? 'Check a suspicious link, phone number, or sender address' 
                : 'Kiểm tra liên kết, số điện thoại hoặc nội dung tin nhắn nghi vấn'}
            </label>

            <form 
              onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }}
              className="flex flex-col sm:flex-row gap-2.5"
            >
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  id="threat-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={isEn ? 'e.g., info-update-banking-381.com, or suspicious SMS text' : 'vd: vietcombank-ebank-xacthuc.com, hoặc tin nhắn SMS lạ...'}
                  className="w-full pl-10 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isScanning}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 rounded-xl shadow-sm shadow-blue-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{isScanning ? (isEn ? 'Scanning...' : 'Đang quét...') : (isEn ? 'Analyze Securely' : 'Phân tích an toàn')}</span>
                <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
              </button>
            </form>

            {/* Quick Presets Strip */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium shrink-0">
                {isEn ? 'Try real cases:' : 'Thử các tình huống:'}
              </span>
              {PRESET_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSelectPreset(sample)}
                  className="px-2.5 py-1 text-slate-600 hover:text-blue-700 bg-slate-100/80 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 rounded-md transition-colors cursor-pointer whitespace-nowrap font-medium"
                >
                  {isEn ? sample.labelEn : sample.labelVi}
                </button>
              ))}
            </div>

            {/* Trust Reassurance Footnote (Screenshot 1) */}
            <div className="mt-3.5 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isEn ? '100% Encrypted & Anonymous' : 'Mã hóa 100% & Ẩn danh hoàn toàn'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Database className="w-3.5 h-3.5 text-slate-400" />
                <span>{isEn ? 'Submitted data is not stored or shared' : 'Không lưu trữ hay chia sẻ dữ liệu gửi lên'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Scanning Indicator */}
        {isScanning && (
          <div className="max-w-md mx-auto p-4 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center justify-center gap-3 text-sm text-blue-800">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="font-medium animate-pulse">{scanStepText}</span>
          </div>
        )}

        {/* The Live Calm Alert Card (Screenshot 3 style) */}
        {!isScanning && activeResult && (
          <div className="pt-6 text-left">
            <AuditResultCard 
              result={activeResult} 
              lang={lang} 
              onClear={handleClear}
              onMarkHandled={onThreatHandled}
            />
          </div>
        )}
      </div>
    </section>
  );
};
