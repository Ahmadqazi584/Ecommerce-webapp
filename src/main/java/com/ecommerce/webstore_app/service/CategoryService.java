package com.ecommerce.webstore_app.service;

import com.ecommerce.webstore_app.payload.CategoryDTO;
import com.ecommerce.webstore_app.payload.CategoryResponse;

public interface CategoryService {

    CategoryResponse getAllCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
    CategoryDTO findCategoryById(long id);
    CategoryDTO insertCategory(CategoryDTO categoryDTO);
    CategoryDTO updateCategory(CategoryDTO categoryDTO);
    CategoryDTO deleteCategory(long id);

}
