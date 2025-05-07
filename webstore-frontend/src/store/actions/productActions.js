import api from "../../api/Api"

export const fetchProductsRequest = () => ({
    type: "FETCH_PRODUCTS_REQUEST"
})

export const fetchProductsSuccess = (data) =>  ({
    type: "FETCH_PRODUCTS_SUCCESS",
    payload: data.contents,
    pageNumber: data.pageNumber,
    pageSize: data.pageSize,
    totalElements: data.totalElements,
    totalPages: data.totalPages,
    lastPage: data.lastPage,
})

export const fetchProductsFailure = (error) => ({
    type: "FETCH_PRODUCTS_FAILURE",
    payload: error,
})

export const resetProductError = () => ({
    type: "RESET_PRODUCT_ERROR"
});

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch(fetchProductsRequest());
        const { data } = await api.get(`/public/products?${queryString}`);
        dispatch(fetchProductsSuccess(data));
    } catch (error) {
        // Handle 400 errors specifically
        if (error.response?.status === 400) {
            dispatch(fetchProductsFailure("No products found matching your search"));
        } else {
            dispatch(fetchProductsFailure(error.message || "Failed to fetch products"));
        }
    }
};

// export const fetchProducts = (queryString) => async (dispatch) => {
//     try {
//         dispatch(fetchProductsRequest());
//         const { data } = await api.get(`/public/products?${queryString}`);
//         dispatch(fetchProductsSuccess(data));
//     } catch (error) {
//         dispatch(fetchProductsFailure(error.message));
//         console.error("Error fetching products:", error);
//     }
// };