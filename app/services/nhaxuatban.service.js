const { ObjectId } = require('mongodb');

class NhaxuatbanService {
    constructor(client) {
        this.client = client;
        this.Nhaxuatban = this.client.db("librarymanagement").collection("nhaxuatban");
    }
}

module.exports = NhaxuatbanService;