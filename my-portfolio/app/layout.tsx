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
  title: "Cedrick Albuero — Software Engineer",
  description: "Portfolio of Cedrick Albuero, a software engineer specializing in full-stack web development and AI integration.",
};

import { NavBar } from "@/components/NavBar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="bg-bg text-text font-body antialiased min-h-full flex flex-col">
        <NavBar />
        {children}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#13131A',
              color: '#E8E8F0',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        />
        {/* TODO: Add ChatWidget Component */}
      </body>
    </html>
  );
}
