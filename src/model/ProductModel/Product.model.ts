import mongoose, { Schema } from "mongoose";


// Define the Product Schema
const ProductSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  description: {
    type:String,
    required: true,
  },
  quantity: {
    type:Number,
      required: true,
      min: 1,
    },
    price: {
      type:Number,
        required: true,
        min: 1,
      },
});

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
