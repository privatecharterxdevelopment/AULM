export type PolicySection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export const RESPONSIBLE_SOURCING_INTRO =
  'AULM Precious Metal Trader (IFZA License No. 85927) is fully committed to providing high-quality products and services while meeting the highest ethical and moral standards with respect to responsible sourcing. We recognize that the extraction, trading, handling, and exporting of minerals from conflict-affected and high-risk areas (CAHRAs) may pose risks of significant adverse impacts. We acknowledge our responsibility to respect human rights and to avoid contributing to conflict.'

export const POLICY_SECTIONS: PolicySection[] = [
  {
    id: 'supply-chain',
    title: 'Supply chain policy',
    paragraphs: [
      'We commit to adopting, widely disseminating, and incorporating into contracts and agreements with suppliers a policy on the responsible sourcing of minerals from conflict-affected and high-risk areas. We pledge to refrain from any actions that contribute to the financing of conflict and commit to complying with relevant United Nations sanctions resolutions and applicable domestic laws.',
    ],
    bullets: [
      'Torture, cruel, inhuman, and degrading treatment',
      'Forced or compulsory labor',
      'The worst forms of child labor',
      'Widespread sexual violence and other gross human rights violations',
      'War crimes, crimes against humanity, or genocide',
    ],
  },
  {
    id: 'armed-groups',
    title: 'Non-state armed groups & security forces',
    paragraphs: [
      'We will not tolerate direct or indirect support to non-state armed groups through the extraction, transport, trade, handling, or export of minerals. We will eliminate direct or indirect support to public or private security forces who illegally control mine sites, tax or extort at access points, or along transportation routes.',
      'Where security forces are contracted, we require engagement in accordance with the Voluntary Principles on Security and Human Rights, including screening to ensure individuals responsible for gross human rights abuses are not hired.',
    ],
  },
  {
    id: 'bribery-aml',
    title: 'Anti-bribery & anti-money laundering',
    paragraphs: [
      'We will not offer, promise, give, or demand any bribes and will resist solicitation of bribes to conceal mineral origin or misrepresent taxes, fees, and royalties paid to governments.',
      'We support effective elimination of money laundering connected to illegal taxation or extortion in mineral supply chains. All taxes, fees, and royalties related to mineral extraction, trade, and export from CAHRAs are paid to governments and disclosed in line with EITI principles where applicable.',
    ],
  },
  {
    id: 'tfs',
    title: 'Targeted financial sanctions (TFS)',
    paragraphs: [
      'AULM Trading adheres to UAE and international sanctions regimes to prevent terrorism financing and proliferation financing, including UNSCRs 1267, 1373, and 1718, UAE Cabinet Decision No. 74 of 2020, and FATF Recommendations 6 and 7.',
      'We conduct daily screening of customers, transactions, and beneficial owners against sanctions lists. Listed persons are frozen without delay. Suspicious activity is reported via goAML within required timeframes.',
    ],
  },
  {
    id: 'aml-cft',
    title: 'AML / CFT programme',
    paragraphs: [
      'Our policies and procedures comply with UAE Federal AML legislation, including risk assessment, customer due diligence, enhanced due diligence, ongoing monitoring, suspicious transaction reporting, governance, training, and record retention.',
      'Sanctions lists issued by the UAE Government and the United Nations Security Council are screened; asset freezing and related instructions are complied with according to TFS decisions.',
    ],
  },
  {
    id: 'grievance',
    title: 'Grievance mechanism',
    paragraphs: [
      'We maintain a structured process for grievances from employees, customers, suppliers, and other stakeholders. Concerns may be reported to our compliance desk at contact@aulmtrading.com.',
      'All grievances are logged, investigated, and retained for a minimum of five years after resolution, aligned with OECD Due Diligence Guidance for responsible mineral sourcing.',
    ],
  },
  {
    id: 'abc',
    title: 'Anti-bribery & anti-corruption',
    paragraphs: [
      'AULM Trading maintains a zero-tolerance approach to bribery and corruption across all operations. The policy applies to employees, directors, contractors, and associated entities globally.',
      'Gifts, hospitality, political donations, conflicts of interest, and third-party relationships are subject to due diligence. Whistleblowers are protected. Violations may result in disciplinary action, termination, fines, or license revocation.',
    ],
  },
]

export const POLICY_ACKNOWLEDGMENT_ITEMS = [
  'Supply Chain Policy (conflict-free sourcing, human rights, anti-bribery)',
  'Anti-Money Laundering (AML) and Combating Terrorist Financing (CFT) Policy',
  'Targeted Financial Sanctions (TFS) Policy',
  'Grievance Policy',
  'Anti-Bribery and Anti-Corruption Policy',
]
