export type ProjectCaseStudy = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  github: string;
  thumbnail: string;
  live?: string;
  challenge: string;
  implementation: string[];
  impact: string[];
  architecture: string[];
};

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  stack: string[];
  bullets: string[];
  current?: boolean;
};

export const profile = {
  name: "Muhammad Huzaifa",
  email: "m.huzaifa157@gmail.com",
  phone: "0310-2003791",
  github: "https://github.com/huzaifa157",
  linkedin: "https://www.linkedin.com/in/syedhuzaifa-codes/",
  headline: "Software Engineer",
  educationShort: "BSCS, Expected 2027",
  location: "Karachi, Pakistan",
  heroSummary:
    "Software Engineer focused on building full-stack web and mobile applications end-to-end — designing REST APIs, implementing authentication and role-based authorization, developing responsive user interfaces, and deploying on modern cloud platforms.",
  education: [
    "Bachelor of Science in Computer Science (BSCS), Expected 2027 - UBIT, University of Karachi",
    "Intermediate in Computer Science - Adamjee Govt. Science College (2023)",
  ],
};

export const experience: ExperienceEntry[] = [
  {
    role: "Software Engineer Intern",
    company: "BranDive Media Solutions",
    period: "Jul 2026 - Current",
    current: true,
    stack: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
    bullets: [
      "Built DentalFlow, a multi-branch clinic management portal for a live client, with role-based dashboards for patients, doctors, receptionists, and admins.",
      "Designed the appointment booking flow — branch, treatment, doctor, and time-slot selection — and the schema linking patients, appointments, prescriptions, and invoices, with JWT enforcing role-based access.",
      "Added an analytics dashboard for revenue, patient growth, and doctor/branch performance, and delivered ER diagram, system flow diagram, and README for client handoff.",
    ],
  },
];

export const skillsByCategory = {
  languagesFrontend: [
    "JavaScript",
    "Java",
    "TypeScript",
    "React.js",
    "Next.js",
    "React Native",
    "Tailwind CSS",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "REST APIs",
    "JWT Authentication",
    "Passport.js",
    "MVC Architecture",
    "Mongoose",
  ],
  databases: ["MongoDB", "PostgreSQL", "MySQL", "Prisma", "Neon"],
  toolsPlatforms: [
    "Git",
    "GitHub",
    "Docker",
    "Postman",
    "Vercel",
    "Azure",
    "ImageKit",
    "Expo",
    "VS Code",
  ],
};

export const skillCategoryLabels: Record<keyof typeof skillsByCategory, string> = {
  languagesFrontend: "Languages & Frontend",
  backend: "Backend",
  databases: "Databases",
  toolsPlatforms: "Tools & Platforms",
};

export const techStack = [
  "JavaScript",
  "Java",
  "TypeScript",
  "React.js",
  "Next.js",
  "React Native",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "REST APIs",
  "JWT Authentication",
  "Passport.js",
  "MVC Architecture",
  "Mongoose",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Prisma",
  "Neon",
  "Git",
  "GitHub",
  "Docker",
  "Postman",
  "Vercel",
  "Azure",
  "ImageKit",
  "Expo",
  "VS Code",
];

