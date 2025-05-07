import React from 'react'
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

const PaypalPayment = () => {
  return (
    <div className='h-96 flex justify-center items-center'>
      <Alert variant="filled" severity="warning" style={{maxWidth: "400px"}}>
        <AlertTitle>Paypal Unavailable</AlertTitle>
        Paypal Service is unavailable, Please use another payment method
      </Alert>
    </div>
  )
}

export default PaypalPayment