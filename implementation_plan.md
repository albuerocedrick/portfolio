# Portfolio + AI Chatbot — Agile Implementation Plan

> Derived directly from [SYSTEM_ARCHITECTURE.md](file:///c:/projects/my-portfolio/SYSTEM_ARCHITECTURE.md). Every phase, task, data shape, design token, and dependency listed below is mandated by that document.

---

## Resolved Decisions

| Decision | Answer |
|---|---|
| **Project Root** | Work inside the nested `c:\projects\my-portfolio\my-portfolio\` folder |
| **Personal Content** | Will be gathered interactively — each JSON file has a guide (see Phase 1) |
| **Gemini API Key** | Not yet created — step-by-step guide included in Phase 0 |
| **Formspree Account** | Not yet created — step-by-step guide included in Phase 0 |
| **GitHub & Vercel Deployment** | User handles deployment at the end — full guide included in Phase 6 |

---

## Current State Assessment

**Project root:** `c:\projects\my-portfolio\my-portfolio\`

**Already installed packages:**

| Package | Version | Status |
|---|---|---|
| `next` | 16.2.9 | ✅ Installed |
| `react` | 19.2.4 | ✅ Installed |
| `react-dom` | 19.2.4 | ✅ Installed |
| `tailwindcss` | ^4 | ✅ Installed |
| `@tailwindcss/postcss` | ^4 | ✅ Installed |
| `@types/node` | ^20 | ✅ Installed |
| `@types/react` | ^19 | ✅ Installed |
| `@types/react-dom` | ^19 | ✅ Installed |
| `typescript` | ^5 | ✅ Installed |
| `eslint` | ^9 | ✅ Installed |

**Still needs to be installed (Phase 1.1):**
`framer-motion`, `lucide-react`, `@google/generative-ai`, `zod`, `uuid`, `react-hot-toast`, `@types/uuid`

> [!IMPORTANT]
> The architecture specifies **Next.js 14+ (App Router)** and **Tailwind CSS**. The existing scaffold uses Next.js 16 and Tailwind v4, which are compatible but use a different configuration approach (CSS-based `@theme` instead of `tailwind.config.ts`). We will adapt the design tokens to Tailwind v4's CSS-native configuration while preserving the exact same token values from the architecture doc.

---

## Technology Stack (Strictly Per Architecture)

| Layer | Technology | Notes |
|---|---|---|
| Frontend | Next.js (App Router) + Tailwind CSS v4 | SSG for pages, CSR for chatbot only |
| Hosting | Vercel Hobby Plan | Free, auto CI/CD from GitHub |
| AI | Google Gemini API (`gemini-1.5-flash`) | Free tier: 15 req/min, 1M tokens/day |
| Contact Form | Formspree | Free tier: 50 submissions/month |
| Monitoring | UptimeRobot | Free tier: 50 monitors |
| Domain | Namecheap `.dev` | ~$15/yr |
| Animation | Framer Motion | Chatbot + micro-interactions |
| Icons | Lucide React | UI icons |
| Validation | Zod | Input validation |
| Notifications | react-hot-toast | User feedback toasts |

---

## Phase 0 — Third-Party Accounts & Pre-Project Setup

**Sprint Goal:** Create and configure all external accounts and credentials *before* writing a single line of code. This prevents mid-development blockers.

**Duration:** ~1–2 hours (one-time setup)

> [!IMPORTANT]
> Complete this phase entirely before Phase 1. Having all credentials ready means you will never be blocked waiting for an API key or form ID during development.

---

### Task 0.1 — Create a GitHub Repository

1. Go to [https://github.com/new](https://github.com/new)
2. Set the repository name (e.g., `portfolio`)
3. Set visibility to **Public** (required for Vercel free tier)
4. Do **not** initialize with a README (the project already exists locally)
5. Click **Create repository**
6. Copy the remote URL (e.g., `https://github.com/yourname/portfolio.git`)
7. Link your local project to the remote:
   ```bash
   git init
   git add .
   git commit -m "initial scaffold"
   git branch -M main
   git remote add origin https://github.com/yourname/portfolio.git
   git push -u origin main
   ```

**Acceptance Criteria:** Repository visible on GitHub with the initial scaffold pushed.

---

### Task 0.2 — Get a Google Gemini API Key

The chatbot (Phase 5) requires a free Gemini API key. Here is how to get one:

**Step-by-step:**
1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
2. Click **"Create API Key"**
3. Select **"Create API key in new project"** (or use an existing Google Cloud project)
4. Copy the generated key — it looks like `AIzaSy...` (39 characters)
5. Store it securely — you will use it in Phase 1 (`.env.local`) and Phase 6 (Vercel environment variables)

> [!CAUTION]
> Never share this key publicly or commit it to GitHub. It gives access to your Gemini quota.

**Free tier limits (more than enough for a portfolio):**
- 15 requests per minute
- 1,000,000 tokens per day
- 1,500 requests per day

**Acceptance Criteria:** You have a Gemini API key starting with `AIzaSy`. Keep it ready for Phase 1.5 (`.env.local` setup).

---

### Task 0.3 — Create a Formspree Account & Form

The contact form (Phase 2) uses Formspree. No backend code is needed.

**Step-by-step:**
1. Go to [https://formspree.io](https://formspree.io) and click **"Get Started Free"**
2. Sign up with your email address
3. Click **"New Form"**
4. Name your form (e.g., `Portfolio Contact`)
5. Set the destination email to where you want to receive contact submissions
6. Copy your **Form ID** — it appears in the form's endpoint URL:
   ```
   https://formspree.io/f/YOUR_FORM_ID
                                ^^^^^^^^
                          This is your Form ID
   ```
7. Keep the Form ID ready for Phase 2 (Contact section)

**Free tier:** 50 form submissions per month — more than enough for a portfolio.

**Acceptance Criteria:** You have a Formspree Form ID (8-character code). Keep it ready for Phase 2.6.

---

### Task 0.4 — Create a Vercel Account (for later deployment)

> [!NOTE]
> You don't need to deploy now — this is just account setup so Phase 6 deployment is instant.

1. Go to [https://vercel.com](https://vercel.com) and click **"Sign Up"**
2. Sign up with **GitHub** (this links your account and enables auto-deployment)
3. No further action needed until Phase 6

**Acceptance Criteria:** Vercel account created and linked to GitHub.

---

### Phase 0 — Definition of Done
- [ ] GitHub repository created and initial code pushed
- [ ] Gemini API key obtained and stored securely (not yet in code)
- [ ] Formspree account created and Form ID saved
- [ ] Vercel account created and linked to GitHub
- [ ] All credentials written down in a secure location (password manager or notes)

---

## Phase 1 — Setup & Foundation

**Sprint Goal:** Install the missing dependencies, create the complete folder structure, configure design tokens, set up fonts, and configure environment variables. The site should render a blank dark-themed page at the end of this phase.

**Duration:** ~1 day

### User Stories
- *As a developer*, I want only the missing packages installed so I don't duplicate work.
- *As a developer*, I want a consistent design system (colors, fonts, spacing) enforced via Tailwind tokens.
- *As a developer*, I want the folder structure matching the architecture exactly.

---

### Task 1.1 — Install Missing Dependencies

**What is already installed:** `next`, `react`, `react-dom`, `tailwindcss`, `@tailwindcss/postcss`, all `@types/*`, `typescript`, `eslint`

**Install only what is missing:**

```bash
# Run from: c:\projects\my-portfolio\my-portfolio\

# Styling & animation
npm install framer-motion lucide-react

# AI
npm install @google/generative-ai

# Utilities
npm install zod uuid react-hot-toast

# Dev types (missing)
npm install -D @types/uuid
```

> [!NOTE]
> `pdf-parse` is only needed if you want to auto-extract CV text from a PDF file. We'll install it on-demand in Phase 5.1.

**Acceptance Criteria:** All packages listed above appear in `package.json`. `npm run dev` still starts without errors.

---

### Task 1.2 — Create Complete Folder Structure

Create all directories and placeholder files at `c:\projects\my-portfolio\my-portfolio\`:

```
app/
├── page.tsx                    ← exists, will be rewritten in Phase 2
├── layout.tsx                  ← exists, will be updated in Task 1.6
├── globals.css                 ← exists, will be rewritten in Task 1.3
├── projects/
│   └── [slug]/page.tsx         ← create as empty placeholder
└── api/
    ├── chat/route.ts           ← create as empty placeholder
    └── contact/route.ts        ← create as empty placeholder

components/
├── ChatWidget.tsx              ← create as empty placeholder
├── NavBar.tsx                  ← create as empty placeholder
└── sections/
    ├── Hero.tsx                ← create as empty placeholder
    ├── About.tsx               ← create as empty placeholder
    ├── Projects.tsx            ← create as empty placeholder
    ├── Skills.tsx              ← create as empty placeholder
    ├── Education.tsx           ← create as empty placeholder
    └── Contact.tsx             ← create as empty placeholder

data/
├── projects.json               ← create as empty array scaffold
├── skills.json                 ← create as empty array scaffold
├── about.json                  ← create as empty object scaffold
├── experience.json             ← create as empty object scaffold
└── cv.txt                      ← create as empty placeholder

public/
├── images/                     ← create empty directory
└── resume.pdf                  ← add your PDF here later
```

**Acceptance Criteria:** Every directory and file above exists. `npm run dev` still starts without errors.

---

### Task 1.3 — Configure Design Tokens

Since we're using Tailwind CSS v4, design tokens are configured via CSS `@theme` in `globals.css` instead of `tailwind.config.ts`. Use the **exact values** from the architecture:

```css
/* app/globals.css — replace the existing content entirely */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-bg:      #0A0A0F;   /* page background (very dark) */
  --color-surface: #13131A;   /* cards, nav bar, chat panel */
  --color-text:    #E8E8F0;   /* primary body text (off-white) */
  --color-muted:   #6B7280;   /* secondary text, placeholders */
  --color-accent:  #6C63FF;   /* CTAs, links, chatbot button (violet) */

  /* Fonts */
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-code:    'JetBrains Mono', monospace;
}

/* Global base styles */
html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

**Acceptance Criteria:** `bg-bg`, `bg-surface`, `text-text`, `text-muted`, `text-accent`, `font-heading`, `font-body`, `font-code` all resolve correctly as Tailwind classes.

---

### Task 1.4 — Configure Google Fonts

Import Space Grotesk, Inter, and JetBrains Mono via `next/font/google` in `app/layout.tsx`:

```tsx
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-code',
  display: 'swap',
})
```

Apply all three font variables to the `<html>` element:
```tsx
<html className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
```

**Acceptance Criteria:** All three fonts load. Browser DevTools shows Space Grotesk on headings, Inter on body text, JetBrains Mono on `<code>` elements.

---

### Task 1.5 — Environment Variables Setup

Create two files in the project root (`c:\projects\my-portfolio\my-portfolio\`):

**`.env.local`** (for local development — git-ignored, never committed):
```bash
GEMINI_API_KEY=your_gemini_api_key_from_phase_0
CONTACT_EMAIL=your_email@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**`.env.example`** (committed to GitHub as a template — values left blank):
```bash
GEMINI_API_KEY=
CONTACT_EMAIL=
NEXT_PUBLIC_SITE_URL=
RATE_LIMIT_KV_URL=
```

Verify `.gitignore` already contains `.env.local` (it should by default from Next.js scaffold).

> [!CAUTION]
> `GEMINI_API_KEY` must **never** be prefixed with `NEXT_PUBLIC_`. That would expose it to the browser. It must only be used server-side in `app/api/chat/route.ts`.

**Acceptance Criteria:** `.env.example` committed to GitHub. `.env.local` exists locally but does NOT appear in `git status`. `process.env.GEMINI_API_KEY` is accessible in an API route.

---

### Task 1.6 — Root Layout Setup

Rewrite `app/layout.tsx` to:
- Apply font CSS variables (from Task 1.4)
- Set base `className` on `<body>`: `bg-bg text-text font-body antialiased`
- Add SEO metadata (title, description)
- Import `globals.css`
- Add placeholder comments for NavBar and ChatWidget (added in later phases)

```tsx
export const metadata = {
  title: 'Your Name — Software Engineer',
  description: 'Portfolio of [Your Name], a software engineer specializing in full-stack web development.',
}
```

**Acceptance Criteria:** `npm run dev` shows a dark-background (`#0A0A0F`) page with off-white text and Inter font.

---

### 📋 Personal Information Gathering — `about.json`

> [!IMPORTANT]
> Before starting Phase 2, I will ask you for your personal information to populate the data files. Here is exactly what I will need. You can prepare these answers now.

**For `data/about.json`:**
```
- Your full name
- Your job title (e.g., "Junior Full-Stack Developer")
- Your location (e.g., "Quezon City, Philippines")
- Your availability (e.g., "Open to full-time roles — remote, hybrid, or on-site")
- Your email address
- Your LinkedIn profile URL
- Your GitHub profile URL
- 2–3 short bio paragraphs (what you do, your background, what you're passionate about)
- 2–4 engineering values (e.g., "I write clean, readable code over clever code")
- Your typical response time (e.g., "Within 24–48 hours")
```

**How to add or update information later:**
> Edit `data/about.json` directly. The component reads from the JSON at build time. After saving the file, run `npm run dev` to see changes instantly in local development, or push to GitHub for the live site to update.

---

### Phase 1 — Definition of Done
- [ ] Only missing dependencies installed (no duplicates)
- [ ] Full folder structure created matching architecture
- [ ] Design tokens configured and working in Tailwind
- [ ] Google Fonts (Space Grotesk, Inter, JetBrains Mono) loading correctly
- [ ] `.env.local` created with Gemini API key
- [ ] `.env.example` committed to GitHub
- [ ] `npm run dev` shows dark-background page with correct fonts
- [ ] `npm run build` completes without errors

---

## Phase 2 — Portfolio Pages (Homepage Sections)

**Sprint Goal:** Build the full single-page portfolio with NavBar, all 6 homepage sections, responsive layout, and working contact form via Formspree. At the end of this phase, the site is **publicly shareable**.

**Duration:** ~3–4 days

### User Stories
- *As a visitor*, I want to see a professional portfolio homepage with clear sections.
- *As a visitor*, I want smooth navigation between sections via the NavBar.
- *As a visitor*, I want to contact the developer via a form.
- *As a visitor*, I want the site to look great on mobile and desktop.

---

### Task 2.1 — NavBar Component

**File:** `components/NavBar.tsx`

- Fixed top navigation, `bg-surface` background with subtle bottom border
- Links to scroll-anchor sections: `#hero`, `#about`, `#projects`, `#skills`, `#education`, `#contact`
- Mobile hamburger menu (responsive, Lucide `Menu` icon)
- Active section highlighting based on scroll position (`IntersectionObserver`)
- "Download CV" button linking to `/resume.pdf`
- Import in `layout.tsx` (above the children slot)

**Design:** Glassmorphism effect with `backdrop-blur-md`, `bg-surface/80`, `border-b border-white/5`

**Acceptance Criteria:** NavBar visible on all pages, hamburger works on mobile, smooth-scrolls to each section.

---

### Task 2.2 — Hero Section

**File:** `components/sections/Hero.tsx`
**Data source:** Hardcoded (your name, title, tagline — no JSON needed)

- Full-viewport (`min-h-screen`) hero with your name, job title, and one-line tagline
- Animated gradient text for name using Framer Motion + CSS `bg-clip-text`
- Primary CTA: "View My Work" → scrolls to `#projects`
- Secondary CTA: "Download CV" → links to `/resume.pdf`
- Subtle animated background (e.g., slow-moving gradient orbs)
- Framer Motion entrance animations: fade-up with stagger on each element

**Design Principles:**
- Name/title uses `font-heading` (Space Grotesk), large size
- CTAs use `bg-accent` (primary) and `border-accent` outlined (secondary)

**Acceptance Criteria:** Hero fills viewport, animations play smoothly on first load, both CTAs work correctly.

---

### Task 2.3 — About Section

**File:** `components/sections/About.tsx`
**Data source:** `data/about.json`

**Data schema (populate with your real information):**
```json
{
  "name": "Your Name",
  "title": "Junior Full-Stack Developer",
  "location": "Quezon City, Philippines",
  "availability": "Open to full-time roles — remote, hybrid, or on-site",
  "email": "you@gmail.com",
  "linkedin": "https://linkedin.com/in/yourname",
  "github": "https://github.com/yourname",
  "bio_paragraphs": [
    "Paragraph 1 — who you are and what you do.",
    "Paragraph 2 — your background or journey into tech.",
    "Paragraph 3 — what you are passionate about or currently learning."
  ],
  "engineering_values": [
    "I write clean, readable code over clever code",
    "I ship iteratively and improve continuously"
  ],
  "response_time": "Within 24–48 hours"
}
```

**How to update `about.json` later:**
> Edit `data/about.json` directly. The component reads from the JSON at build time. After saving the file, run `npm run dev` to see changes instantly in local development, or push to GitHub for the live site to update.

**UI elements:**
- Profile photo from `public/images/profile.jpg`
- Bio paragraphs rendered dynamically from the array
- Engineering values as styled pill/card list
- Social links (LinkedIn, GitHub, Email) with Lucide icons
- Location and availability as status badges

**Acceptance Criteria:** All fields from `about.json` render correctly. Updating the JSON immediately reflects in the UI.

---

### Task 2.4 — Skills Section

**File:** `components/sections/Skills.tsx`
**Data source:** `data/skills.json`

**Data schema:**
```json
{
  "categories": [
    {
      "name": "Languages",
      "skills": [
        { "name": "JavaScript", "icon": "devicon-javascript-plain", "level": "Confident" },
        { "name": "Python",     "icon": "devicon-python-plain",     "level": "Comfortable" },
        { "name": "TypeScript", "icon": "devicon-typescript-plain", "level": "Learning" }
      ]
    },
    {
      "name": "Frontend",
      "skills": [
        { "name": "React",   "icon": "devicon-react-original",   "level": "Confident" },
        { "name": "Next.js", "icon": "devicon-nextjs-plain",      "level": "Confident" }
      ]
    },
    {
      "name": "Currently Learning",
      "skills": [
        { "name": "Docker", "level": "Learning" }
      ]
    }
  ]
}
```

**How to add a new skill:**
> Open `data/skills.json`. Find the matching category (or add a new one), and add a new object `{ "name": "...", "icon": "devicon-...-plain", "level": "Confident|Comfortable|Learning" }` to the `skills` array. Save and refresh.

**UI elements:**
- Skill cards grouped by category
- Devicon CDN icons (loaded via `<link>` in layout) or Lucide fallback
- Proficiency badge: Confident = accent color, Comfortable = muted accent, Learning = outlined
- Hover animation: card lifts with Framer Motion
- Scroll-triggered entrance via Framer Motion `whileInView`

**Acceptance Criteria:** All categories and skills render from JSON. Proficiency levels are visually distinct.

---

### Task 2.5 — Education Section

**File:** `components/sections/Education.tsx`
**Data source:** `data/experience.json`

**Data schema:**
```json
{
  "education": [
    {
      "institution": "University Name",
      "degree": "BS Computer Science",
      "period": "2020–2024",
      "highlights": ["Dean's List 3 semesters", "Thesis: Real-time chat application"]
    }
  ],
  "certifications": [
    {
      "name": "Certificate Name",
      "issuer": "Issuing Organization",
      "date": "2024",
      "url": "https://credential-link.com"
    }
  ],
  "courses": [
    {
      "name": "Course Name",
      "provider": "Platform or University",
      "year": "2024"
    }
  ]
}
```

**How to add a new certification:**
> Open `data/experience.json`, find the `certifications` array, and add a new entry: `{ "name": "...", "issuer": "...", "date": "...", "url": "..." }`. Save and refresh.

**UI elements:**
- Timeline card layout for education entries
- Certification cards with external link icon (Lucide `ExternalLink`)
- Courses as a compact grid list
- Framer Motion scroll-triggered animations

**Acceptance Criteria:** Education, certifications, and courses render from `experience.json`.

---

### Task 2.6 — Contact Section + Formspree

**File:** `components/sections/Contact.tsx`
**Data source:** `data/about.json` (email, LinkedIn, GitHub) + your Formspree Form ID from Phase 0

Per architecture: *"Use Formspree directly from the frontend form. No backend needed. Free tier = 50 submissions/month."*

**Setting up Formspree in the component:**
```tsx
// Replace YOUR_FORM_ID with the code from Phase 0 Task 0.3
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
```

Or store it as an environment variable for cleanliness:
```bash
# .env.local
NEXT_PUBLIC_FORMSPREE_ID=your_form_id_here
```

**Form fields:**
- Name (required)
- Email (required, validated with Zod)
- Subject (required)
- Message (required, minimum 20 characters)

**UI elements:**
- Client-side Zod validation with inline error messages
- Submission via `fetch` to Formspree endpoint
- Success toast: "Message sent! I'll get back to you within 48 hours." (react-hot-toast)
- Error toast: "Something went wrong. Please try again." (react-hot-toast)
- Alternative contact methods: email link, LinkedIn, GitHub links from `about.json`
- Response time indicator badge from `about.json.response_time`

**Acceptance Criteria:** Form submits to Formspree successfully. Zod validates fields before submission. Toasts fire on success and error.

---

### Task 2.7 — Responsive Layout & Polish

- All sections fully responsive: mobile (< 640px), tablet (640–1024px), desktop (> 1024px)
- Consistent vertical spacing between sections (`py-24` or `py-32`)
- Scroll-to-top floating button (appears after scrolling 300px)
- All text uses only `text-text` / `text-muted` — zero hardcoded hex colors
- All backgrounds use only `bg-bg` / `bg-surface` — zero hardcoded hex colors
- Section `id` attributes: `hero`, `about`, `projects`, `skills`, `education`, `contact`

**Acceptance Criteria:** Site looks professional across all screen sizes. Lighthouse accessibility > 90.

---

### Phase 2 — Definition of Done
- [ ] NavBar with smooth scrolling and mobile hamburger menu
- [ ] All 6 homepage sections implemented and data-driven from JSON
- [ ] Formspree contact form working (test with a real submission)
- [ ] Fully responsive on mobile, tablet, and desktop
- [ ] Dark theme using design tokens only — zero hardcoded colors
- [ ] Framer Motion scroll-triggered animations on all sections
- [ ] `npm run build` succeeds (SSG)
- [ ] **🎉 Site is shareable — share the URL now!**

---

## Phase 3 — Projects System

**Sprint Goal:** Build the projects data model, filterable project cards on the homepage, and dynamic project detail pages at `/projects/[slug]`.

**Duration:** ~2 days

### User Stories
- *As a visitor*, I want to browse projects with filter tags.
- *As a visitor*, I want to click a project card and see full project details.
- *As a recruiter*, I want to see live demo and GitHub links instantly.

---

### Task 3.1 — Populate `data/projects.json`

**Exact schema (per architecture):**
```json
{
  "projects": [
    {
      "id": "project-slug",
      "title": "Project Title",
      "tagline": "One-line description shown on the card",
      "description": "Full description shown on the detail page. Can be multiple sentences.",
      "tech_stack": ["React", "Node.js", "PostgreSQL"],
      "features": [
        "Feature 1 — what the app can do",
        "Feature 2 — another capability"
      ],
      "challenges": [
        {
          "problem": "Describe what was technically difficult",
          "solution": "Describe exactly how you solved it"
        }
      ],
      "learnings": "Paragraph about what you took away from building this project.",
      "live_url": "https://your-project.vercel.app",
      "github_url": "https://github.com/yourname/project-name",
      "image": "/images/project-name-screenshot.png",
      "featured": true,
      "tags": ["Full-Stack", "React", "PostgreSQL"],
      "unavailable_reason": null
    }
  ]
}
```

> [!IMPORTANT]
> **`live_url` and `github_url` are optional.** If a project is a mobile app, desktop software, or a government/private system where you can't share the URL, set the field to `null` or omit it entirely. The UI will automatically hide the corresponding button.
>
> You can also set `"unavailable_reason"` to explain why (e.g., `"Government internal system"`, `"Mobile app — available on Google Play"`, `"Private repository"`).

**Examples of optional URL usage:**
```json
// Mobile app — no live web URL
"live_url": null,
"github_url": "https://github.com/yourname/app",
"unavailable_reason": "Mobile app — available on Google Play"

// Government project — no public URL, private repo
"live_url": null,
"github_url": null,
"unavailable_reason": "Government internal system — source code is confidential"
    }
  ]
}
```

Create **3 project entries**. At least 1 should have `"featured": true`.

**How to add a new project later:**
> Open `data/projects.json`, copy an existing project object, paste it at the end of the `projects` array (before the closing `]`), update all the fields with your new project's details, add a screenshot to `public/images/`, and set `"image"` to the correct path. Run `npm run build` to generate the new static page.

**Acceptance Criteria:** `projects.json` is valid JSON, contains 3 entries using the exact schema above.

---

### Task 3.2 — ProjectCard Component

**File:** `components/ProjectCard.tsx`

- Card shows: project image/screenshot, title, tagline, tech stack badges
- "Live Demo" button (Lucide `ExternalLink`) — **only shown if `live_url` is not null**
- "GitHub" button (Lucide `Github`) — **only shown if `github_url` is not null**
- If both URLs are null, show the `unavailable_reason` as a muted text badge instead
- `featured` badge overlay on image corner
- Card links to `/projects/[slug]` (the `id` field)
- Hover animation: `scale(1.02)` + elevated shadow using Framer Motion
- Framer Motion `whileInView` entrance animation

**Acceptance Criteria:** Cards render all project data correctly. Links open in new tab. Hover effect is smooth.

---

### Task 3.3 — Projects Section with Tag Filtering

**File:** `components/sections/Projects.tsx`

- Filter bar row above the cards: "All" | tag buttons (dynamically extracted from all project tags)
- Active filter shown in `bg-accent` color, inactive in `bg-surface` outlined
- Grid of ProjectCards filtered by the selected tag
- Featured projects shown first in the grid
- Responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop

**Acceptance Criteria:** Clicking a tag filters cards correctly. "All" shows all projects. Featured projects always appear first.

---

### Task 3.4 — Project Detail Page (SSG)

**File:** `app/projects/[slug]/page.tsx`

Per architecture: pages are statically generated at build time — no server involved at runtime.

```tsx
// Pre-builds a page for each project at compile time
export async function generateStaticParams() {
  const data = await import('@/data/projects.json')
  return data.projects.map((p) => ({ slug: p.id }))
}
```

**Page content:**
- Breadcrumb: Home → Projects → Project Title
- Full project description
- Tech stack badges
- Features list
- Challenges section: problem → solution pairs (styled distinctly)
- Learnings paragraph
- CTA buttons: "Live Demo" (primary, if `live_url` exists), "View on GitHub" (secondary, if `github_url` exists), "← Back to Projects" (text link)
- If URLs are unavailable, show the `unavailable_reason` in a styled info card explaining why

**Acceptance Criteria:** Each project has a working `/projects/[slug]` page. `npm run build` generates all pages statically. Navigation works.

---

### Phase 3 — Definition of Done
- [ ] `projects.json` populated with 3 real project entries
- [ ] ProjectCard component with hover effects and featured badge
- [ ] Projects section with working tag filter
- [ ] Project detail pages (SSG) at `/projects/[slug]`
- [ ] All project links verified (live demo and GitHub URLs)
- [ ] `npm run build` generates static pages for all 3 projects

---

## Phase 4 — Chatbot UI (Frontend Only)

**Sprint Goal:** Build the complete ChatWidget component — floating button, animated chat drawer, message thread — with a mock streaming response. No real AI yet; this validates the UI before wiring the backend.

**Duration:** ~2 days

### User Stories
- *As a visitor*, I want a floating chat button I can click to open a chat assistant.
- *As a visitor*, I want to type a message and see a response appear word by word.

---

### Task 4.1 — ChatWidget Component Structure

**File:** `components/ChatWidget.tsx`

Per architecture §Layer 4 — Chatbot Widget — use **exactly** this state shape:

```ts
type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}
```

```ts
const [isOpen, setIsOpen]       = useState(false)
const [messages, setMessages]   = useState<Message[]>([welcomeMessage])
const [input, setInput]         = useState('')
const [isLoading, setIsLoading] = useState(false)
```

**Welcome message:**
```ts
const welcomeMessage: Message = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm an AI assistant that knows all about [Your Name]'s background, projects, and skills. Ask me anything!",
  isStreaming: false,
}
```

**Acceptance Criteria:** State types match architecture exactly. Component file created and exported.

---

### Task 4.2 — Floating Chat Button

- Fixed position: `fixed bottom-6 right-6 z-50`
- Circular button, `bg-accent` (#6C63FF), with Lucide `MessageCircle` icon
- Pulse ring animation when closed (draws visitor attention)
- Click toggles `isOpen` state
- Framer Motion: `whileHover={{ scale: 1.1 }}`, `whileTap={{ scale: 0.95 }}`

**Acceptance Criteria:** Button is visible on every page. Pulse animation plays. Click opens/closes the drawer.

---

### Task 4.3 — Chat Drawer

- Mobile: full-screen overlay, slides up from bottom
- Desktop: fixed right panel, `w-96`, slides in from right
- `bg-surface` background, `border-l border-white/5` (desktop), rounded top corners (mobile)
- Header bar: "Chat with AI" title + Lucide `X` close button
- Scrollable message thread in the middle
- Input row at the bottom: text input + Lucide `Send` button
- Framer Motion `AnimatePresence` for smooth mount/unmount transitions

**Acceptance Criteria:** Drawer opens and closes with smooth animation on both mobile and desktop.

---

### Task 4.4 — Message Thread UI

- User messages: right-aligned bubbles, `bg-accent` background
- Assistant messages: left-aligned bubbles, `bg-bg` background with subtle border
- Auto-scroll to the latest message on each new message
- Typing indicator: three bouncing dots (Framer Motion) when `isLoading === true`
- Streaming cursor: blinking `|` appended to the last assistant message when `isStreaming === true`
- Timestamps below each message (e.g., "2:34 PM")

**Acceptance Criteria:** Message bubbles display with correct alignment, colors, and animations.

---

### Task 4.5 — Lazy Loading in Layout

Per architecture §Rendering strategy — the chatbot must never block the initial page load:

```tsx
// app/layout.tsx
import dynamic from 'next/dynamic'

const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false, // client-only: uses browser state (useState, useEffect)
})
```

**Acceptance Criteria:** ChatWidget code does not appear in the server-rendered HTML. It loads separately after the page is interactive.

---

### Task 4.6 — Mock Streaming (Temporary)

Wire up `sendMessage()` to produce a fake streaming response, so the full UI can be tested before the API is ready:

```ts
async function sendMessage(text: string) {
  // Add user message
  // Add empty assistant message with isStreaming: true
  // Simulate streaming character by character (setTimeout loop)
  // Set isStreaming: false when done
}
```

**Acceptance Criteria:** Typing a message shows a mock response appearing one character at a time. Will be replaced by the real API in Phase 5.

---

### Phase 4 — Definition of Done
- [ ] ChatWidget component complete with all sub-elements
- [ ] Floating button with pulse animation
- [ ] Drawer with smooth open/close transitions (mobile + desktop)
- [ ] Message thread with user/assistant bubbles, typing indicator, streaming cursor
- [ ] Mock streaming response working end-to-end
- [ ] Lazy-loaded in layout (no SSR, does not affect page load)
- [ ] **🎉 Chatbot opens, closes, and simulates a real conversation**

---

## Phase 5 — Chatbot AI Backend

**Sprint Goal:** Connect the chatbot to Google Gemini API with your full portfolio context, real SSE streaming, and rate limiting. The chatbot now answers real questions about you accurately.

**Duration:** ~2 days

### User Stories
- *As a visitor*, I want to ask the chatbot questions about the developer and get accurate, streaming answers.
- *As the developer*, I want rate limiting so no one abuses my free API quota.

---

### Task 5.1 — Prepare CV Context (`data/cv.txt`)

The chatbot reads this file as part of its knowledge base. Create it by extracting text from your PDF resume:

**Option A — Python (recommended):**
```bash
pip install pdfplumber
python -c "
import pdfplumber
with pdfplumber.open('public/resume.pdf') as pdf:
    text = '\n'.join(p.extract_text() for p in pdf.pages if p.extract_text())
    open('data/cv.txt', 'w').write(text)
"
```

**Option B — Manual:**
> Open your resume PDF, select all text, copy, and paste into `data/cv.txt`. Clean up any formatting artifacts.

**How to update `cv.txt` later:**
> Whenever you update your PDF resume, re-run the extraction command above (or manually update `data/cv.txt`). The chatbot will use the updated content on the next deployment.

**Acceptance Criteria:** `data/cv.txt` contains your full resume as readable plain text.

---

### Task 5.2 — Chat API Route

**File:** `app/api/chat/route.ts`

Implement **exactly** as specified in [architecture §Layer 3](file:///c:/projects/my-portfolio/SYSTEM_ARCHITECTURE.md#L257-L362):

```ts
export const runtime = 'nodejs' // nodejs (not edge) for fs access

// Load context once at module level (cached between warm invocations)
function loadContext(): string {
  const cv       = fs.readFileSync(path.join(dataDir, 'cv.txt'), 'utf-8')
  const projects = JSON.stringify(JSON.parse(fs.readFileSync(path.join(dataDir, 'projects.json'), 'utf-8')), null, 2)
  const skills   = JSON.stringify(JSON.parse(fs.readFileSync(path.join(dataDir, 'skills.json'), 'utf-8')), null, 2)
  const about    = JSON.stringify(JSON.parse(fs.readFileSync(path.join(dataDir, 'about.json'), 'utf-8')), null, 2)
  return `--- CV ---\n${cv}\n\n--- PROJECTS ---\n${projects}\n\n--- SKILLS ---\n${skills}\n\n--- ABOUT ---\n${about}`
}
```

**System prompt (use verbatim):**
```
You are a friendly, professional AI assistant for a software engineer's portfolio.
Answer questions about the portfolio owner using ONLY the information provided below.
If you cannot answer from the context, say so clearly and suggest emailing them directly.
Keep answers concise (2–4 sentences) unless asked for detail.
Refer to the portfolio owner in third person. Never make up information.
```

**Rate limiter (per architecture):**
```ts
// Max 10 requests per IP per 60 seconds (in-memory)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
function isRateLimited(ip: string): boolean { ... }
```

**Response:** SSE stream format:
```
data: {"delta": "token text here"}\n\n
data: [DONE]\n\n
```

**Security checklist (per architecture):**
- `GEMINI_API_KEY` only accessed in this server-side route — never in any client component
- User message HTML is stripped before being added to the prompt
- Rate limiting blocks IPs exceeding 10 req/min

**Acceptance Criteria:** `POST /api/chat` returns a streaming SSE response. Rate limiter returns HTTP 429 after 10 rapid requests from the same IP.

---

### Task 5.3 — Connect ChatWidget to Real API

Replace the mock streaming from Phase 4 with the real `fetch('/api/chat')` call, implemented **exactly** per [architecture §How streaming works](file:///c:/projects/my-portfolio/SYSTEM_ARCHITECTURE.md#L397-L439):

1. Add user message to state immediately
2. Add empty assistant message with `isStreaming: true`
3. `POST /api/chat` with full message history
4. Read SSE stream via `ReadableStream` reader
5. Parse `data: {"delta": "..."}` lines, append each delta to the assistant message content
6. On `data: [DONE]`, set `isStreaming: false`

**Error handling:**
- HTTP 429 → toast: *"You're sending messages too fast. Please wait a minute."*
- HTTP 500 / network error → toast: *"Something went wrong. Please try again."*
- Use `react-hot-toast` for all error toasts

**Acceptance Criteria:** Chatbot answers questions about you accurately using real Gemini responses, streaming word by word.

---

### Task 5.4 — Verify API Key Works

Before deploying, test the API route locally:
1. Ensure `GEMINI_API_KEY` is set in `.env.local` (from Phase 0)
2. Run `npm run dev`
3. Open the chatbot and ask: *"What projects has [your name] built?"*
4. Verify a real streaming answer appears

**Acceptance Criteria:** Chatbot answers correctly using your real portfolio data from the JSON files and `cv.txt`.

---

### Phase 5 — Definition of Done
- [ ] `data/cv.txt` populated with full resume text
- [ ] `/api/chat` route implemented exactly per architecture
- [ ] Gemini `gemini-1.5-flash` model integration working
- [ ] SSE streaming working end-to-end
- [ ] Rate limiting: 10 req/IP/min, returns 429
- [ ] ChatWidget connected to real API (mock removed)
- [ ] Error handling for rate limits and network failures
- [ ] Security checklist: no key in client code, HTML stripped
- [ ] **🎉 Chatbot answers questions about you accurately**

---

## Phase 6 — Polish, SEO & Deployment

**Sprint Goal:** Audit performance and accessibility, configure SEO, deploy to production on Vercel with a custom domain, and set up uptime monitoring.

**Duration:** ~1–2 days

---

### Task 6.1 — Lighthouse Audit

Per architecture: *"Lighthouse audit (target >90)"*

Run Lighthouse in Chrome DevTools (right-click → Inspect → Lighthouse tab) or via CLI:
```bash
npx lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html
```

Target scores > 90 in all 4 categories:
- ✅ Performance
- ✅ Accessibility
- ✅ Best Practices
- ✅ SEO

**Common fixes:** lazy-load offscreen images, add `alt` attributes, fix color contrast.

**Acceptance Criteria:** All Lighthouse scores > 90.

---

### Task 6.2 — Accessibility Audit

- Keyboard navigation: Tab through all interactive elements (NavBar, buttons, form, chatbot)
- ARIA labels: chatbot button (`aria-label="Open chat"`), drawer (`role="dialog"`), form inputs
- Focus trap: when chatbot drawer is open, Tab should cycle only within the drawer
- Color contrast: verify `--color-muted` on `--color-bg` passes WCAG AA (4.5:1 ratio)
- Skip-to-content link at top of layout for screen readers

**Acceptance Criteria:** WCAG 2.1 AA compliance. Tab navigation works logically throughout.

---

### Task 6.3 — SEO & Meta Tags

Configure for each page using Next.js `generateMetadata()`:

```tsx
export const metadata = {
  title: 'Your Name — Software Engineer Portfolio',
  description: 'Portfolio of [Name]. Building full-stack applications with React, Next.js, and Node.js.',
  openGraph: {
    title: 'Your Name — Software Engineer',
    description: '...',
    url: 'https://yourname.dev',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}
```

**Additional SEO tasks:**
- Create `public/robots.txt`
- Create XML sitemap (use `next-sitemap` package or create manually)
- Add JSON-LD Person structured data in layout
- Canonical URLs on each page

**Acceptance Criteria:** Sharing the site URL on LinkedIn/X shows the correct OG image and title preview.

---

### Task 6.4 — Final Content Review

- Review all JSON data files for accuracy (name, email, links, dates)
- Verify all project live demo and GitHub links open correctly
- Check all images load (profile photo, project screenshots)
- Test contact form: submit a real message and verify it arrives in your email
- Chatbot QA — ask these questions and verify accuracy:
  - *"What projects have you built?"*
  - *"What is your tech stack?"*
  - *"Are you available for hire?"*
  - *"How can I contact you?"*
  - *"Tell me about your education."*

**Acceptance Criteria:** All content is accurate. All links work. All features functional.

---

### Task 6.5 — Deploy to Vercel

**Step-by-step deployment guide:**

1. **Push final code to GitHub:**
   ```bash
   git add .
   git commit -m "production-ready"
   git push origin main
   ```

2. **Import project in Vercel:**
   - Go to [https://vercel.com/new](https://vercel.com/new)
   - Click **"Add New Project"** → **"Import Git Repository"**
   - Select your `portfolio` GitHub repo
   - Framework: Next.js (auto-detected)
   - Click **"Deploy"**

3. **Add Environment Variables in Vercel:**
   - Go to Project → **Settings** → **Environment Variables**
   - Add these variables (same as your `.env.local`):
     ```
     GEMINI_API_KEY         = AIzaSy...
     CONTACT_EMAIL          = you@gmail.com
     NEXT_PUBLIC_SITE_URL   = https://yourname.dev
     NEXT_PUBLIC_FORMSPREE_ID = your_form_id
     ```
   - Click **"Save"** then **"Redeploy"**

4. **Connect custom domain (optional):**
   - Go to Project → **Settings** → **Domains**
   - Add `yourname.dev`
   - Vercel shows the DNS records to set in Namecheap:
     - Add an `A` record pointing to `76.76.21.21`
     - Add a `CNAME` record for `www` pointing to `cname.vercel-dns.com`
   - DNS propagation takes 5–30 minutes

> [!NOTE]
> **CI/CD is automatic after deployment.** Every `git push` to `main` triggers a Vercel build. Every push to a feature branch creates a preview URL at `yourname.vercel.app/preview/...` — use these to test before merging.

**Acceptance Criteria:** Site live at `yourname.dev`. Chatbot works on the production URL. All environment variables set.

---

### Task 6.6 — Monitoring Setup

Per architecture: UptimeRobot free tier.

1. Go to [https://uptimerobot.com](https://uptimerobot.com) and create a free account
2. Click **"Add New Monitor"**
3. Type: **HTTP(S)**
4. URL: `https://yourname.dev`
5. Check interval: **5 minutes** (free tier)
6. Alert contact: your email
7. (Optional) Add a second monitor for `https://yourname.dev/api/health`

**Acceptance Criteria:** UptimeRobot sends a test alert. Monitor shows green/up status.

---

### Task 6.7 — Performance Optimizations

- All images use Next.js `<Image>` component with explicit `width` and `height`
- Font optimization: `display: 'swap'` on all `next/font/google` imports (already in Task 1.4)
- Bundle check: ChatWidget must be in its own chunk (lazy-loaded in layout)
- Verify Vercel CDN headers on static pages: look for `x-vercel-cache: HIT` in browser Network tab

**Acceptance Criteria:** Initial page load < 200ms from CDN (check with `https://www.webpagetest.org`).

---

### Phase 6 — Definition of Done
- [ ] Lighthouse > 90 on all pages and all categories
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] SEO metadata, OG images, sitemap, robots.txt configured
- [ ] All content reviewed and verified accurate
- [ ] Contact form tested with a real submission
- [ ] Site deployed to Vercel and live at production URL
- [ ] Environment variables configured in Vercel dashboard
- [ ] UptimeRobot monitoring active
- [ ] **🎉 Portfolio is production-ready and live!**

---

## Verification Plan

### Automated
```bash
npm run build     # Verify SSG builds without errors
npm run lint      # Check for TypeScript/ESLint issues
```

### Manual
- Visual review on mobile (375px), tablet (768px), desktop (1280px)
- Test chatbot with 10+ questions covering projects, skills, availability, contact
- Submit contact form → verify email received
- Verify all project links (live demo + GitHub)
- Share URL on social media → verify OG preview card renders correctly
- Test rate limiter: send 11+ rapid chatbot messages → verify 429 error toast appears

---

## Summary — All Phases at a Glance

| Phase | Duration | Deliverable | Shippable? |
|---|---|---|---|
| **0 — Pre-Setup** | ~2 hrs | GitHub repo, Gemini key, Formspree account, Vercel account | ❌ (setup only) |
| **1 — Foundation** | ~1 day | Deps installed, design tokens, folder structure, fonts | ❌ (blank dark page) |
| **2 — Pages** | ~3–4 days | Full portfolio homepage with all 6 sections | ✅ **Shareable now** |
| **3 — Projects** | ~2 days | Filterable project cards + detail pages | ✅ |
| **4 — Chatbot UI** | ~2 days | Chat widget with mock streaming | ✅ |
| **5 — Chatbot AI** | ~2 days | Full Gemini-powered chatbot | ✅ |
| **6 — Polish & Deploy** | ~1–2 days | Lighthouse > 90, SEO, live on Vercel | ✅ **Production-ready** |

**Total estimated duration: ~11–13 days**
