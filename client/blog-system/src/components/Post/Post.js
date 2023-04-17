import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Post.module.css";
import { IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as postService from "../../services/postService";
import { useAuthContext } from "../../contexts/AuthContext";
import { usePostContext } from "../../contexts/PostContext";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { DeleteDialog } from "../DeleteDialog/DeleteDialog";

export function Post() {
    const navigate = useNavigate();
    const { userId } = useAuthContext();
    const { openDeleteDialog } = usePostContext();
    const { openSnackbar } = useSnackbarContext();
    const [post, setPost] = useState({});
    const { postId } = useParams();

    useEffect(() => {
        postService.getOne(postId)
            .then(response => {
                setPost(response);
            }).catch(error => {
                openSnackbar(error.message);
            });
    }, [postId]);

    const onClickEdit = () => {
        navigate(`/editPost/${postId}`);
    }

    return (
        <>
            {post._id &&
                <Stack className={styles.container}>
                    <img src={post.imageUrl} className={styles.img} alt={post.title} />
                    {userId === post._ownerId &&
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={2}
                        >
                            <IconButton onClick={onClickEdit} aria-label="delete" color="primary">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={openDeleteDialog} aria-label="delete" color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    }
                    <Typography variant="h2" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {post.shortDescription}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {post.content}
                    </Typography>
                </Stack>
            }
            <DeleteDialog postId={postId} />
        </>

    );
}
