export type Metric = {
  value: string;
  label: string;
  /** Where the number comes from — shown under hero metrics. */
  source?: string;
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
  /** A real product screenshot, shown in a browser frame when present. */
  screenshot?: { src: string; width: number; height: number; url: string };
  github?: string;
  repoNote?: string;
  live?: string;
  challenge: string;
  implementation: string[];
  impact: string[];
  architecture: string[];
};

/** The résumé bolds the first clause of each bullet; `lead` is that clause. */
export type ExperienceBullet = {
  lead: string;
  rest: string;
};

export type ExperienceEntry = {
  role: string;
  company: string;
  location?: string;
  context: string;
  period: string;
  stack: string[];
  bullets: ExperienceBullet[];
  current?: boolean;
  url?: string;
  urlLabel?: string;
};

export const profile = {
  name: "Muhammad Huzaifa",
  headline: "Full-Stack Software Engineer",
  // First-person version of the résumé summary.
  summary:
    "I'm a software engineer experienced in the MERN stack and Next.js, with working knowledge of C# / ASP.NET Core and PostgreSQL. I ship production apps — including an AI-driven insurance platform with LLM integrations.",
  ownership:
    "I build secure REST APIs with JWT and role-based access control, backed by responsive React interfaces.",
  // One sentence a recruiter can quote back to a hiring manager.
  positioning:
    "The server is the source of truth: typed APIs, authorization enforced per request rather than per screen, and state machines that reject illegal transitions instead of quietly accepting them.",
  email: "m.huzaifa157@gmail.com",
  phone: "+92 310 2003791",
  phoneHref: "+923102003791",
  location: "Karachi, Pakistan",
  timezone: "PKT · UTC+5",
  timeZoneId: "Asia/Karachi",
  github: "https://github.com/huzaifa157",
  githubUsername: "huzaifa157",
  linkedin: "https://www.linkedin.com/in/syedhuzaifa-codes/",
  linkedinHandle: "/in/syedhuzaifa-codes",
  site: "https://huzaifa-portfolio-blush.vercel.app",
  resume: "/resume.pdf",
  availability: "Open to full-stack engineering roles",
  experience: "1+ year",
  focus: "APIs, data modeling, auth & access control, AI features",
  industries: ["Insurance", "Healthcare", "Subscription commerce", "Travel"],
  currentRole: {
    title: "Software Engineer",
    company: "Super Auto",
    location: "UAE · Remote",
    url: "https://superauto.ae",
  },
  educationShort: "BSCS, UBIT — University of Karachi",
  education: [
    {
      degree: "Bachelor of Science in Computer Science (BSCS)",
      institution: "UBIT, University of Karachi",
      period: "Expected 2027",
    },
  ],
  achievements: [
    {
      title: "Selected for the Prime Minister's Youth Laptop Scheme",
      issuer: "Government of Pakistan — based on academic performance",
      year: "2025",
    },
    {
      title: "Web Development — Certificate",
      issuer: "Apna College",
      year: "2025",
    },
  ],
};

/**
 * Hero proof points. Every number appears on the résumé — keep them in sync so
 * the site and the PDF never disagree in an interview.
 */
