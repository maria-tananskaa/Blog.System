import { Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";
import { usePostContext } from "../../contexts/PostContext";

export function DeleteDialog({postId}) {
    const { deleteDialogIsOpen, closeDeleteDialog, deletePost } = usePostContext();

    return (
        <Dialog open={deleteDialogIsOpen}>
            <DialogTitle>Delete Post</DialogTitle>
            <Typography variant="subtitle1" component="div">
                Are you sure you want to deleten this post ?
            </Typography>
            <DialogActions>
                <Button color="error" onClick={() => { deletePost(postId) }} >Delete</Button>
                <Button onClick={closeDeleteDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
