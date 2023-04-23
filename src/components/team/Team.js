import React from "react";
import "./Team.scss";
// import { Card, Col, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { team_data } from "./Static";
import CardTeam from "./card/Card";

const Team = () => {
  return (
    <div className="team-container">
      <h2>Team</h2>
      <br />

      <Row xs={12} md={2} xl={4} className="team-card-container">
        {team_data.map((person, idx) => (
          <div key={idx}>
            <Col>
              <CardTeam person={person} />
            </Col>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default Team;
