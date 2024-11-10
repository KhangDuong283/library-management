const express = require("express");
const sach = require("../controllers/sach.controller")

const router = express.Router();

router.get("/")
    .get(sach.findAll)
    .post(sach.create)
    .delete(sach.deleteAll);

router.get("/:id")
    .get(sach.findOne)
    .put(sach.update)
    .delete(sach.delete);

module.exports = router;