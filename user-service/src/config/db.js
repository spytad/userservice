
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

// ✅ Add this debug log here
console.log('MONGO_URI:', process.env.MONGO_URI);

const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
