import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../../images/logo.png'
import './Header.scss' 

function Header() {
  return (
    <>
    <Navbar bg="light" expand="lg" className='navbar'>
      <Container>
        <Navbar.Brand href="#home">
            <a href="/">
                <img src={Logo} className='logo' alt="TechFanatics"/>
            </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">About Us</Nav.Link>
            <Nav.Link href="#link">The Team</Nav.Link>
            <Nav.Link href="#link">Services</Nav.Link>
            <Nav.Link href="#link">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className='lighter'></div>
    </>
  );
}

export default Header;