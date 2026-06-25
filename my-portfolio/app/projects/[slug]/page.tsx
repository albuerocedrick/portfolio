import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink, Info } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { ProjectsData, Project } from "@/types/project";
import projectsDataRaw from "@/data/projects.json";

const projectsData = projectsDataRaw as ProjectsData;

export async function generateStaticParams() {
  return projectsData.projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData.projects.find((p) => p.id === slug);
  return {
    title: project ? `${project.title} — Cedrick Albuero` : "Project Not Found",
    description: project?.tagline ?? "Project details",
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData.projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const hasLiveUrl = project.live_url !== null;
  const hasGithubUrl = project.github_url !== null;
  const hasNoUrls = !hasLiveUrl && !hasGithubUrl;

  return (
    <main className="min-h-screen bg-bg text-text pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/#hero" className="hover:text-text transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <Link href="/#projects" className="hover:text-text transition-colors">
            Projects
          </Link>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <span className="text-text font-medium truncate">{project.title}</span>
        </nav>

        {/* Hero Banner Area */}
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden mb-10 border border-white/10 bg-surface">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          {project.featured && (
            <div className="absolute top-4 right-4 md:top-6 md:right-6 px-4 py-1.5 bg-accent text-white text-xs md:text-sm font-semibold rounded-full shadow-md backdrop-blur-sm">
              Featured Project
            </div>
          )}
        </div>

        {/* Title + Meta Row */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl">
            {project.tagline}
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-4 mb-14 pb-10 border-b border-white/10">
          {hasNoUrls ? (
            <div className="flex items-start gap-3 bg-surface border border-white/10 rounded-xl p-4 w-full md:w-auto">
              <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted">
                {project.unavailable_reason}
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              {hasLiveUrl && (
                <a
                  href={project.live_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-lg shadow-sm hover:bg-accent/90 hover:shadow-md transition-all duration-200 w-full sm:w-auto"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {hasGithubUrl && (
                <a
                  href={project.github_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-white/20 text-text font-medium rounded-lg hover:bg-white/5 hover:border-white/30 transition-all duration-200 w-full sm:w-auto"
                >
                  <GithubIcon className="w-4 h-4" />
                  View on GitHub
                </a>
              )}
            </div>
          )}
          
          <div className="w-full sm:w-auto sm:ml-auto mt-4 sm:mt-0">
            <Link 
              href="/#projects"
              className="inline-flex items-center justify-center py-3 text-sm font-medium text-muted hover:text-accent transition-colors duration-200"
            >
              &larr; Back to Projects
            </Link>
          </div>
        </div>

        {/* Project Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Main Column (Description, Features, Challenges, Learnings) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <section>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-text mb-4">
                Overview
              </h2>
              <div className="text-base md:text-lg text-muted leading-relaxed whitespace-pre-wrap">
                {project.description}
              </div>
            </section>

            {/* Features */}
            {project.features.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-text mb-5">
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Challenges & Solutions */}
            {project.challenges.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-text mb-5">
                  Technical Challenges
                </h2>
                <div className="space-y-6">
                  {project.challenges.map((challenge, i) => (
                    <div 
                      key={i}
                      className="bg-surface border border-white/5 rounded-xl p-5 md:p-6 shadow-sm"
                    >
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-amber-400 font-medium mb-2">
                          <span className="text-lg leading-none">⚡</span> Problem
                        </div>
                        <p className="text-muted leading-relaxed pl-7 text-sm md:text-base">
                          {challenge.problem}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-green-400 font-medium mb-2">
                          <span className="text-lg leading-none">✓</span> Solution
                        </div>
                        <p className="text-muted leading-relaxed pl-7 text-sm md:text-base">
                          {challenge.solution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Learnings */}
            {project.learnings && (
              <section>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-text mb-4">
                  What I Learned
                </h2>
                <p className="text-base md:text-lg text-muted leading-relaxed">
                  {project.learnings}
                </p>
              </section>
            )}
          </div>

          {/* Sidebar Column (Tech Stack) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-surface border border-white/10 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-heading font-bold text-text mb-4 pb-4 border-b border-white/10">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {project.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm font-medium text-muted bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
