exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Book name cant not be empty"));
    }

    try {
        const contactService = new contactService(MongoDB.client)
        const document = await contactService.create(req.body);
        return res.send(document)
    } catch (error) {
        return next(
            new ApiError(500, error.message)
        )
    }
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

