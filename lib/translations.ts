/**
 * 中英双语文案数据库 — 集中管理全站所有文案
 * CLAUDE.md §5、§6、§7 逐字中文 + 对标英文翻译
 * 调性：澳洲顶级家族办公室资管风格，高端、精准、克制
 */

/* ============================================================
   通用（导航 / 页脚 / CTA）
   ============================================================ */

export const NAV = {
  home:       { zh: '首页',           en: 'Home' },
  about:      { zh: '关于我们',       en: 'About' },
  strategy:   { zh: '投资策略',       en: 'Strategy' },
  assets:     { zh: '核心资产矩阵',   en: 'Core Assets' },
  project:    { zh: '标杆项目',       en: 'Flagship Project' },
  investor:   { zh: '投资人合作',     en: 'Investor Partnerships' },
} as const;

export const BRAND = {
  name: { zh: 'Arxhe Associates 阿卡联合', en: 'Arxhe Associates' },
};

export const FOOTER = {
  tagline: {
    zh: '专注澳洲另类复合型土地资产投资与运营',
    en: 'Specialist in Alternative & Composite Land Asset Investment and Operations in Australia',
  },
  slogan: {
    zh: '重构土地边界・放大资产价值',
    en: 'Redefining Land Boundaries · Amplifying Asset Value',
  },
  affiliation: {
    zh: '隶属于 P&E Family Office',
    en: 'A Division of P&E Family Office',
  },
  links: [
    { zh: '隐私政策', en: 'Privacy Policy' },
    { zh: '免责声明', en: 'Disclaimer' },
    { zh: '联系我们', en: 'Contact Us' },
  ],
} as const;

export const HEADER = {
  languageLabel: { zh: 'EN', en: '中文' },
} as const;

/* ============================================================
   §6.1 首页 /
   ============================================================ */

