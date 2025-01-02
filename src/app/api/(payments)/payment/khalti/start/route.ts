;import connectDB from "@/database/database.db";
import { OrderCollection } from "@/model/OrderModel/Order.Model";


import { generateRandomString } from "@/utils/generate.random.string";
import axios from "axios";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Connect to the database
  await connectDB();

  // Parse the request body
  const body = await req.json();
  console.log(body)
  const { amount, productList, userId } = body;
  console.log(amount);

  const purchaseOrderId = generateRandomString();

  try {
    // Validate amount
    const amountInPaisa = Number(amount) * 100;
    console.log(amountInPaisa);

    // Initiate payment request
    const khaltiResponse = await axios.post(
      'https://a.khalti.com/api/v2/epayment/initiate/',
      {
        return_url: 'http://localhost:3000/payment/khalti/success/',
        website_url: 'http://localhost:3000/',
        amount: amountInPaisa, // paisa
        purchase_order_id: purchaseOrderId,
        purchase_order_name: `item-${purchaseOrderId}`,
      },
      {
        headers: {
          Authorization: 'key live_secret_key_68791341fdd94846a146f0457ff7b455',
          'Content-Type': 'application/json',
        },
      }
    );

    // Save order details
    await Promise.all(
      productList.map(async (item: any) => {
        await OrderCollection.create({
          userId: userId,
          unitPrice: item.unitPrice,
          orderedQuantity: item.orderedQuantity,
          amount: amount, // Include the amount here
          subTotal: item.subTotal,
          productId: new mongoose.Types.ObjectId(item.productId),
          paymentStatus: 'Initiated',
          pidx: khaltiResponse.data.pidx,
        });
      })
    );

    // Send Success Response
    return NextResponse.json({ message: "Payment initialization successful", data: khaltiResponse.data }, { status: 200 });
  } catch (error: any) {
    // Log the error and send error response
    console.error('Error initializing payment:', error.response?.data || error.message);
    return NextResponse.json({ message: "Payment initialization failed", error: error.response?.data || error.message }, { status: 400 });
  }
}
