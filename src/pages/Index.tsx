import HeroEnhanced from "@/components/HeroEnhanced";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Projects from "@/components/Projects";
import SelectedWorks from "@/components/SelectedWorks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroEnhanced />
      <About />
      <Resume />
      <SelectedWorks />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
