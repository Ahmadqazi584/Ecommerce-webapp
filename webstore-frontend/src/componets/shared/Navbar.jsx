import { Badge } from '@mui/material';
import React, { useState } from 'react';
import { FaShoppingCart, FaSignInAlt, FaStore, FaTimes, FaBars, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from '../UserMenu';

const Navbar = () => {
  const path = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.carts.cart);
  const totalItems = cartItems.length;
  const { user } = useSelector((state) => state.auth); // Destructure user from auth

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='h-[70px] bg-custom-gradient text-white z-50 flex items-center sticky top-0'>
      <div className='w-full flex justify-between items-center lg:px-14 sm:px-8 px-4'>
        {/* Logo on the left */}
        <Link to="/" className='flex items-center text-2xl font-bold'>
          <FaStore className='mr-2 text-3xl' />
          <span className="font-[Poppins]">Blataz</span>
        </Link>

        {/* Hamburger menu button - visible on mobile */}
        <button
          className='md:hidden text-2xl focus:outline-none'
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation links - hidden on mobile when menu is closed */}
        <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-[70px] left-0 w-full md:w-auto md:bg-transparent z-40`}>
          <div className='flex flex-col md:flex-row items-center gap-6 p-4 md:p-0'>
            <ul className='flex flex-col md:flex-row items-center gap-6'>
              <li className='hover:scale-105 transition-all duration-150'>
                <Link
                  to="/"
                  className={`${path === '/' ? "text-white font-semibold" : "text-gray-200"} hover:text-white block py-2 md:py-0`}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className='hover:scale-105 transition-all duration-150'>
                <Link
                  to="/products"
                  className={`${path === '/products' ? "text-white font-semibold" : "text-gray-200"} hover:text-white block py-2 md:py-0`}
                  onClick={() => setIsOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li className='hover:scale-105 transition-all duration-150'>
                <Link
                  to="/about"
                  className={`${path === '/about' ? "text-white font-semibold" : "text-gray-200"} hover:text-white block py-2 md:py-0`}
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </li>
              <li className='hover:scale-105 transition-all duration-150'>
                <Link
                  to="/contact"
                  className={`${path === '/contact' ? "text-white font-semibold" : "text-gray-200"} hover:text-white block py-2 md:py-0`}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li className='hover:scale-105 transition-all duration-150'>
                <Link
                  to="/cart"
                  className={`${path === '/cart' ? "text-white font-semibold" : "text-gray-200"} hover:text-white flex items-center py-2 md:py-0`}
                  onClick={() => setIsOpen(false)}
                >
                  <Badge
                    showZero
                    badgeContent={totalItems}
                    color="primary"
                    overlap='circular'
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <FaShoppingCart size={20} />
                  </Badge>
                </Link>
              </li>
            </ul>

            {/* User Auth Section */}
            {user?.id ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <UserMenu />
                </div>
                {/* You can add a logout button here */}
              </div>
            ) : (
              <div className='hover:scale-105 transition-all duration-150'>
                <Link
                  to="/login"
                  className={`${path === '/login'
                    ? "bg-gradient-to-r from-green-500 to-blue-500"
                    : "bg-gradient-to-r from-green-500 to-blue-500"
                    } 
    text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-gradient-to-r hover:from-greed-500 hover:to-blue-500 hover:shadow-lg`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>

                {/* <Link
                  to="/login"
                  className={`${path === '/login' ? "bg-gradient-to-r from-purple-500 to-red-500" : "bg-gradient-to-r from-purple-600 to-red-600"} 
                  text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:shadow-lg`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;