import _ from 'lodash';
import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { putUpdateDataQuiz } from '../../../../services/apiServices';

export default function ModalUpdateQuiz(props) {
    const { show, setShow, dataUpdateQuiz } = props;

    const handleClose = () => {
        setShow(false);
        setName('');
        setDescription('');
        setDifficulty('EASY');
        setImage('');
        setPreviewImage('');
    }
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState("EASY");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdateQuiz)) {
            setName(dataUpdateQuiz.name);
            setDescription(dataUpdateQuiz.description);
            setDifficulty(dataUpdateQuiz.difficulty);
            if (dataUpdateQuiz.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`)
            }
        }
    }, [dataUpdateQuiz])
    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitQuiz = async () => {
        let data = await putUpdateDataQuiz(dataUpdateQuiz.id, name, description, difficulty, image);
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
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Modal Update Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='add-new'>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" placeholder='Your quiz name' value={name} onChange={(event) => setName(event.target.value)} />
                                <label>Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" placeholder='Description' value={description} onChange={(event) => setDescription(event.target.value)} />
                                <label >Description</label>
                            </div>
                            <div className=' mb-3'>
                                <label className="form-label">Type</label>
                                <select className="form-select" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                                    <option value="EASY">EASY</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="HARD">HARD</option>

                                </select>
                            </div>
                            <div className='more-actions mb-3'>
                                <label>Upload Image</label>
                                <input type="file" className='form-control' onChange={(event) => handleChangeFile(event)} />
                            </div>
                            <div className='col-md-12 img-preview'>
                                {previewImage ?
                                    <img src={previewImage} alt={image} />
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
                    <Button variant="primary" onClick={() => handleSubmitQuiz()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
