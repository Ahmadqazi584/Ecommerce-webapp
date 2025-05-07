import React from 'react';
import { MdArrowBack, MdRemoveShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center text-center text-gray-600">
        <MdRemoveShoppingCart size={60} className="mb-4 text-gray-400" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-sm mb-4">Looks like you haven’t added anything to your cart yet.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-customBlue rounded hover:scale-105 transition"
        >
          <MdArrowBack size={20} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
