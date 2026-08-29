import { COMPLIANCE_EMAIL, GOAML_PORTAL_URL, GOAML_REGISTRATION_CODE } from '../../config/site'
import type { DocumentCategory } from '../../data/documents'
import type { DocCategoryCopy, DocsCopy } from '../docsFromData'

const INVOICE_BULLETS = [
  'Inhaltsbeschreibung (Doré, Bullion, Staub, Nuggets, Diamanten usw.)',
  'Nettogewicht des Inhalts',
  'Bruttogewicht der Sendung',
  'Wert des Inhalts',
  'Beschreibung des/der Behältnisse',
  'Absender und Empfänger (vollständige rechtliche Namen und Adressen)',
]

const RESPONSIBLE_SOURCING_INTRO =
  'AULM Precious Metal Trader (IFZA License No. 85927) verpflichtet sich, hochwertige Produkte und Dienstleistungen bereitzustellen und dabei die höchsten ethischen und moralischen Standards bei der verantwortungsvollen Beschaffung einzuhalten. Wir anerkennen, dass Gewinnung, Handel, Handhabung und Ausfuhr von Mineralien aus konfliktbetroffenen und Hochrisikogebieten (CAHRAs) erhebliche nachteilige Auswirkungen nach sich ziehen können. Wir anerkennen unsere Verantwortung, die Menschenrechte zu achten und nicht zu Konflikten beizutragen.'

const POLICY_SUPPLY_CHAIN = {
  title: 'Lieferkettenrichtlinie',
  paragraphs: [
    'Wir verpflichten uns, eine Richtlinie zur verantwortungsvollen Beschaffung von Mineralien aus konfliktbetroffenen und Hochrisikogebieten zu verabschieden, weit zu verbreiten und in Verträge und Vereinbarungen mit Lieferanten aufzunehmen. Wir verpflichten uns, Handlungen zu unterlassen, die der Finanzierung von Konflikten dienen, und die einschlägigen Sanktionsresolutionen der Vereinten Nationen sowie geltendes nationales Recht einzuhalten.',
  ],
  bullets: [
    'Folter sowie grausame, unmenschliche und erniedrigende Behandlung',
    'Zwangs- oder Pflichtarbeit',
    'Die schlimmsten Formen der Kinderarbeit',
    'Weit verbreitete sexuelle Gewalt und andere schwere Menschenrechtsverletzungen',
    'Kriegsverbrechen, Verbrechen gegen die Menschlichkeit oder Völkermord',
  ],
}

const POLICY_ARMED_GROUPS = {
  title: 'Nichtstaatliche bewaffnete Gruppen und Sicherheitskräfte',
  paragraphs: [
    'Wir dulden keine direkte oder indirekte Unterstützung nichtstaatlicher bewaffneter Gruppen durch Gewinnung, Transport, Handel, Handhabung oder Ausfuhr von Mineralien. Wir unterbinden direkte oder indirekte Unterstützung öffentlicher oder privater Sicherheitskräfte, die Minenstandorte illegal kontrollieren oder an Zugangspunkten bzw. entlang von Transportwegen Abgaben erheben oder erpressen.',
    'Wo Sicherheitskräfte beauftragt werden, verlangen wir ein Vorgehen gemäß den Voluntary Principles on Security and Human Rights, einschließlich Screening, damit Personen, die für schwere Menschenrechtsverletzungen verantwortlich sind, nicht beschäftigt werden.',
  ],
  bullets: [] as string[],
}

const POLICY_BRIBERY_AML = {
  title: 'Antikorruption und Geldwäscheprävention',
  paragraphs: [
    'Wir bieten, versprechen, gewähren oder fordern keine Bestechungsgelder und widerstehen der Aufforderung zu Bestechung, um den Mineralursprung zu verschleiern oder Steuern, Gebühren und Abgaben an Staaten falsch darzustellen.',
    'Wir unterstützen die wirksame Unterbindung von Geldwäsche im Zusammenhang mit illegaler Besteuerung oder Erpressung in Minerallieferketten. Alle Steuern, Gebühren und Abgaben im Zusammenhang mit Gewinnung, Handel und Ausfuhr von Mineralien aus CAHRAs werden an Staaten entrichtet und, soweit anwendbar, nach EITI-Grundsätzen offengelegt.',
  ],
  bullets: [] as string[],
}

