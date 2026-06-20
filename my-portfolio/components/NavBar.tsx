"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useActiveSection } from "@/hooks/useActiveSection";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection(SECTIONS.map((s) => s.id));

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = SECTIONS.map((section) => {
    const isActive = activeSection === section.id || (!activeSection && section.id === "hero");
    return (
      <li key={section.id}>
        <Link
          href={`#${section.id}`}
          onClick={() => setIsOpen(false)}
          className={`block py-2 md:py-0 text-sm font-medium transition-colors duration-200 ${
            isActive ? "text-accent" : "text-muted hover:text-text"
          }`}
        >
          {section.label}
        </Link>
      </li>
    );
  });

  return (
    <header className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-white/10 shadow-sm transition-all duration-200">
      <div className="mx-auto flex items-center justify-between px-4 py-4 max-w-7xl md:px-8">
        <Link 
          href="#hero" 
          className="text-lg font-heading font-bold text-text hover:opacity-80 transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          Cedrick.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks}
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-text border border-white/10 rounded-md shadow-xs hover:bg-surface hover:border-white/20 hover:shadow-sm transition-all duration-200 hover:scale-[1.01]"
              >
                Download CV
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-text hover:text-accent transition-colors"
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <nav className="absolute top-full left-0 w-full min-h-screen bg-bg border-t border-white/10 md:hidden">
          <ul className="flex flex-col px-4 py-8 space-y-6">
            {navLinks}
            <li className="pt-4 border-t border-white/10">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-accent rounded-md shadow-sm transition-transform duration-200 hover:scale-[1.01] hover:shadow-md"
              >
                Download CV
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
