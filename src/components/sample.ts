import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import mongoose from 'mongoose';
import Order from '../../../models/order.model';
import Cart from '../../../models/cart.model';
// import { generateRandomString } from '../../../utils/generate.random.string';
// import { isBuyer } from '../../../middleware/authentication.middleware';

const startPayment = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check if user is authenticated
  // const userId = await isBuyer(req); // Modify this according to your authentication middleware

  // if (!userId) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }

  // const { amount, productList } = req.body;
  // // const purchaseOrderId = generateRandomString();

  try {
  //   const khaltiResponse = await axios.post(
  //     'https://a.khalti.com/api/v2/epayment/initiate/',
  //     {
  //       return_url: 'http://localhost:5173/payment/khalti/success/',
  //       website_url: 'http://localhost:5173/',
  //       amount: Number(amount) * 100, // paisa
  //       purchase_order_id: purchaseOrderId,
  //       purchase_order_name: `item-${purchaseOrderId}`,
  //     },
  //     {
  //       headers: {
  //         Authorization: 'key 132661f9aaf04e47868838590e6fe5a1',
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );

  //   await Promise.all(
  //     productList.map(async (item: any) => {
  //       await Order.create({
  //         buyerId: userId,
  //         sellerId: new mongoose.Types.ObjectId(item.sellerId),
  //         unitPrice: item.unitPrice,
  //         orderedQuantity: item.orderedQuantity,
  //         subTotal: item.subTotal,
  //         productId: new mongoose.Types.ObjectId(item.productId),
  //         paymentStatus: 'Initiated',
  //         pidx: khaltiResponse.data.pidx,
  //       });
  //     })
  //   );

    return res.status(200).json({ message: 'success',
      //  paymentDetails: khaltiResponse.data 
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Payment initialization failed.' });
  }
};

export default startPayment;
