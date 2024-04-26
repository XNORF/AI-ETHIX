import { Typography, Button, Box, TextField, Grid, Stack } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { auth } from "../configs/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

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
const Login = () => {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password).catch((error) => {
            alert(error.message);
        });
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Email has been sent");
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    };

    //RETURN THE HTML
    return (
        <div className="Login">
            {userLoggedIn && <Navigate to={"/"} replace={true} />}
            <Typography variant="h1" sx={{ mt: 5 }} align="center">
                AI-ETHIX
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Box sx={boxStyle}>
                    <form onSubmit={handleLogin}>
                        <Typography variant="h2" sx={{ mt: 2 }} align="center">
                            Login
                        </Typography>

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
                                <TextField variant="standard" sx={textFieldStyle} placeholder="Type your password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ mt: 1, mb: 3 }}>
                            <Grid item md={5} sm={12}></Grid>

                            <Grid item md={6} sm={12}>
                                <Stack direction="row" spacing={12}>
                                    <Link onClick={handleResetPassword}>
                                        <Typography variant="subtitle1">Forgot password?</Typography>
                                    </Link>
                                    <Link to="/signup">
                                        <Typography variant="subtitle1">Register</Typography>
                                    </Link>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Box textAlign="center" sx={{ mb: 3 }}>
                            <Button variant="contained" sx={{ my: 1 }} type="submit">
                                <Typography variant="button">Sign In</Typography>
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </div>
    );
};

export default Login;
