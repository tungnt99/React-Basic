import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../services/apiServices';
import { useTranslation } from 'react-i18next';

export default function ModalDeleteQuiz(props) {
    // translation
    const { t } = useTranslation();
    // end translation
    const { show, setShow, dataDeleteQuiz } = props;
    const handleClose = () => setShow(false);

    const handleDeleteQuiz = async () => {
        let data = await deleteQuiz(dataDeleteQuiz.id);
        console.log('dataDelete: ', data);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchAllDataQuiz();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
            handleClose();
            await props.fetchAllDataQuiz();
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{t('deletequiz.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('deletequiz.body')} = <b>{dataDeleteQuiz && dataDeleteQuiz.name ? dataDeleteQuiz.name : ""}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('deletequiz.cancel')}
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteQuiz()}>
                        {t('deletequiz.confirm')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
