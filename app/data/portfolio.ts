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
  headline: "Full-Stack Engineer",
  // One sentence a recruiter can quote back to a hiring manager.
  positioning:
    "The server is the source of truth: typed APIs, authorization enforced per request rather than per screen, and state machines that reject illegal transitions instead of quietly accepting them.",
  heroSummary:
    "Full-stack engineer working across Next.js, Node, PostgreSQL, and MongoDB. I ship client-facing products end to end: schema design, REST APIs, authentication and authorization, dashboards, Docker, and CI.",
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
    "ServeFlow — a café ordering platform on Postgres, Prisma, and a CI-gated Docker pipeline.",
  education: [
    {
      degree: "Bachelor of Science in Computer Science (BSCS)",
      institution: "UBIT, University of Karachi",
      period: "Expected 2027",
    },
  ],
  achievements: [
    {
      title: "Certificate of Completion — Web Development",
      issuer: "Apna College",
      year: "2026",
    },
    {
      title: "Certificate of Appreciation — Inter-University Tech Competitions",
      issuer: "University of Karachi",
      year: "2026",
    },
  ],
};

/**
 * Hero proof points. Every number here is the sum of figures that appear on the
 * resume, so the site and the PDF never disagree in an interview.
 */
export const heroMetrics: Metric[] = [
  { value: "67", label: "REST endpoints designed" },
  { value: "29", label: "Data models & tables" },
  { value: "7", label: "Role-based access tiers" },
  { value: "4", label: "Products shipped to users" },
];

/**
 * The differentiator section: how decisions get made, each backed by a shipped
 * project that demonstrates it.
 */
export const principles = [
  {
    title: "The server is the only pricing authority",
    body: "Clients never submit money values. Prices resolve server-side, and price/name snapshots persist on order lines so historical orders survive menu changes.",
    proof: "ServeFlow",
  },
  {
    title: "Illegal transitions return 409, not 200",
    body: "Orders and payments run through an explicit state machine. Anything that would corrupt state is rejected at the service layer and written to a staff audit trail.",
    proof: "ServeFlow",
  },
  {
    title: "404 over 403 on protected resources",
    body: "Service-layer RBAC answers unauthorized reads with a not-found instead of a forbidden, so record IDs cannot be enumerated by probing the API.",
    proof: "ServeFlow",
  },
  {
    title: "Validate at the edge, fail predictably",
    body: "Zod and Joi schemas guard every mutation, with consistent status codes and error shapes the client can actually branch on.",
    proof: "ServeFlow · Wanderlust",
  },
  {
    title: "Access control is server-side or it is not real",
    body: "JWT sessions plus server-enforced role checks across four dashboards — the UI hides what a role cannot do, the API refuses it regardless.",
    proof: "DentalFlow",
  },
  {
    title: "Green CI or it does not ship",
    body: "Dockerized services with GitHub Actions gating merges, so environment drift and broken builds get caught before a client ever sees them.",
    proof: "ServeFlow",
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: "Software Engineer Intern",
    company: "BranDive Media Solutions",
    context: "Multi-branch clinic management portal for a live client",
    period: "Jul 2026 — Present",
    current: true,
    stack: [
      "React.js",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Recharts",
      "Tailwind CSS",
      "JWT",
    ],
    bullets: [
      "Built DentalFlow, a multi-branch dental clinic management portal supporting 3 branches and 4 user roles, designing 14 MongoDB models and 49 REST API endpoints for appointments, medical records, prescriptions, invoices, and payments.",
      "Implemented JWT-based authentication and server-side role-based access control across patient, doctor, receptionist, and administrator workflows, and built an appointment-booking flow with four role-specific Next.js dashboards.",
      "Built Recharts analytics dashboards for revenue, patient growth, and doctor/branch performance, and produced ER diagrams, workflow documentation, and technical handoff materials.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Independent",
    context: "Client applications across e-commerce and hospitality",
    period: "Nov 2025 — Present",
    current: true,
    stack: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "Tailwind CSS",
    ],
    bullets: [
      "Independently scoped, developed, and deployed full-stack web applications for clients across multiple domains, handling frontend and backend implementation.",
      "Built e-commerce and café applications with product/menu management, carts, customer ordering, and end-to-end order workflows, using responsive interfaces and scalable application architecture.",
    ],
  },
];

