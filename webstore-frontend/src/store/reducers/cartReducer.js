
// At the top of cartReducer.js
const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => {
        return total + (item.price * (item.quantity || 1));
    }, 0);
};

const initialState = {
    cart: [],
    totalPrice: 0,
    cartId: null,
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART":
            const productToAdd = action.payload;

            // Check if the product already exists in the cart using a basic loop
            let existingProduct = null;
            for (const item of state.cart) {
                if (item.productId === productToAdd.productId) {
                    existingProduct = item;
                    break;
                }
            }
            if (existingProduct) {
                // If product is already in the cart, update its quantity

                const updatedCart = state.cart.map((item) =>
                    item.productId === productToAdd.productId
                        ? {
                            ...item,
                            quantity: productToAdd.quantity,
                        }
                        : item
                );

                return {
                    ...state,
                    cart: updatedCart,
                    totalPrice: calculateTotalPrice(updatedCart) // Recalculate total
                };

            } else {
                // If product is not in the cart, add it to the cart

                const newCart = [
                    ...state.cart,
                    productToAdd,
                ]
                return {
                    ...state,
                    cart: newCart,
                    totalPrice: calculateTotalPrice(newCart) // Recalculate total
                }
            }

        case "REMOVE_CART_ITEM":
            return {
                ...state,
                cart: state.cart.filter((item) => item.productId !== action.payload),
            };



        case "GET_USER_CART_PRODUCTS":
            return {
                ...state,
                cart: action.payload,
                cartId: action.cartId,
                totalPrice: action.totalPrice,
            }

        case "CLEAR_CART":
            return {
                ...state,
                cart: [],
                totalPrice: 0,
                cartId: null,
            }

        default:
            return state;

    }
}

export default cartReducer;