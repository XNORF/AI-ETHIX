import { useAuth } from "../../contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import { Typography, Button, Box, TextField, Grid, Stack, Skeleton, Modal, Link } from "@mui/material";
import { useState, useEffect } from "react";
import AddContent from "../../components/AddContent";
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

    const [contents, setContents] = useState([]);

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

        fetchContents();
    }, []);

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
            {contents.length > 0
                ? contents.map((data) => (
                      <Box sx={boxStyle} id={data.id}>
                          <Grid container sx={{ my: 2, mx: 3 }} id={data.id}>
                              <Grid item md={2} sm={2} sx={{ my: 1 }} id={data.id}>
                                  {data.banner ? <img style={{ height: "150px", width: "150px", objectFit: "cover", objectPosition: "center" }} src={data.banner} id={data.id} /> : <Skeleton animation="wave" variant="rectangular" height={150} width={150} id={data.id} />}
                              </Grid>
                              <Grid item md={9} sm={9} sx={{ my: 3 }} id={data.id}>
                                  <Grid container id={data.id}>
                                      <Grid item md={12} sm={12} id={data.id}>
                                          <Typography variant="subtitle1" id={data.id}>
                                              ID: #{data.id}
                                          </Typography>
                                          <Typography variant="h3" id={data.id}>
                                              {data.title}
                                          </Typography>
                                      </Grid>

                                      <Grid item md={12} sm={12} id={data.id}>
                                          <Typography variant="subtitle1" id={data.id}>
                                              {data.content}
                                          </Typography>
                                      </Grid>
                                      <Grid item md={12} sm={12} id={data.id}>
                                          <Typography variant="subtitle1" id={data.id}>
                                              Source:{" "}
                                              <Link href={data.source} target="_blank">
                                                  {data.source}
                                              </Link>
                                          </Typography>
                                      </Grid>
                                  </Grid>
                              </Grid>
                          </Grid>
                      </Box>
                  ))
                : [<Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />]}

            {/* CM */}
            <Modal open={cMOpen} onClose={handleCMClose}>
                <AddContent />
            </Modal>

            {/* QM */}
            <Modal open={qMOpen} onClose={handleQMClose}>
                <AddQuiz />
            </Modal>
        </div>
    );
};

export default ContentManagement;
