package com.ecommerce.webstore_app.service.impl;

import com.ecommerce.webstore_app.exceptionhandler.CustomAPIException;
import com.ecommerce.webstore_app.model.*;
import com.ecommerce.webstore_app.payload.OrderDTO;
import com.ecommerce.webstore_app.payload.OrderItemDTO;
import com.ecommerce.webstore_app.repository.*;
import com.ecommerce.webstore_app.service.OrderService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public OrderDTO placeOrder(String email, String paymentMethod, Long addressId, String pgName, String pgPaymentId, String pgStatus, String pgResponseMessage) {

        // check is cart created or not
        Cart cart = cartRepository.findCartByEmail(email);
        if (cart == null) {
            throw new CustomAPIException("The cart not exists!");
        }

        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address with id :: " + addressId + " not exists!"));

        Order newOrder = new Order();
        newOrder.setOrderDate(LocalDate.now());
        newOrder.setOrderStatus(OrderStatus.ACCEPTED);
        newOrder.setEmail(email);
        newOrder.setAddress(address);
        newOrder.setTotalAmount(cart.getTotalPrice());
//        newOrder.setOrderItems();

        // Making payment for newOrder
        Payment payment = new Payment(paymentMethod, pgPaymentId, pgStatus, pgResponseMessage, pgName);
        payment.setOrder(newOrder);
        Payment donePayment = paymentRepository.save(payment);
        newOrder.setPayment(donePayment);

        // Converting CartItems to OrderItems
        List<OrderItem> orderItemList = new ArrayList<>();

        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem newOrderItem = new OrderItem();
            newOrderItem.setProduct(cartItem.getProduct());
            newOrderItem.setQuantity(cartItem.getQuantity());
            newOrderItem.setDiscount(cartItem.getDiscount());
            newOrderItem.setOrderedProductPrice(cartItem.getProductPrice());
            newOrderItem.setOrder(newOrder);
            System.out.println("OrderItem id :: " + newOrderItem.getOrderItemId() + " and product id :: " + newOrderItem.getProduct().getProductId());
            orderItemList.add(newOrderItem);

        }

        List<OrderItem> savedOrderItems = orderItemRepository.saveAll(orderItemList);
        newOrder.setOrderItems(savedOrderItems);

        // save the order
        Order savedOrder = orderRepository.save(newOrder);

        // Update product stock (must be done before clearing the cart)
        for (CartItem cartItem : cart.getCartItems()) {
            Product product = cartItem.getProduct();
            if (product.getQuantity() < cartItem.getQuantity()) {
                throw new CustomAPIException("Product " + product.getProductName() + " is out of stock!");
            }
            product.setQuantity(product.getQuantity() - cartItem.getQuantity());
            productRepository.save(product);
        }

        // Clear the cart
        cart.getCartItems().clear();
        cartRepository.save(cart);

        // map the order to orderDTO
        OrderDTO orderDTO = modelMapper.map(savedOrder, OrderDTO.class);

        // map the orderItems to OrderItemDTO
        for (OrderItem orderItem : savedOrder.getOrderItems()) {
            OrderItemDTO orderItemDTO = modelMapper.map(orderItem, OrderItemDTO.class);
            orderDTO.getOrderItems().add(orderItemDTO);
        }

        return orderDTO;
    }

    @Override
    public OrderDTO findOrderByUser(Long orderId, String email) {
        Order order = orderRepository.findOrderByOrderIdAndEmail(orderId, email);
        if (order == null) {
            throw new CustomAPIException("no any order exists!");
        }
        OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
        return orderDTO;
    }

}
