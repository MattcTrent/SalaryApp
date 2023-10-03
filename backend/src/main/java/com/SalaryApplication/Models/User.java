package com.SalaryApplication.Models;

import java.math.BigDecimal;

import org.hibernate.annotations.GenericGenerator;

import com.SalaryApplication.Models.Enums.StudentFinancePlanEnum;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
public class User {
    public User() {
    }

    public User(String username, String password, String firstName, String lastName, String email, BigDecimal salary,
            BigDecimal pensionPercentage, boolean isPensionSalarySacrifice, StudentFinancePlanEnum studentFinancePlan) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.salary = salary;
        this.pensionPercentage = pensionPercentage;
        this.isPensionSalarySacrifice = isPensionSalarySacrifice;
        this.studentFinancePlan = studentFinancePlan;
    }

    public User(String username, String password, String firstName, String lastName, String email, BigDecimal salary) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.salary = salary;
    }

    public User(String userName, String password, String email, BigDecimal salary, BigDecimal pensionPercentage) {
        this.username = userName;
        this.password = password;
        this.salary = salary;
        this.pensionPercentage = pensionPercentage;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Integer id;
    @Column(unique = true)
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String email;
    private BigDecimal salary;
    private BigDecimal pensionPercentage = BigDecimal.ZERO;
    private boolean isPensionSalarySacrifice = false;
    private StudentFinancePlanEnum studentFinancePlan = StudentFinancePlanEnum.None;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Deduction> deductions;
}
