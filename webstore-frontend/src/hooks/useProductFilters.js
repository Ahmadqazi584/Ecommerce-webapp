import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, resetProductError } from '../store/actions/ProductActions';

const useProductFilters = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(resetProductError());
        const params = new URLSearchParams();

        const keyword = searchParams.get("keyword") || '';
        const categoryName = searchParams.get("category") || '';
        const sortOrder = searchParams.get("sortOrder") || 'asc';

        if (keyword) params.set("keyword", keyword);
        if (categoryName) {
            params.set("category", categoryName);
        }

        const currentPage = searchParams.get("page")
                        ? Number(searchParams.get("page"))
                        : 1
        
        params.set("pageNumber", currentPage-1);
        // params.set("pageSize", "5");
        params.set("sortBy", "price");
        params.set("sortOrder", sortOrder.toUpperCase());

        dispatch(fetchProducts(params.toString()));
    }, [dispatch, searchParams, categories]); // Add categories to dependencies
};

export default useProductFilters;