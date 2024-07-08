import { useAuth } from "../../contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import { Typography, Button, Box, TextField, Grid, Stack, Skeleton, Modal, Link } from "@mui/material";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import AddContent from "../../components/AddContent";
import UpdateContent from "../../components/UpdateContent";
import AddQuiz from "../../components/AddQuiz";

const skeletonStyle = {
    height: "170px",
    my: 2,
    borderRadius: 5,
    boxShadow: 5,
};

const boxStyle = {
    bgcolor: "#121418",
    borderRadius: 5,
    boxShadow: 5,
};

const ContentManagement = () => {
    const { currentUser, userLoggedIn, loading } = useAuth();

    const [cMOpen, setCMOpen] = useState(false);
    const handleCMOpen = () => setCMOpen(true);
    const handleCMClose = () => setCMOpen(false);

    const [qMOpen, setQMOpen] = useState(false);
    const handleQMOpen = () => setQMOpen(true);
    const handleQMClose = () => setQMOpen(false);

    const [ucMOpen, setUCMOpen] = useState(false);
    const handleUCMOpen = (e) => {
        setUpdateID(e.currentTarget.id);
        setUpdateType(e.currentTarget.getAttribute("data-type"));
        setUCMOpen(true);
    };
    const handleUCMClose = () => setUCMOpen(false);

    const [contents, setContents] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    const [updateID, setUpdateID] = useState("");
    const [updateType, setUpdateType] = useState("");

    //RUN ONCE PAGE LOADED
    useEffect(() => {
        const fetchContents = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "content/");
            const json = await response.json();
            if (response.ok) {
                setContents(json.contentsData);
            }
        };

        const fetchQuizzes = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "quiz/");
            const json = await response.json();
            if (response.ok) {
                setQuizzes(json.quizzesData);
            }
        };

        fetchContents();
        fetchQuizzes();
    }, []);

    const handleDelete = async (e) => {
        if (confirm("Do you wish to delete this item?")) {
            const id = e.currentTarget.id;
            const contentType = e.currentTarget.getAttribute("data-type");
            const url = import.meta.env.VITE_URL;
            if (contentType == "content") {
                const response = await fetch(url + "content/delete/" + id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const json = await response.json();
                if (response.ok) {
                    alert(json.msg);
                    window.location.reload();
                } else {
                    console.log("Error:" + JSON.stringify(json));
                }
            } else if (contentType == "quiz") {
                const response = await fetch(url + "quiz/" + id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const json = await response.json();
                if (response.ok) {
                    alert(json.msg);
                    window.location.reload();
                } else {
                    console.log("Error:" + JSON.stringify(json));
                }
            }
        }
    };

    //RETURN THE HTML
    return (
        <div className="Content">
            {!loading && !userLoggedIn && <Navigate to={"/login"} replace={true} />}
            <Typography variant="h2" sx={{ mt: 5 }} align="center">
                Content List
            </Typography>
            <Box textAlign="center">
                <Button variant="contained" sx={{ my: 2 }} align="center" onClick={handleCMOpen}>
                    <Typography variant="button">Add Content</Typography>
                </Button>{" "}
                <Button variant="contained" sx={{ my: 2 }} align="center" onClick={handleQMOpen}>
                    <Typography variant="button">Add Quiz</Typography>
                </Button>
            </Box>
            <Box alignContent="center">
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Typography variant="subtitle1" align="center">
                            <Link href="#contents">Content</Link>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" align="center">
                            <Link href="#quiz">Quiz</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <div id="contents">
                <Typography variant="h3" align="center">
                    Resources/Guidelines List
                </Typography>

                {contents.length > 0
                    ? contents.map((data) => (
                          <Box sx={boxStyle}>
                              <Grid container sx={{ my: 2, mx: 3 }}>
                                  <Grid item md={2} sm={2} sx={{ my: 1 }}>
                                      {data.banner ? <img style={{ height: "150px", width: "150px", objectFit: "cover", objectPosition: "center" }} src={data.banner} id={data.id} /> : <Skeleton animation="wave" variant="rectangular" height={150} width={150} id={data.id} />}
                                  </Grid>
                                  <Grid item md={9} sm={9} sx={{ my: 3 }}>
                                      <Grid container>
                                          <Grid item md={12} sm={12}>
                                              <Typography variant="subtitle1">ID: #{data.id}</Typography>
                                              <Typography variant="h3">{data.title}</Typography>
                                          </Grid>

                                          <Grid item md={12} sm={12}>
                                              <Typography variant="subtitle1">{data.content}</Typography>
                                          </Grid>
                                          <Grid item md={12} sm={12}>
                                              <Typography variant="subtitle1">
                                                  Source:{" "}
                                                  <Link href={data.source} target="_blank">
                                                      {data.source}
                                                  </Link>
                                              </Typography>
                                          </Grid>
                                      </Grid>
                                  </Grid>
                                  <Grid item md={1} sm={1} sx={{ my: 3 }}>
                                      <Button variant="contained" color="error" onClick={handleDelete} id={data.id} data-type="content">
                                          <DeleteIcon />
                                      </Button>
                                      <Button variant="contained" onClick={handleUCMOpen} id={data.id} data-type={data.type}>
                                          <EditIcon />
                                      </Button>
                                  </Grid>
                              </Grid>
                          </Box>
                      ))
                    : [<Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />]}
            </div>
            <div id="quiz">
                <Typography variant="h3" align="center">
                    Quizzes List
                </Typography>
                {quizzes.length > 0
                    ? quizzes.map((data, index) => (
                          <Box sx={boxStyle}>
                              <Grid container sx={{ my: 2, mx: 3 }}>
                                  <Grid container>
                                      <Grid item md={11} sm={11} sx={{ my: 3 }}>
                                          <Grid item md={12} sm={12}>
                                              <Grid item md={12} sm={12}>
                                                  <Typography variant="h3">Quiz {index + 1}</Typography>
                                              </Grid>

                                              <Grid item md={12} sm={12}>
                                                  <Typography variant="body1">Q1. {data.questions[0].title.length > 200 ? data.questions[0].title.substr(0, 200) + "... Read more" : data.questions[0].title}</Typography>
                                              </Grid>
                                          </Grid>
                                      </Grid>
                                      <Grid item md={1} sm={1} sx={{ my: 3 }}>
                                          <Button variant="contained" color="error" onClick={handleDelete} id={data.id} data-type="quiz">
                                              <DeleteIcon />
                                          </Button>
                                          <Link href={"../quiz/" + data.id} style={{ textDecoration: "none", color: "inherit" }}>
                                              <Button variant="contained">
                                                  <ArrowForwardIosIcon />
                                              </Button>
                                          </Link>
                                      </Grid>
                                  </Grid>
                              </Grid>
                          </Box>
                      ))
                    : [<Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />]}
            </div>
            {/* CONTENT ADD */}
            <Modal open={cMOpen} onClose={handleCMClose}>
                <AddContent />
            </Modal>
            {/* QUIZ ADD */}
            <Modal open={qMOpen} onClose={handleQMClose}>
                <AddQuiz />
            </Modal>
            {/* CONTENT UPDATE */}
            <Modal open={ucMOpen} onClose={handleUCMClose}>
                <UpdateContent id={updateID} type={updateType} />
            </Modal>
        </div>
    );
};

export default ContentManagement;
