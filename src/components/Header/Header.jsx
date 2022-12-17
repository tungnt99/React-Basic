import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink className="nav-link fw-bold" to="/">Thanh Tung</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" activeclassname="active" to="/">Home</NavLink>
            <NavLink className="nav-link" activeclassname="active" to="/user">User</NavLink>
            <NavLink className="nav-link" activeclassname="active" to="/admin">Admin</NavLink>
          </Nav>
          <Nav>

            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavLink className='nav-link' to="#action/3.1">Login</NavLink>
              <NavLink className='nav-link' to="#action/3.2">
                Logout
              </NavLink>
              <NavLink className='nav-link' to="#action/3.3">Profile</NavLink>
             
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


