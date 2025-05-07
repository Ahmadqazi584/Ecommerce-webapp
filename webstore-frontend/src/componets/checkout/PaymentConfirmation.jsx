import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { stripePaymentConfirmation } from '../../store/actions/authActions';
import { toast } from 'react-toastify';

const PaymentConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.carts);
    const [loading, setLoading] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");
    const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
        ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
        : [];

    useEffect(() => {
        const confirmPayment = async () => {
            if (paymentIntent && clientSecret && redirectStatus && cart?.length > 0) {
                const sendData = {
                    "addressId": selectedUserCheckoutAddress.addressId,
                    "pgName": "Stripe",
                    "pgPaymentId": paymentIntent,
                    "pgStatus": "succeeded",
                    "pgResponseMessage": "Payment successful"
                }

                try {
                    await dispatch(stripePaymentConfirmation(sendData, setLoading, toast));
                    setPaymentCompleted(true);
                    
                    // Optional: Clear checkout address from localStorage if needed
                    localStorage.removeItem("CHECKOUT_ADDRESS");
                    
                    // Optional: Redirect after some delay
                    setTimeout(() => {
                        navigate('/'); // Redirect to home or orders page
                    }, 3000);
                } catch (error) {
                    console.error("Payment confirmation failed:", error);
                    navigate('/checkout'); // Redirect back to checkout if failed
                }
            } else if (!cart?.length) {
                // If cart is already empty (maybe already cleared)
                setPaymentCompleted(true);
            }
        };

        confirmPayment();

        // Cleanup function
        return () => {
            // Any cleanup if needed
        };
    }, [paymentIntent, clientSecret, redirectStatus, cart, dispatch, navigate]);

    return (
        <div className='min-h-screen flex justify-center items-center'>
            {loading ? (
                <div className='max-w-xl mx-auto'>
                    Processing your payment...
                </div>
            ) : paymentCompleted ? (
                <div className='p-8 rounded-lg shadow-lg text-center max-w-md'>
                    <div className='text-green-500 mb-4 flex justify-center'>
                        <FaCheckCircle size={64} />
                    </div>
                    <h2 className='text-3xl font-bold text-gray-800 mb-2'>Payment Successful!</h2>
                    <p className='text-gray-600 mb-6'>
                        Thank you for your purchase! Your payment was successfully processed.
                    </p>
                </div>
            ) : (
                <div className='max-w-xl mx-auto'>
                    Validating your payment...
                </div>
            )}
        </div>
    )
}

export default PaymentConfirmation;