import { Typography, Button, Box, TextField, Grid, Stack } from "@mui/material";
import { Link } from "react-router-dom";

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
    //RETURN THE HTML
    return (
        <div className="Login">
            <Typography variant="h1" sx={{ mt: 5 }} align="center">
                AI-ETHIX
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Box sx={boxStyle}>
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
                            <TextField variant="standard" sx={textFieldStyle} placeholder="Type your email" />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 3 }}>
                        <Grid item md={5} sm={12}>
                            <Typography variant="h3" sx={{ ml: 10 }}>
                                Password
                            </Typography>
                        </Grid>

                        <Grid item md={5} sm={12}>
                            <TextField variant="standard" sx={textFieldStyle} placeholder="Type your password" type="password" />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 1, mb: 3 }}>
                        <Grid item md={5} sm={12}></Grid>

                        <Grid item md={6} sm={12}>
                            <Stack direction="row" spacing={12}>
                                <Link>
                                    <Typography variant="subtitle1">Forgot password?</Typography>
                                </Link>
                                <Link to="/signup">
                                    <Typography variant="subtitle1">Register</Typography>
                                </Link>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Box textAlign="center" sx={{ mb: 3 }}>
                        <Button variant="contained" sx={{ my: 1 }}>
                            <Typography variant="button">Sign In</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default Login;
