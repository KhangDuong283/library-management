const { ObjectId } = require('mongodb');

class DocgiaService {
    constructor(client) {
        this.client = client;
        this.Docgia = this.client.db("librarymanagement").collection("docgia");
    }
}

module.exports = DocgiaService;