package com.ecommerce.webstore_app.repository;

import com.ecommerce.webstore_app.model.AppRole;
import com.ecommerce.webstore_app.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRoleName(AppRole appRole);

}