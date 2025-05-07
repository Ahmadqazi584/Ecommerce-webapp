const initialState = {
    user: null,
    address: [],
    clientSecret: null,
    selectedAddress: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return {
                ...state,
                user: action.payload,
                address: action.payload.address || [],
            };

        case "SET_USER_ADDRESS":
            return {
                ...state,
                address: action.payload,
            };

        case "SELECT_ADDRESS":
            return {
                ...state,
                selectedAddress: action.payload,
            };

        case "UPDATED_ADDRESS":
            // Update the specific address in the address array
            const updatedAddresses = state.address.map(addr => 
                addr.addressId === action.payload.addressId ? action.payload : addr
            );
            return {
                ...state,
                address: updatedAddresses,
                selectedAddress: action.payload
            };

        case "CLIENT_SECRET":
            return {
                ...state,
                clientSecret: action.payload,
            }
       
        case "REMOVE_CLIENT_SECRET_ADDRESS":
            return {
                ...state,
                clientSecret: null,
            }

        case "LOGOUT_USER":
            return {
                user: null,
                address: [],
                selectedAddress: null
            };

        default:
            return state;
    }
};