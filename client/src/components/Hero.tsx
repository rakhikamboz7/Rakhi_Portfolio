import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const ROLES = [
  "Full Stack Developer",
  "UI/UX Designer",
  "React Specialist",
  "TypeScript Expert",
  "Problem Solver",
];

interface HeroProps {
  onContactOpen: () => void;
}

export default function Hero({ onContactOpen }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // Typewriter
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let t: ReturnType<typeof setTimeout>;
    if (!isDeleting && charIndex < current.length) {
      t = setTimeout(() => { setDisplayText(current.slice(0, charIndex + 1)); setCharIndex(c => c + 1); }, 80);
    } else if (!isDeleting && charIndex === current.length) {
      t = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && charIndex > 0) {
      t = setTimeout(() => { setDisplayText(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1); }, 40);
    } else {
      t = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex(r => (r + 1) % ROLES.length);
      }, 0);
    }
    return () => clearTimeout(t);
  }, [charIndex, isDeleting, roleIndex]);

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const titleLines = ["Building The", "Impossible", "Experiences."];

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Ambient orbs */}
      <motion.div
        className="absolute top-1/4 right-[15%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)" }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[10%] w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(120,80,255,0.12) 0%, transparent 70%)" }}
        animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-[var(--accent)] bg-[var(--accent-dim)] text-[var(--accent)] text-xs font-medium tracking-wide"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
              style={{ animation: "pulse-glow 2s ease infinite" }}
            />
            Available for opportunities
          </motion.div>

          {/* Title — overflow-hidden per line for slide-up */}
          <div className="mb-4 space-y-0.5">
            {titleLines.map((word, i) => (
              <div key={i} className="overflow-hidden leading-[1.06]">
                <motion.h1
                  className={`font-display text-[clamp(2.5rem,8vw,5.9rem)] font-bold tracking-tight ${
                    i === 1 ? "text-[var(--accent)]" : "text-[var(--text-primary)]"
                  }`}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.85, delay: 0.25 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72 }}
            className="flex items-center gap-1 mb-4 min-h-[2rem]"
          >
            <span className="font-mono text-[var(--text-secondary)] text-base">{displayText}</span>
            <span
              className="inline-block w-0.5 h-5 bg-[var(--accent)] rounded-sm"
              style={{ animation: "blink 1s step-end infinite" }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="text-[var(--text-muted)] text-base mb-10 max-w-sm leading-relaxed"
          >
            Problem solving is what makes me unique.
          </motion.p>

          

          {/* CTAs — View CV primary exactly like benrobo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-view-cv"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-[var(--text-primary)] text-[var(--text-primary)] font-semibold text-sm tracking-wide hover:bg-[var(--text-primary)] hover:text-[var(--bg)] transition-all duration-300 hover:-translate-y-0.5"
            >
              View CV
            </a>
            <button
              onClick={() => scrollTo("#projects")}
              data-testid="button-see-work"
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--accent)] transition-colors duration-200 group"
            >
              See My Work
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
           
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.button
          onClick={() => scrollTo("#about")}
          data-testid="button-scroll-down"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-mono text-[10px] tracking-widest uppercase"
        >
          <ChevronDown size={18} />
          <span>Scroll</span>
        </motion.button>
      </motion.div>
    </section>
  );
}