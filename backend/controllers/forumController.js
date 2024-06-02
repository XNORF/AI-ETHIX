import Post from "../models/Post.js";

const createNewPost = async (req, res) => {
    const postJSON = req.body;
    try {
        const post = new Post();
        post.createPost(postJSON);
        res.status(200).json({ msg: "Successful create new post" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const uploadAttachment = async (req, res) => {
    const attachment = req.body;
    try {
        const post = new Post();
        const attachmentURL = await post.uploadAttachment(attachment);
        res.status(200).json({ attachmentURL });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

// RETURN POST + COMMENTS (NEED TO REVISE)
const getPostData = async (req, res) => {
    const { id } = req.params;
    try {
        const post = new Post();
        const postData = (await post.getPost(id)).data();
        if (!postData) {
            res.status(404).json({ msg: "Post not found" });
        } else {
            const comments = await post.getComments(id);
            res.status(200).json({ postData, comments });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const getPostsData = async (req, res) => {
    try {
        const post = new Post();
        const postsData = await post.getPosts();
        if (!postsData) {
            res.status(404).json({ msg: "No posts found" });
        } else {
            res.status(200).json({ postsData });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
const updatePostData = async (req, res) => {};
const deletePost = async (req, res) => {};

export { createNewPost, getPostData, getPostsData, updatePostData, deletePost, uploadAttachment };
