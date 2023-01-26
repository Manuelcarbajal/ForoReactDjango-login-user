import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createBlogAction, ListBlogs } from '../actions/blogAction'
import Messages from './Messages'
import Loader from './Loader'

const AddBlog = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const path = ('/');

    const blogCreate = useSelector(state => state.blogCreate);
    const { loading, error } = blogCreate;

    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBlogAction(body));
        dispatch(ListBlogs());
        navigate(path);
    }

    return (
        <div>
            {loading ? <Loader /> : error ? <Messages>{error}</Messages> : (
                <div>
                    <div className=''>
                        <div>
                            <div>
                                <h2>Create a Post</h2>
                            </div>
                            <form onSubmit={handleSubmit}>

                                <div className="wrapper-form-addblog">
                                    <div className="">

                                        <label htmlFor="about" className="about-addblog">
                                            About
                                        </label>
                                        <div className="textarea-addblog">
                                            <textarea
                                                value={body}
                                                onChange={(e) => setBody(e.target.value)}
                                                type="text"
                                                className="body"
                                                rows={3}
                                                placeholder="Type Here!"
                                            />
                                        </div>

                                    </div>

                                    <div className="butt">
                                        <button type='submit'>
                                            POST
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

export default AddBlog