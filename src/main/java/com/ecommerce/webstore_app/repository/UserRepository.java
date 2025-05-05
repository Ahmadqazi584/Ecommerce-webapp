package com.ecommerce.webstore_app.repository;

import com.ecommerce.webstore_app.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String user1);

    boolean existsByEmail(@NotBlank @Size(max = 50) @Email String email);

}
