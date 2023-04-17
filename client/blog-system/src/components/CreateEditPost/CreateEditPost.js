import { useState, useEffect } from "react";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import styles from './CreateEditPost.module.css';
import { usePostContext } from "../../contexts/PostContext";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { getOne } from "../../services/postService";

export function CreateEditPost() {
    const { onCreatePostSubmit, onUpdatePostSubmit } = usePostContext();
    const { openSnackbar } = useSnackbarContext();
    const { postId } = useParams();
    const [values, setValues] = useState({
        title: '',
        imageUrl: '',
        shortDescription: '',
        content: ''
    });

    useEffect(() => {
        if (postId) {
            getOne(postId)
                .then(post => {
                    setValues(post);
                }).catch(error => {
                    openSnackbar(error.message);
                });
        }
    }, [postId]);

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.id]: e.target.value }))
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (postId) {
            onUpdatePostSubmit(values, postId);
        } else {
            onCreatePostSubmit(values);
        }
    }

    return (
        <div className={styles.container}>
            <form method="POST" onSubmit={onSubmit}>
                <FormControl className={styles.form} sx={{ margin: '2em' }}>
                    <Stack spacing={2}>
                        <h2 className={styles.title}>Create Post</h2>
                        <TextField
                            id="title"
                            label="Title"
                            value={values.title}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            id="imageUrl"
                            label="Image Url"
                            value={values.imageUrl}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            id="shortDescription"
                            label="Short Description"
                            multiline
                            rows={4}
                            value={values.shortDescription}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            id="content"
                            label="Content"
                            multiline
                            rows={4}
                            value={values.content}
                            onChange={onChangeHandler}
                        />
                        <Stack spacing={2} direction="row">
                            {!postId &&
                                <Button type="submit">Create</Button>
                            }
                            {postId &&
                                <Button type="submit">Edit</Button>
                            }
                            <Link className="link-button" to="/"><Button >Cancel</Button></Link>
                        </Stack>
                    </Stack>
                </FormControl>
            </form>

        </div>

    );
}