export const HOME = {
  /* 板块1 · Hero */
  hero: {
    brandTag: { zh: 'P&E Family Office', en: 'P&E Family Office' },
    title: {
      zh: '重构土地价值边界・打造另类不动产超额收益',
      en: 'Redefining Land Value Frontiers · Unlocking Excess Returns in Alternative Real Estate',
    },
    subtitle: {
      zh: 'Arxhe Associates｜P&E Family Office 另类土地资产长臂运营平台',
      en: 'Arxhe Associates  |  P&E Family Office — Extended Land Asset Execution Platform',
    },
    footerText: {
      zh: '多元化土地业态  ·  合规财税架构  ·  抗周期土地资产储备',
      en: 'Diversified Land Formats  ·  Compliant Tax Structures  ·  Counter-Cyclical Land Asset Reserves',
    },
    scrollHint: { zh: '向下探索', en: 'Scroll to Explore' },
  },

  /* 板块2 · 企业核心简介 */
  intro: {
    tag: { zh: '企业简介', en: 'Overview' },
    lines: [
      {
        zh: '传统土地开发已进入低收益、高税负、强内卷周期。',
        en: 'Traditional land development has entered a cycle of diminishing returns, escalating tax burdens, and intense competition.',
      },
      {
        zh: 'Arxhe 通过特殊土地业态布局、复合用地开发、税法架构优化，跳出传统地产模型。',
        en: 'Arxhe transcends the conventional real estate model through specialized land-format positioning, mixed-use land development, and optimized tax-legal architecture.',
      },
      {
        zh: '我们持有大量维州储备土地与合规特殊用途资产，在行业下行周期中持续稳健增值、逆势盈利。',
        en: 'We hold substantial Victorian reserve land holdings and compliant special-purpose assets — achieving sustained appreciation and counter-cyclical profitability throughout industry downturns.',
      },
    ],
  },

  /* 板块3 · 三大核心优势 */
  advantages: {
    tag: { zh: '核心优势', en: 'Core Advantages' },
    title: { zh: '三大差异化竞争力', en: 'Three Differentiated Competencies' },
    cards: [
      {
        title: {
          zh: '差异化土地财税架构',
          en: 'Differentiated Land Tax & Financial Architecture',
        },
        body: {
          zh: '精通澳洲土地税法体系，规模化持有合规特殊用地资产，有效对冲维州土地税上涨风险，具备行业稀缺的周期抗风险能力。',
          en: 'Deep expertise in Australian land tax law. Operating compliant special-purpose land assets at scale, effectively hedging against Victorian land tax escalation — with industry-leading counter-cyclical resilience.',
        },
      },
      {
        title: {
          zh: '复合型另类土地开发',
          en: 'Multi-Format Alternative Land Development',
        },
        body: {
          zh: '突破单一地产模式，落地数据中心、土地分割、特色营地、科创复合园区等高收益业态，最大化单宗土地资产价值。',
          en: 'Transcending single-use real estate — delivering data centres, land subdivisions, specialty hospitality camps, and sci-tech innovation parks. Maximizing per-parcel land asset value through format diversification.',
        },
      },
      {
        title: {
          zh: '长期土地储备战略',
          en: 'Long-Term Land Reserve Strategy',
        },
        body: {
          zh: '前瞻性布局维州核心待开发土地资产池，通过长线持有 + 动态业态转化，捕捉城市扩张与产业升级双重红利。',
          en: 'Forward-positioned Victorian core development land bank. Capturing the dual upside of urban expansion and industrial upgrading through long-duration hold combined with dynamic format conversion.',
        },
      },
    ],
  },

  /* 板块4 · 品牌理念 */
  philosophy: {
    title: {
      zh: '智慧放大器',
      en: 'The Intelligence Amplifier',
    },
    body: {
      zh: '我们不拘泥种族、背景、地域，只吸纳全球顶尖智力与解决问题的能力。Arxhe 不是地产公司，是土地资产领域的智慧放大器，用多元精英思维创造市场看不到的结构性机会。',
      en: 'We do not filter by ethnicity, background, or geography. We aggregate the world\'s sharpest minds and most capable problem-solvers. Arxhe is not a property company — it is an intelligence amplifier in the land asset arena, deploying multi-perspective elite thinking to uncover structural opportunities invisible to the market.',
    },
  },

  /* 板块5 · 底部 CTA */
  cta: {
    title: {
      zh: '与顶级另类土地资本同行',
      en: 'Partner with the Frontier of Alternative Land Capital',
    },
    button: {
      zh: '了解合作方式',
      en: 'Explore Partnership Opportunities',
    },
  },
} as const;

/* ============================================================
   §6.2 关于我们 /about
   ============================================================ */

