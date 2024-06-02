import { Typography, Button, Box, TextField, Grid, Stack, Skeleton } from "@mui/material";
import ContentList from "../components/ContentList";
import { useState, useEffect } from "react";

const skeletonStyle = {
    height: "170px",
    my: 2,
    borderRadius: 5,
    boxShadow: 5,
};

const Resources = () => {
    const [resources, setResources] = useState([]);

    //RUN ONCE PAGE LOADED
    useEffect(() => {
        const fetchResources = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "content/resource/");
            const json = await response.json();
            if (response.ok) {
                setResources(json.resourcesData);
            }
        };

        fetchResources();
    }, []);
    //RETURN THE HTML
    return (
        <div className="Resources">
            <Typography variant="h2" sx={{ mt: 5 }} align="center">
                Educational Resources
            </Typography>
            <Typography variant="body1" sx={{ my: 2 }} align="center">
                The educational resources in AI-Ethix offer concise materials on AI ethics, teaching software engineering students about fairness, transparency, and responsible AI development.
            </Typography>
            {resources.length > 0 ? resources.map((resource) => <ContentList data={resource} type="resources" />) : [<Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />]}
        </div>
    );
};

export default Resources;
