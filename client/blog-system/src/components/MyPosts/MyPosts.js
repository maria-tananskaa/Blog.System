import { Stack } from "@mui/material";
import { BlogItem } from "../BlogItem/BlogItem";
import { getMyPosts } from "../../services/postService";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSnackbarContext } from "../../contexts/SnackbarContext";

export function MyPosts() {
    const [posts, setPosts] = useState([]);
    const { userId } = useAuthContext();
    const { openSnackbar } = useSnackbarContext();

    useEffect(() => {
        getMyPosts(userId)
            .then(result => {
                setPosts(result);
            }).catch((error) => {
                openSnackbar(error.message);
            })
    }, [userId]);

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            spacing={3}
        >
            {posts.map(x =>
                <BlogItem key={x._id} {...x} />
            )}
        </Stack>
    );
}