import fs from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const outputPath = path.join(process.cwd(), "public", "Muhammad-Huzaifa-Resume.pdf");

const lines = [
  "Muhammad Huzaifa",
  "GitHub: https://github.com/huzaifa157",
  "Email: m.huzaifa157@gmail.com | Phone: 0310-2003791",
  "LinkedIn: https://www.linkedin.com/in/syedhuzaifa-codes/",
  "",
  "SKILLS",
  "Programming Languages: Python, Java, JavaScript, TypeScript",
  "Web Development: Tailwind CSS, Next.js, JavaScript, TypeScript, React.js, Node.js, Express.js",
  "Frameworks & Concepts: MVC Architecture, NextAuth, REST APIs, OOP",
  "Databases: MySQL, MongoDB, MongoDB Atlas",
  "Tools & Platforms: Git, GitHub, VS Code, Azure, Cloudinary, ImageKit",
  "",
  "PROJECTS",
  "AI Studio - AI-Powered Video Publishing Platform",
  "Tech Stack: Next.js, React, TypeScript, MongoDB Atlas, NextAuth, Tailwind CSS, ImageKit, REST APIs",
  "- Engineered secure auth, media upload, streaming, and creator content management workflows.",
  "- Designed REST APIs for video CRUD, AI metadata generation, and upload authorization.",
  "- Implemented multi-provider AI fallback (OpenAI, Groq, Gemini, OpenRouter) with retries.",
  "- Hardened backend with rate limiting, timeout controls, and defensive error handling.",
  "",
  "Wanderlust - Full-Stack Travel Listing Platform",
  "Tech Stack: Node.js, Express.js, MongoDB Atlas, EJS, Passport.js, Cloudinary, Multer, Mapbox",
  "- Built MVC-based listings and reviews platform with session auth and role-based authorization.",
  "- Integrated Cloudinary + Multer for image pipelines and Mapbox + GeoJSON for mapping.",
  "- Delivered CRUD workflows with validation and Azure deployment.",
  "",
  "EDUCATION",
  "Bachelor of Computer Science (BSCS), 6th Semester - UBIT, University of Karachi",
  "Intermediate in Computer Science - Adamjee Govt. Science College (2021 - 2023)",
];

const pdfDoc = await PDFDocument.create();
let page = pdfDoc.addPage([595.28, 841.89]);
const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

let y = 800;
const left = 42;
const lineHeight = 14;

for (const line of lines) {
  if (y < 50) {
    page = pdfDoc.addPage([595.28, 841.89]);
    y = 800;
  }

  const isHeading = ["SKILLS", "PROJECTS", "EDUCATION"].includes(line);
  page.drawText(line, {
    x: left,
    y,
    size: isHeading ? 12 : 10,
    font: isHeading ? boldFont : regularFont,
    color: rgb(0.08, 0.12, 0.2),
  });

  y -= lineHeight;
}

const bytes = await pdfDoc.save();
await fs.writeFile(outputPath, bytes);
console.log(`Generated ${outputPath}`);
