# System Architecture
## Software Engineer Portfolio + AI Chatbot
**Stack: Next.js · Tailwind CSS · Vercel · Google Gemini API (Free Tier)**

---

## Quick Reference

| Layer | Technology | Cost |
|---|---|---|
| Frontend | Next.js 14+ (App Router) + Tailwind CSS | Free |
| Hosting + Serverless | Vercel Hobby Plan | Free |
| AI (Chatbot) | Google Gemini API (`gemini-1.5-flash`) | Free tier |
| Contact Form | Formspree | Free tier |
| Monitoring | UptimeRobot | Free tier |
| Domain | Namecheap `.dev` | ~$15/yr |

**Total monthly cost: $0** (excluding domain, billed annually)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      VISITOR'S BROWSER                  │
│                                                         │
│   Portfolio Pages (SSG)        Chatbot Widget (CSR)     │
│   /  /projects/[slug]          Floating button + drawer │
└────────────────┬───────────────────────┬────────────────┘
                 │  Static HTML/CSS/JS   │  POST /api/chat
                 ▼                       ▼
┌─────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                  │
│                                                         │
│  CDN (Static Pages)        Edge Functions (API Routes)  │
│  Serves pre-built HTML     /api/chat  /api/contact      │
│  globally from 100+ PoPs   /api/health                  │
└────────────────────────────────────────┬────────────────┘
                                         │  GEMINI_API_KEY
                                         ▼  (server-side only)
                          ┌──────────────────────────┐
                          │   Google Gemini API      │
                          │   gemini-1.5-flash       │
                          │   (Free tier)            │
                          └──────────────────────────┘
```

---

## Folder Structure

This is the single source of truth for where everything lives. Build this layout on day one and never deviate.

```
portfolio/
│
├── app/                         # Next.js App Router — all pages and API routes live here
│   ├── page.tsx                 # Home page (Hero + About + Projects + Skills + Education + Contact)
│   ├── layout.tsx               # Root layout: NavBar, ChatWidget, fonts, metadata
│   ├── globals.css              # Tailwind base + CSS design tokens
│   │
│   ├── projects/
│   │   └── [slug]/page.tsx      # Project detail page (dynamic, SSG)
│   │
│   └── api/
│       ├── chat/route.ts        # POST /api/chat — Gemini integration (Edge Runtime)
│       └── contact/route.ts     # POST /api/contact — contact form handler
│
├── components/
│   ├── ChatWidget.tsx           # Floating button + chat drawer (entire chatbot UI)
│   ├── NavBar.tsx               # Top navigation bar
│   └── sections/                # One file per homepage section
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Projects.tsx
│       ├── Skills.tsx
│       ├── Education.tsx
│       └── Contact.tsx
│
├── data/                        # All content lives here — edit these, never touch components
│   ├── projects.json            # Project data (title, stack, links, challenges, learnings)
│   ├── skills.json              # Skills by category with proficiency levels
│   ├── about.json               # Bio, availability, social links, personal details
│   ├── experience.json          # Education, courses, certifications, timeline
│   └── cv.txt                   # Plain text extracted from your PDF resume (for chatbot context)
│
├── public/
│   ├── resume.pdf               # Downloadable CV
│   └── images/                  # Profile photo, project screenshots
│
├── .env.local                   # Local secrets — NEVER commit this file
├── .env.example                 # Committed template (values blank)
├── next.config.ts               # Next.js config
└── tailwind.config.ts           # Design tokens (colors, fonts, spacing)
```

---

## Layer 1 — Frontend (Next.js + Tailwind)

### Rendering strategy

Every portfolio page is **statically generated (SSG)** at build time. This means Vercel pre-builds pure HTML and serves it from a CDN edge node closest to the visitor — no server involved, sub-200ms load times globally.

The **chatbot widget** is the only client-side-rendered piece. It is lazy-loaded with `next/dynamic` so it never blocks the initial page paint.

```ts
// app/layout.tsx — lazy load chatbot so it never blocks page load
import dynamic from 'next/dynamic'

