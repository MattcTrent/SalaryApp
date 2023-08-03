package com.SalaryApplication.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SalaryApplication.Models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

    Optional<User> findByEmail(String email);    
    Optional<User> findByUsernameOrEmail(String username, String email);
    Optional<User> findByUsername(String userName);
    List<User> findByLastName(String lastName);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
