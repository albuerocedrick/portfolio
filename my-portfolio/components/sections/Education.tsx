"use client";

import { motion } from "framer-motion";
import experienceData from "@/data/experience.json";
import { BookOpen, GraduationCap } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Education() {
  return (
    <section id="education" className="py-24 md:py-32 px-4 md:px-8 bg-bg">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">Education & Academics</h2>
          <div className="w-20 h-1 bg-accent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column: Education Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent/15 text-accent">
                <GraduationCap className="w-5 h-5" />
              </span>
              <h3 className="text-2xl font-heading font-semibold text-text">Degrees</h3>
            </div>

            <div className="relative border-l border-white/10 ml-5 space-y-10">
              {experienceData.education.map((edu, index) => (
                <motion.div key={index} variants={itemVariants} className="relative pl-8">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-accent ring-4 ring-bg" />
                  
                  {/* Content Card */}
                  <div className="rounded-2xl border border-white/10 bg-surface/30 p-6 md:p-8 hover:bg-surface/50 transition-colors duration-300">
                    <p className="text-accent text-sm font-semibold tracking-wide mb-2 uppercase">
                      {edu.period}
                    </p>
                    <h4 className="text-xl md:text-2xl font-heading font-bold text-text mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-base text-muted font-medium mb-5">
                      {edu.institution}
                    </p>
                    
                    <ul className="space-y-3">
                      {edu.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-muted/90 leading-relaxed">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Relevant Coursework */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent/15 text-accent">
                <BookOpen className="w-5 h-5" />
              </span>
              <h3 className="text-2xl font-heading font-semibold text-text">Relevant Coursework</h3>
            </div>

            <div className="flex flex-col gap-3">
              {experienceData.courses.map((course, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 rounded-xl border border-white/10 bg-surface/30 hover:border-white/20 transition-all duration-300 shadow-sm"
                >
                  <p className="text-base font-medium text-text leading-snug">
                    {course.name}
                  </p>
                  <p className="text-xs sm:text-sm text-muted whitespace-nowrap font-medium px-3 py-1 bg-white/5 rounded-md border border-white/5 self-start sm:self-auto">
                    {course.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
