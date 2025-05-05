package com.ecommerce.webstore_app.service;

import com.ecommerce.webstore_app.payload.ProductDTO;
import com.ecommerce.webstore_app.payload.ProductResponse;
import jakarta.validation.Valid;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductService {

    ProductResponse getAllProducts(String keyword, String category, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductDTO insertProduct(Long categoryId, @Valid ProductDTO productDTO);

    ProductResponse getAllProductsOfCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductResponse getAllProductsByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductDTO updateProduct(Long productId, ProductDTO productDTO);

    String updateProductImage(Long productId, MultipartFile file) throws IOException;

    void deleteProduct(long productId);

    Long getProductsCount();

//    ProductResponse getProductsBySeller(Long sellerId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
//    List<Product> getAllProductsSeller();
//    List<Product> getProductsByCategory(Category category);
//    List<Product> getProductsByKeyword(Product product);
//    Product insertProduct(Product product);
//    Product updateProduct(Product product);
//    Product deleteProduct(Product product);
}
