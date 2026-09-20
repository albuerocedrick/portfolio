import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink, Info, LayoutGrid, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { ProjectsData } from "@/types/project";
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
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        
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
            sizes="(max-width: 1024px) 100vw, 1152px"
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
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl mb-4">
            {project.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted/80">
            <span>{project.metadata.role}</span>
            <span className="opacity-50">•</span>
            <span>{project.metadata.category}</span>
            <span className="opacity-50">•</span>
            <span>{project.metadata.year}</span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-4 mb-14 pb-10 border-b border-divider">
          {hasNoUrls ? (
            <div className="flex items-start gap-3 bg-surface border border-divider rounded-xl p-4 w-full md:w-auto">
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
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-lg shadow-sm hover:bg-accent/90 hover:shadow-md transition-all duration-200 w-full sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-divider text-text font-medium rounded-lg hover:bg-surface/80 hover:border-white/20 transition-all duration-200 w-full sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
              className="inline-flex items-center justify-center py-3 text-sm font-medium text-muted hover:text-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-md px-2"
            >
              &larr; Back to Projects
            </Link>
          </div>
        </div>

        {/* Project Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Overview */}
            <section className="space-y-8">
              <div>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-text mb-4">
                  The Problem
                </h2>
                <p className="text-base md:text-lg text-muted leading-relaxed">
                  {project.overview.problem}
                </p>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-text mb-4">
                  The Solution
                </h2>
                <p className="text-base md:text-lg text-muted leading-relaxed">
                  {project.overview.solution}
                </p>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-text mb-4">
                  My Contribution
                </h2>
                <p className="text-base md:text-lg text-muted leading-relaxed">
                  {project.overview.role}
                </p>
              </div>
            </section>

            {/* Features */}
            {project.features.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-text mb-6">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((featureGroup, i) => (
                    <div key={i} className="bg-surface border border-divider rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <LayoutGrid className="w-4 h-4 text-accent" />
                        <h3 className="font-heading font-semibold text-text">{featureGroup.category}</h3>
                      </div>
                      <ul className="space-y-2">
                        {featureGroup.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-muted text-sm leading-relaxed">
                            <span className="w-1 h-1 rounded-full bg-muted mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Challenges & Solutions */}
            {project.challenges.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-text mb-6">
                  Technical Challenges
                </h2>
                <div className="space-y-6">
                  {project.challenges.map((challenge, i) => (
                    <div 
                      key={i}
                      className="bg-surface border border-divider rounded-xl p-5 md:p-6 shadow-sm"
                    >
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-amber-500/90 font-medium mb-2">
                          <span className="text-lg leading-none">⚡</span> Problem
                        </div>
                        <p className="text-muted leading-relaxed text-sm md:text-base">
                          {challenge.problem}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-divider">
                        <div className="flex items-center gap-2 text-accent font-medium mb-2">
                          <span className="text-lg leading-none">✓</span> Solution
                        </div>
                        <p className="text-muted leading-relaxed text-sm md:text-base">
                          {challenge.solution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Learnings */}
            {project.learnings && project.learnings.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-text mb-6">
                  What I Learned
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                  {project.learnings.map((learning, i) => (
                    <div key={i} className="flex gap-4">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-text mb-1">{learning.title}</h4>
                        <p className="text-muted text-sm md:text-base leading-relaxed">
                          {learning.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Column (Tech Stack) */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-surface border border-divider rounded-2xl p-6 shadow-sm">
              
              <div className="mb-6 pb-6 border-b border-divider">
                <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
                  Project Info
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Role</dt>
                    <dd className="text-text font-medium text-right">{project.metadata.role}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Category</dt>
                    <dd className="text-text font-medium text-right">{project.metadata.category}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Platform</dt>
                    <dd className="text-text font-medium text-right">
                      {project.tags.includes("Web Development") ? "Web Application" : 
                       project.tags.includes("Mobile Development") ? "Mobile Application" : "Software System"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.full_tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium text-muted bg-bg border border-divider rounded-md cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
