import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Messages from './Messages'
import Loader from './Loader'
import { getSoloUser, editUser } from '../actions/userActions'
import { USER_EDIT_RESET } from '../constants/userConstans'

const EditProfile = () => {

    const [user_name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uploading, setUploading] = useState(false);


    const navigate = useNavigate();
    const path = '/miPerfil';

    const dispatch = useDispatch();

    const userSolo = useSelector(state => state.userSolo);
    const { error, loading, user } = userSolo;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userEdit = useSelector(state => state.editUser);
    const { success } = userEdit || {}; // || {} evalaucion de corto circuitoo


    useEffect(() => {
        if (userInfo.id !== user.id) {
            dispatch({ type: USER_EDIT_RESET });
            dispatch(getSoloUser('userProfile'));
        } else {
            setUserName(user.user_name);
            setEmail(user.email);
            setBio(user.bio);
            setImage(user.image);
        }
    }, [dispatch, user, success, userInfo])


    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords must match ')
        } else {
            dispatch(editUser({
                'id': user.id,
                'user_name': user_name,
                'email': email,
                'bio': bio,
                'image': image,
                'password': password,
            }))
            navigate(path);

        }
    }


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('user_id', user.id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const { data } = await axios.post('http://127.0.0.1:8000/users/image/', formData, config)

            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            {loading ? <Loader /> : error ? <Messages>{error}</Messages> : (
                <div>
                    {message && <Messages >{message}</Messages>}
                    {error && <Messages>{error}</Messages>}


                    <div className="">
                        <div className="">

                            <form action="#" method="POST" onSubmit={submitHandler}>
                                <div className="">
                                    <div className="">

                                        <div className="">
                                            <div className="">
                                                <input
                                                    value={user_name}
                                                    onChange={(e) => setUserName(e.target.value)}
                                                    type="text"
                                                    id="user_name"
                                                    placeholder="Full Name"
                                                />
                                            </div>
                                            <br></br>

                                            <div className="">

                                                <input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder="E-mail"
                                                />
                                            </div>


                                        </div>


                                        <div>
                                            <label htmlFor="about" className="">
                                                About
                                            </label>
                                            <div className="">
                                                <textarea
                                                    type="text"

                                                    value={bio}
                                                    onChange={(e) => setBio(e.target.value)}
                                                    name="bio"
                                                    rows={3}
                                                    placeholder="About You"
                                                    defaultValue={''}
                                                />
                                            </div>

                                        </div>
                                        <br></br>
                                        <label htmlFor="about" className="">
                                            Update Your Password
                                        </label>
                                        <div className="">

                                            <input
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                type="password"
                                                id="password"
                                                placeholder="Password"
                                            />
                                        </div>

                                        <div className="">

                                            <input
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                type="password"
                                                placeholder="Confirm Password"
                                            />
                                        </div>

                                        <form>
                                            <label htmlFor="about" className="">
                                                Image
                                            </label>

                                            <input
                                                type='text'
                                                placeholder='Image'
                                                value={image}
                                                onChange={(e) => setImage(e.target.value)}
                                            >
                                            </input>

                                            <input
                                                label='Choose file'
                                                type='file'
                                                onChange={uploadFileHandler}
                                            >
                                            </input>
                                        </form>
                                    </div>
                                    <div className="">
                                        <button type="submit">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default EditProfile