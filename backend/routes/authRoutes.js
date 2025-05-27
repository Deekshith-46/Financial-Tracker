// const express = require("express");
// const {protect} = require("../middleware/authMiddleware.js")
// const {
//     registerUser, loginUser, getUserInfo
// } = require("../controllers/authController.js");
// const upload = require("../middleware/uploadMiddleware.js");

// const router = express.Router();

// router.post("/register", registerUser);

// router.post("/login", loginUser);

// router.get("/getUser",protect, getUserInfo);


// // Image upload route
// router.post("/upload-image", upload.single("image"), (req, res) => {
//     // Check if a file was uploaded
//     if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Construct the image URL
//     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

//     // Send response with the uploaded image URL
//     res.status(200).json({ imageUrl });
// }); 
// module.exports = router;

const express = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController.js");
const upload = require("../middleware/uploadMiddleware.js");
const cloudinary = require("../config/cloudinaryConfig"); // Import cloudinary config

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

// Image upload route
router.post("/upload-image", upload.single("image"), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
  
    try {
      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "your-folder-name",
              public_id: `${Date.now()}-${req.file.originalname}`,
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
  
          stream.end(req.file.buffer);
        });
      };
  
      const result = await uploadToCloudinary();
      res.status(200).json({ imageUrl: result.secure_url });
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      res.status(500).json({ message: "Error uploading image", error });
    }
  });
  
module.exports = router;
