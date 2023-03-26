import { BlogItem } from "../BlogItem/BlogItem";

export function Blog({
    posts,
}) {
    return (
        <div>
            {posts.map(x =>
                <BlogItem key={x._id} {...x} />
            )}
        </div>
    );
}