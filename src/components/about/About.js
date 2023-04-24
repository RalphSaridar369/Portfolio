import React from "react";
import "./About.scss";
import { about_us_text, our_approach_texts } from "./Static";

const About = () => {
  return (
    <div className="about-container" id="about">
      <h4>Our Approach</h4>
      <div className="shapes-container">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      {our_approach_texts.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  );
};

export default About;
