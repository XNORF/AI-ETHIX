import { Typography, Box, Grid, Skeleton, Avatar, CardHeader } from "@mui/material";

const boxStyle = {
    bgcolor: "#121418",
    borderRadius: 5,
    boxShadow: 5,
};

const UserBox = (props) => {
    const data = props.data;
    //RETURN THE HTML
    return (
        <Box sx={boxStyle}>
            <Grid container sx={{ my: 2 }}>
                <Grid item md={12} sm={12} sx={{ my: 1, mx: 3 }}>
                    <Grid container>
                        <Grid item md={12} sm={12} xs={12}>
                            <CardHeader
                                avatar={<Avatar />}
                                title={
                                    <Grid container alignContent="space-between">
                                        <Grid item md={11} sm={11} xs={11}>
                                            <Typography variant="h3">{data.username}</Typography>
                                        </Grid>
                                        <Grid item md={1} sm={1} xs={1}>
                                            <Typography variant="h3">{data.type.toUpperCase()}</Typography>
                                        </Grid>
                                    </Grid>
                                }
                            />
                        </Grid>

                        <Grid item md={12} sm={12} xs={12}></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};
export default UserBox;
