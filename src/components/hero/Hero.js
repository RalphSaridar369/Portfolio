import LaptopCanvas from "./canvas/Laptop";
import "./Hero.scss";
import { about_us_text, our_approach_texts } from "../about/Static";

const Hero = () => {
  return (
    <div className="hero-container" id="home">
      <div className="welcome-container">
        <h1>Welcome to TechFanatics!</h1>
        <h5 className="hero-description-text">{about_us_text}</h5>
      </div>
      <LaptopCanvas />
    </div>
  );
};

export default Hero;
