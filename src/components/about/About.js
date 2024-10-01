import React from "react";
import "./About.scss";

const About = () => {
  return (
    <div className="about-container" id="about">
      <h2>About me</h2>
      <p className="about-container-text">
        I'm a full-stack developer with a strong proficiency in modern
        technologies, particularly in JavaScript and TypeScript. I excel in
        building dynamic and scalable applications with React and React Native,
        creating interactive web interfaces and cross-platform mobile apps with
        ease. My server-side expertise in Node.js allows me to develop
        high-performance APIs, while my deep understanding of PostgreSQL and
        MySQL helps me manage complex databases efficiently. I have also
        integrated third-party services such as Postmark, SendGrid, and Twilio
        to enhance communication functionalities within applications.
        Additionally, I’ve worked with Socket.io for real-time features and
        explored technologies like PHP and Laravel. My experience with Python
        mainly revolves around data scraping and building Telegram bots, where
        I've automated tasks and facilitated efficient workflows. While I have
        foundational experience in these areas, I’m particularly driven to
        deepen my knowledge in Python and explore technologies like MeiliSearch
        to provide efficient, full-text search solutions. My passion for
        continuous learning ensures that I stay ahead in meeting new and
        exciting challenges.
      </p>
    </div>
  );
};

export default About;
