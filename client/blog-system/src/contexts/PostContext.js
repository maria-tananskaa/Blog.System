import { createContext, useContext } from 'react';
import * as postService from '../services/postService';
import { Navigate } from 'react-router-dom';

export const PostContext = createContext();

export const PostProvider = ({
    children,
}) => {

    const onCreatePostSubmit = async (data) => {
        try {
            const response = await postService.create(data);

            console.log(response);

            //view navigate 
            <Navigate to={"/"} replace={true}/>

        } catch (err) {
            console.log(err.message, "error");
        }
    };

    const contextValues = {
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