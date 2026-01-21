
import { DayPlan, Language, GlossaryItem } from './types';

export const APP_NAME = "TOGAF Master 30";

export const UI_TEXT = {
  en: {
    subtitle: "Project Manager Edition",
    progress: "Progress",
    daysCompleted: "Days Completed",
    keyConcepts: "Key Concepts",
    start: "Start",
    backToPlan: "Back to Plan",
    generating: "Generating Custom Flashcards...",
    generatingSub: "Using Gemini AI to create study materials",
    retry: "Retry",
    tapToFlip: "Tap to flip",
    togafConcept: "TOGAF Concept",
    finishedStudying: "Finished studying all cards for today?",
    markComplete: "Mark Day Complete",
    day: "Day",
    daySuffix: "",
    errorTitle: "Failed to load learning content",
    errorAction: "Please try again.",
    glossary: "Glossary",
    searchPlaceholder: "Search terms...",
    noResults: "No terms found matching your search.",
    viewGlossary: "View Glossary",
    // Login Module
    welcomeBack: "Welcome Back",
    enterName: "Enter your name to track your progress",
    usernamePlaceholder: "Your Name",
    loginBtn: "Start Learning",
    logout: "Logout",
    welcome: "Welcome",
    loginDesc: "Progress is saved to this browser. Please use the same name to resume."
  },
  zh: {
    subtitle: "项目经理专用版",
    progress: "学习进度",
    daysCompleted: "已完成天数",
    keyConcepts: "核心概念",
    start: "开始学习",
    backToPlan: "返回计划",
    generating: "正在生成定制闪卡...",
    generatingSub: "正在使用 Gemini AI 创建学习资料",
    retry: "重试",
    tapToFlip: "点击翻转",
    togafConcept: "TOGAF 概念",
    finishedStudying: "完成今日所有卡片学习了吗？",
    markComplete: "标记为已完成",
    day: "第", // Usually used as "第 X 天"
    daySuffix: "天",
    errorTitle: "加载学习内容失败",
    errorAction: "请重试",
    glossary: "术语库",
    searchPlaceholder: "搜索术语...",
    noResults: "未找到匹配的术语。",
    viewGlossary: "查看术语库",
    // Login Module
    welcomeBack: "欢迎回来",
    enterName: "输入您的名字以记录学习进度",
    usernamePlaceholder: "您的名字",
    loginBtn: "开始学习",
    logout: "退出登录",
    welcome: "欢迎",
    loginDesc: "进度将保存到当前浏览器中。请输入相同的名字以恢复学习进度。"
  }
};

