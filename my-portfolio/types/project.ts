export interface ProjectChallenge {
  problem: string;
  solution: string;
}

export interface ProjectOverview {
  problem: string;
  solution: string;
  role: string;
}

export interface ProjectFeatureCategory {
  category: string;
  items: string[];
}

export interface ProjectLearning {
  title: string;
  description: string;
}

export interface ProjectMetadata {
  role: string;
  category: string;
  year: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  overview: ProjectOverview;
  tech_stack: string[];
  full_tech_stack: string[];
  features: ProjectFeatureCategory[];
  challenges: ProjectChallenge[];
  learnings: ProjectLearning[];
  metadata: ProjectMetadata;
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
