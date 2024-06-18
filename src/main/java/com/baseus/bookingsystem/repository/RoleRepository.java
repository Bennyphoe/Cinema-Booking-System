package com.baseus.bookingsystem.repository;

import com.baseus.bookingsystem.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    List<Role> findByUserUsername(String username);
}
