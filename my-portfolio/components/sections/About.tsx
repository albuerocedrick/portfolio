"use client";

import { Mail, MapPin, Clock } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { motion, Variants } from "framer-motion";
import aboutData from "@/data/about.json";

const VALUES_ICONS = [
  // Clean Code
  <svg key="code" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  // Architecture / Layers
  <svg key="layers" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  // User Focus
  <svg key="user" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  // Continuous Learning
  <svg key="refresh" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6"/><path d="M2.5 12a10 10 0 0 1 17.8-6.3L21.5 8"/><path d="M2.5 22v-6h6"/><path d="M21.5 12a10 10 0 0 1-17.8 6.3L2.5 16"/></svg>,
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-4 md:px-8 bg-bg">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">About Me</h2>
          <div className="w-20 h-1 bg-accent rounded-full" />
        </motion.div>

        {/* Top Row: Profile card (left, narrow) | Bio (right, wide) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-12">

          {/* Left Column: Profile Card + Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-1 flex flex-col gap-6 max-w-xs w-full mx-auto md:mx-0"
          >
            {/* Unified Profile + Contact Card */}
            <div className="rounded-2xl border border-divider bg-surface shadow-sm overflow-hidden">
              {/* Contact Rows */}
              <div className="divide-y divide-divider">
                <div className="flex items-center gap-3 px-5 py-3 group">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent/15 text-accent flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted uppercase tracking-wider leading-none mb-0.5">Location</p>
                    <p className="text-sm text-text truncate">{aboutData.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-5 py-3 group">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent/15 text-accent flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted uppercase tracking-wider leading-none mb-0.5">Email</p>
                    <a
                      href={`mailto:${aboutData.email}`}
                      className="text-sm text-text hover:text-accent transition-colors duration-150 truncate block"
                    >
                      {aboutData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-5 py-3 group">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent/15 text-accent flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted uppercase tracking-wider leading-none mb-0.5">Response Time</p>
                    <p className="text-sm text-text">{aboutData.response_time}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="px-5 py-4 border-t border-divider flex items-center gap-3">
                <a
                  href={aboutData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white transition-colors duration-150 text-sm font-medium cursor-pointer"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href={aboutData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-full border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white transition-colors duration-150 text-sm font-medium cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Paragraphs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="md:col-span-2 flex flex-col justify-center gap-6"
          >
            <div>
              {/* Title — primary hierarchy level: large, heavy */}
              <p className="text-xl md:text-2xl font-heading font-bold text-text mb-4 leading-snug">{aboutData.title}</p>
              {/* Bio — secondary: smaller, muted, relaxed */}
              <div className="space-y-3 text-sm md:text-base text-muted leading-[1.7]">
                {aboutData.bio_paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row: Engineering Values (full-width) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-5"
        >
          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-xl font-heading font-semibold text-text whitespace-nowrap">Engineering Values</h3>
            <div className="flex-1 h-px bg-divider" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aboutData.engineering_values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="flex items-start gap-4 p-5 rounded-xl border border-divider bg-surface shadow-card transition-shadow duration-150 hover:shadow-card-hover cursor-default"
              >
                <span className="mt-0.5 flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-accent/15 text-accent">
                  {VALUES_ICONS[index % VALUES_ICONS.length]}
                </span>
                <div>
                  <h4 className="text-base font-bold text-text mb-1">{value.title}</h4>
                  <p className="text-sm md:text-base text-muted leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
