import { Typography, Box, Grid, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

const boxStyle = {
    bgcolor: "#121418",
    borderRadius: 5,
    boxShadow: 5,
};

const Post = (props) => {
    const data = props.data;
    //RETURN THE HTML
    return (
        <div className="Post" id={data.id}>
            <Link to={"/forums/" + data.id} style={{ textDecoration: "none", color: "inherit" }}>
                <Box sx={boxStyle}>
                    <Grid container sx={{ my: 2 }}>
                        <Grid item md={12} sm={12} sx={{ mt: 2, mx: 3 }}>
                            <Grid container>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Typography variant="h3">{data.title}</Typography>
                                </Grid>

                                <Grid item md={12} sm={12} xs={12}>
                                    <Typography variant="body1">{data.content.length > 200 ? data.content.substr(0, 200) + "... Read more" : data.content}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={12} sm={12} sx={{ my: 1 }} align="center">
                            {data.attachment && <img style={{ height: "200px", width: "95%", objectFit: "cover", objectPosition: "0 0" }} src={data.attachment} alt="Attachment" />}
                        </Grid>
                        <Grid item md={12} sm={12} sx={{ mx: 3, my: 1 }} align="left">
                            <Grid container>
                                <Grid item md={6} sm={6} align="left">
                                    <Typography variant="body1">By {data.username}</Typography>
                                </Grid>

                                <Grid item md={6} sm={6} align="right">
                                    <Typography variant="body1">{data.datetime}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Link>
        </div>
    );
};
export default Post;
