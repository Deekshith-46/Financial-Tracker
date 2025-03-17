const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },  // User's full name (Required)
    email: { type: String, required: true, unique: true },  // Unique email (Required)
    password: { type: String, required: true },  // User password (Required)
    profileImageUrl: { type: String, default: null }  // Optional profile image
  },
  { timestamps: true }  // Automatically adds createdAt & updatedAt fields
);

// Middleware: Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is new/changed
  this.password = await bcrypt.hash(this.password, 10); // Hash password with salt rounds
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
module.exports = mongoose.model("User", UserSchema);
