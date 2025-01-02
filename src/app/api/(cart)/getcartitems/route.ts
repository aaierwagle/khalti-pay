import connectDB from "@/database/database.db";
import { Cart } from "@/model/CartModel/Cart.model";
import { Product } from "@/model/ProductModel/Product.model"; // Assuming you have a Product model
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
    try {
        // Connect to the database
        await connectDB();

        // Define the user ID (ensure this is a valid ObjectId)
        const userId = new mongoose.Types.ObjectId("64b7eaf4d4f8c9a8a22b3f1c");

        // Aggregate to retrieve cart items along with product details
        const cartDataFromBackend = await Cart.aggregate([
            { $match: { userId } },
            {
                $lookup: {
                    from: "products", // Replace with your actual products collection name
                    localField: "productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $unwind: "$productDetails"
            },
            {
                $group: {
                    _id: "$userId",
                    products: {
                        $push: {
                            product: "$productDetails",
                            orderedQuantity: "$orderedQuantity"
                        }
                    },
                    totalQuantity: { $sum: "$orderedQuantity" },
                    totalPrice: { $sum: { $multiply: ["$orderedQuantity", "$productDetails.price"] } }
                }
            }
        ]);

        // Check if cartDataFromBackend has data
        if (!cartDataFromBackend.length) {
            return NextResponse.json(
                { message: "No cart data found for this user." },
                { status: 404 }
            );
        }

        // Send a successful response with the aggregated data
        return NextResponse.json(
            { message: "Process was successful!", cartData: cartDataFromBackend[0] },
            { status: 200 }
        );
    } catch (error: any) {
        // Log the error for debugging
        console.error("Error fetching cart data:", error);

        // Send an error response if something goes wrong
        return NextResponse.json(
            { message: "Something went wrong", error: error.message || error },
            { status: 500 }
        );
    }
}
