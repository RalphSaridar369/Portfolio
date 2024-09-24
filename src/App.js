import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Header from "./components/header/Header";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import Hero from "./components/hero/Hero";
import Services from "./components/services/Services";
import Tech from "./components/technologies/Technologies";

function App() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  const { scrollYProgress } = useScroll();

  const scrollTo = (event) => {
    event.preventDefault();
    const id = event.target.getAttribute("href");

    switch (id) {
      case "#home":
        heroRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "#about":
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "#skills":
        skillsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "#services":
        servicesRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "#contact":
        contactRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        return;
    }
  };

  return (
    <>
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="App">
        <Header scrollTo={scrollTo} />
        <div className="body-wrapper">
          <div ref={heroRef}>
            <Hero />
          </div>
          <div ref={aboutRef}>
            <About />
          </div>
          <div ref={servicesRef}>
            <Services />
          </div>
          <div ref={skillsRef}>
            <Tech />
          </div>
          <div ref={contactRef}>
            <Contact />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