export const ABOUT = {
  hero: {
    title: {
      zh: '重新定义当代土地资产管理',
      en: 'Redefining Modern Land Asset Management',
    },
  },
  intro: {
    lines: [
      {
        zh: 'Arxhe Associates 是 P&E Family Office 专属另类土地资产长臂执行平台，专注澳大利亚维州及泛亚太区域非传统、复合型、高壁垒土地资产投资与运营。',
        en: 'Arxhe Associates is the dedicated alternative land asset extended execution platform of P&E Family Office, specializing in non-traditional, composite, high-barrier land asset investment and operations across Victoria and the broader Asia-Pacific region.',
      },
      {
        zh: '区别于普通开发商，我们不参与同质化住宅、商业地产红海竞争。我们专注规则套利、业态创新、税法优化、长期储备、复合开发五大核心能力。',
        en: 'Distinct from conventional developers, we do not compete in the commoditized residential and commercial real estate arena. We focus on five core competencies: regulatory arbitrage, format innovation, tax-legal optimization, long-term land banking, and composite development.',
      },
    ],
  },
  barriers: {
    title: { zh: '核心壁垒', en: 'Core Barriers' },
    cards: [
      {
        title: { zh: '大规模长期土地储备', en: 'Large-Scale Long-Term Land Bank' },
        body: {
          zh: '持有维州大量待开发原生土地资源，形成可持续转化的底层资产池。',
          en: 'Holding extensive undeveloped Victorian land resources — a sustainable underlying asset pool primed for phased conversion.',
        },
      },
      {
        title: { zh: '稀缺合规免税土地架构', en: 'Scarce Compliant Tax-Exempt Land Architecture' },
        body: {
          zh: '规模化运营维州 Caravan Park 特色用地集群，依托澳洲土地法案合规豁免、优化土地税，实现行业独有的逆周期生存能力。同行承受高额地税承压、资产缩水；我们成本稳定、持续增值。',
          en: 'Operating a scaled portfolio of Victorian Caravan Park specialty sites. Leveraging statutory land-use exemptions under Australian land law to optimize land tax, delivering industry-unique counter-cyclical resilience. While peers face escalating land tax pressure and asset erosion, we maintain stable cost structures and sustained appreciation.',
        },
      },
      {
        title: { zh: '多元复合土地开发能力', en: 'Multi-Format Composite Land Development Capability' },
        body: {
          zh: '可将单一土地灵活切换为：算力数据中心、大地分割开发、特色旅居营地、科创产业复合园区等多类高 IRR 业态。',
          en: 'A single land parcel can be flexibly converted into: compute data centres, large-scale subdivisions, specialty hospitality camps, sci-tech innovation parks, and other high-IRR formats.',
        },
      },
      {
        title: { zh: '全球化精英多元团队', en: 'Global Elite Multi-Background Team' },
        body: {
          zh: '完全能力主义、去标签化、多元种族、多元背景。以全球顶尖智力，持续挖掘土地市场隐藏结构性机会。',
          en: 'Purely meritocratic, label-free, multi-ethnic, multi-background. Leveraging world-class intellectual capital to continually uncover hidden structural opportunities in land markets.',
        },
      },
    ],
  },
  philosophy: {
    title: { zh: '智慧放大器', en: 'The Intelligence Amplifier' },
    body: {
      zh: '土地资产的上限，由认知决定。Arxhe 汇聚全球多元人才，不看出身、不看背景，只看思维、创造力、解决复杂问题的能力。我们是土地资产领域的智慧放大器，让稀缺认知，变成稳定、持续、可复制的超额收益。',
      en: 'The ceiling of a land asset is defined by cognition. Arxhe assembles diverse global talent — judging by thinking, creativity, and complex problem-solving ability alone. We are the intelligence amplifier of the land asset domain, converting scarce insight into stable, sustained, and replicable excess returns.',
    },
  },
} as const;

/* ============================================================
   §6.3 投资策略 /strategy
   ============================================================ */

export const STRATEGY = {
  hero: {
    title: {
      zh: '非常规・复合化・抗周期',
      en: 'Unconventional · Composite · Counter-Cyclical',
    },
    subtitle: {
      zh: '四大核心投资策略体系',
      en: 'Four Core Investment Strategy Pillars',
    },
  },
  strategies: [
    {
      title: {
        zh: '前瞻性土地储备战略',
        en: 'Forward Land Banking Strategy',
      },
      body: {
        zh: '以长期主义视角持续收购维州优质原生土地，锁定未来城市扩张、产业升级、算力基建爆发的增量红利。',
        en: 'Continuously acquiring premium Victorian native land through a long-duration lens — capturing incremental upside from future urban expansion, industrial upgrading, and compute infrastructure growth.',
      },
    },
    {
      title: {
        zh: '特殊业态税法架构策略',
        en: 'Specialty-Format Tax-Legal Architecture',
      },
      body: {
        zh: '深度精通维多利亚州土地税法、用地分类规则。通过布局 Caravan Park 特殊法定用地，实现合法、稳定、长期的土地税优化。构建行业稀缺的政策免疫资产组合。',
        en: 'Deep mastery of Victorian land tax law and land-use classification rules. Strategically deploying Caravan Park statutory land to achieve lawful, stable, and long-duration land tax optimization — constructing an industry-scarce, policy-immune asset portfolio.',
      },
    },
    {
      title: {
        zh: '土地多元化复合开发策略',
        en: 'Diversified Composite Land Development',
      },
      intro: {
        zh: '打破土地单一用途桎梏，实现一土地多价值：',
        en: 'Breaking the single-use constraint — unlocking multiple value streams per parcel:',
      },
      items: [
        { zh: '算力数据中心基建开发', en: 'Compute Data Centre Infrastructure Development' },
        { zh: '大规模土地分割拆分（Subdivision）', en: 'Large-Scale Land Subdivision' },
        { zh: '特色旅居营地运营', en: 'Specialty Hospitality Camp Operations' },
        { zh: '科创、低碳复合产业园区', en: 'Sci-Tech & Low-Carbon Composite Industrial Parks' },
        { zh: '未来新型合规另类用地业态迭代', en: 'Next-Generation Compliant Alternative Land-Use Formats' },
      ],
      outro: {
        zh: '持续拉高单宗土地 IRR，实现远超传统地产的超额回报。',
        en: 'Continuously elevating per-parcel IRR to deliver excess returns far beyond conventional real estate.',
      },
    },
    {
      title: {
        zh: '周期对冲资产配置策略',
        en: 'Cycle-Hedged Asset Allocation',
      },
      body: {
        zh: '以「稳定特殊用地现金流资产」+「高增长算力 / 土地开发增值资产」双组合，穿越地产下行周期、税收政策变动周期、产业迭代周期。',
        en: 'A dual-portfolio structure combining "stable cash-flow specialty land assets" with "high-growth compute / land development appreciation assets" — engineered to navigate real estate down-cycles, tax policy shifts, and industrial iteration cycles.',
      },
    },
  ],
} as const;

