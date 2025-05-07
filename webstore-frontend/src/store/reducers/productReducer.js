import React from 'react';

const initialState = {
  products: [],
  categories: [],
  pagination: {},
  loading: false,
  categoriesLoading: false,
  categoriesError: null,
  error: null,

};
  
const ProductReducer = (state = initialState, action) => {
  
  switch(action.type) {  // Changed from action.payload to action.type
    
    case "FETCH_PRODUCTS_REQUEST":
      return {
        ...state,
        loading: true,
      }
  
    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
          products: action.payload,
          pagination: {
            ...state.pagination,
            pageNumber: action.pageNumber,
            pageSize: action.pageSize,
            totalElements: action.totalElements,
            totalPages: action.totalPages,
            lastPage: action.lastPage,
          },
          loading: false,
      }

    case "FETCH_PRODUCTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case "RESET_PRODUCT_ERROR":
      return {
        ...state,
        error: null
      };

    // Category cases
    case "FETCH_CATEGORIES_REQUEST":
      return {
        ...state,
        categoriesLoading: true,
        categoriesError: null
      };
      
    case "FETCH_CATEGORIES_SUCCESS":
      return {
        ...state,
        categories: action.payload,
        categoriesLoading: false
      };
      
    case "FETCH_CATEGORIES_FAILURE":
      return {
        ...state,
        categoriesLoading: false,
        categoriesError: action.payload
      };
            
    default:
      return state;
  }
}

export default ProductReducer;