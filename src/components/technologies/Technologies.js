import React from "react";

import BallCanvas from "./canvas/Ball";
import { technologies } from "./Static";
import "./Technologies.scss";

const Tech = () => {
  return (
    <div className="technologies_container" id="#skills">
      <h2>Skills</h2>
      <br />
      <div className="skills_container">
        {technologies.map((technology) => {
          return (
            <div className="w-28 h-28" key={technology.name}>
              <BallCanvas icon={technology.icon} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tech;
