import { PresetSample, ScamCategoryItem, FAQItem, QuizQuestion, EmergencyContact } from '../types';

export const PRESET_SAMPLES: PresetSample[] = [
  {
    id: 'netflix-billing',
    labelEn: 'Netflix Impostor Email',
    labelVi: 'Email mạo danh Netflix',
    query: 'notice@pay-portal-verify-8.com: Urgent: Your Netflix membership will be canceled within 4 hours. Update your billing card now at https://pay-portal-verify-8.com/renew',
    category: 'billing_impostor',
    descriptionEn: 'Urgent 4-hour countdown with fake payment portal lookalike',
    descriptionVi: 'Cảnh báo giả mạo thúc ép cập nhật thẻ tín dụng trong 4 giờ'
  },
  {
    id: 'usps-delivery',
    labelEn: 'USPS / VNPost Parcel SMS',
    labelVi: 'SMS mạo danh Bưu điện / Giao hàng',
    query: 'USPS Notice: Your package US-8921-X has an incorrect delivery street address. Please update within 12h at https://usps-tracking-redelivery-fee.top/auth',
    category: 'package_sms',
    descriptionEn: 'Fake redelivery fee link trying to capture credit card numbers',
    descriptionVi: 'Tin nhắn sai địa chỉ nhận hàng nhằm chiếm đoạt thẻ hoặc mã OTP'
  },
  {
    id: 'vietcombank-otp',
    labelEn: 'Bank Account Suspension Phishing',
    labelVi: 'SMS mạo danh Ngân hàng khóa tài khoản',
    query: 'VIB/VCB: Tai khoan cua Quy khach bi khoa do vi pham bao mat. Vui long dang nhap https://vietcombank-ebank-xacthuc.com de xac minh ngay lap tuc.',
    category: 'phishing',
    descriptionEn: 'Fake e-banking domain created to steal credentials and OTP',
    descriptionVi: 'Tên miền giả mạo ngân hàng đánh cắp mật khẩu và mã OTP Smart Banking'
  },
  {
    id: 'telegram-crypto',
    labelEn: 'Telegram Crypto Investment',
    labelVi: 'Lừa đảo đầu tư sàn ảo Telegram',
    query: 'Join VIP Alpha Signals: Guaranteed 15% daily return with algorithmic arbitrage bot. Deposit 200 USDT to wallet 0x71C... and receive 350 USDT within 24 hours.',
    category: 'crypto_investment',
    descriptionEn: 'Ponzi social engineering promising guaranteed daily returns',
    descriptionVi: 'Chiêu trò hứa hẹn lợi nhuận cao không rủi ro, bẫy nạp tiền'
  },
  {
    id: 'police-threat',
    labelEn: 'Impostor Police / Tax Authority',
    labelVi: 'Giả danh Công an / Cục Thuế',
    query: 'Bo Cong An: So dien thoai 0912... cua ban lien quan den du an rua tien xuyen quoc gia. Yeu cau chuyen toan bo so du vao tai khoan tam giu 1903... de chung minh vo toi.',
    category: 'impersonation',
    descriptionEn: 'High-pressure coercive authority scam coercing bank transfer',
    descriptionVi: 'Tâm lý sợ hãi, mạo danh cơ quan tư pháp yêu cầu chuyển tiền giám định'
  },
  {
    id: 'legitimate-netflix',
    labelEn: 'Real Official Netflix Domain',
    labelVi: 'Tên miền chính thức của Netflix',
    query: 'https://www.netflix.com/youraccount',
    category: 'safe',
    descriptionEn: 'Legitimate authentic enterprise domain with verified certificates',
    descriptionVi: 'Trang web an toàn chính thức đã được xác thực bảo mật'
  }
];

