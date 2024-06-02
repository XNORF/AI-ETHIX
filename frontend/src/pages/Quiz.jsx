import { Typography, Button, Box, TextField, Grid, Stack, Skeleton, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useParams, Navigate } from "react-router-dom";

const boxStyle = {
    bgcolor: "#121418",
    borderRadius: 5,
    boxShadow: 5,
};

const Quiz = () => {
    const { currentUser, userLoggedIn, loading } = useAuth();
    const { id } = useParams();
    const [quiz, setQuiz] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [answered, setAnswered] = useState([]);
    const [score, setScore] = useState(0);

    //RUN ONCE PAGE LOADED
    useEffect(() => {
        const fetchQuiz = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "quiz/" + id);
            const json = await response.json();
            if (response.ok) {
                setQuiz(json.questions);
                json.questions.forEach((question, i) => {
                    answers[i] = question.answer;
                });
            }
        };

        fetchQuiz();
    }, []);

    const handleScore = async (e) => {
        e.preventDefault();
        const length = answers.length;
        let sc = 0;
        for (let i = 0; i < length; i++) {
            if (answered[i] == answers[i]) {
                sc++;
            }
        }
        setScore(sc);
        alert("Your score is: " + sc);
    };

    //RETURN THE HTML
    return (
        <div className="Quiz">
            {!loading && !userLoggedIn && <Navigate to={"/login"} replace={true} />}

            <form onSubmit={handleScore}>
                <Typography variant="h2" sx={{ mt: 5 }} align="center">
                    Quiz
                </Typography>
                <Typography variant="body1" sx={{ my: 2 }} align="center">
                    Answer all the questions.
                </Typography>
                {quiz.map((question, index) => (
                    <>
                        <Box sx={boxStyle}>
                            <Grid container sx={{ my: 2, mx: 5 }}>
                                <Grid item md={1} sm={1} xs={12} sx={{ my: 3 }}>
                                    <Typography variant="body1">Q{index + 1}.</Typography>
                                </Grid>
                                <Grid item md={10} sm={10} xs={10} sx={{ my: 3 }}>
                                    <Grid container>
                                        <Grid item md={12} sm={12} xs={12}>
                                            <Typography variant="body1">{question.title}</Typography>
                                        </Grid>

                                        <Grid item md={12} sm={12} xs={12}>
                                            <RadioGroup
                                                onChange={(e) => {
                                                    answered[index] = e.target.value;
                                                }}
                                            >
                                                {question.answers.map((answer, i) => (
                                                    <FormControlLabel value={i} label={answer} control={<Radio required={true} />} />
                                                ))}
                                            </RadioGroup>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                ))}
                <Box textAlign="center">
                    <Button variant="contained" sx={{ my: 2 }} align="center" type="submit">
                        <Typography variant="button">Submit</Typography>
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Quiz;
