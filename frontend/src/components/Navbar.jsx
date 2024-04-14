import { Link } from "react-router-dom";
import { useState } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Modal, Avatar, Stack } from "@mui/material";

import Feedback from "./Feedback";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <div className="nav">
                <Stack direction="row" spacing={2}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <p>
                            <b>AI-ETHIX</b>
                        </p>
                    </Link>
                    <Link to="/resources" style={{ textDecoration: "none" }}>
                        <p>Resources</p>
                    </Link>
                    <Link to="/guidelines" style={{ textDecoration: "none" }}>
                        <p>Guidelines</p>
                    </Link>
                    <Link to="/forums" style={{ textDecoration: "none" }}>
                        <p>Forums</p>
                    </Link>
                    <Link to="/quiz" style={{ textDecoration: "none" }}>
                        <p>Quizzes</p>
                    </Link>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Link onClick={handleOpen} style={{ textDecoration: "none" }}>
                        <ChatBubbleIcon />
                    </Link>
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                        <Avatar sx={{ width: 24, height: 24 }} />
                    </Link>
                </Stack>
            </div>
            <Modal open={open} onClose={handleClose}>
                <Feedback />
            </Modal>
        </>
    );
};

export default Navbar;