/* ============================================================
   §6.4 核心资产矩阵 /assets
   ============================================================ */

export const ASSETS = {
  hero: {
    title: {
      zh: '四大稀缺资产板块・构筑抗周期收益底盘',
      en: 'Four Scarce Asset Pillars · Engineering a Counter-Cyclical Return Foundation',
    },
  },
  cards: [
    {
      title: {
        zh: '维州长期土地储备池',
        en: 'Victorian Long-Term Land Reserve Pool',
      },
      body: {
        zh: '大量未开发原生土地，覆盖维州高潜力扩张区域，作为未来复合开发、土地分割、项目孵化的底层核心资产。',
        en: 'Extensive undeveloped native land across Victorian high-potential growth corridors — the foundational core asset for future composite development, subdivision, and project incubation.',
      },
    },
    {
      title: {
        zh: '维州 Caravan Park 合规营地集群（核心壁垒资产）',
        en: 'Victorian Caravan Park Compliant Portfolio (Core Barrier Asset)',
      },
      body: {
        zh: '公司战略性持有规模化、合规备案的旅居营地资产。依托澳洲法定用地属性，合法豁免 / 优化高额土地税。是公司最核心、最稳定、最抗政策风险的现金流产资产板块。',
        en: 'Strategically held, scaled, and compliantly registered hospitality camp assets. Leveraging Australian statutory land attributes for lawful land tax exemption and optimization — the firm\'s most core, most stable, and most policy-resistant cash-flow-generating asset pillar.',
      },
    },
    {
      title: {
        zh: '算力基础设施土地资产',
        en: 'Compute Infrastructure Land Assets',
      },
      body: {
        zh: '专门适配 AI、超算、数据中心建设的复合型土地储备，匹配未来十年算力基建爆发趋势，打造高成长科技不动产资产。',
        en: 'Composite land reserves purpose-adapted for AI, HPC, and data centre deployment — aligned with the next decade\'s compute infrastructure growth trajectory, building high-growth technology real estate assets.',
      },
    },
    {
      title: {
        zh: '复合型产业开发土地',
        en: 'Composite Industrial Development Land',
      },
      body: {
        zh: '可灵活转化为科创园区、低碳产业、文旅配套、复合经营性用地的弹性资产矩阵。',
        en: 'A flexible asset matrix convertible into sci-tech innovation parks, low-carbon industrial facilities, cultural tourism infrastructure, and composite operating land uses.',
      },
    },
  ],
} as const;

/* ============================================================
   §6.5 标杆项目 /project
   ============================================================ */

