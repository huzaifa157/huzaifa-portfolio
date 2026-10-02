export type Metric = {
  value: string;
  label: string;
};

export type ProjectCaseStudy = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  summary: string;
  thesis: string;
  role: string;
  timeline: string;
  featured: boolean;
  stack: string[];
  metrics: Metric[];
  thumbnail: string;
  github?: string;
  repoNote?: string;
  live?: string;
  challenge: string;
  implementation: string[];
  impact: string[];
  architecture: string[];
};

export type ExperienceEntry = {
  role: string;
  company: string;
  context: string;
  period: string;
  stack: string[];
  bullets: string[];
  current?: boolean;
};

export const profile = {
  name: "Muhammad Huzaifa",
  headline: "Software Developer | AI & Cloud",
  // One sentence a recruiter can quote back to a hiring manager.
  positioning:
    "The server is the source of truth: typed APIs, authorization enforced per request rather than per screen, and state machines that reject illegal transitions instead of quietly accepting them.",
  heroSummary:
    "Software Developer with 2 years of working experience designing, developing, and deploying full-stack applications for real-world and client projects. Experienced across frontend and backend development, REST APIs, authentication, RBAC, database design, and application architecture.",
  email: "m.huzaifa157@gmail.com",
  phone: "+92 310 2003791",
  phoneHref: "+923102003791",
  location: "Karachi, Pakistan",
  timezone: "PKT · UTC+5",
  github: "https://github.com/huzaifa157",
  githubUsername: "huzaifa157",
  linkedin: "https://www.linkedin.com/in/syedhuzaifa-codes/",
  site: "https://huzaifa-portfolio-blush.vercel.app",
  resume: "/resume.pdf",
  availability: "Open to full-stack engineering roles · 2026–2027",
  educationShort: "BSCS, University of Karachi — expected 2027",
  currentlyBuilding:
    "Healthify — a D2C healthy meal subscription platform for the UAE market built with React, React Native for Web, TypeScript, and Tailwind CSS.",
  education: [
    {
      degree: "Bachelor of Science in Computer Science (BSCS)",
      institution: "UBIT, University of Karachi",
      period: "Expected 2027",
    },
  ],
  achievements: [
    {
      title: "Selected for Prime Minister's Youth Laptop Scheme",
      issuer: "Government of Pakistan (High Academic Performance)",
      year: "2025",
    },
    {
      title: "Certificate of Completion — Web Development",
      issuer: "Apna College",
      year: "2025",
    },
    {
      title: "Certificate of Appreciation — Inter-University Tech Competitions",
      issuer: "University of Karachi",
      year: "2026",
    },
  ],
};

/**
 * Hero proof points verified against codebase and resume.
 */
export const heroMetrics: Metric[] = [
  { value: "49", label: "REST endpoints (DentalFlow)" },
  { value: "14", label: "MongoDB models & schemas" },
  { value: "4", label: "Role-based access tiers" },
  { value: "4", label: "Products shipped to users" },
];

/**
 * The differentiator section: how decisions get made, each backed by a shipped
 * project that demonstrates it.
 */
