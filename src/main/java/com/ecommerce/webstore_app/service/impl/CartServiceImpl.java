package com.ecommerce.webstore_app.service.impl;


import com.ecommerce.webstore_app.exceptionhandler.CustomAPIException;
import com.ecommerce.webstore_app.model.Cart;
import com.ecommerce.webstore_app.model.CartItem;
import com.ecommerce.webstore_app.model.Product;
import com.ecommerce.webstore_app.model.User;
import com.ecommerce.webstore_app.payload.CartDTO;
import com.ecommerce.webstore_app.payload.CartItemDTO;
import com.ecommerce.webstore_app.payload.ProductDTO;
import com.ecommerce.webstore_app.repository.CartItemRepository;
import com.ecommerce.webstore_app.repository.CartRepository;
import com.ecommerce.webstore_app.repository.ProductRepository;
import com.ecommerce.webstore_app.repository.UserRepository;
import com.ecommerce.webstore_app.security.utils.AuthUtils;
import com.ecommerce.webstore_app.service.CartService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthUtils authUtils;
    
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public CartDTO addProductToCart(Long productId, Integer quantity) {

        // check the cart of user, if not create new
        Cart checkCart = checkCartForUser();

        // fetch product based on provided product id
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product with having this id: " + productId + "doesn't exists!"));

        // some validations
        if (quantity == 0) {
            throw new CustomAPIException("Select the quantity greater than 0");
        }

        if (product.getQuantity() == 0) {
            throw new CustomAPIException("Product is out of stock!");
        }

        if (product.getQuantity() < quantity) {
            throw new CustomAPIException("sorry, we have only " + product.getQuantity() + " available maximum!");
        }

        // check product already available in cart or not
        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(productId, checkCart.getCartId());

        if (cartItem != null) {
            // Update the quantity of the existing cart item
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItemRepository.save(cartItem);
        } else {
            // If the product doesn't exist in the cart, create a new CartItem
            CartItem newCartItem = new CartItem();
            newCartItem.setCart(checkCart);
            newCartItem.setProduct(product);
            newCartItem.setQuantity(quantity);
            newCartItem.setProductPrice(product.getSpecialPrice());
            newCartItem.setDiscount(product.getDiscount());
            cartItemRepository.save(newCartItem);
            checkCart.getCartItems().add(newCartItem);
        }

        // updating pricing for entire cart
        double totalPrice = 0.0;
        for (CartItem item : checkCart.getCartItems()) {
            totalPrice += item.getProduct().getSpecialPrice() * item.getQuantity();
        }
        checkCart.setTotalPrice(totalPrice);

        // saving cart details in database
        cartRepository.save(checkCart);

        // converting cart to cartDTO for API represention
        CartDTO cartDTO = modelMapper.map(checkCart, CartDTO.class);

        // map products to productDTOs in CartDTO
        List<ProductDTO> productDTOs = new ArrayList<>();
        for (CartItem item : checkCart.getCartItems()) {
            ProductDTO productDTO = modelMapper.map(item.getProduct(), ProductDTO.class);
            productDTO.setQuantity(item.getQuantity());
            productDTOs.add(productDTO);
        }

        // ProductDTOs saving to CartFTO
        cartDTO.setProducts(productDTOs);

        return cartDTO;
    }

    @Override
    public List<CartDTO> retrieveAllCarts() {

        List<Cart> carts = cartRepository.findAll();
        if (carts.size() == 0) {
            throw new CustomAPIException("No any carts exists!");
        }

        List<CartDTO> cartDTOS = new ArrayList<>();

        for (Cart cart : carts) {

            List<ProductDTO> products = new ArrayList<>();

            for (CartItem cartItem : cart.getCartItems()){
                ProductDTO productDTO = modelMapper.map(cartItem.getProduct(), ProductDTO.class);
                productDTO.setQuantity(cartItem.getQuantity());
                products.add(productDTO);
            }

            CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
            cartDTO.setProducts(products);
            cartDTOS.add(cartDTO);
        }

        return cartDTOS;
    }

    @Override
    public CartDTO getCurrentUserCart(String email, Long cartId) {
        Cart cart = cartRepository.findCartByUserEmailAndCartId(email, cartId);

        List<ProductDTO> productDTOs = new ArrayList<>();
        for (CartItem cartItem : cart.getCartItems()){
            ProductDTO productDTO = modelMapper.map(cartItem.getProduct(), ProductDTO.class);
            productDTO.setQuantity(cartItem.getProduct().getQuantity());
            productDTOs.add(productDTO);
        }

        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        cartDTO.setProducts(productDTOs);

        return cartDTO;
    }

    @Override
    public CartDTO updateProductInCart(Long productId, Integer quantity) {
        String username = authUtils.loggedInUsername();
        Cart cart = cartRepository.findCartByUsername(username);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product doesn't exist!"));

        // Validate quantity
        if (quantity == 0) {
            throw new CustomAPIException("Select the quantity greater than 0");
        }

        if (product.getQuantity() == 0) {
            throw new CustomAPIException("Product is out of stock!");
        }

        if (product.getQuantity() < quantity) {
            throw new CustomAPIException("Sorry, we have only " + product.getQuantity() + " available maximum!");
        }

        // Find the cart item
        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(productId, cart.getCartId());
        if (cartItem == null) {
            throw new CustomAPIException("Product does not exist in the cart!");
        }

        // Update the quantity
        int newQuantity = cartItem.getQuantity() + quantity;
        if (newQuantity <= 0) {
            // Remove the cart item if the quantity is 0 or less
            cart.getCartItems().remove(cartItem);
            cartItemRepository.delete(cartItem);
        } else {
            // Update the cart item quantity
            cartItem.setQuantity(newQuantity);
            cartItemRepository.save(cartItem);
        }

        // Recalculate the total price of the cart
        double totalPrice = 0.0;
        for (CartItem item : cart.getCartItems()) {
            totalPrice += item.getProduct().getSpecialPrice() * item.getQuantity();
        }
        cart.setTotalPrice(totalPrice);
        cartRepository.save(cart);

        // Convert cart to CartDTO for API representation
        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

        // Map products to ProductDTOs in CartDTO (exclude products with quantity 0)
        List<ProductDTO> productDTOs = new ArrayList<>();
        for (CartItem item : cart.getCartItems()) {
            if (item.getQuantity() > 0) { // Only include products with quantity > 0
                ProductDTO productDTO = modelMapper.map(item.getProduct(), ProductDTO.class);
                productDTO.setQuantity(item.getQuantity());
                productDTOs.add(productDTO);
            }
        }

        // Set the filtered products in CartDTO
        cartDTO.setProducts(productDTOs);

        return cartDTO;
    }

    @Override
    public String removeProductFromCart(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException(cartId + " this id of cart doesnot exists!"));

        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(productId, cartId);
        cart.getCartItems().remove(cartItem);
        cartItemRepository.delete(cartItem);

        cart.setTotalPrice(cart.getTotalPrice() -
                (cartItem.getProductPrice() * cartItem.getQuantity()));

        List<CartItem> cartItems = cart.getCartItems();
        for (CartItem cartItem1 : cartItems) {
            if (cartItem1.getProduct().getProductId() == productId) {
                cartItems.remove(cartItem1);
            }
        }

        cart.setCartItems(cartItems);
        cartRepository.save(cart);


        return "Product " + cartItem.getProduct().getProductName() + " removed from the cart !!!";
    }

    @Override
    @Transactional
    public String createOrUpdateCartWithItems(List<CartItemDTO> cartItemDTOS) {

        // Get User Email Id
        String emailId = authUtils.loggedInEmail();

        // Check if existing cart is available or create new one
        Cart existingCart = cartRepository.findCartByEmail(emailId);
        if (existingCart == null) {
            existingCart = new Cart();
            existingCart.setTotalPrice(0.00);
            existingCart.setUser(authUtils.loggedInUser());
            existingCart = cartRepository.save(existingCart);
        }else {
            // Clear all current items in cart
            cartItemRepository.deleteAllByCartId(existingCart.getCartId());
        }

        double totalPrice = 0.00;
        // Process each item in request to add to cart
        for (CartItemDTO cartItemDTO : cartItemDTOS) {
            long productId = cartItemDTO.getCartItemId();
            int quantity = cartItemDTO.getQuantity();

            System.out.println("product id ::: " + productId);

            // Find the product by Id
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException(productId + " this id of product doesn't exists!"));

            // Directly update the product stock and price
//            product.setQuantity(product.getQuantity() - quantity);
            totalPrice += product.getSpecialPrice() * quantity;

            // create and save the cart items
            CartItem cartItem = new CartItem();
            cartItem.setQuantity(quantity);
            cartItem.setProduct(product);
            cartItem.setDiscount(product.getDiscount());
            cartItem.setProductPrice(product.getSpecialPrice());
            cartItem.setCart(existingCart);
            cartItemRepository.save(cartItem);
        }

        // update the cart's total price and save
        existingCart.setTotalPrice(totalPrice);
        cartRepository.save(existingCart);

        return "Cart created or updated with new items successfully!";
    }

    private Cart checkCartForUser() {
        Cart userCart = cartRepository.findCartByUsername(authUtils.loggedInUsername());
        if (userCart != null) {
            return userCart;
        }
        // Create a new cart if it doesn't exist
        Cart newCart = new Cart();
        newCart.setUser(authUtils.loggedInUser());
        newCart.setTotalPrice(0.00);
        return cartRepository.save(newCart);
    }


}
