"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "@/data/projects.json";
import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/types/project";



export function Projects() {
  const [activeTag, setActiveTag] = useState("All");

  const projects: Project[] = projectsData.projects as Project[];

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tags.forEach((tag) => tags.add(tag)));
    return ["All", ...Array.from(tags)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let filtered =
      activeTag === "All"
        ? projects
        : projects.filter((p) => p.tags.includes(activeTag));

    // Sort featured projects first
    filtered = [...filtered].sort(
      (a, b) => Number(b.featured) - Number(a.featured)
    );

    return filtered;
  }, [projects, activeTag]);

  return (
    <section id="projects" className="py-24 md:py-32 px-4 md:px-8 bg-bg">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
            Selected Projects
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full" />
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-10 md:mb-14">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeTag === tag
                  ? "bg-accent text-white border-transparent"
                  : "bg-surface border border-white/10 text-muted hover:text-text hover:border-white/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className={`grid gap-6 md:gap-8 min-h-[400px] ${
          filteredProjects.length === 1 ? "grid-cols-1 max-w-md mx-auto" :
          filteredProjects.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" :
          "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12"
              >
                <p className="text-muted text-lg">
                  No projects match this filter.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
