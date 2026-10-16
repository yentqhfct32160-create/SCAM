import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { QUIZ_SCENARIOS } from '../data/scamDatabase';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, lang }) => {
  const isEn = lang === 'en';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_SCENARIOS[currentIndex];

  const handleVote = (answer: boolean) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answer);
    if (answer === currentQ.isScam) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUIZ_SCENARIOS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {isEn ? 'Spot the Scam — Reflex Simulator' : 'Thử tài nhận diện chiêu trò lừa đảo'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEn 
                  ? `Scenario ${currentIndex + 1} of ${QUIZ_SCENARIOS.length}` 
                  : `Tình huống ${currentIndex + 1} trên ${QUIZ_SCENARIOS.length}`}
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

        {/* Content */}
        {!isFinished ? (
          <div className="py-5 space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">
                {isEn ? currentQ.titleEn : currentQ.titleVi}
              </h4>
              <div className="text-xs text-slate-500">
                {isEn ? 'Sender: ' : 'Người gửi: '}
                <span className="font-mono text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">
                  {currentQ.sender}
                </span>
              </div>
            </div>

            {/* Simulated Email / Message Card */}
            <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {isEn ? 'Simulated Incoming Message' : 'Nội dung tin nhắn / Email đến'}
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-sans font-medium whitespace-pre-wrap">
                {currentQ.previewContent}
              </p>
            </div>

            {/* Choice Buttons */}
            {selectedAnswer === null ? (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleVote(false)}
                  className="p-3.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer text-center"
                >
                  {isEn ? 'Legitimate Notice' : 'Tin nhắn an toàn / Thật'}
                </button>
                <button
                  onClick={() => handleVote(true)}
                  className="p-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all cursor-pointer text-center shadow-sm shadow-blue-500/20"
                >
                  {isEn ? 'Phishing / Fraud Scam' : 'Bẫy lừa đảo / Phishing'}
                </button>
              </div>
            ) : (
              /* Feedback display */
              <div className="space-y-4 animate-fade-in pt-1">
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 ${
                    selectedAnswer === currentQ.isScam
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  {selectedAnswer === currentQ.isScam ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h5 className="font-bold text-sm">
                      {selectedAnswer === currentQ.isScam
                        ? (isEn ? 'Correct Analysis!' : 'Chính xác! Bạn đã nhận định đúng.')
                        : (isEn ? 'Caution — Misidentified.' : 'Cảnh giác — Nhận định chưa chính xác.')}
                    </h5>
                    <p className="text-xs sm:text-sm mt-1 leading-relaxed">
                      {isEn ? currentQ.explanationEn : currentQ.explanationVi}
                    </p>
                  </div>
                </div>

                {/* Key indicators */}
                <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1.5 text-slate-600">
                  <span className="font-bold text-slate-900">
                    {isEn ? 'Critical indicators: ' : 'Dấu hiệu then chốt: '}
                  </span>
                  {(isEn ? currentQ.redFlagsEn : currentQ.redFlagsVi).map((flag, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{flag}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
                  >
                    <span>{isEn ? 'Next Scenario' : 'Tình huống tiếp theo'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-extrabold text-slate-900">
              {isEn ? 'Evaluation Complete' : 'Hoàn thành bài kiểm tra nhận thức'}
            </h4>

            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              {isEn
                ? `You correctly identified ${score} out of ${QUIZ_SCENARIOS.length} scenarios.`
                : `Bạn đã nhận diện đúng ${score}/${QUIZ_SCENARIOS.length} tình huống thực tế.`}
            </p>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isEn ? 'Try Again' : 'Làm lại'}</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
              >
                {isEn ? 'Back to App' : 'Quay lại trang chính'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
