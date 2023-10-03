package com.SalaryApplication.DataSeeders;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.SalaryApplication.Models.Role;
import com.SalaryApplication.Models.User;
import com.SalaryApplication.Models.Enums.RoleEnum;
import com.SalaryApplication.Repositories.RoleRepository;
import com.SalaryApplication.Repositories.UserRepository;

@Component
public class UserSeeder {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    public void loadData() {
        if (userRepository.count() == 0) {
            System.out.println(userRepository.count() + " users found, seeding database...");

            List<User> users = new ArrayList<User>();

            User adminUser = new User("admin", encoder.encode("Password123"), "admin@admin.com",
                    BigDecimal.valueOf(10000.0), BigDecimal.valueOf(0));
            Set<Role> roles = new HashSet<>();
            Role adminRole = roleRepository.findByName(RoleEnum.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);
            adminUser.setRoles(roles);
            users.add(adminUser);

            userRepository.saveAll(users);
            System.out.println(userRepository.count() + " user records added.");
        }
    }
}