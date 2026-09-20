"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "@/data/projects.json";
import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/types/project";

export function Projects() {
  const [activeTag, setActiveTag] = useState("All");

  const projects: Project[] = projectsData.projects as Project[];

  // Derived: featured projects — always visible, bypasses activeTag filter
  const featuredProjects = projects.filter((p) => p.featured);

  // All unique tags for the filter chip cloud
  const allTags = useMemo(() => {
    const tags = new Set<string>(projects.flatMap((p) => p.tags));
    return ["All", ...Array.from(tags)];
  }, [projects]);

  // Filtered grid
  const filteredProjects = useMemo(() => {
    const filtered =
      activeTag === "All"
        ? projects
        : projects.filter((p) => p.tags.includes(activeTag));

    return filtered.toSorted((a, b) => Number(b.featured) - Number(a.featured));
  }, [projects, activeTag]);

  return (
    <section id="projects" className="py-24 md:py-32 px-4 md:px-8 bg-bg">
      <div className="mx-auto max-w-7xl">

        {/* ── Section Heading ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-4">
            Selected Projects
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            A collection of systems I've designed and built.
          </p>
        </motion.div>

        {/* ── Zone 1: Featured Grid ─────────────────────────────────────── */}
        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className={`grid gap-6 md:gap-8 mx-auto max-w-6xl ${
                featuredProjects.length === 1
                  ? "grid-cols-1 max-w-2xl"
                  : featuredProjects.length === 2
                  ? "grid-cols-1 md:grid-cols-2 max-w-5xl"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <hr className="border-divider my-16 md:my-24" />

        {/* ── Zone 2: Explore All Projects & Filters ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-10 md:mb-14"
        >
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-text mb-6">
            Explore All Projects
          </h3>
          
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter projects by category"
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  activeTag === tag
                    ? "bg-accent text-white border border-transparent"
                    : "bg-transparent border border-divider text-muted hover:bg-surface hover:text-text"
                }`}
                aria-pressed={activeTag === tag}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Zone 3: All Projects Filterable Grid ──────────────────────── */}
        <div
          className={`grid gap-6 md:gap-8 min-h-[400px] ${
            filteredProjects.length === 1
              ? "grid-cols-1 max-w-md mx-auto md:mx-0"
              : filteredProjects.length === 2
              ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto md:mx-0"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
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
