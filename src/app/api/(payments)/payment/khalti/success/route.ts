import type { NextRequest } from 'next/server';
import axios from 'axios';
import { Cart } from '@/model/CartModel/Cart.model';
import { NextResponse } from 'next/server';
import connectDB from '@/database/database.db';
import { OrderCollection } from '@/model/OrderModel/Order.Model';


export async function POST(req: NextRequest) {
    try {
        // Connect to the database
        await connectDB();
      
        // Parse the JSON body of the request
        const { pidx, userId, amount, totalAmount, mobile, status, purchaseOrderId, purchaseOrderName } = await req.json();
      
        // Make a request to Khalti's payment lookup API
        const khaltiResponse = await axios.post(
          'https://a.khalti.com/api/v2/epayment/lookup/',
          { pidx },
          {
            headers: {
              Authorization: 'key live_secret_key_68791341fdd94846a146f0457ff7b455',
              'Content-Type': 'application/json',
            },
          }
        );
      
        // Update the payment status and details in the Order model based on the response
        const updateResult = await OrderCollection.updateMany(
          { pidx },
          {
            $set: {
              paymentStatus: khaltiResponse.data.status,
             
            },
          }
        );
      
        // Log update result for debugging
        console.log('Order update result:', updateResult);
      
        // Check if the payment was not completed successfully
        if (khaltiResponse.data.status !== 'Completed') {
          return NextResponse.json(
            { message: 'Khalti payment status failed.', error: khaltiResponse.data },
            { status: 400 }
          );
        }
      
        // Delete the cart items for the user after successful payment
        await Cart.deleteMany({ buyerId: userId });
      
        // Return a successful response if everything went well
        return NextResponse.json({ message: 'Khalti payment is successful.' }, { status: 200 });
    } catch (error) {
        console.error('Payment verification failed:', error);
      
        // Return an error response if something goes wrong
        return NextResponse.json(
          { message: 'Payment verification failed.' || 'Unknown error' },
          { status: 500 }
        );
    }
}
