import DetailedPost from "../components/DetailedPost";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography, Box, Grid, Skeleton } from "@mui/material";

const skeletonStyle = {
    height: "170px",
    my: 2,
    borderRadius: 5,
    boxShadow: 5,
};

const Forum = () => {
    const { id } = useParams();

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    //RUN ONCE PAGE LOADED
    useEffect(() => {
        const fetchPost = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "forum/" + id);
            const json = await response.json();
            if (response.ok) {
                setPost(json.postData);
                setComments(json.comments);
            }
        };

        fetchPost();
    }, []);
    //RETURN THE HTML
    return (
        <div className="Forum">
            <Typography variant="h2" sx={{ mt: 5 }} align="center">
                {post.title}
            </Typography>
            <DetailedPost data={post} type="post" />
            {comments.length > 0 ? comments.map((comment) => <DetailedPost data={comment} type="comment" />) : [<Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />]}
        </div>
    );
};

export default Forum;
