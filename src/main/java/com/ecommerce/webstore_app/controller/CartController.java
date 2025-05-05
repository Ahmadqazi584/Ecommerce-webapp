package com.ecommerce.webstore_app.controller;

import com.ecommerce.webstore_app.model.User;
import com.ecommerce.webstore_app.payload.CartDTO;
import com.ecommerce.webstore_app.payload.CartItemDTO;
import com.ecommerce.webstore_app.security.utils.AuthUtils;
import com.ecommerce.webstore_app.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private AuthUtils authUtils;

    @PostMapping("/carts/create")
    public ResponseEntity<String> createOrUpdateCart(@RequestBody List<CartItemDTO> cartItemDTOS) {
        String cartResponse = cartService.createOrUpdateCartWithItems(cartItemDTOS);
        return new ResponseEntity<>(cartResponse, HttpStatus.CREATED);
    }

    @PostMapping("/carts/products/{productId}/quantity/{quantity}")
    public ResponseEntity<CartDTO> addProductToCart(@PathVariable Long productId, @PathVariable Integer quantity) {
        CartDTO cartDTO = cartService.addProductToCart(productId, quantity);
        return new ResponseEntity<>(cartDTO, HttpStatus.CREATED);
    }

    @GetMapping("/carts")
    public ResponseEntity<List<CartDTO>> retrieveAllCarts() {
        List<CartDTO> cartDTOList = cartService.retrieveAllCarts();
        return new ResponseEntity<>(cartDTOList, HttpStatus.OK);
    }

    @GetMapping("/carts/users/cart")
    public ResponseEntity<CartDTO> getCurrentUserCart(){
        String email = authUtils.loggedInEmail();
        User user = authUtils.loggedInUser();
        Long cartId = user.getCart().getCartId();
        System.out.println("email :: " + email);
        System.out.println("cart id :: " + cartId);
        CartDTO cartDTO = cartService.getCurrentUserCart(email, cartId);
        return new ResponseEntity<>(cartDTO, HttpStatus.OK);

    }

    @PutMapping("/carts/products/{productId}/quantity/{operation}")
    public ResponseEntity<CartDTO> updateProductInCart(@PathVariable Long productId, @PathVariable String operation) {
        CartDTO cartDTO = cartService.updateProductInCart(productId, operation.equalsIgnoreCase("delete") ? -1 : 1);
        return new ResponseEntity<>(cartDTO, HttpStatus.OK);
    }


    @DeleteMapping("/carts/{cartId}/product/{productId}")
    public ResponseEntity<String> removeProductFromCart(@PathVariable Long cartId, @PathVariable Long productId) {
        String status = cartService.removeProductFromCart(cartId, productId);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }
}
