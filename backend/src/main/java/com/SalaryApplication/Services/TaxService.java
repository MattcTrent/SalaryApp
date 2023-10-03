package com.SalaryApplication.Services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SalaryApplication.Models.Deduction;
import com.SalaryApplication.Models.SystemParameter;
import com.SalaryApplication.Models.Enums.DeductionTypeEnum;
import com.SalaryApplication.Models.Enums.SystemParameterGroupEnum;
import com.SalaryApplication.Models.Enums.TaxBracketEnum;
import com.SalaryApplication.Repositories.DeductionRepository;
import com.SalaryApplication.Repositories.SystemParameterRepository;
import com.SalaryApplication.Services.Interfaces.ITaxService;

@Service
public class TaxService implements ITaxService {

    @Autowired
    private SystemParameterRepository systemParamRepo;
    @Autowired
    private DeductionRepository deductionRepo;

    public BigDecimal calculateYearlyTax(BigDecimal yearlySalary) {
        return calculateTax(yearlySalary, BigDecimal.ONE);
    }

    public BigDecimal calculateMonthlyTax(BigDecimal monthlySalary) {
        return calculateTax(monthlySalary, BigDecimal.valueOf(12));
    }

    public BigDecimal calculateWeeklyTax(BigDecimal weeklySalary) {
        return calculateTax(weeklySalary, BigDecimal.valueOf(52));
    }

    private BigDecimal calculateTax(BigDecimal salary, BigDecimal periodsInYear) {
        List<SystemParameter> taxParameters = this.systemParamRepo
                .findByParameterGroup(SystemParameterGroupEnum.Tax);
        SystemParameter personalAllowanceParam = taxParameters.stream()
                .filter(p -> p.getName().equals(TaxBracketEnum.PersonalAllowance.toString()))
                .findFirst()
                .orElse(null);
        SystemParameter basicTaxParam = taxParameters.stream()
                .filter(p -> p.getName().equals(TaxBracketEnum.Basic.toString()))
                .findFirst()
                .orElse(null);
        SystemParameter higherTaxParam = taxParameters.stream()
                .filter(p -> p.getName().equals(TaxBracketEnum.Higher.toString()))
                .findFirst()
                .orElse(null);
        SystemParameter additionalTaxParam = taxParameters.stream()
                .filter(p -> p.getName().equals(TaxBracketEnum.Additional.toString()))
                .findFirst()
                .orElse(null);

        if (personalAllowanceParam == null || basicTaxParam == null || higherTaxParam == null
                || additionalTaxParam == null) {
            throw new IllegalArgumentException("One of the required parameters for Tax calculations is missing.");
        }

        BigDecimal personalAllowanceThreshold = personalAllowanceParam.getUpperThreshold() != null
                ? personalAllowanceParam.getUpperThreshold()
                : BigDecimal.ZERO;
        BigDecimal basicThreshold = basicTaxParam.getUpperThreshold() != null ? basicTaxParam.getUpperThreshold()
                : BigDecimal.ZERO;
        BigDecimal higherThreshold = higherTaxParam.getUpperThreshold() != null ? higherTaxParam.getUpperThreshold()
                : BigDecimal.ZERO;

        BigDecimal basicRate = basicTaxParam.getRate();
        BigDecimal higherRate = higherTaxParam.getRate();
        BigDecimal additionalRate = additionalTaxParam.getRate();

        BigDecimal taxBenefitScheme = this.GetTaxBenefitValue();

        personalAllowanceThreshold = personalAllowanceThreshold.divide(periodsInYear, 2, RoundingMode.DOWN);
        basicThreshold = basicThreshold.divide(periodsInYear, 2, RoundingMode.DOWN);
        higherThreshold = higherThreshold.divide(periodsInYear, 2, RoundingMode.DOWN);

        return calculateTax(salary, personalAllowanceThreshold, basicThreshold, higherThreshold, basicRate, higherRate,
                additionalRate, taxBenefitScheme);
    }

    public BigDecimal GetTaxBenefitValue() {
        List<Deduction> deductions = this.deductionRepo
                .findByType(DeductionTypeEnum.TaxBenefit);
        BigDecimal deductionsTotal = deductions.stream()
                .map(Deduction::getCost)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return deductionsTotal;
    }

    public BigDecimal GetNIBenefitValue() {
        List<Deduction> deductions = this.deductionRepo
                .findByType(DeductionTypeEnum.NIBenefit);
        BigDecimal deductionsTotal = deductions.stream()
                .map(Deduction::getCost)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return deductionsTotal;
    }

    private BigDecimal calculateTax(
            BigDecimal salary,
            BigDecimal personalAllowanceThreshold,
            BigDecimal basicThreshold,
            BigDecimal higherThreshold,
            BigDecimal basicRate,
            BigDecimal higherRate,
            BigDecimal additionalRate,
            BigDecimal taxBenefitScheme) {
        BigDecimal basicValue;
        BigDecimal higherValue = BigDecimal.ZERO;
        BigDecimal additionalValue = BigDecimal.ZERO;
        BigDecimal taxableSalary = salary.subtract(taxBenefitScheme);
        BigDecimal tax;

        if (taxableSalary.compareTo(personalAllowanceThreshold) > 0) {
            if (taxableSalary.compareTo(higherThreshold) > 0) {
                additionalValue = taxableSalary.subtract(higherThreshold);
            }

            if (taxableSalary.compareTo(basicThreshold) > 0) {
                if (taxableSalary.compareTo(higherThreshold) > 0) {
                    taxableSalary = higherThreshold;
                }
                higherValue = taxableSalary.subtract(basicThreshold);
            }

            if (taxableSalary.compareTo(basicThreshold) > 0) {
                taxableSalary = basicThreshold;
            }
            basicValue = taxableSalary.subtract(personalAllowanceThreshold);

            tax = basicValue.multiply(basicRate.divide(BigDecimal.valueOf(100)));
            tax = tax.add(higherValue.multiply(higherRate.divide(BigDecimal.valueOf(100))));
            tax = tax.add(additionalValue.multiply(additionalRate.divide(BigDecimal.valueOf(100))));
        } else {
            tax = BigDecimal.ZERO;
        }

        return tax.setScale(2, RoundingMode.HALF_UP);
    }

    public BigDecimal getYearlyTaxFree() {
        List<SystemParameter> taxParameters = this.systemParamRepo
                .findByParameterGroup(SystemParameterGroupEnum.Tax);
        SystemParameter personalAllowanceParam = taxParameters.stream()
                .filter(p -> p.getName().equals(TaxBracketEnum.PersonalAllowance.toString()))
                .findFirst()
                .orElse(null);

        return personalAllowanceParam.getUpperThreshold();
    }

    public BigDecimal getMonthlyTaxFree() {
        return this.getYearlyTaxFree().divide(BigDecimal.valueOf(12), 5, RoundingMode.HALF_UP);
    }
}
