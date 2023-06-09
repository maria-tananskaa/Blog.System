import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from './BlogItem.module.css';

export function BlogItem({
    _id,
    _createdOn,
    title,
    imageUrl,
    shortDescription,
    createdBy
}) {
    const date = new Date(_createdOn).toDateString();
    const names = createdBy.split(" ");
    const initials=`${names[0].charAt()}${names[1].charAt()}`

    return (
        <Card sx={{ maxWidth: 800 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "#734FE6" }}>{initials}</Avatar>
                }
                title={<h2>{title}</h2>}
                subheader={date}
                subheader2 ={createdBy}
            />
            <CardMedia component="img" height="400" image={imageUrl} alt="green iguana" />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {shortDescription}
                </Typography>
            </CardContent>
            <CardActions>
                <Link className={styles.button}  to={`/posts/${_id}`}>Read More</Link>
            </CardActions>
        </Card>
    );
}