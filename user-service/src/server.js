const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorMiddleware");

dotenv.config();

const app = express();
app.use(express.json());

connectDB();
app.use("/api/users", userRoutes);
// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
