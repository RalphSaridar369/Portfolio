import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Team from "./components/team/Team";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

function App() {
  const aboutRef = useRef(null);
  const teamRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  const { scrollYProgress } = useScroll();

  const scrollTo = (event) => {
    event.preventDefault();
    const id = event.target.getAttribute("href");

    switch (id) {
      case "#team":
        teamRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "#about":
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
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
          <div ref={aboutRef}>
            <About />
          </div>
          <div ref={teamRef}>
            <Team />
          </div>
        </div>
        <Contact />
        <div ref={contactRef}>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
