import _ from 'lodash';
import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalViewQuiz(props) {
    const { show, setShow, dataViewQuiz } = props;
    const handleClose = () => {
        setShow(false);
    }
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState("EASY");
    const [previewImage, setPreviewImage] = useState("");

    useEffect((difficulty) => {
        if (!_.isEmpty(dataViewQuiz)) {
            setName(dataViewQuiz.name);
            setDescription(dataViewQuiz.description);
            setDifficulty(dataViewQuiz.difficulty);
            if (dataViewQuiz.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataViewQuiz.image}`)
            }
        }
    }, [dataViewQuiz])
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Modal View Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='add-new'>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" placeholder='Your quiz name' value={name} onChange={(event) => setName(event.target.value)} disabled/>
                                <label>Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" placeholder='Description' value={description} onChange={(event) => setDescription(event.target.value)} disabled/>
                                <label >Description</label>
                            </div>
                            <div className=' mb-3'>
                                <label className="form-label">Type</label>
                                <select className="form-select" value={difficulty} onChange={(event) => setDifficulty(event.target.value)} disabled>
                                    <option value="EASY">EASY</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="HARD">HARD</option>

                                </select>
                            </div>
                            <div className='col-md-12 img-preview'>
                                {previewImage ?
                                    <img src={previewImage} alt={previewImage} />
                                    :
                                    <span>Preview Image</span>
                                }
                            </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
