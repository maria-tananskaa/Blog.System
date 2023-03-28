import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function BlogItem({
    _id,
    title,
    imageUrl,
    shortDescription,
}) {
    return (
        <Card sx={{ maxWidth: 800 }}>
            <CardMedia component="img" height="400" image={imageUrl} alt="green iguana" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {shortDescription}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/posts/${_id}`}><Button size="small">Read More</Button></Link>
            </CardActions>
        </Card>
    );
}