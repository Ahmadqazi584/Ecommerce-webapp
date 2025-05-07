import api from "../../api/Api";

export const fetchCategoriesRequest = () => ({
    type: "FETCH_CATEGORIES_REQUEST"
});

export const fetchCategoriesSuccess = (data) => ({
    type: "FETCH_CATEGORIES_SUCCESS",
    payload: data.content,
    pageNumber: data.pageNumber,
    pageSize: data.pageSize,
    totalElements: data.totalElements,
    totalPages: data.totalPages,
    lastPage: data.lastPage,
});

export const fetchCategoriesFailure = (error) => ({
    type: "FETCH_CATEGORIES_FAILURE",
    payload: error
});

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch(fetchCategoriesRequest());
        const { data } = await api.get("/public/categories"); // Adjust endpoint as needed
        dispatch(fetchCategoriesSuccess(data));
    } catch (error) {
        dispatch(fetchCategoriesFailure(error.message));
    }
};