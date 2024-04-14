require("dotenv").config();
const express = require("express");
const cors = require("cors");
const testRoute = require("./routes/testRoute");

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
app.use("/test", testRoute);

//listen for requests
app.listen(process.env.PORT, () => {
    console.log("Hello World");
});
