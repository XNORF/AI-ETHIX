import { Typography, Box, Grid, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

const boxStyle = {
    bgcolor: "#121418",
    borderRadius: 5,
    boxShadow: 5,
};

const ContentList = (props) => {
    const data = props.data;
    //RETURN THE HTML
    return (
        <div className="ContentList" id={data.id}>
            <Link to={"/" + props.type + "/" + data.id} style={{ textDecoration: "none", color: "inherit" }}>
                <Box sx={boxStyle}>
                    <Grid container sx={{ my: 2, mx: 3 }}>
                        <Grid item md={2} sm={2} sx={{ my: 1 }}>
                            {true ? <img style={{ height: "150px", width: "150px", objectFit: "cover", objectPosition: "0 0" }} src="https://img.freepik.com/free-vector/dark-blue-abstract-banner-half-tone-style-design_1017-39807.jpg" /> : <Skeleton animation="wave" variant="rectangular" height={150} width={150} />}
                        </Grid>
                        <Grid item md={9} sm={9} sx={{ my: 3 }}>
                            <Grid container>
                                <Grid item md={12} sm={12}>
                                    <Typography variant="h3">{data.title}</Typography>
                                </Grid>

                                <Grid item md={12} sm={12}>
                                    <Typography variant="body1">{data.content.length > 250 ? data.content.substr(0, 250) + "... Read more" : data.content}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Link>
        </div>
    );
};
export default ContentList;
