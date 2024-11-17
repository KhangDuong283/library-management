const { ObjectId } = require('mongodb');
const NhaxuatbanService = require("../services/nhaxuatban.service");
const ApiError = require("../api-error");

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
            manxb: payload.manxb ? new ObjectId(payload.manxb) : null,
            tacgia: payload.tacgia,
            imageUrl: payload.imageUrl,
            deleted: false
        };

        Object.keys(sach).forEach(key => sach[key] === undefined && delete sach[key]);
        return sach;
    }

    // Phương thức để thêm sách mới với kiểm tra tên sách trùng
    async create(payload) {
        const sach = this.extractSachData(payload);

        // Kiểm tra và tạo nhà xuất bản nếu chưa có
        const nhaxuatban = await this.nhaxuatbanService.findById(sach.manxb.toString());
        if (!nhaxuatban) {
            throw new ApiError(404, `Nhà xuất bản với ID ${sach.manxb} không tồn tại.`);
        }

        // Thêm sách mới vào cơ sở dữ liệu
        return await this.Sach.insertOne(sach);
    }

    // Phương thức để lấy tất cả sách kèm thông tin nhà xuất bản
    async findAll() {
        const sachList = await this.Sach.aggregate([
            {
                $match: { deleted: false }  // Thêm điều kiện lọc sách chưa bị xóa
            },
            {
                $lookup: {
                    from: "nhaxuatban", // Tên collection nhà xuất bản
                    localField: "manxb", // Trường manxb trong collection sách
                    foreignField: "_id", // Trường _id trong collection nhaxuatban
                    as: "nhaxuatban" // Đặt tên cho thông tin kết hợp
                }
            },
            {
                $unwind: {
                    path: "$nhaxuatban", // Giải nén array nhaxuatban (giả sử có 1 nhà xuất bản)
                    preserveNullAndEmptyArrays: true // Giữ lại sách không có nhà xuất bản
                }
            }
        ]).toArray();

        return sachList;
    }


    // Phương thức để tìm sách theo ID kèm thông tin nhà xuất bản
    async findById(id) {
        const sach = await this.Sach.aggregate([
            {
                $match: { _id: new ObjectId(id), deleted: false } // Lọc sách theo ID
            },
            {
                $lookup: {
                    from: "nhaxuatban",
                    localField: "manxb",
                    foreignField: "_id",
                    as: "nhaxuatban"
                }
            },
            {
                $unwind: {
                    path: "$nhaxuatban",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]).toArray();

        if (sach.length === 0) {
            throw new ApiError(404, `Sách với ID ${id} không tồn tại.`);
        }

        return sach[0]; // Trả về sách đã kết hợp với nhà xuất bản
    }


    // Phương thức để cập nhật thông tin sách
    async update(id, payload) {
        const sach = this.extractSachData(payload);
        const result = await this.Sach.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: sach },
            { returnDocument: "after" }
        );
        if (!result) {
            throw new ApiError(404, `Sách với ID ${id} không tồn tại.`);
        }
        return result;
    }

    // Phương thức để xóa sách (xóa mềm)
    async delete(id) {
        const result = await this.Sach.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { deleted: true } },  // Cập nhật trường deleted thành true
            { returnDocument: "after" }    // Trả về tài liệu đã cập nhật
        );

        if (!result) {
            throw new ApiError(404, `Sách với ID ${id} không tồn tại.`);
        }
        return result;  // Trả về sách đã cập nhật với deleted = true
    }

}

module.exports = SachService;
