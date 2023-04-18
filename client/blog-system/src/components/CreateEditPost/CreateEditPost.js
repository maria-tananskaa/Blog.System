import { useState, useEffect } from "react";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import styles from './CreateEditPost.module.css';
import { usePostContext } from "../../contexts/PostContext";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { getOne } from "../../services/postService";
import * as validator from "../../validator/validator";

export function CreateEditPost() {
    const { onCreatePostSubmit, onUpdatePostSubmit } = usePostContext();
    const { openSnackbar } = useSnackbarContext();
    const { firstName, lastName } = useAuthContext();
    const { postId } = useParams();
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        title: '',
        imageUrl: '',
        shortDescription: '',
        content: '',
        createdBy: `${firstName} ${lastName}`
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

        if (!validateForm()) {
            return;
        }

        if (postId) {
            onUpdatePostSubmit(values, postId);
        } else {
            onCreatePostSubmit(values);
        }
    }

    const validateForm = () => {
        let currentErrors = {};
        let formIsValid = true;
        const titleErrorMessage = validator.validateTitle(values.title);
        const imageUrlErrorMessage = validator.validateImageUrl(values.imageUrl);
        const descriptionErrorMessage = validator.validateDescription(values.shortDescription);
        const contentErrorMessage = validator.validateContent(values.content);

        if (titleErrorMessage) {
            currentErrors.titleError = titleErrorMessage;
            currentErrors.isTitleError = true;
            formIsValid = false;
        }

        if (imageUrlErrorMessage) {
            currentErrors.imageUrlError = imageUrlErrorMessage;
            currentErrors.isImageUrlError = true;
            formIsValid = false;
        }

        if (descriptionErrorMessage) {
            currentErrors.descriptionError = descriptionErrorMessage;
            currentErrors.isDescriptionError = true;
            formIsValid = false;
        }

        if (contentErrorMessage) {
            currentErrors.contentError = contentErrorMessage;
            currentErrors.isContentError = true;
            formIsValid = false;
        }

        setErrors(currentErrors);
        return formIsValid;
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
                            error={errors.isTitleError}
                            helperText={errors.titleError}
                        />
                        <TextField
                            id="imageUrl"
                            label="Image Url"
                            value={values.imageUrl}
                            onChange={onChangeHandler}
                            error={errors.isImageUrlError}
                            helperText={errors.imageUrlError}
                        />
                        <TextField
                            id="shortDescription"
                            label="Short Description"
                            multiline
                            rows={4}
                            value={values.shortDescription}
                            onChange={onChangeHandler}
                            error={errors.isDescriptionError}
                            helperText={errors.descriptionError}
                        />
                        <TextField
                            id="content"
                            label="Content"
                            multiline
                            rows={4}
                            value={values.content}
                            onChange={onChangeHandler}
                            error={errors.isContentError}
                            helperText={errors.contentError}
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