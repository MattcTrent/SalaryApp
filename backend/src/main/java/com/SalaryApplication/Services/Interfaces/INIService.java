package com.SalaryApplication.Services.Interfaces;

import java.math.BigDecimal;

public interface INIService {
    BigDecimal calculateMonthlyNI(BigDecimal monthlySalary);
    BigDecimal GetNIBenefitValue();
}

