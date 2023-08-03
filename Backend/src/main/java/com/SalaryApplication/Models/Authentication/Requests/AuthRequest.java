package com.SalaryApplication.Models.Authentication.Requests;

import java.math.BigDecimal;

import com.SalaryApplication.Models.Enums.StudentFinancePlanEnum;

public class AuthRequest {

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private BigDecimal salary;
    private BigDecimal pensionPercentage = BigDecimal.ZERO;
    private boolean isPensionSalarySacrifice = false;
    private StudentFinancePlanEnum studentFinancePlan = StudentFinancePlanEnum.None;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public BigDecimal getPensionPercentage() {
        return pensionPercentage;
    }

    public void setPensionPercentage(BigDecimal pensionPercentage) {
        this.pensionPercentage = pensionPercentage;
    }

    public boolean isPensionSalarySacrifice() {
        return isPensionSalarySacrifice;
    }

    public void setPensionSalarySacrifice(boolean isPensionSalarySacrifice) {
        this.isPensionSalarySacrifice = isPensionSalarySacrifice;
    }

    public StudentFinancePlanEnum getStudentFinancePlan() {
        return studentFinancePlan;
    }

    public void setStudentFinancePlan(StudentFinancePlanEnum studentFinancePlan) {
        this.studentFinancePlan = studentFinancePlan;
    }
}
