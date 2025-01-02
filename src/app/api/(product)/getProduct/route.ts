import connectDB from "@/database/database.db";
import { Product } from "@/model/ProductModel/Product.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
 
    // Connect to the database
    await connectDB();

    // Retrieve all products from the database
    const productsData = await Product.find();

    // Log the products data to the console
    console.log(productsData);

    // Send a successful response with the retrieved data
    return NextResponse.json(
      { message: "Process was successful!", productsData },
      { status: 200 }
    );
  } catch (error: any) {
    // Send an error response if something goes wrong
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 400 }
    );
  }
}
