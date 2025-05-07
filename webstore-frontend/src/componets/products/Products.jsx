import React from 'react';
import ProductCard from '../shared/ProductCard';
import { useSelector } from 'react-redux';
import Filters from './Filters';
import useProductFilters from '../../hooks/useProductFilters';
import useCategories from '../../hooks/useCategory';
import CustomLoader from '../shared/CustomLoader';
import Paginations from '../shared/Paginations';

const Products = () => {
    const { products, pagination, isLoading, error } = useSelector((state) => state.products);
    useProductFilters();
    useCategories(); // Initialize categories

    return (
        <div className="container mx-auto px-4 py-8">
            <Filters />
            {isLoading ? (
                <p className="text-center text-gray-600"><CustomLoader text="Loading..." /></p>
            ) : error ? (
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                </div>
            ) : products.length === 0 ? (
                <p className="text-center text-gray-600">No products found</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard 
                            key={product.productId} 
                            product={product}
                        />
                    ))}
                    <div className="w-full flex justify-center pt-6 sm:col-span-3 lg:col-span-4">
                        <Paginations 
                            numberOfPages={pagination?.totalPages}
                            totalProducts={pagination?.totalElements}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;