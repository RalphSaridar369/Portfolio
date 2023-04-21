import LaptopCanvas from "../canvas/Laptop";
import "./Hero.scss";
import { about_us_text, our_approach_texts } from "../Static";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="welcome-container">
        <h2>Welcome to TechFanatics!</h2>
        <p>{about_us_text}</p>
      </div>
      <LaptopCanvas />
    </div>
  );
};

export default Hero;
