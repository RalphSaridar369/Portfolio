import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "./Card.scss";

const CardTeam = ({ person }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleIsHovered = (value) => {
    setIsHovered(value);
  };

  const handleOnClick = () => {
    setIsHovered(!isHovered);
  };
  return (
    <Card
      className="team-card"
      onMouseEnter={() => handleIsHovered(true)}
      onMouseLeave={() => handleIsHovered(false)}
      onClick={handleOnClick}
    >
      {!isHovered && (
        <Card.Img className="team-card-img" variant="top" src={person.img} />
      )}

      <div className="team-card-info">
        <Card.Body>
          {!isHovered && (
            <>
              {" "}
              <Card.Title className="primary-color card-title">
                {person.name}
              </Card.Title>
              <Card.Title className="secondary-color card-subtitle">
                {person.position}
              </Card.Title>
            </>
          )}

          {isHovered && (
            <div className="card-skill-container">
              <h5>Skills</h5>
              {person.skills.map((skill, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex flex-row align-items-center"
                  >
                    <img
                      src={skill.img}
                      className="card-skill-icon"
                      alt="icon"
                    />
                    <span className="primary-color icon-name">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </Card.Body>
      </div>
    </Card>
  );
};

export default CardTeam;
