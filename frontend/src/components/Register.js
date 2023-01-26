import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { useNavigate } from "react-router-dom";

import Messages from './Messages';
import Loader from './Loader';

import u from '../media/user.png'


function Register() {

    const [user_name, setUser_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');


  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister);
  const {error, loading, userInfo} = userRegister;

  const navigate = useNavigate();
  const path = '/';

  useEffect(()=> {
    if (userInfo) {
      navigate(path);
    }
  }, [userInfo])


  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword){
      setMessage('Passwords must match!')
    } else {
      dispatch(register(user_name, email, password))
    }
  }


    return (
        <div>
            {message && <Messages>{message}</Messages>}
            {error && <Messages>{error}</Messages>}
            {loading ?
                <Loader /> :
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
                            className="user_name"
                            onChange={(e) => setUser_name(e.target.value)}
                            value={user_name}
                            name="user_name"
                            type="text"
                            required
                            placeholder="User_Name"
                        />
                        <input
                            className="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name="email"
                            type="email"
                            autoComplete='email'
                            required
                            placeholder="Email adress"
                        />
                        <input
                            className="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                        />
                        <input
                            className="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                        />

                        <div className="buttons">
                            <button className="btn-sign-up" >
                                <a href="/login">
                                    Sign in
                                </a>
                            </button>



                            <button type="submit" className="btn-sign-in">
                                Sign up
                            </button>
                        </div>
                        
                    </form>
                </div>
            }
        </div>
    )
}

export default Register