import { Typography, Button, Box, TextField, Grid, Avatar, IconButton } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { auth } from "../configs/firebase";
import { useState, useEffect } from "react";

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

    //RUN ONCE PAGE LOADED
    useEffect(() => {
        const fetchProfile = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "user/" + currentUser.uid);
            const json = await response.json();
            if (response.ok) {
                setUsername(json.userData.username);
            }
        };

        fetchProfile();
    }, [currentUser]);

    //RETURN THE HTML
    return (
        <div className="Profile">
            {!loading && !userLoggedIn && <Navigate to={"/login"} replace={true} />}

            <Grid display="flex" justifyContent="center" alignItems="center" sx={{ mt: 5 }}>
                <label htmlFor="contained-button-file">
                    <IconButton>
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
                            <TextField variant="standard" sx={disabledTextFieldStyle} disabled value={userLoggedIn ? currentUser.email : "null"} />
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
                                Password
                            </Typography>
                        </Grid>

                        <Grid item md={5} sm={12}>
                            <TextField variant="standard" sx={textFieldStyle} placeholder="Your password" type="password" />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 3 }}>
                        <Grid item md={5} sm={12}>
                            <Typography variant="h3" sx={{ ml: 10 }}>
                                New
                            </Typography>
                        </Grid>

                        <Grid item md={5} sm={12}>
                            <TextField variant="standard" sx={textFieldStyle} placeholder="New password" type="password" />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 3 }}>
                        <Grid item md={5} sm={12}>
                            <Typography variant="h3" sx={{ ml: 10 }}>
                                Confirm
                            </Typography>
                        </Grid>

                        <Grid item md={5} sm={12}>
                            <TextField variant="standard" sx={textFieldStyle} placeholder="Confirm password" type="password" />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 1, mb: 3 }}></Grid>
                    <Box textAlign="center" sx={{ mb: 3 }}>
                        <Button variant="contained" sx={{ my: 1 }}>
                            <Typography variant="button">Update</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default Profile;
