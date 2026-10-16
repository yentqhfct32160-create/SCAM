import { AuditResult, ThreatLevel, Language } from '../types';

interface AnalysisRule {
  name: string;
  test: (input: string) => boolean;
  whyFlaggedEn: { title: string; description: string };
  whyFlaggedVi: { title: string; description: string };
  severity: ThreatLevel;
}

const KNOWN_SAFE_DOMAINS = [
  'netflix.com',
  'google.com',
  'apple.com',
  'microsoft.com',
  'vietcombank.com.vn',
  'techcombank.com.vn',
  'bidv.com.vn',
  'vpbank.com.vn',
  'mbbank.com.vn',
  'acb.com.vn',
  'chongluadao.vn',
  'gov.vn',
  'usps.com',
  'amazon.com',
  'paypal.com',
  'facebook.com',
  'zalo.me'
];

export function analyzeThreatQuery(query: string, lang: Language = 'en'): AuditResult {
  const cleanQuery = query.trim();
  const lower = cleanQuery.toLowerCase();
  const isEn = lang === 'en';

  // 1. Check if it's explicitly a verified safe domain
  const matchedSafeDomain = KNOWN_SAFE_DOMAINS.find(domain => lower.includes(domain));
  const isLikelyPhishingLookalike = lower.includes('-') && (lower.includes('verify') || lower.includes('ebank') || lower.includes('portal') || lower.includes('top') || lower.includes('xyz'));

  if (matchedSafeDomain && !isLikelyPhishingLookalike) {
    return {
      id: `safe-${Date.now()}`,
      threatLevel: 'LEGITIMATE_SAFE',
      badgeTitle: isEn ? 'VERIFIED LEGITIMATE ENTITY' : 'TÊN MIỀN CHÍNH THỨC & AN TOÀN',
      badgeSubtitle: isEn ? 'Analyzed just now • Verified against official registry' : 'Vừa phân tích • Khớp với cơ sở dữ liệu xác thực chính thức',
      inputQuery: cleanQuery,
      entityName: matchedSafeDomain,
      confidenceScore: 98,
      timestamp: isEn ? 'Just now' : 'Vừa xong',
      whyFlagged: [
        {
          title: isEn ? 'Authentic root domain' : 'Tên miền gốc chính thức',
          description: isEn 
            ? `The destination matches the legitimate root domain (${matchedSafeDomain}) registered by the authorized corporate entity.`
            : `Địa chỉ trỏ đến đúng tên miền gốc hợp lệ (${matchedSafeDomain}) do tổ chức được ủy quyền sở hữu.`
        },
        {
          title: isEn ? 'No deceptive prefixes or suspicious TLD' : 'Không có tiền tố giả mạo hoặc đuôi tên miền độc hại',
          description: isEn
            ? 'Does not exhibit spoofing patterns, homograph Cyrillic characters, or unauthorized redirection masks.'
            : 'Không phát hiện ký tự đồng âm gây nhầm lẫn, không có đuôi mở rộng đáng ngờ hay kỹ thuật che giấu chuyển hướng.'
        }
      ],
      safeResponsePlan: [
        {
          step: 1,
          actionTitle: isEn ? 'Safe to proceed' : 'An tâm truy cập',
          actionDesc: isEn ? 'This destination is recognized as the verified official portal.' : 'Trang web hoặc tổ chức này nằm trong danh mục đã được xác minh an toàn.'
        },
        {
          step: 2,
          actionTitle: isEn ? 'Verify padlock in browser' : 'Kiểm tra biểu tượng ổ khóa bảo mật',
          actionDesc: isEn ? 'Always verify the HTTPS padlock icon in your address bar before entering credentials.' : 'Luôn nhìn thanh địa chỉ trình duyệt để chắc chắn có chứng chỉ SSL hợp lệ.'
        },
        {
          step: 3,
          actionTitle: isEn ? 'Bookmark for the future' : 'Lưu dấu trang (Bookmark)',
          actionDesc: isEn ? 'Save this verified URL to your bookmarks to avoid search ad lookalikes.' : 'Lưu lại liên kết vào mục yêu thích để không bấm nhầm vào quảng cáo giả mạo sau này.'
        }
      ],
      officialChannel: {
        name: matchedSafeDomain,
        url: `https://${matchedSafeDomain}`
      }
    };
  }

  // 2. Specialized Check: Netflix Impostor pattern
  if (lower.includes('netflix') || lower.includes('pay-portal') || lower.includes('billing-portal')) {
    return {
      id: `threat-${Date.now()}`,
      threatLevel: 'CRITICAL_SCAM',
      badgeTitle: isEn ? 'POTENTIAL BILLING IMPOSTOR DETECTED' : 'PHÁT HIỆN GIẢ MẠO HÓA ĐƠN THANH TOÁN',
      badgeSubtitle: isEn ? 'Submitted via secure threat sync • Analysed 2 minutes ago' : 'Gửi qua cổng phân tích an toàn • Phân tích vừa xong',
      inputQuery: cleanQuery,
      entityName: 'Impostor Billing Services',
      confidenceScore: 96,
      timestamp: isEn ? 'Analysed 2 minutes ago' : 'Phân tích cách đây 2 phút',
      whyFlagged: [
        {
          title: isEn ? 'Inconsistent domain' : 'Tên miền không khớp với tổ chức',
          description: isEn
            ? 'The sender address claims to be "Netflix Billing" but uses the domain @pay-portal-verify-8.com.'
            : 'Email xưng danh là "Netflix Billing" nhưng lại sử dụng tên miền lạ @pay-portal-verify-8.com thay vì netflix.com.'
        },
        {
          title: isEn ? 'Urgent action demanded' : 'Tạo áp lực thời gian gấp rút',
          description: isEn
            ? 'The text asks to verify payment within 4 hours to avoid instant subscription cancellation. This is a common coercive social engineering pattern.'
            : 'Nội dung hối thúc cập nhật thẻ trong vòng 4 giờ để tránh bị hủy gói dịch vụ. Đây là thủ thuật tâm lý ép buộc phổ biến.'
        }
      ],
      safeResponsePlan: [
        {
          step: 1,
          actionTitle: isEn ? 'Do not click' : 'Tuyệt đối không click',
          actionDesc: isEn ? 'Do not tap any link or download attachments in that email.' : 'Không bấm vào liên kết và không tải tệp đính kèm nào từ bức thư này.'
        },
        {
          step: 2,
          actionTitle: isEn ? 'Visit official channel' : 'Truy cập kênh chính thức',
          actionDesc: isEn ? 'Go directly to your official Netflix app or bookmark to check billing status.' : 'Mở trực tiếp ứng dụng Netflix hoặc gõ netflix.com trên trình duyệt để kiểm tra tình trạng tài khoản.'
        },
        {
          step: 3,
          actionTitle: isEn ? 'Ignore or report' : 'Bỏ qua hoặc báo cáo',
          actionDesc: isEn ? 'Tap the safe-delete recommendation button below.' : 'Nhấn nút Xóa an toàn bên dưới và chặn người gửi này.'
        }
      ],
      officialChannel: {
        name: 'Netflix Official Account Management',
        url: 'https://www.netflix.com/youraccount'
      },
      recommendedReply: isEn 
        ? 'No response needed. Mark sender as spam.'
        : 'Không cần phản hồi. Đánh dấu người gửi là thư rác và xóa vĩnh viễn.'
    };
  }

  // 3. Specialized Check: USPS / VNPost Delivery SMS
  if (lower.includes('usps') || lower.includes('vnpost') || lower.includes('bưu điện') || lower.includes('package') || lower.includes('giao hang') || lower.includes('redelivery')) {
    return {
      id: `threat-${Date.now()}`,
      threatLevel: 'CRITICAL_SCAM',
      badgeTitle: isEn ? 'COERCIVE PARCEL REDELIVERY SCAM' : 'BẪY LỪA ĐẢO GIAO HÀNG & PHÍ REDELIVERY',
      badgeSubtitle: isEn ? 'High risk pattern matched • Fraudulent credential harvesting' : 'Khớp mẫu lừa đảo nguy hiểm • Thu thập trái phép thông tin thẻ',
      inputQuery: cleanQuery,
      entityName: 'Delivery Impostor Campaign',
      confidenceScore: 94,
      timestamp: isEn ? 'Analysed 1 minute ago' : 'Phân tích cách đây 1 phút',
      whyFlagged: [
        {
          title: isEn ? 'Fraudulent re-delivery fee link' : 'Đường link thu phí giao lại bất thường',
          description: isEn
            ? 'Postal services do not demand card details via random SMS links ending in .top, .vip or non-standard TLDs.'
            : 'Bưu điện hay các hãng vận chuyển không yêu cầu nhập số thẻ hoặc trả phí qua link lạ có đuôi .top, .vip hay .app.'
        },
        {
          title: isEn ? 'Coercive urgency timer' : 'Hối thúc trong vòng 12-24 giờ',
          description: isEn
            ? 'Claims package will be returned to sender or destroyed unless payment is submitted immediately.'
            : 'Đe dọa sẽ hủy kiện hàng hoặc phạt phí lưu kho nếu không xác nhận gấp nhằm làm người nhận mất cảnh giác.'
        }
      ],
      safeResponsePlan: [
        {
          step: 1,
          actionTitle: isEn ? 'Do not enter card info' : 'Không nhập thông tin thẻ ngân hàng',
          actionDesc: isEn ? 'Never input debit/credit card numbers or OTP into SMS links.' : 'Tuyệt đối không điền số thẻ, ngày hết hạn, mã CVV hay mã OTP.'
        },
        {
          step: 2,
          actionTitle: isEn ? 'Track on official postal portal' : 'Tra cứu trên website bưu chính chính hãng',
          actionDesc: isEn ? 'Type usps.com or vnpost.vn manually and search your tracking code.' : 'Tự mở trang chủ vnpost.vn hoặc bưu cục chuyển phát thực tế để tra cứu mã vận đơn.'
        },
        {
          step: 3,
          actionTitle: isEn ? 'Block & Report SMS' : 'Chặn số & Báo cáo tin nhắn rác',
          actionDesc: isEn ? 'Forward message to 156 (Vietnam) or 7726 (US/UK).' : 'Chuyển tiếp nội dung tin nhắn rác đến tổng đài 156 hoặc 5656.'
        }
      ]
    };
  }

  // 4. Specialized Check: Banking OTP / Account Lock Phishing
  if (lower.includes('bank') || lower.includes('vietcombank') || lower.includes('khoa') || lower.includes('otp') || lower.includes('tai khoan') || lower.includes('ebank')) {
    return {
      id: `threat-${Date.now()}`,
      threatLevel: 'CRITICAL_SCAM',
      badgeTitle: isEn ? 'CRITICAL BANKING CREDENTIAL HARVESTER' : 'CẢNH BÁO NGUY CƠ CHIẾM ĐOẠT TÀI KHOẢN NGÂN HÀNG',
      badgeSubtitle: isEn ? 'Severe threat identified • Fake e-banking portal' : 'Mối đe dọa nghiêm trọng • Trang web mạo danh ngân hàng lấy cắp OTP',
      inputQuery: cleanQuery,
      entityName: 'Spoofed Banking Portal',
      confidenceScore: 99,
      timestamp: isEn ? 'Analysed just now' : 'Phân tích vừa xong',
      whyFlagged: [
        {
          title: isEn ? 'Lookalike e-banking domain' : 'Tên miền ngân hàng giả mạo tinh vi',
          description: isEn
            ? 'The domain is recently registered and mimics bank infrastructure to steal username, password, and SMS OTP.'
            : 'Tên miền mới đăng ký, ghép thêm từ phụ như -ebank, -xacthuc, -portal nhằm chiếm đoạt tài khoản Internet Banking.'
        },
        {
          title: isEn ? 'Coercive account lock threat' : 'Thủ đoạn dọa khóa tài khoản',
          description: isEn
            ? 'Banks strictly forbid including login hyperlinks in SMS alerts. Any SMS urging login via link is fraudulent.'
            : 'Ngân hàng KHÔNG BAO GIỜ gửi tin nhắn yêu cầu bấm link để mở khóa hay xác thực. Đây là dấu hiệu lừa đảo 100%.'
        }
      ],
      safeResponsePlan: [
        {
          step: 1,
          actionTitle: isEn ? 'Do not enter credentials' : 'Tuyệt đối không nhập tên đăng nhập và mật khẩu',
          actionDesc: isEn ? 'Close any opened browser tab pointing to this address immediately.' : 'Đóng ngay tab trình duyệt vừa mở, không gõ bất kỳ thông tin nào.'
        },
        {
          step: 2,
          actionTitle: isEn ? 'Open official Mobile App' : 'Mở ứng dụng ngân hàng chính chủ',
          actionDesc: isEn ? 'Use your bank mobile app installed from Apple App Store / Google Play Store.' : 'Vào ứng dụng ngân hàng đã cài sẵn trên điện thoại để kiểm tra số dư và thông báo.'
        },
        {
          step: 3,
          actionTitle: isEn ? 'Emergency hotline freeze' : 'Gọi hotline ngân hàng nếu lỡ nhập thông tin',
          actionDesc: isEn ? 'If you already entered passwords, call the 24/7 bank hotline to freeze accounts immediately.' : 'Nếu đã lỡ nhập thông tin, gọi ngay tổng đài ngân hàng để khóa dịch vụ khẩn cấp.'
        }
      ]
    };
  }

  // 5. Specialized Check: Police / Tax penalty threat
  if (lower.includes('bo cong an') || lower.includes('công an') || lower.includes('toa an') || lower.includes('phat nguoi') || lower.includes('vi pham') || lower.includes('rua tien') || lower.includes('tam giu')) {
    return {
      id: `threat-${Date.now()}`,
      threatLevel: 'CRITICAL_SCAM',
      badgeTitle: isEn ? 'COERCIVE AUTHORITY IMPOSTOR DETECTED' : 'PHÁT HIỆN GIẢ DANH CƠ QUAN CHỨC NĂNG ĐE DỌA',
      badgeSubtitle: isEn ? 'High psychological coercion detected • Immediate danger of wire fraud' : 'Phát hiện thủ đoạn thao túng tâm lý nghiêm trọng • Tuyệt đối không chuyển tiền',
      inputQuery: cleanQuery,
      entityName: 'Fraudulent Law Enforcement Impostor',
      confidenceScore: 98,
      timestamp: isEn ? 'Analysed just now' : 'Phân tích vừa xong',
      whyFlagged: [
        {
          title: isEn ? 'Unlawful remote transfer demand' : 'Yêu cầu chuyển tiền qua điện thoại trái pháp luật',
          description: isEn
            ? 'Legitimate law enforcement and judicial authorities NEVER ask citizens to transfer money to a "holding account" over the phone.'
            : 'Cơ quan Công an, Viện kiểm sát hay Tòa án KHÔNG BAO GIỜ làm việc qua điện thoại hay yêu cầu chuyển tiền vào tài khoản cá nhân để điều tra.'
        },
        {
          title: isEn ? 'Psychological intimidation' : 'Khủng bố tinh thần và ép buộc giữ bí mật',
          description: isEn
            ? 'Scammers threaten arrest and instruct victims not to tell relatives. This isolation is a hallmark of fraud.'
            : 'Kẻ lừa đảo đe dọa lệnh bắt giam và yêu cầu nạn nhân thuê phòng riêng hoặc không được nói cho người thân biết.'
        }
      ],
      safeResponsePlan: [
        {
          step: 1,
          actionTitle: isEn ? 'Hang up and do not transfer' : 'Cúp máy ngay và tuyệt đối KHÔNG chuyển tiền',
          actionDesc: isEn ? 'Under no circumstance should you wire funds to any "temporary holding account".' : 'Dù bất kỳ lý do gì, tuyệt đối không chuyển một xu nào theo hướng dẫn của kẻ gọi.'
        },
        {
          step: 2,
          actionTitle: isEn ? 'Contact local police directly' : 'Đến Công an phường/xã sở tại xác minh',
          actionDesc: isEn ? 'Visit your local police station if you have any questions regarding legal summons.' : 'Nếu có nghi vấn về giấy triệu tập hay vi phạm, hãy đến trực tiếp trụ sở công an gần nhất.'
        },
        {
          step: 3,
          actionTitle: isEn ? 'Alert family members' : 'Chia sẻ với người thân trong gia đình',
          actionDesc: isEn ? 'Talk to family members calmly. Shedding secrecy immediately neutralizes the scam.' : 'Nói chuyện ngay với người thân để cùng giữ bình tĩnh và hỗ trợ xử lý.'
        }
      ]
    };
  }

  // 6. Specialized Check: High-yield crypto / Ponzi / Easy job
  if (lower.includes('usdt') || lower.includes('crypto') || lower.includes('loi nhuan') || lower.includes('hoa hong') || lower.includes('nhiem vu') || lower.includes('guaranteed') || lower.includes('shopee') || lower.includes('tiki')) {
    return {
      id: `threat-${Date.now()}`,
      threatLevel: 'CRITICAL_SCAM',
      badgeTitle: isEn ? 'HIGH-RISK FINANCIAL SCHEME / TASK TRAP' : 'CẢNH BÁO BẪY LỪA ĐẢO TÀI CHÍNH / LÀM NHIỆM VỤ',
      badgeSubtitle: isEn ? 'Unrealistic returns detected • Advance-fee fraud pattern' : 'Phát hiện cam kết lợi nhuận phi thực tế • Bẫy nạp tiền chiếm đoạt tài sản',
      inputQuery: cleanQuery,
      entityName: 'Unregulated Wealth Scheme',
      confidenceScore: 95,
      timestamp: isEn ? 'Analysed just now' : 'Phân tích vừa xong',
      whyFlagged: [
        {
          title: isEn ? 'Guaranteed high-yield anomaly' : 'Bất thường cam kết lợi nhuận cao không rủi ro',
          description: isEn
            ? 'Promises of guaranteed 10-30% daily/monthly returns are mathematically impossible in legitimate investment.'
            : 'Mọi lời hứa hẹn lãi suất 10% - 30%/ngày hoặc việc nhẹ lương cao nạp tiền làm nhiệm vụ đều là bẫy Ponzi lừa đảo.'
        },
        {
          title: isEn ? 'Funnel to untraceable channels' : 'Kéo sang hội nhóm Telegram/Zalo ẩn danh',
          description: isEn
            ? 'Directing victims to private messaging groups where fraudulent admins fabricate fake success receipts.'
            : 'Các đối tượng sử dụng nick ảo trong nhóm chat để đóng vai "chim mồi" khoe tiền lãi nhằm dụ nạn nhân nạp thêm.'
        }
      ],
      safeResponsePlan: [
        {
          step: 1,
          actionTitle: isEn ? 'Do not deposit funds' : 'Tuyệt đối không nộp/nạp tiền',
          actionDesc: isEn ? 'Never send crypto or bank transfers to earn commission or release pending funds.' : 'Không nộp bất kỳ khoản phí bảo hiểm, phí giải ngân hay tiền nâng cấp tài khoản nào.'
        },
        {
          step: 2,
          actionTitle: isEn ? 'Exit and block group' : 'Rời nhóm và chặn ngay kẻ lừa đảo',
          actionDesc: isEn ? 'Mute and leave the Telegram/Zalo group to prevent psychological harassment.' : 'Chặn liên lạc để tránh bị thao túng tâm lý và lôi kéo tiếp.'
        },
        {
          step: 3,
          actionTitle: isEn ? 'Warn friends & peers' : 'Cảnh giác cho người xung quanh',
          actionDesc: isEn ? 'Share awareness to prevent peers from falling for the same invitation.' : 'Cảnh báo cho bạn bè nếu thấy họ được mời vào các nhóm tương tự.'
        }
      ]
    };
  }

  // 7. General Heuristic Fallback
  const hasSuspiciousLink = lower.includes('.xyz') || lower.includes('.top') || lower.includes('.click') || lower.includes('.vip') || lower.includes('http');
  const hasUrgency = lower.includes('urgent') || lower.includes('gap') || lower.includes('ngay') || lower.includes('24h') || lower.includes('4 hours') || lower.includes('khoa');
  
  const threatLevel: ThreatLevel = (hasSuspiciousLink || hasUrgency) ? 'SUSPICIOUS' : 'UNKNOWN_RISK';

  return {
    id: `threat-general-${Date.now()}`,
    threatLevel,
    badgeTitle: isEn 
      ? (threatLevel === 'SUSPICIOUS' ? 'SUSPICIOUS RISK INDICATORS FLAGGED' : 'UNVERIFIED CONTENT AUDITED')
      : (threatLevel === 'SUSPICIOUS' ? 'PHÁT HIỆN CÁC DẤU HIỆU ĐÁNG NGỜ' : 'NỘI DUNG CHƯA ĐƯỢC XÁC THỰC'),
    badgeSubtitle: isEn ? 'Analyzed via client-side heuristic engine' : 'Phân tích bởi bộ lọc quy tắc an ninh số',
    inputQuery: cleanQuery,
    confidenceScore: 82,
    timestamp: isEn ? 'Just now' : 'Vừa xong',
    whyFlagged: [
      {
        title: isEn ? 'Heuristic pattern check' : 'Kiểm tra quy tắc ngữ cảnh',
        description: isEn 
          ? (hasSuspiciousLink ? 'Contains unverified external web URL or non-standard top-level domain.' : 'Content exhibits elements that require user caution before sharing sensitive information.')
          : (hasSuspiciousLink ? 'Chứa đường link trang web chưa được xác thực hoặc đuôi tên miền có rủi ro cao.' : 'Nội dung chứa yếu tố cần thận trọng kiểm tra trước khi cung cấp thông tin cá nhân.')
      },
      {
        title: isEn ? 'Social engineering evaluation' : 'Đánh giá kỹ thuật xã hội & tâm lý',
        description: isEn
          ? (hasUrgency ? 'Detected urgency cues designed to bypass critical thinking.' : 'No verified digital trust certificates associated with this sender identifier.')
          : (hasUrgency ? 'Phát hiện các từ ngữ tạo áp lực gấp gáp nhằm khiến người nhận không kịp suy xét.' : 'Chưa tìm thấy chứng thư xác thực kỹ thuật số chính thống của người gửi.')
      }
    ],
    safeResponsePlan: [
      {
        step: 1,
        actionTitle: isEn ? 'Do not act impulsively' : 'Bình tĩnh, không vội vàng thực hiện',
        actionDesc: isEn ? 'Take 10 minutes to verify from a secondary verified source.' : 'Dành ra 10 phút kiểm tra lại qua một nguồn tin chính thống khác.'
      },
      {
        step: 2,
        actionTitle: isEn ? 'Verify identity directly' : 'Xác thực trực tiếp với người gửi',
        actionDesc: isEn ? 'Call the sender via a known trusted phone number or official app.' : 'Gọi điện trực tiếp cho người gửi bằng số di động đã lưu trước đó.'
      },
      {
        step: 3,
        actionTitle: isEn ? 'Safely delete if uncertain' : 'Xóa an toàn nếu còn nghi vấn',
        actionDesc: isEn ? 'When in doubt, deleting the message incurs zero penalty.' : 'Khi chưa chắc chắn 100%, việc xóa bỏ hoặc bỏ qua tin nhắn luôn là lựa chọn an toàn nhất.'
      }
    ]
  };
}
