import React, { useEffect, useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

const PaymentForm = ({ clientSecret, totalPrice }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [elementReady, setElementReady] = useState(false); // ✅

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !elementReady) {
            setErrorMessage("Payment form not fully ready. Please wait...");
            return;
        }

        setLoading(true);
        setErrorMessage(false);

        try {
            const { error: submitError } = await elements.submit();
            if (submitError) {
                setErrorMessage(submitError.message);
                setLoading(false);
                return;
            }

            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`,
                },
            });

            if (error) {
                setErrorMessage(error.message);
                setLoading(false);
            }

        } catch (err) {
            setErrorMessage("Unexpected error. Please try again.");
            console.error(err);
            setLoading(false);
        }
    };

    const paymentElementsOptions = {
        layout: 'tabs',
    };

    return (
        <form onSubmit={handleSubmit} className='max-w-lg mx-auto p-4'>
            <h2 className='text-xl font-semibold mb-4'>Payment Information</h2>

            {errorMessage && (
                <div className='text-red-500 mb-2 text-sm'>{errorMessage}</div>
            )}

            {stripe && clientSecret ? (
                <PaymentElement
                    options={paymentElementsOptions}
                    onReady={() => {
                        setElementReady(true); // ✅ Now the element is ready
                    }}
                />
            ) : (
                <div>Loading payment form...</div>
            )}

            <button
                type="submit"
                disabled={!stripe || loading || !elementReady}
                className={`mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
                    (!stripe || loading || !elementReady) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {!loading ? `Pay $${Number(totalPrice).toFixed(2)}` : "Processing..."}
            </button>
        </form>
    );
};

export default PaymentForm;
