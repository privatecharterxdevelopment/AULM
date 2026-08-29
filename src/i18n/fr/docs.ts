export const frProcedureCategories = {
  'shipping-instructions': {
    label: 'Instructions d’expédition',
    description:
      'Réception à Dubai, hand-carry, fret commercial, achat de doré, envois d’échantillons et procédures de conseil régional.',
  },
  compliance: {
    label: 'Conformité',
    description:
      'Or sans conflit, due diligence de chaîne d’approvisionnement, AML et normes de contrepartie institutionnelle.',
  },
}

export const frProcedureDocs = {
  'shipping-instructions': {
    title: 'Instructions d’expédition',
    summary: 'Vue d’ensemble de toutes les procédures d’expédition, de hand-carry et de réception pour Dubai.',
    sections: [
      {
        title: '',
        paragraphs: [
          'Tout matériau adressé à AULM à Dubai — fret commercial, hand-carry ou lots d’échantillons — doit suivre les procédures de cette bibliothèque. Le non-respect peut entraîner un refus douanier, un dédouanement retardé ou le refus de réception.',
          'Les nouveaux clients doivent compléter l’onboarding et l’ouverture de compte avant toute expédition. Prévenez la conformité au moins 48 heures avant toute arrivée, avec facture commerciale, certificat d’origine et lettre de transport aérien ou détails du coursier.',
        ],
        bullets: [],
      },
      {
        title: 'Exigences clés',
        paragraphs: [],
        bullets: [
          'Déclarez tout fret de métaux précieux en VALUE CARGO auprès de la compagnie aérienne et de l’agent de fret',
          'Envoyez les documents requis à la conformité avant le départ',
          'Utilisez TransGuard, Brinks ou G4S pour le transfert aéroport–raffinerie lorsque AULM les désigne',
          'Emportez l’auto-déclaration UN or sans conflit pour le hand-carry d’or',
          'Contactez la conformité pour un conseil spécifique au corridor Afrique ou Amérique du Sud',
        ],
      },
    ],
  },
  dubai: {
    title: 'Dubai',
    summary: 'Hub de réception IFZA à Dubai — douane, logistique sécurisée et remise en raffinerie.',
    sections: [
      {
        title: '',
        paragraphs: [
          'AULM opère depuis Dubai IFZA (licence n° 85927). Tous les métaux précieux et diamants entrants sont dédouanés via la douane de Dubai ou d’Abu Dhabi et transférés sous mandat assuré vers notre raffinerie ou partenaire de conservation désigné.',
        ],
        bullets: [],
      },
      {
        title: 'À l’arrivée en zone franche aéroportuaire',
        paragraphs: [],
        bullets: [
          'Dubai Customs notifie AULM et le transporteur sécurisé désigné de l’arrivée de l’expédition',
          'Les formalités sont traitées pour le transfert vers TransGuard, Brinks ou G4S',
          'Les retards à ce stade résultent généralement d’un destinataire incorrect sur la lettre de transport aérien ou de documents manquants',
        ],
      },
      {
        title: 'À l’arrivée en raffinerie',
        paragraphs: [],
        bullets: [
          'Le matériau est ouvert et pesé en présence d’un représentant AULM — enregistré vidéo',
          'Fondu, échantillonné et coulé en barres de doré impur pour le règlement',
          'Le client peut conserver un échantillon ; AULM conserve les échantillons d’essai et d’arbitrage',
          'Essai au feu selon les normes LBMA/ASTM sous un jour ouvré',
          'Règlement dans les 48 heures suivant l’essai final accepté',
        ],
      },
    ],
  },
  'diamonds-hand-carry-procedures': {
    title: 'Procédures de hand-carry pour diamants',
    summary: 'Déclaration aéroportuaire et documentation pour les diamants bruts transportés vers Dubai.',
    sections: [
      {
        title: '',
        paragraphs: [
          'Les diamants bruts entrant aux UAE doivent être déclarés à la douane à l’arrivée. L’absence de déclaration constitue une infraction. AULM n’assiste pas les passagers dans la zone sécurisée de l’aéroport — toutes les déclarations doivent être effectuées directement auprès des agents des douanes.',
        ],
        bullets: [],
      },
      {
        title: 'Avant le voyage',
        paragraphs: [],
        bullets: [
          'Contactez la conformité AULM au moins 24 heures avant le départ avec copie du passeport, visa et détails de vol',
          'Préparez la facture commerciale et le certificat d’origine en anglais',
          'Confirmez le certificat Kimberley Process le cas échéant',
          'Les documents non rédigés en anglais peuvent exiger un dépôt douanier remboursable de 1 000 AED',
        ],
      },
      {
        title: 'À l’aéroport de Dubai',
        paragraphs: [],
        bullets: [
          'Dirigez-vous vers « Something to declare » et identifiez l’expédition auprès des agents',
          'Présentez le certificat d’origine, la facture commerciale et la documentation KP',
          'Conservez la carte d’embarquement jusqu’à la fin du dédouanement',
          'La facture commerciale peut être établie au nom du passager — pas d’AULM — pour le hand-carry',
        ],
      },
    ],
  },
  'diamond-hand-carry-procedures': {
    title: 'Procédures de hand-carry diamant',
    summary: 'Même corridor que le hand-carry diamants — déclaration, KP et étapes douanières pour l’entrée à Dubai.',
    sections: [
      {
        title: '',
        paragraphs: [
          'Cette procédure reprend nos instructions de hand-carry diamants pour l’import par un seul passager de diamants bruts vers Dubai, en vue d’une revente ou d’une conservation auprès d’AULM.',
          'Tous les lots sont soumis à la due diligence de chaîne d’approvisionnement et à la conformité Kimberley Process avant achat ou stockage.',
        ],
        bullets: [],
      },
      {
        title: 'Documents requis',
        paragraphs: [],
        bullets: [
          'Facture commerciale (anglais) avec poids en carats, description et valeur',
          'Certificat d’origine',
          'Certificat Kimberley Process pour les envois de diamants bruts concernés',
          'Copies du passeport et du visa du passager envoyées à AULM à l’avance',
        ],
      },
      {
        title: 'Douane',
        paragraphs: [],
        bullets: [
          'Déclarez à « Something to declare » — ne sortez pas sans dédouanement',
          'Le personnel AULM n’accueille les passagers à la sortie du terminal qu’après levée douanière',
          'Des implications TVA peuvent s’appliquer si les marchandises ne sont pas consignées à une entité immatriculée à la TVA des UAE',
        ],
      },
    ],
  },
  'gold-hand-carry-procedures': {
    title: 'Procédures de hand-carry pour l’or',
    summary: 'Déclaration, TVA et documentation pour l’or impur transporté vers Dubai (DXB).',
    sections: [
      {
        title: '',
        paragraphs: [
          'À l’entrée à Dubai avec de l’or impur destiné au raffinage, celui-ci doit être déclaré à la douane. Il n’y a pas de droit d’import sur la réception en raffinage, mais la TVA peut s’appliquer si les marchandises ne sont pas consignées à une société immatriculée à la TVA des UAE. Entrer sans déclaration constitue une infraction.',
        ],
        bullets: [],
      },
      {
        title: 'Recommandé : meet & greet',
        paragraphs: [
          'Si vous contactez AULM avec passeport, visa et billet au moins 24 heures avant le départ, nous pouvons organiser un meet-and-greet via Marhaba Services pour vous escorter jusqu’à l’immigration. Le personnel AULM vous attend à la sortie du terminal après le dédouanement.',
        ],
        bullets: [],
      },
      {
        title: 'Étapes d’entrée standard',
        paragraphs: [],
        bullets: [
          'Débarquez avec les marchandises en main et passez le contrôle des passeports',
          'Utilisez « Something to declare » et identifiez l’expédition auprès des agents',
          'Présentez le certificat d’origine et la facture commerciale avec le TRN TVA du destinataire le cas échéant',
          'Forme doré ou barre : inspection puis sortie après dédouanement',
          'Poussière ou pépites : orientation vers Terminal Value Customs — un essai d’échantillon peut être requis (frais de traitement de 50 AED)',
          'Conservez la carte d’embarquement pour la récupération de l’or retenu le cas échéant',
        ],
      },
      {
        title: 'Facture commerciale (hand-carry)',
        paragraphs: [],
        bullets: [
          'Description du contenu (doré, bullion, poussière, pépites, diamants, etc.)',
          'Poids net du contenu',
          'Poids brut de l’expédition',
          'Valeur du contenu',
          'Description du ou des contenants',
          'Expéditeur et destinataire (dénominations sociales et adresses complètes)',
        ],
      },
      {
        title: 'Note',
        paragraphs: [
          'AULM ne peut pas assister à l’intérieur de la zone sécurisée de l’aéroport. Lorsque nous en sommes informés à l’avance, nous organisons la compensation de TVA et l’enlèvement TransGuard après levée douanière.',
        ],
        bullets: [],
      },
    ],
  },
  'dore-buying-procedures': {
    title: 'Procédures d’achat de doré',
    summary: 'Ouverture de compte, exigences de pré-expédition et règlement pour les achats de doré.',
    sections: [
      {
        title: '',
        paragraphs: [
          'AULM achète le doré et l’or impur avec règlement après essai final dans notre laboratoire de raffinerie. Les opérations sont généralement conclues dans les 48 heures suivant l’essai accepté.',
        ],
        bullets: [],
      },
      {
        title: 'Pré-expédition',
        paragraphs: [],
        bullets: [
          'Complétez l’ouverture de compte et l’onboarding KYC avant le premier envoi',
          'Notifiez AULM de l’envoi imminent par e-mail avec le dossier documentaire',
          'Déclarez le fret en VALUE CARGO auprès de l’agent d’expédition et de la compagnie aérienne',
          'Des frais de sécurité à l’import s’appliquent lorsque AULM agit comme importateur désigné',
        ],
      },
      {
        title: 'Flux de règlement',
        paragraphs: [],
        bullets: [
          'Pesée et ouverture du matériau lors d’une réception enregistrée vidéo',
          'Fonte, échantillonnage et coulée de barres de doré impur',
          'Essai au feu selon LBMA/ASTM — résultats sous un jour ouvré',
          'Le client accepte ou déclenche un essai d’arbitrage sur l’échantillon conservé',
          'Paiement au client dans les 48 heures suivant l’essai final accepté',
        ],
      },
    ],
  },
  'shipping-procedures-and-instructions': {
    title: 'Procédures et instructions d’expédition',
    summary: 'Fret aérien commercial — documents, lettre de transport aérien et étapes de pré-arrivée.',
    sections: [
      {
        title: '',
        paragraphs: [
          'VEUILLEZ NOTER : TOUTES LES MARCHANDISES DOIVENT ÊTRE DÉCLARÉES « VALUE CARGO » AUPRÈS DE L’AGENT D’EXPÉDITION ET DE LA COMPAGNIE AÉRIENNE, SINON AULM REJETERA L’ENVOI.',
          'Avant l’arrivée de l’envoi à Dubai, le vendeur doit notifier AULM et transmettre les documents requis par e-mail.',
        ],
        bullets: [],
      },
      {
        title: 'Lettre de transport aérien — AULM comme importateur désigné',
        paragraphs: [
          'Les marchandises dédouanées via TransGuard doivent indiquer l’adresse exacte du destinataire fournie par la conformité AULM. Si l’adresse n’est pas reprise à l’identique, le dédouanement sera retardé ou refusé.',
        ],
        bullets: [],
      },
      {
        title: 'Facture commerciale',
        paragraphs: [],
        bullets: [
          'Description du contenu (doré, bullion, poussière, pépites, diamants, etc.)',
          'Poids net du contenu',
          'Poids brut de l’expédition',
          'Valeur du contenu',
          'Description du ou des contenants',
          'Expéditeur et destinataire (dénominations sociales et adresses complètes)',
          'Cinq exemplaires doivent accompagner l’envoi',
        ],
      },
      {
        title: 'Certificat d’origine',
        paragraphs: [
          'Doit voyager avec l’envoi et être envoyé par e-mail à AULM avant l’arrivée.',
        ],
        bullets: [],
      },
    ],
  },
  'sample-shipping-documents': {
    title: 'Documents d’expédition d’échantillons',
    summary: 'Liste de contrôle documentaire pour les lots d’échantillons et envois d’essai vers Dubai.',
    sections: [
      {
        title: '',
        paragraphs: [
          'Les envois d’échantillons suivent les mêmes règles de déclaration VALUE CARGO que les lots commerciaux. Un poids réduit ne réduit ni la documentation ni les exigences de due diligence.',
        ],
        bullets: [],
      },
      {
        title: 'Dossier documentaire minimal',
        paragraphs: [],
        bullets: [
          'Facture commerciale (3 à 5 exemplaires)',
          'Certificat d’origine',
          'Liste de colisage',
          'Lettre de transport aérien ou lettre de coursier avec le destinataire exact',
          'Rapport d’essai ou certificat de site minier le cas échéant',
          'Auto-déclaration UN or sans conflit pour les échantillons d’or',
          'Déclaration fournisseur OECD / KYC pour une origine CAHRA',
        ],
      },
      {
        title: 'Avant l’expédition',
        paragraphs: [],
        bullets: [
          'Envoyez les copies PDF à la conformité avant le départ',
          'Confirmez le transporteur sécurisé désigné et le rendez-vous en raffinerie',
          'Déclarez le contenu exact — aucun métal ni pierre non déclaré',
        ],
      },
    ],
  },
  'gold-un-conflict-free-self-declaration-draft': {
    title: 'Or — auto-déclaration UN sans conflit (projet)',
    summary: 'Formulation type pour l’auto-certification du vendeur sur papier à en-tête de la société.',
    sections: [
      {
        title: '',
        paragraphs: [
          'Le vendeur doit fournir l’auto-déclaration UN suivante lorsqu’il entre à Dubai avec de l’or ou expédie du doré à AULM. Utilisez le papier à en-tête de la société et un signataire autorisé.',
        ],
        bullets: [],
      },
      {
        title: 'Projet de déclaration',
        paragraphs: [
          '« L’OR facturé aux présentes a été acheté auprès de sources légitimes non impliquées dans le financement de conflits et conformément aux résolutions des Nations Unies. Le vendeur garantit par la présente que cet OR est sans conflit, sur la base de sa connaissance personnelle et/ou des garanties écrites fournies par le fournisseur. »',
          '« Nous déclarons par la présente que l’OR que nous vous vendons ne contient aucun OR de conflit faisant l’objet d’un embargo, conformément aux résolutions du Conseil de sécurité des Nations Unies, y compris les n° 1173, 1176 et 1306. »',
        ],
        bullets: [],
      },
      {
        title: 'Éléments justificatifs',
        paragraphs: [],
        bullets: [
          'KYC fournisseur et mine ou raffinerie d’origine',
          'Documentation de chaîne de traçabilité',
          'Évaluation des risques OECD Annexe II lorsque CAHRA s’applique',
        ],
      },
    ],
  },
  'international-shipping-procedures': {
    title: 'Procédures d’expédition internationale',
    summary: 'Fret commercial mondial — pré-expédition, lettre de transport aérien et dédouanement en zone franche aéroportuaire.',
    sections: [
      {
        title: '',
        paragraphs: [
          'Les envois internationaux de fret commercial de métaux précieux vers Dubai IFZA suivent des mandats logistiques assurés avec TransGuard, Brinks ou G4S, de la zone franche aéroportuaire à la raffinerie.',
        ],
        bullets: [],
      },
      {
        title: 'Exigences de pré-expédition',
        paragraphs: [],
        bullets: [
          'Ouverture de compte complétée pour les nouveaux clients',
          'Frais de sécurité à l’import lorsque AULM est l’importateur désigné',
          'Déclaration VALUE CARGO obligatoire',
          'Envoi du dossier documentaire par e-mail avant le départ',
        ],
      },
      {
        title: 'Si AULM n’est pas l’importateur désigné',
        paragraphs: [
          'Le destinataire sur la lettre de transport aérien doit indiquer exactement : le nom et l’adresse de la société désignée, selon les instructions de la conformité AULM. Les règles de facture commerciale et de certificat d’origine s’appliquent toujours.',
        ],
        bullets: [],
      },
      {
        title: 'À l’arrivée',
        paragraphs: [],
        bullets: [
          'La douane notifie AULM et le transporteur sécurisé',
          'Transfert blindé vers la raffinerie sous audit vidéo',
          'Réception, essai et règlement selon les procédures d’achat de doré',
        ],
      },
    ],
  },
  'east-west-africa-consultancy-monetization': {
    title: 'Conseil et monétisation Afrique de l’Est et de l’Ouest',
    summary: 'Conseil sur place pour structurer la fiscalité, les paiements d’exportation et l’envoi ultérieur vers Dubai.',
    sections: [
      {
        title: '',
        paragraphs: [
          'AULM propose un conseil pour simplifier et sécuriser les paiements fiscaux et d’expédition dans les pays producteurs africains. Le service accompagne l’exportation légitime de doré et de concentrés, avec une documentation complète pour la livraison ultérieure à Dubai IFZA.',
        ],
        bullets: [],
      },
      {
        title: 'Périmètre du service',
        paragraphs: [],
        bullets: [
          'Directeurs régionaux et mandats de terrain avec une expérience minière, de négoce et d’export sécurisé',
          'Orientation sur le règlement local des impôts et redevances',
          'Documentation d’exportation et conformité de corridor',
          'Coordination avec la sécurité désignée et la réservation VALUE CARGO aérienne',
          'Accompagnement sur mesure pour les origines d’Afrique de l’Ouest, centrale, de l’Est et du Nord',
        ],
      },
      {
        title: 'Engagement',
        paragraphs: [
          'Le conseil est exclusivement B2B. Contactez la conformité pour examiner la juridiction, le type de produit et la structure de monétisation avant toute activité sur place. Les conditions d’engagement et les dépôts remboursables sont convenus par corridor.',
        ],
        bullets: [],
      },
    ],
  },
  'south-america-consultancy': {
    title: 'Conseil Amérique du Sud',
    summary: 'Conseil de monétisation locale pour petits lots — Brésil, Colombie, Pérou, Équateur, Guyana.',
    sections: [
      {
        title: '',
        paragraphs: [
          'AULM propose un conseil pour aider à monétiser de petites quantités d’or (jusqu’à 10 kg par tranche) localement en Amérique du Sud, en facilitant le paiement des impôts locaux et des coûts d’exportation pour des consignations plus importantes expédiées vers Dubai.',
        ],
        bullets: [],
      },
      {
        title: 'Produit et limites',
        paragraphs: [],
        bullets: [
          'Or sous forme de barre de doré sauf accord contraire',
          'Jusqu’à 10 kg monétisés par opération sur le terrain',
          'Le consultant inspecte le produit et les papiers avant tout paiement',
        ],
      },
      {
        title: 'Aperçu du processus',
        paragraphs: [],
        bullets: [
          'Honoraires d’engagement convenus et confirmés par les banquiers — remboursables sur les livraisons ultérieures à Dubai lorsque le produit est authentique et que les procédures sont respectées',
          'Un représentant AULM se rend dans le pays désigné',
          'Essais dans des locaux sécurisés avec analyseur XRF',
          'Titre convenu entre le vendeur et l’équipe AULM',
          'Paiement en espèces ou par virement au taux convenu',
          'Le client peut être accompagné d’une sécurité désignée',
        ],
      },
    ],
  },
  compliance: {
    title: 'Conformité',
    summary: 'Cadre de conformité institutionnel — politiques, filtrage et normes de contrepartie.',
    sections: [
      {
        title: '',
        paragraphs: [
          'AULM Precious Metal Trader (licence IFZA n° 85927) s’engage pleinement à fournir des produits et services de haute qualité tout en respectant les plus hautes normes éthiques et morales en matière d’approvisionnement responsable. Nous reconnaissons que l’extraction, le négoce, la manutention et l’exportation de minerais provenant de zones de conflit et à haut risque (CAHRAs) peuvent entraîner des risques d’impacts négatifs significatifs. Nous assumons notre responsabilité de respecter les droits de l’homme et de ne pas contribuer aux conflits.',
          'Questions : contact@aulmtrading.com. Tous les nouveaux clients complètent un e-meeting, une vérification d’identité et l’accusé de réception des politiques avant l’onboarding.',
        ],
        bullets: [],
      },
      {
        title: 'Enregistrement goAML FIU des UAE',
        paragraphs: [
          'AULM est enregistré sur la plateforme goAML de l’Unité de renseignement financier des UAE. Code d’enregistrement : GMLMOEC41724064013. L’entité maintient une conformité AML/CFT complète, y compris la déclaration d’activités suspectes via https://services.uaefiu.gov.ae/goaml/.',
        ],
        bullets: [],
      },
      {
        title: 'Bibliothèque de politiques',
        paragraphs: [],
        bullets: [
          'Norme or sans conflit',
          'Politique de due diligence de la chaîne d’approvisionnement',
          'Politique AML / CFT',
        ],
      },
    ],
  },
  'conflict-free-gold-standard': {
    title: 'Norme or sans conflit',
    summary: 'Engagements d’approvisionnement sans conflit alignés UN pour toute réception d’or.',
    sections: [
      {
        title: '',
        paragraphs: [
          'AULM Precious Metal Trader (licence IFZA n° 85927) s’engage pleinement à fournir des produits et services de haute qualité tout en respectant les plus hautes normes éthiques et morales en matière d’approvisionnement responsable. Nous reconnaissons que l’extraction, le négoce, la manutention et l’exportation de minerais provenant de zones de conflit et à haut risque (CAHRAs) peuvent entraîner des risques d’impacts négatifs significatifs. Nous assumons notre responsabilité de respecter les droits de l’homme et de ne pas contribuer aux conflits.',
        ],
        bullets: [],
      },
      {
        title: 'Engagements',
        paragraphs: [
          'Nous nous engageons à adopter, diffuser largement et intégrer dans les contrats et accords avec les fournisseurs une politique d’approvisionnement responsable en minerais provenant de zones de conflit et à haut risque. Nous nous engageons à nous abstenir de toute action contribuant au financement de conflits et à respecter les résolutions pertinentes des Nations Unies en matière de sanctions ainsi que les législations nationales applicables.',
        ],
        bullets: [
          'Torture, traitements cruels, inhumains et dégradants',
          'Travail forcé ou obligatoire',
          'Les pires formes de travail des enfants',
          'Violences sexuelles généralisées et autres violations graves des droits de l’homme',
          'Crimes de guerre, crimes contre l’humanité ou génocide',
        ],
      },
      {
        title: 'Groupes armés et droits de l’homme',
        paragraphs: [
          'Nous ne tolérerons aucun soutien direct ou indirect à des groupes armés non étatiques par l’extraction, le transport, le négoce, la manutention ou l’exportation de minerais. Nous éliminerons tout soutien direct ou indirect aux forces de sécurité publiques ou privées qui contrôlent illégalement des sites miniers, lèvent des taxes ou extorquent aux points d’accès ou le long des itinéraires de transport.',
          'Lorsque des forces de sécurité sont contractées, nous exigeons un engagement conforme aux Principes volontaires sur la sécurité et les droits de l’homme, y compris un filtrage afin que les personnes responsables de violations graves des droits de l’homme ne soient pas embauchées.',
        ],
        bullets: [],
      },
    ],
  },
  'supply-chain-due-diligence-policy': {
    title: 'Politique de due diligence de la chaîne d’approvisionnement',
    summary: 'Due diligence alignée OECD pour les minerais provenant de CAHRAs.',
    sections: [
      {
        title: 'Politique de chaîne d’approvisionnement',
        paragraphs: [
          'Nous nous engageons à adopter, diffuser largement et intégrer dans les contrats et accords avec les fournisseurs une politique d’approvisionnement responsable en minerais provenant de zones de conflit et à haut risque. Nous nous engageons à nous abstenir de toute action contribuant au financement de conflits et à respecter les résolutions pertinentes des Nations Unies en matière de sanctions ainsi que les législations nationales applicables.',
        ],
        bullets: [
          'Torture, traitements cruels, inhumains et dégradants',
          'Travail forcé ou obligatoire',
          'Les pires formes de travail des enfants',
          'Violences sexuelles généralisées et autres violations graves des droits de l’homme',
          'Crimes de guerre, crimes contre l’humanité ou génocide',
        ],
      },
      {
        title: 'Groupes armés non étatiques et forces de sécurité',
        paragraphs: [
          'Nous ne tolérerons aucun soutien direct ou indirect à des groupes armés non étatiques par l’extraction, le transport, le négoce, la manutention ou l’exportation de minerais. Nous éliminerons tout soutien direct ou indirect aux forces de sécurité publiques ou privées qui contrôlent illégalement des sites miniers, lèvent des taxes ou extorquent aux points d’accès ou le long des itinéraires de transport.',
          'Lorsque des forces de sécurité sont contractées, nous exigeons un engagement conforme aux Principes volontaires sur la sécurité et les droits de l’homme, y compris un filtrage afin que les personnes responsables de violations graves des droits de l’homme ne soient pas embauchées.',
        ],
        bullets: [],
      },
      {
        title: 'Anti-corruption et lutte contre le blanchiment',
        paragraphs: [
          'Nous n’offrirons, ne promettrons, ne donnerons ni n’exigerons aucun pot-de-vin et nous résisterons à toute sollicitation visant à dissimuler l’origine des minerais ou à fausser les impôts, redevances et droits versés aux États.',
          'Nous soutenons l’élimination effective du blanchiment lié à la taxation illégale ou à l’extorsion dans les chaînes d’approvisionnement en minerais. Tous les impôts, redevances et droits liés à l’extraction, au négoce et à l’exportation de minerais depuis des CAHRAs sont versés aux États et publiés conformément aux principes EITI le cas échéant.',
        ],
        bullets: [],
      },
      {
        title: 'Mécanisme de réclamation',
        paragraphs: [
          'Nous maintenons un processus structuré pour les réclamations des collaborateurs, clients, fournisseurs et autres parties prenantes. Les signalements peuvent être adressés à notre desk de conformité à contact@aulmtrading.com.',
          'Toutes les réclamations sont enregistrées, instruites et conservées au moins cinq ans après résolution, conformément au Guide OECD de due diligence pour l’approvisionnement responsable en minerais.',
        ],
        bullets: [],
      },
    ],
  },
  'aml-policy': {
    title: 'Politique AML',
    summary: 'Lutte contre le blanchiment, CFT, filtrage des sanctions et déclarations.',
    sections: [
      {
        title: 'Enregistrement goAML',
        paragraphs: [
          'AULM Precious Metal Trader est enregistré sur goAML FIU des UAE (code d’enregistrement GMLMOEC41724064013). Toutes les transactions et activités suspectes sont déclarées via le portail officiel, conformément à la législation fédérale AML des UAE.',
        ],
        bullets: [],
      },
      {
        title: 'Sanctions financières ciblées (TFS)',
        paragraphs: [
          'AULM Trading se conforme aux régimes de sanctions des UAE et internationaux afin de prévenir le financement du terrorisme et le financement de la prolifération, y compris les UNSCR 1267, 1373 et 1718, la décision du Conseil des ministres des UAE n° 74 de 2020, et les recommandations FATF 6 et 7.',
          'Nous procédons à un filtrage quotidien des clients, des transactions et des bénéficiaires effectifs au regard des listes de sanctions. Les personnes listées sont gelées sans délai. Toute activité suspecte est déclarée via goAML dans les délais requis.',
        ],
        bullets: [],
      },
      {
        title: 'Programme AML / CFT',
        paragraphs: [
          'Nos politiques et procédures sont conformes à la législation fédérale AML des UAE, y compris l’évaluation des risques, la diligence client, la diligence renforcée, le suivi continu, la déclaration des opérations suspectes, la gouvernance, la formation et la conservation des documents.',
          'Les listes de sanctions émises par le gouvernement des UAE et le Conseil de sécurité des Nations Unies sont filtrées ; le gel des avoirs et les instructions associées sont respectés conformément aux décisions TFS.',
        ],
        bullets: [],
      },
      {
        title: 'Anti-corruption et lutte contre le blanchiment',
        paragraphs: [
          'Nous n’offrirons, ne promettrons, ne donnerons ni n’exigerons aucun pot-de-vin et nous résisterons à toute sollicitation visant à dissimuler l’origine des minerais ou à fausser les impôts, redevances et droits versés aux États.',
          'Nous soutenons l’élimination effective du blanchiment lié à la taxation illégale ou à l’extorsion dans les chaînes d’approvisionnement en minerais. Tous les impôts, redevances et droits liés à l’extraction, au négoce et à l’exportation de minerais depuis des CAHRAs sont versés aux États et publiés conformément aux principes EITI le cas échéant.',
        ],
        bullets: [],
      },
      {
        title: 'Anti-corruption',
        paragraphs: [
          'AULM Trading applique une tolérance zéro à l’égard de la corruption dans l’ensemble de ses activités. La politique s’applique aux collaborateurs, dirigeants, prestataires et entités associées dans le monde.',
          'Cadeaux, hospitalité, dons politiques, conflits d’intérêts et relations avec des tiers sont soumis à due diligence. Les lanceurs d’alerte sont protégés. Les manquements peuvent entraîner une sanction disciplinaire, une rupture, des amendes ou le retrait de licence.',
        ],
        bullets: [],
      },
    ],
  },
}
