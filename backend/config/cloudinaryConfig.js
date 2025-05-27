const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: 'dylwpquku',
    api_key: '979916494574712',
    api_secret: '74bFqUqGo2QMojlz_UlFkWM7Nww',
  });

module.exports = cloudinary;
