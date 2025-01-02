import connectDB from "@/database/database.db";
import { Product } from "@/model/ProductModel/Product.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // Extract the product ID from the URL path
        const url = new URL(request.url);
        const productId = url.pathname.split('/').pop();

        if (!productId || productId === 'getProduct') {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        console.log(productId);

        // Connect to the database
        await connectDB();

        // Retrieve the product by its ID
        const productDataDetails = await Product.findById(productId);

        if (!productDataDetails) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        // Send a successful response with the retrieved data
        return NextResponse.json(
            { message: "Process was successful!", productDataDetails },
            { status: 200 }
        );
    } catch (error: any) {
        // Send an error response if something goes wrong
        return NextResponse.json(
            { message: "Something went wrong", error: error.message || error },
            { status: 500 }
        );
    }
}
