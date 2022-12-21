import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postRegister } from '../../services/apiServices';
import './assets/formlogin.scss'
import { VscEye, VscEyeClosed } from "react-icons/vsc";
export default function Register(props) {
    const navigate = useNavigate();
    const handleBackHome = () => {
        navigate('/')
    }
    const handleBtnLogin = () => {
        navigate('/login');
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    // validate email theo đúng định dạng
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleRegister = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Please enter a valid email');
            return;
        }
        if (!password) {
            toast.error('Please enter a password');
            return;
        }

        let data = await postRegister(email, password, username)
        // console.log("check login", dataLogin);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login');
        } else {
            toast.error(data.EM);
        }
    }
    return (
        <div className="login-container">
            <div className="header">
                <div className="header-text" >
                    <span className="header-text-info">
                        Don't have an account yet?
                    </span>
                    <button className="btn btn-outline-dark mx-2" onClick={() => handleBtnLogin()}>
                        Login
                    </button>
                    <a href="https://www.typeform.com/signup/" >Need help?</a>
                </div>
            </div>
            <div className="title col-4 mx-auto">Typeform</div>
            <div className="auth-content col-4 mx-auto">
                <div className="welcome ">Hello, who’s this?</div>
                <div className="content-form ">
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" value={email} className="form-control" placeholder="bruce@wayne.com" onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className='form-password'>
                        <div className="form-group">
                            <label>Password</label>
                            <input type={isShowPassword ? "text" : "password"} value={password} className="form-control" placeholder="At least 8 characters" onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        {isShowPassword ? (
                            <span
                                className="icons-eye"
                                onClick={() => setIsShowPassword(false)}
                            >
                                <VscEyeClosed />
                            </span>
                        ) : (
                            <span
                                className="icons-eye"
                                onClick={() => setIsShowPassword(true)}
                            >
                                <VscEye />
                            </span>
                        )}

                    </div>
                    <div className="form-group">
                        <label>UserName: </label>
                        <input type="text" value={username} className="form-control" placeholder="Thanh Tung" onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div className="forgot-password">Forgot password?</div>
                    <div className="btn-login">
                        <button className="btn btn-dark" onClick={() => handleRegister()}>Create my free account</button>
                    </div>
                    <div className="back mt-2">
                        <span onClick={() => handleBackHome()} role="button">Go to back home</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
