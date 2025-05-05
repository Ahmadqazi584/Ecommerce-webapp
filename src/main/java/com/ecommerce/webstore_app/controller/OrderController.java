package com.ecommerce.webstore_app.controller;

import com.ecommerce.webstore_app.payload.OrderDTO;
import com.ecommerce.webstore_app.payload.OrderRequestDTO;
import com.ecommerce.webstore_app.payload.StripePaymentDTO;
import com.ecommerce.webstore_app.security.utils.AuthUtils;
import com.ecommerce.webstore_app.service.OrderService;
import com.ecommerce.webstore_app.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private AuthUtils authUtils;

    @Autowired
    private StripeService stripeService;

    @PostMapping("/order/users/payments/{paymentMethod}")
    public ResponseEntity<OrderDTO> orderProducts(@PathVariable String paymentMethod, @RequestBody OrderRequestDTO orderRequestDTO) {
        String email = authUtils.loggedInEmail();
        OrderDTO orderDTO = orderService.placeOrder(
                email,
                paymentMethod,
                orderRequestDTO.getAddressId(),
                orderRequestDTO.getPgName(),
                orderRequestDTO.getPgPaymentId(),
                orderRequestDTO.getPgStatus(),
                orderRequestDTO.getPgResponseMessage()
        );

        return new ResponseEntity<>(orderDTO, HttpStatus.CREATED);
    }

    @GetMapping("/order/{orderId}/user/{email}")
    public ResponseEntity<OrderDTO> retrieveOrderOfUser(@PathVariable Long orderId, @PathVariable String email) {
        OrderDTO orderDTO = orderService.findOrderByUser(orderId, email);
        return new ResponseEntity<>(orderDTO, HttpStatus.OK);
    }

    @PostMapping("/order/stripe-client-secret")
    public ResponseEntity<String> orderProducts(@RequestBody StripePaymentDTO stripePaymentDTO) throws StripeException {
        PaymentIntent paymentIntent = stripeService.paymentIntent(stripePaymentDTO);
        return new ResponseEntity<>(paymentIntent.getClientSecret(), HttpStatus.CREATED);
    }
}
