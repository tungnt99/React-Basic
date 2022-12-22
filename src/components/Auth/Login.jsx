import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doLogin } from '../../redux/action/useAction';
import { postLogin } from '../../services/apiServices';
import './assets/formlogin.scss'
import { ImSpinner } from "react-icons/im";

export default function Login(props) {
    // login redux
    const dispatch = useDispatch();
    // end login redux
    // Loading
    const [loading, setLoading] = useState(false);
    // End loading
    const navigate = useNavigate();
    const handleBackHome = () => {
        navigate('/')
    }
    const handleBtnRegister = () => {
        navigate('/register');
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    // validate email theo đúng định dạng
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleLogin = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Please enter a valid email');
            return;
        }
        if (!password) {
            toast.error('Please enter a password');
            return;
        }
        // set loading
        setLoading(true);
        // submit api
        let dataLogin = await postLogin(email, password)
        // console.log("check login", dataLogin);
        if (dataLogin && dataLogin.EC === 0) {
            dispatch(doLogin(dataLogin))
            toast.success(dataLogin.EM);
            setLoading(false);
            navigate('/');
        } else {
            toast.error(dataLogin.EM);
            setLoading(false);
        }
    }
    return (
        <div className="login-container">
            <div className="header">
                <div className="header-text" >
                    <span className="header-text-info">
                        Don't have an account yet?
                    </span>
                    <button className="btn btn-outline-dark mx-2" onClick={() => handleBtnRegister()}>
                        Sign up
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
                        <input type={"email"} value={email} className="form-control" placeholder="bruce@wayne.com" onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type={"password"} value={password} className="form-control" placeholder="At least 8 characters" onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className="forgot-password">Forgot password?</div>
                    <div className="btn-login">
                        <button className="btn btn-dark" onClick={() => handleLogin()} disabled={loading}>
                            {loading === true &&
                                <ImSpinner className="mx-2 loading-icons" />
                            }
                            <span>Log in to Typeform</span>
                        </button>
                    </div>
                    <div className="back mt-2">
                        <span onClick={() => handleBackHome()} role="button">Go to back home</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