export const PROJECT = {
  hero: {
    title: {
      zh: 'Ripley View｜复合型另类土地开发标杆项目',
      en: 'Ripley View  |  Flagship Composite Alternative Land Development',
    },
  },
  intro: {
    text: {
      zh: 'Ripley View 是 Arxhe 独创「土地多元化复合增值模型」的落地验证项目。通过土地多重业态规划、复合资产运营、现金流多层叠加，实现年化 68% GGR 资产增长率，验证了另类土地资产模型的超高收益潜力。',
      en: 'Ripley View is the live validation of Arxhe\'s proprietary "Diversified Composite Land Value Accretion Model." Through multi-format land planning, composite asset operations, and layered cash-flow structuring, the project has delivered a 68% annualized GGR asset growth rate — validating the excess return potential of the alternative land asset model.',
    },
    kpi: { zh: '年化 68% GGR', en: '68% GGR Annualized' },
  },
  innovations: [
    {
      zh: '摆脱传统地产单一增值模式',
      en: 'Breaking free from single-dimension conventional real estate appreciation',
    },
    {
      zh: '叠加土地增值 + 场地运营 + 未来算力基建多重收益',
      en: 'Layering land appreciation + site operations + future compute infrastructure revenue streams',
    },
    {
      zh: '完全适配澳洲政策、税务、规划体系',
      en: 'Fully compliant with Australian policy, tax, and planning frameworks',
    },
    {
      zh: '可全国、全区域批量复制',
      en: 'Nationally and regionally replicable at scale',
    },
  ],
  location: {
    intro: {
      zh: 'Ripley View 坐落于 Ripley Valley 核心地带，处于「成熟与新兴之间」的独特区位：',
      en: 'Ripley View is positioned in the heart of the Ripley Valley corridor, occupying a unique location between maturity and emergence:',
    },
    items: [
      {
        zh: '西邻 Ipswich 成熟城区，坐拥历史底蕴、老牌学校、医疗配套与多元就业基础。',
        en: 'Bordered by established Ipswich to the west, with heritage character, legacy schools, medical infrastructure, and a diversified employment base.',
      },
      {
        zh: '紧邻 Ripley Town Centre，超市、药房、诊所、健身等生活配套已投入运营，后续阶段将持续扩展零售、餐饮与社区空间。',
        en: 'Adjacent to Ripley Town Centre, where supermarkets, pharmacy, medical, and fitness amenities are already operational — with subsequent stages adding retail, dining, and community spaces.',
      },
      {
        zh: '东接 Springfield 规划新城，汇聚高等学府、大型商业、休闲设施与直达 Brisbane 的铁路网络。',
        en: 'Connected to the planned Springfield city to the east, anchored by universities, major retail, leisure facilities, and direct rail to Brisbane.',
      },
    ],
    outro: {
      zh: '项目所处走廊是澳洲最具活力的增长区域之一，一小时内可达 Brisbane 中央商务区，就业中心、机场与高等学府均在便捷通达范围内。',
      en: 'The corridor is one of Australia\'s most dynamic growth regions. Brisbane CBD, major employment centres, the airport, and leading universities are all within one hour\'s access.',
    },
  },
  ecology: {
    text: {
      zh: '项目规划以自然为先——保留古树与自然水道，一条绿带贯穿社区中心，本土灌木丛为考拉与滑翔袋貂提供原生栖息地。自然塑造了规划，而非规划改造自然。',
      en: 'Nature leads the master plan — heritage trees and natural waterways are preserved, a green spine runs through the community core, and native bushland provides habitat for koalas and gliding possums. Nature shaped the plan, not the other way around.',
    },
    compliance: {
      zh: '项目严格遵循澳大利亚联邦 EPBC 环境保护与生物多样性保育法案，建立植被管理、生态补偿、栖息地监测与分区修复的全周期合规体系，并按年度公示合规报告。',
      en: 'The project strictly adheres to the Commonwealth EPBC Act (Environment Protection and Biodiversity Conservation), with a full-cycle compliance framework covering vegetation management, ecological offset, habitat monitoring, and zoned restoration — underpinned by annual public compliance reporting.',
    },
  },
  phasing: {
    text1: {
      zh: '项目采用总体规划、分阶段推进的开发模式。规划中的铁路基础设施与新火车站，将使区域中心升级为连接 Springfield、Brisbane 及更广阔区域的交通枢纽。',
      en: 'The project follows a master-planned, phased approach. Planned rail infrastructure and a new station will transform the regional centre into a transit hub connecting Springfield, Brisbane, and the broader region.',
    },
    text2: {
      zh: '项目由合伙人级精品团队全程主导，以长期主义自我约束——在最后一期交付之后，依然持续守护社区品质与资产价值。',
      en: 'The project is led end-to-end by a partner-level boutique team, bound by long-term conviction — continuing to steward community quality and asset value long after the final stage is delivered.',
    },
  },
  summary: {
    zh: 'Ripley View 证明：未来顶级土地收益，来自业态创新，而非简单盖楼。',
    en: 'Ripley View proves: the future of top-tier land returns lies in format innovation, not in simply building more.',
  },
  footnote: {
    zh: '本页项目信息依据合作方官方披露内容整理。',
    en: 'Project information on this page is based on official partner disclosures.',
  },
} as const;

