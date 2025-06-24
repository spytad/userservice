const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../utils/responseHandler");

/**
 * Create a new user.
 *
 * Uses bcrypt to hash the password before saving.
 * Returns a standardized success response on success.
 * If a duplicate key error is detected (code 11000), an appropriate error message is returned.
 */
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // In a real-world scenario, you might want to check for existing users first.
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return successResponse(res, "User created successfully", null);
  } catch (error) {
    // Handle duplicate key error (username or email already exists)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }
    return errorResponse(res, error.message);
  }
};

/**
 * Login a user and issue a JWT.
 *
 * Checks the provided credentials, compares hashed passwords,
 * and returns a JWT token on successful authentication.
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and sign the token with a 1-hour expiration
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return successResponse(res, "Login successful", { token });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
