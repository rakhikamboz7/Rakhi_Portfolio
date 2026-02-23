import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import profileImg from 
"../assets/generated_images/Rakhi-portfolio.jpg"

const timelineData = [
  {
    year: "2025 - 2026",
    title: "Full Stack Developer",
    company: "Panacea Infosec",
    description: "Built responsive websites and interactive web experiences",
  },
  {
    year: "2021 - 2025",
    title: "B.Tech in Computer Science",
    company: "Eternal University Baru Sahib",
    description: "Specialized in Software Engineering",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-chart-2 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden">
              <img
                src={profileImg}
                alt="Rakhi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            <motion.div
              className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary to-chart-2 rounded-full opacity-20 blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                I'm a passionate developer and designer who loves creating seamless digital experiences. 
                With expertise in both frontend and backend technologies, I bring ideas to life with 
                clean code and beautiful interfaces.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                My approach combines technical excellence with creative problem-solving, ensuring every 
                project is not just functional, but delightful to use.
              </p>
            </motion.div>

            <div className="relative pl-8 space-y-8">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-chart-2 to-transparent" />
              
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="relative"
                  data-testid={`timeline-item-${index}`}
                >
                  <div className="absolute -left-[33px] top-2 w-2 h-2 bg-primary rounded-full ring-4 ring-background" />
                  <div className="text-sm text-primary font-medium mb-1">{item.year}</div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <div className="text-sm text-muted-foreground mb-2">{item.company}</div>
                  <p className="text-sm text-muted-foreground/80">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
