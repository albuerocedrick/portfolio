"use client";

import { useEffect, useRef } from "react";
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
  const isClicking = useRef(false);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleNavClick = (id: string) => {
    // Lock the auto-scroller for 1000ms while the window vertically smooth scrolls
    isClicking.current = true;
    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => {
      isClicking.current = false;
    }, 1000);

    // Instantly center the clicked chip (instant scrolls do not abort window smooth scrolls)
    const chip = document.getElementById(`nav-chip-${id}`);
    if (chip) {
      chip.scrollIntoView({ inline: "center", block: "nearest" });
    }
  };

  // Auto-scroll the chip rail to keep the active chip in view during manual page scrolling
  useEffect(() => {
    if (isClicking.current) return; // Prevent iOS Safari from cancelling vertical scroll

    // Default to "hero" if activeSection is empty on initial load
    const current = activeSection || "hero";
    const activeChip = document.getElementById(`nav-chip-${current}`);
    
    if (activeChip) {
      // scrollIntoView with inline: "center" nicely centers the active chip in the scroll rail
      activeChip.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeSection]);

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
        <div className="flex-1 min-w-0 relative [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]">
          <nav className="chip-rail">
            <div className="flex items-center gap-2 px-4 before:content-[''] before:w-[40vw] before:shrink-0 after:content-[''] after:w-[40vw] after:shrink-0 md:before:hidden md:after:hidden">
            {SECTIONS.map((section) => {
              const isActive =
                activeSection === section.id || (!activeSection && section.id === "hero");
              return (
                <Link
                  key={section.id}
                  id={`nav-chip-${section.id}`}
                  href={`/#${section.id}`}
                  onClick={() => handleNavClick(section.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-100 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none [scroll-snap-align:center] ${
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
        </div>

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
