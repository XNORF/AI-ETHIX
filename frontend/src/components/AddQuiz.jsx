import { Typography, Button, Box, TextField, Grid, Stack, Skeleton, Modal, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
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

const AddQuiz = () => {
    const { currentUser } = useAuth();

    const [title, setTitle] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    const [answer, setAnswer] = useState(-1);
    const [quiz] = useState([]);
    const handleAdd = async () => {
        if (title != "" && answer1 != "" && answer2 != "" && answer3 != "" && answer4 != "" && answer != -1) {
            quiz.push({
                title: title,
                answer: answer,
                answers: [answer1, answer2, answer3, answer4],
            });
            setTitle("");
            setAnswer1("");
            setAnswer2("");
            setAnswer3("");
            setAnswer4("");
            setAnswer("");
            console.log(quiz);
            if (confirm("Question added successfully, press OK to submit quiz into the system")) {
                if (confirm("You have added " + quiz.length + " questions, do you wish to submit the quiz into the system?")) {
                    handleSubmit();
                }
            }
        } else {
            alert("Please enter quiz informations");
        }
    };
    const handleSubmit = async () => {
        if (quiz.length == 0) {
            alert("Please press add button to insert question before submission");
        } else {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "quiz/new", {
                method: "POST",
                body: JSON.stringify(quiz),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            if (!response.ok) {
                console.log("Error:" + JSON.stringify(json));
            }
            if (response.ok) {
                alert("New quiz added successfully");
                console.log("ok");
                window.location.reload();
            }
        }
    };
    const handleSelectAnswer = (e) => {
        setAnswer(e.target.value);
    };
    //RETURN THE HTML
    return (
        <Box sx={boxStyle} className="post" textAlign="center">
            <Typography variant="h2">New Quiz</Typography>
            <Typography variant="h3">Question {quiz.length + 1}</Typography>

            <TextField sx={textFieldStyle} inputProps={{ style: { color: "aliceblue" } }} id="filled-multiline-static" multiline rows={2} placeholder="Question" variant="filled" required onChange={(e) => setTitle(e.target.value)} value={title} />
            <TextField sx={textFieldStyle} inputProps={{ style: { color: "aliceblue" } }} id="filled-multiline-static" multiline rows={2} placeholder="Answer 1" variant="filled" required onChange={(e) => setAnswer1(e.target.value)} value={answer1} />
            <TextField sx={textFieldStyle} inputProps={{ style: { color: "aliceblue" } }} id="filled-multiline-static" multiline rows={2} placeholder="Answer 2" variant="filled" required onChange={(e) => setAnswer2(e.target.value)} value={answer2} />
            <TextField sx={textFieldStyle} inputProps={{ style: { color: "aliceblue" } }} id="filled-multiline-static" multiline rows={2} placeholder="Answer 3" variant="filled" required onChange={(e) => setAnswer3(e.target.value)} value={answer3} />
            <TextField sx={textFieldStyle} inputProps={{ style: { color: "aliceblue" } }} id="filled-multiline-static" multiline rows={2} placeholder="Answer 4" variant="filled" required onChange={(e) => setAnswer4(e.target.value)} value={answer4} />
            <Typography variant="body1">Select Answer</Typography>
            <Select value={answer} onChange={handleSelectAnswer} sx={textFieldStyle} placeholder="Answer">
                <MenuItem value={0}>{answer1}</MenuItem>
                <MenuItem value={1}>{answer2}</MenuItem>
                <MenuItem value={2}>{answer3}</MenuItem>
                <MenuItem value={3}>{answer4}</MenuItem>
            </Select>
            <Button variant="contained" sx={{ m: 2 }} onClick={handleAdd}>
                <Typography variant="button">Add</Typography>
            </Button>
        </Box>
    );
};
export default AddQuiz;
