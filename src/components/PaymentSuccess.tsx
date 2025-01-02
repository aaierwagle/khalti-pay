import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const PaymentSuccess = () => {
  const router = useRouter();
  const { pidx, userId } = router.query; // Extract pidx and userId from the query parameters

  useEffect(() => {
    const verifyPayment = async () => {
      if (!pidx || !userId) return; // Ensure pidx and userId are present

      try {
        const response = await axios.post('/api/verify-payment', { pidx, userId });
        if (response.status === 200) {
          // Handle successful verification
          console.log('Payment verified successfully', response.data);
          // You can redirect the user to a different page or show a success message
        } else {
          // Handle failed verification
          console.error('Payment verification failed', response.data);
          // Show a failure message to the user
        }
      } catch (error) {
        console.error('Error verifying payment', error);
        // Show an error message to the user
      }
    };

    verifyPayment();
  }, [pidx, userId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Payment Success</h1>
        <p>Processing your payment...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
