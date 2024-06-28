import { Typography, Button, Box, TextField, Grid, Stack, Skeleton, Modal } from "@mui/material";
import BriefPost from "../components/BriefPost";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useParams, Navigate } from "react-router-dom";

const skeletonStyle = {
    height: "170px",
    my: 2,
    borderRadius: 5,
    boxShadow: 5,
};

const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
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

const Forums = () => {
    const { currentUser, userLoggedIn, loading } = useAuth();

    const [posts, setPosts] = useState([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [attachment, setAttachment] = useState();
    const [attachmentURL, setAttachmentURL] = useState();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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

    const handlePost = async (e) => {
        e.preventDefault();
        console.log(title);
        console.log(content);
        console.log(attachment);
        if (title != "" && content != "") {
            const url = import.meta.env.VITE_URL;
            /* if (attachment != null) {
                const attachmentResponse = await fetch(url + "forum/upload", {
                    method: "POST",
                    body: attachment,
                });
                console.log(await attachmentResponse.json().attachmentURL);
            } */
            const response = await fetch(url + "forum/new", {
                method: "POST",
                body: JSON.stringify({
                    userID: currentUser.uid,
                    username: currentUser.displayName,
                    title,
                    content,
                    attachment: "", //NEED CHANGE
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
                console.log("ok");
                handleClose();
                window.location.reload();
            }
        }
    };

    //RETURN THE HTML
    return (
        <>
            <div className="Forums">
                {!loading && !userLoggedIn && <Navigate to={"/login"} replace={true} />}

                <Typography variant="h2" sx={{ mt: 5 }} align="center">
                    Discussion Forum
                </Typography>
                <Typography variant="body1" sx={{ my: 2 }} align="center">
                    Discuss topics on ethical AI, and share your insights on how to develop and use AI responsibly.
                </Typography>
                <Box textAlign="center">
                    <Button variant="contained" sx={{ my: 2 }} align="center" onClick={handleOpen}>
                        <Typography variant="button">Create Post</Typography>
                    </Button>
                </Box>
                {posts.length > 0 ? posts.map((post) => <BriefPost data={post} />) : [<Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />]}
            </div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={boxStyle} className="post">
                    <Typography variant="h2">New Post</Typography>

                    <Button variant="contained" component="label">
                        Upload Attachment
                        <input type="file" hidden accept=".png, .jpg, .jpeg" onChange={(e) => setAttachment(e.target.files[0])} />
                    </Button>
                    <TextField sx={textFieldStyle} inputProps={{ style: { color: "aliceblue" } }} id="filled-multiline-static" multiline rows={2} placeholder="Title" variant="filled" required onChange={(e) => setTitle(e.target.value)} value={title} />

                    <TextField sx={textFieldStyle} inputProps={{ style: { color: "aliceblue" } }} id="filled-multiline-static" multiline rows={6} placeholder="Content" variant="filled" required onChange={(e) => setContent(e.target.value)} value={content} />
                    <Button variant="contained" sx={{ mb: 2 }} onClick={handlePost}>
                        <Typography variant="button">Submit</Typography>
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default Forums;
