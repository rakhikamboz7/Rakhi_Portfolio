import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import ScrollReveal, { StaggerContainer, staggerItem } from "./Scrollreveal";

interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  year: string;
}

const projects: Project[] = [
{
  title: "SDG Quest WebApp",
  description: "A sustainable development learning and community platform where users explore UN Sustainable Development Goals, take interactive quizzes, and engage in discussions. Implemented role-based authentication, dynamic quiz engine, and CMS-powered content management.",
  tags: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "Framer Motion", "Sanity CMS", "JWT Authentication"],
  liveUrl: "https://sdg-quest-5n7s.vercel.app/",
  githubUrl: "https://github.com/rakhikamboz7/SDG-Quest",
  featured: true,
  year: "2025",
},
  {
  title: "Dr Care – AI Health Assistant",
  description: "An AI-powered healthcare platform enabling symptom analysis, doctor discovery, appointment booking, and nearby hospital search. Built using Agentic AI with LangChain, Gemini models, real-time slot tracking, and personalized health report generation.",
  tags: ["FastAPI", "Python", "MongoDB", "LangChain", "Gemini AI", "Firebase", "LocationIQ API", "ChromaDB", "Tailwind CSS", "React"],
  liveUrl: "#",
  githubUrl: "#",
  featured: true,
  year: "2025",
},
 {
  title: "Aptitude Test WebApp",
  description: "An employability assessment platform for students featuring timed aptitude quizzes, performance analytics, and AI-generated feedback using GROQ AI for personalized improvement insights.",
  tags: ["React", "Node.js", "MongoDB Atlas", "Tailwind CSS", "JWT", "GROQ AI"],
  liveUrl: "https://aptitude-test-webapp.vercel.app/",
  githubUrl: "https://github.com/rakhikamboz7/Aptitude_Test_Webapp",
  year: "2024",
},
 {
  title: "STD Health Awareness Platform",
  description: "A stigma-free sexual health education platform providing confidential assessments, personalized AI-driven feedback, and awareness resources powered by Gemini AI models.",
  tags: ["React", "Node.js", "MongoDB", "Gemini AI", "Tailwind CSS", "JWT Authentication"],
  liveUrl: "https://std-awareness-sympto-3hry.bolt.host/",
  githubUrl: "https://github.com/Rakhikamboj/STD-App",
  year: "2024",
},
{
  title: "Digital Waste Compliance Engine (ESG)",
  description: "An ESG waste evaluation system with Admin-Auditor architecture where admins create projects and auditors log hazardous and non-hazardous waste data. Includes compliance scoring, diversion metrics, and dynamic dashboards.",
  tags: ["React", "Node.js", "MongoDB", "Mongoose", "JWT", "AG Grid", "Recharts", "Role-Based Access Control"],
  liveUrl: "https://digital-compliance-engine.vercel.app/",
  githubUrl: "https://github.com/Rakhikamboj/Digital_Compliance_Engine",
  featured: true,
  year: "2025",
}
];

export default function Projects() {
  return (
    <section id="projects" className="py-2 x*:relative">
      {/* Subtle bg pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--accent) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <ScrollReveal direction="left">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-[var(--accent)]" />
            <span className="font-mono text-[var(--accent)] text-1xl tracking-widest uppercase">Projects</span>
          </div>
        </ScrollReveal>

        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-[var(--text-primary)] leading-tight tracking-tight">
              Key Projects
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1} direction="right">
            <a
              href="https://github.com/rakhikamboz7/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--accent)] transition-colors group"
            >
              View all on GitHub
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </ScrollReveal>
        </div>

        {/* Projects grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-5" stagger={0.08}>
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group relative rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-[0_0_40px_var(--accent-glow)] ${
                project.featured ? "md:col-span-1" : ""
              }`}
              data-testid={`project-card-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {/* Top: year + links */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[var(--text-muted)] text-xs">{project.year}</span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                      aria-label="GitHub"
                    >
                      <Github size={14} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                      aria-label="Live site"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 leading-snug">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] text-[var(--text-muted)] text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent)]/0 to-[var(--accent)]/0 group-hover:from-[var(--accent)]/3 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}