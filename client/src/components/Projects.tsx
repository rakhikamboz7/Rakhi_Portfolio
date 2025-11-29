import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "../components/ui/button";
import ecommerceImg from "../assets/generated_images/E-commerce_project_thumbnail_33568c07.png"
import taskManagerImg from "../assets/generated_images/Task_manager_project_thumbnail_c0c1c3ac.png";
import mobileAppImg from "../assets/generated_images/Mobile_app_design_showcase_e0ca896a.png";

//todo: remove mock functionality
const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern online shopping platform with real-time inventory management and secure payment processing",
    image: ecommerceImg,
    category: "Full Stack",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool with drag-and-drop kanban boards and team features",
    image: taskManagerImg,
    category: "Full Stack",
    technologies: ["React", "Express", "PostgreSQL", "Socket.io"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Social Mobile App",
    description: "Beautiful social networking app design with intuitive user experience and modern interface",
    image: mobileAppImg,
    category: "UI/UX",
    technologies: ["Figma", "Adobe XD", "Prototyping"],
    liveUrl: "#",
  },
];

const categories = ["All", "Full Stack", "UI/UX", "Personal"];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-chart-2 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              data-testid={`filter-${category.toLowerCase()}`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
