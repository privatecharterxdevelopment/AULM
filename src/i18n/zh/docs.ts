import type { DocCategoryCopy, DocsCopy } from '../docsFromData'
import type { DocumentCategory } from '../../data/documents'

const INVOICE_BULLETS = [
  '货物内容说明（多雷金、标准金条、金砂、金块、钻石等）',
  '货物净重',
  '货物毛重',
  '货物价值',
  '容器 / 包装说明',
  '发货人与收货人（完整法定名称及地址）',
]

const RESPONSIBLE_SOURCING_INTRO =
  'AULM Precious Metal Trader（IFZA 执照编号 85927）全力提供高质量产品与服务，同时在负责任采购方面遵循最高伦理与道德标准。我们认识到，从受冲突影响及高风险地区（CAHRA）开采、交易、处理与出口矿产，可能带来重大不利影响。我们承认有责任尊重人权，并避免助长冲突。'

export const zhProcedureCategories: Record<DocumentCategory, DocCategoryCopy> = {
  'shipping-instructions': {
    label: '运输指引',
    description: '迪拜收货、随身携带、商业货运、多雷金采购、样品发运及区域顾问流程。',
  },
  compliance: {
    label: '合规',
    description: '无冲突黄金、供应链尽职调查、AML 及机构交易对手标准。',
  },
}

