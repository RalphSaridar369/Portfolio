import React from "react";
import "./Card.scss";

const Card = (props) => {
  return (
    <div className="service-card">
      <img src={props.icon} />
      <h4 className="card-title">{props.name}</h4>
      <p className="card-description">{props.description}</p>
    </div>
  );
};

export default Card;
