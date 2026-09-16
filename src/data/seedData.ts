import { Service, Project, BlogPost, Testimonial, Partner, ContactMessage, Settings } from '../types';

export const initialServices: Service[] = [
  {
    id: 'srv-1',
    title_en: 'Web Development',
    title_ar: 'تطوير المواقع والمنصات الإلكترونية',
    slug: 'web-development',
    description_en: 'Corporate websites, high-conversion landing pages, complex SaaS web applications, and robust e-commerce solutions built with modern scalable stacks.',
    description_ar: 'مواقع شركات، صفحات هبوط ذات تحويل عالي، تطبيقات SaaS ويب متقدمة، ومتاجر إلكترونية قوية مبنية بأحدث التقنيات القابلة للتوسع.',
    icon: 'Globe',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
    features_en: [
      'Enterprise React & Next.js Architecture',
      'Ultra-fast Headless CMS & E-commerce',
      'API-first Backend Integration',
      'High-performance Core Web Vitals & SEO'
    ],
    features_ar: [
      'هندسة معمارية قوية بواسطة React وNext.js',
      'حلول Headless CMS وتجارة إلكترونية فائقة السرعة',
      'تكامل واجهات برمجية API متكاملة',
      'أداء استثنائي وتوافق كامل مع معايير SEO'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'Laravel', 'Tailwind CSS', 'PostgreSQL'],
    sort_order: 1,
    published: true,
  },
  {
    id: 'srv-2',
    title_en: 'Mobile App Development',
    title_ar: 'تطوير تطبيقات الموبايل',
    slug: 'mobile-app-development',
    description_en: 'Native iOS & Android and cross-platform apps engineered for buttery-smooth 60fps performance, intuitive gestures, and offline-first reliability.',
    description_ar: 'تطبيقات أصلية (iOS / Android) وتطبيقات هجينة مصممة بأداء فائق 60fps، إيماءات سلسة، وتوافق تام للعمل دون اتصال بالإنترنت.',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    features_en: [
      'Cross-Platform Flutter & React Native',
      'Native Swift & Kotlin Specialization',
      'Biometric Auth, Apple Pay & Google Pay',
      'Real-time Push Notifications & WebSockets'
    ],
    features_ar: [
      'تطبيقات متعددة المنصات عبر Flutter وReact Native',
      'تطوير أصلي بـ Swift وKotlin للمشاريع الكبرى',
      'دعم المصادقة الحيوية، Apple Pay وGoogle Pay',
      'إشعارات فورية وتقنيات اتصال Real-time'
    ],
    technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
    sort_order: 2,
    published: true,
  },
  {
    id: 'srv-3',
    title_en: 'UI/UX Design',
    title_ar: 'تصميم تجربة وواجهة المستخدم',
    slug: 'ui-ux-design',
    description_en: 'Data-driven user research, user journey mapping, design systems, and pixel-perfect interactive prototypes tailored for high conversion and delight.',
    description_ar: 'أبحاث مستخدمين قائمة على البيانات، خرائط رحلة العميل، أنظمة تصميم متكاملة (Design Systems)، ونماذج تفاعلية دقيقة تحقق أعلى نسب تحويل.',
    icon: 'Layout',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop',
    features_en: [
      'Scalable Figma Design Systems & Tokens',
      'User Journey & Usability Lab Testing',
      'Micro-interactions & Product Motion',
      'Full Arabic/English Bi-directional UX'
    ],
    features_ar: [
      'أنظمة تصميم قابلة للتوسع على Figma مع Tokens',
      'اختبارات قابلية الاستخدام وتحليل سلوك المستخدم',
      'تفاعلات دقيقة وحركات بصرية حية للمنتج',
      'تصميم ثنائي اللغة يدعم LTR وRTL باحترافية'
    ],
    technologies: ['Figma', 'Protopie', 'Design Tokens', 'Tailwind', 'Motion'],
    sort_order: 3,
    published: true,
  },
  {
    id: 'srv-4',
    title_en: 'Custom Software Solutions',
    title_ar: 'حلول برمجية مخصصة للشركات',
    slug: 'software-solutions',
    description_en: 'Mission-critical enterprise systems, ERP/CRM suites, workflow automation, and custom algorithms engineered to eliminate business bottlenecks.',
    description_ar: 'أنظمة مؤسسية للمهام الحساسة، حلول ERP وCRM، أتمتة تدفقات العمل، وخوارزميات مخصصة صُممت لتسريع العمليات وتجاوز التحديات التشغيلية.',
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    features_en: [
      'Modular Microservices & REST/gRPC APIs',
      'Role-based Access Control (RBAC) & Auditing',
      'Automated Invoicing & ERP Workflows',
      'High-throughput Data Processing'
    ],
    features_ar: [
      'بنية خدمات مصغرة Microservices وواجهات gRPC/REST',
      'نظام أذونات متطور وتدقيق سجلات العمليات',
      'أتمتة الفواتير وتدفقات العمل المؤسسية',
      'معالجة سريعة وآمنة للبيانات والتقارير الضخمة'
    ],
    technologies: ['Node.js', 'Go', 'Python', 'Docker', 'Redis', 'PostgreSQL'],
    sort_order: 4,
    published: true,
  },
  {
    id: 'srv-5',
    title_en: 'Digital Platforms & Cloud',
    title_ar: 'المنصات الرقمية والحلول السحابية',
    slug: 'digital-platforms',
    description_en: 'Scalable multi-tenant B2B/B2C SaaS platforms, marketplace engines, and cloud infrastructures designed for millions of active requests.',
    description_ar: 'منصات سحابية متعددة المستأجرين SaaS، محركات الأسواق الإلكترونية Marketplaces، وبنى تحتية سحابية مصممة للتعامل مع ملايين الزيارات والطلبات.',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    features_en: [
      'Multi-tenant Cloud Architecture',
      'Automated CI/CD DevOps Pipelines',
      'Elastic Auto-scaling & CDN Acceleration',
      'Zero-downtime Blue/Green Deployments'
    ],
    features_ar: [
      'معمارية سحابية متعددة المستأجرين مع عزل البيانات',
      'خطوط أنابيب CI/CD وأتمتة النشر عبر الحاويات',
      'توسع تلقائي مرن وتسريع المحتوى عبر شبكات CDN',
      'نشر مستمر مع انعدام أوقات التوقف عن العمل'
    ],
    technologies: ['AWS', 'Google Cloud', 'Kubernetes', 'Terraform', 'Kafka'],
    sort_order: 5,
    published: true,
  },
  {
    id: 'srv-6',
    title_en: 'Maintenance & DevOps Support',
    title_ar: 'الصيانة والدعم الفني المستمر',
    slug: 'maintenance-support',
    description_en: 'Continuous improvements, proactive 24/7 uptime monitoring, security hardening, performance optimization, and dedicated development retainers.',
    description_ar: 'تحسينات مستمرة، مراقبة استباقية على مدار الساعة، تعزيز الحماية والأمان، ضبط الأداء وسرعة الاستجابة، وفرق تطوير مخصصة بدوام كامل.',
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    features_en: [
      'SLA-backed 24/7 Incident Response',
      'Automated Vulnerability Patching',
      'Database Optimization & Redundant Backups',
      'Ongoing Codebase Refactoring & Updates'
    ],
    features_ar: [
      'اتفاقيات مستوى خدمة (SLA) واستجابة طارئة فورية',
      'سد الثغرات وتحديث الحزم الأمنية دورياً',
      'تحسين قواعد البيانات وإدارة النسخ الاحتياطية',
      'تطوير وتحديث مستمر للكود البرمجي'
    ],
    technologies: ['Datadog', 'Sentry', 'Grafana', 'GitHub Actions', 'Prometheus'],
    sort_order: 6,
    published: true,
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title_en: 'FinFlow — Regional Digital Banking Platform',
    title_ar: 'FinFlow — منصة الخدمات المصرفية الرقمية',
    slug: 'finflow-digital-banking',
    description_en: 'A next-generation enterprise banking interface with instant peer-to-peer transfers, multi-currency wallets, and AI-powered spending analytics serving 250,000+ active users.',
    description_ar: 'واجهة مصرفية مؤسسية حديثة توفر تحويلات مالية فورية، محافظ متعددة العملات، وتحليلات إنفاق ذكية تخدم أكثر من 250,000 مستخدم نشط في الخليج.',
    category: 'Platforms',
    category_ar: 'المنصات الرقمية',
    client: 'FinFlow Financial Technologies',
    year: '2025',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    main_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop'
    ],
    project_url: 'https://finflow.example.com',
    featured: true,
    published: true,
  },
  {
    id: 'proj-2',
    title_en: 'MedPulse — Telehealth & Clinical Management Suite',
    title_ar: 'MedPulse — منظومة الرعاية الصحية والعيادات الافتراضية',
    slug: 'medpulse-telehealth-app',
    description_en: 'Comprehensive iOS and Android application connecting patients with certified specialists through encrypted WebRTC video visits, prescriptions, and lab tests.',
    description_ar: 'تطبيق متكامل لنظامي iOS وAndroid يربط المرضى بالأطباء الاستشاريين عبر مكالمات فيديو مشفرة WebRTC، مع إدارة الوصفات الإلكترونية والتحاليل الطبية.',
    category: 'Mobile Apps',
    category_ar: 'تطبيقات الموبايل',
    client: 'MedPulse Health Group (Riyadh / Cairo)',
    year: '2025',
    technologies: ['Flutter', 'WebRTC', 'Firebase', 'Node.js', 'MongoDB'],
    main_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop'
    ],
    project_url: 'https://medpulse.example.com',
    featured: true,
    published: true,
  },
  {
    id: 'proj-3',
    title_en: 'LogiTrack — Autonomous Fleet & Supply Logistics',
    title_ar: 'LogiTrack — نظام إدارة وتتبع أساطيل النقل والشحن',
    slug: 'logitrack-fleet-management',
    description_en: 'Live IoT telemetry dashboard and smart route optimization engine for regional logistics fleets across Egypt, Saudi Arabia, and UAE.',
    description_ar: 'لوحة تحكم تفاعلية مع أنظمة IoT لتتبع أساطيل الشحن في الوقت الفعلي وتحسين مسارات النقل الذكية بين مصر والسعودية والإمارات.',
    category: 'Software',
    category_ar: 'أنظمة وبرمجيات',
    client: 'LogiTrack Logistics Network',
    year: '2024',
    technologies: ['React', 'Go', 'Mapbox GL', 'Redis', 'Tailwind CSS', 'TimescaleDB'],
    main_image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop'
    ],
    project_url: 'https://logitrack.example.com',
    featured: true,
    published: true,
  },
  {
    id: 'proj-4',
    title_en: 'Aura Market — Omnichannel Luxury Retail Platform',
    title_ar: 'Aura Market — منصة التجارة الفاخرة متعددة القنوات',
    slug: 'aura-luxury-ecommerce',
    description_en: 'Headless e-commerce ecosystem featuring localized Arab currencies, seamless one-click checkout, 3D product previews, and ERP synchronization.',
    description_ar: 'منصة تجارة إلكترونية متطورة بتقنية Headless، تدعم العملات المحلية، الدفع بنقرة واحدة، استعراض المنتجات ثلاثي الأبعاد، والتكامل مع أنظمة المخازن.',
    category: 'Websites',
    category_ar: 'مواقع إلكترونية',
    client: 'Aura Brands Holding',
    year: '2024',
    technologies: ['Shopify Plus', 'Next.js', 'GraphQL', 'Tailwind CSS', 'Algolia'],
    main_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'
    ],
    project_url: 'https://auramarket.example.com',
    featured: true,
    published: true,
  },
  {
    id: 'proj-5',
    title_en: 'Vivid — B2B Creative Collaboration Design System',
    title_ar: 'Vivid — نظام التصميم الموحد ومنصة التعاون الإبداعي',
    slug: 'vivid-design-system',
    description_en: 'End-to-end UX architecture and design system documentation for a fast-scaling tech enterprise, supporting over 60 product managers and frontend engineers.',
    description_ar: 'هندسة تجربة مستخدم كاملة وتوثيق نظام تصميم متكامل لشركة تقنية متسارعة النمو، يدعم أكثر من 60 مدير منتج ومهندس برمجيات.',
    category: 'UI/UX',
    category_ar: 'تصميم UI/UX',
    client: 'Vivid Cloud Labs',
    year: '2024',
    technologies: ['Figma', 'Storybook', 'Tailwind Tokens', 'React', 'Motion'],
    main_image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop'
    ],
    project_url: 'https://vivid.example.com',
    featured: false,
    published: true,
  },
  {
    id: 'proj-6',
    title_en: 'SmartEd — Adaptive EdTech & Examination Engine',
    title_ar: 'SmartEd — منصة الاختبارات والتعليم التفاعلي الذكي',
    slug: 'smarted-learning-platform',
    description_en: 'Cloud-native testing portal with AI proctoring, student performance metrics, and interactive gamified assessments across colleges and academies.',
    description_ar: 'بوابة اختبارات سحابية مع نظام مراقبة ذكي، تحليلات تقدم الطلاب، وتقييمات تفاعلية محفزة للمدارس والجامعات في العالم العربي.',
    category: 'Platforms',
    category_ar: 'المنصات الرقمية',
    client: 'SmartEd Foundation',
    year: '2025',
    technologies: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    main_image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop'
    ],
    project_url: 'https://smarted.example.com',
    featured: false,
    published: true,
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title_en: 'How We Build Scalable SaaS Architecture for High-Growth Startups',
    title_ar: 'كيف نصمم بنية برمجية سحابية قابلة للتوسع لشركات الـ SaaS الناشئة',
    slug: 'scalable-saas-architecture-guide',
    excerpt_en: 'Key principles for architecting multi-tenant databases, API gateways, and micro-frontend structures that handle 100x traffic spikes without breaking.',
    excerpt_ar: 'المبادئ الأساسية لهندسة قواعد البيانات متعددة المستأجرين وبوابات الـ API التي تتحمل تضاعف الزيارات 100 ضعف دون أي انهيار.',
    content_en: `When launching a SaaS product, velocity matters — but scaling without architectural foresight leads to devastating tech debt. At DevRopix, our engineering squads apply a disciplined approach:

### 1. Multi-Tenancy Strategy
Choose between database-per-tenant vs. shared-schema with tenant-ID constraints based on compliance and scale demands. For 90% of early-to-mid stage startups, a shared PostgreSQL schema with Row-Level Security (RLS) offers the optimal balance of efficiency and cost.

### 2. Microservices vs. Modular Monolith
Do not jump prematurely into dozens of microservices. A tightly decoupled modular monolith built in TypeScript or Go with clean domain boundaries provides 10x faster feature iteration before breaking off high-throughput worker nodes.

### 3. Asynchronous Task Processing
Never block an HTTP request for file exports, email dispatches, or heavy reporting. Offload with Redis message queues and distributed workers for resilient 50ms API response times.`,
    content_ar: `عند إطلاق منتج SaaS، السرعة في طرح المنتج حاسمة، ولكن التوسع بدون رؤية برمجية مسبقة يؤدي إلى ديون تقنية مكلفة. في DevRopix، تطبق فرقنا الهندسية منهجية دقيقة:

### 1. استراتيجية تعدد المستأجرين (Multi-Tenancy)
الاختيار بين قاعدة بيانات منفصلة لكل مستأجر، أو قاعدة بيانات مشتركة مع أمان على مستوى الصفوف (Row-Level Security) في PostgreSQL. هذا يوفر كفاءة تشغيلية وتكلفة استضافة متوازنة.

### 2. المونوليث النمطي قبل الخدمات المصغرة
لا ننصح بالتسرع في تفتيت النظام إلى عشرات الـ Microservices في البداية. الهيكل النمطي المترابط (Modular Monolith) بلغة TypeScript أو Go يمنحك سرعة إطلاق خيالية.

### 3. المعالجة غير المتزامنة للمهام
لا تجعل المستخدم ينتظر انتهاء عمليات التصدير أو إرسال الإيميلات. اعتمد على Redis Queues لمعالجة المهام الخلفية واستجابة واجهات API في أقل من 50 مللي ثانية.`,
    category: 'Engineering',
    category_ar: 'الهندسة البرمجية',
    featured_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop',
    author: 'Omar Al-Mansoor',
    author_role: 'Lead Solutions Architect @ DevRopix',
    published_date: 'Sep 12, 2025',
    read_time: '6 min read',
    seo_title: 'Scalable SaaS Architecture Best Practices | DevRopix Insights',
    seo_description: 'Discover how modern software studios architect scalable, fault-tolerant SaaS applications for rapid growth.',
    published: true,
  },
  {
    id: 'blog-2',
    title_en: 'Crafting Bi-Directional UI/UX: Lessons From Building for the GCC & MENA',
    title_ar: 'إتقان تصميم واجهات المستخدم ثنائية اللغة: تجاربنا في أسواق الخليج والشرق الأوسط',
    slug: 'bi-directional-ux-design-mena',
    excerpt_en: 'Designing for Arabic (RTL) is far more than flipping the CSS flexbox. Discover typography, visual hierarchy, and optical balance nuances.',
    excerpt_ar: 'تصميم الواجهات العربية (RTL) لا يقتصر على عكس اتجاه CSS فحسب. استكشف أسرار التوازن البصري والطباعة الرقمية الصحيحة.',
    content_en: `Designing modern software products for the Arab world requires authentic cultural comprehension:

- **Typography Dynamics**: Arabic letterforms possess distinct x-heights and ascenders/descenders. Standard line-heights suitable for English cause clipped accents in Arabic.
- **Icon Directionality**: Directional icons (arrows, chevron indicators, progress gauges) must flip, while universal symbols (media controls, search magnifiers, logos) must stay anchored.
- **Micro-Copy Nuance**: Arabic commands are rich and expressive. Keep CTAs succinct and action-focused.`,
    content_ar: `تصميم منتجات برمجية موجهة للعالم العربي يتطلب فهماً عميقاً لخصوصية اللغة وسلوك المستخدم:

- **ديناميكية الخطوط العربية**: الحروف العربية تحتاج مسافات رأسية (Line-height) أكبر مقارنة بالإنجليزية لضمان عدم تداخل التشكيل والنقاط.
- **اتجاه الأيقونات**: الأيقونات الدالة على الاتجاه (الأسهم، مؤشرات التقدم) يجب أن تنعكس، بينما الأيقونات العالمية (أزرار الوسائط، رمز البحث، الشعار) تبقى ثابتة.
- **صياغة الأزرار (Micro-copy)**: الأزرار العربية يجب أن تكون واضحة ومباشرة ومحفزة على اتخاذ الإجراء.`,
    category: 'UI/UX Design',
    category_ar: 'تصميم الواجهات',
    featured_image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop',
    author: 'Layla Mahmoud',
    author_role: 'Head of Product Design @ DevRopix',
    published_date: 'Aug 28, 2025',
    read_time: '5 min read',
    seo_title: 'Bi-Directional Arabic & English UX Design | DevRopix',
    seo_description: 'Master RTL and LTR user interface design for web and mobile software platforms.',
    published: true,
  },
  {
    id: 'blog-3',
    title_en: 'Flutter vs React Native in 2025: An Honest Studio Benchmark',
    title_ar: 'مقارنة فلاتر ورياكت نيتف في 2025: تحليل تقني من واقع مشاريعنا',
    slug: 'flutter-vs-react-native-2025',
    excerpt_en: 'We benchmarked compilation size, frame drops, ecosystem maturity, and team productivity across 14 enterprise mobile builds.',
    excerpt_ar: 'مقارنة دقيقة لحجم التطبيقات، سلاسة الرسوم، نضج المكتبات، وسرعة التطوير استناداً إلى 14 مشروع تطبيق تجاري حقيقي.',
    content_en: `Both cross-platform titans have matured drastically, but their strengths differ:

### When We Choose Flutter
- Intensive custom animations, canvas charts, and branded widget systems.
- Complete visual consistency across both iOS and Android.
- Superior performance on budget Android devices common across emerging markets.

### When We Choose React Native
- Existing web applications built on React with shared business logic and hooks.
- Heavy reliance on native OS SDKs and third-party enterprise hardware integrations.
- Instant hot-updating capabilities via Over-The-Air (OTA) updates.`,
    content_ar: `وصلت تقنيات الهواتف متعددة المنصات إلى نضج استثنائي، لكن لكل منهما نقاط قوة بارزة:

### متى نختار فلاتر (Flutter):
- عند بناء واجهات بتصميم خاص ورسوم متحركة معقدة ومخططات بيانية مخصصة.
- عندما يكون التناسق البصري المطلق بين Android وiOS أولوية قصوى.
- أداء أسرع على هواتف أندرويد الاقتصادية الأكثر انتشاراً في المنطقة.

### متى نختار رياكت نيتف (React Native):
- عند وجود نظام ويب قائم بـ React لمشاركة منطق البرمجة (Shared Hooks).
- الاعتماد المكثف على حزم الأجهزة الأصلية (Native Hardware SDKs).
- الاستفادة من التحديثات الفورية للتطبيق دون انتظار موافقة المتاجر (OTA Updates).`,
    category: 'Mobile Dev',
    category_ar: 'تطوير التطبيقات',
    featured_image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop',
    author: 'Ziad Tariq',
    author_role: 'Mobile Team Lead @ DevRopix',
    published_date: 'Aug 14, 2025',
    read_time: '7 min read',
    seo_title: 'Flutter vs React Native 2025 Comparison | DevRopix',
    seo_description: 'An in-depth performance and engineering benchmark comparing Flutter and React Native.',
    published: true,
  },
  {
    id: 'blog-4',
    title_en: 'Why Modern Web Vitals Directly Dictate Your Customer Acquisition Cost',
    title_ar: 'لماذا تؤثر سرعة الموقع (Core Web Vitals) مباشرة على تكلفة استقطاب العملاء',
    slug: 'core-web-vitals-customer-acquisition',
    excerpt_en: 'Every 100ms of latency costs modern digital businesses real revenue. Here is how we hit sub-second LCP scores.',
    excerpt_ar: 'كل 100 مللي ثانية تأخير ترفع تكلفة إعلاناتك وتقلل التحويلات. إليك كيف نضمن تحميل مواقعنا في أقل من ثانية.',
    content_en: `Speed is not merely a technical vanity metric; it is directly tied to business growth:

- **Google Quality Score**: Faster landing pages lower Google Ads and Meta Ads CPC rates by up to 28%.
- **Mobile Bouncing**: A page taking 3+ seconds to load loses 53% of incoming traffic.
- **DevRopix Standard**: We enforce automated Lighthouse performance gates in our CI/CD pipelines before any code hits production.`,
    content_ar: `السرعة ليست مجرد رقم تقني في التقارير، بل ترتبط مباشرة بربحية الأعمال:

- **نقاط الجودة الإعلانية**: الصفحات الأسرع تخفض تكلفة النقرة في حملات Google Ads وMeta بنسبة تصل إلى 28%.
- **ارتداد مستخدمي الموبايل**: المواقع التي تستغرق أكثر من 3 ثوانٍ تفقد أكثر من 53% من الزوار قبل رؤية المحتوى.
- **معيار DevRopix**: نضع اختبارات Lighthouse التلقائية كشرط أساسي في خطوط النشر الآلي قبل اعتماد أي كود.`,
    category: 'Performance',
    category_ar: 'الأداء والسرعة',
    featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    author: 'Kareem Nabil',
    author_role: 'Performance Engineer @ DevRopix',
    published_date: 'Jul 29, 2025',
    read_time: '4 min read',
    seo_title: 'Core Web Vitals & Customer Acquisition | DevRopix',
    seo_description: 'Learn how high performance web architecture reduces customer acquisition costs.',
    published: true,
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Eng. Khalid Al-Sulaiman',
    company: 'FinFlow Technologies (Riyadh)',
    position: 'Chief Technology Officer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    content_en: 'DevRopix proved to be a real strategic technology partner, not just another agency. They architected our core fintech platform with zero downtime and unprecedented speed. Our transactions run flawlessly.',
    content_ar: 'كانت DevRopix شريكاً تقنياً حقيقياً وليس مجرد شركة تنفيذية. قاموا ببناء منصتنا المالية بأعلى معايير الأمان وبدون دقيقة توقف واحدة. نفتخر بالعمل مع هذا الفريق المتميز.',
    rating: 5,
    published: true,
  },
  {
    id: 'test-2',
    name: 'Dr. Sarah Hassan',
    company: 'MedPulse Telehealth (Cairo)',
    position: 'Co-Founder & CEO',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    content_en: 'The level of care in UI/UX and mobile performance exceeded all expectations. Our patients constantly praise how smooth and intuitive the booking and video consultation flow is.',
    content_ar: 'مستوى العناية بتجربة المستخدم وسلاسة تطبيق الموبايل فاق كل التوقعات. يتلقى فريقنا يومياً إشادات من المرضى والأطباء بسهولة حجز المواعيد والاستشارات الطبية.',
    rating: 5,
    published: true,
  },
  {
    id: 'test-3',
    name: 'Mansoor Al-Nuaimi',
    company: 'LogiTrack Solutions (Dubai)',
    position: 'VP of Operations',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    content_en: 'Handling real-time fleet telemetry across three countries was a daunting engineering challenge. DevRopix built our dispatch engine ahead of deadline with remarkable code quality.',
    content_ar: 'إدارة وتتبع الأساطيل اللحظية عبر ثلاث دول كانت تحدياً تقنياً كبيراً. استطاعت DevRopix تسليم النظام قبل الموعد المحدد وبجودة برمجية فائقة نالت ثقة مجلس الإدارة.',
    rating: 5,
    published: true,
  },
  {
    id: 'test-4',
    name: 'Nour El-Din Sherif',
    company: 'Aura Luxury Group',
    position: 'Managing Director',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    content_en: 'Our e-commerce conversion rates doubled within 60 days of launching the new headless platform designed and engineered by DevRopix. Simply outstanding craftsmanship.',
    content_ar: 'تضاعفت معدلات التحويل في متجرنا الإلكتروني خلال 60 يوماً فقط من إطلاق المنصة الجديدة التي طورتها DevRopix. احترافية استثنائية في التصميم والتنفيذ.',
    rating: 5,
    published: true,
  }
];

