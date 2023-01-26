import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Messages from './Messages'
import Loader from './Loader'
import { getListUsers } from '../actions/userActions'
import { ListBlogs } from '../actions/blogAction'



const Feed = () => {

    const dispatch = useDispatch();
    //Blogs
    const blogList = useSelector((state) => state.blogList);
    const { error, loading, blogs } = blogList;

    //users
    const userList = useSelector(state => state.userList)
    const { users } = userList;

    useEffect(() => {//tiene que hacer algo despues de renderizarse
        dispatch(ListBlogs())
        dispatch(getListUsers());
    }, [dispatch])
    return (
        <div>

            {loading ? <Loader /> : error ? <Messages>{error}</Messages> : (
                <div className='wrapper-feed'>

                    {blogs && blogs.map((blog) => (
                        <div className='wrapper-center-feed'>
                            <div className='feed-content'>
                                {users && users.map(user => (
                                    <div key={user.id}>
                                        {user.user_name === blog.user &&
                                            <div className='perfile-feed'>
                                                <div className='img-feed'>
                                                    <img src={`http://127.0.0.1:8000${user.image}`} />
                                                </div>
                                                <div className='user-feed'>
                                                    {user.user_name}
                                                </div>
                                                <div className='id'>
                                                    <a href={`/userProfile/${user.id}`}>
                                                        See Profile
                                                    </a>
                                                </div>

                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>


                            <div className='body-feed'>
                                {blog.body}
                            </div>

                            <div className='data-feed'>
                                <div className='buttondiv'><a href={`/soloBlog/${blog.id}`}>See More</a></div>
                                <div className='text'> <h5>{blog.date.substring(0, 10)}</h5></div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Feed