export const skillsByCategory = {
  languages: ["Java", "JavaScript", "TypeScript", "SQL", "Python"],
  backend: [
    "Node.js",
    "Express.js",
    "Next.js App Router",
    "REST APIs",
    "Zod",
    "JWT / Auth.js",
  ],
  frontend: ["React.js", "Next.js", "Expo / React Native", "Tailwind CSS", "Recharts"],
  data: ["PostgreSQL", "MongoDB", "Prisma", "Mongoose", "Redis"],
  platform: ["Docker", "GitHub Actions", "CI/CD", "Vercel", "Git", "Postman"],
};

export const skillCategoryLabels: Record<keyof typeof skillsByCategory, string> = {
  languages: "Languages",
  backend: "Backend",
  frontend: "Frontend",
  data: "Databases & Data",
  platform: "Cloud & DevOps",
};

export const techStack = Object.values(skillsByCategory).flat();

/** Marquee row under the hero — the tools recruiters scan for first. */
export const signatureStack = [
  "TypeScript",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "MongoDB",
  "Redis",
  "Docker",
  "GitHub Actions",
  "Tailwind CSS",
];

export const caseStudies: ProjectCaseStudy[] = [
  {
    slug: "serveflow",
    index: "01",
    title: "ServeFlow",
    kicker: "Café management & ordering platform",
    summary:
      "End-to-end ordering platform on a 15-table PostgreSQL schema — menu, checkout, live staff queue, and admin console across three roles.",
    thesis:
      "Money and state are the two things an ordering system cannot get wrong, so both live entirely on the server.",
    role: "Solo — architecture, schema, API, UI, CI",
    timeline: "2026",
    featured: true,
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
      "An ordering platform has to stay correct while the menu changes underneath it, while multiple staff act on the same order, and while anyone with a browser can replay a request. Prices, order state, and permissions all needed a single authority.",
    implementation: [
      "Built an end-to-end ordering platform on a 15-table PostgreSQL schema — menu, checkout, live staff queue, and admin console — across three roles and 18 REST endpoints.",
      "Made the server the sole pricing authority: clients never submit money values, and price/name snapshots persist on order lines so historical orders survive menu changes.",
      "Enforced an order and payment state machine that returns 409 on illegal transitions, backed by a full staff audit trail of who moved what and when.",
      "Applied service-layer RBAC that returns 404 rather than 403 on unauthorized reads, so order IDs cannot be enumerated by probing the API.",
      "Validated every mutation with Zod schemas and containerized the stack with Docker, gating merges through GitHub Actions.",
    ],
    impact: [
      "Order totals stay auditable and reproducible even after the menu is edited or repriced.",
      "Concurrent staff actions can no longer corrupt order state — invalid moves are rejected, logged, and attributable.",
      "CI-gated Docker builds keep environment drift out of client deployments.",
    ],
    architecture: [
      "Next.js App Router frontend with typed route handlers and server actions",
      "PostgreSQL via Prisma 7 — 15 tables covering menu, orders, payments, and audit",
      "Auth.js sessions with role checks enforced in the service layer, not the UI",
      "Redis for hot queue reads; Docker image built and tested in GitHub Actions",
    ],
  },
  {
    slug: "dentalflow",
    index: "02",
    title: "DentalFlow",
    kicker: "Multi-branch clinic management portal",
    summary:
      "Production clinic portal for a live client: 3 branches, 4 user roles, 14 data models, and 49 endpoints covering the full patient lifecycle.",
    thesis:
      "Four roles reading the same records means authorization has to be enforced per request, not per screen.",
    role: "Software Engineer Intern — BranDive Media Solutions",
    timeline: "Jul 2026 — Present",
    featured: true,
    stack: [
      "Next.js",
      "React.js",
      "Node.js",
      "MongoDB",
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
      "A clinic group needed one portal for patients, doctors, receptionists, and administrators across three branches — where every role sees a different slice of the same appointments, records, and invoices, and no role can reach another's data.",
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
];

export const featuredCaseStudies = caseStudies.filter((project) => project.featured);
export const archiveCaseStudies = caseStudies.filter((project) => !project.featured);
