const { ObjectId } = require('mongodb');
const ApiError = require('../api-error');
const NhaxuatbanService = require('./NhaxuatbanService');

class SachService {
    constructor(client) {
        this.client = client;
        this.Sach = this.client.db("librarymanagement").collection("sach");
        this.nhaxuatbanService = new NhaxuatbanService(client);
    }

    // Hàm để trích xuất dữ liệu sách từ payload
    extractSachData(payload) {
        const sach = {
            tensach: payload.tensach,
            dongia: payload.dongia,
            soquyen: payload.soquyen,
            namxuatban: payload.namxuatban,
            manxb: payload.manxb ? ObjectId(payload.manxb) : null,
            tacgia: payload.tacgia
        };

        Object.keys(sach).forEach(key => sach[key] === undefined && delete sach[key]);
        return sach;
    }

    // Phương thức để thêm sách mới với kiểm tra tên sách trùng
    async create(payload) {
        const sach = this.extractSachData(payload);

        const existingSach = await this.Sach.findOne({ tensach: sach.tensach });
        if (existingSach) {
            throw new ApiError(400, `Tên sách "${sach.tensach}" đã tồn tại.`);
        }

        if (sach.manxb) {
            const nhaxuatban = await this.nhaxuatbanService.findById(sach.manxb.toString());
            if (!nhaxuatban) {
                throw new ApiError(404, `Nhà xuất bản với ID ${sach.manxb} không tồn tại.`);
            }
        }

        const result = await this.Sach.insertOne(sach);
        return result.ops[0];
    }

    async findAll() {
        return await this.Sach.find({}).toArray();
    }

    async findById(id) {
        const sach = await this.Sach.findOne({ _id: new ObjectId(id) });
        if (!sach) {
            throw new ApiError(404, `Sách với ID ${id} không tồn tại.`);
        }
        return sach;
    }

    async update(id, payload) {
        const sach = this.extractSachData(payload);
        const result = await this.Sach.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: sach },
            { returnDocument: "after" }
        );
        if (!result.value) {
            throw new ApiError(404, `Sách với ID ${id} không tồn tại.`);
        }
        return result.value;
    }

    async delete(id) {
        const result = await this.Sach.findOneAndDelete({ _id: new ObjectId(id) });
        if (!result.value) {
            throw new ApiError(404, `Sách với ID ${id} không tồn tại.`);
        }
        return result.value;
    }
}

module.exports = SachService;
