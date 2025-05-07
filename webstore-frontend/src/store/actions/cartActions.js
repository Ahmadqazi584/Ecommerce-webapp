export const fetchAddToCart = (getProduct, qty) => ({
  type: "ADD_CART",
  payload: {
    ...getProduct,
    quantity: qty,
  },
});

export const fetchChangeQuantity = (product, Quantity) => ({
  type: "ADD_CART",
  payload: {
    ...product,
    quantity: Quantity,
  },
});

export const fetchRemoveCartItem = (productId) => ({
  type: "REMOVE_CART_ITEM",
  payload: productId,
});

export const fetchUserCart = (data) => ({
  type: "GET_USER_CART_PRODUCTS",
  payload: data.products,
  cartId: data.cartId,
  totalPrice: data.totalPrice,
})

export const addToCart = (data, qty = 1) => (dispatch, getState) => {

  // Retrieve list of products from productReducer state
  const { products } = getState().products;

  // Match the AddToCart product with the list of products
  const getProduct = products.find(p => p.productId === data.productId);
  if (!getProduct) return console.error("Product not found in state for productId:", data.productId);

  // Check stock -> is quantity available
  const isQuantityExists = getProduct.quantity >= qty;

  // If stock available
  if (isQuantityExists) {

    // 👉 Dispatch the action to update the Redux cart state with the selected product and quantity
    dispatch(fetchAddToCart(getProduct, qty));

    // Save the updated cart to localStorage to persist across page refreshes
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  } else {
    console.error("Insufficient stock for the product:", getProduct.productId);
    // Optionally dispatch a UI error/toast
  }
};

// Incrementing the quantity in cart
export const increaseCartQuantity = (cartItem) => (dispatch, getState) => {
  const { products } = getState().products || {};
  const { productId, quantity } = cartItem;

  const product = products.find(p => p.productId === productId);

  if (!product) return console.error("Product not found");

  const IncrementQuantity = quantity + 1;

  // product.quantity -> total quantity in stock 
  if (product.quantity >= IncrementQuantity) {
    dispatch(fetchChangeQuantity(product, IncrementQuantity));
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  } else {
    console.warn("Reached stock limit");
  }
};

// Decrementing the quantity in cart
export const decreaseCartQuantity = (cartItem) => (dispatch, getState) => {
  const { products } = getState().products || {};
  const { productId, quantity } = cartItem;

  const product = products.find(p => p.productId === productId);
  if (!product) return console.error("Product not found");

  const DecrementQuantity = quantity - 1;

  // product.quantity -> total quantity in stock 
  if (DecrementQuantity > 0) {
    dispatch(fetchChangeQuantity(product, DecrementQuantity));
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  } else {
    console.warn("Quantity lesser than 1 not possible");
  }
}

export const removeItemFromCart = (productId, toast) => (dispatch, getState) => {
  dispatch(fetchRemoveCartItem(productId));
  toast.success("Item removed from cart!");
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}


export const createUserCart = (cartItems) => async (dispatch) => {
  try {
    await api.post("/carts/create", cartItems);
    await dispatch(getUserCart());
  } catch (error) {
    console.log(error);
  }
}

export const getUserCart = () => async (dispatch, getState) => {
  try {
    const { data } = await api.get("/carts/users/cart");
    await dispatch(fetchUserCart(data));
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart))
  } catch (error) {
    console.log(error);
  } 
}
