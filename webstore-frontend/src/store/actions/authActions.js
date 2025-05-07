import api from "../../api/api";

export const fetchLoginRequest = (data) => ({
    type: "LOGIN_USER",
    payload: data,
});

export const setUserAddress = (address) => ({
    type: "SET_USER_ADDRESS",
    payload: address,
});

// export const selectUserAddress = (address) => ({
//     type: "SELECT_ADDRESS",
//     payload: address,
// });

export const selectUserAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address)); // ✅ Save to localStorage
    return {
        type: "SELECT_ADDRESS",
        payload: address,
    };
};



export const editUserAddress = (updatedAddress) => ({
    type: "UPDATED_ADDRESS",
    payload: updatedAddress,
});

export const loginUserAction = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const { data } = await api.post("/auth/signin", sendData);
        dispatch(fetchLoginRequest(data));
        localStorage.setItem("auth", JSON.stringify(data));
        reset();
        toast.success("Login Successful!");
        navigate("/");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "500 Internal Error");
    } finally {
        setLoader(false);
    }
};

export const registerUserAction = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const { data } = await api.post("/auth/signup", sendData);
        reset();
        toast.success("User Registered Successfully!");
        navigate("/login");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "500 Internal Error");
    } finally {
        setLoader(false);
    }
};

export const logoutUserAction = (navigate) => async (dispatch) => {
    dispatch({ type: "LOGOUT_USER" });
    localStorage.removeItem("auth");
    navigate("/login");
};

export const showUserAddress = (toast) => async  (dispatch) => {
    try {
        const response = await api.get("/users/addresses");
        for (let index = 0; index < response.data.length; index++) {
            console.log('Full response:', response.data[index]);
        }
        dispatch(setUserAddress(response.data));
        toast.success("User Address List added Successfully!");
    } catch (error) {
        toast.error(error?.response?.data?.message || "500 Internal Error");
    }
}

export const addUpdateUserAddress = (sendData, toast, setOpenAddressModal, reset) => async (dispatch) => {
    try {
        let response;
        
        if (sendData.addressId) {
            // Update existing address
            response = await api.put(`/addresses/${sendData.addressId}`, sendData);
            dispatch(editUserAddress(response.data));
            toast.success("Address updated successfully!");
        } else {
            // Create new address
            response = await api.post("/addresses", sendData);
            dispatch(setUserAddress(response.data));
            toast.success("Address added successfully!");
        }

        // Refresh the address list
        await dispatch(showUserAddress(toast));
        
        reset();
        setOpenAddressModal(false);
    } catch (error) {
        console.error('Address operation error:', {
            message: error.message,
            response: error.response,
            config: error.config
        });
        toast.error(error?.response?.data?.message || "Address operation failed");
    }
};

export const deleteUserAddress = (addressId, toast) => async (dispatch) => {
    try {
        await api.delete(`/addresses/${addressId}`);
        
        // Refresh the address list after deletion
        await dispatch(showUserAddress(toast));
        toast.success("Address deleted successfully!");
    } catch (error) {
        console.error('Delete address error:', {
            message: error.message,
            response: error.response,
            config: error.config
        });
        toast.error(error?.response?.data?.message || "Failed to delete address");
    }
};

// export const createStripeClientSecret = (totalPrice, toast) => async (dispatch, getState) => {
//     try {
//         const getTotalPrice = Number(totalPrice)*100;
//         console.log("See main total price :: ", totalPrice);
//         const {data} = await api.post(`/order/stripe-client-secret`, {
//             "amount": getTotalPrice,
//             "currency": "usd"
//         });
        
//         dispatch({
//             type: "CLIENT_SECRET",
//             payload: data
//         });
//         localStorage.setItem("client-secret", JSON.stringify(data));
//         toast.success("client secret recieved successfully!");
//     } catch (error) {
//         console.error('client secret error:', {
//             message: error.message,
//             response: error.response,
//             config: error.config
//         });
//         toast.error(error?.response?.data?.message || "Failed to get client secret");
//     }
// }

export const createStripeClientSecret = (totalPrice, toast) => async (dispatch, getState) => {
    try {
        if (!totalPrice || totalPrice <= 0) {
            throw new Error("Invalid total price");
        }

        const getTotalPrice = Math.round(Number(totalPrice)*100); // Ensure it's an integer
        console.log("See main total price :: ", getTotalPrice);
        
        const {data} = await api.post(`/order/stripe-client-secret`, {
            amount: getTotalPrice,
            currency: "usd"
        });
        
        dispatch({
            type: "CLIENT_SECRET",
            payload: data
        });
        localStorage.setItem("client-secret", JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('client secret error:', error);
        toast.error(error.response?.data?.message || "Payment processing failed");
        throw error;
    }
}


// export const stripePaymentConfirmation = (sendData, setLoading, toast) => async (dispatch, getState) => {
//     try {
//         const {response} = await api.post(`/order/users/payments/card`, sendData);
//         if (response.data) {
//             localStorage.removeItem("cartItems");
//             localStorage.removeItem("client-secret");
//             dispatch({type: "REMOVE_CLIENT_SECRET_ADDRESS"})
//             dispatch({type: "CLEAR_CART"});
//             toast.success("Payment Successful!")
//         } else {
//             toast.error("Payment failed, please try again!")
//         }
//     } catch (error) {
//         toast.error(error.response?.data?.message || "Payment failed, please try again!");
//     }
// }


export const stripePaymentConfirmation = (sendData, setLoading, toast) => async (dispatch, getState) => {
    try {
        setLoading(true);
        const { data } = await api.post(`/order/users/payments/card`, sendData);
        
        if (data) {
            // Clear local storage
            localStorage.removeItem("cartItems");
            localStorage.removeItem("client-secret");
            
            // Dispatch actions to clear Redux state
            dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
            dispatch({ type: "CLEAR_CART" });
            
            toast.success("Payment Successful!");
            return data; // Return the response data if needed
        } else {
            toast.error("Payment failed, please try again!");
            throw new Error("Payment confirmation failed");
        }
    } catch (error) {
        console.error('Payment confirmation error:', error);
        toast.error(error.response?.data?.message || "Payment failed, please try again!");
        throw error;
    } finally {
        setLoading(false);
    }
}