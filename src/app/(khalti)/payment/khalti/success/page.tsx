'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'; // Ensure axios is imported

const PaymentSuccess = () => {
  // For navigation
  const router = useRouter();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(window.location.search);

  // Extract parameters
  const pidx = queryParams.get('pidx') || 'N/A';
  const transaction_id = queryParams.get('transaction_id') || 'N/A';
  const tidx = queryParams.get('tidx') || 'N/A';
  const amount = queryParams.get('amount') || 'N/A';
  const total_amount = queryParams.get('total_amount') || 'N/A';
  const mobile = queryParams.get('mobile') || 'N/A';
  const status = queryParams.get('status') || 'N/A';
  const purchase_order_id = queryParams.get('purchase_order_id') || 'N/A';
  const purchase_order_name = queryParams.get('purchase_order_name') || 'N/A';

  // Log parameters to the console
  console.log('Payment Parameters:', {
    pidx,
    transaction_id,
    tidx,
    amount,
    total_amount,
    mobile,
    status,
    purchase_order_id,
    purchase_order_name,
  });

  // Call API
  const { data, error } = useQuery({
    queryKey: ['verify-payment', pidx],
    queryFn: async () => {
      return await axios.post('http://localhost:3000/api/payment/khalti/success', {
        pidx,
        transaction_id,
        tidx,
        amount,
        total_amount,
        mobile,
        status,
        purchase_order_id,
        purchase_order_name,
      });
    },
    onError: (error) => {
      console.error('API Error:', error);
      alert('Error occurred');
    },
    onSuccess: () => {
      alert('Success');
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Payment Success
          </h1>
          <p className="mt-4 text-lg text-gray-700 text-center">
            Khalti payment is successful. Thanks for shopping with us.
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-900">Payment Details:</h3>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li><strong className="font-semibold">pidx:</strong> {pidx}</li>
              <li><strong className="font-semibold">Transaction ID:</strong> {transaction_id}</li>
              <li><strong className="font-semibold">tidx:</strong> {tidx}</li>
              <li><strong className="font-semibold">Amount:</strong> {amount}</li>
              <li><strong className="font-semibold">Total Amount:</strong> {total_amount}</li>
              <li><strong className="font-semibold">Mobile:</strong> {mobile}</li>
              <li><strong className="font-semibold">Status:</strong> {status}</li>
              <li><strong className="font-semibold">Purchase Order ID:</strong> {purchase_order_id}</li>
              <li><strong className="font-semibold">Purchase Order Name:</strong> {purchase_order_name}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
