import React from 'react';
import { FaBoxOpen, FaCalendarAlt, FaMoneyBillWave, FaShippingFast, FaCheckCircle } from 'react-icons/fa';

const OrdersPage = () => {
  // Dummy data - replace with real data from backend later
  const orders = [
    {
      id: 'ORD-123456',
      date: '2023-05-15',
      status: 'Delivered',
      total: 149.99,
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 99.99, image: 'https://via.placeholder.com/80' },
        { name: 'Phone Case', quantity: 2, price: 25.00, image: 'https://via.placeholder.com/80' }
      ]
    },
    {
      id: 'ORD-789012',
      date: '2023-04-28',
      status: 'Shipped',
      total: 89.50,
      items: [
        { name: 'Smart Watch', quantity: 1, price: 89.50, image: 'https://via.placeholder.com/80' }
      ]
    },
    {
      id: 'ORD-345678',
      date: '2023-03-10',
      status: 'Processing',
      total: 45.75,
      items: [
        { name: 'USB Cable', quantity: 3, price: 15.25, image: 'https://via.placeholder.com/80' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <FaCheckCircle className="text-green-500" />;
      case 'Shipped': return <FaShippingFast className="text-blue-500" />;
      default: return <FaBoxOpen className="text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
          <p className="mt-2 text-sm text-gray-600">
            View all your past and current orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <FaBoxOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't placed any orders. Start shopping to see orders here.
            </p>
            <div className="mt-6">
              <a
                href="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Browse Products
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Order #{order.id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="mr-1.5 h-4 w-4 text-gray-400" />
                        <span>Placed on {order.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaMoneyBillWave className="mr-1.5 h-4 w-4 text-gray-400" />
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-4">
                    {order.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start">
                        <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p>${item.price.toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;