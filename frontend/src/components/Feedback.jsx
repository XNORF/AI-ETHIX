import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

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

const Feedback = () => {
    const { currentUser } = useAuth();

    const [feedback, setFeedback] = useState("");

    const addFeedbackDB = async (feedbackJSON) => {
        const url = import.meta.env.VITE_URL;
        const response = await fetch(url + "feedback/new", {
            method: "POST",
            body: JSON.stringify(feedbackJSON),
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
        }
    };

    const handleFeedback = async (e) => {
        e.preventDefault();
        if (feedback != "") {
            addFeedbackDB({ username: currentUser.displayName, userID: currentUser.uid, feedback });
        }
    };

    //RETURN THE HTML
    return (
        <div>
            <Box sx={boxStyle} className="feedback">
                <Typography variant="h2">Feedback</Typography>
                <TextField sx={textFieldStyle} inputProps={{ style: { color: "aliceblue" } }} id="filled-multiline-static" multiline rows={6} placeholder="Feedback" variant="filled" required onChange={(e) => setFeedback(e.target.value)} value={feedback} />
                <Button variant="contained" onClick={handleFeedback} sx={{ mb: 2 }}>
                    <Typography variant="button">Submit</Typography>
                </Button>
            </Box>
        </div>
    );
};

export default Feedback;
