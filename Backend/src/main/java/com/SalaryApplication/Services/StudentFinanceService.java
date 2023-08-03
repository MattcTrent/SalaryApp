package com.SalaryApplication.Services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SalaryApplication.Models.SystemParameter;
import com.SalaryApplication.Models.Enums.StudentFinancePlanEnum;
import com.SalaryApplication.Models.Enums.SystemParameterGroupEnum;
import com.SalaryApplication.Repositories.SystemParameterRepository;
import com.SalaryApplication.Services.Interfaces.IStudentFinanceService;

@Service
public class StudentFinanceService implements IStudentFinanceService {

    @Autowired
    private SystemParameterRepository systemParamRepo;

    public BigDecimal calculateYearlyStudentFinance(BigDecimal yearlySalary, BigDecimal niBenefit,
            BigDecimal taxBenefit, StudentFinancePlanEnum planUsed) {
        yearlySalary = yearlySalary.subtract(niBenefit.multiply(BigDecimal.valueOf(12)));
        yearlySalary = yearlySalary.subtract(taxBenefit.multiply(BigDecimal.valueOf(12)));
        return calculateStudentFinance(yearlySalary, planUsed, BigDecimal.ONE);
    }

    public BigDecimal calculateMonthlyStudentFinance(BigDecimal monthlySalary, BigDecimal niBenefit,
            BigDecimal taxBenefit, StudentFinancePlanEnum planUsed) {
        monthlySalary = monthlySalary.subtract(niBenefit);
        monthlySalary = monthlySalary.subtract(taxBenefit);

        return calculateStudentFinance(monthlySalary, planUsed, BigDecimal.valueOf(12));
    }

    public BigDecimal calculateWeeklyStudentFinance(BigDecimal weeklySalary, StudentFinancePlanEnum planUsed) {
        return calculateStudentFinance(weeklySalary, planUsed, BigDecimal.valueOf(52));
    }

    private BigDecimal calculateStudentFinance(BigDecimal salary, StudentFinancePlanEnum planUsed,
            BigDecimal periodsInYear) {

        BigDecimal studentFinance = BigDecimal.ZERO;

        List<SystemParameter> niParameters = this.systemParamRepo
                .findByParameterGroup(SystemParameterGroupEnum.StudentFinance);
        if (planUsed != StudentFinancePlanEnum.None) {
            SystemParameter planParam = niParameters.stream()
                    .filter(p -> p.getName().equals(planUsed.toString()))
                    .findFirst()
                    .orElse(null);

            if (planParam != null) {
                BigDecimal planThreshold = planParam.getLowerThreshold() != null
                        ? planParam.getLowerThreshold().divide(periodsInYear, 5, RoundingMode.HALF_DOWN)
                        : BigDecimal.ZERO;
                BigDecimal sfRate = planParam.getRate();

                studentFinance = calculateStudentFinance(salary, planThreshold, sfRate);
            }
        }

        return studentFinance.setScale(0, RoundingMode.DOWN);
    }

    private BigDecimal calculateStudentFinance(BigDecimal salary, BigDecimal planThreshold, BigDecimal sfRate) {
        BigDecimal salaryOverBy = BigDecimal.ZERO;

        if (salary.compareTo(planThreshold) > 0) {
            salaryOverBy = salary.subtract(planThreshold);
        }

        BigDecimal studentFinance = salaryOverBy.multiply(sfRate.divide(BigDecimal.valueOf(100)));

        return studentFinance.setScale(0, RoundingMode.DOWN);
    }
}
