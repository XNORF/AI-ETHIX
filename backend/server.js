import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import contentRoute from "./routes/contentRoute.js";
import forumRoute from "./routes/forumRoute.js";
import quizRoute from "./routes/quizRoute.js";

//express app
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use("/user", userRoute);
app.use("/feedback", feedbackRoute);
app.use("/content", contentRoute);
app.use("/forum", forumRoute);
app.use("/quiz", quizRoute);

//listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is running");
});
