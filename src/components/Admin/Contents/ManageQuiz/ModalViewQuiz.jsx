import _ from 'lodash';
import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Lightbox from "react-awesome-lightbox";
import { useTranslation } from 'react-i18next';

export default function ModalViewQuiz(props) {
    // translation
    const { t } = useTranslation();
    // end translation
    // react lightbox
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: '',
    });
    // end react lightbox
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

    const handlePreviewImage = () => {
        setDataImagePreview({
            url: previewImage,
            title: previewImage
        })
        setIsPreviewImage(true)
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>{t('managequiz.viewquiz')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='add-new'>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder='Your quiz name' value={name} onChange={(event) => setName(event.target.value)} disabled />
                            <label>{t('managequiz.name')}</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder='Description' value={description} onChange={(event) => setDescription(event.target.value)} disabled />
                            <label >{t('managequiz.desc')}</label>
                        </div>
                        <div className=' mb-3'>
                            <label className="form-label">{t('managequiz.type')}</label>
                            <select className="form-select" value={difficulty} onChange={(event) => setDifficulty(event.target.value)} disabled>
                                <option value="EASY">{t('managequiz.easy')}</option>
                                <option value="MEDIUM">{t('managequiz.medium')}</option>
                                <option value="HARD">{t('managequiz.hard')}</option>

                            </select>
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} alt={previewImage} onClick={() => handlePreviewImage()} style={{ cursor: 'pointer' }} />
                                :
                                <span>{t('managequiz.preview')}</span>
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('managequiz.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
            {isPreviewImage === true &&
                <Lightbox image={dataImagePreview.url} title={dataImagePreview.title} onClose={() => setIsPreviewImage(false)}></Lightbox>
            }
        </>
    )
}