export const initialPartners: Partner[] = [
  {
    id: 'part-1',
    name: 'FinFlow Group',
    logo: 'FinFlow',
    website: 'https://finflow.example.com',
    sort_order: 1,
    active: true,
  },
  {
    id: 'part-2',
    name: 'MedPulse Health',
    logo: 'MedPulse',
    website: 'https://medpulse.example.com',
    sort_order: 2,
    active: true,
  },
  {
    id: 'part-3',
    name: 'LogiTrack Freight',
    logo: 'LogiTrack',
    website: 'https://logitrack.example.com',
    sort_order: 3,
    active: true,
  },
  {
    id: 'part-4',
    name: 'Aura Holding',
    logo: 'AuraBrands',
    website: 'https://aura.example.com',
    sort_order: 4,
    active: true,
  },
  {
    id: 'part-5',
    name: 'Vivid Cloud Labs',
    logo: 'VividLabs',
    website: 'https://vivid.example.com',
    sort_order: 5,
    active: true,
  },
  {
    id: 'part-6',
    name: 'SmartEd Academy',
    logo: 'SmartEd',
    website: 'https://smarted.example.com',
    sort_order: 6,
    active: true,
  },
  {
    id: 'part-7',
    name: 'Nexus Ventures',
    logo: 'NexusVentures',
    website: 'https://nexus.example.com',
    sort_order: 7,
    active: true,
  },
  {
    id: 'part-8',
    name: 'Gulf Cloud Corp',
    logo: 'GulfCloud',
    website: 'https://gulfcloud.example.com',
    sort_order: 8,
    active: true,
  }
];

