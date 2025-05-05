package com.ecommerce.webstore_app.payload;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {

    private long categoryID;

    @NotBlank(message = "Blank values are not allowed in Category Names")
    @Size(min = 5, message = "category name should be minimum 5 character")
    private String categoryName;
}
