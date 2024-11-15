const ApiError = require("../api-error");
const SachService = require("../services/sach.service");
const MongoDB = require("../utils/mongodb.util");

// Hàm tạo mới sách
exports.create = async (req, res, next) => {
    if (!req.body?.tensach) {
        return next(new ApiError(400, "Tên sách không được để trống"));
    }

    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.create(req.body);
        return res.status(201).send(document);
    } catch (error) {
        console.error("Lỗi khi tạo sách:", error);
        return next(new ApiError(500, "Không thể tạo sách"));
    }
};

// Hàm tìm tất cả sách
exports.findAll = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const sachs = await sachService.findAll();
        res.send(sachs);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
        next(new ApiError(500, "Không thể lấy danh sách sách"));
    }
};

// Hàm tìm một sách theo ID
exports.findOne = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const sach = await sachService.findById(req.params.id);
        if (!sach) {
            return next(new ApiError(404, "Không tìm thấy sách"));
        }
        res.send(sach);
    } catch (error) {
        console.error("Lỗi khi tìm sách:", error);
        next(new ApiError(500, "Lỗi khi tìm sách"));
    }
};

// Hàm cập nhật sách theo ID
exports.update = async (req, res, next) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        const sachService = new SachService(MongoDB.client);
        const sach = await sachService.update(req.params.id, req.body);
        if (!sach) {
            return next(new ApiError(404, "Không tìm thấy sách để cập nhật"));
        }
        res.send(sach);
    } catch (error) {
        console.error("Lỗi khi cập nhật sách:", error);
        next(new ApiError(500, "Không thể cập nhật sách"));
    }
};

// Hàm xóa một sách theo ID
exports.delete = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const sach = await sachService.delete(req.params.id);
        if (!sach) {
            return next(new ApiError(404, "Không tìm thấy sách để xóa"));
        }
        res.send({ message: "Xóa sách thành công" });
    } catch (error) {
        console.error("Lỗi khi xóa sách:", error);
        next(new ApiError(500, "Không thể xóa sách"));
    }
};

// Hàm xóa tất cả sách
exports.deleteAll = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        await sachService.deleteAll();
        res.send({ message: "Xóa tất cả sách thành công" });
    } catch (error) {
        console.error("Lỗi khi xóa tất cả sách:", error);
        next(new ApiError(500, "Không thể xóa tất cả sách"));
    }
};
