const express = require("express");
const cors = require("cors");
const app = express();

const docgiaRouter = require("./app/routes/docgia.route");
const muonRouter = require("./app/routes/muon.route");
const nhanvienRouter = require("./app/routes/nhanvien.route");
const nxbRouter = require("./app/routes/nhaxuatban.route");
const sachRouter = require("./app/routes/sach.route");


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

app.use("/api/docgia", docgiaRouter);
app.use("/api/muon", muonRouter);
app.use("/api/nhanvien", nhanvienRouter);
app.use("/api/nhaxuatban", nxbRouter);
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
