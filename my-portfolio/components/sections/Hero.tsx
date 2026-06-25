"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-16 md:px-8 bg-bg overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="text-accent font-medium text-sm md:text-base mb-6 tracking-wide"
        >
          Hi, my name is
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" as const }}
          className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60"
        >
          Cedrick Albuero.
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" as const }}
          className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold text-muted mb-8 tracking-tight"
        >
          I build scalable web and AI solutions.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" as const }}
          className="text-base md:text-lg text-muted max-w-2xl mb-12 leading-relaxed"
        >
          I am a Junior Full-Stack Developer & AI Integration Developer specializing in business process automation, offline-first applications, and scalable backend systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" as const }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#projects"
            className="flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-accent text-white font-medium rounded-md shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
          >
            View My Work
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-transparent text-text border border-white/20 font-medium rounded-md transition-all duration-200 hover:bg-surface hover:border-white/30 hover:shadow-sm"
          >
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}
