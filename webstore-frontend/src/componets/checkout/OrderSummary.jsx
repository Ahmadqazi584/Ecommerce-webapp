import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Divider } from '@mui/material';
import { FaMapMarkerAlt, FaCreditCard, FaShoppingBag } from 'react-icons/fa';

const OrderSummary = () => {
    const { selectedAddress } = useSelector((state) => state.auth);
    const { paymentMethod } = useSelector((state) => state.payment);
    const { cart } = useSelector((state) => state.carts);

    // Calculate order total
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = 0; // Set tax to 0%
    const total = subtotal + tax;

    // Consistent box styling with lighter shadow
    const boxStyle = {
        boxShadow: '0px 1px 4px rgba(0,0,0,0.05)',
        border: '1px solid #f0f0f0',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        padding: '1rem',
        marginBottom: '1.5rem',
        width: '100%'
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem',
        paddingTop: '0.25rem'
    };

    return (
        <div className="flex justify-center mt-10 px-0 md:px-4"> {/* Changed to px-0 for mobile, px-4 for md and up */}
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
                {/* Left Column - 100% width on mobile, 75% on desktop */}
                <div className="w-full md:w-3/4 space-y-6">
                    {/* Billing Address Box */}
                    <Box sx={boxStyle}>
                        <div style={headerStyle}>
                            <Typography variant="h6" fontWeight="600">
                                Billing Address
                            </Typography>
                        </div>
                        {selectedAddress ? (
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex">
                                    <Typography variant="subtitle2" fontWeight="bold">Building Name: </Typography>
                                    <Typography variant="subtitle2" className="pl-1">{selectedAddress.buildingName}</Typography>
                                </div>
                                <div className="flex">
                                    <Typography variant="subtitle2" fontWeight="bold">Street: </Typography>
                                    <Typography variant="subtitle2" className="pl-1">{selectedAddress.street}</Typography>
                                </div>
                                <div className="flex">
                                    <Typography variant="subtitle2" fontWeight="bold">City: </Typography>
                                    <Typography variant="subtitle2" className="pl-1">{selectedAddress.city}</Typography>
                                </div>
                                <div className="flex">
                                    <Typography variant="subtitle2" fontWeight="bold">State: </Typography>
                                    <Typography variant="subtitle2" className="pl-1">{selectedAddress.state}</Typography>
                                </div>
                                <div className="flex">
                                    <Typography variant="subtitle2" fontWeight="bold">Pincode: </Typography>
                                    <Typography variant="subtitle2" className="pl-1">{selectedAddress.pincode}</Typography>
                                </div>
                                <div className="flex">
                                    <Typography variant="subtitle2" fontWeight="bold">Country: </Typography>
                                    <Typography variant="subtitle2" className="pl-1">{selectedAddress.country}</Typography>
                                </div>
                            </div>
                        ) : (
                            <Typography color="textSecondary">No address selected</Typography>
                        )}
                    </Box>

                    {/* Payment Method Box */}
                    <Box sx={boxStyle}>
                        <div style={headerStyle}>
                            <Typography variant="h6" fontWeight="600">
                                Payment Method
                            </Typography>
                        </div>
                        <div className="flex">
                            <Typography variant="subtitle2" fontWeight="bold">Payment Method: </Typography>
                            <Typography variant="subtitle2" className="pl-1">{paymentMethod || 'Not selected'}</Typography>
                        </div>
                    </Box>

                    {/* Order Items Box */}
                    <Box sx={boxStyle}>
                        <div style={headerStyle}>
                            <Typography variant="h6" fontWeight="600">
                                Order Items
                            </Typography>
                        </div>
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.productId}
                                    className="flex justify-between items-center p-1 rounded hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.productImage}
                                            alt={item.productName}
                                            className="w-16 h-16 object-cover rounded border border-gray-200"
                                        />
                                        <div>
                                            <Typography className="font-medium">{item.productName}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Qty: {item.quantity}
                                            </Typography>
                                        </div>
                                    </div>
                                    <Typography className="font-medium">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </Box>
                </div>

                {/* Right Column - 100% width on mobile, 25% on desktop */}
                <div className="w-full md:w-1/4">
                    {/* Order Summary Box - Not sticky on mobile */}
                    <Box sx={{
                        ...boxStyle,
                        position: ['static', 'sticky'],
                        top: ['auto', '5rem']
                    }}>
                        <div style={headerStyle}>
                            <Typography variant="h6" fontWeight="600">
                                Order Summary
                            </Typography>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Typography variant="body2">Subtotal:</Typography>
                                <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
                            </div>
                            <div className="flex justify-between">
                                <Typography variant="body2">Tax (0%):</Typography>
                                <Typography variant="body2">${tax.toFixed(2)}</Typography>
                            </div>
                            <div className="flex justify-between font-medium text-md pt-2">
                                <Typography variant="body1">Total:</Typography>
                                <Typography variant="body1">${total.toFixed(2)}</Typography>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;