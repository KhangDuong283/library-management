const { ObjectId } = require('mongodb');
const ApiError = require('../api-error');

class NhanVienService {
    constructor(client) {
        this.client = client;
        this.NhanVien = this.client.db("librarymanagement").collection("nhanvien");
    }

    // Hàm để trích xuất dữ liệu nhân viên từ payload
    extractNhanVienData(payload) {
        const nhanvien = {
            hotennv: payload.hotennv,
            password: payload.password,
            chucvu: payload.chucvu,
            diachi: payload.diachi,
            sodienthoai: payload.sodienthoai
        };

        // Loại bỏ các trường không có giá trị
        Object.keys(nhanvien).forEach(key => nhanvien[key] === undefined && delete nhanvien[key]);
        return nhanvien;
    }

    // Phương thức để thêm nhân viên mới
    async create(payload) {
        const nhanvien = this.extractNhanVienData(payload);

        // Thêm nhân viên mới vào cơ sở dữ liệu
        const result = await this.NhanVien.insertOne(nhanvien);
        return result;
    }

    // Phương thức để lấy tất cả nhân viên
    async findAll() {
        return await this.NhanVien.find({}).toArray();
    }

    // Phương thức để tìm nhân viên theo ID
    async findById(id) {
        const nhanvien = await this.NhanVien.findOne({ _id: new ObjectId(id) });
        if (!nhanvien) {
            throw new ApiError(404, `Nhân viên với ID ${id} không tồn tại.`);
        }
        return nhanvien;
    }

    // Phương thức để cập nhật thông tin nhân viên
    async update(id, payload) {
        const nhanvien = this.extractNhanVienData(payload);
        const result = await this.NhanVien.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: nhanvien },
            { returnDocument: "after" }
        );
        if (!result) {
            throw new ApiError(404, `Nhân viên với ID ${id} không tồn tại.`);
        }
        return result;
    }

    // Phương thức để xóa nhân viên
    async delete(id) {
        const result = await this.NhanVien.findOneAndDelete({ _id: new ObjectId(id) });
        if (!result) {
            throw new ApiError(404, `Nhân viên với ID ${id} không tồn tại.`);
        }
        return result;
    }

    // Đăng nhập
    async login(payload) {
        const existingNhanvien = await this.NhanVien.findOne(
            {
                sodienthoai: payload.dienThoai,
                password: payload.password
            });

        if (existingNhanvien == null) {
            throw new ApiError(401, "Số điện thoại hoặc mật khẩu không chính xác.");
        }
        return existingNhanvien;
    }
}

module.exports = NhanVienService;