export const zhProcedureDocs: DocsCopy = {
  'shipping-instructions': {
    title: '运输指引',
    summary: '运往迪拜的全部发运、随身携带与收货流程总览。',
    sections: [
      {
        title: '',
        paragraphs: [
          '所有发往迪拜 AULM 的物料——无论是商业货运、随身携带还是样品批次——均须遵循本文库中的流程。不合规可能导致海关拒收、清关延误或拒绝收货。',
          '首次合作的客户须在发运前完成开户。任何到货前至少 48 小时通知合规部门，并提供商业发票、原产地证明及航空运单或快递详情。',
        ],
        bullets: [],
      },
      {
        title: '关键要求',
        paragraphs: [],
        bullets: [
          '向航空公司及货运代理将全部贵金属货物申报为 VALUE CARGO',
          '出发前将所需文件通过电子邮件发送合规部门',
          '在 AULM 指定时，使用 TransGuard、Brinks 或 G4S 办理机场至精炼厂转运',
          '黄金随身携带须持有联合国无冲突自我声明',
          '非洲或南美洲走廊专项顾问事宜，请联系合规部门',
        ],
      },
    ],
  },
  dubai: {
    title: '迪拜',
    summary: '迪拜 IFZA 收货枢纽 — 海关、安全物流与精炼交接。',
    sections: [
      {
        title: '',
        paragraphs: [
          'AULM 运营于迪拜 IFZA（执照编号 85927）。所有入境贵金属与钻石经迪拜或阿布扎比海关清关，并按投保委托转运至我们指定的精炼厂或托管合作方。',
        ],
        bullets: [],
      },
      {
        title: '抵达机场自贸区后',
        paragraphs: [],
        bullets: [
          '迪拜海关通知 AULM 及指定安全承运人货物抵达',
          '办理转运至 TransGuard、Brinks 或 G4S 的文件',
          '此阶段延误通常源于航空运单收货人错误或文件缺失',
        ],
      },
      {
        title: '抵达精炼厂后',
        paragraphs: [],
        bullets: [
          '在 AULM 代表在场情况下开箱称重——全程录像',
          '熔炼、取样并浇铸为未精炼多雷金条，用于结算',
          '客户可留存一份样品；AULM 留存化验样与仲裁样',
          '按 LBMA/ASTM 标准于一个工作日内完成火试金',
          '在认可最终化验后 48 小时内结算',
        ],
      },
    ],
  },
  'diamonds-hand-carry-procedures': {
    title: '钻石随身携带流程',
    summary: '将原钻随身带入迪拜的机场申报与文件要求。',
    sections: [
      {
        title: '',
        paragraphs: [
          '进入阿联酋的原钻须在抵达时向海关申报。未申报即属违法。AULM 不在机场安保区内协助旅客——所有申报须直接与海关官员完成。',
        ],
        bullets: [],
      },
      {
        title: '出行前',
        paragraphs: [],
        bullets: [
          '出发前至少 24 小时联系 AULM 合规部门，提供护照复印件、签证及航班详情',
          '准备英文商业发票与原产地证明',
          '在适用情况下确认金伯利进程证书',
          '非英文文件可能须缴纳可退还的 1,000 阿联酋迪拉姆海关保证金',
        ],
      },
      {
        title: '在迪拜机场',
        paragraphs: [],
        bullets: [
          '前往「有物品申报」通道，并向官员说明货物',
          '出示原产地证明、商业发票及金伯利进程文件',
          '在海关清关完成前保留登机牌',
          '随身携带的商业发票可开给旅客本人——而非 AULM',
        ],
      },
    ],
  },
  'diamond-hand-carry-procedures': {
    title: '钻石随身携带流程',
    summary: '与钻石随身携带同一走廊 — 进入迪拜的申报、金伯利进程与海关步骤。',
    sections: [
      {
        title: '',
        paragraphs: [
          '本流程对应我们关于旅客单独将原钻进口至迪拜、以便向 AULM 出售或托管的钻石随身携带指引。',
          '所有批次在购买或仓储前，须通过供应链尽职调查及金伯利进程合规审查。',
        ],
        bullets: [],
      },
      {
        title: '所需文件',
        paragraphs: [],
        bullets: [
          '商业发票（英文），载明克拉重量、说明与价值',
          '原产地证明',
          '适用原钻发运的金伯利进程证书',
          '事先发送给 AULM 的旅客护照与签证复印件',
        ],
      },
      {
        title: '海关',
        paragraphs: [],
        bullets: [
          '在「有物品申报」通道申报——未经清关不得离境',
          'AULM 工作人员仅在海关放行后于航站楼出口迎接旅客',
          '若货物未托运至阿联酋增值税登记主体，可能产生增值税影响',
        ],
      },
    ],
  },
  'gold-hand-carry-procedures': {
    title: '黄金随身携带流程',
    summary: '将未精炼黄金随身带入迪拜（DXB）的申报、增值税与文件要求。',
    sections: [
      {
        title: '',
        paragraphs: [
          '携带未精炼黄金进入迪拜用于精炼时，必须向海关申报。精炼收货不征收进口关税，但若货物未托运至阿联酋增值税登记公司，可能适用增值税。未申报入境即属违法。',
        ],
        bullets: [],
      },
      {
        title: '建议：接机服务',
        paragraphs: [
          '若您在出发前至少 24 小时向 AULM 提供护照、签证与机票，我们可通过 Marhaba Services 安排接机，护送您至入境边检。海关清关后，AULM 工作人员在航站楼出口等候。',
        ],
        bullets: [],
      },
      {
        title: '标准入境步骤',
        paragraphs: [],
        bullets: [
          '随身携带货物下机，并通过护照检查',
          '使用「有物品申报」通道，并向官员说明货物',
          '出示原产地证明及商业发票，并在适用时提供收货人增值税 TRN',
          '多雷金或金条形态：查验后于清关完成离境',
          '金砂或金块：引导至航站楼价值货物海关——可能要求样品化验（处理费 50 阿联酋迪拉姆）',
          '如适用，保留登机牌以便领取被扣留黄金',
        ],
      },
      {
        title: '商业发票（随身携带）',
        paragraphs: [],
        bullets: [...INVOICE_BULLETS],
      },
      {
        title: '说明',
        paragraphs: [
          'AULM 无法在机场安保区内提供协助。若事先告知，我们在海关放行后安排增值税抵扣及 TransGuard 收货。',
        ],
        bullets: [],
      },
    ],
  },
  'dore-buying-procedures': {
    title: '多雷金收购流程',
    summary: '多雷金采购的开户、发运前要求与结算。',
    sections: [
      {
        title: '',
        paragraphs: [
          'AULM 收购多雷金与未精炼黄金，并在精炼实验室最终化验后结算。交易通常在认可化验后 48 小时内完成。',
        ],
        bullets: [],
      },
      {
        title: '发运前',
        paragraphs: [],
        bullets: [
          '首次发运前完成开户及 KYC',
          '通过电子邮件通知 AULM 即将发运，并附文件包',
          '向货运代理及航空公司将货物申报为 VALUE CARGO',
          '在 AULM 作为指定进口商时，适用进口安保费用',
        ],
      },
      {
        title: '结算流程',
        paragraphs: [],
        bullets: [
          '收货时录像称重并开箱',
          '熔炼、取样并浇铸未精炼多雷金条',
          '按 LBMA/ASTM 火试金——一个工作日内出具结果',
          '客户接受，或启动留存样品的仲裁化验',
          '最终认可化验后 48 小时内向客户付款',
        ],
      },
    ],
  },
  'shipping-procedures-and-instructions': {
    title: '运输流程与指引',
    summary: '商业空运货物 — 文件、航空运单及抵港前步骤。',
    sections: [
      {
        title: '',
        paragraphs: [
          '请注意：全部货物必须向货运代理及航空公司申报为“VALUE CARGO”，否则 AULM 将拒收该批货物。',
          '货物抵达迪拜前，卖方须通知 AULM，并通过电子邮件提供所需文件。',
        ],
        bullets: [],
      },
      {
        title: '航空运单 — AULM 作为指定进口商',
        paragraphs: [
          '经 TransGuard 清关的货物，必须载明 AULM 合规部门提供的准确收货人地址。若地址未一字不差列入，海关清关将被延误或拒绝。',
        ],
        bullets: [],
      },
      {
        title: '商业发票',
        paragraphs: [],
        bullets: [...INVOICE_BULLETS, '须随货附上五份副本'],
      },
      {
        title: '原产地证明',
        paragraphs: ['须随货同行，并在抵达前通过电子邮件发送 AULM。'],
        bullets: [],
      },
    ],
  },
  'sample-shipping-documents': {
    title: '样品运输文件',
    summary: '运往迪拜的样品批次与试运文件清单。',
    sections: [
      {
        title: '',
        paragraphs: [
          '样品发运适用与商业批次相同的 VALUE CARGO 申报规则。重量减少并不降低文件或尽职调查要求。',
        ],
        bullets: [],
      },
      {
        title: '最低文件包',
        paragraphs: [],
        bullets: [
          '商业发票（3–5 份）',
          '原产地证明',
          '装箱单',
          '收货人正确的航空运单或快递运单',
          '化验报告或矿场证明（如有）',
          '黄金样品的联合国无冲突自我声明',
          'CAHRA 产地的 OECD / KYC 供应商声明',
        ],
      },
      {
        title: '发运前',
        paragraphs: [],
        bullets: [
          '出发前将 PDF 副本通过电子邮件发送合规部门',
          '确认指定安全承运人及精炼厂预约',
          '准确申报内容——不得有未申报金属或宝石',
        ],
      },
    ],
  },
  'gold-un-conflict-free-self-declaration-draft': {
    title: '黄金 — 联合国无冲突自我声明（草案）',
    summary: '供卖方以公司信笺抬头自行证明的示范措辞。',
    sections: [
      {
        title: '',
        paragraphs: [
          '卖方随身携带黄金进入迪拜或向 AULM 发运多雷金时，应提供以下经自行证明的联合国声明。请使用公司信笺抬头并由授权签署人签署。',
        ],
        bullets: [],
      },
      {
        title: '声明草案',
        paragraphs: [
          '“本发票项下黄金购自未参与冲突融资的合法来源，并符合联合国决议。卖方特此保证，基于本人所知及/或供应商提供的书面保证，该黄金为无冲突黄金。”',
          '“我们特此声明，我们向贵方出售的黄金不含任何依据联合国安全理事会决议（包括第 1173、1176 及 1306 号）被实施禁运的冲突黄金。”',
        ],
        bullets: [],
      },
      {
        title: '佐证材料',
        paragraphs: [],
        bullets: [
          '供应商 KYC 及产地矿场或精炼厂',
          '监管链文件',
          '在适用 CAHRA 时的 OECD 附件二风险评估',
        ],
      },
    ],
  },
  'international-shipping-procedures': {
    title: '国际运输流程',
    summary: '全球商业货运 — 发运前、航空运单及机场自贸区清关。',
    sections: [
      {
        title: '',
        paragraphs: [
          '运往迪拜 IFZA 的国际贵金属商业货运，按投保物流委托，由 TransGuard、Brinks 或 G4S 从机场自贸区运至精炼厂。',
        ],
        bullets: [],
      },
      {
        title: '发运前要求',
        paragraphs: [],
        bullets: [
          '首次合作的客户须完成开户',
          '在 AULM 为指定进口商时适用进口安保费用',
          '必须申报为 VALUE CARGO',
          '出发前通过电子邮件发送文件包',
        ],
      },
      {
        title: '若 AULM 并非指定进口商',
        paragraphs: [
          '航空运单收货人必须一字不差载明：AULM 合规部门指示的贵司指定公司名称及地址。商业发票与原产地证明规则仍然适用。',
        ],
        bullets: [],
      },
      {
        title: '抵达后',
        paragraphs: [],
        bullets: [
          '海关通知 AULM 及安全承运人',
          '在录像审计下装甲转运至精炼厂',
          '按多雷金收购流程进行收货、化验与结算',
        ],
      },
    ],
  },
  'east-west-africa-consultancy-monetization': {
    title: '东非与西非顾问变现',
    summary: '驻场顾问，用于安排税务、出口付款及后续运往迪拜。',
    sections: [
      {
        title: '',
        paragraphs: [
          'AULM 提供顾问服务，以简化并保障非洲生产国的税务与运输付款。该服务支持多雷金与精矿的合法出口，并配备运往迪拜 IFZA 所需的完整文件。',
        ],
        bullets: [],
      },
      {
        title: '服务范围',
        paragraphs: [],
        bullets: [
          '具备采矿、交易与安全出口经验的区域董事及现场委托',
          '当地税费与特许权使用费结算指引',
          '出口文件与走廊合规',
          '与指定安保及航空公司 VALUE CARGO 订舱协调',
          '针对西非、中非、东非与北非产地的定制支持',
        ],
      },
      {
        title: '委托',
        paragraphs: [
          '顾问服务仅限 B2B。任何驻场活动前，请联系合规部门审阅司法辖区、产品类型及变现结构。委托条款与可退还保证金按走廊约定。',
        ],
        bullets: [],
      },
    ],
  },
  'south-america-consultancy': {
    title: '南美洲顾问',
    summary: '小批次本地变现顾问 — 巴西、哥伦比亚、秘鲁、厄瓜多尔、圭亚那。',
    sections: [
      {
        title: '',
        paragraphs: [
          'AULM 提供顾问服务，协助在南美洲本地变现小批量黄金（每档最多 10 公斤），并为运往迪拜的较大货载安排当地税费与出口费用的支付。',
        ],
        bullets: [],
      },
      {
        title: '产品与限额',
        paragraphs: [],
        bullets: [
          '除非另有约定，黄金须为多雷金条形态',
          '现场每笔交易最多变现 10 公斤',
          '顾问在任何付款前查验产品与文件',
        ],
      },
      {
        title: '流程概览',
        paragraphs: [],
        bullets: [
          '约定顾问费并由银行确认——在产品真实且流程得到遵守的情况下，可抵后续运往迪拜的货载并予退还',
          'AULM 代表前往指定国家',
          '在安全场所使用 XRF 分析仪检测',
          '卖方与 AULM 团队商定成色',
          '按约定汇率以现金或电汇付款',
          '客户可由指定安保陪同',
        ],
      },
    ],
  },
  compliance: {
    title: '合规',
    summary: '机构合规框架 — 政策、筛查与交易对手标准。',
    sections: [
      {
        title: '',
        paragraphs: [
          RESPONSIBLE_SOURCING_INTRO,
          '问询：contact@aulmtrading.com。所有新客户在开户前须完成线上会议、身份核验及政策确认。',
        ],
        bullets: [],
      },
      {
        title: '阿联酋金融情报中心 goAML 注册',
        paragraphs: [
          'AULM 已在阿联酋金融情报中心 goAML 平台注册。注册代码：GMLMOEC41724064013。本主体维持全面 AML/CFT 合规，包括通过 https://services.uaefiu.gov.ae/goaml/ 报告可疑活动。',
        ],
        bullets: [],
      },
      {
        title: '政策文库',
        paragraphs: [],
        bullets: ['无冲突黄金标准', '供应链尽职调查政策', 'AML / CFT 政策'],
      },
    ],
  },
  'conflict-free-gold-standard': {
    title: '无冲突黄金标准',
    summary: '适用于全部黄金收货、与联合国一致的无冲突采购承诺。',
    sections: [
      {
        title: '',
        paragraphs: [RESPONSIBLE_SOURCING_INTRO],
        bullets: [],
      },
      {
        title: '承诺',
        paragraphs: [
          '我们承诺制定、广泛传播并将关于从受冲突影响及高风险地区负责任采购矿产的政策纳入与供应商的合同与协议。我们保证不采取任何助长冲突融资的行为，并承诺遵守相关联合国制裁决议及适用国内法律。',
        ],
        bullets: [
          '酷刑、残忍、不人道及有辱人格的待遇',
          '强迫或强制劳动',
          '最恶劣形式的童工',
          '普遍的性暴力及其他严重侵犯人权行为',
          '战争罪、危害人类罪或种族灭绝',
        ],
      },
      {
        title: '武装团体与人权',
        paragraphs: [
          '我们不容忍通过矿产的开采、运输、交易、处理或出口，直接或间接支持非国家武装团体。我们将杜绝直接或间接支持非法控制矿区、在出入口或运输沿线征税或勒索的公共或私人安全部队。',
          '在聘用安全部队时，我们要求其按照《安全与人权自愿原则》履职，包括筛查，以确保不雇用对严重侵犯人权负有责任的人员。',
        ],
        bullets: [],
      },
    ],
  },
  'supply-chain-due-diligence-policy': {
    title: '供应链尽职调查政策',
    summary: '针对来自 CAHRA 矿产、符合 OECD 的尽职调查。',
    sections: [
      {
        title: '供应链政策',
        paragraphs: [
          '我们承诺制定、广泛传播并将关于从受冲突影响及高风险地区负责任采购矿产的政策纳入与供应商的合同与协议。我们保证不采取任何助长冲突融资的行为，并承诺遵守相关联合国制裁决议及适用国内法律。',
        ],
        bullets: [
          '酷刑、残忍、不人道及有辱人格的待遇',
          '强迫或强制劳动',
          '最恶劣形式的童工',
          '普遍的性暴力及其他严重侵犯人权行为',
          '战争罪、危害人类罪或种族灭绝',
        ],
      },
      {
        title: '非国家武装团体与安全部队',
        paragraphs: [
          '我们不容忍通过矿产的开采、运输、交易、处理或出口，直接或间接支持非国家武装团体。我们将杜绝直接或间接支持非法控制矿区、在出入口或运输沿线征税或勒索的公共或私人安全部队。',
          '在聘用安全部队时，我们要求其按照《安全与人权自愿原则》履职，包括筛查，以确保不雇用对严重侵犯人权负有责任的人员。',
        ],
        bullets: [],
      },
      {
        title: '反贿赂与反洗钱',
        paragraphs: [
          '我们不会提供、承诺、给予或索取任何贿赂，并抵制为隐瞒矿产产地或虚报向政府缴纳的税费与特许权使用费而进行的索贿。',
          '我们支持有效消除与矿产供应链中非法征税或勒索相关的洗钱。与从 CAHRA 开采、交易及出口矿产相关的全部税费与特许权使用费均向政府缴纳，并在适用情况下按 EITI 原则披露。',
        ],
        bullets: [],
      },
      {
        title: '申诉机制',
        paragraphs: [
          '我们为员工、客户、供应商及其他利益相关方维持结构化申诉流程。相关关切可向合规窗口 contact@aulmtrading.com 报告。',
          '所有申诉均予登记、调查，并在解决后至少保留五年，与 OECD《负责任矿产采购尽职调查指引》保持一致。',
        ],
        bullets: [],
      },
    ],
  },
  'aml-policy': {
    title: 'AML 政策',
    summary: '反洗钱、CFT、制裁筛查与报告。',
    sections: [
      {
        title: 'goAML 注册',
        paragraphs: [
          'AULM Precious Metal Trader 已在阿联酋金融情报中心 goAML 注册（注册代码 GMLMOEC41724064013）。所有可疑交易与活动均通过官方门户报告，符合阿联酋联邦反洗钱立法。',
        ],
        bullets: [],
      },
      {
        title: '定向金融制裁（TFS）',
        paragraphs: [
          'AULM Trading 遵守阿联酋及国际制裁制度，以防范恐怖主义融资与扩散融资，包括联合国安理会第 1267、1373 及 1718 号决议、阿联酋内阁 2020 年第 74 号决定，以及 FATF 建议第 6 条与第 7 条。',
          '我们每日对客户、交易及受益所有人进行制裁名单筛查。被列名人员将被立即冻结。可疑活动通过 goAML 在规定时限内报告。',
        ],
        bullets: [],
      },
      {
        title: 'AML / CFT 计划',
        paragraphs: [
          '我们的政策与程序符合阿联酋联邦反洗钱立法，包括风险评估、客户尽职调查、强化尽职调查、持续监测、可疑交易报告、治理、培训及记录留存。',
          '对阿联酋政府及联合国安全理事会发布的制裁名单进行筛查；资产冻结及相关指令按 TFS 决定执行。',
        ],
        bullets: [],
      },
      {
        title: '反贿赂与反洗钱',
        paragraphs: [
          '我们不会提供、承诺、给予或索取任何贿赂，并抵制为隐瞒矿产产地或虚报向政府缴纳的税费与特许权使用费而进行的索贿。',
          '我们支持有效消除与矿产供应链中非法征税或勒索相关的洗钱。与从 CAHRA 开采、交易及出口矿产相关的全部税费与特许权使用费均向政府缴纳，并在适用情况下按 EITI 原则披露。',
        ],
        bullets: [],
      },
      {
        title: '反贿赂与反腐败',
        paragraphs: [
          'AULM Trading 在全部运营中对贿赂与腐败采取零容忍。该政策适用于全球员工、董事、承包商及相关实体。',
          '礼品、招待、政治捐款、利益冲突及第三方关系须经尽职调查。举报人受到保护。违规可能导致纪律处分、解聘、罚款或吊销执照。',
        ],
        bullets: [],
      },
    ],
  },
}
