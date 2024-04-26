import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, createTheme, ThemeProvider } from "@mui/material";

//PAGES & COMPONENTS
//user pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import Forums from "./pages/Forums";
import Guideline from "./pages/Guideline";
import Guidelines from "./pages/Guidelines";
import Resource from "./pages/Resource";
import Resources from "./pages/Resources";
import Quiz from "./pages/Quiz";
import Quizzes from "./pages/Quizzes";

//components
import Navbar from "./components/Navbar";

//contexts
import { AuthProvider } from "./contexts/AuthProvider";

const theme = createTheme({
    typography: {
        h1: {
            fontFamily: "Outfit",
            fontWeight: 700,
            fontSize: "65px",
        },
        h2: {
            fontFamily: "Outfit",
            fontWeight: 700,
            fontSize: "36px",
        },
        h3: {
            fontFamily: "Outfit",
            fontWeight: 400,
            fontSize: "27px",
        },
        body1: {
            fontFamily: "Roboto",
            fontWeight: 400,
            fontSize: "20px",
        },
        button: {
            fontFamily: "Outfit",
            fontWeight: 400,
            fontSize: "15px",
        },
        subtitle1: {
            fontFamily: "Outfit",
            fontWeight: 400,
            fontSize: "15px",
        },
    },
});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Container>
                    <BrowserRouter>
                        <AuthProvider>
                            <Navbar />
                            <div className="pages">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/signup" element={<Signup />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/forums/:id" element={<Forum />} />
                                    <Route path="/forums" element={<Forums />} />
                                    <Route path="/guidelines/:id" element={<Guideline />} />
                                    <Route path="/guidelines" element={<Guidelines />} />
                                    <Route path="/resources/:id" element={<Resource />} />
                                    <Route path="/resources" element={<Resources />} />
                                    <Route path="/quiz/:id" element={<Quiz />} />
                                    <Route path="/quiz" element={<Quizzes />} />
                                </Routes>
                            </div>
                        </AuthProvider>
                    </BrowserRouter>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;
