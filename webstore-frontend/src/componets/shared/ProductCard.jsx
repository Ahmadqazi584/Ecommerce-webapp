import React, { useState } from 'react';
import { MdOutlineShoppingCart } from "react-icons/md";
import ProductViewModel from './ProductViewModel';
import truncateText from '../../utils/truncateText';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';
import { useNavigate } from 'react-router-dom'; // 👈 For redirecting to cart

const ProductCard = ({ product }) => {
  const isOutOfStock = product.quantity <= 0;
  const hasDiscount = product.discount > 0;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 👈 Needed for view cart

  // ✅ Access cart from Redux
  const cartItems = useSelector((state) => state.carts.cart);
  const isInCart = cartItems.some((item) => item.productId === product.productId);

  function close() {
    setIsOpen(false);
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product, 1));
  };

  const handleViewCart = (e) => {
    e.stopPropagation();
    navigate("/cart");
  };

  return (
    <div 
      className="group relative bg-white rounded shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      {hasDiscount && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-red-600 rounded-full shadow-lg rotate-12 transform origin-center">
            {product.discount}% OFF
            <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-red-700 rounded-full"></span>
          </span>
        </div>
      )}

      <div className="w-full aspect-[4/3] overflow-hidden">
        <img 
          src={product.productImage} 
          alt={product.productName} 
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {truncateText(product.productName, 40)}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {truncateText(product.description, 60)}
        </p>

        <div className="flex items-end justify-between mt-auto min-h-[60px]">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-gray-400 text-sm line-through">${product.price.toFixed(2)}</span>
            )}
            <span className="text-xl font-bold text-blue-600">
              ${hasDiscount ? product.specialPrice.toFixed(2) : product.price.toFixed(2)}
            </span>
          </div>

          {/* ✅ Change button behavior based on cart */}
          <button
            className={`h-10 flex items-center text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300 gap-1 ${
              isOutOfStock
                ? 'bg-gray-400 cursor-not-allowed'
                : isInCart
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isOutOfStock}
            onClick={(e) => {
              e.stopPropagation();
              if (isOutOfStock) return;
              isInCart ? handleViewCart(e) : handleAddToCart(product);
            }}
          >
            <MdOutlineShoppingCart className="text-base" />
            {isOutOfStock 
              ? "Out of Stock" 
              : isInCart 
                ? "View Cart" 
                : "Add to Cart"}
          </button>
        </div>
      </div>

      <ProductViewModel 
        ProductModelDetails={product} 
        isOpen={isOpen} 
        onClose={close} 
      />
    </div>
  );
};

export default ProductCard;
