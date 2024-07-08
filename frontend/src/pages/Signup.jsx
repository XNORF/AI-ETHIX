import { Typography, Button, Box, TextField, Grid } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { auth } from "../configs/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

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

const Signup = () => {
    const { userLoggedIn } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const addUserDB = async (userJSON) => {
        //FETCH BACKEND API TO CREATE USER TO DATABASE
        const url = import.meta.env.VITE_URL;
        const response = await fetch(url + "user/signup", {
            method: "POST",
            body: JSON.stringify(userJSON),
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

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password == confirmPassword) {
            if (password.length < 8) {
                alert("Password is too short");
            } else {
                //FIREBASE AUTH
                createUserWithEmailAndPassword(auth, email, password)
                    .then((cred) => {
                        if (cred.user != null) {
                            updateProfile(auth.currentUser, {
                                displayName: username,
                                photoURL: "https://firebasestorage.googleapis.com/v0/b/ai-ethix.appspot.com/o/avatar%2Fdefault.jpg?alt=media&token=d1000949-3af6-41c3-a0df-34c5ff1c85f9",
                            }).then(() => {
                                sendEmailVerification(cred.user);
                                addUserDB({ id: { ...cred.user }.uid, username, email });
                            });
                        }
                        alert("Registration successful");
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            }
        } else {
            alert("Password confirmation does not match");
        }
    };

    //RETURN THE HTML
    return (
        <div className="Signup">
            {userLoggedIn && <Navigate to={"/"} replace={true} />}
            <Typography variant="h1" sx={{ mt: 5 }} align="center">
                AI-ETHIX
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Box sx={boxStyle}>
                    <form onSubmit={handleSignup}>
                        <Typography variant="h2" sx={{ mt: 2 }} align="center">
                            Signup
                        </Typography>
                        <Grid container sx={{ mt: 5 }}>
                            <Grid item md={5} sm={12}>
                                <Typography variant="h3" sx={{ ml: 10 }}>
                                    Username
                                </Typography>
                            </Grid>

                            <Grid item md={5} sm={12}>
                                <TextField variant="standard" sx={textFieldStyle} placeholder="Type your username" onChange={(e) => setUsername(e.target.value)} value={username} required />
                            </Grid>
                        </Grid>

                        <Grid container sx={{ mt: 3 }}>
                            <Grid item md={5} sm={12}>
                                <Typography variant="h3" sx={{ ml: 10 }}>
                                    Email
                                </Typography>
                            </Grid>

                            <Grid item md={5} sm={12}>
                                <TextField variant="standard" sx={textFieldStyle} placeholder="Type your email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ mt: 3 }}>
                            <Grid item md={5} sm={12}>
                                <Typography variant="h3" sx={{ ml: 10 }}>
                                    Password
                                </Typography>
                            </Grid>

                            <Grid item md={5} sm={12}>
                                <TextField variant="standard" sx={textFieldStyle} placeholder="Type your password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ my: 3 }}>
                            <Grid item md={5} sm={12}></Grid>

                            <Grid item md={5} sm={12}>
                                <TextField variant="standard" sx={textFieldStyle} placeholder="Confirm your password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
                            </Grid>
                        </Grid>
                        <Box textAlign="center" sx={{ mb: 2 }}>
                            <Button variant="contained" type="submit" sx={{ my: 1 }}>
                                <Typography variant="button">Signup</Typography>
                            </Button>
                            <br />
                            <Link to="/login">
                                <Typography variant="subtitle1">Login</Typography>
                            </Link>
                        </Box>
                    </form>
                </Box>
            </Box>
        </div>
    );
};

export default Signup;