export const heroMetrics: Metric[] = [
  { value: "4", label: "Industries shipped in", source: "Insurance · healthcare · commerce · travel" },
  { value: "49", label: "REST endpoints", source: "DentalFlow" },
  { value: "14", label: "MongoDB models", source: "DentalFlow" },
  { value: "4", label: "Roles under server-side RBAC", source: "DentalFlow" },
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
    title: "The schema evolves through migrations",
    body: "PostgreSQL changes ship as versioned migrations, with constraints and transactions guarding the invariants the application depends on.",
    proof: "Healthify",
  },
  {
    title: "Validate at the edge, fail predictably",
    body: "Joi and Zod schemas guard every mutation, with consistent status codes and error shapes the client can actually branch on.",
    proof: "Wanderlust · ServeFlow",
  },
  {
    title: "Containerized, and deployed by the pipeline",
    body: "The ordering platform runs in Docker and every push goes through GitHub Actions, so a release is a repeatable pipeline run rather than a manual step.",
    proof: "ServeFlow",
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: "Software Engineer",
    company: "Super Auto",
    location: "UAE · Remote",
    context: "AI-driven insurance brokerage platform, the company website, and B2B projects",
    period: "Nov 2025 — Present",
    current: true,
    url: "https://superauto.ae",
    urlLabel: "superauto.ae",
    stack: ["React", "Next.js", "LLM APIs", "Data pipelines", "API integrations"],
    bullets: [
      {
        lead: "Redesigned and developed superauto.ae using React and Next.js",
        rest: ", replacing the outdated website with a modern, user-friendly interface and improved usability.",
      },
      {
        lead: "Collaborated with the Team Lead to design, build, and test a full-stack, AI-driven insurance brokerage platform",
        rest: " that automates workflows from document intake to quotations and policy operations.",
      },
      {
        lead: "Built data pipelines and API integrations connecting multiple business systems",
        rest: ", supporting document intake, structured data extraction, and automated reporting.",
      },
      {
        lead: "Delivered responsive React interfaces",
        rest: " and integrated them with backend services for day-to-day brokerage operations.",
      },
      {
        lead: "Integrated LLM APIs into business applications",
        rest: ", adding AI features that reduce manual work for the operations team.",
      },
      {
        lead: "Contributed to multiple B2B projects",
        rest: ", turning manual processes into production-ready software.",
      },
    ],
  },
  {
    role: "Software Developer Intern",
    company: "BranDive Media Solutions",
    context: "Internship — full-stack web applications, from requirements through deployment",
    period: "Jul 2025 — Sep 2025",
    current: false,
    stack: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "ASP.NET Core",
      "MongoDB",
      "PostgreSQL",
      "JWT / RBAC",
    ],
    bullets: [
      {
        lead: "Supported end-to-end delivery of full-stack web applications",
        rest: ", from requirements through testing and deployment.",
      },
      {
        lead: "Built reusable React and Next.js components and RESTful services",
        rest: " with Node.js, Express.js, and ASP.NET Core, connecting frontend workflows to backend services.",
      },
      {
        lead: "Built authentication and role-based access control (RBAC)",
        rest: " with database-driven workflows on MongoDB and PostgreSQL.",
      },
      {
        lead: "Developed server-side business logic, third-party API integrations, and validation layers",
        rest: " for production applications.",
      },
      {
        lead: "Worked with developers and stakeholders across the development lifecycle",
        rest: ", diagnosing and fixing production issues to improve existing features.",
      },
    ],
  },
];

/**
 * The first five categories mirror the résumé's skills section, item for item
 * and in the same order. "AI & Data" collects tools named in the Super Auto
 * bullets rather than the skills list.
 */
export const skillsByCategory = {
  languages: ["JavaScript (ES6+)", "TypeScript", "C#", "Python", "SQL", "HTML5", "CSS3"],
  frontend: [
    "React.js",
    "Next.js",
    "React Native",
    "Tailwind CSS",
    "NativeWind",
    "Responsive Web Design",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "RESTful APIs",
    "JWT",
    "RBAC",
    "ASP.NET Core Web API",
  ],
  data: ["MongoDB (Atlas)", "Mongoose", "PostgreSQL", "Prisma ORM", "Database Design"],
  cloud: ["Docker", "AWS (Lambda)", "Git", "GitHub", "Postman", "Agile/Scrum"],
  ai: ["LLM APIs", "Data pipelines", "Structured data extraction"],
};

export type SkillCategory = keyof typeof skillsByCategory;

export const skillCategoryLabels: Record<SkillCategory, string> = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  data: "Databases",
  cloud: "Cloud & Tools",
  ai: "AI & Data",
};

export const techStack = Object.values(skillsByCategory).flat();

export type SkillProof = {
  /** Where it was used, as a short label. */
  where: string;
  /** Case study slug to link to, or omit to link to the experience section. */
  slug?: string;
  note: string;
};

/**
 * Where each skill was actually used. A skill without an entry still appears in
 * the stack, just without a "used in" link.
 */
