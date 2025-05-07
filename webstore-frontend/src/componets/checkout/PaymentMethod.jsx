import React, { useEffect } from 'react';
import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box
} from '@mui/material';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPaymentMethod } from '../../store/actions/paymentMethodActions';
import { createUserCart } from '../../store/actions/cartActions'

const PaymentMethod = () => {
    const dispatch = useDispatch();
    const { paymentMethod } = useSelector((state) => state.payment);
    const { cart, cartId } = useSelector((state) => state.carts);

    useEffect(() => {
        if (cart.length > 0 && !cartId) {
            const sendCartItems = cart.map((item) => {
                return {
                    cartItemId: item.productId,
                    quantity: item.quantity,
                };
            });
            console.log("Sending cart items:", sendCartItems);

            // === TEMPORARILY DISABLED ===
            // dispatch(createUserCart(sendCartItems));
            // dispatch(createUserCart(sendCartItems));
        }
    }, [dispatch, cartId, cart]);

    const handlePaymentMethodChange = (event) => {
        const selectedMethod = event.target.value;
        dispatch(fetchPaymentMethod(selectedMethod));

    };

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-md text-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <FaCreditCard className="text-blue-600 text-2xl" />
                    </div>
                    <h2 className="text-2xl font-semibold">Select Payment Method</h2>
                    <p className="text-gray-500">Choose your preferred payment option</p>

                    <div className="w-full mt-6">
                        <FormControl component="fieldset" fullWidth>
                            <RadioGroup
                                aria-label="paymentMethod"
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={handlePaymentMethodChange}
                                className="space-y-4"
                            >
                                <Box
                                    sx={{
                                        border: 1,
                                        borderColor: paymentMethod === 'Stripe' ? 'primary.main' : 'grey.300',
                                        borderRadius: 2,
                                        p: 2,
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            backgroundColor: 'action.hover'
                                        }
                                    }}
                                >
                                    <FormControlLabel
                                        value="Stripe"
                                        control={<Radio color="primary" />}
                                        label={
                                            <div className="flex items-center gap-3">
                                                <FaCreditCard className="text-blue-500" />
                                                <span>Stripe</span>
                                            </div>
                                        }
                                        sx={{ width: '100%', m: 0 }}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        border: 1,
                                        borderColor: paymentMethod === 'PayPal' ? 'primary.main' : 'grey.300',
                                        borderRadius: 2,
                                        p: 2,
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            backgroundColor: 'action.hover'
                                        }
                                    }}
                                >
                                    <FormControlLabel
                                        value="PayPal"
                                        control={<Radio color="primary" />}
                                        label={
                                            <div className="flex items-center gap-3">
                                                <FaPaypal className="text-blue-500" />
                                                <span>PayPal</span>
                                            </div>
                                        }
                                        sx={{ width: '100%', m: 0 }}
                                    />
                                </Box>
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;