import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import Logo from '../../images/logo.png'
import Logo from "../../images/logo2.png";
import "./Header.scss";

function Header() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="#home">
            <img src={Logo} className="logo" alt="TechFanatics" href="/" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#about">About Us</Nav.Link>
              <Nav.Link href="#team">Team</Nav.Link>
              <Nav.Link href="#services">Services</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="lighter"></div>
    </>
  );
}

export default Header;
