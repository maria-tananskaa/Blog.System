import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as postService from '../services/postService';

export const PostContext = createContext();

export const PostProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);

    useEffect(() => {
        postService.getAll()
            .then(result => {
                setPosts(result);
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    const openDeleteDialog = () => {
        setDeleteDialogIsOpen(true);
    }

    const closeDeleteDialog = () => {
        setDeleteDialogIsOpen(false)
    }

    const onCreatePostSubmit = async (data) => {
        try {
            const response = await postService.create(data);

            setPosts(posts => [...posts, response]);

            navigate("/");

        } catch (err) {
            console.log(err.message, "error");
        }
    };

    const deletePost = async (postId) => {
        await postService.remove(postId);
        setPosts(posts => posts.filter(x => x._id !== postId));
        closeDeleteDialog();
        navigate("/");
    }

    const contextValues = {
        posts,
        deleteDialogIsOpen,
        onCreatePostSubmit,
        deletePost,
        openDeleteDialog,
        closeDeleteDialog
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