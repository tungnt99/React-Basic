import React from 'react';
import ReactPaginate from "react-paginate";


export default function TableUserPaginate(props) {
    const { listUsers, fetchListUserPaginate, pageCount } = props;

    const handlePageClick = (event) => {
        fetchListUserPaginate(+event.selected + 1);
        props.setCurrentPage(+event.selected + 1)
        console.log(
            `User requested page number ${event.selected + 1}`
        );
    };
    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                        return (
                            <tr key={index + 1}>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button className='mx-2 btn btn-info' onClick={() => props.handleModalViewUser(item)}>View</button>
                                    <button className='mx-2 btn btn-warning' onClick={() => props.handleModalUpdateUser(item)}>Edit</button>
                                    <button className='mx-2 btn btn-danger' onClick={() => props.handleModalDeleteUser(item)}>Delete</button>

                                </td>

                            </tr>
                        )
                    })}
                    {listUsers && listUsers.length === 0 && <tr><td colSpan={'5'}>Not found data</td></tr>}

                </tbody>
            </table>
            <div className='user-paginate d-flex justify-content-center'>
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />

            </div>
        </>
    )
}