export const SYLLABUS_EN: DayPlan[] = [
  // Phase 1: Introduction & Core Concepts
  { day: 1, phase: "Foundation", title: "What is TOGAF?", description: "Understanding Enterprise Architecture and the TOGAF standard.", keyConcepts: ["Enterprise Architecture", "TOGAF Standard", "Architecture Framework"] },
  { day: 2, phase: "Foundation", title: "Core Concepts", description: "The Architecture Development Method (ADM), Deliverables, Artifacts, and Building Blocks.", keyConcepts: ["ADM", "Deliverables", "Artifacts", "Building Blocks"] },
  { day: 3, phase: "Foundation", title: "Key Terminology", description: "Stakeholders, Concerns, Views, Viewpoints, and the Enterprise Continuum.", keyConcepts: ["Stakeholders", "Views vs Viewpoints", "Enterprise Continuum"] },
  { day: 4, phase: "Foundation", title: "The ADM Cycle Overview", description: "High-level walkthrough of the ADM crop circle (Phases A-H).", keyConcepts: ["ADM Cycle", "Requirements Management", "Phases Overview"] },
  { day: 5, phase: "Foundation", title: "Architecture Governance", description: "Architecture Board, Compliance, and Contracts.", keyConcepts: ["Governance", "Architecture Board", "Compliance"] },

  // Phase 2: The ADM Phases (The Meat)
  { day: 6, phase: "ADM Execution", title: "Phase A: Architecture Vision", description: "Defining the scope, stakeholders, and high-level vision.", keyConcepts: ["Request for Architecture Work", "Statement of Architecture Work", "Stakeholder Map"] },
  { day: 7, phase: "ADM Execution", title: "Phase B: Business Architecture", description: "Defining the baseline and target business architecture.", keyConcepts: ["Business Strategy", "Organization Map", "Business Functions"] },
  { day: 8, phase: "ADM Execution", title: "Phase C: Information Systems - Data", description: "Data entities, logical and physical data models.", keyConcepts: ["Data Architecture", "Data Entities", "Data Migration"] },
  { day: 9, phase: "ADM Execution", title: "Phase C: Information Systems - Application", description: "Application map, interface catalog, and interoperability.", keyConcepts: ["Application Portfolio", "Interface Catalog", "SaaS/PaaS"] },
  { day: 10, phase: "ADM Execution", title: "Phase D: Technology Architecture", description: "Infrastructure, networks, and platform services.", keyConcepts: ["Technology Portfolio", "Platform Services", "Hardware/Software"] },
  { day: 11, phase: "ADM Execution", title: "Phase E: Opportunities & Solutions", description: "Roadmapping and initial implementation planning.", keyConcepts: ["Gap Analysis", "Transition Architectures", "Implementation Factor Assessment"] },
  { day: 12, phase: "ADM Execution", title: "Phase F: Migration Planning", description: "Detailed implementation and migration plan cost/benefit.", keyConcepts: ["Migration Plan", "Business Value Assessment", "Cost Benefit Analysis"] },
  { day: 13, phase: "ADM Execution", title: "Phase G: Implementation Governance", description: "Overseeing the build process to ensure compliance.", keyConcepts: ["Governance", "Architecture Contract", "Compliance Review"] },
  { day: 14, phase: "ADM Execution", title: "Phase H: Architecture Change Management", description: "Managing changes to the baseline.", keyConcepts: ["Change Request", "Architecture Board", "Maintenance"] },
  { day: 15, phase: "ADM Execution", title: "ADM Architecture Requirements Management", description: "Handling requirements throughout the ADM cycle.", keyConcepts: ["Requirements Repository", "Traceability"] },

  // Phase 3: Guidelines & Techniques
  { day: 16, phase: "Guidelines", title: "Iteration & Levels", description: "Applying ADM at different levels of granularity.", keyConcepts: ["Iteration", "Strategic vs Segment vs Capability"] },
  { day: 17, phase: "Guidelines", title: "Security Architecture", description: "Integrating security into the ADM.", keyConcepts: ["Security Policy", "Risk Management"] },
  { day: 18, phase: "Guidelines", title: "SOA & Microservices", description: "Using TOGAF with Service Oriented Architecture.", keyConcepts: ["SOA", "Services", "Microservices"] },
  { day: 19, phase: "Guidelines", title: "Architecture Patterns", description: "Using patterns to solve common problems.", keyConcepts: ["Patterns", "Pattern Library"] },
  { day: 20, phase: "Guidelines", title: "Interoperability", description: "Ensuring systems work together.", keyConcepts: ["Interoperability Requirements", "Information Flow"] },

  // Phase 4: Content Framework & Metamodel
  { day: 21, phase: "Content", title: "Content Metamodel", description: "The formal structure of architectural information.", keyConcepts: ["Metamodel", "Core vs Extension"] },
  { day: 22, phase: "Content", title: "Artifacts: Catalogs", description: "Lists of things (Actors, Roles, Applications).", keyConcepts: ["Catalogs", "Lists"] },
  { day: 23, phase: "Content", title: "Artifacts: Matrices", description: "Relationships between things (Actor/Role Matrix).", keyConcepts: ["Matrices", "Interaction"] },
  { day: 24, phase: "Content", title: "Artifacts: Diagrams", description: "Graphical representations.", keyConcepts: ["Diagrams", "Visuals"] },
  { day: 25, phase: "Content", title: "Building Blocks", description: "ABBs (Architecture) and SBBs (Solution).", keyConcepts: ["ABB", "SBB", "Reusability"] },

  // Phase 5: Capability & Certification Prep
  { day: 26, phase: "Capability", title: "Architecture Capability Framework", description: "Setting up the EA practice within an org.", keyConcepts: ["Skills Framework", "Processes"] },
  { day: 27, phase: "Capability", title: "Architecture Maturity Models", description: "Assessing the maturity of the EA practice.", keyConcepts: ["CMMI", "Maturity Assessment"] },
  { day: 28, phase: "Review", title: "Case Study Analysis", description: "Applying concepts to a fictional scenario.", keyConcepts: ["Scenario", "Application"] },
  { day: 29, phase: "Review", title: "Mock Exam - Part 1", description: "Foundational questions review.", keyConcepts: ["Exam Prep", "Foundation"] },
  { day: 30, phase: "Review", title: "Mock Exam - Part 2", description: "Certified scenario questions review.", keyConcepts: ["Exam Prep", "Scenarios"] },
];

