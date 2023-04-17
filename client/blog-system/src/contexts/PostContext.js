import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbarContext } from './SnackbarContext';
import * as postService from '../services/postService';

export const PostContext = createContext();

export const PostProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const { openSnackbar } = useSnackbarContext();

    useEffect(() => {
        postService.getAll()
            .then(result => {
                setPosts(result);
            }).catch((error) => {
                openSnackbar(error.message);
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

            navigate(`/posts/${response._id}`);

        } catch (error) {
            openSnackbar(error.message);
        }
    };

    const onUpdatePostSubmit = async (data, postId) => {
        try {
            const response = await postService.edit(data, postId);

            setPosts(state => state.map(x => x._id === postId ? response : x))

            navigate(`/posts/${postId}`);

        } catch (error) {
            openSnackbar(error.message);
        }
    };

    const deletePost = async (postId) => {
        try {
            await postService.remove(postId);
            setPosts(posts => posts.filter(x => x._id !== postId));
            closeDeleteDialog();
            navigate("/");
        } catch (error) {
            openSnackbar(error.message);
        }
    }

    const contextValues = {
        posts,
        deleteDialogIsOpen,
        onCreatePostSubmit,
        onUpdatePostSubmit,
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