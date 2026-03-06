import { motion } from "framer-motion";
import ScrollReveal from "./Scrollreveal";

interface FooterProps {
  onContactOpen: () => void;
}

export default function Footer({ onContactOpen }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--border)] overflow-hidden">
      {/* Big CTA section — matches benrobo footer */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <ScrollReveal direction="up" delay={0}>
          <h2 className="font-display text-[clamp(1.5rem,7vw,2.5rem)] font-bold text-[var(--text-primary)] leading-tight tracking-tight mb-4">
            Let Make The Impossible{" "}
            <span className="text-[var(--accent)]">Possible.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-[var(--text-secondary)] text-lg mb-2">
            Start by{" "}
            <motion.button
              onClick={onContactOpen}
              className="text-[var(--accent)] underline decoration-dotted underline-offset-4 hover:decoration-solid transition-all font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-say-hi"
            >
              saying hi
            </motion.button>
          </p>
        </ScrollReveal>
      </div>

      {/* Bottom bar — matches benrobo exactly */}
      <div className="border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="font-display text-[var(--text-primary)] font-bold text-lg">Rakhi</span>
            <span className="text-[var(--text-muted)] text-sm">
              © {currentYear} All Right Reserved.
            </span>
          </div>

          
        </div>
      </div>
    </footer>
  );
}