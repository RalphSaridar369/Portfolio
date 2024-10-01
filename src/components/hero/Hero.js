import LaptopCanvas from "./canvas/Laptop";
import "./Hero.scss";
import { about_us_text } from "../about/Static";

const Hero = () => {
  return (
    <div className="hero-container" id="home">
      <div className="welcome-container">
        <h2>Hello There! I Am Ralph Saridar</h2>
        <h5 className="hero-description-text">{about_us_text}</h5>
      </div>
      <LaptopCanvas />
    </div>
  );
};

export default Hero;
