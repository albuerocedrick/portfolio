import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-code',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cedrickalbuero.vercel.app"),
  title: "Cedrick Albuero — Software Engineer",
  description: "Portfolio of Cedrick Albuero, an IT student and aspiring software engineer specializing in full-stack web development and AI integration.",
  keywords: [
    "Cedrick Albuero",
    "Software Engineer",
    "Full-Stack Developer",
    "Web Development",
    "Mobile Development",
    "AI Integration",
    "React",
    "Next.js",
    "Philippines"
  ],
  authors: [{ name: "Cedrick Albuero", url: "https://github.com/albuerocedrick" }],
  creator: "Cedrick Albuero",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cedrickalbuero.vercel.app",
    title: "Cedrick Albuero — Software Engineer",
    description: "Portfolio of Cedrick Albuero, an IT student and aspiring software engineer specializing in full-stack web development and AI integration.",
    siteName: "Cedrick Albuero Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Cedrick Albuero Portfolio Preview",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cedrick Albuero — Software Engineer",
    description: "Portfolio of Cedrick Albuero, an IT student and aspiring software engineer specializing in full-stack web development and AI integration.",
    creator: "@cedrickalbuero",
    images: ["/opengraph-image.png"],
  },
};

import dynamic from "next/dynamic";
import { NavBar } from "@/components/NavBar";
import { Toaster } from "react-hot-toast";

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop").then(mod => mod.ScrollToTop));
const ChatWidget = dynamic(() => import("@/components/ChatWidget"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'light' || t === 'dark') {
                    document.documentElement.dataset.theme = t;
                  } else {
                    document.documentElement.dataset.theme =
                      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-bg text-text font-body antialiased min-h-full flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-surface focus:text-text focus:font-bold focus:rounded-md">
          Skip to content
        </a>
        <NavBar />
        {children}
        <ScrollToTop />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-divider)',
            },
          }}
        />
        <ChatWidget />
      </body>
    </html>
  );
}