export const principles = [
  {
    title: "Access control is server-side or it is not real",
    body: "JWT sessions plus server-enforced role checks across four dashboards — the UI hides what a role cannot do, the API refuses it regardless.",
    proof: "DentalFlow",
  },
  {
    title: "Illegal transitions return 409, not 200",
    body: "Appointments, treatments, and invoicing run through an explicit state machine. Anything that would corrupt state is rejected at the service layer.",
    proof: "DentalFlow",
  },
  {
    title: "404 over 403 on protected resources",
    body: "Service-layer RBAC answers unauthorized reads with a not-found instead of a forbidden, so record IDs cannot be enumerated by probing the API.",
    proof: "DentalFlow",
  },
  {
    title: "Cross-platform UI with shared primitives",
    body: "Shared components with React Native for Web reduce maintenance and guarantee identical design fidelity across mobile and desktop browsers.",
    proof: "Healthify",
  },
  {
    title: "Validate at the edge, fail predictably",
    body: "Zod and Joi schemas guard every mutation, with consistent status codes and error shapes the client can actually branch on.",
    proof: "DentalFlow · Wanderlust",
  },
  {
    title: "Green CI or it does not ship",
    body: "Containerized and automated testing in CI pipelines catch environment drift and broken builds before a client ever sees them.",
    proof: "DentalFlow · Healthify",
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: "Software Developer",
    company: "BranDive Media Solutions",
    context: "Full-stack client applications, multi-branch clinic management, and API design",
    period: "Jan 2026 — Sep 2026",
    current: false,
    stack: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "ASP.NET Core",
      "Entity Framework",
      "AWS",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "React Native",
      "NativeWind",
      "JWT / RBAC",
    ],
    bullets: [
      "Developed and delivered full-stack applications across diverse business domains, translating business requirements into scalable, maintainable, and production-ready software solutions.",
      "Built responsive and reusable frontend interfaces and RESTful APIs using React, Node.js, Express.js and ASP.NET Core, integrating frontend workflows with backend services.",
      "Designed and implemented database-driven workflows, authentication, authorization, and RBAC while maintaining application reliability, security, and code quality.",
      "Developed server-side business logic, API integrations, validation workflows, and data-access layers using MongoDB and PostgreSQL-based applications.",
      "Collaborated with developers and stakeholders throughout the software development lifecycle, from requirement analysis and implementation to testing, debugging, deployment, and ongoing improvements.",
      "Diagnosed and resolved application issues and improved existing features to deliver reliable, maintainable, and user-focused software.",
    ],
  },
  {
    role: "Freelance Software Developer",
    company: "Independent",
    context: "Client applications, D2C subscription platforms, and full-stack solutions",
    period: "Nov 2024 — Present",
    current: true,
    stack: [
      "React.js",
      "React Native for Web",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    bullets: [
      "Developed and deployed full-stack web applications for clients across multiple domains, taking ownership from requirements analysis and solution design through development, testing, deployment, and maintenance.",
      "Built responsive frontend interfaces, RESTful APIs, database-driven workflows, authentication systems, and third-party integrations based on client requirements.",
    ],
  },
];

export const skillsByCategory = {
  languages: ["JavaScript", "TypeScript", "C#", "SQL", "Python"],
  backend: [
    "Node.js",
    "Express.js",
    "ASP.NET Core",
    "REST APIs",
    "API Design",
    "CRUD Workflows",
  ],
  frontend: [
    "React.js",
    "Next.js",
    "React Native",
    "NativeWind",
    "Tailwind CSS",
    "Recharts",
  ],
  data: [
    "MongoDB",
    "Mongoose",
    "PostgreSQL",
    "Prisma",
    "Entity Framework Core",
    "Redis",
  ],
  cloud: [
    "LLM APIs",
    "AI Integration",
    "AWS",
    "Vercel",
    "Docker",
    "CI/CD",
  ],
  engineering: [
    "JWT",
    "Authentication & RBAC",
    "Database Design",
    "API Integration",
    "Git",
  ],
};

export const skillCategoryLabels: Record<keyof typeof skillsByCategory, string> = {
  languages: "Languages",
  backend: "Backend",
  frontend: "Frontend & Mobile",
  data: "Databases & ORMs",
  cloud: "AI & Cloud",
  engineering: "Engineering & Security",
};

export const techStack = Object.values(skillsByCategory).flat();

/** Marquee row under the hero — the tools recruiters scan for first. */
export const signatureStack = [
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "ASP.NET Core",
  "C#",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "AWS",
  "Vercel",
  "Tailwind CSS",
  "JWT / RBAC",
];

