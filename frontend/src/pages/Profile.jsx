import { Typography, Button, Box, TextField, Grid, Avatar, IconButton } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { auth } from "../configs/firebase";
import { useState, useEffect } from "react";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const boxStyle = {
    width: "55%",
    bgcolor: "#121418",
    borderRadius: 5,
    boxShadow: 24,
};

const textFieldStyle = {
    width: "100%",
    bgcolor: "#D9D9D9",
    borderRadius: 2,
    px: 1,
};

const disabledTextFieldStyle = {
    width: "100%",
    bgcolor: "#2D3038",
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#D9D9D9",
    },
    borderRadius: 2,
    px: 1,
};
const Profile = () => {
    const { currentUser, userLoggedIn, loading } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("");
    const [img, setImg] = useState("");

    //RUN ONCE PAGE LOADED
    useEffect(() => {
        const fetchProfile = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "user/" + currentUser.uid);
            const json = await response.json();
            if (response.ok) {
                setUsername(json.username);
                setEmail(json.email);
                setType(json.type);
            }
        };
        if (userLoggedIn) {
            fetchProfile();
        }
    }, [currentUser]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const url = import.meta.env.VITE_URL;
        const response = await fetch(url + "user/update/" + currentUser.uid, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                type: type,
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
            updateProfile(auth.currentUser, {
                displayName: username,
            }).then(() => {
                alert("Profile updated successfully");
                window.location.reload();
            });
        }
    };
    const handleResetPasswords = () => {
        sendPasswordResetEmail(auth, email).then(() => {
            console.log("Sent password reset");
            alert("Password reset sent to email");
        });
    };

    //RETURN THE HTML
    return (
        <div className="Profile">
            {!loading && !userLoggedIn && <Navigate to={"/login"} replace={true} />}

            <Grid display="flex" justifyContent="center" alignItems="center" sx={{ mt: 5 }}>
                <label htmlFor="contained-button-file">
                    <IconButton component="label">
                        <input type="file" hidden accept="image/*" />

                        <Avatar sx={{ width: "150px", height: "150px" }} src={userLoggedIn ? currentUser.photoURL : "null"} />
                    </IconButton>
                </label>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Box sx={boxStyle}>
                    <Typography variant="h2" sx={{ mt: 2 }} align="center">
                        Profile
                    </Typography>
                    <Grid container sx={{ mt: 3 }}>
                        <Grid item md={5} sm={12}>
                            <Typography variant="h3" sx={{ ml: 10 }}>
                                Email
                            </Typography>
                        </Grid>

                        <Grid item md={5} sm={12}>
                            <TextField variant="standard" sx={disabledTextFieldStyle} disabled value={userLoggedIn ? email : "null"} />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 3 }}>
                        <Grid item md={5} sm={12}>
                            <Typography variant="h3" sx={{ ml: 10 }}>
                                Username
                            </Typography>
                        </Grid>

                        <Grid item md={5} sm={12}>
                            <TextField variant="standard" sx={textFieldStyle} placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 3 }}>
                        <Grid item md={5} sm={12}>
                            <Typography variant="h3" sx={{ ml: 10 }}>
                                Reset Password
                            </Typography>
                        </Grid>

                        <Grid item md={5} sm={12}>
                            <Button variant="contained" onClick={handleResetPasswords}>
                                <Typography variant="button">Change</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    ,<Grid container sx={{ mt: 1, mb: 3 }}></Grid>,
                    <Box textAlign="center" sx={{ mb: 3 }}>
                        <Button variant="contained" sx={{ my: 1 }} onClick={handleUpdate}>
                            <Typography variant="button">Update</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default Profile;
