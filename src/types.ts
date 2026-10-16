export type Language = 'en' | 'vi';

export type ThreatLevel = 'CRITICAL_SCAM' | 'SUSPICIOUS' | 'LEGITIMATE_SAFE' | 'UNKNOWN_RISK';

export type ThreatCategory = 
  | 'phishing' 
  | 'billing_impostor' 
  | 'package_sms' 
  | 'payment_fraud' 
  | 'impersonation' 
  | 'crypto_investment' 
  | 'job_offer'
  | 'safe';

export interface AuditFlag {
  title: string;
  description: string;
}

export interface ResponseStep {
  step: number;
  actionTitle: string;
  actionDesc: string;
}

export interface AuditResult {
  id: string;
  threatLevel: ThreatLevel;
  badgeTitle: string;
  badgeSubtitle: string;
  inputQuery: string;
  entityName?: string;
  whyFlagged: AuditFlag[];
  safeResponsePlan: ResponseStep[];
  officialChannel?: {
    name: string;
    url: string;
  };
  recommendedReply?: string;
  confidenceScore: number;
  timestamp: string;
  isSimulated?: boolean;
}

export interface PresetSample {
  id: string;
  labelEn: string;
  labelVi: string;
  query: string;
  category: ThreatCategory;
  descriptionEn: string;
  descriptionVi: string;
}

export interface QuizQuestion {
  id: string;
  titleEn: string;
  titleVi: string;
  scenarioType: 'email' | 'sms' | 'website' | 'transfer';
  sender: string;
  previewContent: string;
  isScam: boolean;
  redFlagsEn: string[];
  redFlagsVi: string[];
  explanationEn: string;
  explanationVi: string;
}

export interface ScamCategoryItem {
  id: string;
  titleEn: string;
  titleVi: string;
  descEn: string;
  descVi: string;
  iconName: 'mail' | 'phone' | 'credit-card' | 'user';
  commonSignsEn: string[];
  commonSignsVi: string[];
  realExamples: { text: string; note: string }[];
  preventionTipsEn: string[];
  preventionTipsVi: string[];
}

export interface FAQItem {
  questionEn: string;
  questionVi: string;
  answerEn: string;
  answerVi: string;
}

export interface EmergencyContact {
  name: string;
  role: string;
  phone: string;
  website?: string;
  scope: string;
}