const POLICY_TFS = {
  title: 'Gezielte Finanzsanktionen (TFS)',
  paragraphs: [
    'AULM Trading hält die Sanktionsregime der UAE und internationale Sanktionsregime ein, um Terrorismusfinanzierung und Proliferationsfinanzierung zu verhindern, einschließlich UNSCR 1267, 1373 und 1718, UAE Cabinet Decision No. 74 of 2020 sowie FATF-Empfehlungen 6 und 7.',
    'Wir führen täglich Screenings von Kunden, Transaktionen und wirtschaftlich Berechtigten gegen Sanktionslisten durch. Gelistete Personen werden unverzüglich eingefroren. Verdachtsmeldungen erfolgen über goAML innerhalb der vorgeschriebenen Fristen.',
  ],
  bullets: [] as string[],
}

const POLICY_AML_CFT = {
  title: 'AML-/CFT-Programm',
  paragraphs: [
    'Unsere Richtlinien und Verfahren entsprechen der bundesrechtlichen AML-Gesetzgebung der UAE, einschließlich Risikobewertung, Kunden-Due-Diligence, verstärkter Due Diligence, laufender Überwachung, Verdachtsmeldungen, Governance, Schulung und Aufbewahrung.',
    'Sanktionslisten der Regierung der UAE und des Sicherheitsrats der Vereinten Nationen werden gescreent; das Einfrieren von Vermögenswerten und zugehörige Weisungen werden gemäß TFS-Entscheidungen befolgt.',
  ],
  bullets: [] as string[],
}

const POLICY_GRIEVANCE = {
  title: 'Beschwerdemechanismus',
  paragraphs: [
    'Wir unterhalten ein strukturiertes Verfahren für Beschwerden von Mitarbeitenden, Kunden, Lieferanten und anderen Stakeholdern. Anliegen können an unseren Compliance-Desk unter contact@aulmtrading.com gemeldet werden.',
    'Alle Beschwerden werden protokolliert, untersucht und mindestens fünf Jahre nach Abschluss aufbewahrt, im Einklang mit der OECD Due Diligence Guidance für verantwortungsvolle Mineralbeschaffung.',
  ],
  bullets: [] as string[],
}

const POLICY_ABC = {
  title: 'Antikorruption und Bestechungsbekämpfung',
  paragraphs: [
    'AULM Trading verfolgt in allen Betrieben eine Null-Toleranz gegenüber Bestechung und Korruption. Die Richtlinie gilt weltweit für Mitarbeitende, Geschäftsleitung, Auftragnehmer und verbundene Unternehmen.',
    'Geschenke, Bewirtung, politische Zuwendungen, Interessenkonflikte und Drittbeziehungen unterliegen der Due Diligence. Hinweisgeber sind geschützt. Verstöße können Disziplinarmaßnahmen, Kündigung, Geldbußen oder den Entzug der Lizenz nach sich ziehen.',
  ],
  bullets: [] as string[],
}

export const deProcedureCategories: Record<DocumentCategory, DocCategoryCopy> = {
  'shipping-instructions': {
    label: 'Versandanweisungen',
    description:
      'Annahme Dubai, Handgepäck, kommerzielle Fracht, Doré-Ankauf, Mustersendungen und regionale Beratungsverfahren.',
  },
  compliance: {
    label: 'Compliance',
    description:
      'Konfliktfreies Gold, Lieferketten-Due-Diligence, AML und Standards für institutionelle Kontrahenten.',
  },
}

