const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.username}! You have accessed a protected route.`,
  });
});

module.exports = router;
