const express = require("express");
const {protect} = require("../middleware/authMiddleware.js")
const {
    registerUser, loginUser, getUserInfo
} = require("../controllers/authController.js");
const upload = require("../middleware/uploadMiddleware.js");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getUser",protect, getUserInfo);


// Image upload route
router.post("/upload-image", upload.single("image"), (req, res) => {
    // Check if a file was uploaded
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Construct the image URL
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // Send response with the uploaded image URL
    res.status(200).json({ imageUrl });
}); 
module.exports = router;