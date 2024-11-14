const { ObjectId } = require('mongodb');
const ApiError = require('../api-error'); // Import ApiError

class NhaxuatbanService {
    constructor(client) {
        this.client = client;
        this.Nhaxuatban = this.client.db("librarymanagement").collection("nhaxuatban");
    }

    // Phương thức để tạo nhà xuất bản mới
    async create(payload) {
        const nhaxuatban = {
            tennxb: payload.tennxb,
            diachi: payload.diachi,
        };

        // Kiểm tra xem tên nhà xuất bản có tồn tại chưa
        const existingNhaxuatban = await this.Nhaxuatban.findOne({ tennxb: nhaxuatban.tennxb });
        if (existingNhaxuatban) {
            throw new ApiError(400, `Nhà xuất bản với tên "${nhaxuatban.tennxb}" đã tồn tại.`);
        }

        const result = await this.Nhaxuatban.insertOne(nhaxuatban);
        return result;
    }

    // Phương thức để tìm nhà xuất bản theo ID
    async findById(id) {
        const nhaxuatban = await this.Nhaxuatban.findOne({ _id: new ObjectId(id) });
        if (!nhaxuatban) {
            throw new ApiError(404, `Nhà xuất bản với ID ${id} không tồn tại.`);
        }
        return nhaxuatban;
    }

    // Phương thức để lấy tất cả nhà xuất bản
    async findAll() {
        return await this.Nhaxuatban.find({}).toArray();
    }

    // Phương thức để cập nhật thông tin nhà xuất bản
    async update(id, payload) {
        const nhaxuatban = {
            tennxb: payload.tennxb,
            diachi: payload.diachi,
        };

        // Tìm kiếm và cập nhật nhà xuất bản
        const result = await this.Nhaxuatban.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: nhaxuatban },
            { returnDocument: "after" }
        );

        if (!result) {
            // Trường hợp không tìm thấy nhà xuất bản
            throw new ApiError(404, `Nhà xuất bản với ID ${id} không tồn tại.`);
        }
        return result;
    }

    // Phương thức để xóa nhà xuất bản
    async delete(id) {
        const result = await this.Nhaxuatban.findOneAndDelete({ _id: new ObjectId(id) });
        if (!result) {
            throw new ApiError(404, `Nhà xuất bản với ID ${id} không tồn tại.`);
        }
        return result;
    }
}

module.exports = NhaxuatbanService;
