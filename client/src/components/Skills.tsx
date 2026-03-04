import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
//todo: remove mock functionality
const skills = [
  {
    name: "React",
    icon: "⚛️",
    color: "from-blue-500 to-cyan-400",
    relationship: "Best Friends",
    quote: "She loves to code with me. Together we've built amazing user experiences that users can't stop talking about.",
    projects: "15+ projects",
    feeling: "Pure Joy"
  },
  {
    name: "Node.js",
    icon: "🟢",
    color: "from-green-500 to-emerald-400",
    relationship: "Trusted Partner",
    quote: "We built scalable backends together. She knows my strengths and I know how to support her vision.",
    projects: "12+ projects",
    feeling: "Confident"
  },
  {
    name: "MongoDB",
    icon: "🍃",
    color: "from-green-600 to-lime-500",
    relationship: "Database Soulmate",
    quote: "She stores her dreams in me. Every schema she designs shows her deep understanding of data architecture.",
    projects: "10+ projects",
    feeling: "Trusted"
  },
  {
    name: "TypeScript",
    icon: "📘",
    color: "from-blue-600 to-indigo-500",
    relationship: "Type-Safe Companion",
    quote: "She appreciates my precision. Together we catch bugs before they happen and build robust applications.",
    projects: "20+ projects",
    feeling: "Professional"
  },
  {
    name: "Figma",
    icon: "🎨",
    color: "from-purple-500 to-pink-500",
    relationship: "Creative Canvas",
    quote: "She paints her ideas on me. Every pixel she places tells a story of beautiful design.",
    projects: "30+ designs",
    feeling: "Inspired"
  },
  {
    name: "Tailwind",
     icon: (
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
        alt="Tailwind CSS"
        className="w-12 h-12"
      />
    ),
    color: "from-cyan-500 to-blue-400",
    relationship: "Style Partner",
    quote: "She makes me dance across her components. Our utility-first approach creates stunning interfaces.",
    projects: "25+ projects",
    feeling: "Stylish"
  },
  {
    name: "Next.js",
    icon: "▲",
    color: "from-gray-700 to-gray-900",
    relationship: "New Adventure",
    quote: "New to her, but soon we'll be inseparable. She's excited to explore my server-side magic.",
    projects: "3+ projects",
    feeling: "Growing"
  },
  {
    name: "Python",
    icon: "🐍",
    color: "from-yellow-500 to-blue-500",
    relationship: "Versatile Friend",
    quote: "She calls on me for automation and data magic. Together we solve complex problems elegantly.",
    projects: "8+ projects",
    feeling: "Versatile"
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="resume" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">My Tech Stack</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Click on any technology to discover our unique relationship
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-chart-2 rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.1, 
                rotateZ: hoveredIndex === index ? 5 : 0,
                transition: { duration: 0.2 }
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setSelectedSkill(skill)}
              className="relative cursor-pointer group"
              data-testid={`skill-card-${skill.name.toLowerCase()}`}
              style={{ perspective: "1000px" }}
            >
              <div className="relative aspect-square bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl border border-card-border p-6 flex flex-col items-center justify-center gap-3 overflow-hidden hover-elevate active-elevate-2">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                
                <motion.div
                  className="text-4xl md:text-5xl"
                  animate={hoveredIndex === index ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {skill.icon}
                </motion.div>
                
                <h3 className="font-semibold text-sm md:text-base text-center">
                  {skill.name}
                </h3>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={hoveredIndex === index ? { width: "60%" } : { width: 0 }}
                  className={`h-0.5 bg-gradient-to-r ${skill.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedSkill && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSkill(null)}
                className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
                data-testid="skill-modal-backdrop"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200,
                  damping: 25
                }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
              >
                <div 
                  className="relative max-w-2xl w-full pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                  data-testid="skill-modal"
                >
                  <motion.div
                    className={`relative bg-gradient-to-br ${selectedSkill.color} p-1 rounded-3xl`}
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(139, 92, 246, 0)",
                        "0 0 50px 10px rgba(139, 92, 246, 0.3)",
                        "0 0 0 0 rgba(139, 92, 246, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="bg-card rounded-3xl p-8 md:p-12">
                      <button
                        onClick={() => setSelectedSkill(null)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-background/50 backdrop-blur-sm hover-elevate active-elevate-2"
                        data-testid="button-close-skill-modal"
                      >
                        <X className="h-5 w-5" />
                      </button>

                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="text-7xl mb-6 text-center"
                      >
                        {selectedSkill.icon}
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-4xl font-bold text-center mb-3"
                      >
                        {selectedSkill.name}
                      </motion.h3>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${selectedSkill.color} text-white text-sm font-medium mb-6 mx-auto block w-fit`}
                      >
                        {selectedSkill.relationship}
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg md:text-xl text-center leading-relaxed mb-8 italic text-muted-foreground"
                      >
                        "{selectedSkill.quote}"
                      </motion.p>

                      <div className="grid grid-cols-2 gap-6 mt-8">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                          className="text-center p-4 rounded-xl bg-muted/50"
                        >
                          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                            {selectedSkill.projects}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">Together</div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 }}
                          className="text-center p-4 rounded-xl bg-muted/50"
                        >
                          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                            {selectedSkill.feeling}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">Connection</div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
