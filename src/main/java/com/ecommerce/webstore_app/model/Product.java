package com.ecommerce.webstore_app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private long productId;

    @NotBlank(message = "Product name cannot be blank!")
    private String productName;

    @NotBlank(message = "Description cannot be blank!")
    private String description;

    private String productImage;

    @Min(value = 0, message = "Quantity cannot be negative!")
    private int quantity;

    @Min(value = 0, message = "Price cannot be negative!")
    private double price;

    @Min(value = 0, message = "Discount cannot be negative!")
    private double discount;

    @Min(value = 0, message = "Special price cannot be negative!")
    private double specialPrice;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User user;

    @OneToMany(mappedBy = "product", cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
    private List<CartItem> cartItems = new ArrayList<>();

//    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<CartItem> cartItemList = new ArrayList<>();
}

