import { useAuth } from "../../contexts/AuthProvider";
import { useState, useEffect } from "react";
import { Typography, Button, Box, Skeleton, Modal, Grid, Avatar, TextField, Select, MenuItem } from "@mui/material";
import { Navigate } from "react-router-dom";

import UserBox from "../../components/UserBox";

const skeletonStyle = {
    height: "170px",
    my: 2,
    borderRadius: 5,
    boxShadow: 5,
};

const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "40%",
    bgcolor: "#1B1C20",
    border: "2px solid #000",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};
const textFieldStyle = {
    width: "100%",
    bgcolor: "#D9D9D9",
    borderRadius: 2,
};

const disabledTextFieldStyle = {
    width: "100%",
    bgcolor: "#2D3038",
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#D9D9D9",
    },
    borderRadius: 2,
};

const UserManagement = () => {
    const { currentUser, userLoggedIn, loading } = useAuth();
    const [userType, setUserType] = useState("");
    const [users, setUsers] = useState([]);
    const [userID, setUserID] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = async (e) => {
        setOpen(true);
        setUserID(e.currentTarget.id);
        const url = import.meta.env.VITE_URL;
        const response = await fetch(url + "user/" + e.currentTarget.id);
        const json = await response.json();
        if (response.ok) {
            setUsername(json.username);
            setEmail(json.email);
            setType(json.type);
        }
    };
    const handleClose = () => {
        setUsername("");
        setEmail("");
        setType("");
        setOpen(false);
    };
    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "user/" + currentUser.uid);
            const json = await response.json();
            if (response.ok) {
                setUserType(json.type);
            }
        };
        if (userLoggedIn) {
            fetchProfile();
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchUsers = async () => {
            const url = import.meta.env.VITE_URL;
            const response = await fetch(url + "user");
            const json = await response.json();
            if (response.ok) {
                setUsers(json.usersData);
            }
        };
        fetchUsers();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(type);
        console.log(username);
        console.log(userID);
        const url = import.meta.env.VITE_URL;
        const response = await fetch(url + "user/update/" + userID, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                type: type,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        if (!response.ok) {
            console.log("Error:" + JSON.stringify(json));
        }
        if (response.ok) {
            window.location.reload();
        }
    };
    //RETURN THE HTML
    return (
        <>
            <div className="Content">
                {userType != "admin" && !loading && !userLoggedIn && <Navigate to={"/login"} replace={true} />}

                <Typography variant="h2" sx={{ mt: 5 }} align="center">
                    Users List
                </Typography>
                {users.length > 0
                    ? users.map((user) => (
                          <div id={user.id} onClick={handleOpen}>
                              <UserBox data={user} />
                          </div>
                      ))
                    : [<Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />, <Skeleton animation="wave" variant="rectangular" sx={skeletonStyle} />]}
            </div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={boxStyle} className="reply">
                    <Grid display="flex" justifyContent="center" alignItems="center">
                        <Avatar sx={{ width: "100px", height: "100px" }} />
                    </Grid>
                    <Grid container>
                        <Grid item md={5} sm={12}>
                            <Typography variant="h3" sx={{ ml: 10 }}>
                                Email
                            </Typography>
                        </Grid>

                        <Grid item md={5} sm={12}>
                            <TextField variant="standard" sx={disabledTextFieldStyle} disabled value={email} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={5} sm={12}>
                            <Typography variant="h3" sx={{ ml: 10 }}>
                                Username
                            </Typography>
                        </Grid>

                        <Grid item md={5} sm={12}>
                            <TextField variant="standard" sx={textFieldStyle} placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={5} sm={12}>
                            <Typography variant="h3" sx={{ ml: 10 }}>
                                Type
                            </Typography>
                        </Grid>

                        <Grid item md={5} sm={12}>
                            <Select value={type} onChange={handleTypeChange} sx={textFieldStyle}>
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Box textAlign="center">
                        <Button variant="contained" onClick={handleUpdate}>
                            <Typography variant="button">Update</Typography>
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default UserManagement;
