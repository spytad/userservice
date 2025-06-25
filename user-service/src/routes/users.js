const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.username}! You have accessed a protected route.`,
  });
});

module.exports = router;
