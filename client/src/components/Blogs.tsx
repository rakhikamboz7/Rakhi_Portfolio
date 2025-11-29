import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BlogCard from "./BlogCard";
import blogImg from "../assets/generated_images/Blog_featured_image_d6992ef7.png";

//todo: remove mock functionality
const blogs = [
  {
    title: "Building Scalable Web Applications with React and Node.js",
    excerpt: "Learn how to architect and build modern full-stack applications that can handle millions of users with best practices and proven patterns.",
    image: blogImg,
    date: "Oct 15, 2025",
    readTime: "8 min read",
  },
  {
    title: "The Art of UI/UX Design: Creating Delightful User Experiences",
    excerpt: "Explore the principles of great design and how to create interfaces that users love. From color theory to interaction design.",
    image: blogImg,
    date: "Oct 10, 2025",
    readTime: "6 min read",
  },
  {
    title: "Advanced TypeScript Patterns for React Developers",
    excerpt: "Deep dive into TypeScript's powerful type system and how to leverage it for building more robust React applications.",
    image: blogImg,
    date: "Oct 5, 2025",
    readTime: "10 min read",
  },
];

export default function Blogs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="blogs" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Articles</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-chart-2 rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
