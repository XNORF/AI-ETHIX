import { useAuth } from "../../contexts/AuthProvider";
import { useState, useEffect } from "react";
import { Typography, Button, Box, Skeleton } from "@mui/material";
import FeedbackPost from "../../components/FeedbackPost";
import { Navigate } from "react-router-dom";

const skeletonStyle = {
    height: "170px",
    my: 2,
    borderRadius: 5,
    boxShadow: 5,
};

const AdminFeedback = () => {
    const { currentUser, userLoggedIn, loading } = useAuth();
    const [userType, setUserType] = useState("");
    const [feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        const fetchProfile = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "user/" + currentUser.uid);
            const json = await response.json();
            if (response.ok) {
                setUserType(json.type);
            }
        };
        if (userLoggedIn) {
            fetchProfile();
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "feedback");
            const json = await response.json();
            if (response.ok) {
                setFeedbacks(json.feedbacksData);
            }
        };
        fetchFeedbacks();
    }, []);

    //RETURN THE HTML
    return (
        <div className="Feedback">
            {userType != "admin" && !loading && !userLoggedIn && <Navigate to={"/login"} replace={true} />}

            <Typography variant="h2" sx={{ mt: 5 }} align="center">
                Feedback List
            </Typography>
            {feedbacks.length > 0 ? feedbacks.map((feedback) => [<FeedbackPost data={feedback} />]) : [<Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />]}
        </div>
    );
};

export default AdminFeedback;
