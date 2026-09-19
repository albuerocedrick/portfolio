import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'

const dataDir = path.join(process.cwd(), 'data')

function loadContext(): string {
  let cv = '';
  try { cv = fs.readFileSync(path.join(dataDir, 'cv.txt'), 'utf-8'); } catch (e) {}
  
  let projects = '[]';
  try { projects = JSON.stringify(JSON.parse(fs.readFileSync(path.join(dataDir, 'projects.json'), 'utf-8')), null, 2); } catch (e) {}
  
  let skills = '[]';
  try { skills = JSON.stringify(JSON.parse(fs.readFileSync(path.join(dataDir, 'skills.json'), 'utf-8')), null, 2); } catch (e) {}
  
  let about = '{}';
  try { about = JSON.stringify(JSON.parse(fs.readFileSync(path.join(dataDir, 'about.json'), 'utf-8')), null, 2); } catch (e) {}

  return `--- CV ---\n${cv}\n\n--- PROJECTS ---\n${projects}\n\n--- SKILLS ---\n${skills}\n\n--- ABOUT ---\n${about}`
}

const SYSTEM_PROMPT = `You are a friendly, professional AI assistant for a software engineer's portfolio.
Answer questions about the portfolio owner using ONLY the information provided below.
If you cannot answer from the context, say so clearly and suggest emailing them directly.
Keep answers concise (2–4 sentences) unless asked for detail.
Refer to the portfolio owner in third person. Never make up information.
DO NOT use Markdown formatting (like **bold** or *italics*). Return plain text only.

${loadContext()}`

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

  const recentMessages = messages.slice(-10)

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
  const model = genAI.getGenerativeModel({
    model: 'gemini-flash-latest',
    systemInstruction: SYSTEM_PROMPT,
  })

  let history = recentMessages.slice(0, -1).map((m: { role: string; content: string }) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  while (history.length > 0 && history[0].role === 'model') {
    history.shift();
  }

  const chat = model.startChat({
    history: history,
  })

  const lastMessage = recentMessages[recentMessages.length - 1].content
  
  try {
    const result = await chat.sendMessageStream(lastMessage)

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
  } catch (error) {
    console.error('Gemini API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
  }
}
