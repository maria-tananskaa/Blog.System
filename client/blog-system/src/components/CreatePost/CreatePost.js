import { Button, FormControl, Stack, TextField } from "@mui/material";
import { margin } from "@mui/system";
import { useState } from "react";
import styles from './CreatePost.module.css';

export function CreatePost() {
    const [values, setValues] = useState({
        title: '',
        imageUrl: '',
        shortDescription: '',
        content: '',
        createdAt: new Date()
    });

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.id]: e.target.value }))
    };

    return (
        <div className={styles.container}>
            <FormControl className={styles.form} sx={{margin: '2em'}}>
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
                    <Button>Create</Button>
                </Stack>
            </FormControl>
        </div>

    );
}