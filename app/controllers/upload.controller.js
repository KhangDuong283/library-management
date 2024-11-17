const { uploadMiddleware, uploadImageToCloudinary } = require("../services/upload.service");
const ApiError = require("../api-error");

const uploadImage = async (req, res, next) => {
    try {
        const file = req.files?.image?.[0];
        if (!file) {
            throw new ApiError(400, "No file uploaded");
        }
        const imageUrl = await uploadImageToCloudinary(file);
        res.status(200).send({ imageUrl });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadMiddleware,
    uploadImage,
};
