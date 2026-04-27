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

export const profile = {
  name: "Muhammad Huzaifa",
  email: "m.huzaifa157@gmail.com",
  phone: "0310-2003791",
  github: "https://github.com/huzaifa157",
  linkedin: "https://www.linkedin.com/in/syedhuzaifa-codes/",
  headline: "Software Engineer | MERN Stack Developer | Bachelor of Computer Science (BSCS)",
  location: "Pakistan",
  heroSummary:
    "Full-stack engineer focused on robust API systems, scalable MERN architecture, and production-grade user experiences.",
  education: [
    "Bachelor of Computer Science (BSCS), 6th Semester - UBIT, University of Karachi",
    "Intermediate in Computer Science - Adamjee Govt. Science College (2021 - 2023)",
  ],
};

export const skillsByCategory = {
  programmingLanguages: ["Python", "Java", "JavaScript", "TypeScript"],
  webDevelopment: [
    "Tailwind CSS",
    "Next.js",
    "React.js",
    "Node.js",
    "Express.js",
  ],
  frameworksConcepts: [
    "MVC Architecture",
    "NextAuth",
    "REST APIs",
    "OOP",
  ],
  databases: ["MySQL", "MongoDB", "MongoDB Atlas"],
  toolsPlatforms: [
    "Git",
    "GitHub",
    "VS Code",
    "Azure",
    "Cloudinary",
    "ImageKit",
  ],
};

export const techStack = [
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "Tailwind CSS",
  "NextAuth",
  "REST APIs",
  "MVC Architecture",
  "MySQL",
  "MongoDB",
  "MongoDB Atlas",
  "Cloudinary",
  "ImageKit",
  "Azure",
  "Git",
  "GitHub",
];

export const caseStudies: ProjectCaseStudy[] = [
  {
    slug: "ai-studio",
    title: "AI Studio",
    summary:
      "AI-powered video publishing platform with secure auth, media pipeline, and resilient multi-provider AI workflows.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "MongoDB Atlas",
      "NextAuth",
      "Tailwind CSS",
      "ImageKit",
      "REST APIs",
      "OpenAI",
      "Groq",
      "Gemini",
      "OpenRouter",
      "Vercel",
    ],
    github: "https://github.com/huzaifa157/AI-Studio-Video-Publishing-Platform",
    thumbnail: "/projects/ai-studio-thumb.svg",
    live: "https://ai-studio-video-publishing-platform.vercel.app",
    challenge:
      "Build a production-grade creator platform that can upload and stream media while generating AI metadata reliably across provider outages and rate limits.",
    implementation: [
      "Engineered end-to-end authentication, media upload, and creator content workflows with protected routes.",
      "Designed REST API modules for video CRUD, AI metadata generation, and signed upload authorization.",
      "Implemented multi-provider AI fallback strategy with retries, timeout controls, and graceful degradation.",
      "Integrated ImageKit CDN for optimized media delivery and production-safe access handling.",
      "Hardened reliability with per-user rate limiting, defensive validation, and error boundaries.",
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
      "Full-stack travel listing platform featuring listings, reviews, authentication, image uploads, and map-based discovery.",
    stack: [
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "EJS",
      "Passport.js",
      "Cloudinary",
      "Multer",
      "Mapbox",
      "GeoJSON",
      "Azure",
    ],
    github: "https://github.com/huzaifa157/Wanderlust",
    thumbnail: "/projects/wanderlust-thumb.svg",
    challenge:
      "Create a robust listing platform with secure user flows, geospatial discovery, and image-heavy content while keeping architecture maintainable.",
    implementation: [
      "Built MVC-based module structure for listings, reviews, users, and platform utilities.",
      "Implemented session-based authentication and role-aware authorization using Passport.js.",
      "Developed image upload and retrieval workflow with Multer + Cloudinary integration.",
      "Added geospatial listing support through Mapbox and GeoJSON-driven mapping.",
      "Implemented CRUD operations with validation pipelines for reliable data handling.",
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
  { label: "GitHub Repositories", value: "25+" },
  { label: "Featured Case Studies", value: "3" },
  { label: "Academic Track", value: "BSCS 6th Semester" },
];
