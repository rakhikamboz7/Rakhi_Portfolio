import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  category,
  technologies,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-card rounded-xl overflow-hidden border border-card-border"
      data-testid={`project-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="absolute top-4 right-4 z-10">
        <Badge variant="secondary" className="backdrop-blur-sm bg-background/80">
          {category}
        </Badge>
      </div>

      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          {liveUrl && (
            <a href={liveUrl}
            target="_blank"
            rel="noopener noreferer"
            className="flex-1" data-testid="button-live-demo">
              <Button size ="sm" variant="default" className="w-full" data-testid="button-live-demo">
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
              </Button>
            </a>
          )}
          {githubUrl && (
            <Button size="sm" variant="outline" className="flex-1" data-testid="button-github">
              <Github className="h-4 w-4 mr-2" />
              Code
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
