import React, { useState, useEffect } from 'react'
import ModalCreateUser from './ModalCreateUser'
import './assets/manage.scss';
import { FcPlus } from "react-icons/fc";
// import TableUser from './TableUser';
import { getAllUsersPaginate } from '../../../../services/apiServices';
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from './ModalDeleteUser';
import TableUserPaginate from './TableUserPaginate';

export default function ManageUsers(props) {
  const [listUsers, setListUsers] = useState([]);
  const [dataUpdateUser, setDataUpdateUser] = useState({});
  const [dataDeleteUser, setDataDeleteUser] = useState({});

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

  // get user paginate
  const LIMIT_USER = 5;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // end get user paginate
  useEffect(() => {
    // fetchListUsers()
    fetchListUserPaginate(1)
  }, [])
  // const fetchListUsers = async () => {
  //   let data = await getAllUsers();
  //   if (data.EC === 0) {
  //     setListUsers(data.DT)
  //   }
  // }
  const fetchListUserPaginate = async(page) => {
    let data = await getAllUsersPaginate(page, LIMIT_USER)
    // console.log("check data pagenate", data);
    if (data.EC === 0) {
      setListUsers(data.DT.users)
      setPageCount(data.DT.totalPages)
    }
  }
  // console.log(listUsers);
  // tạo function click để ẩn hiện modal update user
  const handleModalUpdateUser = (user) => {
    setShowModalUpdateUser(true);
    // console.log('update user', user);
    setDataUpdateUser(user);
  }
  const handleModalViewUser = (user) => {
    setShowModalViewUser(true);
    setDataUpdateUser(user);
  }
  const handleModalDeleteUser = (user) => {
    setShowModalDeleteUser(true);
    setDataDeleteUser(user);
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
            {/* <TableUser
              listUsers={listUsers}
              setListUsers={setListUsers}
              handleModalUpdateUser={handleModalUpdateUser}
              handleModalViewUser={handleModalViewUser}
              handleModalDeleteUser={handleModalDeleteUser}
            /> */}
            <TableUserPaginate 
              listUsers={listUsers}
              setListUsers={setListUsers}
              handleModalUpdateUser={handleModalUpdateUser}
              handleModalViewUser={handleModalViewUser}
              handleModalDeleteUser={handleModalDeleteUser}
              fetchListUserPaginate={fetchListUserPaginate}
              pageCount={pageCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <ModalCreateUser
            show={showModalCreateUser}
            setShow={setShowModalCreateUser}
            // fetchListUsers={fetchListUsers}
            fetchListUserPaginate={fetchListUserPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <ModalUpdateUser
            show={showModalUpdateUser}
            setShow={setShowModalUpdateUser}
            dataUpdateUser={dataUpdateUser}
            // fetchListUsers={fetchListUsers}
            fetchListUserPaginate={fetchListUserPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            resetUpdateData={resetUpdateData}
          />
          <ModalViewUser
            show={showModalViewUser}
            setShow={setShowModalViewUser}
            dataUpdateUser={dataUpdateUser}
          />
          <ModalDeleteUser 
            show={showModalDeleteUser}
            setShow={setShowModalDeleteUser}
            dataDeleteUser={dataDeleteUser}
            // fetchListUsers={fetchListUsers}
            fetchListUserPaginate={fetchListUserPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}
