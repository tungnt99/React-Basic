import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';

export default function ModalCreateUser(props) {
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false)
        setEmail("");
        setPassword("");
        setUserName("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
    };

    // state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState("");

    // preview image
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])

        } else {
            // setPreviewImage("");
        }
        // console.log("upload file", event.target.files[0]);
    }

    // validate email
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    // validate form
    const handleSubmitCreateUser = async () => {
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error('please enter a valid email');
            return;
        }

        // buộc người dùng phải nhập mật khẩu
        if (!password) {
            toast.error("Please enter a password");
            return;
        }
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('username', userName);
        data.append('role', role);
        data.append('userImage', image);

        let res = await axios.post('http://localhost:8081/api/v1/participant', data);
        console.log(res);
        if (res.data && res.data.EC === 0) {
            toast.success(res.data.EM)
            handleClose();
        }
        if (res.data && res.data.EC !== 0) {
            toast.error(res.data.EM);
        }
    }
    return (
        <>


            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
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
                            <input type="file" className="form-control" id="upload-image" hidden onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} alt={image} />
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
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

