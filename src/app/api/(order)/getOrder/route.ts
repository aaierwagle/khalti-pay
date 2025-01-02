import { userId } from "@/app/constant/constants";
import connectDB from "@/database/database.db";
import { OrderCollection } from "@/model/OrderModel/Order.Model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Aggregate to retrieve cart items along with product details
    const orderDataFromBackend = await OrderCollection.aggregate([
      // Match the orders for the specific userId
      { $match: { userId } },
      {
        $lookup: {
          from: "products",  // Replace "products" with your actual products collection name
          localField: "productId",
          foreignField: "_id",
          as: "productDetails"
        }
      }
    ]);

    // Send a successful response with the retrieved data
    return NextResponse.json(
      { message: "Process was successful!", orderDataFromBackend },
      { status: 200 }
    );
  } catch (error: any) {
    // Send an error response if something goes wrong
    return NextResponse.json(
      { message: "Something went wrong", error: error.message || error },
      { status: 400 }
    );
  }
}
