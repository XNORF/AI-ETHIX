import { Typography, Button, Box, TextField, Grid, Stack, Skeleton } from "@mui/material";
import List from "../components/List";
import { useState, useEffect } from "react";

const skeletonStyle = {
    height: "170px",
    my: 2,
    borderRadius: 5,
    boxShadow: 5,
};

const Guidelines = () => {
    const [guidelines, setGuidelines] = useState([]);

    //RUN ONCE PAGE LOADED
    useEffect(() => {
        const fetchGuidelines = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "content/guideline/");
            const json = await response.json();
            if (response.ok) {
                setGuidelines(json.guidelinesData);
            }
        };

        fetchGuidelines();
    }, []);

    //RETURN THE HTML
    return (
        <div className="Guidelines">
            <Typography variant="h2" sx={{ mt: 5 }} align="center">
                Ethical Guidelines
            </Typography>
            <Typography variant="body1" sx={{ my: 2 }} align="center">
                Ethical guidelines ensure responsible AI by promoting transparency, fairness, accountability, and privacy protection to prevent bias and support positive societal impact.
            </Typography>
            {guidelines.length > 0 ? guidelines.map((guideline) => <List data={guideline} type="guidelines" />) : [<Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />]}
        </div>
    );
};

export default Guidelines;
