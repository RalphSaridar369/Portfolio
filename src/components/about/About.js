import React from "react";
import "./About.scss";
import { our_approach_texts } from "./Static";

const About = () => {
  return (
    <div className="about-container" id="about">
      <h2>About me</h2>
      <p className="about-container-text">
        I'm a full-stack developer experienced in both backend and frontend
        technologies, including Node.js, React, and React Native. I specialize
        in B2B marketplace development and have successfully led projects that
        focus on creating performant APIs in Express using TypeORM. I’ve worked
        with real-time data when needed and have integrated third-party services
        like Twilio and SendGrid to enhance functionality. I’m also skilled when
        it comes to solving bugs, thinking outside the box, and continuously
        learning new technologies to tackle new challenges.
      </p>
    </div>
  );
};

export default About;
