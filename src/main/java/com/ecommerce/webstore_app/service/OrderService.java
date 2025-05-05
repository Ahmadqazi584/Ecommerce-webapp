package com.ecommerce.webstore_app.service;


import com.ecommerce.webstore_app.payload.OrderDTO;
import org.springframework.data.jpa.repository.Query;

public interface OrderService {
    OrderDTO placeOrder(String email, String paymentMethod, Long addressId, String pgName, String pgPaymentId, String pgStatus, String pgResponseMessage);

    OrderDTO findOrderByUser(Long orderId, String email);
}
