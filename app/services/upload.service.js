const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

// Cấu hình CloudinaryStorage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "books",
        allowed_formats: ["jpg", "png", "jpeg"],
        transformation: [{ width: 500, height: 500, crop: "limit" }]
    }
});

// Middleware upload sử dụng multer
const uploadMiddleware = multer({ storage }).fields([{ name: "image", maxCount: 1 }]);

// Service để xử lý upload ảnh lên Cloudinary
const uploadImageToCloudinary = async (file) => {
    if (!file) {
        throw new Error("No file uploaded");
    }
    // Trả về đường dẫn ảnh đã upload
    return file.path;
};

module.exports = {
    uploadMiddleware,
    uploadImageToCloudinary,
};
