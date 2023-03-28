import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Post.module.css";
import * as postService from "../../services/postService";

export function Post() {
    const [post, setPost] = useState({});
    const { postId } = useParams();

    useEffect(()=>{
        postService.getOne(postId)
        .then(response=>{
            setPost(response);
        })
    },[postId]);

    return (
        <div className={styles.container}>
            <img  src={post.imageUrl} className={styles.img}/>
            <h1>{post.title}</h1>
            <p>{post.shortDescription}</p>
            <p>{post.content}</p>
        </div>
    );
}
