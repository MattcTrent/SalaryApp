package com.SalaryApplication.Services.Interfaces;

import java.math.BigDecimal;

public interface ITaxService {
    BigDecimal calculateYearlyTax(BigDecimal salary);
    BigDecimal calculateMonthlyTax(BigDecimal salary);
    BigDecimal calculateWeeklyTax(BigDecimal salary);
    BigDecimal getYearlyTaxFree();
    BigDecimal getMonthlyTaxFree();
    BigDecimal GetTaxBenefitValue();
}

