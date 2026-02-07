import { createContext, useContext, useState } from 'react'

const translations = {
  en: {
    // Navigation
    nav: {
      about: 'About',
      services: 'Services',
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
      dubaiDesc: 'Import. Melting. Refinery. Full vertical integration in the world\'s premier precious metals trading hub. DMCC and IFZA licensed operations with direct access to LBMA-accredited refineries.',
      clientsLabel: 'Institutional Partners',
      clientsTitle: 'For Serious Investors.',
      clientsDesc: 'We serve Family Offices, commodity traders, investment funds, central banks, and institutional investors seeking direct access to physical gold flows. Minimum 500g, maximum 250kg per month per client. Discretion and confidentiality guaranteed.'
    },
    // Contact
    contact: {
      label: 'Get in Touch',
      title: 'Confidential Inquiry',
      desc: 'For a confidential discussion about your requirements and our current capacities, please contact us.',
      hours: 'Mo – Fr. 8am – 5pm',
      fullName: 'Full Name *',
      company: 'Company / Institution',
      email: 'Email Address *',
      inquiryType: 'Inquiry Type',
      goldAcquisition: 'Gold Acquisition',
      partnership: 'Strategic Partnership',
      institutional: 'Institutional Inquiry',
      message: 'Your Message *',
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
      dubaiDesc: 'Import. Schmelzen. Raffinerie. Vollständige vertikale Integration im weltweit führenden Edelmetallhandelszentrum. DMCC- und IFZA-lizenzierte Operationen mit direktem Zugang zu LBMA-akkreditierten Raffinerien.',
      clientsLabel: 'Institutionelle Partner',
      clientsTitle: 'Für Ernsthafte Investoren.',
      clientsDesc: 'Wir bedienen Family Offices, Rohstoffhändler, Investmentfonds, Zentralbanken und institutionelle Anleger. Minimum 500g, Maximum 250kg pro Monat pro Kunde. Diskretion und Vertraulichkeit garantiert.'
    },
    contact: {
      label: 'Kontakt aufnehmen',
      title: 'Vertrauliche Anfrage',
      desc: 'Für ein vertrauliches Gespräch über Ihre Anforderungen und unsere aktuellen Kapazitäten kontaktieren Sie uns bitte.',
      hours: 'Mo – Fr. 8 – 17 Uhr',
      fullName: 'Vollständiger Name *',
      company: 'Unternehmen / Institution',
      email: 'E-Mail-Adresse *',
      inquiryType: 'Anfragetyp',
      goldAcquisition: 'Goldankauf',
      partnership: 'Strategische Partnerschaft',
      institutional: 'Institutionelle Anfrage',
      message: 'Ihre Nachricht *',
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
      dubaiDesc: 'Import. Fonte. Raffinerie. Intégration verticale complète dans le principal centre mondial de commerce des métaux précieux.',
      clientsLabel: 'Partenaires institutionnels',
      clientsTitle: 'Pour les investisseurs sérieux.',
      clientsDesc: 'Nous servons les Family Offices, négociants en matières premières, fonds d\'investissement et investisseurs institutionnels. Minimum 500g, maximum 250kg par mois par client.'
    },
    contact: {
      label: 'Nous contacter',
      title: 'Demande confidentielle',
      desc: 'Pour une discussion confidentielle sur vos besoins et nos capacités actuelles, veuillez nous contacter.',
      hours: 'Lu – Ve. 8h – 17h',
      fullName: 'Nom complet *',
      company: 'Société / Institution',
      email: 'Adresse e-mail *',
      inquiryType: 'Type de demande',
      goldAcquisition: 'Acquisition d\'or',
      partnership: 'Partenariat stratégique',
      institutional: 'Demande institutionnelle',
      message: 'Votre message *',
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
      dubaiDesc: 'استيراد. صهر. تكرير. تكامل رأسي كامل في مركز تجارة المعادن الثمينة الأول في العالم.',
      clientsLabel: 'شركاء مؤسسيون',
      clientsTitle: 'للمستثمرين الجادين.',
      clientsDesc: 'نخدم المكاتب العائلية وتجار السلع وصناديق الاستثمار والمستثمرين المؤسسيين. الحد الأدنى 500 جرام، الحد الأقصى 250 كجم شهرياً.'
    },
    contact: {
      label: 'تواصل معنا',
      title: 'استفسار سري',
      desc: 'للحصول على مناقشة سرية حول متطلباتك وقدراتنا الحالية، يرجى الاتصال بنا.',
      hours: 'الإثنين – الجمعة. 8 صباحاً – 5 مساءً',
      fullName: 'الاسم الكامل *',
      company: 'الشركة / المؤسسة',
      email: 'عنوان البريد الإلكتروني *',
      inquiryType: 'نوع الاستفسار',
      goldAcquisition: 'شراء الذهب',
      partnership: 'شراكة استراتيجية',
      institutional: 'استفسار مؤسسي',
      message: 'رسالتك *',
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
