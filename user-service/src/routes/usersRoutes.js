const express = require("express");
const router = express.Router();

const { createUser, loginUser } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/register", createUser);
router.post("/login", loginUser);

// Sample protected route using auth middleware
router.get("/profile", verifyToken, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
