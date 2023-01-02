import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";

export default function ModalViewUser(props) {
    // react lightbox
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: '',
    });
    // end react lightbox
    const { show, setShow, dataUpdateUser } = props;
    const handleClose = () => {
        setShow(false)
    };

    // state
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState("");
    const [role, setRole] = useState('USER');
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdateUser)) {
            setEmail(dataUpdateUser.email);
            setUserName(dataUpdateUser.username);
            setRole(dataUpdateUser.role);
            if (dataUpdateUser.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdateUser.image}`)
            }
        }
    }, [dataUpdateUser])

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
                    <Modal.Title>Modal View User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" disabled className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                disabled
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={userName} onChange={(event) => setUserName(event.target.value)} disabled />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Role</label>
                            <select className="form-select" value={role} onChange={(event) => setRole(event.target.value)} disabled>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor='upload-image' role="button"> <FcPlus /> Upload File Image</label>
                            <input type="file" className="form-control" id="upload-image" hidden />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} alt={previewImage} onClick={() => handlePreviewImage()} style={{ cursor: 'pointer' }} />
                                :
                                <span>Preview Image</span>

                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {isPreviewImage === true &&
                <Lightbox image={dataImagePreview.url} title={dataImagePreview.title} onClose={() => setIsPreviewImage(false)}></Lightbox>
            }
        </>
    );
}

