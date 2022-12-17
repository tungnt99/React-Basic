import React from 'react'
import ModalCreateUser from './ModalCreateUser'

export default function ManageUsers(props) {
  return (
    <div className="manage-user-container">
    <div className="title">
      Manage User
    </div>
    <div className="user-content">
      {/* <div>
        <button className='btn btn-success'>Add new users</button>
      </div> */}
      <div>
        <ModalCreateUser />
      </div>
    </div>
  </div>
  )
}
