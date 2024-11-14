const { ObjectId } = require('mongodb');
const ApiError = require("../api-error");
const NhaxuatbanService = require("../services/nhaxuatban.service");
const MongoDB = require("../utils/mongodb.util")

// Hàm tạo mới nhà xuất bản
exports.create = async (req, res, next) => {
    try {
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const nhaxuatban = await nhaxuatbanService.create(req.body);
        res.status(201).send(nhaxuatban);
    } catch (error) {
        console.error("Lỗi khi tạo nhà xuất bản:", error);
        next(new ApiError(500, "Không thể tạo nhà xuất bản"));
    }
};

// Hàm tìm tất cả nhà xuất bản
exports.findAll = async (req, res, next) => {
    try {
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const nxbList = await nhaxuatbanService.findAll();
        res.send(nxbList);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách nhà xuất bản:", error);
        next(new ApiError(500, "Không thể lấy danh sách nhà xuất bản"));
    }
};

// Hàm tìm một nhà xuất bản theo ID
exports.findOne = async (req, res, next) => {
    try {
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const nxb = await nhaxuatbanService.findById(req.params.id);
        if (!nxb) {
            return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
        }
        res.send(nxb);
    } catch (error) {
        next(new ApiError(500, "Lỗi khi tìm nhà xuất bản"));
    }
};

// Hàm cập nhật nhà xuất bản theo ID
exports.update = async (req, res, next) => {
    try {
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const nxb = await nhaxuatbanService.update(req.params.id, req.body);
        if (!nxb) {
            return next(new ApiError(404, "Không tìm thấy nhà xuất bản để cập nhật"));
        }
        res.send(nxb);
    } catch (error) {
        console.error("Lỗi khi cập nhật nhà xuất bản:", error);
        next(new ApiError(500, "Không thể cập nhật nhà xuất bản"));
    }
};

// Hàm xóa một nhà xuất bản theo ID
exports.delete = async (req, res, next) => {
    try {
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        const nxb = await nhaxuatbanService.delete(req.params.id);
        if (!nxb) {
            return next(new ApiError(404, "Không tìm thấy nhà xuất bản để xóa"));
        }
        res.send({ message: "Xóa nhà xuất bản thành công" });
    } catch (error) {
        next(new ApiError(500, "Không thể xóa nhà xuất bản"));
    }
};

// Hàm xóa tất cả nhà xuất bản
exports.deleteAll = async (req, res, next) => {
    try {
        const nhaxuatbanService = new NhaxuatbanService(MongoDB.client);
        await nhaxuatbanService.deleteAll();
        res.send({ message: "Xóa tất cả nhà xuất bản thành công" });
    } catch (error) {
        next(new ApiError(500, "Không thể xóa tất cả nhà xuất bản"));
    }
};
