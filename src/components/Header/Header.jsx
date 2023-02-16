import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../logo.svg';
import './assets/header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { logout } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/useAction';
import Language from './Language';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from "react-icons/fa";
export default function Header() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  // translation
  const { t } = useTranslation();
  // end translation
  const dispatch = useDispatch();
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
  const handleLogout = async () => {
    let res = await logout(account.email, account.refresh_token)
    console.log('check logout', res);
    if (res && res.EC === 0) {
      dispatch(doLogout(res));
      toast.success(res.EM);
      navigate('/login');
    } else {
      toast.error(res.EM)
    }

  }
  const handleClickProfile = () => {
    navigate('/profile');
  }
  return (
    <>
      <header>
        <NavLink className="nav-link fw-bold navbar-brand nav-logo" to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </NavLink>
        <nav ref={navRef}>
          <Nav className="me-auto">
            <NavLink className="nav-link" activeclassname="active" to="/">{t('header.home')}</NavLink>
            <NavLink className="nav-link" activeclassname="active" to="/user">{t('header.user')}</NavLink>
            <NavLink className="nav-link" activeclassname="active" to="/admin">{t('header.admin')}</NavLink>
          </Nav>
          <button
            className="nav-btn nav-close-btn"
            onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <Nav className='info--user'>
          <Language />
          {isAuthenticated === false ?
            <>
              <button className='btn btn-light me-2' onClick={() => handleClickLogin()}>{t('header.login')}</button>
              <button className='btn btn-dark me-2' onClick={() => handleClickRegister()}>{t('header.signup')}</button>
            </>
            :
            <>
              <span className='user-name'>{account.username}</span>
              <NavDropdown style={{
                backgroundImage: `url(${avatar ? avatar : logo})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
                id="basic-nav-dropdown"
                className='nav-dropdown'>
                <NavDropdown.Item onClick={() => handleClickProfile()}>{t('header.profile')}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogout()}>{t('header.logout')}</NavDropdown.Item>
              </NavDropdown>
            </>
          }

        </Nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
    </>
  );
}


