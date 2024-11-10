exports.create = (req, res) => {
    res.send({ message: "Create new book" });
}

exports.findAll = (req, res) => {
    res.send({ message: "Find all books" });
}

exports.findOne = (req, res) => {
    res.send({ message: "Find one book" });
}

exports.update = (req, res) => {
    res.send({ message: "Update book" });
}

exports.delete = (req, res) => {
    res.send({ message: "Delete book" });
}

exports.deleteAll = (req, res) => {
    res.send({ message: "Delete all books" });
}

