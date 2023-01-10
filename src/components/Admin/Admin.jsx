import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import { FaBars } from 'react-icons/fa';
import './assets/admin.scss'
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import PerfectScrollbar from 'react-perfect-scrollbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import Language from '../Header/Language';


export default function Admin(props) {
  // translation
  const { t } = useTranslation();
  // end translation
  const [collapsed, setCollapsed] = useState(false);
  const [title] = useState('Admin');

  useEffect(() => {
    document.title = title;
  }, [title])
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content" role="button">
        <div className='admin-header'>
          <FaBars onClick={() => setCollapsed(!collapsed)} />
          <div className='d-flex align-items-center gap-3'>
            <Language />
            <NavDropdown title={t('header.setting')} id="basic-nav-dropdown-admin">
              <NavDropdown.Item className='nav-link px-3' to="#action/3.3">{t('header.profile')}</NavDropdown.Item>
              <NavDropdown.Item className='nav-link px-3'>{t('header.logout')}</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <div className='admin-main'>
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>

    </div>
  )
}