const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,  // client-only: uses browser state
})
```

### Design tokens

Set these once in `tailwind.config.ts` and use them everywhere. Never hardcode hex values in components.

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      bg:      '#0A0A0F',   // page background
      surface: '#13131A',   // cards, nav, chatbot panel
      text:    '#E8E8F0',   // primary body text
      muted:   '#6B7280',   // secondary text, placeholders
      accent:  '#6C63FF',   // CTAs, links, chatbot button
    },
    fontFamily: {
      heading: ['Space Grotesk', 'sans-serif'],
      body:    ['Inter', 'sans-serif'],
      code:    ['JetBrains Mono', 'monospace'],
    },
  },
}
```

### Homepage sections (build in this order)

Build the homepage as one page with scroll-anchor sections. This avoids over-engineering multiple pages before you have content.

| Order | Section | Component | Data source |
|---|---|---|---|
| 1 | Hero | `sections/Hero.tsx` | Hardcoded (name, title, CTA) |
| 2 | About | `sections/About.tsx` | `about.json` |
| 3 | Projects | `sections/Projects.tsx` | `projects.json` |
| 4 | Skills | `sections/Skills.tsx` | `skills.json` |
| 5 | Education | `sections/Education.tsx` | `experience.json` |
| 6 | Contact | `sections/Contact.tsx` | `about.json` + Formspree |

---

## Layer 2 — Content / Data

All content lives in `data/` as JSON files. To update your portfolio, edit the JSON — never touch the React components.

### `data/projects.json` — shape

```json
{
  "projects": [
    {
      "id": "budget-buddy",
      "title": "BudgetBuddy",
      "tagline": "Personal finance tracker for students",
      "description": "Full description shown on detail page...",
      "tech_stack": ["React", "Node.js", "PostgreSQL"],
      "features": ["Feature 1", "Feature 2"],
      "challenges": [
        { "problem": "What was hard", "solution": "How I solved it" }
      ],
      "learnings": "What I took away from building this...",
      "live_url": "https://budget-buddy.vercel.app",
      "github_url": "https://github.com/yourname/budget-buddy",
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

### `data/skills.json` — shape

```json
{
  "categories": [
    {
      "name": "Languages",
      "skills": [
        { "name": "JavaScript", "icon": "devicon-javascript-plain", "level": "Confident" },
        { "name": "Python",     "icon": "devicon-python-plain",     "level": "Comfortable" }
      ]
    },
    {
      "name": "Currently Learning",
      "skills": [
        { "name": "TypeScript", "level": "Learning" }
      ]
    }
  ]
}
```

### `data/about.json` — shape

```json
{
  "name": "Your Name",
  "title": "Junior Full-Stack Developer",
  "location": "Quezon City, Philippines",
  "availability": "Open to full-time roles — remote, hybrid, or on-site",
  "email": "you@gmail.com",
  "linkedin": "https://linkedin.com/in/yourname",
  "github": "https://github.com/yourname",
  "bio_paragraphs": ["Paragraph 1...", "Paragraph 2...", "Paragraph 3..."],
  "engineering_values": ["I write clean, readable code over clever code"],
  "response_time": "Within 24–48 hours"
}
```

### `data/cv.txt` — how to create it

Run this once after updating your PDF resume. The output file is what the chatbot reads.

```bash
# Option A — Python (install once)
pip install pdfplumber
python -c "
import pdfplumber
with pdfplumber.open('public/resume.pdf') as pdf:
    text = '\n'.join(p.extract_text() for p in pdf.pages if p.extract_text())
    open('data/cv.txt', 'w').write(text)
"

# Option B — Node.js
npm install pdf-parse
node -e "
const fs = require('fs');
const pdf = require('pdf-parse');
pdf(fs.readFileSync('public/resume.pdf')).then(d => fs.writeFileSync('data/cv.txt', d.text));
"
```

---

## Layer 3 — Serverless API (Vercel Edge Functions)

These are the two API routes. They run on Vercel's Edge Runtime — no server to manage.

### `app/api/chat/route.ts` — Gemini integration

This is the most important file. The browser sends a message here, this function builds a prompt with all your portfolio context, calls Gemini, and streams the response back.

```ts
// app/api/chat/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'  // Use nodejs (not edge) for fs access

// Load all context files once at module load (cached between warm invocations)
const dataDir = path.join(process.cwd(), 'data')

