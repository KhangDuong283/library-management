const { ObjectId } = require('mongodb');

class NhanvienService {
    constructor(client) {
        this.client = client;
        this.Nhanvien = this.client.db("librarymanagement").collection("nhanvien");
    }
}

module.exports = NhanvienService;