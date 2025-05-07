import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { createStripeClientSecret } from '../../store/actions/authActions';
import { toast, ToastContainer } from 'react-toastify';
import CustomLoader from '../shared/CustomLoader';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
  const dispatch = useDispatch();
  const { clientSecret } = useSelector((state) => state.auth);
  const { cart, totalPrice } = useSelector((state) => state.carts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const createSecret = async () => {
      if (loading || clientSecret) return;
      
      const calculatedTotal = totalPrice || cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      if (calculatedTotal > 0) {
        setLoading(true);
        try {
          await dispatch(createStripeClientSecret(calculatedTotal, toast));
        } finally {
          setLoading(false);
        }
      }
    };
    
    createSecret();
  }, [clientSecret, cart, totalPrice]);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      ) : (
        <div>Preparing payment gateway...</div>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
      />
    </>
  );
};

export default StripePayment;