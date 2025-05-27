// const multer = require('multer'); // Import multer

// // Configure storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Save files in the "uploads" folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
//     },
// });

// // File filter to allow only specific image formats
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true); // Accept file
//     } else {
//         cb(new Error('Only .jpeg, .jpg, and .png formats are allowed'), false); // Reject file
//     }
// };

// // Create an upload instance with storage and file filter
// const upload = multer({ storage, fileFilter });

// module.exports = upload; // Export upload middleware

const multer = require("multer");

// Configure storage for multer, but we're not saving locally
const storage = multer.memoryStorage(); // Use memory storage to upload directly to Cloudinary

// File filter to allow only specific image formats
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only .jpeg, .jpg, and .png formats are allowed'), false); // Reject file
  }
};

// Create an upload instance with memory storage
const upload = multer({ storage, fileFilter });

module.exports = upload;
