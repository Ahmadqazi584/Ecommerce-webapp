export const fetchPaymentMethod = (method) => ({
    type: "ADD_PAYMENT_METHOD",
    payload: method,
});


export const loginUserAction = (paymentMethod) => async (dispatch) => {
    dispatch(fetchPaymentMethod(paymentMethod));
};