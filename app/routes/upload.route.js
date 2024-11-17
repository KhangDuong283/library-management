const express = require("express");
const { uploadMiddleware, uploadImage } = require("../controllers/upload.controller");
const router = express.Router();

router.route("/")
    .post(uploadMiddleware, uploadImage);

module.exports = router;