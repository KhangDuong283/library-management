exports.create = (req, res) => {
    res.send({ message: "Create new NXB" });
}

exports.findAll = (req, res) => {
    res.send({ message: "Find all NXBs" });
}

exports.findOne = (req, res) => {
    res.send({ message: "Find one NXB" });
}

exports.update = (req, res) => {
    res.send({ message: "Update NXB" });
}

exports.delete = (req, res) => {
    res.send({ message: "Delete NXB" });
}

exports.deleteAll = (req, res) => {
    res.send({ message: "Delete all NXBs" });
}

