import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Team from "./components/team/Team";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import Hero from "./components/hero/Hero";
import Services from "./components/services/Services";

function App() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const teamRef = useRef(null);
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
      case "#team":
        teamRef.current.scrollIntoView({ behavior: "smooth" });
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
          <div ref={teamRef}>
            <Team />
          </div>
          <div ref={contactRef}>
            <Contact />
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
