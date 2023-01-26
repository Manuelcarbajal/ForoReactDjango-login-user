import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSoloUser } from '../actions/userActions'
import { ListBlogs } from '../actions/blogAction'

import Messages from './Messages'
import Loader from './Loader'



const SoloUsers = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const blogList = useSelector((state) => state.blogList);
    const { error: errorBlog, loading: blogLoading, blogs } = blogList;

    const userSolo = useSelector(state => state.userSolo)
    const { loading, error, user } = userSolo


    useEffect(() => {
        dispatch(getSoloUser(id))
        dispatch(ListBlogs())
    }, [dispatch])

    return (
        <div className='background'>
            <div className='mian-solo'>
                {blogLoading && <Loader />}
                {errorBlog && <Messages variant='danger'>{errorBlog}</Messages>}
                {loading ? <Loader /> : error ? <Messages variant='danger'>{error}</Messages> : (
                    <div>
                        <div className='center-solo'>
                            <img src={`http://127.0.0.1:8000${user.image}`} alt='' />
                            <div className='perfile-user'>
                                <h3>
                                    {user.user_name}
                                </h3>
                            </div>
                        </div>
                        <div className='details-solo'>
                            <p>Personal details</p>
                        </div>
                        <div className='data-solo'>
                            <div className='data-solo-info'>
                                <div className="solo-info">
                                    <dt className="">Username</dt>
                                </div>
                                <div className="solo-info">
                                    <dt className="">Email address</dt>
                                </div>
                                <div className="solo-info">
                                    <dt className="">About</dt>
                                </div>
                            </div>
                            <div className='data-solo-user'>
                                <div className="solo-user">
                                    <dd className="">{user.user_name}</dd>
                                </div>
                                <div className="solo-user">
                                    <dd className="">{user.email}</dd>
                                </div>
                                <div className="solo-user">
                                    <dd className="">
                                        {user.bio}
                                    </dd>
                                </div>
                            </div>
                        </div>

                        <div className='post'>
                            <h2>
                                --POST--
                            </h2>
                        </div>

                        {blogs.map((blog) => (
                            <div>
                                {user.user_name === blog.user &&
                                    <div>
                                        <div key={blog.id}>
                                            <div className='perfile-feed'>
                                                <div className='img-feed'>
                                                    <img src={`http://127.0.0.1:8000${user.image}`} />
                                                </div>
                                                <div className='user-feed'>
                                                    {user.user_name}
                                                </div>
                                                <div className='body-feed'>
                                                    {blog.body}
                                                </div>
                                                <div className='id'>
                                                    <a href={`/userProfile/${user.id}`}>
                                                        See Profile
                                                    </a>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default SoloUsers