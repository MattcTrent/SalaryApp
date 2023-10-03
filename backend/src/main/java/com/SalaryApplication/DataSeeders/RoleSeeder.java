package com.SalaryApplication.DataSeeders;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.SalaryApplication.Models.Role;
import com.SalaryApplication.Models.Enums.RoleEnum;
import com.SalaryApplication.Repositories.RoleRepository;

@Component
public class RoleSeeder {

    @Autowired
    RoleRepository roleRepository;

    public void loadData() {
        if (roleRepository.count() == 0) {
            System.out.println(roleRepository.count() + " roles found, seeding database...");

            List<Role> roles = new ArrayList<Role>();
            roles.add(new Role(RoleEnum.ROLE_USER));
            roles.add(new Role(RoleEnum.ROLE_MODERATOR));
            roles.add(new Role(RoleEnum.ROLE_ADMIN));

            roleRepository.saveAll(roles);
            System.out.println(roleRepository.count() + " role records added.");
        }
    }
}