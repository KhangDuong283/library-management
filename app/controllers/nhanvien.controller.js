const ApiError = require("../api-error");
const NhanVienService = require("../services/nhanvien.service");
const MongoDB = require("../utils/mongodb.util");

// Hàm tạo mới nhân viên
exports.create = async (req, res, next) => {
    // Kiểm tra các trường thông tin bắt buộc
    if (!req.body?.hotennv || !req.body?.password || !req.body?.chucvu || !req.body?.diachi || !req.body?.sodienthoai) {
        return next(new ApiError(400, "Tất cả các trường thông tin nhân viên là bắt buộc."));
    }

    try {
        const nhanVienService = new NhanVienService(MongoDB.client);

        // Kiểm tra xem số điện thoại đã tồn tại trong cơ sở dữ liệu hay chưa
        const existingNhanVien = await nhanVienService.NhanVien.findOne({ sodienthoai: req.body.sodienthoai });
        if (existingNhanVien) {
            return next(new ApiError(400, "Số điện thoại đã tồn tại."));
        }

        // Tạo nhân viên mới
        const document = await nhanVienService.create(req.body);
        return res.status(201).send(document);
    } catch (error) {
        console.error("Lỗi khi tạo nhân viên:", error);
        return next(new ApiError(500, "Không thể tạo nhân viên"));
    }
};


// Hàm tìm tất cả nhân viên
exports.findAll = async (req, res, next) => {
    try {
        const nhanVienService = new NhanVienService(MongoDB.client);
        const nhanViens = await nhanVienService.findAll();
        res.send(nhanViens);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
        next(new ApiError(500, "Không thể lấy danh sách nhân viên"));
    }
};

// Hàm tìm một nhân viên theo ID
exports.findOne = async (req, res, next) => {
    try {
        const nhanVienService = new NhanVienService(MongoDB.client);
        const nhanVien = await nhanVienService.findById(req.params.id);
        if (!nhanVien) {
            return next(new ApiError(404, "Không tìm thấy nhân viên"));
        }
        res.send(nhanVien);
    } catch (error) {
        console.error("Lỗi khi tìm nhân viên:", error);
        next(new ApiError(500, "Lỗi khi tìm nhân viên"));
    }
};

// Hàm cập nhật nhân viên theo ID
exports.update = async (req, res, next) => {
    try {
        const nhanVienService = new NhanVienService(MongoDB.client);
        const nhanVien = await nhanVienService.update(req.params.id, req.body);
        if (!nhanVien) {
            return next(new ApiError(404, "Không tìm thấy nhân viên để cập nhật"));
        }
        res.send(nhanVien);
    } catch (error) {
        console.error("Lỗi khi cập nhật nhân viên:", error);
        next(new ApiError(500, "Không thể cập nhật nhân viên"));
    }
};

// Hàm xóa một nhân viên theo ID
exports.delete = async (req, res, next) => {
    try {
        const nhanVienService = new NhanVienService(MongoDB.client);
        const nhanVien = await nhanVienService.delete(req.params.id);
        if (!nhanVien) {
            return next(new ApiError(404, "Không tìm thấy nhân viên để xóa"));
        }
        res.send({ message: "Xóa nhân viên thành công" });
    } catch (error) {
        console.error("Lỗi khi xóa nhân viên:", error);
        next(new ApiError(500, "Không thể xóa nhân viên"));
    }
};

// Hàm xóa tất cả nhân viên
exports.deleteAll = async (req, res, next) => {
    try {
        const nhanVienService = new NhanVienService(MongoDB.client);
        await nhanVienService.deleteAll();
        res.send({ message: "Xóa tất cả nhân viên thành công" });
    } catch (error) {
        console.error("Lỗi khi xóa tất cả nhân viên:", error);
        next(new ApiError(500, "Không thể xóa tất cả nhân viên"));
    }
};
