import React from 'react';
import ReactPaginate from "react-paginate";
import { useTranslation } from 'react-i18next';


export default function TableUserPaginate(props) {
    // translation
    const { t } = useTranslation();
    // end translation
    const { listUsers, fetchListUserPaginate, pageCount } = props;
    const handlePageClick = (event) => {
        fetchListUserPaginate(+event.selected + 1);
        props.setCurrentPage(+event.selected + 1)
        // console.log(
        //     `User requested page number ${event.selected + 1}`
        // );
    };
    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">{t('tableuser.username')}</th>
                        <th scope="col">Email</th>
                        <th scope="col">{t('tableuser.role')}</th>
                        <th scope="col">{t('tableuser.action')}</th>
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
                                    <button className='mx-2 my-1 btn--actions--user btn btn-info' onClick={() => props.handleModalViewUser(item)}>{t('tableuser.view')}</button>
                                    <button className='mx-2 my-1 btn--actions--user btn btn-warning' onClick={() => props.handleModalUpdateUser(item)}>{t('tableuser.edit')}</button>
                                    <button className='mx-2 my-1 btn--actions--user btn btn-danger' onClick={() => props.handleModalDeleteUser(item)}>{t('tableuser.delete')}</button>

                                </td>

                            </tr>
                        )
                    })}
                    {listUsers && listUsers.length === 0 && <tr><td colSpan={'5'} className="text-center">{t('tableuser.notdata')}</td></tr>}

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
