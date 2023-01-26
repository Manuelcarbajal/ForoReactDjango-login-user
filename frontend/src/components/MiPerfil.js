import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Massage from './Messages'
import { deleteBlogAction, ListBlogs } from '../actions/blogAction'
import { useParams } from 'react-router-dom'

const MiPerfil = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    const blogList = useSelector((state) => state.blogList);
    const { error: errorBlog, loading: blogLoading, blogs } = blogList;

    const deleteBlog = useSelector((state) => state.blogDelete)
    const {error: errorDelete , loading: landingDelete , success: successDelete } = deleteBlog;
    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin;


    useEffect(() => {
        dispatch(ListBlogs());
    }, [dispatch,successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you shure you want to delete this blog?')) {
            dispatch(deleteBlogAction(id))
        }
    }

    return (
        <div className='main'>
            <div className='center'>
                <img src={`http://127.0.0.1:8000${userInfo.image}`}  alt='' />
                <div className='perfile-user'>
                    <h3>
                        {userInfo.user_name}
                    </h3>
                    <a href='/editProfile'>
                        EDIT
                    </a>
                </div>
            </div>
            <div className='details'>
                <p>Personal details</p>
            </div>
            <div className=''>
                <dl>
                    <div className="">
                        <dt className="">Username</dt>
                        <dd className="">{userInfo.user_name}</dd>
                    </div>
                    <div className="">
                        <dt className="">Email address</dt>
                        <dd className="">{userInfo.email}</dd>
                    </div>
                    <div className="">
                        <dt className="">About</dt>
                        <dd className="">
                            {userInfo.bio}
                        </dd>
                    </div>
                </dl>
            </div>

            <div>
                <h2>
                    --POST--
                </h2>
            </div>

            {blogs.map((blog) => (
                <>
                    {userInfo.user_name === blog.user &&

                        <div className="wrapper-post">
                            <div key={blog.id} class="the-perfile">
                                <div className="the-user">

                                    <img src={`http://127.0.0.1:8000${userInfo.image}`}/>
                                    <div className="fl">
                                        <span className="">{blog.user}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='text-post'>
                                <p >{blog.body}</p>
                            </div>
                            <div class="">
                                <div class="componetnts-UD">
                                    <a className='edit'
                                        href={`/editBlog/${blog.id}`}
                                    > Edit
                                    </a>

                                    <button className='delete' onClick={() => deleteHandler(blog.id)}
                                    >Delete
                                    </button>
                                </div>
                            </div>
                        </div>

                    }
                </>
            ))}

        </div>
    )
}

export default MiPerfil