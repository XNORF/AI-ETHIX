import { Typography, Button, Box, TextField, Grid, Stack, Skeleton, Modal, Select, MenuItem } from "@mui/material";
import { useState } from "react";
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

const AddContent = () => {
    const { currentUser } = useAuth();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [source, setSource] = useState("");
    const [type, setType] = useState("");
    const [banner, setBanner] = useState("");

    const handleAdd = async () => {
        if (title != "" && content != "" && author != "" && source != "" && type != "") {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "content/" + type + "/new", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    content,
                    author,
                    source,
                    type,
                    banner,
                    username: currentUser.displayName,
                    userID: currentUser.uid,
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
                alert("New content added successfully");
                console.log("ok");
                window.location.reload();
            }
        } else {
            alert("Please enter all content information");
        }
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
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
            <TextField sx={textFieldStyle} inputProps={{ style: { color: "aliceblue" } }} id="filled-multiline-static" multiline rows={3} placeholder="Content" variant="filled" required onChange={(e) => setContent(e.target.value)} value={content} />
            <Typography variant="body1">Content Type</Typography>

            <Select value={type} onChange={handleTypeChange} sx={textFieldStyle} placeholder="Type">
                <MenuItem value="guideline">Guideline</MenuItem>
                <MenuItem value="resource">Resource</MenuItem>
            </Select>
            <Button variant="contained" sx={{ m: 2 }} onClick={handleAdd}>
                <Typography variant="button">Add</Typography>
            </Button>
        </Box>
    );
};
export default AddContent;
