import React, { useState, useEffect } from 'react'

import ModalCreateUser from './ModalCreateUser'
import './assets/manage.scss';
import { FcPlus } from "react-icons/fc";
import TableUser from './TableUser';
import { getAllUsers } from '../../../../services/apiServices';

export default function ManageUsers(props) {
  const [listUsers, setListUsers] = useState([]);

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  useEffect(() => {
    fetchListUsers()
}, [])
const fetchListUsers = async() => {
    let data = await getAllUsers();
    if(data.EC === 0){
        setListUsers(data.DT)
    }
}
// console.log(listUsers);
  return (
    <div className="manage-user-container container">
      <div className="title">
        Manage User
      </div>
      <div className="manage-user-content">
        <div className='btn-add-user'>
          <button className='btn btn-success' onClick={() => setShowModalCreateUser(true)}><FcPlus /> Add new users</button>
        </div>
        <div className='table-user-container'>
          <TableUser 
            listUsers={listUsers}
            setListUsers={setListUsers}
          />
        </div>
        <div className='create-user-content'>
          <ModalCreateUser
            show={showModalCreateUser}
            setShow={setShowModalCreateUser}
            fetchListUsers={fetchListUsers}
          />
        </div>
      </div>
    </div>
  )
}
