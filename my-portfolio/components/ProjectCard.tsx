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
      className="flex flex-col h-full rounded-2xl border border-white/10 bg-surface shadow-sm overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-white/20"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-video bg-black/20 overflow-hidden shrink-0 border-b border-white/5">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full shadow-sm">
            Featured
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <h3 className="text-lg md:text-xl font-heading font-bold text-text mb-2 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-sm text-muted line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {project.tech_stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium text-muted bg-white/5 border border-white/10 rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="px-2.5 py-1 text-xs font-medium text-muted bg-white/5 border border-white/10 rounded-full">
              +{project.tech_stack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center gap-4 px-5 py-4 border-t border-white/10 bg-black/10 shrink-0">
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
                className="flex items-center gap-1.5 text-sm font-medium text-accent hover:text-white transition-colors duration-200"
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
                className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-text transition-colors duration-200"
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
          className="ml-auto flex-shrink-0 text-sm font-medium text-text hover:text-accent transition-colors duration-200"
        >
          Details &rarr;
        </Link>
      </div>
    </motion.div>
  );
}
