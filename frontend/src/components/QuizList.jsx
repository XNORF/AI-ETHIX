import { Typography, Box, Grid, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

const boxStyle = {
    bgcolor: "#121418",
    borderRadius: 5,
    boxShadow: 5,
};

const QuizList = (props) => {
    const data = props.data;
    //RETURN THE HTML
    return (
        <div className="QuizList" id={data.id}>
            <Link to={"/quiz/" + data.id} style={{ textDecoration: "none", color: "inherit" }}>
                <Box sx={boxStyle}>
                    <Grid container sx={{ my: 2, mx: 3 }}>
                        <Grid item md={12} sm={12} sx={{ my: 3 }}>
                            <Grid container>
                                <Grid item md={12} sm={12}>
                                    <Typography variant="h3">Quiz {props.index + 1}</Typography>
                                </Grid>

                                <Grid item md={12} sm={12}>
                                    <Typography variant="body1">Q1. {data.questions[0].title.length > 200 ? data.questions[0].title.substr(0, 200) + "... Read more" : data.questions[0].title}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Link>
        </div>
    );
};
export default QuizList;
