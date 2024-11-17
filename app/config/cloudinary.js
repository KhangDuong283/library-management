const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({
    cloud_name: 'dcfpmobtg',
    api_key: '744617218617271',
    api_secret: 'lFgdaz1yH5xeM7k46p4tmja6ypc'
});

module.exports = cloudinary;