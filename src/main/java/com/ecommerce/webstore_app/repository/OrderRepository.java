package com.ecommerce.webstore_app.repository;

import com.ecommerce.webstore_app.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o WHERE o.id = ?1 AND o.email = ?2")
    Order findOrderByOrderIdAndEmail(Long orderId, String email);

}
