import { Link } from "react-router-dom";
import { useState } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Modal, Avatar, Stack, Menu, MenuItem, IconButton } from "@mui/material";
import Feedback from "./Feedback";

import { useAuth } from "../contexts/AuthProvider";
import { auth } from "../configs/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
    const { currentUser, userLoggedIn } = useAuth();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const menuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const menuClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        setAnchorEl(null);
        signOut(auth)
            .then(() => {})
            .catch((error) => {
                console.log(error.message);
            });
    };

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
                <Stack direction="row" spacing={1}>
                    {userLoggedIn
                        ? [
                              <IconButton onClick={handleOpen}>
                                  <ChatBubbleIcon sx={{ color: "white", width: 24, height: 24 }} />
                              </IconButton>,
                          ]
                        : []}
                    <IconButton onClick={menuClick} aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
                        <Avatar sx={{ width: 24, height: 24 }} src={userLoggedIn ? currentUser.photoURL : "null"} />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={menuClose}
                        MenuListProps={{
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                "&::before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                        {userLoggedIn
                            ? [
                                  <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                                      <MenuItem onClick={menuClose}>{currentUser.displayName}</MenuItem>
                                  </Link>,
                                  <MenuItem onClick={logout}>Logout</MenuItem>,
                              ]
                            : [
                                  <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                                      <MenuItem onClick={menuClose}>Login</MenuItem>
                                  </Link>,
                                  <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
                                      <MenuItem onClick={menuClose}>Register</MenuItem>
                                  </Link>,
                              ]}
                    </Menu>
                </Stack>
            </div>
            <Modal open={open} onClose={handleClose}>
                <Feedback />
            </Modal>
        </>
    );
};

export default Navbar;
