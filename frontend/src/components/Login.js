import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../actions/userActions'
import { useNavigate } from "react-router-dom";

import u from '../media/user.png'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);

    const { error, loading, userInfo } = userLogin;

    const navigate = useNavigate();
    const path = '/';

    useEffect(() => {
        if (userInfo) {
            navigate(path);
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }
  



    return (
        <div>
            <div className="main">
                <div className="logo-user">
                    <img src={u} />
                </div>
                <div className="text-count">
                    <h2>
                        Sign in to your account
                    </h2>
                </div>
                <form onSubmit={submitHandler}>
                    <input
                        className="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Email adress"
                    />
                    <input
                        className="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        placeholder="Password"
                    />

                    <div className="buttons">
                        <button className="btn-sign-up" >
                            <a href="/register">
                                Sign up
                            </a>
                        </button>



                        <button type="submit" className="btn-sign-in">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

