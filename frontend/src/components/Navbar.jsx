import { Link } from "react-router-dom";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Modal from "@mui/material/Modal";

import Feedback from "./Feedback";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <div className="nav">
                <ul>
                    <li>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <p>
                                <b>AI-ETHIX</b>
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/resources" style={{ textDecoration: "none" }}>
                            <p>Resources</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/guidelines" style={{ textDecoration: "none" }}>
                            <p>Guidelines</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/forums" style={{ textDecoration: "none" }}>
                            <p>Forums</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/quiz" style={{ textDecoration: "none" }}>
                            <p>Quizzes</p>
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link onClick={handleOpen} style={{ textDecoration: "none" }}>
                            <ChatBubbleIcon />
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" style={{ textDecoration: "none" }}>
                            <AccountCircleIcon />
                        </Link>
                    </li>
                </ul>
            </div>
            <Modal open={open} onClose={handleClose}>
                <Feedback />
            </Modal>
        </>
    );
};

export default Navbar;
