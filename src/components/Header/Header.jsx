import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../logo.svg';
import './assets/header.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const [avatar, setAvatar] = useState();
  // Login Redux
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account)
  // console.log('account', account.email)
  // console.log('isAuthenticated', isAuthenticated)

  useEffect(() => {
    if (account.image) {
      setAvatar(`data:image/jpeg;base64,${account.image}`)
    }

  }, [account.image])
  // End Login Redux
  const navigate = useNavigate();
  const handleClickLogin = () => {
    navigate('/login');
  }
  const handleClickRegister = () => {
    navigate('/register');
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
            {isAuthenticated === false ?
              <>
                <button className='btn btn-light me-2' onClick={() => handleClickLogin()}>Login</button>
                <button className='btn btn-dark me-2' onClick={() => handleClickRegister()}>Sign up</button>
              </>
              :
              <>
                <span className='user-name'>{account.username}</span>
                <NavDropdown style={{
                  backgroundImage: `url(${avatar})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
                  id="basic-nav-dropdown"
                  className='nav-dropdown'>
                  <NavLink className='nav-link' to="/login">Logout</NavLink>
                  <NavLink className='nav-link' to="#action/3.3">Profile</NavLink>
                </NavDropdown>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


