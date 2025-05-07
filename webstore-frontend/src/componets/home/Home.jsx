import React, { useEffect } from 'react';
import HeroBanner from './HeroBanner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/actions/ProductActions';
import ProductCard from '../shared/ProductCard';
import CustomLoader from '../shared/CustomLoader';

const Home = () => {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts(""));
    }, [dispatch]);

    return (
        <div className="px-4 sm:px-6 lg:px-12">
            {/* Hero Section */}
            <div className="my-8">
                <HeroBanner />
            </div>

            {/* Featured Products Section */}
            <div className="my-12">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Products</h2>
                    <p className="text-gray-600">Discover our most popular items this season</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <CustomLoader />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-600 font-semibold py-8">
                        Error: {error}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.slice(0, 8).map((product) => (
                            <ProductCard key={product.productId} product={product} />
                        ))}
                    </div>
                )}
            </div>

            {/* Special Offers Section */}
            <div className="my-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Special Offers</h2>
                    <p className="text-gray-600">Limited time deals you don't want to miss</p>
                </div>
                {!isLoading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.slice(8, 11).map((product) => (
                            <ProductCard 
                                key={product.productId} 
                                product={product} 
                                showDiscountBadge={true}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Newsletter Section */}
            <div className="my-16 bg-gray-50 p-8 rounded-xl text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Stay Updated</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Subscribe to our newsletter for the latest products, deals, and news
                </p>
                <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                    <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;