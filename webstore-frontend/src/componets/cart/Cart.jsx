import React, { useEffect } from 'react';
import { MdDelete, MdShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../store/actions/ProductActions';
import QuantityCounter from './QuantityCounter';
import useCategories from '../../hooks/useCategory';
import { removeItemFromCart } from '../../store/actions/cartActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmptyCart from './EmptyCart';

const Cart = () => {
  
  const cartItems = useSelector((state) => state.carts.cart);
  const { cart, totalPrice } = useSelector((state) => state.carts);
  const subtotal = totalPrice; // Use the stored totalPrice instead of recalculating
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(""));
  }, [dispatch]);

  useCategories();

  const handleRemove = (productId) => {
    dispatch(removeItemFromCart(productId, toast));
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="lg:px-14 sm:px-8 px-4 py-10">
          {/* Cart Header */}
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <MdShoppingCart size={36} className="text-gray-700" />
              Your Cart
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              All your selected items
            </p>
          </div>

          {/* Horizontal Scroll Container for Mobile */}
          <div className="md:hidden overflow-x-auto">
            <div className="min-w-[600px]"> {/* Minimum width to ensure content fits */}
              {/* Cart Grid Header */}
              <div className="grid grid-cols-5 text-gray-700 font-semibold border-b pb-2 mb-4">
                <div className="col-span-2">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-center">Total</div>
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="grid grid-cols-5 items-center border-b py-4"
                >
                  <div className="col-span-2">
                    <div className="flex items-start gap-4">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p>{item.productName}</p>
                        <button
                          className="mt-1 flex items-center text-red-500 hover:text-red-700 text-sm"
                          onClick={() => handleRemove(item.productId)}
                        >
                          <MdDelete className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">${item.price}</div>

                  <div className="text-center">
                    <QuantityCounter item={item} />
                  </div>

                  <div className="text-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop View (unchanged) */}
          <div className="hidden md:block">
            {/* Cart Grid Header */}
            <div className="grid lg:grid-cols-5 sm:grid-cols-4 text-gray-700 font-semibold border-b pb-2 mb-4">
              <div className="lg:col-span-2 col-span-2">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-center">Total</div>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="grid lg:grid-cols-5 sm:grid-cols-4 items-center border-b py-4"
              >
                <div className="lg:col-span-2 col-span-2">
                  <div className="flex items-start gap-4">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p>{item.productName}</p>
                      <button
                        className="mt-1 flex items-center text-red-500 hover:text-red-700 text-sm"
                        onClick={() => handleRemove(item.productId)}
                      >
                        <MdDelete className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-center">${item.price}</div>

                <div className="text-center">
                  <QuantityCounter item={item} />
                </div>

                <div className="text-center">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal and Checkout */}
          <div className="flex justify-end mt-8">
            <div className="text-right space-y-2">
              <div className="flex items-center justify-between md:text-lg text-sm font-semibold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-slate-500 text-sm">
                Taxes and shipping are calculated at checkout
              </p>
              <Link to="/checkout">
                <button className="bg-customBlue text-white px-6 py-2 my-2 rounded hover:bg-blue-700 transition w-full">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>

          {/* Toast Notification */}
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
          />
        </div>
      )}
    </>
  );
};

export default Cart;