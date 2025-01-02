import mongoose, { Schema } from "mongoose";

// set rule

const OrderSchema = new Schema({

  userId: {
    type: String,
    required: true,
    ref: "users",
  },

  amount: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },


  orderedQuantity: {
    type: Number,
    required: true,
    min: 1,
  },

  subTotal: { type: Number, required: true, min: 0 },

  productId: { type: String, required: true, ref: "products" },

  paymentStatus: {
    type: String,
    required: true,
    enum: [
      "Completed",
      "Initiated",
      "Pending",
      "Expired",
      "Refunded",
      "User canceled",
      "Partially refunded",
    ],
  },

  pidx: {
    type: String,
    required: true,
    trim: true,
  },
} , {timestamps:true});

// create collection



export const OrderCollection = mongoose.models.OrderCollection || mongoose.model("OrderCollection", OrderSchema);

