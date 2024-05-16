import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";

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

//listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is running");
});
