import { Typography, Button, Box, TextField, Grid, Stack, Skeleton } from "@mui/material";
import BriefPost from "../components/BriefPost";
import { useState, useEffect } from "react";

const skeletonStyle = {
    height: "170px",
    my: 2,
    borderRadius: 5,
    boxShadow: 5,
};

const Forums = () => {
    const [posts, setPosts] = useState([]);
    //RUN ONCE PAGE LOADED
    useEffect(() => {
        const fetchPosts = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "forum");
            const json = await response.json();
            if (response.ok) {
                setPosts(json.postsData);
            }
        };

        fetchPosts();
    }, []);
    //RETURN THE HTML
    return (
        <div className="Guidelines">
            <Typography variant="h2" sx={{ mt: 5 }} align="center">
                Discussion Forum
            </Typography>
            {posts.length > 0 ? posts.map((post) => <BriefPost data={post} />) : [<Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />]}
        </div>
    );
};

export default Forums;
