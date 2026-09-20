"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { GithubIcon } from "@/components/icons";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasLiveUrl = project.live_url !== null;
  const hasGithubUrl = project.github_url !== null;
  const hasNoUrls = !hasLiveUrl && !hasGithubUrl;

  return (
    <motion.div
      layout
      className="group flex flex-col h-full rounded-xl border border-divider bg-surface shadow-card overflow-hidden transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-card-hover active:scale-[0.99]"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-video bg-black/10 overflow-hidden shrink-0 border-b border-divider">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {project.featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-wider font-semibold rounded-md shadow-sm">
            Featured
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="text-xl font-heading font-semibold text-text mb-2 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-sm text-muted line-clamp-3 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mt-auto pt-3">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium text-muted bg-bg border border-divider rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center gap-4 px-5 py-3 border-t border-divider bg-surface/30 shrink-0">
        {hasNoUrls ? (
          <p className="flex-1 text-xs text-muted/80 italic line-clamp-2">
            {project.unavailable_reason}
          </p>
        ) : (
          <div className="flex items-center gap-3 flex-1">
            {hasLiveUrl && (
              <a
                href={project.live_url!}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-accent hover:text-text transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
            {hasGithubUrl && (
              <a
                href={project.github_url!}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-text transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label={`View source code for ${project.title}`}
              >
                <GithubIcon className="w-4 h-4" />
                <span>Code</span>
              </a>
            )}
          </div>
        )}

        <Link
          href={`/projects/${project.id}`}
          className="ml-auto flex-shrink-0 text-sm font-medium text-text hover:text-accent transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Details &rarr;
        </Link>
      </div>
    </motion.div>
  );
}
