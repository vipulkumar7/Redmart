import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from './Footer'
import Header from './Header'
import { useDocumentTitle } from '../setDocumentTitle'
import { RootState } from '../../redux/rootReducer'
import { getPostsFetch } from '../../redux/aboutPage/actions'
import { IPosts } from '../Types'

const Contact: React.FC = () => {
    const dispatch = useDispatch()
    useDocumentTitle('Contact');

    const posts: IPosts[] = useSelector((state: RootState) => state.aboutReducer.posts);

    useEffect(() => {
        dispatch(getPostsFetch());
    }, [dispatch]);

    return (
        <div id="page-container">
            <Header />
            <div id="content-wrap" className="small-container">
                <div className="row row-2">
                    Redux Saga
                    <button onClick={() => { dispatch(getPostsFetch()) }}>Get posts</button>
                    <div>
                        {posts?.map(post => (
                            <div className="post" key={post.id}>
                                <div>{post.title}- ${post.id}</div>
                                <p>{post.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact;