export const caseStudies: ProjectCaseStudy[] = [
  {
    slug: "dentalflow",
    index: "01",
    title: "DentalFlow",
    kicker: "Multi-branch dental clinic platform",
    summary:
      "Production clinic portal for a live client: 3 branches, 4 user roles, 14 data models, and 49 endpoints covering appointments, records, and billing.",
    thesis:
      "Four roles reading the same records means authorization has to be enforced per request, not per screen.",
    role: "Software Developer — BranDive Media Solutions",
    timeline: "2026",
    featured: true,
    stack: [
      "Next.js",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Recharts",
      "Tailwind CSS",
    ],
    metrics: [
      { value: "49", label: "REST endpoints" },
      { value: "14", label: "MongoDB models" },
      { value: "4", label: "User roles" },
      { value: "3", label: "Clinic branches" },
    ],
    thumbnail: "/projects/dentalflow-thumb.svg",
    github: "https://github.com/huzaifa157/DentalFlow-Dental-Clinic-Management-Portal",
    live: "https://dental-flow-dental-clinic-managemen.vercel.app",
    challenge:
      "A clinic group needed one unified platform for patients, doctors, receptionists, and administrators across three branches — where every role sees a different slice of the same appointments, records, and invoices, and no role can reach another's data.",
    implementation: [
      "Designed 14 MongoDB models and 49 REST endpoints covering appointments, medical records, prescriptions, invoices, and payments.",
      "Implemented JWT authentication with server-side role-based access control across patient, doctor, receptionist, and administrator workflows.",
      "Built an appointment-booking flow spanning branch, treatment, doctor, and time-slot selection, surfaced through four role-specific Next.js dashboards.",
      "Built Recharts analytics dashboards for revenue, patient growth, and doctor/branch performance.",
      "Produced ER diagrams, workflow documentation, and technical handoff materials for the client team.",
    ],
    impact: [
      "Replaced fragmented per-branch scheduling with a single portal covering three branches.",
      "Gave administrators revenue, growth, and per-doctor performance visibility they previously assembled by hand.",
      "Shipped with documentation complete enough for the client team to operate and extend the system.",
    ],
    architecture: [
      "Next.js dashboards rendered per role, with data access scoped server-side",
      "MongoDB with 14 models linking patients, appointments, prescriptions, invoices, and payments",
      "JWT sessions with role checks on every protected endpoint",
      "Recharts analytics layer over aggregated clinic and branch metrics",
    ],
  },
  {
    slug: "healthify",
    index: "02",
    title: "Healthify",
    kicker: "D2C healthy meal subscription platform (UAE)",
    summary:
      "Responsive healthy meal subscription platform for the UAE market built with React, React Native for Web, TypeScript, and Tailwind CSS.",
    thesis:
      "A subscription product wins or loses on conversion flows and responsive macro calculators.",
    role: "Full-Stack Developer — Independent",
    timeline: "2026",
    featured: true,
    stack: [
      "React.js",
      "React Native for Web",
      "TypeScript",
      "Tailwind CSS",
      "Next.js",
      "Vercel",
    ],
    metrics: [
      { value: "UAE", label: "Target market (AED)" },
      { value: "Web+Mobile", label: "React Native for Web" },
      { value: "Macros", label: "Calorie & meal calculator" },
      { value: "Vercel", label: "Production deployment" },
    ],
    thumbnail: "/projects/healthify-thumb.svg",
    repoNote: "Client production project",
    challenge:
      "Deliver a fluid, high-converting meal subscription user experience tailored to the UAE market that runs seamlessly across desktop browsers and mobile web with shared component primitives.",
    implementation: [
      "Built a responsive healthy meal subscription platform for the UAE market using React, React Native for Web, TypeScript, and Tailwind CSS.",
      "Developed reusable cross-platform UI components and responsive layouts for consistent web and mobile experiences.",
      "Implemented interactive meal plan sections, calorie and macro-focused content, AED pricing presentation, FAQ sections, and conversion-oriented user flows.",
      "Deployed the production frontend on Vercel with a focus on responsive design, performance, and maintainable component architecture.",
    ],
    impact: [
      "Shared component primitives reduced UI maintenance across mobile web and desktop.",
      "Interactive macro calculators allow users to customize caloric targets before subscribing.",
      "Fast loading times and conversion-focused checkout flow tailored to UAE payment and delivery expectations.",
    ],
    architecture: [
      "React & React Native for Web component hierarchy with Tailwind CSS",
      "TypeScript domain types for meal plans, nutritional breakdowns, and subscriptions",
      "Vercel edge deployment with automated preview and production pipeline",
    ],
  },
  {
    slug: "wanderlust",
    index: "03",
    title: "Wanderlust",
    kicker: "Full-stack travel marketplace",
    summary:
      "Listing marketplace with booking logic that prevents overlapping reservations, plus a hardened set of state-changing routes.",
    thesis: "A booking system is a concurrency problem wearing a CRUD costume.",
    role: "Solo — full stack",
    timeline: "2025",
    featured: true,
    stack: [
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "EJS",
      "Passport.js",
      "Cloudinary",
      "Mapbox",
    ],
    metrics: [
      { value: "0", label: "Overlapping bookings" },
      { value: "5", label: "Hardening layers" },
      { value: "GeoJSON", label: "Map-based discovery" },
    ],
    thumbnail: "/projects/wanderlust-thumb.svg",
    github: "https://github.com/huzaifa157/Wanderlust",
    challenge:
      "Listings, reviews, images, and bookings all mutate shared state from public routes. The system needed correct reservation math and a defense layer that assumed every request was hostile.",
    implementation: [
      "Built a travel marketplace supporting listing creation, image uploads, reviews, full-text search, price filtering, and paginated discovery.",
      "Engineered booking logic that prevents overlapping reservations, calculates multi-night totals, supports cancellations, and enforces guest-only cancellation.",
      "Secured state-changing workflows with Passport.js authentication, ownership-based authorization, CSRF protection, Joi validation, rate limiting, and NoSQL-injection sanitization.",
      "Integrated Cloudinary image storage and Mapbox geocoding with MongoDB GeoJSON for interactive listing maps.",
    ],
    impact: [
      "Double-booked date ranges became structurally impossible rather than merely unlikely.",
      "Every mutating route sits behind authentication, ownership checks, validation, and rate limiting.",
      "Geospatial search turned a flat list of listings into map-based discovery.",
    ],
    architecture: [
      "Express MVC server with route, controller, and model separation",
      "MongoDB Atlas persistence for users, listings, reviews, and bookings",
      "Passport.js sessions with ownership-based authorization middleware",
      "Cloudinary media storage and Mapbox + GeoJSON for map rendering",
    ],
  },
  {
    slug: "expense-tracker",
    index: "04",
    title: "Expense Tracker",
    kicker: "Cross-platform mobile app",
    summary:
      "One Expo codebase shipping to iOS and Android, with JWT sessions that survive app restarts and a validated CRUD API behind them.",
    thesis:
      "Mobile auth is judged on what happens after the app is killed, not at login.",
    role: "Solo — mobile + API",
    timeline: "2025",
    featured: true,
    stack: [
      "React Native",
      "Expo",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "JWT",
      "NativeWind",
    ],
    metrics: [
      { value: "1", label: "Codebase, 2 platforms" },
      { value: "JWT", label: "Persisted sessions" },
      { value: "CRUD", label: "Validated API" },
    ],
    thumbnail: "/projects/expense-tracker-thumb.svg",
    github: "https://github.com/huzaifa157/Expense-Management-APP",
    challenge:
      "Ship a single codebase that runs natively on iOS and Android, with authentication that persists across app restarts and an expense API that fails predictably on a flaky mobile connection.",
    implementation: [
      "Built and shipped a single Expo codebase for iOS and Android with persistent JWT authentication using AsyncStorage.",
      "Designed RESTful APIs for authentication and expense CRUD operations, including server-side input validation and consistent error responses.",
      "Created reusable UI components and navigation flows with React Navigation and NativeWind for a consistent cross-platform user experience.",
    ],
    impact: [
      "Cut platform-specific development effort down to a single JavaScript codebase.",
      "Users stay signed in between launches instead of re-authenticating on every cold start.",
      "Consistent error shapes let the client branch on failure instead of guessing.",
    ],
    architecture: [
      "Expo-managed React Native client with React Navigation",
      "Express REST API for authentication and expense CRUD",
      "MongoDB Atlas persistence for users and expense records",
      "JWT auth with AsyncStorage-backed session persistence",
    ],
  },
  {
    slug: "ai-studio",
    index: "05",
    title: "AI Studio",
    kicker: "AI video publishing platform",
    summary:
      "Creator platform with a typed, role-based API layer, CDN-backed media delivery, and multi-provider AI fallback.",
    thesis:
      "If your product depends on an AI provider, it has to keep working when that provider does not.",
    role: "Solo — full stack",
    timeline: "2025",
    featured: false,
    stack: [
      "Next.js",
      "TypeScript",
      "MongoDB Atlas",
      "NextAuth",
      "Tailwind CSS",
      "ImageKit",
      "Vercel",
    ],
    metrics: [
      { value: "Multi", label: "Provider fallback" },
      { value: "CDN", label: "Media delivery" },
    ],
    thumbnail: "/projects/ai-studio-thumb.svg",
    github: "https://github.com/huzaifa157/AI-Studio-Video-Publishing-Platform",
    live: "https://ai-studio-video-publishing-platform.vercel.app",
    challenge:
      "Build a creator platform that uploads and streams media while generating AI metadata reliably across provider outages and rate limits.",
    implementation: [
      "Built a typed API layer with role-based access control, request validation, and structured error handling on every route.",
      "Integrated ImageKit for optimized media storage and delivery, serving transformations over CDN instead of raw uploads.",
      "Engineered end-to-end authentication, media upload, and creator content workflows with protected routes.",
      "Implemented a multi-provider AI fallback strategy with retries, timeout controls, and graceful degradation.",
      "Deployed on Vercel with protected API routes and environment-based configuration.",
    ],
    impact: [
      "Delivered a full-stack SaaS-style workflow from upload to public playback.",
      "Kept metadata generation working through model and provider failures.",
      "Shipped a deployment-ready environment with production troubleshooting on Vercel.",
    ],
    architecture: [
      "Next.js App Router frontend with API route handlers",
      "MongoDB Atlas for persistent user and content data",
      "Provider abstraction layer over AI metadata engines",
      "ImageKit CDN for asset storage and delivery",
    ],
  },
  {
    slug: "intellitest",
    index: "06",
    title: "IntelliTest",
    kicker: "Adaptive assessment platform",
    summary:
      "Exam engine with qualification-based question progression, timing controls, real-time scoring, and certificate generation.",
    thesis: "An assessment is only fair if timing and scoring are enforced server-side.",
    role: "Solo — full stack",
    timeline: "2025",
    featured: false,
    stack: ["Node.js", "Express.js", "EJS", "MongoDB", "JavaScript"],
    metrics: [
      { value: "Adaptive", label: "Question routing" },
      { value: "Auto", label: "Certificate issuance" },
    ],
    thumbnail: "/projects/intellitest-thumb.svg",
    github: "https://github.com/huzaifa157/IntelliTest",
    challenge:
      "Design an exam-style system that feels responsive and fair while controlling timing, scoring, and qualification-based question progression.",
    implementation: [
      "Built adaptive test progression logic based on qualification and response accuracy.",
      "Implemented timer and scoring modules for real-time assessment behavior.",
      "Added a certificate generation flow for candidate completion outcomes.",
      "Structured backend endpoints for question delivery and result persistence.",
    ],
    impact: [
      "Delivered a complete assessment lifecycle from onboarding to certification.",
      "Created a practical foundation for educational and aptitude platforms.",
      "Demonstrated stateful flow control and backend scoring logic.",
    ],
    architecture: [
      "Server-rendered EJS frontend for lightweight dynamic rendering",
      "Express route handlers for test state and scoring",
      "Persistent storage layer for user performance and results",
    ],
  },
  {
    slug: "serveflow",
    index: "07",
    title: "ServeFlow",
    kicker: "Café management & ordering platform",
    summary:
      "End-to-end ordering platform on a 15-table PostgreSQL schema — menu, checkout, live staff queue, and admin console across three roles.",
    thesis:
      "Money and state are the two things an ordering system cannot get wrong, so both live entirely on the server.",
    role: "Solo — architecture, schema, API, UI, CI",
    timeline: "2026",
    featured: false,
    stack: [
      "Next.js 16",
      "TypeScript",
      "PostgreSQL",
      "Prisma 7",
      "Auth.js",
      "Zod",
      "Redis",
      "Docker",
      "GitHub Actions",
    ],
    metrics: [
      { value: "15", label: "Postgres tables" },
      { value: "18", label: "REST endpoints" },
      { value: "3", label: "Role tiers" },
      { value: "409", label: "On illegal transitions" },
    ],
    thumbnail: "/projects/serveflow-thumb.svg",
    github: "https://github.com/huzaifa157/ServeFlow",
    challenge:
      "An ordering platform has to stay correct while the menu changes underneath it, while multiple staff act on the same order, and while anyone with a browser can replay a request.",
    implementation: [
      "Built an end-to-end ordering platform on a 15-table PostgreSQL schema — menu, checkout, live staff queue, and admin console.",
      "Made the server the sole pricing authority: clients never submit money values, and price/name snapshots persist on order lines.",
      "Enforced an order and payment state machine that returns 409 on illegal transitions, backed by a full staff audit trail.",
    ],
    impact: [
      "Order totals stay auditable and reproducible even after the menu is edited or repriced.",
      "Concurrent staff actions can no longer corrupt order state.",
    ],
    architecture: [
      "Next.js App Router frontend with typed route handlers and server actions",
      "PostgreSQL via Prisma 7 — 15 tables covering menu, orders, payments, and audit",
      "Auth.js sessions with role checks enforced in the service layer",
    ],
  },
];

export const featuredCaseStudies = caseStudies.filter((project) => project.featured);
export const archiveCaseStudies = caseStudies.filter((project) => !project.featured);
