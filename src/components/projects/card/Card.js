import React from "react";
import "./Card.scss";

const Card = ({ data }) => {
  return (
    <div className="project-card">
      <img className="project-card-image" alt="project_icon" src={data.image} />
      <div className="project-card-title-container">
        <p className="project-card-title">{data.title}</p>
        <div className="project-card-links-container">
          {data?.github_link && (
            <a href={data.github_link}>
              <img
                alt="github_icon"
                className="project-card-link"
                src={require("../../../images/github-black.png")}
              />
            </a>
          )}
          {data?.app_link && (
            <a href={data?.app_link}>
              <img
                alt="link_icon"
                className="project-card-link"
                src={require("../../../images/link.png")}
              />
            </a>
          )}
        </div>
      </div>
      <p className="project-card-description">{data.description}</p>
      <p className="project-card-skills">
        {data.skills.map((skill, index) =>
          index === data.skills.length - 1 ? "#" + skill : "#" + skill + " "
        )}
      </p>
    </div>
  );
};

export default Card;
