import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, staggerItem } from "./Scrollreveal";

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Framer Motion", "Tailwind CSS", "Figma"] },
  { category: "Backend",  items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs"] },
  { category: "DevOps",   items: ["Git","Vercel"] },
];

export default function About() {
  return (
    <section id="about" className="py-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section label */}
        <ScrollReveal direction="left">
          <div className="flex items-center gap-3 mb-14">
            <span className="w-10 h-px bg-[var(--accent)]" />
            <span className="font-mono text-[var(--accent)] text-1xl tracking-widest uppercase">About Me</span>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — text */}
          <div className="space-y-6">
            <ScrollReveal delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-[var(--text-primary)] leading-tight tracking-tight">
                Crafting digital<br />experiences that{" "}
                <span className="text-[var(--accent)]">matter</span>.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base">
                I'm Rakhi — a full stack developer and UI/UX designer who bridges the gap between
                design and engineering. Every pixel is purposeful. Every line of code is intentional.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base">
                I build performant, accessible, and beautiful web applications using modern technologies.
                My strength lies in understanding what users need and translating that into elegant,
                scalable solutions that actually ship.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.24}>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Open to work", "Remote-friendly", "Full-time"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-[var(--border)] text-[var(--text-muted)] text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right — skills */}
          <div className="space-y-8">
            {skills.map((group, gi) => (
              <ScrollReveal key={group.category} delay={gi * 0.1 + 0.08} direction="right">
                <div>
                  <p className="font-mono text-xs tracking-widest text-[var(--text-muted)] uppercase mb-3">
                    {group.category}
                  </p>
                  <StaggerContainer className="flex flex-wrap gap-2" stagger={0.05} delayStart={gi * 0.1}>
                    {group.items.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={staggerItem}
                        whileHover={{ scale: 1.06, borderColor: "var(--accent)", color: "var(--accent)" }}
                        className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] text-sm font-medium cursor-default transition-colors duration-200"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </StaggerContainer>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}