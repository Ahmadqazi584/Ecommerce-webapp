import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/actions/categoryActions';

const useCategories = () => {
    const dispatch = useDispatch();
    const { categories, categoriesLoading, categoriesError } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        if (categories.length === 0 && !categoriesLoading) {
            dispatch(fetchCategories());
        }
        console.log("running :: ");
    }, [dispatch, categories.length, categoriesLoading]);

    return { categories, categoriesLoading, categoriesError };
};

export default useCategories;