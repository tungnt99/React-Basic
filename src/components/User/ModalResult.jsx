import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props;

    const handleClose = () => setShow(false);
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Your Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Questions: <b>{dataModalResult.countCorrect}</b></div>
                    <div>Total Correct answers: <b>{dataModalResult.countTotal}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary">
                        Show answer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalResult