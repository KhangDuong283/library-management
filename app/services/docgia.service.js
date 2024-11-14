const { ObjectId } = require('mongodb');
const ApiError = require('../api-error');

class DocgiaService {
    constructor(client) {
        this.client = client;
        this.Docgia = this.client.db("librarymanagement").collection("docgia");
    }

    // Hàm trích xuất dữ liệu độc giả từ payload
    extractDocGiaData(payload) {
        const docgia = {
            hoLot: payload.hoLot,
            ten: payload.ten,
            ngaySinh: payload.ngaySinh,
            phai: payload.phai,
            diaChi: payload.diaChi,
            dienThoai: payload.dienThoai,
            password: payload.password
        };

        Object.keys(docgia).forEach(key => docgia[key] === undefined && delete docgia[key]);
        return docgia;
    }

    // Phương thức để thêm độc giả mới
    async create(payload) {
        const docgia = this.extractDocGiaData(payload);

        // Kiểm tra số điện thoại đã tồn tại hay chưa
        const existingDocGia = await this.Docgia.findOne({ dienThoai: docgia.dienThoai });
        if (existingDocGia) {
            throw new ApiError(400, `Số điện thoại "${docgia.dienThoai}" đã tồn tại.`);
        }

        // Thêm độc giả mới vào cơ sở dữ liệu
        return await this.Docgia.insertOne(docgia);
    }

    // Phương thức để lấy tất cả độc giả
    async findAll() {
        return await this.Docgia.find({}).toArray();
    }

    // Phương thức để tìm độc giả theo ID
    async findById(id) {
        const docgia = await this.Docgia.findOne({ _id: new ObjectId(id) });
        if (!docgia) {
            throw new ApiError(404, `Độc giả với ID ${id} không tồn tại.`);
        }
        return docgia;
    }

    // Phương thức để cập nhật thông tin độc giả
    async update(id, payload) {
        const docgia = this.extractDocGiaData(payload);
        const result = await this.Docgia.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: docgia },
            { returnDocument: "after" }
        );
        if (!result) {
            throw new ApiError(404, `Độc giả với ID ${id} không tồn tại.`);
        }
        return result;
    }

    // Phương thức để xóa độc giả
    async delete(id) {
        const result = await this.Docgia.findOneAndDelete({ _id: new ObjectId(id) });
        if (!result) {
            throw new ApiError(404, `Độc giả với ID ${id} không tồn tại.`);
        }
        return result;
    }
}

module.exports = DocgiaService;
