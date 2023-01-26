import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { upadateBlogAction, blogActionDetails } from '../actions/blogAction'
import { useParams } from 'react-router-dom'
import Messages from './Messages'
import Loader from './Loader'
import { BLOG_UPDATE_RESET } from '../constants/blogConstans'

const EditBlog = () => {

    const { id } = useParams();

    const navigate = useNavigate();
    const path = ('/miPerfil');

    const dispatch = useDispatch();

    const [body, setBody] = useState('');

    const soloBlog = useSelector(state => state.soloBlog)
    const { error: errorSolo, loading: loadingSolo, blog } = soloBlog;

    const updateBlog = useSelector(state => state.blogUpdate)
    const { error, loading, success } = updateBlog;

    useEffect(() => {
        if (success) {
            dispatch({ type: BLOG_UPDATE_RESET })
        } else {
            if (blog.id !== Number(id)) {
                dispatch(blogActionDetails(id))
            } else {
                setBody(blog.body)
            }
        }
    }, [dispatch, blog, id, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(upadateBlogAction({
            id: id,
            body,
        }))
        navigate(path);
        window.location.reload();//reacragar paguina
    }


    return (
        <div>
            {loadingSolo && <Loader />}
            {errorSolo && <Messages >{errorSolo}</Messages>}
            {loading ?
                <Loader />
                : error
                    ? <Messages>{error}</Messages>
                    : (

                        <div>
                            <div className="">
                                <h2 className="">
                                    Update Blog
                                </h2>

                                <form onSubmit={submitHandler}>
                                    <div className="">
                                        <div className="">
                                            <div>
                                                <label htmlFor="about" className="">
                                                    About
                                                </label>
                                                <div className="">
                                                    <textarea
                                                        value={body}
                                                        onChange={(e) => setBody(e.target.value)}
                                                        type="text"
                                                        id="body"
                                                        rows={3}
                                                        placeholder="Type Here!"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <button type='submit'>  
                                                EDIT
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    )}
        </div>
    )
}

export default EditBlog