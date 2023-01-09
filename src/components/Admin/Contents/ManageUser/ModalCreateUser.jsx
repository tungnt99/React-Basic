import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { postCresteNewUser } from '../../../../services/apiServices';
import Lightbox from "react-awesome-lightbox";
import { useTranslation } from 'react-i18next';

export default function ModalCreateUser(props) {
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

        let data = await postCresteNewUser(email, password, userName, role, image);
        console.log(data);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // Cập nhật vào listUsers
            props.setCurrentPage(1)
            // await props.fetchListUsers();
            await props.fetchListUserPaginate(1);

        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
            // Cập nhật vào listUsers
            props.setCurrentPage(1)
            // await props.fetchListUsers();
            await props.fetchListUserPaginate(1);
        }
    }

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
                    <Modal.Title>{t('createuser.adduser')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">{t('createuser.password')}</label>
                            <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">{t('createuser.username')}</label>
                            <input type="text" className="form-control" value={userName} onChange={(event) => setUserName(event.target.value)} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">{t('createuser.role')}</label>
                            <select className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                                <option value="USER">{t('createuser.user')}</option>
                                <option value="ADMIN">{t('createuser.admin')}</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor='upload-image' role="button"> <FcPlus />{t('createuser.uploadimage')}</label>
                            <input type="file" className="form-control" id="upload-image" hidden onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} alt={image} onClick={() => handlePreviewImage()} style={{ cursor: 'pointer' }} />
                                :
                                <span>{t('createuser.preview')}</span>

                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('createuser.close')}
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        {t('createuser.save')}
                    </Button>
                </Modal.Footer>
            </Modal>
            {isPreviewImage === true &&
                <Lightbox image={dataImagePreview.url} title={dataImagePreview.title} onClose={() => setIsPreviewImage(false)}></Lightbox>
            }
        </>
    );
}

