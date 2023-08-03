package com.SalaryApplication.Services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SalaryApplication.Models.Deduction;
import com.SalaryApplication.Models.SalaryBreakdown;
import com.SalaryApplication.Models.User;
import com.SalaryApplication.Models.Enums.DeductionTypeEnum;
import com.SalaryApplication.Repositories.DeductionRepository;
import com.SalaryApplication.Repositories.UserRepository;
import com.SalaryApplication.Services.Interfaces.INIService;
import com.SalaryApplication.Services.Interfaces.ISalaryBreakdownService;
import com.SalaryApplication.Services.Interfaces.IStudentFinanceService;
import com.SalaryApplication.Services.Interfaces.ITaxService;

@Service
public class SalaryBreakdownService implements ISalaryBreakdownService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private DeductionRepository deductionRepo;

    @Autowired
    private ITaxService taxService;
    @Autowired
    private INIService niService;
    @Autowired
    private IStudentFinanceService studentFinanceService;

    public SalaryBreakdown getSalaryBreakdown(Integer userId) {
        SalaryBreakdown breakdown = new SalaryBreakdown();

        Optional<User> user = userRepo.findById(userId);
        if (user != null) {
            breakdown = getSalaryBreakdown(user.get());
        }

        return breakdown;
    }

    public SalaryBreakdown getSalaryBreakdown(String userName) {
        SalaryBreakdown breakdown = new SalaryBreakdown();

        Optional<User> user = userRepo.findByUsername(userName);
        if (user != null) {
            breakdown = getSalaryBreakdown(user.get());
        }

        return breakdown;
    }

    public SalaryBreakdown getSalaryBreakdown(User user) {
        SalaryBreakdown breakdown = new SalaryBreakdown();

        breakdown.setName(user.getFirstName() + " " + user.getLastName());
        breakdown.setUser(user);

        breakdown.setMonthlySalary(user.getSalary().divide(BigDecimal.valueOf(12), 2, RoundingMode.UP));

        breakdown.setPension(breakdown.getMonthlySalary()
                .multiply((user.getPensionPercentage().divide(BigDecimal.valueOf(100)))).setScale(2, RoundingMode.DOWN));
        if (user.isPensionSalarySacrifice()) {
            breakdown.setSalarySacrifice(breakdown.getPension());
        }

        this.DeductSalarySacrificeDeductions(breakdown);

        breakdown.setTax(taxService.calculateMonthlyTax(breakdown.getSalaryPostSalarySacrifice()));
        breakdown.setTaxFree(taxService.getMonthlyTaxFree());

        breakdown.setnI(niService.calculateMonthlyNI(breakdown.getSalaryPostSalarySacrifice()));

        breakdown.setStudentFinance(studentFinanceService.calculateMonthlyStudentFinance(
                breakdown.getSalaryPostSalarySacrifice(), niService.GetNIBenefitValue(),
                taxService.GetTaxBenefitValue(), user.getStudentFinancePlan()));

        this.CalculateTakehome(breakdown);

        return breakdown;
    }

    private void DeductSalarySacrificeDeductions(SalaryBreakdown breakdown) {
        List<Deduction> deductions = this.deductionRepo
                .findByType(DeductionTypeEnum.SalarySacrifice);
        BigDecimal deductionsTotal = deductions.stream()
                .map(Deduction::getCost)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        breakdown.setSalarySacrifice(breakdown.getSalarySacrifice().add(deductionsTotal));
    }

    private void CalculateTakehome(SalaryBreakdown breakdown) {
        BigDecimal salary = breakdown.getMonthlySalary();

        BigDecimal takehome = salary.subtract(breakdown.getTax());
        takehome = takehome.subtract(breakdown.getnI());
        takehome = takehome.subtract(breakdown.getStudentFinance());

        if (breakdown.getUser().isPensionSalarySacrifice()) {
            takehome = takehome.subtract(breakdown.getPension());
        }

        // Benefits only deducted at end as to ensure they onyl affec relevant
        // calculations
        takehome = takehome.subtract(niService.GetNIBenefitValue());
        takehome = takehome.subtract(taxService.GetTaxBenefitValue());

        BigDecimal payrollDeductions = this.GetPayrollDeductionValue();

        breakdown.setTakehome(takehome.subtract(payrollDeductions));

        // TODO Add section to deduct costs (IE Rent, bills etc)
        breakdown.setTakehomeAfterBills(breakdown.getTakehome().subtract(BigDecimal.ZERO));
    }

    private BigDecimal GetPayrollDeductionValue() {
        List<Deduction> deductions = this.deductionRepo
                .findByType(DeductionTypeEnum.TaxBenefit);
        BigDecimal deductionsTotal = deductions.stream()
                .map(Deduction::getCost)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return deductionsTotal;
    }
}
