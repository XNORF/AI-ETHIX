import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { useAuth } from "../contexts/AuthProvider";

const Home = () => {
    const { currentUser, userLoggedIn } = useAuth();
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "user/" + currentUser.uid);
            const json = await response.json();
            if (response.ok) {
                setUsername(json.username);
            }
        };
        if (userLoggedIn) {
            fetchUser();
        }
    }, [currentUser]);

    //RETURN THE HTML
    return (
        <div className="Home">
            <Box textAlign="center">
                <Typography variant="h1" sx={{ mt: 10 }} align="center">
                    AI-ETHIX
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant="body1" sx={{ mt: 2, width: "60%" }}>
                        Explore ethical AI development with us. Dive into resources, join discussions, and access guidelines for responsible AI development. Shape a future where AI benefits everyone responsibly.
                    </Typography>
                </Box>
                {userLoggedIn
                    ? [
                          <Button variant="contained" sx={{ mt: 5 }} align="center">
                              <Typography variant="button">Welcome {username}</Typography>
                          </Button>,
                      ]
                    : [
                          <Link to="/signup" style={{ textDecoration: "none" }}>
                              <Button variant="contained" sx={{ mt: 5 }} align="center">
                                  <Typography variant="button">Get Started</Typography>
                              </Button>
                          </Link>,
                      ]}
            </Box>
            <Box>
                <Typography variant="h2" sx={{ mt: 15 }} align="center">
                    Features
                </Typography>
            </Box>
        </div>
    );
};

export default Home;
