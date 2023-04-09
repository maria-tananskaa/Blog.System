import { Stack } from "@mui/material";
import { BlogItem } from "../BlogItem/BlogItem"; 
import { usePostContext } from "../../contexts/PostContext";

export function Blog() {
    const { posts } = usePostContext();
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