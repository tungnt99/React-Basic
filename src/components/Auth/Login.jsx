import React, { useState } from 'react'
import './assets/formlogin.scss'
export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        alert("login");
    }
    return (
        <div className="login-container">
            <div className="header">
                <div className="header-text" >
                    <span className="header-text-info">
                        Don't have an account yet?
                    </span>
                    <button className="btn btn-outline-dark mx-2">
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
                        <button className="btn btn-dark" onClick={() => handleLogin()}>Log in to Typeform</button>

                    </div>
                </div>

            </div>
        </div>
    )
}
