package com.ecommerce.webstore_app.service.impl;

import com.ecommerce.webstore_app.exceptionhandler.CustomAPIException;
import com.ecommerce.webstore_app.exceptionhandler.CustomValidationException;
import com.ecommerce.webstore_app.model.Category;
import com.ecommerce.webstore_app.payload.CategoryDTO;
import com.ecommerce.webstore_app.payload.CategoryResponse;
import com.ecommerce.webstore_app.repository.CategoryRepository;
import com.ecommerce.webstore_app.service.CategoryService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoryResponse getAllCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByandOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortByandOrder);
        Page<Category> page = repository.findAll(pageable);

        List<Category> categoryList = page.getContent();
        if (categoryList.isEmpty()) {
            throw new CustomValidationException("No categories exist!");
        }

        List<CategoryDTO> categoryDTOS = new ArrayList<>();
        for (Category category : categoryList) {
            CategoryDTO categoryDTO = modelMapper.map(category, CategoryDTO.class);
            categoryDTOS.add(categoryDTO);
        }

        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setContent(categoryDTOS);
        categoryResponse.setTotalPages(page.getTotalPages());
        categoryResponse.setPageNumber(page.getNumber());
        categoryResponse.setPageSize(page.getSize());
        categoryResponse.setLastPage(page.isLast());
        categoryResponse.setTotalElements(page.getNumberOfElements());

        return categoryResponse;
    }


    @Override
    public CategoryDTO findCategoryById(long id) {
        Optional<Category> category = repository.findById(id);
        if (category.isEmpty()) {
            throw new CustomValidationException("no such category exists!");
        }
        Category existingCategory = category.get();
        CategoryDTO categoryDTO = modelMapper.map(existingCategory, CategoryDTO.class);
        return categoryDTO;
    }

    @Override
    public CategoryDTO insertCategory(CategoryDTO categoryDTO) {
        Category savedCategory = repository.findCategoryByCategoryName(categoryDTO.getCategoryName());

        if (savedCategory != null) {
            throw new CustomAPIException("The category can't inserted " + categoryDTO.getCategoryName() + " already exists!");
        }

        Category category = modelMapper.map(categoryDTO, Category.class);
        Category saveCategory = repository.save(category);

        return modelMapper.map(saveCategory, CategoryDTO.class);
    }

    @Override
    public CategoryDTO updateCategory(CategoryDTO categoryDTO) {
        Category categoryname = repository.findCategoryByCategoryName(categoryDTO.getCategoryName());
        if (categoryname != null) {
            throw new CustomAPIException("The category can't updated " + categoryDTO.getCategoryName() + " already exists!");
        }
        Category convertToEntity = modelMapper.map(categoryDTO, Category.class);
        Category updateCategory = repository.save(convertToEntity);
        return modelMapper.map(updateCategory, CategoryDTO.class);
    }

    @Override
    public CategoryDTO deleteCategory(long id) {
        Optional<Category> checkCategory = repository.findById(id);
        if (checkCategory.isEmpty()) {
            throw new CustomValidationException("can't delete, category not found!");
        }
        Category existingCategory = checkCategory.get();
        CategoryDTO deleteCategoryDTO = modelMapper.map(existingCategory, CategoryDTO.class);
        repository.deleteById(id);
        return deleteCategoryDTO;
    }
}
