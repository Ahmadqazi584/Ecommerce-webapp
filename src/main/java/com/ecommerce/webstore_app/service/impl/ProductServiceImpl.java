package com.ecommerce.webstore_app.service.impl;

import com.ecommerce.webstore_app.exceptionhandler.CustomAPIException;
import com.ecommerce.webstore_app.model.Category;
import com.ecommerce.webstore_app.model.Product;
import com.ecommerce.webstore_app.payload.ProductDTO;
import com.ecommerce.webstore_app.payload.ProductResponse;
import com.ecommerce.webstore_app.repository.CategoryRepository;
import com.ecommerce.webstore_app.repository.ProductRepository;
import com.ecommerce.webstore_app.service.ProductService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class  ProductServiceImpl implements ProductService {

    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Value("${base.image.url}")
    private String baseImageUrl;

    @Override
    public ProductResponse getAllProducts(String keyword, String category, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Specification<Product> spec = Specification.where(null);

        if (keyword != null && !keyword.isEmpty()) {
            spec = spec.and(((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("productName")), "%" + keyword.toLowerCase() + "%")));
        }

        if (category != null && !category.isEmpty()) {
            spec = spec.and(((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("category").get("categoryName"), category)));
        }

        Page<Product> page = productRepository.findAll(spec, pageable);

        if (page.isEmpty()) throw new CustomAPIException("no any product exists!");

        List<ProductDTO> productDTOs = new ArrayList<>();
        for (Product product : page) {
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            productDTO.setProductImage(constructImageUrl(product.getProductImage()));
            productDTOs.add(productDTO);
        }
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContents(productDTOs);
        productResponse.setTotalPages(page.getTotalPages());
        productResponse.setPageNumber(page.getNumber());
        productResponse.setPageSize(page.getSize());
        productResponse.setLastPage(page.isLast());
        productResponse.setTotalElements(page.getNumberOfElements());

        return productResponse;
    }

    @Override
    public ProductDTO insertProduct(Long categoryId, ProductDTO productDTO) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CustomAPIException("select correct category please!"));
        Product product = modelMapper.map(productDTO, Product.class);
        product.setProductImage("default.jpg");
        product.setCategory(category);
        double discount = product.getPrice() - (product.getDiscount() * 0.01) * product.getPrice();
        product.setSpecialPrice(discount);
        Product saveProduct = productRepository.save(product);
        return modelMapper.map(saveProduct, ProductDTO.class);
    }

    @Override
    public ProductResponse getAllProductsOfCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CustomAPIException("select correct category please!"));

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> page = productRepository.findByCategory(category, pageable);

        List<ProductDTO> productDTOs = new ArrayList<>();
        for (Product product : page) {
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            productDTOs.add(productDTO);
        }

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContents(productDTOs);
        productResponse.setTotalPages(page.getTotalPages());
        productResponse.setPageNumber(page.getNumber());
        productResponse.setPageSize(page.getSize());
        productResponse.setLastPage(page.isLast());
        productResponse.setTotalElements(page.getNumberOfElements());

        return productResponse;
    }

    @Override
    public ProductResponse getAllProductsByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Page<Product> page = productRepository.findByProductNameContainingIgnoreCase(keyword, pageable);

        List<ProductDTO> productDTOS =  new ArrayList<>();
        for (Product product : page) {
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            productDTOS.add(productDTO);
        }

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContents(productDTOS);
        productResponse.setTotalPages(page.getTotalPages());
        productResponse.setPageNumber(page.getNumber());
        productResponse.setPageSize(page.getSize());
        productResponse.setLastPage(page.isLast());
        productResponse.setTotalElements(page.getNumberOfElements());

        return productResponse;
    }

    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO productDTO) {
        Product getProduct = productRepository.findById(productId)
                .orElseThrow(() -> new CustomAPIException("select correct product please!"));
        Product product = modelMapper.map(productDTO, Product.class);
        product.setProductId(productId);
        product.setCategory(getProduct.getCategory());
        double discount = product.getPrice() - (product.getDiscount() * 0.01) * product.getPrice();
        product.setSpecialPrice(discount);
        Product updateProduct = productRepository.save(product);
        return modelMapper.map(updateProduct, ProductDTO.class);
    }

    @Override
    public String updateProductImage(Long productId, MultipartFile file) throws IOException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomAPIException("select correct product"));

        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + fileName);

        // Save the file
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());

        product.setProductImage(fileName);
        productRepository.save(product);

        return fileName;
    }

    @Override
    public void deleteProduct(long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomAPIException("product not found!"));
        productRepository.deleteById(productId);
    }

    @Override
    public Long getProductsCount() {
        return productRepository.countTotalProducts();
    }

    private String constructImageUrl(String imageUrl) {
        return baseImageUrl.endsWith("/") ? baseImageUrl + imageUrl : baseImageUrl + "/" + imageUrl;
    }
//    @Override
//    public ProductResponse getProductsBySeller(Long sellerId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
//        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
//        PageRequest pageable = PageRequest.of(pageNumber, pageSize, sort);
//
//        Page<Product> productPage = productRepository.findBySellerId(sellerId, pageable);
//        List<Product> products = productPage.getContent();
//        List<ProductDTO> productDTOS = new ArrayList<>();
//        for (Product product : products) {
//            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
//            productDTOS.add(productDTO);
//        }
//
//        ProductResponse productResponse = new ProductResponse();
//        productResponse.setContents(productDTOS);
//        productResponse.setPageNumber(productPage.getNumber());
//        productResponse.setPageSize(productPage.getSize());
//        productResponse.setTotalPages(productPage.getTotalPages());
//        productResponse.setTotalElements(productPage.getTotalElements());
//
//        return productResponse;
//    }
}
