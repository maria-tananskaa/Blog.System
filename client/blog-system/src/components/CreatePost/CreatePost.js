import { Button, FormControl, Stack, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from './CreatePost.module.css';
import { usePostContext } from "../../contexts/PostContext";

export function CreatePost() {
    const { onCreatePostSubmit } = usePostContext();
    const [values, setValues] = useState({
        title: '',
        imageUrl: '',
        shortDescription: '',
        content: ''
    });

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.id]: e.target.value }))
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onCreatePostSubmit(values);
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
                            <Button type="submit">Create</Button>
                            <Link className="link-button" to="/"><Button >Cancel</Button></Link>
                        </Stack>
                    </Stack>
                </FormControl>
            </form>

        </div>

    );
}