import React from "react";
import "./About.scss";
import { about_us_text, our_approach_texts } from "./Static";

const About = () => {
  return (
    <div className="about-container">
      <h2>Welcome to TechFanatics!</h2>

      <p>{about_us_text}</p>

      <h4>Our Approach</h4>
      {our_approach_texts.map((text) => (
        <p>{text}</p>
      ))}
    </div>
  );
};

export default About;
