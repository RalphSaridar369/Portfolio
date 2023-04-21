import React from "react";
import "./About.scss";
import { about_us_text, our_approach_texts } from "./Static";
import Hero from "./hero/Hero";

const About = () => {
  return (
    <div className="about-container" id="#about">
      <Hero />

      <h4>Our Approach</h4>
      {our_approach_texts.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  );
};

export default About;
