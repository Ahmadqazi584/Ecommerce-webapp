package com.ecommerce.webstore_app.service;

import com.ecommerce.webstore_app.payload.CartDTO;
import com.ecommerce.webstore_app.payload.CartItemDTO;

import java.util.List;

public interface CartService {
    CartDTO addProductToCart(Long productId, Integer quantity);

    List<CartDTO> retrieveAllCarts();

    CartDTO getCurrentUserCart(String email, Long cartId);

    CartDTO updateProductInCart(Long productId, Integer quantity);

    String removeProductFromCart(Long cartId, Long productId);

    String createOrUpdateCartWithItems(List<CartItemDTO> cartItemDTOS);
}
