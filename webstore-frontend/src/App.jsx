import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ Use BrowserRouter
import Navbar from './componets/shared/Navbar';
import Home from './componets/home/Home';
import Products from './componets/products/Products';
import Cart from './componets/cart/Cart';
import About from './componets/About';
import Contact from './componets/Contact';
import Login from './componets/auth/Login';
import PrivateRoute from './componets/PrivateRoute';
import Profile from './componets/Profile';
import { useSelector } from 'react-redux';
import Register from './componets/auth/Register';
import Checkout from './componets/checkout/Checkout';
import PaymentConfirmation from './componets/checkout/PaymentConfirmation';
import OrdersPage from './componets/Orderpage';
import Footer from './componets/shared/Footer';

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="main-container">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/orders" element={<OrdersPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/order-confirm' element={<PaymentConfirmation />} />
        </Route>

        <Route element={<PrivateRoute publicPage />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
