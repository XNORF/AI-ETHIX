import { Typography, Button, Box, TextField, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const boxStyle = {
    width: "55%",
    bgcolor: "#121418",
    borderRadius: 5,
    boxShadow: 24,
};

const textFieldStyle = {
    width: "80%",
    bgcolor: "#D9D9D9",
    borderRadius: 2,
    px: 1,
};

const Signup = () => {
    //RETURN THE HTML
    return (
        <div className="Signup">
            <Typography variant="h1" sx={{ mt: 5 }} align="center">
                AI-ETHIX
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Box sx={boxStyle}>
                    <Typography variant="h2" sx={{ mt: 2 }} align="center">
                        Signup
                    </Typography>
                    <Grid container sx={{ mt: 5 }}>
                        <Grid item md={5}>
                            <Typography variant="h3" sx={{ ml: 10 }}>
                                Username
                            </Typography>
                        </Grid>

                        <Grid item md={7}>
                            <TextField variant="standard" sx={textFieldStyle} placeholder="Type your username" />
                        </Grid>
                    </Grid>

                    <Grid container sx={{ mt: 3 }}>
                        <Grid item md={5}>
                            <Typography variant="h3" sx={{ ml: 10 }}>
                                Email
                            </Typography>
                        </Grid>

                        <Grid item md={7}>
                            <TextField variant="standard" sx={textFieldStyle} placeholder="Type your email" />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 3 }}>
                        <Grid item md={5}>
                            <Typography variant="h3" sx={{ ml: 10 }}>
                                Password
                            </Typography>
                        </Grid>

                        <Grid item md={7}>
                            <TextField variant="standard" sx={textFieldStyle} placeholder="Type your password" type="password" />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ my: 3 }}>
                        <Grid item md={5}></Grid>

                        <Grid item md={7}>
                            <TextField variant="standard" sx={textFieldStyle} placeholder="Confirm your password" type="password" />
                        </Grid>
                    </Grid>
                    <Box textAlign="center" sx={{ mb: 2 }}>
                        <Button variant="contained" sx={{ my: 1 }}>
                            <Typography variant="button">Signup</Typography>
                        </Button>
                        <br />
                        <Link to="/login">
                            <Typography variant="button">Login</Typography>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default Signup;
