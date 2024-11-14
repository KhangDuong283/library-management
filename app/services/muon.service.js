const { ObjectId } = require('mongodb');

class MuonService {
    constructor(client) {
        this.client = client;
        this.Muon = this.client.db("librarymanagement").collection("muon");
    }
}

module.exports = MuonService;