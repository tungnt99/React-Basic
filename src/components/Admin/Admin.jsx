import React, { useState } from 'react'
import SideBar from './SideBar'
import { FaBars } from 'react-icons/fa';
import './assets/admin.scss'
export default function Admin(props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed}/>
      </div>
      <div className="admin-content" role="button">
        <FaBars onClick={() => setCollapsed(!collapsed)}/>
      </div>
    </div>
  )
}
