import { Link } from "react-router-dom";
import { Typography, Box, Stack, Skeleton } from "@mui/material";
const Content = () => {
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Amet aliquam id diam maecenas ultricies mi. In cursus turpis massa tincidunt. Semper viverra nam libero justo. Neque volutpat ac tincidunt vitae. Amet purus gravida quis blandit turpis cursus. Sed turpis tincidunt id aliquet risus. Velit ut tortor pretium viverra. Mi tempus
    imperdiet nulla malesuada pellentesque. Adipiscing tristique risus nec feugiat in fermentum posuere. Cras tincidunt lobortis feugiat vivamus at augue eget. Purus sit amet volutpat consequat mauris nunc congue. At quis risus sed vulputate odio ut. Diam vel quam elementum pulvinar etiam non. Quam lacus suspendisse faucibus interdum posuere lorem. Dictum non consectetur a erat. Porttitor massa id neque aliquam vestibulum morbi blandit cursus risus. Elit eget gravida cum sociis
    natoque penatibus et magnis dis. Enim diam vulputate ut pharetra sit amet. Hendrerit dolor magna eget est lorem ipsum dolor sit. \n Platea dictumst vestibulum rhoncus est. Interdum consectetur libero id faucibus nisl tincidunt eget nullam. Ipsum consequat nisl vel pretium lectus quam id leo. Sit amet facilisis magna etiam tempor. Arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales. Pretium nibh ipsum consequat nisl vel pretium lectus quam id. Adipiscing elit ut
    aliquam purus. Semper quis lectus nulla at volutpat diam ut. Adipiscing bibendum est ultricies integer quis auctor. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Aliquet nec ullamcorper sit amet risus nullam eget felis. Nisi quis eleifend quam adipiscing. Aliquam ultrices sagittis orci a scelerisque purus semper eget duis. Hac habitasse platea dictumst quisque sagittis purus sit. Vulputate odio ut enim blandit volutpat maecenas. Sagittis eu volutpat odio
    facilisis mauris sit amet massa vitae.\n Amet facilisis magna etiam tempor orci eu. Et pharetra pharetra massa massa ultricies mi. Pharetra pharetra massa massa ultricies mi quis. Massa sapien faucibus et molestie.`;
    const image = false;
    //RETURN THE HTML
    return (
        <div className="content">
            <Typography variant="h2" sx={{ mt: 5 }} align="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }} align="center">
                Author: Lorem ipsum dolor sit amet, consectetur
            </Typography>
            <Typography variant="body1" align="center">
                Source: <Link to="">Link</Link>
            </Typography>
            <Box sx={{ mt: 5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                    <Typography variant="body1">Post by: Username</Typography>
                    <Typography variant="body1">27 Dec 2023 15:37:24</Typography>
                </Stack>

                {image ? <img /> : <Skeleton animation="wave" variant="rectangular" height={200} />}
                <Typography variant="body1" align="justify" sx={{ mt: 5 }} style={{ wordWrap: "break-word" }}>
                    {text}
                </Typography>
            </Box>
        </div>
    );
};

export default Content;
