import React from "react";
import "./Projects.scss";
import Card from "./card/Card";
import { projects } from "./Static";

const Projects = () => {
  return (
    <div className="projects" id="projects">
      <h2 style={{ marginTop: 20 }}>Projects</h2>
      <div className="projects-container" id="projects">
        {projects.map((project) => (
          <Card data={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