export const skillProof: Record<string, SkillProof> = {
  "JavaScript (ES6+)": {
    where: "DentalFlow · Wanderlust",
    slug: "dentalflow",
    note: "Node.js and Express services, React interfaces, and the booking and scheduling logic behind both platforms.",
  },
  TypeScript: {
    where: "ServeFlow",
    slug: "serveflow",
    note: "Typed route handlers and Zod-validated contracts across a Next.js and Prisma codebase.",
  },
  "C#": {
    where: "Healthify",
    slug: "healthify",
    note: "ASP.NET Core Web APIs for orders, customers, the meal catalog, and subscription lifecycles.",
  },
  SQL: {
    where: "Healthify",
    slug: "healthify",
    note: "PostgreSQL schemas designed with migrations, constraints, and transactions.",
  },
  "React.js": {
    where: "Super Auto · DentalFlow",
    note: "Responsive interfaces for day-to-day brokerage operations at Super Auto, and four role-specific clinic dashboards in DentalFlow.",
  },
  "Next.js": {
    where: "superauto.ae · DentalFlow",
    slug: "dentalflow",
    note: "Redesigned superauto.ae to replace the outdated company site, and built the role-scoped dashboards of DentalFlow.",
  },
  "React Native": {
    where: "Expense Tracker",
    slug: "expense-tracker",
    note: "One Expo codebase shipping to iOS and Android, with sessions that survive app restarts.",
  },
  NativeWind: {
    where: "Expense Tracker",
    slug: "expense-tracker",
    note: "Utility-first styling for the cross-platform mobile UI.",
  },
  "Tailwind CSS": {
    where: "DentalFlow",
    slug: "dentalflow",
    note: "The design layer for the clinic dashboards and the public booking flow.",
  },
  "Node.js": {
    where: "DentalFlow · Wanderlust",
    slug: "dentalflow",
    note: "Backend services handling scheduling, authentication, and state management.",
  },
  "Express.js": {
    where: "DentalFlow · Wanderlust",
    slug: "wanderlust",
    note: "REST services with route, controller, and model separation, and validation on every mutating route.",
  },
  "ASP.NET Core Web API": {
    where: "Healthify",
    slug: "healthify",
    note: "The API surface for a UAE meal-subscription platform: orders, customers, catalog, and subscriptions.",
  },
  "RESTful APIs": {
    where: "DentalFlow",
    slug: "dentalflow",
    note: "49 endpoints covering appointments, medical records, prescriptions, invoices, and payments.",
  },
  JWT: {
    where: "DentalFlow",
    slug: "dentalflow",
    note: "JWT authentication with role checks enforced on every protected endpoint.",
  },
  RBAC: {
    where: "DentalFlow",
    slug: "dentalflow",
    note: "Server-side role-based access control across patient, doctor, receptionist, and administrator roles.",
  },
  PostgreSQL: {
    where: "Healthify · ServeFlow",
    slug: "healthify",
    note: "Relational schemas with migrations, constraints, and transactions.",
  },
  "MongoDB (Atlas)": {
    where: "DentalFlow",
    slug: "dentalflow",
    note: "14 models linking patients, appointments, prescriptions, invoices, and payments, deployed on MongoDB Atlas.",
  },
  Mongoose: {
    where: "DentalFlow",
    slug: "dentalflow",
    note: "Schema definitions and data access for the clinic platform's 14 models.",
  },
  "Prisma ORM": {
    where: "ServeFlow",
    slug: "serveflow",
    note: "Typed queries and transactional state updates over a 15-table PostgreSQL schema.",
  },
  "Database Design": {
    where: "DentalFlow · Healthify",
    slug: "dentalflow",
    note: "14 MongoDB models for the clinic platform, and PostgreSQL schemas with constraints and transactions for Healthify.",
  },
  Docker: {
    where: "ServeFlow",
    slug: "serveflow",
    note: "Containerized the ordering platform, with GitHub Actions running the pipeline on every push.",
  },
  "LLM APIs": {
    where: "Super Auto · AI Studio",
    note: "Integrated LLM APIs into business applications at Super Auto, adding AI features that reduce manual work for the operations team.",
  },
  "Data pipelines": {
    where: "Super Auto",
    note: "Pipelines and API integrations connecting multiple business systems, supporting document intake and automated reporting.",
  },
  "Structured data extraction": {
    where: "Super Auto",
    note: "Turning incoming documents into structured data inside the brokerage workflow.",
  },
};

/** Shown on the profile card and the social card — the tools recruiters scan for first. */
export const signatureStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "ASP.NET Core",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "LLM APIs",
];

