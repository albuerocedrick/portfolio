import { Hero } from "@/components/sections/Hero";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/sections/About").then(mod => mod.About));
const Projects = dynamic(() => import("@/components/sections/Projects").then(mod => mod.Projects));
const Skills = dynamic(() => import("@/components/sections/Skills").then(mod => mod.Skills));
const Education = dynamic(() => import("@/components/sections/Education").then(mod => mod.Education));
const Contact = dynamic(() => import("@/components/sections/Contact").then(mod => mod.Contact));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </main>
  );
}
