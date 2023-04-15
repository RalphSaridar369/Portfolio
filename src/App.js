import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Team from "./components/team/Team";
import { motion, useScroll } from "framer-motion";
import "./index.css";

function App() {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="App">
        <Header />
        <div className="body-wrapper">
          <About />
          <Team />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
