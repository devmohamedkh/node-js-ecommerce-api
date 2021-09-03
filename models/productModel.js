const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const productSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    productCode: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      default: 1,
    },
    productImages: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);
module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
