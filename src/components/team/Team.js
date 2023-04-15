import React from "react";
import "./Team.scss";
// import { Card, Col, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { team_data } from "./Static";

const Team = () => {
  return (
    <div className="team-container">
      <h2>Team</h2>
      <br />

      <Row xs={12} md={2}>
        {team_data.map((person, idx) => (
          <div key={idx}>
            <Col>
              <Card className="team-card">
                <Card.Img
                  className="team-card-img"
                  variant="top"
                  src={person.img}
                />

                {/* <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Skills</Accordion.Header> */}
                <div className="team-card-info">
                  <Card.Body>
                    <Card.Title className="primary-color card-title">
                      {person.name}
                    </Card.Title>
                    <Card.Title className="secondary-color card-subtitle">
                      {person.position}
                    </Card.Title>

                    <div className="card-skill-container">
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
                  </Card.Body>
                </div>
                {/* </Accordion.Item>
                      </Accordion> */}
              </Card>
            </Col>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default Team;
