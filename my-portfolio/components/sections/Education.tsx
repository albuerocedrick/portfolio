"use client";

import { motion } from "framer-motion";
import experienceData from "@/data/experience.json";
import { GraduationCap, Award, Medal, FileBadge, ExternalLink } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Education() {
  return (
    <section id="education" className="py-24 md:py-32 px-4 md:px-8 bg-bg">
      <div className="mx-auto max-w-4xl flex flex-col gap-16 md:gap-24">
        
        {/* EDUCATION SUBSECTION */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">Education & Academics</h2>
            <div className="w-20 h-1 bg-accent rounded-full mx-auto" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {experienceData.education.map((edu, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="relative rounded-2xl border border-divider bg-surface p-6 md:p-10 shadow-card hover:shadow-card-hover transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <GraduationCap className="w-7 h-7" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-text mb-2">
                  {edu.institution}
                </h3>
                <h4 className="text-lg md:text-xl font-medium text-accent mb-1">
                  {edu.degree}
                </h4>
                {edu.college && (
                  <p className="text-base text-muted mb-6">
                    {edu.college}
                  </p>
                )}
                
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="inline-flex px-4 py-1.5 bg-bg border border-divider text-muted text-sm font-medium rounded-full">
                    {edu.period}
                  </span>
                  {edu.progress && (
                    <span className="inline-flex px-4 py-1.5 bg-accent/10 text-accent text-sm font-semibold rounded-full border border-accent/20">
                      {edu.progress}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ACHIEVEMENTS SUBSECTION */}
        {experienceData.achievements && experienceData.achievements.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-heading font-bold text-text mb-2 text-center md:text-left">Achievements & Recognition</h3>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {experienceData.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group flex flex-col justify-between p-6 rounded-2xl border border-divider bg-surface hover:border-accent/50 shadow-sm transition-all duration-300"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                        {achievement.placement.toLowerCase().includes('champion') || achievement.placement.toLowerCase().includes('1st') ? (
                          <Award className="w-5 h-5" />
                        ) : (
                          <Medal className="w-5 h-5" />
                        )}
                      </div>
                      <span className="inline-flex px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
                        {achievement.placement}
                      </span>
                    </div>
                    <h4 className="text-lg font-heading font-bold text-text leading-tight mb-2 group-hover:text-accent transition-colors">
                      {achievement.title}
                    </h4>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-divider flex items-center justify-between">
                    {achievement.year ? (
                      <span className="text-xs text-muted/80">{achievement.year}</span>
                    ) : <span />}
                    {achievement.link && (
                      <a 
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-text hover:text-accent transition-colors"
                      >
                        View Proof <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* CERTIFICATIONS SUBSECTION (Conditional) */}
        {experienceData.certifications && experienceData.certifications.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-heading font-bold text-text mb-2 text-center md:text-left">Certifications</h3>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {experienceData.certifications.map((cert: any, index: number) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group p-6 rounded-2xl border border-divider bg-surface hover:border-accent/50 shadow-sm transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-bg border border-divider flex items-center justify-center text-muted group-hover:text-accent transition-colors shrink-0">
                      <FileBadge className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-heading font-bold text-text leading-tight mb-1">
                        {cert.name}
                      </h4>
                      <p className="text-sm text-muted font-medium">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-divider">
                    <span className="text-xs text-muted/80">{cert.date}</span>
                    {cert.link && (
                      <a 
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-text hover:text-accent transition-colors"
                      >
                        View Credential <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
}
