import React, { useState } from "react";
import "./Card.scss";

const Card = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleIsHovered = (value) => {
    setIsHovered(value);
  };

  const handleOnClick = () => {
    setIsHovered(!isHovered);
  };
  return (
    <div
      className="service-card"
      onMouseEnter={() => handleIsHovered(true)}
      onMouseLeave={() => handleIsHovered(false)}
      onClick={handleOnClick}
    >
      <div className={`opacity-${isHovered ? "0" : "1"}-transition`}>
        <img src={props.icon} alt="icon" />
        <h4 className="card-title">{props.name}</h4>
        <p className="card-description">{props.description}</p>
      </div>
      <div
        className={`pricing-container opacity-${
          isHovered ? "1" : "0"
        }-transition`}
      >
        <h3 className="pricing-title">Pricing</h3>
        {props.pricing.map((item, index) => {
          return (
            <p className="pricing-detail" key={index}>
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
