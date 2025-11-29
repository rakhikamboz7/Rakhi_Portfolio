import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Achievements from "../components/Achievements";
import Blogs from "../components/Blogs";
import ArtGallery from "../components/ArtGallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";

export default function Portfolio() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Achievements />
        <Projects />
        <Skills />
        <Blogs />
        <ArtGallery />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
