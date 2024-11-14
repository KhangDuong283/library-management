const ApiError = require("../api-error");
const MuonService = require("../services/muon.service");
const MongoDB = require("../utils/mongodb.util");

// Hàm tạo mới thông tin mượn sách
exports.create = async (req, res, next) => {
    try {
        const muonService = new MuonService(MongoDB.client);
        const muon = await muonService.create(req.body);
        res.status(201).send(muon);
    } catch (error) {
        next(new ApiError(500, "Không thể tạo thông tin mượn sách " + error.message));
    }
};

// Hàm tìm tất cả thông tin mượn sách
exports.findAll = async (req, res, next) => {
    try {
        const muonService = new MuonService(MongoDB.client);
        const muonList = await muonService.findAll();
        res.send(muonList);
    } catch (error) {
        next(new ApiError(500, "Không thể lấy danh sách mượn sách " + error.message));
    }
};

// Hàm tìm thông tin mượn sách theo ID
exports.findOne = async (req, res, next) => {
    try {
        const muonService = new MuonService(MongoDB.client);
        const muon = await muonService.findById(req.params.id);
        if (!muon) {
            return next(new ApiError(404, "Không tìm thấy thông tin mượn sách"));
        }
        res.send(muon);
    } catch (error) {
        next(new ApiError(500, "Lỗi khi tìm thông tin mượn sách " + error.message));
    }
};

// Hàm cập nhật thông tin mượn sách theo ID
exports.update = async (req, res, next) => {
    try {
        const muonService = new MuonService(MongoDB.client);
        const muon = await muonService.update(req.params.id, req.body);
        if (!muon) {
            return next(new ApiError(404, "Không tìm thấy thông tin mượn sách để cập nhật"));
        }
        res.send(muon);
    } catch (error) {
        next(new ApiError(500, "Không thể cập nhật thông tin mượn sách " + error.message));
    }
};

// Hàm xóa thông tin mượn sách theo ID
exports.delete = async (req, res, next) => {
    try {
        const muonService = new MuonService(MongoDB.client);
        const isDeleted = await muonService.delete(req.params.id);
        if (!isDeleted) {
            return next(new ApiError(404, "Không tìm thấy thông tin mượn sách để xóa"));
        }
        res.send({ message: "Xóa thông tin mượn sách thành công" });
    } catch (error) {
        next(new ApiError(500, "Không thể xóa thông tin mượn sách " + error.message));
    }
};

// Hàm xóa tất cả thông tin mượn sách
exports.deleteAll = async (req, res, next) => {
    try {
        const muonService = new MuonService(MongoDB.client);
        const deletedCount = await muonService.deleteAll();
        res.send({ message: `Xóa ${deletedCount} thông tin mượn sách thành công` });
    } catch (error) {
        next(new ApiError(500, "Không thể xóa tất cả thông tin mượn sách " + error.message));
    }
};

exports.returnBook = async (req, res, next) => {
    try {
        const muonService = new MuonService(MongoDB.client);
        const muon = await muonService.returnBook(req.params.id);
        if (!muon) {
            return next(new ApiError(404, "Không tìm thấy thông tin mượn sách để trả"));
        }
        res.send(muon);
    } catch (error) {
        next(new ApiError(500, "Không thể trả sách " + error.message));
    }
}
