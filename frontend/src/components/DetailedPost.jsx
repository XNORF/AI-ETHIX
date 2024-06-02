import { Typography, Box, Grid, Skeleton, Avatar, CardHeader } from "@mui/material";

const boxStyle = {
    bgcolor: "#121418",
    borderRadius: 5,
    boxShadow: 5,
};

const DetailedPost = (props) => {
    const data = props.data;
    //RETURN THE HTML
    return (
        <div className="DetailedPost" id={data.id}>
            <Box sx={boxStyle}>
                <Grid container sx={{ my: 2 }}>
                    <Grid item md={12} sm={12} sx={{ mt: 2, mx: 3 }}>
                        <Grid container>
                            <Grid item md={12} sm={12} xs={12}>
                                <CardHeader avatar={<Avatar />} title={<Typography variant="h3">{data.username}</Typography>} />
                            </Grid>

                            <Grid item md={12} sm={12} xs={12}>
                                <Typography variant="body1">{data.content}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={12} sm={12} sx={{ my: 1 }} align="center">
                        {props.type == "post" && data.attachment && <img style={{ height: "", width: "95%", objectFit: "cover", objectPosition: "0 0" }} src={data.attachment} alt="Attachment" />}
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
export default DetailedPost;