export const initialMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Ahmed Al-Ghamdi',
    email: 'ahmed@ventures.sa',
    phone: '+966 50 123 4567',
    company: 'Desert Peak Ventures (Riyadh)',
    service: 'Mobile App Development',
    budget: '$25,000 - $50,000',
    message: 'We are launching a specialized B2B procurement marketplace for restaurants across KSA. We need an end-to-end mobile app on iOS & Android along with a real-time order dispatch dashboard. Would like to review your portfolio and schedule a discovery call next week.',
    created_at: '2025-09-14 11:20 AM',
    status: 'unread',
  },
  {
    id: 'msg-2',
    name: 'Rana Mostafa',
    email: 'rana.m@careclinic.eg',
    phone: '+20 100 876 5432',
    company: 'Care Clinic Network (Cairo)',
    service: 'Custom Software Solutions',
    budget: '$15,000 - $25,000',
    message: 'We operate 8 polyclinics across Cairo and Alexandria. We need a unified patient electronic health records (EHR) system integrated with automated WhatsApp appointment reminders and local payment gateways.',
    created_at: '2025-09-13 04:45 PM',
    status: 'read',
  },
  {
    id: 'msg-3',
    name: 'Tariq Al-Hashemi',
    email: 'tariq@finbridge.ae',
    phone: '+971 55 987 6543',
    company: 'FinBridge Capital (Dubai)',
    service: 'Web Development',
    budget: '$50,000+',
    message: 'Looking for a dedicated software engineering squad from DevRopix to build our microservices financial dashboard and investor portal. High security and SOC2 compliance are essential.',
    created_at: '2025-09-11 09:15 AM',
    status: 'replied',
  }
];

export const initialSettings: Settings = {
  company_name: 'DevRopix',
  company_name_ar: 'ديف روبيكس — استوديو المنتجات الرقمية',
  tagline_en: 'We Build Digital Products That Move Businesses Forward.',
  tagline_ar: 'نبني منتجات رقمية تدفع أعمالك نحو المستقبل.',
  email: 'hello@devropix.com',
  phone: '+20 100 000 0000 / +966 50 000 0000',
  whatsapp: '+201000000000',
  address_en: 'Cairo Tech Hub & Riyadh Innovation District',
  address_ar: 'مجمع القاهرة التكنولوجي & حي الرياض للابتكار',
  facebook: 'https://facebook.com/devropix',
  instagram: 'https://instagram.com/devropix',
  linkedin: 'https://linkedin.com/company/devropix',
  twitter: 'https://x.com/devropix',
  github: 'https://github.com/devropix',
  default_title: 'DevRopix | Modern Software & Digital Product Studio',
  default_description: 'We help startups, entrepreneurs and enterprise businesses build world-class web applications, mobile apps, UI/UX design, and scalable cloud software.',
  og_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
  stats_projects: 48,
  stats_clients: 36,
  stats_years: 6,
  stats_technologies: 24,
};
