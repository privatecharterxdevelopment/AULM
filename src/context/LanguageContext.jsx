import { createContext, useContext, useState } from 'react'

const translations = {
  en: {
    // Navigation
    nav: {
      about: 'About',
      services: 'Services',
      tokenization: 'Tokenization',
      sustainability: 'Sustainability',
      news: 'News',
      contact: 'Contact'
    },
    // Home sections
    home: {
      heroLabel: 'Swiss-Arab Association',
      heroTitle: 'Global Trade Corporation.',
      heroDesc: 'Licensed for import and export of refined gold bars with 99.99% purity certification. Connecting Switzerland and the Emirates through strategic partnerships with internationally renowned transport and logistics companies. End-to-end supply chain security.',
      complianceLabel: 'Compliance First',
      complianceTitle: 'Full Transparency. International Standards.',
      complianceDesc: 'Complete adherence to OECD due diligence guidelines and LBMA responsible sourcing standards. Every transaction fully documented, auditable, and traceable from mine to vault. Conflict-free gold with verified chain of custody.',
      endToEndLabel: 'End-to-End Solution',
      endToEndTitle: 'Sourcing to Delivery. One Partner.',
      endToEndDesc: 'From procurement to refined bars delivered to your vault. Complete supply chain management under one roof including sourcing, assay, certification of origin, refining, and secure logistics. No intermediaries, no complications, full transparency.',
      dubaiLabel: 'Strategic Location',
      dubaiTitle: 'Dubai Gold Import. To The World.',
      dubaiDesc: 'From import to refinery to global markets.',
      clientsLabel: 'Institutional Partners',
      clientsTitle: 'For Serious Investors.',
      clientsDesc: 'We serve Family Offices, commodity traders, investment funds, central banks, and institutional investors seeking direct access to physical gold flows. Minimum 500g, maximum 250kg per month per client. Discretion and confidentiality guaranteed.'
    },
    // Contact
    contact: {
      label: 'Get in Touch',
      title: 'Confidential Inquiry',
      desc: 'Our services are exclusively available to institutional partners and qualified investors. For access to our market capacities and a confidential initial consultation, please use the contact form.',
      hours: 'Mo – Fr. 8am – 5pm',
      fullName: 'Full Name *',
      company: 'Institution / Company Name *',
      email: 'Business Email Address *',
      country: 'Country / Headquarters *',
      inquiryType: 'Subject / Inquiry Reason',
      physicalGold: 'Physical Gold Trading',
      structuredProcurement: 'Structured Procurement',
      generalInquiry: 'General Inquiry',
      messagePlaceholder: 'Please briefly outline your volume interest and time horizon.',
      send: 'Send Inquiry',
      sending: 'Sending...',
      sent: 'Message Sent',
      thankYou: 'Thank you for your inquiry. Our team will respond within 24 hours.',
      sendAnother: 'Send Another Message',
      languages: 'Languages'
    },
    // Footer
    footer: {
      tagline: 'Swiss-Arab gold trading. DMCC & IFZA licensed, Dubai.',
      company: 'Company',
      whoWeAre: 'Who we are',
      whatWeDo: 'What we do',
      sustainability: 'Sustainability',
      contact: 'Contact',
      news: 'News',
      insights: 'Industry Insights',
      analysis: 'Market Analysis',
      compliance: 'Compliance Updates',
      services: 'Services',
      sourcing: 'Gold Sourcing',
      importExport: 'Import & Export',
      refinery: 'Refinery',
      tokenization: 'Tokenization',
      legal: 'Legal',
      terms: 'Terms of Use',
      privacy: 'Privacy Policy',
      disclaimer: 'AULM Global Trade Corporation services are exclusively available to qualified institutional clients, licensed traders, and accredited investors. All transactions are subject to full KYC/AML verification and comply with OECD due diligence guidelines for responsible supply chains.',
      b2bOnly: 'B2B Only.',
      rights: '© 2026 AULM Global Trade Corporation. All rights reserved.',
      languages: 'Languages'
    }
  },
  de: {
    nav: {
      about: 'Über uns',
      services: 'Leistungen',
      tokenization: 'Tokenisierung',
      sustainability: 'Nachhaltigkeit',
      news: 'Aktuelles',
      contact: 'Kontakt'
    },
    home: {
      heroLabel: 'Schweizer-Arabische Vereinigung',
      heroTitle: 'Globale Handelsgesellschaft.',
      heroDesc: 'Lizenziert für Import und Export von raffinierten Goldbarren mit 99,99% Reinheitszertifizierung. Verbindung der Schweiz und der Emirate durch strategische Partnerschaften mit international renommierten Transport- und Logistikunternehmen. End-to-End Lieferkettensicherheit.',
      complianceLabel: 'Compliance First',
      complianceTitle: 'Vollständige Transparenz. Internationale Standards.',
      complianceDesc: 'Vollständige Einhaltung der OECD-Sorgfaltspflichtrichtlinien und LBMA-Standards für verantwortungsvolle Beschaffung. Jede Transaktion vollständig dokumentiert, prüfbar und von der Mine bis zum Tresor rückverfolgbar. Konfliktfreies Gold mit verifizierter Lieferkette.',
      endToEndLabel: 'End-to-End Lösung',
      endToEndTitle: 'Von der Beschaffung zur Lieferung. Ein Partner.',
      endToEndDesc: 'Von der Beschaffung bis zu raffinierten Barren, die in Ihr Depot geliefert werden. Komplettes Lieferkettenmanagement aus einer Hand, einschließlich Beschaffung, Assay, Herkunftszertifizierung, Raffination und sichere Logistik.',
      dubaiLabel: 'Strategischer Standort',
      dubaiTitle: 'Dubai Goldimport. In die Welt.',
      dubaiDesc: 'Von Import zur Raffinerie zu globalen Märkten.',
      clientsLabel: 'Institutionelle Partner',
      clientsTitle: 'Für Ernsthafte Investoren.',
      clientsDesc: 'Wir bedienen Family Offices, Rohstoffhändler, Investmentfonds, Zentralbanken und institutionelle Anleger. Minimum 500g, Maximum 250kg pro Monat pro Kunde. Diskretion und Vertraulichkeit garantiert.'
    },
    contact: {
      label: 'Kontakt aufnehmen',
      title: 'Vertrauliche Anfrage',
      desc: 'Unser Service richtet sich an institutionelle Partner und qualifizierte Investoren. Für einen Zugang zu unseren Marktkapazitäten und einem vertraulichen Erstgespräch nutzen Sie bitte das Kontaktformular.',
      hours: 'Mo – Fr. 8 – 17 Uhr',
      fullName: 'Vollständiger Name *',
      company: 'Name der Institution / Firma *',
      email: 'Geschäftliche E-Mail-Adresse *',
      country: 'Land / Sitz *',
      inquiryType: 'Betreff / Anfragegrund',
      physicalGold: 'Physischer Goldhandel',
      structuredProcurement: 'Strukturierte Beschaffung',
      generalInquiry: 'Allgemeine Anfrage',
      messagePlaceholder: 'Bitte skizzieren Sie kurz Ihr Volumeninteresse und Ihren Zeithorizont.',
      send: 'Anfrage senden',
      sending: 'Wird gesendet...',
      sent: 'Nachricht gesendet',
      thankYou: 'Vielen Dank für Ihre Anfrage. Unser Team wird innerhalb von 24 Stunden antworten.',
      sendAnother: 'Weitere Nachricht senden',
      languages: 'Sprachen'
    },
    footer: {
      tagline: 'Schweizer-Arabischer Goldhandel. DMCC & IFZA lizenziert, Dubai.',
      company: 'Unternehmen',
      whoWeAre: 'Wer wir sind',
      whatWeDo: 'Was wir tun',
      sustainability: 'Nachhaltigkeit',
      contact: 'Kontakt',
      news: 'Aktuelles',
      insights: 'Brancheneinblicke',
      analysis: 'Marktanalyse',
      compliance: 'Compliance Updates',
      services: 'Leistungen',
      sourcing: 'Goldbeschaffung',
      importExport: 'Import & Export',
      refinery: 'Raffinerie',
      tokenization: 'Tokenisierung',
      legal: 'Rechtliches',
      terms: 'Nutzungsbedingungen',
      privacy: 'Datenschutz',
      disclaimer: 'Die Dienstleistungen der AULM Global Trade Corporation stehen ausschließlich qualifizierten institutionellen Kunden, lizenzierten Händlern und akkreditierten Investoren zur Verfügung. Alle Transaktionen unterliegen vollständiger KYC/AML-Verifizierung.',
      b2bOnly: 'Nur B2B.',
      rights: '© 2026 AULM Global Trade Corporation. Alle Rechte vorbehalten.',
      languages: 'Sprachen'
    }
  },
  fr: {
    nav: {
      about: 'À propos',
      services: 'Services',
      tokenization: 'Tokenisation',
      sustainability: 'Durabilité',
      news: 'Actualités',
      contact: 'Contact'
    },
    home: {
      heroLabel: 'Association Suisse-Arabe',
      heroTitle: 'Société de Commerce Mondial.',
      heroDesc: 'Licencié pour l\'import et l\'export de lingots d\'or raffinés avec certification de pureté à 99,99%. Connecter la Suisse et les Émirats grâce à des partenariats stratégiques avec des sociétés de transport et de logistique de renommée internationale.',
      complianceLabel: 'Conformité d\'abord',
      complianceTitle: 'Transparence totale. Normes internationales.',
      complianceDesc: 'Respect total des directives de diligence raisonnable de l\'OCDE et des normes d\'approvisionnement responsable LBMA. Chaque transaction entièrement documentée, vérifiable et traçable de la mine au coffre.',
      endToEndLabel: 'Solution complète',
      endToEndTitle: 'De l\'approvisionnement à la livraison. Un seul partenaire.',
      endToEndDesc: 'De l\'approvisionnement aux lingots raffinés livrés dans votre coffre. Gestion complète de la chaîne d\'approvisionnement sous un même toit.',
      dubaiLabel: 'Emplacement stratégique',
      dubaiTitle: 'Import d\'or de Dubaï. Vers le monde.',
      dubaiDesc: 'De l\'import à la raffinerie aux marchés mondiaux.',
      clientsLabel: 'Partenaires institutionnels',
      clientsTitle: 'Pour les investisseurs sérieux.',
      clientsDesc: 'Nous servons les Family Offices, négociants en matières premières, fonds d\'investissement et investisseurs institutionnels. Minimum 500g, maximum 250kg par mois par client.'
    },
    contact: {
      label: 'Nous contacter',
      title: 'Demande confidentielle',
      desc: 'Nos services sont exclusivement réservés aux partenaires institutionnels et investisseurs qualifiés. Pour accéder à nos capacités de marché et bénéficier d\'une consultation initiale confidentielle, veuillez utiliser le formulaire de contact.',
      hours: 'Lu – Ve. 8h – 17h',
      fullName: 'Nom complet *',
      company: 'Nom de l\'institution / société *',
      email: 'Adresse e-mail professionnelle *',
      country: 'Pays / Siège *',
      inquiryType: 'Sujet / Motif de la demande',
      physicalGold: 'Commerce d\'or physique',
      structuredProcurement: 'Approvisionnement structuré',
      generalInquiry: 'Demande générale',
      messagePlaceholder: 'Veuillez décrire brièvement votre intérêt en volume et votre horizon temporel.',
      send: 'Envoyer la demande',
      sending: 'Envoi en cours...',
      sent: 'Message envoyé',
      thankYou: 'Merci pour votre demande. Notre équipe vous répondra dans les 24 heures.',
      sendAnother: 'Envoyer un autre message',
      languages: 'Langues'
    },
    footer: {
      tagline: 'Commerce d\'or Suisse-Arabe. DMCC & IFZA licencié, Dubaï.',
      company: 'Société',
      whoWeAre: 'Qui nous sommes',
      whatWeDo: 'Ce que nous faisons',
      sustainability: 'Durabilité',
      contact: 'Contact',
      news: 'Actualités',
      insights: 'Aperçus du secteur',
      analysis: 'Analyse de marché',
      compliance: 'Mises à jour conformité',
      services: 'Services',
      sourcing: 'Approvisionnement en or',
      importExport: 'Import & Export',
      refinery: 'Raffinerie',
      tokenization: 'Tokenisation',
      legal: 'Mentions légales',
      terms: 'Conditions d\'utilisation',
      privacy: 'Politique de confidentialité',
      disclaimer: 'Les services d\'AULM Global Trade Corporation sont exclusivement disponibles pour les clients institutionnels qualifiés, les négociants agréés et les investisseurs accrédités.',
      b2bOnly: 'B2B uniquement.',
      rights: '© 2026 AULM Global Trade Corporation. Tous droits réservés.',
      languages: 'Langues'
    }
  },
  ar: {
    nav: {
      about: 'من نحن',
      services: 'الخدمات',
      tokenization: 'الترميز',
      sustainability: 'الاستدامة',
      news: 'الأخبار',
      contact: 'اتصل بنا'
    },
    home: {
      heroLabel: 'الجمعية السويسرية العربية',
      heroTitle: 'شركة التجارة العالمية.',
      heroDesc: 'مرخصة لاستيراد وتصدير سبائك الذهب المكررة بشهادة نقاء 99.99٪. ربط سويسرا والإمارات من خلال شراكات استراتيجية مع شركات النقل واللوجستيات ذات الشهرة العالمية.',
      complianceLabel: 'الامتثال أولاً',
      complianceTitle: 'شفافية كاملة. معايير دولية.',
      complianceDesc: 'الالتزام الكامل بإرشادات العناية الواجبة لمنظمة التعاون الاقتصادي والتنمية ومعايير LBMA للمصادر المسؤولة. كل معاملة موثقة بالكامل وقابلة للتدقيق.',
      endToEndLabel: 'حل شامل',
      endToEndTitle: 'من التوريد إلى التسليم. شريك واحد.',
      endToEndDesc: 'من الشراء إلى السبائك المكررة المسلمة إلى خزينتك. إدارة سلسلة التوريد الكاملة تحت سقف واحد.',
      dubaiLabel: 'موقع استراتيجي',
      dubaiTitle: 'استيراد الذهب من دبي. إلى العالم.',
      dubaiDesc: 'من الاستيراد إلى المصفاة إلى الأسواق العالمية.',
      clientsLabel: 'شركاء مؤسسيون',
      clientsTitle: 'للمستثمرين الجادين.',
      clientsDesc: 'نخدم المكاتب العائلية وتجار السلع وصناديق الاستثمار والمستثمرين المؤسسيين. الحد الأدنى 500 جرام، الحد الأقصى 250 كجم شهرياً.'
    },
    contact: {
      label: 'تواصل معنا',
      title: 'استفسار سري',
      desc: 'خدماتنا متاحة حصرياً للشركاء المؤسسيين والمستثمرين المؤهلين. للوصول إلى قدراتنا السوقية والحصول على استشارة أولية سرية، يرجى استخدام نموذج الاتصال.',
      hours: 'الإثنين – الجمعة. 8 صباحاً – 5 مساءً',
      fullName: 'الاسم الكامل *',
      company: 'اسم المؤسسة / الشركة *',
      email: 'البريد الإلكتروني للعمل *',
      country: 'البلد / المقر *',
      inquiryType: 'الموضوع / سبب الاستفسار',
      physicalGold: 'تداول الذهب الفعلي',
      structuredProcurement: 'الشراء المنظم',
      generalInquiry: 'استفسار عام',
      messagePlaceholder: 'يرجى توضيح اهتمامك بالحجم والإطار الزمني بإيجاز.',
      send: 'إرسال الاستفسار',
      sending: 'جاري الإرسال...',
      sent: 'تم إرسال الرسالة',
      thankYou: 'شكراً لاستفسارك. سيرد فريقنا خلال 24 ساعة.',
      sendAnother: 'إرسال رسالة أخرى',
      languages: 'اللغات'
    },
    footer: {
      tagline: 'تجارة الذهب السويسرية العربية. مرخصة DMCC & IFZA، دبي.',
      company: 'الشركة',
      whoWeAre: 'من نحن',
      whatWeDo: 'ماذا نفعل',
      sustainability: 'الاستدامة',
      contact: 'اتصل بنا',
      news: 'الأخبار',
      insights: 'رؤى الصناعة',
      analysis: 'تحليل السوق',
      compliance: 'تحديثات الامتثال',
      services: 'الخدمات',
      sourcing: 'توريد الذهب',
      importExport: 'الاستيراد والتصدير',
      refinery: 'التكرير',
      tokenization: 'الترميز',
      legal: 'قانوني',
      terms: 'شروط الاستخدام',
      privacy: 'سياسة الخصوصية',
      disclaimer: 'خدمات شركة AULM Global Trade Corporation متاحة حصرياً للعملاء المؤسسيين المؤهلين والتجار المرخصين والمستثمرين المعتمدين.',
      b2bOnly: 'B2B فقط.',
      rights: '© 2026 AULM Global Trade Corporation. جميع الحقوق محفوظة.',
      languages: 'اللغات'
    }
  },
  zh: {
    nav: {
      about: '关于我们',
      services: '服务',
      tokenization: '代币化',
      sustainability: '可持续发展',
      news: '新闻',
      contact: '联系我们'
    },
    home: {
      heroLabel: '瑞士-阿拉伯协会',
      heroTitle: '全球贸易公司。',
      heroDesc: '获得进出口精炼金条许可，纯度认证99.99%。通过与国际知名运输和物流公司的战略合作，连接瑞士和阿联酋。端到端供应链安全。',
      complianceLabel: '合规优先',
      complianceTitle: '完全透明。国际标准。',
      complianceDesc: '完全遵守经合组织尽职调查指南和LBMA负责任采购标准。每笔交易都有完整记录，可审计，从矿山到金库全程可追溯。',
      endToEndLabel: '端到端解决方案',
      endToEndTitle: '从采购到交付。一站式合作伙伴。',
      endToEndDesc: '从采购到精炼金条交付到您的金库。包括采购、检验、原产地认证、精炼和安全物流的完整供应链管理。',
      dubaiLabel: '战略位置',
      dubaiTitle: '迪拜黄金进口。面向世界。',
      dubaiDesc: '从进口到精炼厂再到全球市场。',
      clientsLabel: '机构合作伙伴',
      clientsTitle: '服务于严肃的投资者。',
      clientsDesc: '我们服务于家族办公室、大宗商品交易商、投资基金、中央银行和机构投资者。每月每客户最低500克，最高250公斤。保证谨慎和保密。'
    },
    contact: {
      label: '联系我们',
      title: '保密咨询',
      desc: '我们的服务专为机构合作伙伴和合格投资者提供。如需了解我们的市场产能并进行保密初次咨询，请使用联系表单。',
      hours: '周一至周五 上午8点至下午5点',
      fullName: '全名 *',
      company: '机构/公司名称 *',
      email: '商务电子邮件地址 *',
      country: '国家/总部 *',
      inquiryType: '主题/咨询原因',
      physicalGold: '实物黄金交易',
      structuredProcurement: '结构化采购',
      generalInquiry: '一般咨询',
      messagePlaceholder: '请简要说明您的交易量兴趣和时间范围。',
      send: '发送咨询',
      sending: '发送中...',
      sent: '消息已发送',
      thankYou: '感谢您的咨询。我们的团队将在24小时内回复。',
      sendAnother: '发送另一条消息',
      languages: '语言'
    },
    footer: {
      tagline: '瑞士-阿拉伯黄金贸易。DMCC & IFZA许可，迪拜。',
      company: '公司',
      whoWeAre: '关于我们',
      whatWeDo: '我们的服务',
      sustainability: '可持续发展',
      contact: '联系我们',
      news: '新闻',
      insights: '行业洞察',
      analysis: '市场分析',
      compliance: '合规更新',
      services: '服务',
      sourcing: '黄金采购',
      importExport: '进出口',
      refinery: '精炼',
      tokenization: '代币化',
      legal: '法律',
      terms: '使用条款',
      privacy: '隐私政策',
      disclaimer: 'AULM Global Trade Corporation的服务仅面向合格的机构客户、持牌交易商和认可投资者。所有交易均需完整的KYC/AML验证。',
      b2bOnly: '仅限B2B。',
      rights: '© 2026 AULM Global Trade Corporation. 版权所有。',
      languages: '语言'
    }
  },
  ja: {
    nav: {
      about: '会社概要',
      services: 'サービス',
      tokenization: 'トークン化',
      sustainability: 'サステナビリティ',
      news: 'ニュース',
      contact: 'お問い合わせ'
    },
    home: {
      heroLabel: 'スイス・アラブ協会',
      heroTitle: 'グローバル・トレード・コーポレーション。',
      heroDesc: '純度99.99%認証の精製金地金の輸出入ライセンスを取得。国際的に著名な輸送・物流企業との戦略的パートナーシップを通じて、スイスとアラブ首長国連邦を結びます。',
      complianceLabel: 'コンプライアンス第一',
      complianceTitle: '完全な透明性。国際基準。',
      complianceDesc: 'OECDデューデリジェンスガイドラインとLBMA責任ある調達基準を完全に遵守。すべての取引は完全に文書化され、監査可能で、鉱山から金庫まで追跡可能です。',
      endToEndLabel: 'エンドツーエンドソリューション',
      endToEndTitle: '調達から納品まで。ワンストップパートナー。',
      endToEndDesc: '調達から精製金地金のお届けまで。調達、分析、原産地証明、精製、安全な物流を含む完全なサプライチェーン管理。',
      dubaiLabel: '戦略的立地',
      dubaiTitle: 'ドバイ金輸入。世界へ。',
      dubaiDesc: '輸入から精製所へ、そしてグローバル市場へ。',
      clientsLabel: '機関投資家パートナー',
      clientsTitle: '真剣な投資家のために。',
      clientsDesc: 'ファミリーオフィス、商品トレーダー、投資ファンド、中央銀行、機関投資家にサービスを提供。月間最低500g、最大250kg。機密保持を保証。'
    },
    contact: {
      label: 'お問い合わせ',
      title: '機密相談',
      desc: '当社のサービスは機関投資家パートナーおよび適格投資家の方のみを対象としています。当社の市場対応能力へのアクセスおよび機密初回相談をご希望の場合は、お問い合わせフォームをご利用ください。',
      hours: '月～金 8:00-17:00',
      fullName: '氏名 *',
      company: '機関名/会社名 *',
      email: 'ビジネスメールアドレス *',
      country: '国/本社所在地 *',
      inquiryType: '件名/お問い合わせ理由',
      physicalGold: '現物金取引',
      structuredProcurement: '構造化調達',
      generalInquiry: '一般的なお問い合わせ',
      messagePlaceholder: 'ご興味のある取引量と時間軸を簡潔にご記入ください。',
      send: '送信',
      sending: '送信中...',
      sent: 'メッセージ送信完了',
      thankYou: 'お問い合わせありがとうございます。24時間以内にご返信いたします。',
      sendAnother: '別のメッセージを送信',
      languages: '言語'
    },
    footer: {
      tagline: 'スイス・アラブ金取引。DMCC & IFZAライセンス取得、ドバイ。',
      company: '会社',
      whoWeAre: '会社概要',
      whatWeDo: '事業内容',
      sustainability: 'サステナビリティ',
      contact: 'お問い合わせ',
      news: 'ニュース',
      insights: '業界インサイト',
      analysis: '市場分析',
      compliance: 'コンプライアンス更新',
      services: 'サービス',
      sourcing: '金の調達',
      importExport: '輸出入',
      refinery: '精製',
      tokenization: 'トークン化',
      legal: '法的事項',
      terms: '利用規約',
      privacy: 'プライバシーポリシー',
      disclaimer: 'AULM Global Trade Corporationのサービスは、適格な機関投資家、認可された取引業者、認定投資家のみを対象としています。',
      b2bOnly: 'B2B専用。',
      rights: '© 2026 AULM Global Trade Corporation. All rights reserved.',
      languages: '言語'
    }
  }
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
