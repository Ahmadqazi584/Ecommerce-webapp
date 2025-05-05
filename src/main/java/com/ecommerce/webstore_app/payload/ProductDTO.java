package com.ecommerce.webstore_app.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private long productId;

    @NotBlank(message = "product name can't be blank")
    private String productName;

    @NotBlank(message = "product description can't be blank")
    private String description;

//    @NotBlank(message = "product image can't be blank")
    private String productImage;

    @NotNull(message = "select quantity of project")
    private int quantity;

    private double price;

    private double discount;
    private double specialPrice;

}
