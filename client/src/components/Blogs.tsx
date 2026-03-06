import ScrollReveal from "./Scrollreveal";
import BlogCard from "./BlogCard";

const blogs = [
  {
    title: "Building Scalable Web Applications with React and Node.js",
    excerpt: "Learn how to architect and build modern full-stack applications that can handle millions of users with best practices and proven patterns.",
    date: "Oct 15, 2025",
    readTime: "8 min read",
    tag: "Engineering",
    slug: "building-scalable-web-apps",
  },
  {
    title: "The Art of UI/UX Design: Creating Delightful User Experiences",
    excerpt: "Explore the principles of great design and how to create interfaces that users love. From color theory to interaction design.",
    date: "Oct 10, 2025",
    readTime: "6 min read",
    tag: "Design",
    slug: "art-of-ui-ux-design",
  },
  {
    title: "Advanced TypeScript Patterns for React Developers",
    excerpt: "Deep dive into TypeScript's powerful type system and how to leverage it for building more robust React applications with type safety.",
    date: "Oct 5, 2025",
    readTime: "10 min read",
    tag: "TypeScript",
    slug: "advanced-typescript-patterns",
  },
  {
    title: "Mastering Framer Motion: Beyond the Basics",
    excerpt: "Take your animations to the next level with shared layout animations, scroll-driven effects, and orchestrating complex sequences.",
    date: "Sep 28, 2025",
    readTime: "7 min read",
    tag: "Animation",
    slug: "mastering-framer-motion",
  },
];

export default function Blogs() {
  return (
    <section id="blogs" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal direction="left">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-[var(--accent)]" />
            <span className="font-mono text-[var(--accent)] text-1xl tracking-widest uppercase">Writing</span>
          </div>
        </ScrollReveal>

        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-[var(--text-primary)] leading-tight tracking-tight">
              Latest articles.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1} direction="right">
            <a
              href="#"
              className="text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--accent)] transition-colors"
            >
              All articles →
            </a>
          </ScrollReveal>
        </div>

        {/* Blog list */}
        <div className="flex flex-col gap-4">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}