export const SCAM_CATEGORIES: ScamCategoryItem[] = [
  {
    id: 'phishing',
    titleEn: 'Phishing & Spoofing',
    titleVi: 'Giả mạo & Lừa đảo Phishing',
    descEn: 'Lookalike domains claiming to be Netflix, USPS, your utility provider, or a state tax bureau.',
    descVi: 'Tên miền mạo danh các tổ chức quen thuộc như Netflix, bưu điện, ngân hàng, điện lực hoặc cơ quan thuế.',
    iconName: 'mail',
    commonSignsEn: [
      'Subdomains or typo-squatting (e.g. netflix-verify-auth.com instead of netflix.com)',
      'Sudden request to confirm passwords or full card CVV numbers',
      'Generic greetings ("Dear Customer") instead of your real name',
      'Sender email domain does not match the organization being referenced'
    ],
    commonSignsVi: [
      'Tên miền chứa từ phụ hoặc sai chính tả (vd: vietcombank-ebank.xyz thay vì vietcombank.com.vn)',
      'Bất ngờ yêu cầu xác thực mật khẩu, mã PIN hoặc mã OTP giao dịch',
      'Lời chào chung chung ("Kính gửi quý khách") thay vì tên thật được đăng ký',
      'Địa chỉ email người gửi có đuôi @gmail.com hoặc domain lạ không thuộc tổ chức'
    ],
    realExamples: [
      { text: 'service-secure-update-apple.com', note: 'Domain registered 3 days ago hosted on bulletproof offshore server' },
      { text: 'evn-hanoi-billing.net/pay', note: 'Fake electrical utility portal coercing card info' }
    ],
    preventionTipsEn: [
      'Never tap links inside unsolicited emails or SMS alerts.',
      'Type official URLs directly into your browser bookmark bar.',
      'Use passkeys or hardware 2FA keys that cannot be phished.'
    ],
    preventionTipsVi: [
      'Tuyệt đối không click vào đường link trong tin nhắn hoặc email chưa được kiểm chứng.',
      'Tự gõ địa chỉ trang web chính thức trên trình duyệt hoặc dùng app chính chủ.',
      'Bật xác thực 2 lớp qua ứng dụng xác thực (Authenticator) hoặc Smart OTP.'
    ]
  },
  {
    id: 'coercive_sms',
    titleEn: 'Coercive SMS & Robocalls',
    titleVi: 'Tin nhắn ép buộc & Cuộc gọi rác',
    descEn: 'Urgent package updates, account suspensions, or impostor support messages trying to induce panic.',
    descVi: 'Cảnh báo giao kiện hàng gấp, thông báo khóa tài khoản, hoặc giả mạo nhân viên nhà mạng đe dọa.',
    iconName: 'phone',
    commonSignsEn: [
      'Extremely tight artificial deadlines (e.g. "within 2 hours" or "today only")',
      'Threat of immediate legal action, arrest warrant, or account seizure',
      'Spoofed SMS brand names using lookalike Cyrillic or numeric characters',
      'Unsolicited calls prompting you to press 9 or dial an unfamiliar code like *#21#'
    ],
    commonSignsVi: [
      'Đặt thời hạn gấp rút phi lý ("xử lý trong vòng 2 giờ", "hết hạn hôm nay")',
      'Đe dọa khóa sim, khởi kiện, phong tỏa tài khoản ngân hàng hoặc bắt giữ',
      'SMS Brandname giả mạo tinh vi qua trạm BTS giả mạo sóng viễn thông',
      'Yêu cầu bấm cú pháp lạ như **21* hoặc chuyển hướng cuộc gọi'
    ],
    realExamples: [
      { text: 'Thong bao: Sim cua ban se bi khoa sau 2 gio do chua chuan hoa thong tin.', note: 'Scam to hijack SIM or divert calls' },
      { text: 'USPS: Delivery attempt failed for parcel #9931. Reschedule now.', note: 'Harvests micro-payments and card data' }
    ],
    preventionTipsEn: [
      'Hang up immediately if an automated voice claims you face arrest or court action.',
      'Government agencies and genuine banks do not demand immediate money transfers over the phone.',
      'Forward spam SMS to national reporting numbers (e.g., 7726 or 156).'
    ],
    preventionTipsVi: [
      'Cúp máy ngay khi nghe giọng đọc tự động hoặc đe dọa từ cơ quan chức năng.',
      'Cơ quan công an, viện kiểm sát KHÔNG BAO GIỜ làm việc hoặc yêu cầu chuyển tiền qua điện thoại.',
      'Chuyển tiếp tin nhắn rác/lừa đảo tới tổng đài 156 hoặc 5656 (miễn phí).'
    ]
  },
  {
    id: 'payment_scams',
    titleEn: 'Payment Scams',
    titleVi: 'Bẫy lừa đảo chuyển tiền & Thanh toán',
    descEn: 'Suspicious invoices, strange Zelle transfer notifications, or fraudulent escrow requests.',
    descVi: 'Hóa đơn giả mạo, thông báo nhận tiền quốc tế giả, ủy thác tài chính hoặc thanh toán trung gian lừa đảo.',
    iconName: 'credit-card',
    commonSignsEn: [
      'Overpayment scam: buyer claims they sent too much and asks for a refund',
      'Fake payment receipt showing funds "Pending verification until fee is paid"',
      'Requests to pay via gift cards, Western Union, or untraceable crypto transfers',
      'Seller refuses standard buyer-protection escrow and demands wire transfer'
    ],
    commonSignsVi: [
      'Chiêu trò "chuyển tiền nhầm" vào tài khoản rồi sau đó ép vay lãi nặng',
      'Ảnh chụp biên lai chuyển tiền giả (fake bill chuyển khoản ngân hàng)',
      'Yêu cầu người bán nộp phí bảo hiểm hoặc phí hải quan để giải tỏa tiền',
      'Ép buộc thanh toán qua thẻ cào, tiền ảo hoặc hình thức không có cơ chế hoàn tiền'
    ],
    realExamples: [
      { text: 'Fake Banking Screenshot claiming 50,000,000 VND transferred', note: 'Created via mobile fake receipt generator tools' },
      { text: 'International Western Union tracking fee payment demand', note: 'Fee advance fraud' }
    ],
    preventionTipsEn: [
      'Check your actual banking app balance directly—never trust an email or SMS receipt alone.',
      'Never send a "refund" for money that has not firmly posted into your cleared account balance.',
      'Treat any request for gift cards or crypto payments as an absolute red flag.'
    ],
    preventionTipsVi: [
      'Chỉ tin tưởng số dư thực tế trong ứng dụng ngân hàng chính thức, không tin ảnh chụp màn hình.',
      'Nếu nhận được tiền chuyển nhầm, tuyệt đối không tự ý chuyển lại mà liên hệ trực tiếp ngân hàng xử lý.',
      'Không bao giờ nộp "phí xác thực" hay "phí mở khóa giao dịch" cho bất kỳ ai.'
    ]
  },
  {
    id: 'impostor_compromise',
    titleEn: 'Impostor Compromise',
    titleVi: 'Mạo danh người thân & Bạn bè',
    descEn: 'Detects when friends or family\'s hacked accounts start sending suspicious, uncharacteristic links.',
    descVi: 'Nhận diện tài khoản Zalo, Facebook, Telegram của người thân, sếp hoặc bạn bè bị hack và nhắn tin vay mượn.',
    iconName: 'user',
    commonSignsEn: [
      'Message suddenly asks for urgent wire transfer or asks you to vote in a contest',
      'Unusual tone of voice or wording uncharacteristic of your close friend/family',
      'Deepfake audio/video call lasting only a few seconds with distorted connection',
      'Recipient bank account name does not match your acquaintance\'s real name'
    ],
    commonSignsVi: [
      'Đột ngột nhắn tin vay tiền gấp, nhờ chuyển khoản hộ hoặc nhờ bình chọn cuộc thi',
      'Giọng văn gượng gạo, từ ngữ xưng hô không giống thói quen hàng ngày',
      'Gọi video chỉ vài giây chập chờn, mặt cử động đơ cứng (dấu hiệu Deepfake AI)',
      'Tên chủ tài khoản nhận tiền là tên người lạ, giải thích lý do "mượn tài khoản bạn"'
    ],
    realExamples: [
      { text: 'Anh oi, em dang kẹt tiền trong viện, anh chuyển gấp giúp em 5 triệu vào STK này nhé', note: 'Classic social engineering from hijacked Messenger' },
      { text: 'Nho ban like va binh chon cho chau minh thi ve tranh tai link nay nhe...', note: 'Facebook phishing link harvesting OTP' }
    ],
    preventionTipsEn: [
      'Always call the person back on their verified cellular phone number before sending any money.',
      'Ask a personal verification question that only the real individual could answer.',
      'Never click voting links or lottery contest polls sent via direct chat.'
    ],
    preventionTipsVi: [
      'Luôn gọi điện thoại trực tiếp (bằng số điện thoại di động thông thường) để kiểm chứng trước khi chuyển tiền.',
      'Hỏi một câu hỏi riêng tư chỉ có bạn và người đó biết để lật tẩy kẻ giả mạo.',
      'Tuyệt đối không đăng nhập Facebook/Zalo qua đường link nhờ bình chọn thi ảnh, văn nghệ.'
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    questionEn: 'Do you guarantee 100% protection?',
    questionVi: 'AegisAlert có cam kết bảo vệ tuyệt đối 100% không?',
    answerEn: 'No security tool can honestly claim 100% protection against all future methods. Instead of passive shields, we focus on helping you identify threats dynamically and offering clear, objective next steps when you are in doubt.',
    answerVi: 'Không có công cụ an ninh nào có thể cam kết bảo vệ tuyệt đối 100% trước các thủ đoạn lừa đảo liên tục thay đổi. Thay vì tấm khiên thụ động hão huyền, AegisAlert trao cho bạn khả năng tự nhận diện rủi ro theo thời gian thực và cung cấp kế hoạch xử lý khách quan, bình tĩnh.'
  },
  {
    questionEn: 'How do you protect data I submit?',
    questionVi: 'Dữ liệu tôi nhập hoặc gửi lên được bảo vệ như thế nào?',
    answerEn: 'Everything is transmitted over industry-standard AES-256 encrypted protocols. Your data is processed entirely in isolated sandboxes and immediately cleared from volatile RAM memory after analysis. We retain zero private chat history or submitted identities.',
    answerVi: 'Mọi dữ liệu được mã hóa chuẩn công nghiệp AES-256. Thông tin được phân tích hoàn toàn trong môi trường hộp cát cô lập và giải phóng ngay lập tức khỏi bộ nhớ RAM sau khi kết thúc quét. Chúng tôi không lưu trữ nội dung tin nhắn, số điện thoại hay thông tin tài khoản riêng tư.'
  },
  {
    questionEn: 'Is there a browser extension I have to install?',
    questionVi: 'Tôi có bắt buộc phải cài đặt tiện ích mở rộng trình duyệt không?',
    answerEn: 'No installation required. You can check elements directly on our website, or optionally connect your secure workspace/inbox with one-click authorization. No invasive background screen recording or keyboard monitoring.',
    answerVi: 'Không bắt buộc. Bạn có thể kiểm tra trực tiếp bất kỳ liên kết, số điện thoại hoặc tin nhắn nào ngay trên trang web mà không cần cài đặt phần mềm. Chúng tôi không chạy trình theo dõi ngầm hay ghi lại thao tác bàn phím của bạn.'
  },
  {
    questionEn: 'What should I do if I already clicked a suspicious link or entered bank credentials?',
    questionVi: 'Tôi phải làm gì nếu đã lỡ click vào link lạ hoặc điền thông tin ngân hàng?',
    answerEn: 'Immediately take these 3 steps: 1) Open your bank\'s official app and use the in-app "Emergency Card Lock / Khóa thẻ khẩn cấp" feature. 2) Change your online banking password and revoke SMS Smart OTP authorizations. 3) Call your bank\'s 24/7 hotline and report the transaction.',
    answerVi: 'Hãy thực hiện ngay 3 bước khẩn cấp: 1) Mở ứng dụng ngân hàng chính thức và bật tính năng "Khóa thẻ khẩn cấp" hoặc đổi hạn mức về 0 đồng. 2) Đổi ngay mật khẩu Internet Banking và kích hoạt lại Smart OTP trên thiết bị an toàn. 3) Gọi ngay đến đường dây nóng 24/7 của ngân hàng để yêu cầu hỗ trợ phong tỏa tài khoản.'
  },
  {
    questionEn: 'How can I distinguish a legitimate brand SMS from a spoofed SMS Brandname?',
    questionVi: 'Làm thế nào để phân biệt tin nhắn thương hiệu thật và SMS Brandname giả mạo?',
    answerEn: 'Scammers can forge SMS brand names by deploying illegal portable BTS base transceiver stations. Crucial rule: legitimate banks never include a hyperlink asking you to login, cancel a debt, or input your OTP inside an SMS. If an SMS contains a login URL, treat it as fraudulent.',
    answerVi: 'Kẻ xấu có thể phát tán tin nhắn trùng tên thương hiệu ngân hàng nhờ trạm phát sóng di động BTS giả. Nguyên tắc vàng: Ngân hàng chính thống KHÔNG BAO GIỜ gửi tin nhắn kèm đường link bắt buộc đăng nhập để hủy nợ, xác thực tài khoản hay yêu cầu cung cấp OTP. Mọi tin nhắn có link đăng nhập đều là bẫy lừa đảo.'
  }
];

export const QUIZ_SCENARIOS: QuizQuestion[] = [
  {
    id: 'q1',
    titleEn: 'Netflix Billing Renewal Warning',
    titleVi: 'Cảnh báo gia hạn tài khoản Netflix',
    scenarioType: 'email',
    sender: 'Netflix Billing Support <account-alert@netflix-billing-portal.com>',
    previewContent: 'Dear Member, Your payment for the current billing cycle was declined. To avoid service suspension within 24 hours, click here to re-enter your credit card CVV code.',
    isScam: true,
    redFlagsEn: [
      'Sender domain is netflix-billing-portal.com instead of official netflix.com',
      'Coercive 24-hour urgency deadline to induce panic',
      'Requests direct credit card CVV submission via email link'
    ],
    redFlagsVi: [
      'Tên miền người gửi là netflix-billing-portal.com thay vì netflix.com chính thức',
      'Tạo áp lực thời gian 24 giờ gây hoang mang',
      'Yêu cầu điền lại mã thẻ tín dụng CVV qua đường link trong email'
    ],
    explanationEn: 'This is a textbook billing impostor phishing email. Legitimate Netflix communications will prompt you to manage your billing inside their app or directly on netflix.com.',
    explanationVi: 'Đây là email lừa đảo mạo danh Netflix kinh điển. Netflix chính hãng sẽ chỉ hướng dẫn bạn đăng nhập trực tiếp qua ứng dụng di động hoặc trang netflix.com chính thống.'
  },
  {
    id: 'q2',
    titleEn: 'Official Bank OTP Authentication',
    titleVi: 'Mã xác thực Smart OTP ngân hàng thật',
    scenarioType: 'sms',
    sender: 'Vietcombank (Official)',
    previewContent: 'VCB: Ma xac thuc Smart OTP cua Quy khach cho giao dich chuyen khoan 200,000 VND la 829104. KHONG cung cap ma nay cho bat ky ai, ke ca nhan vien ngan hang.',
    isScam: false,
    redFlagsEn: [
      'Notice explicitly reminds: "DO NOT share this code with anyone, including bank staff"',
      'No clickable web link or urgency threat included',
      'Direct transaction verification message initiated by the user'
    ],
    redFlagsVi: [
      'Tin nhắn ghi rõ: "KHÔNG cung cấp mã này cho bất kỳ ai, kể cả nhân viên ngân hàng"',
      'Không chứa bất kỳ đường link website hay lời đe dọa nào',
      'Đây là tin nhắn OTP thông thường phát sinh khi bạn tự thực hiện giao dịch'
    ],
    explanationEn: 'This is a genuine authentication message. It contains no links, clearly displays the transaction amount, and explicitly warns against sharing the code.',
    explanationVi: 'Đây là tin nhắn OTP an toàn từ ngân hàng. Điểm mấu chốt: không chứa đường link và có lời nhắc bảo mật rõ ràng.'
  },
  {
    id: 'q3',
    titleEn: 'Online Part-Time Job Offer with High Commissions',
    titleVi: 'Tuyển dụng cộng tác viên online làm nhiệm vụ',
    scenarioType: 'sms',
    sender: 'Tiki_Lazada_Recruiter (+8498129381)',
    previewContent: 'Chao ban, ban duoc tuyen chon lam Cong tac vien online chot don Shopee/Tiki. Thu nhap 500k - 2 trieu/ngay, lam tai nha. Nhan tin Zalo 098... de nhan hoa hong 10% ngay.',
    isScam: true,
    redFlagsEn: [
      'Promise of easy high income for simple tasks (500k-2M VND/day)',
      'Directing user to private Zalo/Telegram channels',
      'Classic task scam where initial small payouts lead to major locked funds'
    ],
    redFlagsVi: [
      'Hứa hẹn thu nhập cao phi lý cho công việc đơn giản tại nhà',
      'Kéo nạn nhân sang kênh chat riêng Zalo / Telegram ẩn danh',
      'Mô hình bẫy nạp tiền làm nhiệm vụ nâng cấp VIP rồi giam tiền'
    ],
    explanationEn: 'This is an infamous e-commerce task scam. Fraudsters reward small tasks first to build trust, then demand millions of deposits for "locked orders" before vanishing.',
    explanationVi: 'Đây là bẫy lừa đảo cộng tác viên làm nhiệm vụ. Ban đầu kẻ xấu trả vài chục nghìn hoa hồng để tạo lòng tin, sau đó yêu cầu nạp tiền triệu để làm đơn hàng lớn rồi chặn liên lạc.'
  },
  {
    id: 'q4',
    titleEn: 'Google Security Alert for New Device Sign-in',
    titleVi: 'Cảnh báo bảo mật tài khoản Google',
    scenarioType: 'email',
    sender: 'Google <no-reply@accounts.google.com>',
    previewContent: 'Security alert: A new sign-in on Windows was detected for your account. If this was you, you do not need to do anything. If this wasn\'t you, check your recent activity at myaccount.google.com.',
    isScam: false,
    redFlagsEn: [
      'Sender address is confirmed @accounts.google.com',
      'Uses calm language without threatening instant account deletion',
      'Directs to standard official google.com subdomain'
    ],
    redFlagsVi: [
      'Địa chỉ email chính xác từ @accounts.google.com',
      'Giọng văn bình tĩnh, không hù dọa khóa vĩnh viễn trong vài giờ',
      'Liên kết trực tiếp tới tên miền chính chủ myaccount.google.com'
    ],
    explanationEn: 'This is an authentic security alert from Google. It does not panic the user or demand sensitive credentials, providing a calm audit link to the user\'s own account portal.',
    explanationVi: 'Đây là thông báo bảo mật thật từ Google. Không tạo áp lực thời gian, không đòi hỏi mật khẩu hay thẻ thanh toán.'
  },
  {
    id: 'q5',
    titleEn: 'Traffic Violation Fine Payment Coercion',
    titleVi: 'Thông báo nộp phạt vi phạm giao thông (Phạt nguội)',
    scenarioType: 'sms',
    sender: 'CUC_CSGT (+8437812948)',
    previewContent: 'Cuc Canh Sat Giao Thong: Bien so xe cua ban bi phat nguoi 5,000,000 VND vi vuot den do. Vui long dong phat truoc ngay mai tai https://csgt-portal-nop-phat.vn/bienban',
    isScam: true,
    redFlagsEn: [
      'Police do NOT notify or collect fines via random SMS with payment links',
      'Urgency to avoid penalty within 24 hours',
      'Fake government lookalike domain (.com/.vn masquerading as official gov.vn portal)'
    ],
    redFlagsVi: [
      'Cảnh sát giao thông KHÔNG gửi tin nhắn kèm đường link nộp tiền phạt nguội',
      'Thời hạn đóng phạt gấp trong 24 giờ để tránh xác minh',
      'Tên miền giả mạo, không phải đuôi chính phủ .gov.vn'
    ],
    explanationEn: 'Government agencies in Vietnam only publish traffic violation records on the official portal (.gov.vn) and send postal mail. They never demand electronic fine transfers via arbitrary SMS links.',
    explanationVi: 'Cục Cảnh sát giao thông chỉ tra cứu trên cổng thông tin có đuôi .gov.vn hoặc gửi giấy báo về địa phương, tuyệt đối không nhắn tin yêu cầu nộp phạt qua link lạ.'
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    name: 'Tổng đài 156 / 5656',
    role: 'Tiếp nhận phản ánh tin nhắn rác & cuộc gọi lừa đảo (Cục An toàn thông tin - Bộ TT&TT)',
    phone: '156',
    scope: 'Toàn quốc (Miễn phí)',
    website: 'https://chongthurac.vn'
  },
  {
    name: 'Chống Lừa Đảo (Chongluadao.vn)',
    role: 'Cơ sở dữ liệu cảnh báo trang web giả mạo & mã độc cộng đồng',
    phone: '',
    scope: 'Trực tuyến 24/7',
    website: 'https://chongluadao.vn'
  },
  {
    name: 'Đường dây nóng Cục An ninh mạng & PCTP sử dụng công nghệ cao (A05)',
    role: 'Báo cáo tội phạm công nghệ cao & lừa đảo tài chính quy mô lớn',
    phone: '069.219.4053',
    scope: 'Bộ Công An'
  },
  {
    name: 'Vietcombank 24/7 Hotline',
    role: 'Khóa tài khoản khẩn cấp, tra soát thẻ ngân hàng',
    phone: '1900 54 54 13',
    scope: 'Ngân hàng VCB'
  },
  {
    name: 'Techcombank 24/7 Hotline',
    role: 'Khóa thẻ và đóng băng Smart OTP khẩn cấp',
    phone: '1800 58 88 22',
    scope: 'Ngân hàng TCB'
  },
  {
    name: 'BIDV 24/7 Hotline',
    role: 'Tổng đài chăm sóc khách hàng và hỗ trợ rủi ro',
    phone: '1900 9247',
    scope: 'Ngân hàng BIDV'
  }
];
