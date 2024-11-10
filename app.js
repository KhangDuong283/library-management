const express = require("express");
const cors = require("cors");
const app = express();

const sachRouter = require("./app/routes/sach.route");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

app.use("/api/sach", sachRouter);

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource Not Found"));
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: "error",
        statusCode: err.statusCode,
        message: err.message
    });
});

module.exports = app;
