package com.SalaryApplication.Services.Interfaces;

import java.math.BigDecimal;

import com.SalaryApplication.Models.Enums.StudentFinancePlanEnum;

public interface IStudentFinanceService {
    BigDecimal calculateYearlyStudentFinance(BigDecimal salary, BigDecimal niBenefit,
    BigDecimal taxBenefit,  StudentFinancePlanEnum planUsed);

    BigDecimal calculateMonthlyStudentFinance(BigDecimal salary, BigDecimal niBenefit,
    BigDecimal taxBenefit,  StudentFinancePlanEnum planUsed);

    BigDecimal calculateWeeklyStudentFinance(BigDecimal salary, StudentFinancePlanEnum planUsed);
}

