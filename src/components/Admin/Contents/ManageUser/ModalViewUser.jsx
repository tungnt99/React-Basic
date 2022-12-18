import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import _ from 'lodash';
export default function ModalViewUser(props) {
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
    return (
        <>


            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Modal Update User</Modal.Title>
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
                            <input type="text" className="form-control" value={userName} onChange={(event) => setUserName(event.target.value)} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Role</label>
                            <select className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
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
                                <img src={previewImage} alt={previewImage} />
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
        </>
    );
}

