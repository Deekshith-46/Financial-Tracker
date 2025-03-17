const User = require("../models/User")
const jwt = require("jsonwebtoken");

//Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

//Register User
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    // Check if all required fields are present
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Create the new user
        const user = await User.create({
            fullName,
            email,
            password, // Password will be hashed automatically if handled in the User model
            profileImageUrl,
        });

        // Send a success response with the created user's ID
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
            message: "User registered successfully"
        });

    } catch (error) {
        // Handle errors and send a response
        res.status(500).json({ message: "Error registreing user", error: error.message });
    }

};

//Login User
exports.loginUser =async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request

    // Check if both fields are provided
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists and if the password is correct
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Send a success response with user details and token
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id), // Assuming generateToken function is defined
        });

    } catch (err) {
        // Handle server errors
        res.status(500).json({ message: "Error registreing user", error: err.message });
    }

};

//Get Users Info
exports.getUserInfo =async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        res.status(200).json(user);
    } catch(err){
        res.status(500).json({message:"Error user", error:err.message})
    }
};
