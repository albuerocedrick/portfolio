"use client";

import { motion, Variants } from "framer-motion";
import skillsData from "@/data/skills.json";

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
  return (
    <section id="skills" className="py-24 md:py-32 px-4 md:px-8 bg-bg">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-accent rounded-full" />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 w-full rounded-3xl border border-white/10 bg-surface/30 shadow-sm divide-y lg:divide-y-0 lg:divide-x divide-white/10 overflow-hidden"
        >
          {skillsData.categories.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex} 
              variants={categoryVariants} 
              className="flex flex-col gap-5 p-8 sm:p-10 hover:bg-white/[0.02] transition-colors duration-300"
            >
              
              {/* Category Header */}
              <h3 className="text-xl md:text-2xl font-heading font-bold text-text">
                {category.name}
              </h3>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    whileHover={{ y: -2, scale: 1.02 }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10 bg-surface shadow-sm transition-colors duration-200 hover:border-white/20 cursor-default"
                  >
                    {/* Icon */}
                    {skill.icon && (
                      <span className="text-lg flex items-center justify-center">
                        <i className={`${skill.icon} ${['github', 'nextjs', 'express'].some(name => skill.icon?.includes(name)) ? '' : 'colored'}`}></i>
                      </span>
                    )}
                    
                    {/* Skill Name */}
                    <p className="text-sm md:text-base font-medium text-text">
                      {skill.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
