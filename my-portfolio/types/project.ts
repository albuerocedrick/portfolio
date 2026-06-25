export interface ProjectChallenge {
  problem: string;
  solution: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech_stack: string[];
  features: string[];
  challenges: ProjectChallenge[];
  learnings: string;
  live_url: string | null;
  github_url: string | null;
  image: string;
  featured: boolean;
  tags: string[];
  unavailable_reason: string | null;
}

export interface ProjectsData {
  projects: Project[];
}
