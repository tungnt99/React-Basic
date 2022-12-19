import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../logo.svg';
import './assets/header.scss'
export default function Header() {
  const navigate = useNavigate();
  const handleClickLogin = () => {
    navigate('/login');
  }
  return (
    <Navbar>
      <Container className='navbar-container'>
        <NavLink className="nav-link fw-bold navbar-brand" to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" activeclassname="active" to="/">Home</NavLink>
            <NavLink className="nav-link" activeclassname="active" to="/user">User</NavLink>
            <NavLink className="nav-link" activeclassname="active" to="/admin">Admin</NavLink>
          </Nav>
          <Nav>
            <button className='btn btn-light me-2' onClick={() => handleClickLogin()}>Login</button>
            <button className='btn btn-dark me-2'>Sign up</button>
            {/* <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavLink className='nav-link' to="/login">Login</NavLink>
              <NavLink className='nav-link' to="#action/3.2">Logout</NavLink>
              <NavLink className='nav-link' to="#action/3.3">Profile</NavLink>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


