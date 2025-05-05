package com.ecommerce.webstore_app.controller;

import com.ecommerce.webstore_app.config.AppContraints;
import com.ecommerce.webstore_app.model.Product;
import com.ecommerce.webstore_app.payload.ProductDTO;
import com.ecommerce.webstore_app.payload.ProductResponse;
import com.ecommerce.webstore_app.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/public/products")
    public ResponseEntity<ProductResponse> getAllProducts(
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(defaultValue = AppContraints.PRODUCT_PAGE_NUMBER) Integer pageNumber,
            @RequestParam(defaultValue = AppContraints.PRODUCT_PAGE_SIZE) Integer pageSize,
            @RequestParam(defaultValue = AppContraints.PRODUCT_SORT_BY) String sortBy,
            @RequestParam(defaultValue = AppContraints.PRODUCT_SORT_ORDER) String sortOrder
    ){
        ProductResponse productResponse = productService.getAllProducts(keyword, category, pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    @PostMapping("/admin/categories/{categoryId}/product")
    public ResponseEntity<ProductDTO> insertProductToSpecificCategory(@PathVariable Long categoryId, @Valid @RequestBody ProductDTO productDTO){
        ProductDTO savedProduct = productService.insertProduct(categoryId, productDTO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedProduct.getProductId())
                .toUri();
        return ResponseEntity.created(location).body(savedProduct);
    }

    @GetMapping("/public/categories/{categoryId}/products")
    public ResponseEntity<ProductResponse> getAllProductsOfCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = AppContraints.PRODUCT_PAGE_NUMBER) Integer pageNumber,
            @RequestParam(defaultValue = AppContraints.PRODUCT_PAGE_SIZE) Integer pageSize,
            @RequestParam(defaultValue = AppContraints.PRODUCT_SORT_BY) String sortBy,
            @RequestParam(defaultValue = AppContraints.PRODUCT_SORT_ORDER) String sortOrder
    ) {
        ProductResponse productResponse = productService.getAllProductsOfCategory(categoryId, pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    @GetMapping("/public/products/keyword/{keyword}")
    public ResponseEntity<ProductResponse> getAllProductsByKeyword(
            @PathVariable String keyword,
            @RequestParam(defaultValue = AppContraints.KEYWORD_PAGE_NUMBER) Integer pageNumber,
            @RequestParam(defaultValue = AppContraints.KEYWORD_PAGE_SIZE) Integer pageSize,
            @RequestParam(defaultValue = AppContraints.KEYWORD_SORT_BY) String sortBy,
            @RequestParam(defaultValue = AppContraints.KEYWORD_SORT_ORDER) String sortOrder
    ) {
        ProductResponse productResponse = productService.getAllProductsByKeyword(keyword, pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse, HttpStatus.FOUND);
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long productId, @RequestBody ProductDTO productDTO) {
        ProductDTO updateProductDTO = productService.updateProduct(productId, productDTO);
        return new ResponseEntity<>(updateProductDTO, HttpStatus.OK);
    }

    @PutMapping("products/{productId}/image")
    public ResponseEntity<String> updateProductImage(@PathVariable Long productId, @RequestParam("image")MultipartFile file) {
        try {
            String fileName = productService.updateProductImage(productId, file);
            return ResponseEntity.ok("Image updated successfully: " + fileName);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating image: " + e.getMessage());
        }
    }

    @DeleteMapping("/admin/products/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable long productId) {
        productService.deleteProduct(productId);
        return new ResponseEntity<>("product deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/admin/products/count")
    public ResponseEntity<Long> getProductsCount() {
        Long getTotalProducts = productService.getProductsCount();
        return new ResponseEntity<>(getTotalProducts, HttpStatus.OK);
    }

//    @GetMapping("/seller/products")
//    public ResponseEntity<ProductResponse> getProductsBySeller(
//            @RequestParam Long sellerId,
//            @RequestParam(defaultValue = AppContraints.PRODUCT_PAGE_NUMBER) Integer pageNumber,
//            @RequestParam(defaultValue = AppContraints.PRODUCT_PAGE_SIZE) Integer pageSize,
//            @RequestParam(defaultValue = AppContraints.PRODUCT_SORT_BY) String sortBy,
//            @RequestParam(defaultValue = AppContraints.PRODUCT_SORT_ORDER) String sortOrder
//    ) {
//        ProductResponse productResponse = productService.getProductsBySeller(sellerId, pageNumber, pageSize, sortBy, sortOrder);
//        return new ResponseEntity<>(productResponse, HttpStatus.OK);
//    }


}
