This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## About this portfolio

This repository hosts the personal portfolio site for Muhammad Huzaifa. It includes:

- A dark-mode, recruiter-focused homepage with hero, highlights, tech stack, and contact.
- Case studies for featured projects under `app/projects/[slug]` (AI Studio, Wanderlust, IntelliTest).
- A downloadable resume in the `public` folder (file name present in this repo: `My Resume.pdf`).
- Open Graph / Twitter metadata configured in `app/layout.tsx` (update `metadataBase` when you change domain).

If you fork or deploy this project, update the following before sharing:

- `app/layout.tsx` → set `metadataBase` to your production domain (used for OG/Twitter images).
- `public` → replace `My Resume.pdf` with your resume PDF and use a clean filename like `resume.pdf` if you prefer.
- `app/data/portfolio.ts` → edit `profile`, `caseStudies`, and `skillsByCategory` to reflect your personal details and project content.

## Running locally

Start the dev server:

```bash
npm install
npm run dev
```

Build for production (to verify OG and server routes):

```bash
npm run build
npm run start
```

## Editing content

- Homepage: `app/page.tsx` (composes sections from `app/data/portfolio.ts`).
- Projects list: `app/projects/page.tsx`.
- Case studies: `app/projects/[slug]/page.tsx` (data comes from `app/data/portfolio.ts`).
- Global styles: `app/globals.css`.

## Deploy

Push to a Git repository (GitHub) and connect the repo to Vercel — Vercel will auto-deploy on push to `main`.

If you want, I can also:

- Rename `My Resume.pdf` to `resume.pdf` and update the site link.
- Add PNG OG images per project for richer social previews.
- Wire live GitHub metrics to a small API route that caches results server-side.

---

If you'd like I can commit the README updates and perform either of the optional tasks above. Which should I do next?
