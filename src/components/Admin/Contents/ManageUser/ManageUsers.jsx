import React, { useState } from 'react'
import ModalCreateUser from './ModalCreateUser'
import './assets/manage.scss';
import { FcPlus } from "react-icons/fc";

export default function ManageUsers(props) {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  return (
    <div className="manage-user-container container">
      <div className="title">
        Manage User
      </div>
      <div className="manage-user-content">
        <div className='btn-add-user'>
          <button className='btn btn-success' onClick={() => setShowModalCreateUser(true)}><FcPlus /> Add new users</button>
        </div>
        <div className='create-user-content'>
          <ModalCreateUser
            show={showModalCreateUser}
            setShow={setShowModalCreateUser}
          />
        </div>
      </div>
    </div>
  )
}
