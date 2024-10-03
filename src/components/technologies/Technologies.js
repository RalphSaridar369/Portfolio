import React, { useEffect, useState } from "react";

import BallCanvas from "./canvas/Ball";
import { technologies } from "./Static";
import "./Technologies.scss";

const Tech = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const mobileDevices = /iPhone|iPad|iPod|Android/i;

    if (mobileDevices.test(userAgent)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <>
      <h2 style={{ marginTop: "20px" }}>Skills</h2>
      <div className="technologies_container" id="skills">
        <br />
        <div className="skills_container">
          {!isMobile
            ? technologies.map((technology) => (
                <div className="skills_container_column" key={technology.name}>
                  <BallCanvas icon={technology.icon} />
                </div>
              ))
            : technologies.map((technology) => (
                <div
                  className="skills_container_column bordered"
                  key={technology.name}
                >
                  <img
                    className="skills_container_column_image"
                    alt={technology.name + "_icon"}
                    src={require(`../../images/tech_icons/${technology.icon}`)}
                  />
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Tech;
