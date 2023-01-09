import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../../services/apiServices';
import { useTranslation } from 'react-i18next';

const ModalDeleteUser = (props) => {
    // translation
    const { t } = useTranslation();
    // end translation
    const { show, setShow, dataDeleteUser } = props;
    const handleClose = () => setShow(false);

    const handleDeleteUser = async () => {
        let data = await deleteUser(dataDeleteUser.id);
        // console.log("check data delete", data);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            props.setCurrentPage(1)
            // await props.fetchListUsers();
            await props.fetchListUserPaginate(1);
        }
        if (data && data.EC !== 0) {
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
                    <Modal.Title>{t('deleteuser.title')}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('deleteuser.body')} = <b>{dataDeleteUser && dataDeleteUser.email ? dataDeleteUser.email : ""}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('deleteuser.cancel')}
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteUser()}>
                        {t('deleteuser.confirm')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser