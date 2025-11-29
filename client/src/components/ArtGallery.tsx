import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import mobileAppImg from "../assets/generated_images/Mobile_app_design_showcase_e0ca896a.png";
import ecommerceImg from "../assets/generated_images/E-commerce_project_thumbnail_33568c07.png"
import taskManagerImg from "../assets/generated_images/Task_manager_project_thumbnail_c0c1c3ac.png";

//todo: remove mock functionality
const artworks = [
  { id: 1, title: "Mobile App Design", tool: "Figma", image: mobileAppImg },
  { id: 2, title: "E-commerce Dashboard", tool: "Adobe XD", image: ecommerceImg },
  { id: 3, title: "Task Manager UI", tool: "Figma", image: taskManagerImg },
  { id: 4, title: "Social Platform", tool: "Sketch", image: mobileAppImg },
  { id: 5, title: "Finance App", tool: "Figma", image: ecommerceImg },
  { id: 6, title: "Fitness Tracker", tool: "Figma", image: taskManagerImg },
];

export default function ArtGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedImage, setSelectedImage] = useState<typeof artworks[0] | null>(null);

  return (
    <section id="art" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Design Gallery</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-chart-2 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {artworks.map((art, index) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(art)}
              className="relative group cursor-pointer aspect-square rounded-xl overflow-hidden bg-card border border-card-border"
              data-testid={`art-item-${art.id}`}
            >
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="font-semibold text-sm mb-1">{art.title}</h3>
                  <p className="text-xs text-muted-foreground">{art.tool}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
              data-testid="lightbox"
            >
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-card hover-elevate"
                data-testid="button-close-lightbox"
              >
                <X className="h-6 w-6" />
              </motion.button>
              
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="max-w-4xl w-full"
              >
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto rounded-xl"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
                  <p className="text-muted-foreground">Created with {selectedImage.tool}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
