package com.SalaryApplication.Models;

import java.math.BigDecimal;

public class SalaryBreakdown {
    public SalaryBreakdown() {
    }

    private String name;
    private BigDecimal monthlySalary = BigDecimal.ZERO;
    private BigDecimal pension;
    private BigDecimal salarySacrifice = BigDecimal.ZERO;
    private BigDecimal tax;
    private BigDecimal taxFree;
    private BigDecimal nI;
    private BigDecimal studentFinance;
    private BigDecimal takehome;
    private BigDecimal bills;
    private BigDecimal takehomeAfterBills;
    private User user;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPension() {
        return pension;
    }

    public void setPension(BigDecimal pension) {
        this.pension = pension;
    }

    public BigDecimal getSalarySacrifice() {
        return salarySacrifice;
    }

    public void setSalarySacrifice(BigDecimal salarySacrifice) {
        this.salarySacrifice = salarySacrifice;
    }

    public BigDecimal getTax() {
        return tax;
    }

    public void setTax(BigDecimal tax) {
        this.tax = tax;
    }

    public BigDecimal getTaxFree() {
        return taxFree;
    }

    public void setTaxFree(BigDecimal taxFree) {
        this.taxFree = taxFree;
    }

    public BigDecimal getnI() {
        return nI;
    }

    public void setnI(BigDecimal nI) {
        this.nI = nI;
    }

    public BigDecimal getStudentFinance() {
        return studentFinance;
    }

    public void setStudentFinance(BigDecimal studentFinance) {
        this.studentFinance = studentFinance;
    }

    public BigDecimal getTakehome() {
        return takehome;
    }

    public void setTakehome(BigDecimal takehome) {
        this.takehome = takehome;
    }

    public BigDecimal getTakehomeAfterBills() {
        return takehomeAfterBills;
    }

    public void setTakehomeAfterBills(BigDecimal takehomeAfterDeductions) {
        this.takehomeAfterBills = takehomeAfterDeductions;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BigDecimal getSalaryPostSalarySacrifice() {
        return this.monthlySalary.subtract(getSalarySacrifice());
    }

    public BigDecimal getMonthlySalary() {
        return monthlySalary;
    }

    public void setMonthlySalary(BigDecimal monthlySalary) {
        this.monthlySalary = monthlySalary;
    }

    public BigDecimal getBills() {
        return bills;
    }

    public void setBills(BigDecimal bills) {
        this.bills = bills;
    }
}
