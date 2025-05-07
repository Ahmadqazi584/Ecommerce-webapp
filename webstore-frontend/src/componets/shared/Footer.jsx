import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-5">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-white text-5xl font-bold mb-4">Blataz</h2>
          <p className="text-sm text-gray-400">
            Your one-stop online shop for all your fashion and lifestyle needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/cart" className="hover:text-white">Cart</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/shipping" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-11">
        &copy; {new Date().getFullYear()} ShopZone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
