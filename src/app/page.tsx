import Navbar from "@/components/Navbar";
import TerminalIntro from "@/components/TerminalIntro";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import HowIThink from "@/components/HowIThink";
import CurrentlyExploring from "@/components/CurrentlyExploring";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TerminalIntro />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Research />
        <Projects />
        <Experience />
        <Achievements />
        <HowIThink />
        <CurrentlyExploring />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
