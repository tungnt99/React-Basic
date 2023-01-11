import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FcPlus } from "react-icons/fc";
import Lightbox from "react-awesome-lightbox";
import _ from 'lodash';
import { refreshToken, updateProfile } from '../../services/apiServices';
import { toast } from 'react-toastify';

export default function UserInfo() {
    // translation
    const { t } = useTranslation();
    // end translation
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState("");
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: '',
    });
    const account = useSelector(state => state.user.account);
    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            setEmail(account.email);
            setUserName(account.username);
            setRole(account.role);
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64,${account.image}`)
            }
        }
    }, [account])
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])

        } else {
            // setPreviewImage("");
        }
        // console.log("upload file", event.target.files[0]);
    }
    const handlePreviewImage = () => {
        setDataImagePreview({
            url: previewImage,
            title: previewImage
        })
        setIsPreviewImage(true)
    }

    const handleSubmit = async() => {
        let res = await updateProfile(account.id, userName, image);
        if(res && res.EC === 0){
            toast.success(res.EM)
            await refreshToken();
        }else{
            toast.error(res.EM)
        }
    }
    return (
        <div className='user-info-container'>
        
            <form className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" disabled className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">{t('createuser.username')}</label>
                    <input type="text" className="form-control" value={userName} onChange={(event) => setUserName(event.target.value)} />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">{t('createuser.role')}</label>
                    <select disabled className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                        <option value="USER">{t('createuser.user')}</option>
                        <option value="ADMIN">{t('createuser.admin')}</option>
                    </select>
                </div>
                <div className="col-md-4">
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
                <div className='form-group mt-3'>
                    <button className='btn btn-danger' onClick={() => handleSubmit()}>Update</button>

                </div>
            </form>
            {isPreviewImage === true &&
                <Lightbox image={dataImagePreview.url} title={dataImagePreview.title} onClose={() => setIsPreviewImage(false)}></Lightbox>
            }
        </div>
    )
}
