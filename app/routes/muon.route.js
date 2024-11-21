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

router.route("/extend/:id")
    .put(muon.extendBorrow);

router.route("/request-extend/:id")
    .put(muon.requestExtend);

router.route("/reject-request-extend/:id")
    .put(muon.rejectRequestExtend);

router.route("/accept-request-extend/:id")
    .put(muon.acceptRequestExtend);

router.route("/cho-muon/:id")
    .put(muon.choMuon);

module.exports = router;