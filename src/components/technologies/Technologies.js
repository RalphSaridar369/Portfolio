import React from "react";

import BallCanvas from "./canvas/Ball";
import { technologies } from "./Static";
import "./Technologies.scss";

const Tech = () => {
  return (
    <>
      <h2 style={{ marginTop: "20px" }}>Skills</h2>
      <div className="technologies_container" id="skills">
        <br />
        <div className="skills_container">
          {technologies.map((technology) => (
            <div className="skills_container_column" key={technology.name}>
              <BallCanvas icon={technology.icon} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tech;
