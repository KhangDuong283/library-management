const { ObjectId } = require('mongodb');

class SachService {
    constructor(client) {
        this.client = client;
        this.Sach = this.client.db("librarymanagement").collection("sach");
    }
}

module.exports = SachService;