function loadContext(): string {
  const cv       = fs.readFileSync(path.join(dataDir, 'cv.txt'), 'utf-8')
  const projects = JSON.stringify(JSON.parse(fs.readFileSync(path.join(dataDir, 'projects.json'), 'utf-8')), null, 2)
  const skills   = JSON.stringify(JSON.parse(fs.readFileSync(path.join(dataDir, 'skills.json'), 'utf-8')), null, 2)
  const about    = JSON.stringify(JSON.parse(fs.readFileSync(path.join(dataDir, 'about.json'), 'utf-8')), null, 2)

  return `--- CV ---\n${cv}\n\n--- PROJECTS ---\n${projects}\n\n--- SKILLS ---\n${skills}\n\n--- ABOUT ---\n${about}`
}

const SYSTEM_PROMPT = `You are a friendly, professional AI assistant for a software engineer's portfolio.
Answer questions about the portfolio owner using ONLY the information provided below.
If you cannot answer from the context, say so clearly and suggest emailing them directly.
Keep answers concise (2–4 sentences) unless asked for detail.
Refer to the portfolio owner in third person. Never make up information.

${loadContext()}`

// Simple in-memory rate limiter (per deployment instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return false
  }
  if (entry.count >= 10) return true
  entry.count++
  return false
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
    })
  }

  const { messages } = await req.json()
  if (!messages?.length) {
    return new Response(JSON.stringify({ error: 'No messages provided' }), { status: 400 })
  }

  // Keep only the last 10 messages to control context size
  const recentMessages = messages.slice(-10)

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: SYSTEM_PROMPT,
  })

  const chat = model.startChat({
    history: recentMessages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
  })

  const lastMessage = recentMessages[recentMessages.length - 1].content
  const result = await chat.sendMessageStream(lastMessage)

  // Stream the response back as plain text chunks
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text()
        if (text) controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ delta: text })}\n\n`))
      }
      controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
```

### `app/api/contact/route.ts` — contact form

Use Formspree on the frontend instead for zero backend complexity. This route is only needed if you want server-side email logic.

```ts
// Simplest option: use Formspree directly from the frontend form
// <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
//   No backend needed. Free tier = 50 submissions/month.
```

---

## Layer 4 — Chatbot Widget (Frontend)

The entire chatbot UI lives in one component. Keep it self-contained.

### State the widget manages

```ts
type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

// ChatWidget.tsx internal state
const [isOpen, setIsOpen]       = useState(false)
const [messages, setMessages]   = useState<Message[]>([welcomeMessage])
const [input, setInput]         = useState('')
const [isLoading, setIsLoading] = useState(false)
```

### How streaming works (simplified)

```ts
async function sendMessage(text: string) {
  // 1. Add user message immediately
  setMessages(prev => [...prev, { id: uuid(), role: 'user', content: text }])

  // 2. Add empty assistant message (will stream into it)
  const assistantId = uuid()
  setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '', isStreaming: true }])

  // 3. Call the API and read the stream
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [...messages, { role: 'user', content: text }] }),
  })

  const reader = res.body!.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const lines = decoder.decode(value).split('\n').filter(l => l.startsWith('data: '))
    for (const line of lines) {
      const data = line.replace('data: ', '')
      if (data === '[DONE]') break
      const { delta } = JSON.parse(data)
      // 4. Append each token to the assistant message
      setMessages(prev => prev.map(m =>
        m.id === assistantId ? { ...m, content: m.content + delta } : m
      ))
    }
  }

  // 5. Mark streaming done
  setMessages(prev => prev.map(m =>
    m.id === assistantId ? { ...m, isStreaming: false } : m
  ))
}
```

---

## Environment Variables

Create `.env.local` locally. Add the same variables in **Vercel → Project Settings → Environment Variables**.

```bash
# .env.local — never commit this file

GEMINI_API_KEY=your_google_ai_studio_key_here
CONTACT_EMAIL=you@gmail.com
NEXT_PUBLIC_SITE_URL=https://yourname.dev
RATE_LIMIT_KV_URL=          # optional — only needed if using Vercel KV for rate limiting
```

```bash
# .env.example — commit this file (values intentionally blank)

GEMINI_API_KEY=
CONTACT_EMAIL=
NEXT_PUBLIC_SITE_URL=
RATE_LIMIT_KV_URL=
```

> **How to get your Gemini API key:** Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) → Create API key. Free tier gives 15 requests/min and 1 million tokens/day on `gemini-1.5-flash` — more than enough for a portfolio chatbot.

---

