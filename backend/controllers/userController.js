import User from "../models/User.js";
const createNewUser = async (req, res) => {
    const userJSON = req.body;
    try {
        const user = new User();
        user.createUser(userJSON);
        res.status(200).json({ msg: "Successful user registration" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
const getUserData = async (req, res) => {
    const { id } = req.params;
    try {
        const user = new User();
        const userData = (await user.getUser(id)).data();
        if (!userData) {
            res.status(404).json({ msg: "User not found" });
        } else {
            res.status(200).json(userData);
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const getUsersData = async (req, res) => {
    try {
        const user = new User();
        const usersData = await user.getUsers();
        if (!usersData) {
            res.status(404).json({ msg: "No user found" });
        } else {
            res.status(200).json({ usersData });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
const updateUserData = async (req, res) => {
    const { id } = req.params;
    const userJSON = req.body;

    try {
        const user = new User();
        user.updateUser(id, userJSON);
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
const deleteUser = async (req, res) => {};

export { createNewUser, getUserData, getUsersData, updateUserData, deleteUser };
