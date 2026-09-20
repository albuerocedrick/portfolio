"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ThemeToggle } from "@/components/ThemeToggle";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = SECTIONS.map((s) => s.id);

export function NavBar() {
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <header className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-divider shadow-sm transition-all duration-200">
      <div className="mx-auto flex items-center gap-4 px-4 py-3 max-w-7xl md:px-8">
        <Link 
          href="/#hero" 
          className="text-lg font-heading font-bold text-text hover:opacity-80 transition-opacity"
        >
          Cedrick.
        </Link>

        {/* Center: Chip Rail */}
        <nav className="chip-rail flex-1 min-w-0">
          <div className="flex items-center gap-2 px-1">
            {SECTIONS.map((section) => {
              const isActive =
                activeSection === section.id || (!activeSection && section.id === "hero");
              return (
                <Link
                  key={section.id}
                  href={`/#${section.id}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-100 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none [scroll-snap-align:start] ${
                    isActive
                      ? "bg-accent text-white"
                      : "bg-transparent border border-divider text-muted hover:bg-surface hover:text-text"
                  }`}
                >
                  {section.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CV"
            className="inline-flex items-center justify-center gap-2 w-11 h-11 md:w-auto md:h-auto md:px-4 md:py-2 text-sm font-medium rounded-full border border-divider text-muted hover:border-accent hover:text-accent transition-colors duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <Download size={16} />
            <span className="hidden md:inline">Download CV</span>
          </a>
        </div>
      </div>
    </header>
  );
}
