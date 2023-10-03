package com.SalaryApplication.Services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SalaryApplication.Models.Deduction;
import com.SalaryApplication.Models.SystemParameter;
import com.SalaryApplication.Models.Enums.DeductionTypeEnum;
import com.SalaryApplication.Models.Enums.NIBracketEnum;
import com.SalaryApplication.Models.Enums.SystemParameterGroupEnum;
import com.SalaryApplication.Repositories.DeductionRepository;
import com.SalaryApplication.Repositories.SystemParameterRepository;
import com.SalaryApplication.Services.Interfaces.INIService;

@Service
public class NIService implements INIService {

    @Autowired
    private SystemParameterRepository systemParamRepo;
    @Autowired
    private DeductionRepository deductionRepo;


    public BigDecimal calculateYearlyNI(BigDecimal yearlySalary) {
        return calculateNI(yearlySalary, BigDecimal.ONE);
    }

    public BigDecimal calculateMonthlyNI(BigDecimal monthlySalary) {
        return calculateNI(monthlySalary, BigDecimal.valueOf(12));
    }

    public BigDecimal calculateNI(BigDecimal salary, BigDecimal periodsInYear) {
            BigDecimal niBenefit = this.GetNIBenefitValue();

            List<SystemParameter> niParameters = this.systemParamRepo.findByParameterGroup(SystemParameterGroupEnum.NI);
            SystemParameter basicParam = niParameters.stream()
                    .filter(p -> p.getName().equals(NIBracketEnum.Basic.toString()))
                    .findFirst()
                    .orElse(null);
            SystemParameter additionalParam = niParameters.stream()
                    .filter(p -> p.getName().equals(NIBracketEnum.Additional.toString()))
                    .findFirst()
                    .orElse(null);

            BigDecimal basicThreshold = basicParam.getLowerThreshold() != null ? basicParam.getLowerThreshold() : BigDecimal.ZERO;
            BigDecimal additionalThreshold = additionalParam.getLowerThreshold() != null ? additionalParam.getLowerThreshold() : BigDecimal.ZERO;

            BigDecimal basicRate = basicParam.getRate();
            BigDecimal additionalRate = additionalParam.getRate();

            basicThreshold = basicThreshold.divide(periodsInYear, 5, RoundingMode.HALF_DOWN);
            additionalThreshold = additionalThreshold.divide(periodsInYear, 5, RoundingMode.HALF_DOWN);

            return this.calculateNI(salary, basicThreshold, additionalThreshold, basicRate, additionalRate, niBenefit);
    }
    
    public BigDecimal calculateNI(
        BigDecimal salary,
        BigDecimal basicThreshold,
        BigDecimal additionalThreshold,
        BigDecimal basicRate,
        BigDecimal additionalRate,
        BigDecimal niBenefitScheme) {
        
            BigDecimal nationalInsurance;
            BigDecimal niAbleSalary = salary.subtract(niBenefitScheme);

            if (niAbleSalary.compareTo(basicThreshold) > 0) {
                if (niAbleSalary.compareTo(additionalThreshold) < 0) {
                    nationalInsurance = niAbleSalary.subtract(basicThreshold).multiply(basicRate.divide(BigDecimal.valueOf(100)));
                } else {
                    nationalInsurance = additionalThreshold.subtract(basicThreshold).multiply(basicRate.divide(BigDecimal.valueOf(100)));
                    nationalInsurance = nationalInsurance.add(niAbleSalary.subtract(additionalThreshold).multiply(additionalRate.divide(BigDecimal.valueOf(100))));
                }
            } else {
                nationalInsurance = BigDecimal.ZERO;
            }

            return nationalInsurance.setScale(2, RoundingMode.HALF_UP);
    }
    
    
    public BigDecimal GetNIBenefitValue() {
        List<Deduction> deductions = this.deductionRepo
                .findByType(DeductionTypeEnum.NIBenefit);
        BigDecimal deductionsTotal = deductions.stream()
                .map(Deduction::getCost)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return deductionsTotal;
    }
}