/* ============================================================
   §6.6 投资人合作 /investor
   ============================================================ */

export const INVESTOR = {
  hero: {
    title: {
      zh: '与 Arxhe 共建下一代另类土地资产收益',
      en: 'Partner with Arxhe — Building the Next Generation of Alternative Land Asset Returns',
    },
  },
  intro: {
    lines: [
      {
        zh: '传统不动产收益持续下行、税负加重、竞争内卷严重。另类、合规、复合化的土地资产，是未来家族资本、机构资本最稀缺的配置方向。',
        en: 'Conventional real estate returns continue to decline, tax burdens escalate, and commoditized competition intensifies. Alternative, compliant, and composite land assets represent the scarcest — and most valuable — allocation direction for family and institutional capital.',
      },
      {
        zh: 'Arxhe 凭借：长期土地储备、税法架构壁垒、多元开发能力、精英团队体系，开放私密资本合作通道。',
        en: 'Arxhe, backed by: long-term land reserves, tax-legal structural barriers, multi-format development capabilities, and an elite team — opens a confidential capital partnership channel.',
      },
    ],
  },
  directions: [
    { zh: '储备土地联合开发', en: 'Reserve Land Co-Development' },
    { zh: '另类土地资产基金份额合作', en: 'Alternative Land Asset Fund Participation' },
    { zh: '算力不动产项目共建', en: 'Compute Real Estate Project Co-Development' },
    { zh: '大地分割高收益项目跟投', en: 'Large-Scale Subdivision High-Yield Co-Investment' },
    { zh: '特殊合规用地资产组合配置', en: 'Specialty Compliant Land Portfolio Allocation' },
  ],
  form: {
    name:        { zh: '姓名',               en: 'Full Name' },
    organization: { zh: '机构名称',           en: 'Organization' },
    phone:       { zh: '手机号',             en: 'Phone Number' },
    email:       { zh: '邮箱',               en: 'Email' },
    type:        { zh: '意向合作类型',       en: 'Partnership Interest' },
    submit:      { zh: '预约深度尽调会谈',   en: 'Request In-Depth Due Diligence Meeting' },
    success: {
      zh: '提交成功，我们将在 1 个工作日内与您联系。',
      en: 'Submission received. We will contact you within 1 business day.',
    },
    errors: {
      required: { zh: '此项为必填',         en: 'This field is required' },
      phone:    { zh: '请输入正确的手机号', en: 'Please enter a valid phone number' },
      email:    { zh: '请输入正确的邮箱',   en: 'Please enter a valid email address' },
    },
  },
} as const;

/* ============================================================
   §7 SEO Meta
   ============================================================ */