export const caseStudies: ProjectCaseStudy[] = [
  {
    slug: "dentalflow",
    index: "01",
    title: "DentalFlow",
    kicker: "Dental clinic management platform",
    summary:
      "A multi-branch clinic platform — 3 branches, 4 user roles, 14 MongoDB models, and 49 REST endpoints covering appointments, medical records, prescriptions, invoices, and payments.",
    thesis:
      "Four roles reading the same records means authorization has to be enforced per request, not per screen.",
    role: "Full-stack developer — architecture, API, and dashboards",
    timeline: "2026",
    featured: true,
    stack: [
      "Next.js",
      "React",
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
    screenshot: {
      src: "/projects/dentalflow-screen.jpg",
      width: 2880,
      height: 1800,
      url: "dental-flow-dental-clinic-managemen.vercel.app",
    },
    github: "https://github.com/huzaifa157/DentalFlow-Dental-Clinic-Management-Portal",
    live: "https://dental-flow-dental-clinic-managemen.vercel.app",
    challenge:
      "A clinic group needed one unified platform for patients, doctors, receptionists, and administrators across three branches — where every role sees a different slice of the same appointments, records, and invoices, and no role can reach another's data.",
    implementation: [
      "Architected 14 MongoDB models and 49 REST endpoints covering appointments, medical records, prescriptions, invoices, and payments.",
      "Implemented JWT authentication with server-side role-based access control across patient, doctor, receptionist, and administrator workflows.",
      "Engineered appointment availability logic and a booking flow spanning branch, treatment, doctor, and time-slot selection, surfaced through four role-specific Next.js dashboards.",
      "Built Recharts analytics dashboards for revenue, patient growth, and doctor/branch performance.",
      "Wrote database seeding and deployed the database on MongoDB Atlas.",
      "Produced ER diagrams, workflow documentation, and technical handoff materials.",
    ],
    impact: [
      "Replaced fragmented per-branch scheduling with a single portal covering three branches.",
      "Gave administrators revenue, growth, and per-doctor performance visibility they previously assembled by hand.",
      "Shipped with documentation complete enough for another team to operate and extend the system.",
    ],
    architecture: [
      "Next.js dashboards rendered per role, with data access scoped server-side",
      "MongoDB Atlas with 14 models linking patients, appointments, prescriptions, invoices, and payments",
      "JWT sessions with role checks on every protected endpoint",
      "Recharts analytics layer over aggregated clinic and branch metrics",
    ],
  },
  {
    slug: "wanderlust",
    index: "02",
    title: "Wanderlust",
    kicker: "Full-stack travel marketplace",
    summary:
      "A listing marketplace with image uploads, reviews, price filtering, paginated search, and map-based discovery — with every state-changing route hardened.",
    thesis: "A booking system is a concurrency problem wearing a CRUD costume.",
    role: "Solo — full stack",
    timeline: "2025",
    featured: true,
    stack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Passport.js",
      "Mapbox",
      "Cloudinary",
      "EJS",
    ],
    metrics: [
      { value: "5", label: "Hardening layers" },
      { value: "0", label: "Overlapping bookings" },
      { value: "GeoJSON", label: "Map-based discovery" },
    ],
    thumbnail: "/projects/wanderlust-thumb.svg",
    github: "https://github.com/huzaifa157/Wanderlust",
    challenge:
      "Listings, reviews, images, and bookings all mutate shared state from public routes. The system needed correct reservation math and a defense layer that assumed every request was hostile.",
    implementation: [
      "Built listing management, image uploads, reviews, price filtering, and paginated search.",
      "Secured state-changing workflows with Passport.js authentication, ownership checks, Joi validation, rate limiting, and NoSQL-injection sanitization.",
      "Integrated Cloudinary image storage and Mapbox geocoding with MongoDB GeoJSON for interactive listing maps.",
      "Engineered booking logic that prevents overlapping reservations, calculates multi-night totals, and supports guest-only cancellation.",
    ],
    impact: [
      "Every mutating route sits behind authentication, ownership checks, validation, and rate limiting.",
      "Double-booked date ranges became structurally impossible rather than merely unlikely.",
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
    slug: "healthify",
    index: "03",
    title: "Healthify",
    kicker: "Meal subscription platform (UAE)",
    summary:
      "The backend of a UAE meal-subscription product: ASP.NET Core Web APIs for orders, customers, the meal catalog, and subscription lifecycles, over a PostgreSQL schema with migrations, constraints, and transactions.",
    thesis:
      "A subscription is a long-running record, so its rules belong in the schema's constraints and transactions — not in whichever screen happens to edit it.",
    role: "Full-stack developer — APIs, schema, and React integration",
    timeline: "2026",
    featured: true,
    stack: ["C#", "ASP.NET Core", "PostgreSQL", "React"],
    metrics: [
      { value: "4", label: "API domains" },
      { value: "SQL", label: "Migrations & transactions" },
      { value: "RBAC", label: "Role-based authorization" },
    ],
    thumbnail: "/projects/healthify-thumb.svg",
    repoNote: "Client project · private repo",
    challenge:
      "A meal-subscription business runs on recurring records: a subscription moves through a lifecycle, and each change touches customers, orders, and the meal catalog together. The backend had to keep those records consistent and restrict every change to the roles allowed to make it.",
    implementation: [
      "Developed ASP.NET Core Web APIs for orders, customers, the meal catalog, and subscription lifecycles.",
      "Designed PostgreSQL schemas, including migrations, constraints, and transactions.",
      "Added authentication, role-based authorization, and request validation on the API.",
      "Connected the APIs to the React frontend through reusable services.",
    ],
    impact: [
      "Orders, customers, catalog, and subscriptions are served from one validated API surface.",
      "Schema changes ship as versioned migrations, so the database evolves in step with the code.",
      "The React frontend reaches the backend through a reusable service layer rather than one-off calls.",
    ],
    architecture: [
      "ASP.NET Core Web API exposing order, customer, meal catalog, and subscription endpoints",
      "PostgreSQL schema evolved through migrations, with constraints and transactions",
      "Authentication, role-based authorization, and request validation at the API boundary",
      "React frontend consuming the API through reusable services",
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
    featured: false,
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
