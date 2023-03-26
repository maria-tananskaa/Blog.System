import { Stack } from "@mui/material";
import { BlogItem } from "../BlogItem/BlogItem";

export function Blog({
    posts,
}) {
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