import { Typography, Button, Box, TextField, Grid, Stack, Skeleton } from "@mui/material";
import QuizList from "../components/QuizList";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useParams, Navigate } from "react-router-dom";

const skeletonStyle = {
    height: "170px",
    my: 2,
    borderRadius: 5,
    boxShadow: 5,
};

const Quizzes = () => {
    const { currentUser, userLoggedIn, loading } = useAuth();
    const [quizzes, setQuizzes] = useState([]);

    //RUN ONCE PAGE LOADED
    useEffect(() => {
        const fetchQuizzes = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "quiz/");
            const json = await response.json();
            if (response.ok) {
                setQuizzes(json.quizzesData);
            }
        };

        fetchQuizzes();
    }, []);
    //RETURN THE HTML
    return (
        <div className="Resources">
            {!loading && !userLoggedIn && <Navigate to={"/login"} replace={true} />}

            <Typography variant="h2" sx={{ mt: 5 }} align="center">
                Quizzes
            </Typography>
            <Typography variant="body1" sx={{ my: 2 }} align="center">
                Explore thought-provoking questions on bias, transparency, privacy, regulations and more in AI.
            </Typography>
            {quizzes.length > 0 ? quizzes.map((quiz, index) => <QuizList data={quiz} index={index} />) : [<Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />]}
        </div>
    );
};

export default Quizzes;
