import React from "react";
import "./Card.scss";

const Card = (props) => {
  return (
    <div className="service-card">
      <div>
        <img src={props.icon} alt="icon" />
        <h4 className="card-title">{props.name}</h4>
        <p className="card-description">{props.description}</p>
      </div>
    </div>
  );
};

export default Card;
