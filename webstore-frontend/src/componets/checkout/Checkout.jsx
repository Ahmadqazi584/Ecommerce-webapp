import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AddressInfo from './AddressInfo';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import PaymentMethod from './PaymentMethod';
import { toast } from 'react-toastify';
import OrderSummary from './OrderSummary';
import StripePayment from './StripePayment';
import PaypalPayment from './PaypalPayment';

const Checkout = () => {
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);
    const { address, selectedAddress, user } = useSelector((state) => state.auth);
    const [localSelectedAddress, setLocalSelectedAddress] = useState(null);
    const { paymentMethod } = useSelector((state) => state.payment);

    useEffect(() => {
        setLocalSelectedAddress(selectedAddress);
    }, [selectedAddress]);

    const steps = [
        'Address',
        'Payment Method',
        'Order Summary',
        'Payment'
    ];

    const handleNext = () => {
        if (activeStep === 1 && !paymentMethod) {
            toast.error('Please select a payment method');
            return;
        }

        if (activeStep !== 0 || localSelectedAddress) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const isProceedDisabled =
        (activeStep === 0 && !localSelectedAddress) ||
        (activeStep === 1 && !paymentMethod);

    const renderPaymentStep = () => {
        if (!paymentMethod) {
            return <div>Please go back and select a payment method</div>;
        }

        switch (paymentMethod.toLowerCase()) {
            case 'stripe':
                return <StripePayment />;
            case 'paypal':
                return <PaypalPayment />;
            default:
                return <div>Unsupported payment method: {paymentMethod}</div>;
        }
    };

    return (
        <div className='lg:px-14 sm:px-8 px-4 py-20 relative min-h-screen'>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div className='mt-5 pb-24'>
                {activeStep === 0 && (
                    <AddressInfo
                        address={address}
                        setLocalSelectedAddress={setLocalSelectedAddress}
                        localSelectedAddress={localSelectedAddress}
                    />
                )}

                {activeStep === 1 && (
                    <PaymentMethod onNextStep={() => setActiveStep(2)} />
                )}

                {activeStep === 2 && <OrderSummary />}
                
                {activeStep === 3 && renderPaymentStep()}
            </div>

            {/* Sticky navigation buttons container */}
            <div className="fixed bottom-0 left-0 right-0 bg-white py-4 px-6 shadow-lg border-t">
                <div className="max-w-screen-xl mx-auto">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '100%', paddingX: { xs: 2, sm: 4, lg: 14 } }}>
                        <Button
                            variant="outlined"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{
                                minWidth: '120px'
                            }}
                        >
                            Back
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handleNext}
                            disabled={isProceedDisabled || activeStep === steps.length - 1}
                            sx={{
                                minWidth: '120px',
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#1565c0'
                                },
                                '&:disabled': {
                                    backgroundColor: '#e0e0e0',
                                    color: '#a0a0a0'
                                }
                            }}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Proceed'}
                        </Button>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default Checkout;