export const caseStudies: ProjectCaseStudy[] = [
  {
    slug: "ai-studio",
    title: "AI Studio",
    summary:
      "AI-powered video publishing platform with a typed, role-based API layer and CDN-backed media delivery.",
    stack: [
      "Next.js",
      "TypeScript",
      "MongoDB Atlas",
      "NextAuth",
      "Tailwind CSS",
      "ImageKit",
      "Vercel",
    ],
    github: "https://github.com/huzaifa157/AI-Studio-Video-Publishing-Platform",
    thumbnail: "/projects/ai-studio-thumb.svg",
    live: "https://ai-studio-video-publishing-platform.vercel.app",
    challenge:
      "Build a production-grade creator platform that can upload and stream media while generating AI metadata reliably across provider outages and rate limits.",
    implementation: [
      "Built a typed API layer with role-based access control, request validation, and structured error handling on every route.",
      "Integrated ImageKit for optimized media storage and delivery, with transformations served over CDN instead of raw uploads.",
      "Engineered end-to-end authentication, media upload, and creator content workflows with protected routes.",
      "Implemented multi-provider AI fallback strategy with retries, timeout controls, and graceful degradation.",
      "Deployed on Vercel with protected API routes and environment-based configuration.",
    ],
    impact: [
      "Delivered a full-stack SaaS-style workflow from upload to public playback.",
      "Improved reliability under model/provider failures through intelligent fallback logic.",
      "Prepared deployment-ready environment with production troubleshooting on Vercel.",
    ],
    architecture: [
      "App Router based Next.js frontend and API route handlers",
      "MongoDB Atlas for persistent user and content data",
      "Provider abstraction layer for AI metadata engines",
      "CDN-based asset storage and delivery via ImageKit",
    ],
  },
  {
    slug: "wanderlust",
    title: "Wanderlust",
    summary:
      "Travel listing marketplace with owner-scoped authorization, image uploads, and map-based discovery.",
    stack: [
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "EJS",
      "Passport.js",
      "Cloudinary",
      "Mapbox",
      "Azure",
    ],
    github: "https://github.com/huzaifa157/Wanderlust",
    thumbnail: "/projects/wanderlust-thumb.svg",
    challenge:
      "Create a robust listing platform with secure user flows, geospatial discovery, and image-heavy content while keeping architecture maintainable.",
    implementation: [
      "Built a listing marketplace with owner-scoped authorization enforced at the middleware level, so users can only edit or delete listings and reviews they created.",
      "Integrated Cloudinary for image uploads and Mapbox geocoding with MongoDB GeoJSON for interactive location mapping.",
      "Deployed to Azure with environment-based config, MongoDB-backed sessions, and server-side input validation on all forms.",
      "Implemented session-based authentication using Passport.js across listings, reviews, and user modules.",
    ],
    impact: [
      "Shipped a full-featured booking-style experience with clear separation of concerns.",
      "Enabled media-rich listing management and interactive location exploration.",
      "Deployed successfully on Azure with environment-driven configuration.",
    ],
    architecture: [
      "Express MVC server with route/controller/model separation",
      "MongoDB Atlas persistence for users, listings, and reviews",
      "Cloudinary for media storage and delivery",
      "Mapbox and GeoJSON integration for map rendering",
    ],
  },
  {
    slug: "expense-tracker",
    title: "Expense Tracker",
    summary:
      "Cross-platform mobile expense tracker built with React Native and Expo, backed by a JWT-secured REST API.",
    stack: [
      "React Native",
      "Expo",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "JWT",
      "NativeWind",
    ],
    github: "https://github.com/huzaifa157/Expense-Tracker",
    thumbnail: "/projects/expense-tracker-thumb.svg",
    challenge:
      "Ship a single codebase that runs natively on iOS and Android, with authentication that persists across app restarts and a reliable expense CRUD API.",
    implementation: [
      "Built a single Expo codebase running on iOS and Android, with JWT auth persisted via AsyncStorage for login that survives app restarts.",
      "Designed RESTful APIs for authentication and expense CRUD operations, with input validation and consistent HTTP status codes on error.",
      "Implemented reusable UI components and navigation flows with React Navigation and NativeWind for a consistent cross-platform experience.",
    ],
    impact: [
      "Delivered a production-style mobile app from a single JavaScript codebase, cutting platform-specific dev effort.",
      "Ensured a persistent, secure session so users stay logged in between app launches.",
      "Demonstrated mobile-first REST API design with predictable error handling for client consumption.",
    ],
    architecture: [
      "Expo-managed React Native client with React Navigation",
      "Express REST API for auth and expense CRUD",
      "MongoDB Atlas persistence for users and expense records",
      "JWT-based auth with AsyncStorage session persistence",
    ],
  },
  {
    slug: "intellitest",
    title: "IntelliTest",
    summary:
      "Adaptive IQ testing platform with dynamic question difficulty, timing controls, real-time scoring, and certificate generation.",
    stack: ["Node.js", "Express.js", "EJS", "MongoDB", "JavaScript"],
    github: "https://github.com/huzaifa157/IntelliTest",
    thumbnail: "/projects/intellitest-thumb.svg",
    challenge:
      "Design an exam-style system that feels responsive and fair while controlling timing, scoring, and qualification-based question progression.",
    implementation: [
      "Built adaptive test progression logic based on qualification and response accuracy.",
      "Implemented timer and scoring modules for real-time assessment behavior.",
      "Added certificate generation flow for candidate completion outcomes.",
      "Structured backend endpoints for question delivery and result persistence.",
    ],
    impact: [
      "Delivered a complete assessment lifecycle from onboarding to certification.",
      "Created a practical foundation for educational and aptitude platforms.",
      "Showcased strong backend logic and stateful flow control.",
    ],
    architecture: [
      "Server-rendered EJS frontend for lightweight dynamic rendering",
      "Express route handlers for test state and scoring",
      "Persistent storage layer for user performance and results",
    ],
  },
];

export const highlights = [
  { label: "Featured Case Studies", value: "4" },
  { label: "Academic Track", value: "BSCS, Expected 2027" },
];
