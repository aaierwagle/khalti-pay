import mongoose, { Schema } from "mongoose";

// Define the Cart Schema
const CartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  orderedQuantity: {
    type: Number,
    required: true,
    min: 1,
  },

}, { timestamps: true });

export const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