## Request Flow — Chatbot Message (End to End)

```
Visitor types "What projects did you build?"
        │
        ▼
ChatWidget.tsx
  sendMessage() called
  POST /api/chat  →  { messages: [...], sessionId: "abc" }
        │
        ▼
Vercel Edge Function  (app/api/chat/route.ts)
  1. Check IP rate limit  →  pass (< 10 req/min)
  2. Parse request body
  3. Load portfolio context (cv.txt, projects.json, skills.json, about.json)
  4. Build system prompt  =  INSTRUCTIONS + context
  5. Keep last 10 messages only
  6. Call Gemini API  →  chat.sendMessageStream(userMessage)
        │
        ▼
Google Gemini API  (gemini-1.5-flash, free tier)
  Streams response tokens back
        │
        ▼
Edge Function
  Re-streams tokens as SSE:  data: {"delta": "I have built..."}
        │
        ▼
ChatWidget.tsx
  Reads SSE stream token by token
  Appends each token to the assistant message in state
  UI updates in real time (streaming effect)
        │
        ▼
Visitor sees answer appearing word by word ✓
```

---

## CI/CD Pipeline

No configuration needed. Vercel handles everything automatically.

```
You push code to GitHub
        │
        ├── push to feature branch
        │         ▼
        │   Vercel builds a Preview URL
        │   (yourname.vercel.app/preview/abc123)
        │   Test the chatbot here before merging
        │
        └── merge to main branch
                  ▼
            Vercel builds Production
            yourname.dev is updated
            Build time: ~30–60 seconds
```

---

## Development Build Order

Build in this exact order. Each phase produces something shippable — you can share the URL after Phase 2 even without a chatbot.

| Phase | What to build | Done when |
|---|---|---|
| **1 — Setup** | `npx create-next-app`, Tailwind config, design tokens, GitHub repo, Vercel connected to repo, domain DNS pointed at Vercel | Empty site live at `yourname.dev` |
| **2 — Pages** | NavBar, Hero, About, Skills, Education, Contact sections, dark theme, responsive layout, Formspree contact form | Full portfolio site live — shareable now |
| **3 — Projects** | `projects.json` data model, ProjectCard component, project filter tags, project detail page `/projects/[slug]` | Projects section complete with 3 entries |
| **4 — Chatbot UI** | ChatWidget component, floating button, chat drawer, message thread, streaming UI, Framer Motion animations | Chatbot opens and closes (no AI yet) |
| **5 — Chatbot AI** | `cv.txt` extraction, `/api/chat` route, Gemini integration, SSE streaming, rate limiting, GEMINI_API_KEY in Vercel | Chatbot answers questions about you |
| **6 — Polish** | Lighthouse audit (target >90), accessibility check, OG images, sitemap, final content review | Production-ready |

---

## Key Dependencies

Install everything at the start of Phase 1. Nothing here is experimental.

```bash
# Core
npm install next@latest react react-dom

# Styling & animation
npm install tailwindcss framer-motion lucide-react

# AI
npm install @google/generative-ai

# Utilities
npm install zod uuid pdf-parse react-hot-toast

# Dev
npm install -D @types/node @types/react typescript
```

---

## Security Checklist

- `GEMINI_API_KEY` stored only in Vercel Environment Variables — never in client code, never prefixed with `NEXT_PUBLIC_`
- `.env.local` in `.gitignore`
- All chatbot traffic routes through `/api/chat` — browser never calls Gemini directly
- IP-based rate limiting: max 10 requests per IP per 60 seconds
- User messages stripped of HTML before being included in the prompt
- Formspree handles contact form — no email credentials in your code
- Vercel enforces HTTPS on all deployments automatically

---

## Free Tier Limits Reference

| Service | Free limit | What happens if exceeded |
|---|---|---|
| Vercel Hobby | 100GB bandwidth/mo, 100 serverless function hours/mo | Site stays up; you get an email |
| Gemini 1.5 Flash | 15 req/min, 1M tokens/day, 1500 req/day | API returns 429; chatbot shows error message |
| Formspree | 50 form submissions/month | Form submissions stop until next month |
| UptimeRobot | 50 monitors, 5-min check interval | Free forever |

For a personal portfolio with low traffic, none of these limits will be hit in normal use.

---

*Architecture document for Portfolio SDD v1.0 — June 2026*
