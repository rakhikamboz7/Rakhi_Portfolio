import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  slug: string;
}

export default function BlogCard({ title, excerpt, date, readTime, tag, slug }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="group relative rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 md:p-8 flex flex-col md:flex-row gap-6 overflow-hidden transition-all duration-300 hover:border-[var(--accent)]/30 hover:shadow-[0_4px_40px_var(--accent-glow)]"
      data-testid={`blog-card-${slug}`}
    >
      {/* Accent stripe on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--accent)] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-full" />

      {/* Left — date column (victoreke style) */}
      <div className="md:w-40 shrink-0 flex md:flex-col gap-3 md:gap-2">
        <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)] text-xs font-mono">
          <Calendar size={11} />
          {date}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)] text-xs font-mono">
          <Clock size={11} />
          {readTime}
        </span>
        <span className="px-2 py-0.5 rounded-md bg-[var(--accent-dim)] text-[var(--accent)] text-[10px] font-mono tracking-wide w-fit">
          {tag}
        </span>
      </div>

      {/* Right — content */}
      <div className="flex-1 flex flex-col gap-3">
        <h3 className="font-display text-lg md:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200 leading-snug">
          {title}
        </h3>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-2">
          {excerpt}
        </p>
        <button className="flex items-center gap-1.5 text-[var(--text-muted)] text-xs font-medium mt-1 hover:text-[var(--accent)] transition-colors w-fit group/btn" data-testid="button-read-more">
          Read article
          <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.article>
  );
}