export const deProcedureDocs: DocsCopy = {
  'shipping-instructions': {
    title: 'Versandanweisungen',
    summary: 'Überblick über alle Versand-, Handgepäck- und Annahmeverfahren für Dubai.',
    sections: [
      {
        title: '',
        paragraphs: [
          'Sämtliches Material, das an AULM in Dubai gesendet wird — kommerzielle Fracht, Handgepäck oder Musterchargen — muss den Verfahren dieser Bibliothek folgen. Nichteinhaltung kann zur zollrechtlichen Zurückweisung, verzögerten Abfertigung oder Ablehnung der Annahme führen.',
          'Erstmalige Kunden müssen Onboarding und Kontoeröffnung abschließen, bevor sie versenden. Compliance ist mindestens 48 Stunden vor jeder Ankunft zu benachrichtigen, mit Handelsrechnung, Ursprungszeugnis und Air-Waybill- bzw. Kurierdaten.',
        ],
        bullets: [],
      },
      {
        title: 'Zentrale Anforderungen',
        paragraphs: [],
        bullets: [
          'Sämtliche Edelmetallfracht gegenüber Airline und Spediteur als VALUE CARGO deklarieren',
          'Erforderliche Dokumente vor Abflug per E-Mail an Compliance senden',
          'TransGuard, Brinks oder G4S für den Transfer Flughafen–Raffinerie nutzen, wenn von AULM benannt',
          'UN-Eigenerklärung zu konfliktfreiem Gold beim Gold-Handgepäck mitführen',
          'Compliance für korridorspezifische Beratung Afrika oder Südamerika kontaktieren',
        ],
      },
    ],
  },
  dubai: {
    title: 'Dubai',
    summary: 'IFZA-Annahmehub Dubai — Zoll, gesicherte Logistik und Übergabe an die Raffinerie.',
    sections: [
      {
        title: '',
        paragraphs: [
          'AULM ist in Dubai IFZA tätig (License No. 85927). Sämtliche eingehenden Edelmetalle und Diamanten werden über den Zoll von Dubai oder Abu Dhabi abgefertigt und unter versichertem Mandat an die benannte Raffinerie oder den Verwahrungspartner überführt.',
        ],
        bullets: [],
      },
      {
        title: 'Bei Ankunft in der Flughafen-Freihandelszone',
        paragraphs: [],
        bullets: [
          'Dubai Customs benachrichtigt AULM und den benannten Sicherheitscarrier über die Ankunft der Sendung',
          'Papiere für den Transfer an TransGuard, Brinks oder G4S werden bearbeitet',
          'Verzögerungen in dieser Phase entstehen in der Regel durch falschen Air-Waybill-Empfänger oder fehlende Dokumente',
        ],
      },
      {
        title: 'Bei Ankunft an der Raffinerie',
        paragraphs: [],
        bullets: [
          'Material wird in Anwesenheit eines Vertreters von AULM geöffnet und gewogen — videoaufgezeichnet',
          'Geschmolzen, beprobt und zu unreinen Doré-Barren für die Abwicklung gegossen',
          'Der Kunde kann eine Probe behalten; AULM behält Assay- und Schiedsproben',
          'Feuerprobe nach LBMA/ASTM-Standards innerhalb eines Arbeitstags',
          'Abwicklung innerhalb von 48 Stunden nach akzeptiertem Endassay',
        ],
      },
    ],
  },
  'diamonds-hand-carry-procedures': {
    title: 'Diamanten-Handgepäckverfahren',
    summary: 'Flughafendeklaration und Dokumentation für Rohdiamanten, die nach Dubai mitgeführt werden.',
    sections: [
      {
        title: '',
        paragraphs: [
          'Rohdiamanten, die in die UAE eingeführt werden, sind bei Ankunft dem Zoll zu deklarieren. Unterlassene Deklaration ist eine Straftat. AULM unterstützt Passagiere nicht im Sicherheitsbereich des Flughafens — alle Deklarationen sind direkt mit den Zollbeamten abzuschließen.',
        ],
        bullets: [],
      },
      {
        title: 'Vor der Reise',
        paragraphs: [],
        bullets: [
          'AULM Compliance mindestens 24 Stunden vor Abflug mit Passkopie, Visum und Flugdaten kontaktieren',
          'Handelsrechnung und Ursprungszeugnis in englischer Sprache vorbereiten',
          'Kimberley-Process-Zertifikat bestätigen, soweit anwendbar',
          'Nichtenglische Dokumente können eine erstattungsfähige Zollkaution von AED 1.000 erfordern',
        ],
      },
      {
        title: 'Am Flughafen Dubai',
        paragraphs: [],
        bullets: [
          'Zu „Something to declare“ gehen und die Sendung den Beamten identifizieren',
          'Ursprungszeugnis, Handelsrechnung und KP-Dokumentation vorlegen',
          'Bordkarte bis zum Abschluss der Zollabfertigung aufbewahren',
          'Die Handelsrechnung darf beim Handgepäck auf den Passagier ausgestellt sein — nicht auf AULM',
        ],
      },
    ],
  },
  'diamond-hand-carry-procedures': {
    title: 'Diamant-Handgepäckverfahren',
    summary: 'Derselbe Korridor wie Diamanten-Handgepäck — Deklaration, KP und Zollschritte für den Eintritt nach Dubai.',
    sections: [
      {
        title: '',
        paragraphs: [
          'Dieses Verfahren spiegelt unsere Diamanten-Handgepäckanweisungen für den Ein-Personen-Import von Rohdiamanten nach Dubai zum Weiterverkauf oder zur Verwahrung bei AULM.',
          'Alle Chargen unterliegen der Lieferketten-Due-Diligence und der Kimberley-Process-Konformität vor Kauf oder Lagerung.',
        ],
        bullets: [],
      },
      {
        title: 'Erforderliche Dokumente',
        paragraphs: [],
        bullets: [
          'Handelsrechnung (Englisch) mit Karatgewicht, Beschreibung und Wert',
          'Ursprungszeugnis',
          'Kimberley-Process-Zertifikat für anwendbare Rohdiamantensendungen',
          'Kopien von Reisepass und Visum des Passagiers im Voraus an AULM',
        ],
      },
      {
        title: 'Zoll',
        paragraphs: [],
        bullets: [
          'Bei „Something to declare“ deklarieren — nicht ohne Abfertigung austreten',
          'AULM-Mitarbeitende treffen Passagiere am Terminalausgang erst nach zollrechtlicher Freigabe',
          'Mehrwertsteuerfolgen können eintreten, wenn die Ware nicht an eine in den UAE mehrwertsteuerlich registrierte Einheit konsigniert ist',
        ],
      },
    ],
  },
  'gold-hand-carry-procedures': {
    title: 'Gold-Handgepäckverfahren',
    summary: 'Deklaration, Mehrwertsteuer und Dokumentation für unreines Gold, das nach Dubai (DXB) mitgeführt wird.',
    sections: [
      {
        title: '',
        paragraphs: [
          'Bei der Einreise nach Dubai mit unreinem Gold zur Raffination ist dies dem Zoll zu deklarieren. Auf Raffinationsannahme fällt kein Einfuhrzoll an, Mehrwertsteuer kann jedoch gelten, wenn die Ware nicht an ein in den UAE mehrwertsteuerlich registriertes Unternehmen konsigniert ist. Einreise ohne Deklaration ist eine Straftat.',
        ],
        bullets: [],
      },
      {
        title: 'Empfohlen: Meet & Greet',
        paragraphs: [
          'Wenn Sie AULM mindestens 24 Stunden vor Abflug mit Reisepass, Visum und Ticket kontaktieren, können wir ein Meet-and-Greet über Marhaba Services zur Begleitung zur Einreise arrangieren. AULM-Mitarbeitende warten nach der Zollabfertigung am Terminalausgang.',
        ],
        bullets: [],
      },
      {
        title: 'Standardschritte bei der Einreise',
        paragraphs: [],
        bullets: [
          'Mit der Ware in der Hand von Bord gehen und die Passkontrolle passieren',
          '„Something to declare“ nutzen und die Sendung den Beamten identifizieren',
          'Ursprungszeugnis und Handelsrechnung mit Empfänger-MwSt.-TRN vorlegen, soweit anwendbar',
          'Doré- oder Barrenform: Inspektion, danach Austritt nach Abfertigung',
          'Staub oder Nuggets: Weiterleitung an Terminal Value Customs — Probenassay kann erforderlich sein (Bearbeitungsgebühr AED 50)',
          'Bordkarte für die Abholung festgehaltener Goldsendungen aufbewahren, soweit zutreffend',
        ],
      },
      {
        title: 'Handelsrechnung (Handgepäck)',
        paragraphs: [],
        bullets: INVOICE_BULLETS,
      },
      {
        title: 'Hinweis',
        paragraphs: [
          'AULM kann im Sicherheitsbereich des Flughafens nicht unterstützen. Bei rechtzeitiger Vorankündigung arrangieren wir MwSt.-Verrechnung und TransGuard-Abholung nach zollrechtlicher Freigabe.',
        ],
        bullets: [],
      },
    ],
  },
  'dore-buying-procedures': {
    title: 'Doré-Ankaufsverfahren',
    summary: 'Kontoeröffnung, Anforderungen vor Versand und Abwicklung beim Doré-Ankauf.',
    sections: [
      {
        title: '',
        paragraphs: [
          'AULM kauft Doré und unreines Gold mit Abwicklung nach Endassay im Raffinerielabor. Transaktionen werden in der Regel innerhalb von 48 Stunden nach akzeptiertem Assay abgeschlossen.',
        ],
        bullets: [],
      },
      {
        title: 'Vor dem Versand',
        paragraphs: [],
        bullets: [
          'Kontoeröffnung und KYC-Onboarding vor der ersten Sendung abschließen',
          'AULM per E-Mail mit Dokumentenpaket über die bevorstehende Sendung benachrichtigen',
          'Fracht gegenüber Spediteur und Airline als VALUE CARGO deklarieren',
          'Import-Sicherheitsgebühr fällt an, wo AULM als benannter Importeur handelt',
        ],
      },
      {
        title: 'Abwicklungsablauf',
        paragraphs: [],
        bullets: [
          'Material bei videoaufgezeichneter Annahme wiegen und öffnen',
          'Schmelzen, beproben und unreine Doré-Barren gießen',
          'Feuerprobe nach LBMA/ASTM — Ergebnisse innerhalb eines Arbeitstags',
          'Kunde akzeptiert oder löst Schiedsassay aus der zurückbehaltenen Probe aus',
          'Zahlung an den Kunden innerhalb von 48 Stunden nach endgültig akzeptiertem Assay',
        ],
      },
    ],
  },
  'shipping-procedures-and-instructions': {
    title: 'Versandverfahren und -anweisungen',
    summary: 'Kommerzielle Luftfracht — Dokumente, Air Waybill und Schritte vor der Ankunft.',
    sections: [
      {
        title: '',
        paragraphs: [
          'HINWEIS: SÄMTLICHE WAREN MÜSSEN GEGENÜBER SPEDITEUR UND AIRLINE ALS „VALUE CARGO“ DEKLARIERT WERDEN, ANDERNFALLS LEHNT AULM DIE SENDUNG AB.',
          'Bevor die Sendung in Dubai ankommt, muss der Verkäufer AULM benachrichtigen und die erforderlichen Dokumente per E-Mail übermitteln.',
        ],
        bullets: [],
      },
      {
        title: 'Air Waybill — AULM als benannter Importeur',
        paragraphs: [
          'Über TransGuard abgefertigte Ware muss die genaue Empfängeradresse ausweisen, die AULM Compliance vorgibt. Ist die Adresse nicht wortgenau enthalten, wird die Zollabfertigung verzögert oder abgelehnt.',
        ],
        bullets: [],
      },
      {
        title: 'Handelsrechnung',
        paragraphs: [],
        bullets: [...INVOICE_BULLETS, 'Fünf Exemplare müssen die Sendung begleiten'],
      },
      {
        title: 'Ursprungszeugnis',
        paragraphs: [
          'Muss mit der Sendung reisen und AULM vor der Ankunft per E-Mail übermittelt werden.',
        ],
        bullets: [],
      },
    ],
  },
  'sample-shipping-documents': {
    title: 'Muster-Versanddokumente',
    summary: 'Dokumentencheckliste für Musterchargen und Probesendungen nach Dubai.',
    sections: [
      {
        title: '',
        paragraphs: [
          'Mustersendungen unterliegen denselben VALUE-CARGO-Deklarationsregeln wie kommerzielle Chargen. Geringere Gewichte mindern weder Dokumentation noch Due-Diligence-Anforderungen.',
        ],
        bullets: [],
      },
      {
        title: 'Mindest-Dokumentenpaket',
        paragraphs: [],
        bullets: [
          'Handelsrechnung (3–5 Exemplare)',
          'Ursprungszeugnis',
          'Packliste',
          'Air Waybill oder Kurier-Waybill mit korrektem Empfänger',
          'Assay-Bericht oder Minenzertifikat, soweit vorhanden',
          'UN-Eigenerklärung zu konfliktfreiem Gold für Goldmuster',
          'OECD-/KYC-Lieferantenerklärung bei CAHRA-Herkunft',
        ],
      },
      {
        title: 'Vor dem Versand',
        paragraphs: [],
        bullets: [
          'PDF-Kopien vor Abflug per E-Mail an Compliance',
          'Benannten Sicherheitscarrier und Raffinerietermin bestätigen',
          'Genauen Inhalt deklarieren — keine undeclarierten Metalle oder Steine',
        ],
      },
    ],
  },
  'gold-un-conflict-free-self-declaration-draft': {
    title: 'Gold — UN-Eigenerklärung zu konfliktfreiem Gold (Entwurf)',
    summary: 'Musterwortlaut für die Selbstzertifizierung des Verkäufers auf Firmenbriefpapier.',
    sections: [
      {
        title: '',
        paragraphs: [
          'Der Verkäufer sollte die folgende selbstzertifizierte UN-Erklärung vorlegen, wenn er mit Gold nach Dubai einreist oder Doré an AULM versendet. Firmenbriefpapier und bevollmächtigter Unterzeichner verwenden.',
        ],
        bullets: [],
      },
      {
        title: 'Entwurf der Erklärung',
        paragraphs: [
          '„Das vorliegend in Rechnung gestellte GOLD wurde von legitimen Quellen erworben, die nicht an der Finanzierung von Konflikten beteiligt sind, und im Einklang mit Resolutionen der Vereinten Nationen. Der Verkäufer gewährleistet hiermit, dass dieses GOLD konfliktfrei ist, gestützt auf eigene Kenntnis und/oder schriftliche Garantien des Lieferanten.“',
          '„Wir erklären hiermit, dass das von uns an Sie verkaufte GOLD kein Konflikt-GOLD enthält, auf das ein Embargo gelegt wurde, gemäß Resolutionen des UN-Sicherheitsrats einschließlich Nr. 1173, 1176 und 1306.“',
        ],
        bullets: [],
      },
      {
        title: 'Nachweise',
        paragraphs: [],
        bullets: [
          'Lieferanten-KYC und Mine oder Raffinerie des Ursprungs',
          'Dokumentation der Herkunftskette',
          'OECD-Annex-II-Risikobewertung, soweit CAHRA gilt',
        ],
      },
    ],
  },
  'international-shipping-procedures': {
    title: 'Internationale Versandverfahren',
    summary: 'Globale kommerzielle Fracht — vor Versand, Air Waybill und Abfertigung in der Flughafen-Freihandelszone.',
    sections: [
      {
        title: '',
        paragraphs: [
          'Internationale kommerzielle Frachtsendungen von Edelmetallen nach Dubai IFZA folgen versicherten Logistikmandaten mit TransGuard, Brinks oder G4S von der Flughafen-Freihandelszone zur Raffinerie.',
        ],
        bullets: [],
      },
      {
        title: 'Anforderungen vor dem Versand',
        paragraphs: [],
        bullets: [
          'Kontoeröffnung für erstmalige Kunden abgeschlossen',
          'Import-Sicherheitsgebühr, wo AULM benannter Importeur ist',
          'VALUE-CARGO-Deklaration zwingend',
          'Dokumentenpaket vor Abflug per E-Mail',
        ],
      },
      {
        title: 'Wenn AULM nicht benannter Importeur ist',
        paragraphs: [
          'Der Empfänger auf dem Air Waybill muss genau lauten: Ihr benannter Firmenname und die Adresse gemäß Weisung von AULM Compliance. Die Regeln zu Handelsrechnung und Ursprungszeugnis gelten weiterhin.',
        ],
        bullets: [],
      },
      {
        title: 'Bei Ankunft',
        paragraphs: [],
        bullets: [
          'Der Zoll benachrichtigt AULM und den Sicherheitscarrier',
          'Gepanzerter Transfer zur Raffinerie unter Videoaudit',
          'Annahme, Assay und Abwicklung gemäß Doré-Ankaufsverfahren',
        ],
      },
    ],
  },
  'east-west-africa-consultancy-monetization': {
    title: 'Beratung Ost- und Westafrika — Monetarisierung',
    summary: 'Vor-Ort-Beratung zur Strukturierung von Steuer-, Exportzahlungen und anschließendem Versand nach Dubai.',
    sections: [
      {
        title: '',
        paragraphs: [
          'AULM bietet Beratung, um Steuer- und Versandzahlungen in afrikanischen Förderländern zu vereinfachen und abzusichern. Die Leistung unterstützt den legitimen Export von Doré und Konzentraten mit vollständiger Dokumentation für die Weiterlieferung nach Dubai IFZA.',
        ],
        bullets: [],
      },
      {
        title: 'Leistungsumfang',
        paragraphs: [],
        bullets: [
          'Regionale Direktoren und Feldmandate mit Erfahrung in Bergbau, Handel und gesichertem Export',
          'Leitlinien zur lokalen Steuer- und Abgabenabwicklung',
          'Exportdokumentation und Korridor-Compliance',
          'Koordination mit benannter Sicherheit und Airline-VALUE-CARGO-Buchung',
          'Maßgeschneiderte Unterstützung für west-, zentral-, ost- und nordafrikanische Herkünfte',
        ],
      },
      {
        title: 'Beauftragung',
        paragraphs: [
          'Die Beratung erfolgt ausschließlich B2B. Kontaktieren Sie Compliance zur Prüfung von Jurisdiktion, Produktart und Monetarisierungsstruktur, bevor Tätigkeiten im Land aufgenommen werden. Mandatsbedingungen und erstattungsfähige Kautionen werden je Korridor vereinbart.',
        ],
        bullets: [],
      },
    ],
  },
  'south-america-consultancy': {
    title: 'Beratung Südamerika',
    summary: 'Lokale Monetarisierungsberatung für kleine Chargen — Brasilien, Kolumbien, Peru, Ecuador, Guyana.',
    sections: [
      {
        title: '',
        paragraphs: [
          'AULM bietet Beratung zur lokalen Monetarisierung kleiner Goldmengen (bis 10 kg je Tranche) in Südamerika und erleichtert die Zahlung lokaler Steuern und Exportkosten für größere, nach Dubai versandte Konsignationen.',
        ],
        bullets: [],
      },
      {
        title: 'Produkt und Grenzen',
        paragraphs: [],
        bullets: [
          'Gold in Doré-Barrenform, sofern nicht anders vereinbart',
          'Bis 10 kg vor Ort je Transaktion monetarisiert',
          'Der Berater prüft Produkt und Papiere vor jeder Zahlung',
        ],
      },
      {
        title: 'Ablaufüberblick',
        paragraphs: [],
        bullets: [
          'Beratungshonorar vereinbart und von den Banken bestätigt — erstattungsfähig gegen nachfolgende Lieferungen nach Dubai, wenn das Produkt echt ist und die Verfahren eingehalten wurden',
          'Ein Vertreter von AULM reist in das benannte Land',
          'Prüfung in gesicherten Räumen mit XRF-Analysator',
          'Feinheit zwischen Verkäufer und AULM-Team vereinbart',
          'Zahlung bar oder per Überweisung zum vereinbarten Kurs',
          'Der Kunde kann von benannter Sicherheit begleitet werden',
        ],
      },
    ],
  },
  compliance: {
    title: 'Compliance',
    summary: 'Institutioneller Compliance-Rahmen — Richtlinien, Screening und Kontrahentenstandards.',
    sections: [
      {
        title: '',
        paragraphs: [
          RESPONSIBLE_SOURCING_INTRO,
          `Fragen: ${COMPLIANCE_EMAIL}. Alle neuen Kunden schließen E-Meeting, Identitätsprüfung und Richtlinienanerkennung vor dem Onboarding ab.`,
        ],
        bullets: [],
      },
      {
        title: 'Registrierung UAE FIU goAML',
        paragraphs: [
          `AULM ist auf der goAML-Plattform der Financial Intelligence Unit der UAE registriert. Registrierungscode: ${GOAML_REGISTRATION_CODE}. Die Gesellschaft unterhält volle AML/CFT-Konformität einschließlich Verdachtsmeldungen über ${GOAML_PORTAL_URL}.`,
        ],
        bullets: [],
      },
      {
        title: 'Richtlinienbibliothek',
        paragraphs: [],
        bullets: [
          'Standard für konfliktfreies Gold',
          'Lieferketten-Due-Diligence-Richtlinie',
          'AML-/CFT-Richtlinie',
        ],
      },
    ],
  },
  'conflict-free-gold-standard': {
    title: 'Standard für konfliktfreies Gold',
    summary: 'UN-ausgerichtete Verpflichtungen zur konfliktfreien Beschaffung für sämtliche Goldannahme.',
    sections: [
      {
        title: '',
        paragraphs: [RESPONSIBLE_SOURCING_INTRO],
        bullets: [],
      },
      {
        title: 'Verpflichtungen',
        paragraphs: POLICY_SUPPLY_CHAIN.paragraphs,
        bullets: POLICY_SUPPLY_CHAIN.bullets,
      },
      {
        title: 'Bewaffnete Gruppen und Menschenrechte',
        paragraphs: POLICY_ARMED_GROUPS.paragraphs,
        bullets: [],
      },
    ],
  },
  'supply-chain-due-diligence-policy': {
    title: 'Lieferketten-Due-Diligence-Richtlinie',
    summary: 'OECD-konforme Due Diligence für Mineralien aus CAHRAs.',
    sections: [
      {
        title: POLICY_SUPPLY_CHAIN.title,
        paragraphs: POLICY_SUPPLY_CHAIN.paragraphs,
        bullets: POLICY_SUPPLY_CHAIN.bullets,
      },
      {
        title: POLICY_ARMED_GROUPS.title,
        paragraphs: POLICY_ARMED_GROUPS.paragraphs,
        bullets: POLICY_ARMED_GROUPS.bullets,
      },
      {
        title: POLICY_BRIBERY_AML.title,
        paragraphs: POLICY_BRIBERY_AML.paragraphs,
        bullets: POLICY_BRIBERY_AML.bullets,
      },
      {
        title: POLICY_GRIEVANCE.title,
        paragraphs: POLICY_GRIEVANCE.paragraphs,
        bullets: POLICY_GRIEVANCE.bullets,
      },
    ],
  },
  'aml-policy': {
    title: 'AML-Richtlinie',
    summary: 'Geldwäscheprävention, CFT, Sanktionsscreening und Meldung.',
    sections: [
      {
        title: 'goAML-Registrierung',
        paragraphs: [
          `AULM Precious Metal Trader ist bei UAE FIU goAML registriert (Registrierungscode ${GOAML_REGISTRATION_CODE}). Alle verdächtigen Transaktionen und Aktivitäten werden über das offizielle Portal im Einklang mit der bundesrechtlichen AML-Gesetzgebung der UAE gemeldet.`,
        ],
        bullets: [],
      },
      {
        title: POLICY_TFS.title,
        paragraphs: POLICY_TFS.paragraphs,
        bullets: POLICY_TFS.bullets,
      },
      {
        title: POLICY_AML_CFT.title,
        paragraphs: POLICY_AML_CFT.paragraphs,
        bullets: POLICY_AML_CFT.bullets,
      },
      {
        title: POLICY_BRIBERY_AML.title,
        paragraphs: POLICY_BRIBERY_AML.paragraphs,
        bullets: POLICY_BRIBERY_AML.bullets,
      },
      {
        title: POLICY_ABC.title,
        paragraphs: POLICY_ABC.paragraphs,
        bullets: POLICY_ABC.bullets,
      },
    ],
  },
}
