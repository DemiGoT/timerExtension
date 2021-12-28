import React, { useState } from 'react'
import './auth.css';
import { getToken, storageWorker } from "../logic/authLogic";

function Auth() {

    const [inputValue, setInputValue] = useState(null);

    function handleChange(event) {
        setInputValue({ ...inputValue, [event.target.name]: event.target.value });
    }
    
    const validation = () => {

        const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!inputValue) {
            return alert('Fields is required');
        }

        if (!inputValue.email) {
            return alert('Email is required');
        }

        if (!inputValue.email.match(regexp)) {
            return alert('Invalid email');
        }

        if (!inputValue.password) {
            return alert('Password is required');
        }

        getToken(inputValue).then((value) => {
            storageWorker(value);
        });

    }

    return (
        <div className="auth">
            <div className="auth-wrap">
                <h3 className="auth__headline">Login</h3>
                <div className="auth-form">
                    <label className="auth-form__headline">Email</label>
                    <input className="auth-form__input" placeholder="Enter email" defaultValue="" name="email" type="email" onChange={(e) => handleChange(e)}></input>
                    <label className="auth-form__headline">Password</label>
                    <input className="auth-form__input" placeholder="Enter password" defaultValue="" name="password" type="password" onChange={(e) => handleChange(e)}></input>
                    <button className="auth-form__button" onClick={() => validation()}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Auth;
