import React, { useState, useEffect } from 'react'
import ModalCreateUser from './ModalCreateUser'
import './assets/manage.scss';
import { FcPlus } from "react-icons/fc";
import TableUser from './TableUser';
import { getAllUsers } from '../../../../services/apiServices';
import ModalUpdateUser from './ModalUpdateUser';

export default function ManageUsers(props) {
  const [listUsers, setListUsers] = useState([]);
  const [dataUpdateUser, setDataUpdateUser] = useState({});
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

  useEffect(() => {
    fetchListUsers()
  }, [])
  const fetchListUsers = async () => {
    let data = await getAllUsers();
    if (data.EC === 0) {
      setListUsers(data.DT)
    }
  }
  // console.log(listUsers);
  // tạo function click để ẩn hiện modal update user
  const handleModalUpdateUser = (user) => {
    setShowModalUpdateUser(true);
    // console.log('update user', user);
    setDataUpdateUser(user);
  }
  const resetUpdateData = () => {
    setDataUpdateUser({})
  }
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
          <div className='table-user-container'>
            <TableUser
              listUsers={listUsers}
              setListUsers={setListUsers}
              handleModalUpdateUser={handleModalUpdateUser}
            />
          </div>
          <ModalCreateUser
            show={showModalCreateUser}
            setShow={setShowModalCreateUser}
            fetchListUsers={fetchListUsers}
          />
          <ModalUpdateUser
            show={showModalUpdateUser}
            setShow={setShowModalUpdateUser}
            dataUpdateUser={dataUpdateUser}
            fetchListUsers={fetchListUsers}
            resetUpdateData={resetUpdateData}
          />
        </div>
      </div>
    </div>
  )
}