export const SYLLABUS_ZH: DayPlan[] = [
  // Phase 1: Introduction & Core Concepts
  { day: 1, phase: "基础", title: "什么是 TOGAF？", description: "理解企业架构和 TOGAF 标准。", keyConcepts: ["企业架构", "TOGAF 标准", "架构框架"] },
  { day: 2, phase: "基础", title: "核心概念", description: "架构开发方法 (ADM)、交付物、制品和构建块。", keyConcepts: ["ADM", "交付物", "制品", "构建块"] },
  { day: 3, phase: "基础", title: "关键术语", description: "利益相关者、关注点、视图、视点和企业连续体。", keyConcepts: ["利益相关者", "视图与视点", "企业连续体"] },
  { day: 4, phase: "基础", title: "ADM 周期概览", description: "ADM 麦田怪圈（阶段 A-H）的高层演练。", keyConcepts: ["ADM 周期", "需求管理", "阶段概览"] },
  { day: 5, phase: "基础", title: "架构治理", description: "架构委员会、合规性和合同。", keyConcepts: ["治理", "架构委员会", "合规性"] },

  // Phase 2: The ADM Phases (The Meat)
  { day: 6, phase: "ADM 执行", title: "阶段 A: 架构愿景", description: "定义范围、利益相关者和高层愿景。", keyConcepts: ["架构工作请求", "架构工作说明书", "利益相关者图"] },
  { day: 7, phase: "ADM 执行", title: "阶段 B: 业务架构", description: "定义基线和目标业务架构。", keyConcepts: ["业务战略", "组织图", "业务功能"] },
  { day: 8, phase: "ADM 执行", title: "阶段 C: 信息系统 - 数据", description: "数据实体、逻辑和物理数据模型。", keyConcepts: ["数据架构", "数据实体", "数据迁移"] },
  { day: 9, phase: "ADM 执行", title: "阶段 C: 信息系统 - 应用", description: "应用图、接口目录和互操作性。", keyConcepts: ["应用组合", "接口目录", "SaaS/PaaS"] },
  { day: 10, phase: "ADM 执行", title: "阶段 D: 技术架构", description: "基础设施、网络和平台服务。", keyConcepts: ["技术组合", "平台服务", "硬件/软件"] },
  { day: 11, phase: "ADM 执行", title: "阶段 E: 机会与解决方案", description: "路线图和初步实施规划。", keyConcepts: ["差距分析", "过渡架构", "实施因素评估"] },
  { day: 12, phase: "ADM 执行", title: "阶段 F: 迁移规划", description: "详细的实施和迁移计划成本/效益分析。", keyConcepts: ["迁移计划", "业务价值评估", "成本效益分析"] },
  { day: 13, phase: "ADM 执行", title: "阶段 G: 实施治理", description: "监督构建过程以确保合规性。", keyConcepts: ["治理", "架构合同", "合规性审查"] },
  { day: 14, phase: "ADM 执行", title: "阶段 H: 架构变更管理", description: "管理对基线的变更。", keyConcepts: ["变更请求", "架构委员会", "维护"] },
  { day: 15, phase: "ADM 执行", title: "ADM 架构需求管理", description: "在整个 ADM 周期中处理需求。", keyConcepts: ["需求库", "可追溯性"] },

  // Phase 3: Guidelines & Techniques
  { day: 16, phase: "指南", title: "迭代与层级", description: "在不同粒度级别应用 ADM。", keyConcepts: ["迭代", "战略 vs 分段 vs 能力"] },
  { day: 17, phase: "指南", title: "安全架构", description: "将安全性集成到 ADM 中。", keyConcepts: ["安全策略", "风险管理"] },
  { day: 18, phase: "指南", title: "SOA 与微服务", description: "在面向服务的架构中使用 TOGAF。", keyConcepts: ["SOA", "服务", "微服务"] },
  { day: 19, phase: "指南", title: "架构模式", description: "使用模式解决常见问题。", keyConcepts: ["模式", "模式库"] },
  { day: 20, phase: "指南", title: "互操作性", description: "确保系统协同工作。", keyConcepts: ["互操作性需求", "信息流"] },

  // Phase 4: Content Framework & Metamodel
  { day: 21, phase: "内容", title: "内容元模型", description: "架构信息的正式结构。", keyConcepts: ["元模型", "核心 vs 扩展"] },
  { day: 22, phase: "内容", title: "制品: 目录", description: "事物列表（参与者、角色、应用程序）。", keyConcepts: ["目录", "列表"] },
  { day: 23, phase: "内容", title: "制品: 矩阵", description: "事物之间的关系（参与者/角色矩阵）。", keyConcepts: ["矩阵", "交互"] },
  { day: 24, phase: "内容", title: "制品: 图表", description: "图形表示。", keyConcepts: ["图表", "视觉化"] },
  { day: 25, phase: "内容", title: "构建块", description: "ABB（架构）和 SBB（解决方案）。", keyConcepts: ["ABB", "SBB", "可重用性"] },

  // Phase 5: Capability & Certification Prep
  { day: 26, phase: "能力", title: "架构能力框架", description: "在组织内建立 EA 实践。", keyConcepts: ["技能框架", "流程"] },
  { day: 27, phase: "能力", title: "架构成熟度模型", description: "评估 EA 实践的成熟度。", keyConcepts: ["CMMI", "成熟度评估"] },
  { day: 28, phase: "复习", title: "案例分析", description: "将概念应用于虚构场景。", keyConcepts: ["场景", "应用"] },
  { day: 29, phase: "复习", title: "模拟考试 - 第 1 部分", description: "基础问题复习。", keyConcepts: ["备考", "基础"] },
  { day: 30, phase: "复习", title: "模拟考试 - 第 2 部分", description: "认证场景问题复习。", keyConcepts: ["备考", "场景"] },
];

