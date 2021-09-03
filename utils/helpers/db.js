const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("monog db connected successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
