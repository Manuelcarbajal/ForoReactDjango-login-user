import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom' //para llamar el id
import { useNavigate } from 'react-router-dom'
import { blogActionDetails, createBlogComment } from '../actions/blogAction'
import { getListUsers } from '../actions/userActions'
import Messages from './Messages'
import Loader from './Loader'
import { BLOG_CREATE_COMMENT_RESET } from '../constants/blogConstans'


const SoloBlog = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const [text, setText] = useState('');

    const commentBlog = useSelector(state => state.commentBlog)
    const { success } = commentBlog;

    const soloBlog = useSelector(state => state.soloBlog);
    const { loading, error, blog } = soloBlog;

    const userList = useSelector(state => state.userList);
    const { users } = userList;

    useEffect(() => {
        if (success) {
            setText('')
            dispatch({ type: BLOG_CREATE_COMMENT_RESET })
        }
        dispatch(getListUsers());
        dispatch(blogActionDetails(id));
    }, [dispatch, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createBlogComment(
            id, { text }
        ))
    }

    return (
        <div>
            {loading ? <Loader /> : error ? <Messages>{error}</Messages> : (
                <div>
                    <div className=''>
                        <div className="" key={blog.id}>
                            <div className="">
                                {users && users.map(user => (
                                    <div key={user.id}>


                                        {user.user_name === blog.user &&
                                            <div>
                                                <div className="">
                                                    <img src={`http://127.0.0.1:8000${user.image}`} width="40" />
                                                    <span className="">{blog.user}</span>
                                                    <small className=""></small>
                                                    <a href={`/userProfile/${user.id}`} >
                                                        See Profile
                                                    </a>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))}


                            </div>

                            <div className=''>
                                <p>{blog.body}</p>
                            </div>


                            <div class="">
                                <div class="">

                                    <p className="">
                                        {blog.date?.substring(0, 10)}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <h2 className="">
                        COMMENTS
                    </h2>

                    <form onSubmit={submitHandler}>

                        <div className="">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                type="text"
                                id="text"
                                rows={3}
                                placeholder="Type Here!"
                            />
                        </div>


                        <div className="">
                            <button type='submit'>
                                Comment
                            </button>
                        </div>

                    </form>
                    {blog.comments && blog.comments.map((comment) => (
                        <>
                            {users && users.map(u => (

                                <div key={comment.id} className="">

                                    {u.user_name === comment.user &&

                                        <div className="py-6">
                                            <div>
                                                <img
                                                    className=""
                                                    src={`http://127.0.0.1:8000${u.image}`}
                                                    alt="Person"
                                                />
                                                <div className="">
                                                    <p className="">{comment.user}</p>
                                                    <p className="">{comment.date.substring(0, 10)}</p>
                                                    <p className="">
                                                        {comment.text}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>

                            ))}


                        </>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SoloBlog