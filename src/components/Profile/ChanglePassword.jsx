import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePassword } from '../../services/apiServices';
export default function ChanglePassword() {
   const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
 
    const handleSubmit = async () => {
        if(newPassword !== confirmPassword){
            toast.error("The password is not correct")
            return;
        }
        let data = await changePassword(currentPassword, newPassword);
        if(data && data.EC === 0){
            toast.success(data.EM)
            navigate('/login');
        }else{
            toast.error(data.EM);
        }
    }
    return (
        <div className='container'>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Current Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}

                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>

            </form>
            <button className='btn btn-danger' onClick={() => handleSubmit()}>Update</button>
        </div>
    )
}
