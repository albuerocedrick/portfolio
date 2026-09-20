"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import { MonitorSmartphone, Database, Code2, Cpu } from "lucide-react";
import skillsData from "@/data/skills.json";

// Map string icon names from JSON to Lucide components
const lucideIcons: Record<string, React.ElementType> = {
  MonitorSmartphone,
  Database,
  Code2,
  Cpu,
};

// Animation variants
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const categoryVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Skills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" className="py-24 md:py-32 px-4 md:px-8 bg-bg">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">Skills & Technologies</h2>
          <p className="text-lg text-muted max-w-2xl mb-4">
            My technical toolkit for building practical web applications, mobile solutions, and intelligent systems.
          </p>
          <div className="w-20 h-1 bg-accent rounded-full mx-auto md:mx-0" />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
          {skillsData.categories.map((category, categoryIndex) => {
            const Icon = category.icon ? lucideIcons[category.icon] : null;

            return (
              <motion.div 
                key={categoryIndex} 
                variants={categoryVariants} 
                className="flex flex-col gap-5 p-6 rounded-2xl border border-divider bg-surface/50"
              >
                
                {/* Category Header */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    {Icon && <Icon className="w-5 h-5 text-text" />}
                    <h3 className="text-lg md:text-xl font-heading font-bold text-text">
                      {category.name}
                    </h3>
                  </div>
                  <hr className="border-divider" />
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-divider bg-surface text-text text-sm shadow-sm transition-colors duration-150 hover:border-accent hover:text-accent cursor-default"
                    >
                      {/* Icon */}
                      {skill.icon && (
                        <span className="text-lg flex items-center justify-center">
                          <i className={`${skill.icon} ${['github', 'nextjs', 'express'].some(name => skill.icon?.includes(name)) ? '' : 'colored'}`}></i>
                        </span>
                      )}
                      
                      {/* Skill Name */}
                      <span className="font-medium">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Currently Exploring */}
        {skillsData.currently_exploring && skillsData.currently_exploring.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 md:mt-16"
          >
            <h3 className="text-xl font-heading font-bold text-text mb-6 text-center md:text-left">
              Currently Exploring
            </h3>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {skillsData.currently_exploring.map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full border border-divider bg-transparent text-muted text-sm font-medium"
                >
                  {skill}
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
