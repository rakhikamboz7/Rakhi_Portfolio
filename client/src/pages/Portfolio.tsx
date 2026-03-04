import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Blogs from "../components/Blogs";
import ArtGallery from "../components/ArtGallery";
import Footer from "../components/Footer";
import ContactPanel from "../components/Contact";
import { ThemeProvider } from "../components/ThemeProvider";

export default function Portfolio() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar onContactOpen={() => setContactOpen(true)} />
        <main>
          <Hero onContactOpen={() => setContactOpen(true)} />
          <About />
          <Projects />
          <Skills />
          <Blogs />
          <ArtGallery />
        </main>
        <Footer onContactOpen={() => setContactOpen(true)} />
        <ContactPanel
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
          onOpen={() => setContactOpen(true)}
        />
      </div>
    </ThemeProvider>
  );
}