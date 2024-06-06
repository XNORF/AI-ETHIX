import { useAuth } from "../../contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";

const ContentManagement = () => {
    const { currentUser, userLoggedIn, loading } = useAuth();

    //RETURN THE HTML
    return (
        <div className="Content">
            {!loading && !userLoggedIn && <Navigate to={"/login"} replace={true} />}

            <Typography variant="h2" sx={{ mt: 5 }} align="center">
                Content List
            </Typography>
        </div>
    );
};

export default ContentManagement;
