package com.ecommerce.webstore_app.repository;

import com.ecommerce.webstore_app.model.Category;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findCategoryByCategoryName(String categoryName);
}
