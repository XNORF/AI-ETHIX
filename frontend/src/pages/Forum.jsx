import DetailedPost from "../components/DetailedPost";
import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography, Box, Grid, Skeleton, Button, Modal, TextField } from "@mui/material";
import { useAuth } from "../contexts/AuthProvider";

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

const Forum = () => {
    const { id } = useParams();
    const { currentUser, userLoggedIn, loading } = useAuth();

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //RUN ONCE PAGE LOADED
    useEffect(() => {
        const fetchPost = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "forum/" + id);
            const json = await response.json();
            if (response.ok) {
                setPost(json.postData);
                setComments(json.comments);
            } else {
                console.log("Error:" + JSON.stringify(json));
            }
        };

        fetchPost();
    }, []);

    const handleReply = async (e) => {
        e.preventDefault();
        if (content != "") {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "forum/new", {
                method: "POST",
                body: JSON.stringify({
                    forumID: id,
                    userID: currentUser.uid,
                    username: currentUser.displayName,
                    content,
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
            <div className="Forum">
                {!loading && !userLoggedIn && <Navigate to={"/login"} replace={true} />}

                <Typography variant="h2" sx={{ mt: 5 }} align="center">
                    {post.title}
                </Typography>
                <Box textAlign="center">
                    <Button variant="contained" sx={{ my: 2 }} align="center" onClick={handleOpen}>
                        <Typography variant="button">Reply</Typography>
                    </Button>
                </Box>
                <DetailedPost data={post} type="post" />
                {comments.length > 0 ? comments.map((comment) => <DetailedPost data={comment} type="comment" />) : [<Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />]}
            </div>

            <Modal open={open} onClose={handleClose}>
                <Box sx={boxStyle} className="reply">
                    <Typography variant="h2">Reply</Typography>
                    <TextField sx={textFieldStyle} inputProps={{ style: { color: "aliceblue" } }} id="filled-multiline-static" multiline rows={6} placeholder="Reply" variant="filled" required onChange={(e) => setContent(e.target.value)} value={content} />
                    <Button variant="contained" onClick={handleReply} sx={{ mb: 2 }}>
                        <Typography variant="button">Submit</Typography>
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default Forum;
