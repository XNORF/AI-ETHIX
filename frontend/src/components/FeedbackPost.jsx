import { Typography, Box, Grid, Skeleton, Avatar, CardHeader } from "@mui/material";

const boxStyle = {
    bgcolor: "#121418",
    borderRadius: 5,
    boxShadow: 5,
};

const FeedbackPost = (props) => {
    const data = props.data;
    //RETURN THE HTML
    return (
        <div className="FeedbackPost" id={data.id}>
            <Box sx={boxStyle}>
                <Grid container sx={{ my: 2 }}>
                    <Grid item md={12} sm={12} sx={{ mt: 2, mx: 3 }}>
                        <Grid container>
                            <Grid item md={12} sm={12} xs={12}>
                                <CardHeader avatar={<Avatar />} title={<Typography variant="h3">{data.username}</Typography>} />
                            </Grid>

                            <Grid item md={12} sm={12} xs={12}>
                                <Typography variant="body1">{data.feedback}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={12} sm={12} sx={{ mx: 3, my: 1 }}>
                        <Grid container justifyContent="flex-end">
                            <Typography variant="body1" align="left">
                                {data.datetime}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};
export default FeedbackPost;
