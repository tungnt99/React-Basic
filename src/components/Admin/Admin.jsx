import React, { useState } from 'react'
import SideBar from './SideBar'
import { FaBars } from 'react-icons/fa';
import './assets/admin.scss'
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';

export default function Admin(props) {
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
        </div>
        <div className='admin-main'>
          <Outlet />
        </div>
      </div>
     
    </div>
  )
}
