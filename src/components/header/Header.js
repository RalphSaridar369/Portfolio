import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../images/logo3.png";
import "./Header.scss";
import { links } from "./Static";
import { useState } from "react";

function Header({ scrollTo }) {
  const [backgroundColor, setBackgroundColor] = useState(false);
  const changeBackgroundColor = () => {
    setBackgroundColor(window.scrollY >= 300 ? true : false);
  };

  window.addEventListener("scroll", changeBackgroundColor);

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        className={`navbar ${
          backgroundColor ? "secondary" : "primary"
        }-navbar-color`}
      >
        <Container>
          <Navbar.Brand href="#home">
            <img src={Logo} className="logo" alt="TechFanatics" href="/" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {links.map((link, index) => (
                <Nav.Link
                  key={index}
                  href={"#" + link.link}
                  onClick={(e) => scrollTo(e)}
                >
                  {link.text}
                </Nav.Link>
              ))}
              <Nav.Link
                href="https://github.com/RalphSaridar369"
                alt="github_logo"
                target="_blank"
              >
                <img src={require("../../images/github.png")} />
              </Nav.Link>
              <Nav.Link
                href="https://www.linkedin.com/in/ralph-saridar-7278021b3/"
                alt="linkedin_logo"
                target="_blank"
              >
                <img src={require("../../images/linkedin.png")} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="lighter"></div>
    </>
  );
}

export default Header;
