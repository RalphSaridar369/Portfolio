import React from "react";
import Our_Service from "../../images/our_service.jpg";
import "./Services.scss";
import { our_services } from "./static";
import Card from "./card/Card";

const Services = () => {
  return (
    <div id="services" className="services">
      <h4>Our Services</h4>
      <img className="services-image" src={Our_Service} alt="our service bg" />
      <div className="services-card-container">
        {our_services.map((service, index) => (
          <div key={index}>
            <Card {...service} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
