package com.ecommerce.webstore_app.controller;

import com.ecommerce.webstore_app.config.AppContraints;
import com.ecommerce.webstore_app.exceptionhandler.CustomValidationException;
import com.ecommerce.webstore_app.model.Category;
import com.ecommerce.webstore_app.payload.CategoryDTO;
import com.ecommerce.webstore_app.payload.CategoryResponse;
import com.ecommerce.webstore_app.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @GetMapping("/public/categories/{categoryId}")
    public ResponseEntity<CategoryDTO> findCategoryById (@PathVariable long categoryId) {
        CategoryDTO category = service.findCategoryById(categoryId);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/public/categories")
    public ResponseEntity<CategoryResponse> getAllCategories(
            @RequestParam(defaultValue = AppContraints.CATEGORY_PAGE_NUMBER) Integer pageNumber,
            @RequestParam(defaultValue = AppContraints.CATEGORY_PAGE_SIZE) Integer pageSize,
            @RequestParam(defaultValue = AppContraints.CATEGORY_SORT_BY) String sortBy,
            @RequestParam(defaultValue = AppContraints.CATEGORY_SORT_ORDER) String sortOrder
    ) {
        CategoryResponse categoryResponse = service.getAllCategories(pageNumber, pageSize, sortBy, sortOrder);
        return ResponseEntity.ok(categoryResponse);
    }


//    @GetMapping("/public/categories")
//    public ResponseEntity<List<EntityModel<Category>>> getAllCategories() {
//        List<Category> categoryList = service.getAllCategories();
//        List<EntityModel<Category>> categoryListModel = new ArrayList<>();
//        for(Category c : categoryList) {
//            EntityModel<Category> entityModel = EntityModel.of(c);
//            WebMvcLinkBuilder webMvcLinkBuilder = WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(CategoryController.class).findCategoryById(c.getCategoryId()));
//            entityModel.add(webMvcLinkBuilder.withSelfRel());
//            categoryListModel.add(entityModel);
//        }
//        return ResponseEntity.ok(categoryListModel);
//    }

    @PostMapping("/admin/categories")
    public ResponseEntity<CategoryDTO> insertCategory(@Valid @RequestBody CategoryDTO categoryDTO) {
        CategoryDTO savedCategory = service.insertCategory(categoryDTO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedCategory.getCategoryID())
                .toUri();
        return ResponseEntity.created(location).body(savedCategory);
    }

    @PutMapping("/admin/categories/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(@Valid @RequestBody CategoryDTO categoryDTO, @PathVariable long categoryId) {
        CategoryDTO getCategoryById = service.findCategoryById(categoryId);
        if (getCategoryById != null) {
            categoryDTO.setCategoryID(categoryId);
            CategoryDTO updateCateogoryDTO = service.updateCategory(categoryDTO);
            return ResponseEntity.ok(updateCateogoryDTO);
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/admin/categories/{categoryId}")
    public ResponseEntity<CategoryDTO> deleteCategory(@PathVariable long categoryId) {
        CategoryDTO category = service.findCategoryById(categoryId);
        if (category == null) {
            return ResponseEntity.notFound().build();
        }
        CategoryDTO deleteCategoryDTO = service.deleteCategory(categoryId);
        return new ResponseEntity<>(deleteCategoryDTO, HttpStatus.OK);
    }

}
