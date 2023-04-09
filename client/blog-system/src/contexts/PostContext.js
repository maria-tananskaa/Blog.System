import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as postService from '../services/postService';

export const PostContext = createContext();

export const PostProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postService.getAll()
            .then(result => {
                setPosts(result);
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    const onCreatePostSubmit = async (data) => {
        try {
            const response = await postService.create(data);

            setPosts(posts => [...posts, response]);

            navigate("/");

        } catch (err) {
            console.log(err.message, "error");
        }
    };

    const contextValues = {
        posts,
        onCreatePostSubmit
    };

    return (
        <>
            <PostContext.Provider value={contextValues}>
                {children}
            </PostContext.Provider>
        </>
    );
};

export const usePostContext = () => {
    const context = useContext(PostContext);

    return context;
};