export const META = {
  home: {
    title: {
      zh: 'Arxhe Associates 阿卡联合｜澳洲另类土地资产・复合型不动产投资平台',
      en: 'Arxhe Associates | Alternative Land Assets · Composite Real Estate Investment Platform',
    },
    description: {
      zh: 'Arxhe Associates 隶属于 P&E 家族办公室，专注澳洲维州另类土地资产运营。依托特殊合规用地架构、土地税优化体系、长期土地储备、多元业态开发，打造高收益、抗周期的复合型不动产资产。',
      en: 'Arxhe Associates, a division of P&E Family Office, specializes in alternative Victorian land asset operations. Leveraging specialty compliant land structures, land tax optimization, long-term land reserves, and multi-format development — delivering high-yield, counter-cyclical composite real estate assets.',
    },
  },
  about: {
    title: {
      zh: '关于我们｜Arxhe Associates 差异化土地资管平台',
      en: 'About | Arxhe Associates — A Differentiated Land Asset Management Platform',
    },
    description: {
      zh: '了解 Arxhe Associates 核心壁垒：维州大规模土地储备、Caravan Park 合规免税架构、复合型土地开发模型、全球化多元精英人才体系。',
      en: 'Explore Arxhe Associates\' core barriers: large-scale Victorian land reserves, Caravan Park compliant tax-exempt architecture, composite land development model, and a global multi-background elite talent system.',
    },
  },
  strategy: {
    title: {
      zh: '投资策略｜特殊用地・税务优化・复合开发・抗周期配置',
      en: 'Strategy | Specialty Land · Tax Optimization · Composite Development · Counter-Cyclical Allocation',
    },
    description: {
      zh: 'Arxhe 四大核心投资体系：前瞻性土地储备、特殊用地税法架构、多元化土地业态增值、跨周期资产对冲策略，专注传统地产之外的超额收益赛道。',
      en: 'Arxhe\'s four core investment pillars: forward land banking, specialty land tax-legal architecture, diversified format value creation, and cross-cycle hedging — focused on excess return beyond conventional real estate.',
    },
  },
  assets: {
    title: {
      zh: '核心资产矩阵｜土地储备・合规免税用地・算力基建土地资产',
      en: 'Core Assets | Land Reserves · Compliant Tax-Exempt Land · Compute Infrastructure Land Assets',
    },
    description: {
      zh: 'Arxhe 核心资产包含：维州长期储备土地池、Caravan Park 免税营地集群、算力数据中心土地资产、复合型产业开发土地，构建稳定、高增长、政策免疫的另类资产组合。',
      en: 'Arxhe\'s core assets: Victorian long-term land reserve pool, Caravan Park tax-exempt portfolio, compute data centre land assets, and composite industrial development land — constructing a stable, high-growth, policy-immune alternative asset portfolio.',
    },
  },
  project: {
    title: {
      zh: '标杆项目 Ripley View｜澳洲复合型土地开发超高收益案例',
      en: 'Ripley View | Australian Composite Land Development — Proven Excess Return Case Study',
    },
    description: {
      zh: 'Ripley View 是 Arxhe 旗舰级复合土地开发项目，通过多重业态叠加实现年化 68% GGR 增长，验证另类不动产模型的超高复制价值与周期穿越能力。',
      en: 'Ripley View is Arxhe\'s flagship composite land development — delivering 68% annualized GGR growth through multi-format layering, validating the model\'s replicability and cycle-resilience.',
    },
  },
  investor: {
    title: {
      zh: '投资人合作｜家族办公室・机构资本 另类不动产私密合作通道',
      en: 'Investor Partnerships | Family Office & Institutional Capital — Confidential Alternative Real Estate Access',
    },
    description: {
      zh: '面向长期资本开放联合开发、土地资产配置、算力不动产投资、特殊合规用地组合投资。预约私密尽调会谈，共享澳洲结构性土地投资红利。',
      en: 'Open to long-term capital for co-development, land asset allocation, compute real estate investment, and specialty compliant land portfolio structuring. Request a confidential due diligence meeting to share in Australia\'s structural land investment opportunity.',
    },
  },
} as const;

/**
 * 辅助类型：双语字段
 */
export type Bilingual = { zh: string; en: string };

/**
 * 辅助函数：根据语言从双语字段取值
 */
export function t(bilingual: Bilingual, lang: 'zh' | 'en'): string {
  return bilingual[lang];
}
