import { Link, Navigate } from "react-router-dom";
import { Typography, Box, Stack, Skeleton } from "@mui/material";
import { useState, useEffect } from "react";

const Content = (props) => {
    const { id, type } = props;
    const fallbackURL = "/" + type + "s";
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [source, setSource] = useState("");
    const [username, setUsername] = useState("");
    const [datetime, setDateTime] = useState("");
    const [content, setContent] = useState("");
    const [banner, setBanner] = useState("");
    const [found, setFound] = useState(true);

    //RUN ONCE PAGE LOADED
    useEffect(() => {
        const fetchResource = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "content/resource/" + id);
            const json = await response.json();
            if (response.ok) {
                setFound(true);
                setTitle(json.title);
                setUsername(json.username);
                setAuthor(json.author);
                setSource(json.source);
                setDateTime(json.datetime);
                setContent(json.content);
                setBanner(json.banner);
            } else {
                setFound(false);
            }
        };
        const fetchGuideline = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "content/guideline/" + id);
            const json = await response.json();
            if (response.ok) {
                setFound(true);
                setTitle(json.title);
                setUsername(json.username);
                setAuthor(json.author);
                setSource(json.source);
                setDateTime(json.datetime);
                setContent(json.content);
                setBanner(json.banner);
            } else {
                setFound(false);
            }
        };
        if (type == "resource") {
            fetchResource();
        } else if (type == "guideline") {
            fetchGuideline();
        }
    }, []);

    //RETURN THE HTML
    return (
        <div className="content">
            {!found && <Navigate to={fallbackURL} replace={true} />}

            <Typography variant="h2" sx={{ mt: 5 }} align="center">
                {title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }} align="center">
                Author: {author}
            </Typography>
            <Typography variant="body1" align="center">
                Source:{" "}
                <Link to={source} target="_blank">
                    Link
                </Link>
            </Typography>
            <Box sx={{ mt: 5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                    <Typography variant="body1">Post by: {username}</Typography>
                    <Typography variant="body1">{datetime}</Typography>
                </Stack>

                {banner ? <img style={{ height: "200px", width: "100%", objectFit: "cover", objectPosition: "0 0" }} src={banner} /> : <Skeleton animation="wave" variant="rectangular" height={200} />}
                <Typography variant="body1" align="justify" sx={{ mt: 5 }} style={{ wordWrap: "break-word" }}>
                    {content}
                </Typography>
            </Box>
        </div>
    );
};

export default Content;
