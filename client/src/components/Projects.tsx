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
    title: "DevFlow — SaaS Platform",
    description: "A full-featured project management platform built for developer teams. Real-time collaboration, kanban boards, GitHub integration and sprint analytics.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    year: "2025",
  },
  {
    title: "Aria Design System",
    description: "An accessible, composable component library with 60+ components, full dark mode support, and motion primitives built on Radix UI.",
    tags: ["React", "TypeScript", "Storybook", "Radix UI", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    year: "2025",
  },
  {
    title: "NeuralChat API",
    description: "REST + WebSocket API powering real-time AI conversations with streaming support, rate limiting, and fine-tuned response caching.",
    tags: ["Node.js", "Express", "Redis", "OpenAI", "Docker"],
    githubUrl: "#",
    year: "2024",
  },
  {
    title: "PulseMetrics Dashboard",
    description: "Analytics dashboard with customizable widgets, live data streaming and CSV/PDF export. Reduced client reporting time by 60%.",
    tags: ["React", "D3.js", "FastAPI", "MongoDB"],
    liveUrl: "#",
    year: "2024",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-28 relative">
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
            <span className="font-mono text-[var(--accent)] text-xs tracking-widest uppercase">Projects</span>
          </div>
        </ScrollReveal>

        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-[var(--text-primary)] leading-tight tracking-tight">
              Things I've built.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1} direction="right">
            <a
              href="https://github.com"
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