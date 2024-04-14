import { Box, Button, TextField, Typography } from "@mui/material";

const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
    bgcolor: "#1B1C20",
    border: "2px solid #000",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

const textFieldStyle = {
    width: "80%",
    bgcolor: "#2D3038",
    borderRadius: 2,
};

const Feedback = () => {
    //RETURN THE HTML
    return (
        <div>
            <Box sx={boxStyle} className="feedback">
                <Typography variant="h2">Feedback</Typography>
                <TextField sx={textFieldStyle} inputProps={{ style: { color: "aliceblue" } }} id="filled-multiline-static" multiline rows={6} placeholder="Feedback" variant="filled" required />
                <Button variant="contained" sx={{ mb: 2 }}>
                    <Typography variant="button">Submit</Typography>
                </Button>
            </Box>
        </div>
    );
};

export default Feedback;
