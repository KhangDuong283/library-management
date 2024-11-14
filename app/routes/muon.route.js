const express = require("express");
const muon = require("../controllers/muon.controller")

const router = express.Router();

router.route("/")
    .get(muon.findAll)
    .post(muon.create)
    .delete(muon.deleteAll);

router.route("/:id")
    .get(muon.findOne)
    .put(muon.update)
    .delete(muon.delete);

router.route("/return/:id")
    .put(muon.returnBook);

module.exports = router;