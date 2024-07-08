import { Typography, Button, Box, TextField, Grid, Stack, Skeleton, Modal, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";

const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "70%",
    bgcolor: "#1B1C20",
    border: "2px solid #000",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

const textFieldStyle = {
    width: "80%",
    bgcolor: "#2D3038",
    borderRadius: 2,
};

const AddContent = (props) => {
    const { id, type } = props;

    const { currentUser } = useAuth();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [source, setSource] = useState("");
    const [banner, setBanner] = useState("");

    useEffect(() => {
        const fetchResource = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "content/resource/" + id);
            const json = await response.json();
            if (response.ok) {
                setTitle(json.title);
                setAuthor(json.author);
                setSource(json.source);
                setContent(json.content);
                setBanner(json.banner);
            } else {
                alert("Something went wrong. Please try again later");
            }
        };
        const fetchGuideline = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "content/guideline/" + id);
            const json = await response.json();
            if (response.ok) {
                setTitle(json.title);
                setAuthor(json.author);
                setSource(json.source);
                setContent(json.content);
                setBanner(json.banner);
            } else {
                alert("Something went wrong. Please try again later");
            }
        };
        if (type == "resource") {
            fetchResource();
        } else if (type == "guideline") {
            fetchGuideline();
        }
    }, []);

    const handleUpdate = async () => {
        if (title != "" && content != "" && author != "" && source != "" && type != "") {
            const datetime = new Date();
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "content/" + type + "/update/" + id, {
                method: "PUT",
                body: JSON.stringify({
                    title,
                    content,
                    author,
                    source,
                    type,
                    banner,
                    username: currentUser.displayName,
                    userID: currentUser.uid,
                    datetime,
                    status: "",
                    embedding: "",
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            if (!response.ok) {
                console.log("Error:" + JSON.stringify(json));
            }
            if (response.ok) {
                alert("Content update successfully");
                window.location.reload();
            }
        } else {
            alert("Please enter all content information");
        }
    };

    //RETURN THE HTML
    return (
        <Box sx={boxStyle} className="post">
            <Typography variant="h2">New Content</Typography>

            <Button variant="contained" component="label" sx={{ m: 1 }}>
                Upload Attachment
                <input type="file" hidden accept=".png, .jpg, .jpeg" onChange={(e) => setAttachment(e.target.files[0])} />
            </Button>
            <TextField sx={textFieldStyle} inputProps={{ style: { color: "aliceblue" } }} id="filled-multiline-static" multiline rows={1} placeholder="Title" variant="filled" required onChange={(e) => setTitle(e.target.value)} value={title} />
            <TextField sx={textFieldStyle} inputProps={{ style: { color: "aliceblue" } }} id="filled-multiline-static" multiline rows={1} placeholder="Author" variant="filled" required onChange={(e) => setAuthor(e.target.value)} value={author} />
            <TextField sx={textFieldStyle} inputProps={{ style: { color: "aliceblue" } }} id="filled-multiline-static" multiline rows={1} placeholder="Source" variant="filled" required onChange={(e) => setSource(e.target.value)} value={source} />
            <TextField sx={textFieldStyle} inputProps={{ style: { color: "aliceblue" } }} id="filled-multiline-static" multiline rows={4} placeholder="Content" variant="filled" required onChange={(e) => setContent(e.target.value)} value={content} />
            <Button variant="contained" sx={{ m: 2 }} onClick={handleUpdate}>
                <Typography variant="button">Update</Typography>
            </Button>
        </Box>
    );
};
export default AddContent;