export const getSyllabus = (lang: Language) => lang === 'zh' ? SYLLABUS_ZH : SYLLABUS_EN;

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: 'adm',
    termEn: 'Architecture Development Method (ADM)',
    termZh: '架构开发方法 (ADM)',
    defEn: 'The core of TOGAF. A step-by-step method for developing and managing the lifecycle of an enterprise architecture.',
    defZh: 'TOGAF 的核心。一种用于开发和管理企业架构生命周期的逐步方法。'
  },
  {
    id: 'abb',
    termEn: 'Architecture Building Block (ABB)',
    termZh: '架构构建块 (ABB)',
    defEn: 'A constituent of the architecture model that describes a single aspect of the overall architecture.',
    defZh: '架构模型的组成部分，描述整体架构的单一特定方面（例如功能需求）。'
  },
  {
    id: 'sbb',
    termEn: 'Solution Building Block (SBB)',
    termZh: '解决方案构建块 (SBB)',
    defEn: 'A candidate solution which conforms to an Architecture Building Block (ABB). Represents a real product or component.',
    defZh: '符合架构构建块 (ABB) 的候选解决方案。代表实际的产品或组件（如特定品牌的服务器）。'
  },
  {
    id: 'artifact',
    termEn: 'Artifact',
    termZh: '制品 (Artifact)',
    defEn: 'An architectural work product that describes an aspect of the architecture, such as a catalog, matrix, or diagram.',
    defZh: '描述架构某一方面的工作产品，例如目录、矩阵或图形。'
  },
  {
    id: 'deliverable',
    termEn: 'Deliverable',
    termZh: '交付物 (Deliverable)',
    defEn: 'A work product that is contractually specified and then formally reviewed, agreed, and signed off by the stakeholders.',
    defZh: '合同中规定的工作产品，需要利益相关者正式审查、同意并签署（如架构定义文档）。'
  },
  {
    id: 'stakeholder',
    termEn: 'Stakeholder',
    termZh: '利益相关者',
    defEn: 'An individual, team, or organization with interests in, or concerns relative to, the outcome of the architecture.',
    defZh: '对架构结果有利益关系或关注点的个人、团队或组织。'
  },
  {
    id: 'view',
    termEn: 'View',
    termZh: '视图',
    defEn: 'The representation of a related set of concerns. A view is what you see (or read).',
    defZh: '一组相关关注点的表示。视图是你看到（或读到）的内容。'
  },
  {
    id: 'viewpoint',
    termEn: 'Viewpoint',
    termZh: '视点',
    defEn: 'A definition of the perspective from which a view is taken. A viewpoint is where you are looking from.',
    defZh: '对视图视角的定义。视点是你观察的角度（如“安全视点”定义了如何构建安全视图）。'
  },
  {
    id: 'enterprise_continuum',
    termEn: 'Enterprise Continuum',
    termZh: '企业连续体',
    defEn: 'A view of the Architecture Repository that provides a method for classifying architecture and solution artifacts.',
    defZh: '架构存储库的一个视图，提供了一种对架构和解决方案制品进行分类的方法（从通用到特定）。'
  },
  {
    id: 'gap_analysis',
    termEn: 'Gap Analysis',
    termZh: '差距分析',
    defEn: 'The technique used to compare the Baseline Architecture and the Target Architecture to identify what needs to change.',
    defZh: '用于比较基线架构和目标架构，以识别需要变更内容的技术。'
  },
  {
    id: 'capability',
    termEn: 'Capability',
    termZh: '能力',
    defEn: 'An ability that an organization, person, or system possesses. Capabilities are typically expressed in general and high-level terms.',
    defZh: '组织、个人或系统拥有的能力。通常以通用和高层次的术语表达（如“客户管理能力”）。'
  },
  {
    id: 'governance',
    termEn: 'Architecture Governance',
    termZh: '架构治理',
    defEn: 'The practice and orientation by which enterprise architectures and other architectures are managed and controlled at an enterprise-wide level.',
    defZh: '在企业范围内管理和控制企业架构及其他架构的实践和导向。'
  },
  {
    id: 'metamodel',
    termEn: 'Content Metamodel',
    termZh: '内容元模型',
    defEn: 'A model that describes how the different parts of an architecture fit together. It provides a standard definition for the content of the architecture.',
    defZh: '描述架构不同部分如何组合在一起的模型。它为架构内容提供了标准定义。'
  },
  {
    id: 'repository',
    termEn: 'Architecture Repository',
    termZh: '架构存储库',
    defEn: 'A logical information model for the holding of all architecture-related output.',
    defZh: '用于保存所有架构相关输出的逻辑信息模型。'
  },
  {
    id: 'trm',
    termEn: 'Technical Reference Model (TRM)',
    termZh: '技术参考模型 (TRM)',
    defEn: 'A foundation architecture providing a generic taxonomy of technology services and platforms.',
    defZh: '一种基础架构，提供了技术服务和平台的通用分类法。'
  },
  {
    id: 'arch_framework',
    termEn: 'Architecture Framework',
    termZh: '架构框架',
    defEn: 'A conceptual structure used to develop, organize, and present architectures.',
    defZh: '用于开发、组织和展示架构的概念结构。'
  },
  {
    id: 'baseline_arch',
    termEn: 'Baseline Architecture',
    termZh: '基线架构',
    defEn: 'The existing architecture state before entering a cycle of architecture review and redesign.',
    defZh: '在进入架构审查和重新设计周期之前的现有架构状态。'
  },
  {
    id: 'target_arch',
    termEn: 'Target Architecture',
    termZh: '目标架构',
    defEn: 'The description of a future state of the architecture being developed.',
    defZh: '正在开发的架构未来状态的描述。'
  },
  {
    id: 'transition_arch',
    termEn: 'Transition Architecture',
    termZh: '过渡架构',
    defEn: 'A formal description of a state of the architecture at an architecturally significant point in time between the Baseline and Target Architectures.',
    defZh: '在基线架构和目标架构之间具有架构意义的时间点上的架构状态的正式描述。'
  },
  {
    id: 'arch_principles',
    termEn: 'Architecture Principles',
    termZh: '架构原则',
    defEn: 'A qualitative statement of intent that should be met by the architecture. Has a name, statement, rationale, and implications.',
    defZh: '架构应满足的定性意图陈述。包含名称、陈述、理由和含义。'
  },
  {
    id: 'req_arch_work',
    termEn: 'Request for Architecture Work',
    termZh: '架构工作请求',
    defEn: 'A document sent from the sponsoring organization to the architecture organization to trigger the start of an architectural development cycle.',
    defZh: '从发起组织发送给架构组织以触发架构开发周期开始的文档。'
  },
  {
    id: 'stmt_arch_work',
    termEn: 'Statement of Architecture Work',
    termZh: '架构工作说明书',
    defEn: 'A document that defines the scope and approach that will be used to complete an architecture project.',
    defZh: '定义完成架构项目将使用的范围和方法的文档。'
  },
  {
    id: 'arch_def_doc',
    termEn: 'Architecture Definition Document',
    termZh: '架构定义文档',
    defEn: 'The deliverable container for the core architectural artifacts created during a project.',
    defZh: '项目期间创建的核心架构制品的交付物容器。'
  },
  {
    id: 'arch_req_spec',
    termEn: 'Architecture Requirements Specification',
    termZh: '架构需求规格说明书',
    defEn: 'A set of quantitative statements that outline what an implementation project must do to comply with the architecture.',
    defZh: '一组定量陈述，概述实施项目必须做什么才能符合架构。'
  },
  {
    id: 'arch_roadmap',
    termEn: 'Architecture Roadmap',
    termZh: '架构路线图',
    defEn: 'A list of individual work packages that will realize the Target Architecture and lays them out on a timeline.',
    defZh: '将实现目标架构的各个工作包及其在时间轴上的排列列表。'
  },
  {
    id: 'biz_arch',
    termEn: 'Business Architecture',
    termZh: '业务架构',
    defEn: 'A representation of holistic, multi-dimensional business views of: capabilities, end-to-end value delivery, information, and organizational structure.',
    defZh: '对能力、端到端价值交付、信息和组织结构的整体、多维业务视图的表示。'
  },
  {
    id: 'data_arch',
    termEn: 'Data Architecture',
    termZh: '数据架构',
    defEn: 'A description of the structure and interaction of the enterprise\'s major types and sources of data, logical data assets, physical data assets, and data management resources.',
    defZh: '对企业主要数据类型和来源、逻辑数据资产、物理数据资产和数据管理资源的结构和交互的描述。'
  },
  {
    id: 'app_arch',
    termEn: 'Application Architecture',
    termZh: '应用架构',
    defEn: 'A description of the structure and interaction of the applications as groups of capabilities that provide key business functions and manage the data assets.',
    defZh: '对作为提供关键业务功能和管理数据资产的能力组的应用程序的结构和交互的描述。'
  },
  {
    id: 'tech_arch',
    termEn: 'Technology Architecture',
    termZh: '技术架构',
    defEn: 'A description of the structure and interaction of the platform services, and logical and physical technology components.',
    defZh: '对平台服务以及逻辑和物理技术组件的结构和交互的描述。'
  },
  {
    id: 'foundation_arch',
    termEn: 'Foundation Architecture',
    termZh: '基础架构',
    defEn: 'An architecture of building blocks and corresponding standards that supports all the Common Systems Architectures.',
    defZh: '支持所有通用系统架构的构建块和相应标准的架构。'
  },
  {
    id: 'common_sys_arch',
    termEn: 'Common Systems Architecture',
    termZh: '通用系统架构',
    defEn: 'An architecture that supports the Industry Architectures and Organization-Specific Architectures.',
    defZh: '支持行业架构和特定组织架构的架构。'
  },
  {
    id: 'industry_arch',
    termEn: 'Industry Architecture',
    termZh: '行业架构',
    defEn: 'An architecture that supports the Organization-Specific Architectures for a specific industry.',
    defZh: '支持特定行业特定组织架构的架构。'
  },
  {
    id: 'org_specific_arch',
    termEn: 'Organization-Specific Architecture',
    termZh: '特定组织架构',
    defEn: 'An architecture that supports the specific needs of a particular enterprise.',
    defZh: '支持特定企业特定需求的架构。'
  },
  {
    id: 'arch_contract',
    termEn: 'Architecture Contract',
    termZh: '架构合同',
    defEn: 'A joint agreement between development partners and sponsors on the deliverables, quality, and fitness-for-purpose of an architecture.',
    defZh: '开发合作伙伴和发起人之间关于架构交付物、质量和适用性的联合协议。'
  },
  {
    id: 'compliance_assessment',
    termEn: 'Compliance Assessment',
    termZh: '合规性评估',
    defEn: 'A review of an architecture project or implementation project against the architectural standards and guidelines.',
    defZh: '根据架构标准和指南对架构项目或实施项目进行的审查。'
  },
  {
    id: 'impact_analysis',
    termEn: 'Impact Analysis',
    termZh: '影响分析',
    defEn: 'The assessment of the effects of a change to a specific component or requirement on other components or requirements.',
    defZh: '评估特定组件或需求的变更对其他组件或需求的影响。'
  },
  {
    id: 'risk_management',
    termEn: 'Risk Management',
    termZh: '风险管理',
    defEn: 'The identification, assessment, and prioritization of risks followed by coordinated application of resources to minimize, monitor, and control the probability and/or impact of unfortunate events.',
    defZh: '对风险的识别、评估和优先级排序，随后协调应用资源以最小化、监控和控制不幸事件的概率和/或影响。'
  },
  {
    id: 'sla',
    termEn: 'Service Level Agreement (SLA)',
    termZh: '服务级别协议 (SLA)',
    defEn: 'A contract between a service provider and a customer that documents the services and performance standards.',
    defZh: '服务提供商与客户之间的合同，记录了服务和性能标准。'
  },
  {
    id: 'bif',
    termEn: 'Boundaryless Information Flow',
    termZh: '无边界信息流',
    defEn: 'A trademark of The Open Group. Access to integrated information to support business process improvements.',
    defZh: 'The Open Group 的商标。访问集成信息以支持业务流程改进。'
  },
  {
    id: 'iii_rm',
    termEn: 'Integrated Information Infrastructure Reference Model (III-RM)',
    termZh: '集成信息基础设施参考模型',
    defEn: 'A subset of the TOGAF TRM, focusing on the application software space to support Boundaryless Information Flow.',
    defZh: 'TOGAF TRM 的子集，侧重于支持无边界信息流的应用软件空间。'
  },
  {
    id: 'concerns',
    termEn: 'Concerns',
    termZh: '关注点',
    defEn: 'The key interests that are crucially important to the stakeholders in the system, and determine the acceptability of the system.',
    defZh: '对系统中利益相关者至关重要的关键利益，决定了系统的可接受性。'
  },
  {
    id: 'apm',
    termEn: 'Application Portfolio Management',
    termZh: '应用组合管理',
    defEn: 'The discipline of managing the application portfolio as an asset to ensure it delivers value to the business.',
    defZh: '将应用组合作为资产进行管理的学科，以确保其为业务交付价值。'
  },
  {
    id: 'cbp',
    termEn: 'Capability-Based Planning',
    termZh: '基于能力的规划',
    defEn: 'A business planning paradigm that focuses on the planning, engineering, and delivery of strategic business capabilities.',
    defZh: '一种专注于战略业务能力的规划、工程和交付的业务规划范式。'
  },
  {
    id: 'interop',
    termEn: 'Interoperability',
    termZh: '互操作性',
    defEn: 'The ability of two or more systems or components to exchange information and to use the information that has been exchanged.',
    defZh: '两个或多个系统或组件交换信息并使用已交换信息的能力。'
  },
  {
    id: 'sol_concept_diag',
    termEn: 'Solution Concept Diagram',
    termZh: '解决方案概念图',
    defEn: 'A high-level representation of the solution involved in an architecture project.',
    defZh: '架构项目中涉及的解决方案的高层表示。'
  },
  {
    id: 'value_chain',
    termEn: 'Value Chain Diagram',
    termZh: '价值链图',
    defEn: 'A diagram that shows the distinct activities that a firm performs to create value for customers.',
    defZh: '显示企业为客户创造价值所执行的不同活动的图表。'
  },
  {
    id: 'stakeholder_map',
    termEn: 'Stakeholder Map',
    termZh: '利益相关者图',
    defEn: 'A matrix or diagram that identifies stakeholders, their concerns, and their influence on the project.',
    defZh: '识别利益相关者、他们的关注点及其对项目影响的矩阵或图表。'
  },
  {
    id: 'comm_plan',
    termEn: 'Communications Plan',
    termZh: '沟通计划',
    defEn: 'A document that outlines how information will be shared with stakeholders throughout the architecture project.',
    defZh: '概述如何在整个架构项目中与利益相关者共享信息的文档。'
  },
  {
    id: 'biz_scenario',
    termEn: 'Business Scenarios',
    termZh: '业务场景',
    defEn: 'A technique used to help identify and understand the business requirements that an architecture must address.',
    defZh: '用于帮助识别和理解架构必须解决的业务需求的技术。'
  },
  {
    id: 'req_repo',
    termEn: 'Requirements Repository',
    termZh: '需求库',
    defEn: 'A system or database where requirements are stored and managed throughout the ADM cycle.',
    defZh: '在整个 ADM 周期中存储和管理需求的系统或数据库。'
  }
];
