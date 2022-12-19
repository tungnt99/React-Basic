import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../../services/apiServices';

const ModalDeleteUser = (props) => {
    const {show, setShow, dataDeleteUser} = props;

    const handleClose = () => setShow(false);

    const handleDeleteUser = async() => {
        let data = await deleteUser(dataDeleteUser.id);
        // console.log("check data delete", data);
        if(data && data.EC === 0){
            toast.success(data.EM);
            handleClose();
            props.setCurrentPage(1)
            // await props.fetchListUsers();
            await props.fetchListUserPaginate(1);
        }
        if(data && data.EC !== 0){
            toast.error(data.EM);
            handleClose();
            props.setCurrentPage(1)
            // await props.fetchListUsers();
            await props.fetchListUserPaginate(1);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete User?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure delete this user.email = <b>{dataDeleteUser && dataDeleteUser.email ? dataDeleteUser.email : ""}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser