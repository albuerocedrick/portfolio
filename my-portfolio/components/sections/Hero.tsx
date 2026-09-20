"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const subtleBackgroundElements = (
  <>
    <div className="absolute inset-0 bg-accent/10 dark:bg-accent/5 pointer-events-none" />
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 dark:bg-accent/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 dark:bg-accent/5 rounded-full blur-3xl pointer-events-none" />
  </>
);

export function Hero() {
  return (
    <section id="hero" className="relative bg-bg overflow-hidden py-24 md:py-32 px-4">
      <div className="relative max-w-5xl mx-auto rounded-[20px] bg-surface shadow-card overflow-hidden px-6 py-8 md:px-10 md:py-10">
        {subtleBackgroundElements}

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
          
          {/* Left Column: Text */}
          <div className="flex-1 flex flex-col items-center md:items-start">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="text-accent font-bold text-xs md:text-sm tracking-widest uppercase mb-4"
        >
          Hello, I'm Cedrick
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" as const }}
          className="text-text text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 tracking-tight"
        >
          I turn complex workflows into scalable software.
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" as const }}
          className="text-muted text-xl md:text-2xl font-heading font-medium mb-6 tracking-tight"
        >
          Full-Stack Developer & AI Integration Developer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" as const }}
          className="text-base md:text-lg text-muted max-w-2xl mb-10 leading-relaxed"
        >
          I build practical web applications, automate business processes, and develop AI-powered solutions that address real-world challenges.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" as const }}
          className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full sm:w-auto"
        >
          <a
            href="/#projects"
            className="flex items-center justify-center w-full sm:w-auto px-8 py-3 min-h-[44px] rounded-full bg-accent text-bg font-medium shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 cursor-pointer"
          >
            Explore My Projects <span aria-hidden="true" className="ml-2">→</span>
          </a>
          <a
            href="/#contact"
            className="flex items-center justify-center w-full sm:w-auto px-8 py-3 min-h-[44px] rounded-full bg-transparent border-2 border-accent text-accent font-medium transition-all duration-200 hover:bg-accent hover:text-bg hover:scale-[1.02] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 cursor-pointer"
          >
            Contact Me
          </a>
        </motion.div>
        
        {/* Tech Stack Credibility Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" as const }}
          className="mt-8 text-sm md:text-base font-medium text-muted/80 tracking-wide text-center md:text-left w-full"
        >
          React &middot; Node.js &middot; PostgreSQL &middot; Python &middot; Firebase
        </motion.div>
          </div>

          {/* Right Column: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex-shrink-0 relative w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-[3px] border-accent/20 shadow-[0_0_30px_rgba(1,135,95,0.15)] dark:shadow-[0_0_30px_rgba(76,175,147,0.25)]"
          >
            <Image
              src="/images/profile.jpg"
              alt="Cedrick Albuero"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 192px, 288px"
              priority
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
