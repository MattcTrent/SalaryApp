package com.SalaryApplication.DataSeeders;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.SalaryApplication.Models.SystemParameter;
import com.SalaryApplication.Models.Enums.NIBracketEnum;
import com.SalaryApplication.Models.Enums.StudentFinancePlanEnum;
import com.SalaryApplication.Models.Enums.SystemParameterGroupEnum;
import com.SalaryApplication.Models.Enums.TaxBracketEnum;
import com.SalaryApplication.Repositories.SystemParameterRepository;

@Component
public class SystemParameterSeeder {

	@Autowired
	SystemParameterRepository systemParamRepository;

	public void loadData() {
		if (systemParamRepository.count() == 0) {
			System.out.println(systemParamRepository.count() + " system parameters found, seeding database...");

			List<SystemParameter> systemParams = getParameters();

			systemParamRepository.saveAll(systemParams);
			System.out.println(systemParamRepository.count() + " system parameter records added.");
		} else {
			System.out.println(systemParamRepository.count() + " system parameters found, checking values database...");
			List<SystemParameter> systemParams = getParameters();

			for (SystemParameter systemParameter : systemParams) {
				Optional<SystemParameter> existingParameter = systemParamRepository
						.findByParameterGroupAndName(systemParameter.getParameterGroup(), systemParameter.getName());
				if (existingParameter.isPresent()) {
					boolean updateParam = false;
					if (existingParameter.get().equals(systemParameter)) {
						System.out.println(systemParameter.getName() + " " + systemParameter.getParameterGroup()
								+ " stored values different to seed values, updating to match seed.");
						systemParamRepository.save(systemParameter);
					}

					if (updateParam) {
						systemParamRepository.save(systemParameter);
					}
				}

			}
			System.out.println(" system parameter records checked.");
		}
	}

	private List<SystemParameter> getParameters() {
		List<SystemParameter> systemParams = new ArrayList<SystemParameter>();
		systemParams
				.add(new SystemParameter(SystemParameterGroupEnum.Tax, TaxBracketEnum.PersonalAllowance.toString(),
						BigDecimal.valueOf(0.0), null, BigDecimal.valueOf(12570.0)));
		systemParams.add(new SystemParameter(SystemParameterGroupEnum.Tax, TaxBracketEnum.Basic.toString(),
				BigDecimal.valueOf(20.0), BigDecimal.valueOf(12570.0), BigDecimal.valueOf(50270.0)));
		systemParams.add(new SystemParameter(SystemParameterGroupEnum.Tax, TaxBracketEnum.Higher.toString(),
				BigDecimal.valueOf(40.0), BigDecimal.valueOf(50570.0), BigDecimal.valueOf(125140.0)));
		systemParams.add(new SystemParameter(SystemParameterGroupEnum.Tax, TaxBracketEnum.Additional.toString(),
				BigDecimal.valueOf(45.0), BigDecimal.valueOf(125140.0), null));

		systemParams.add(new SystemParameter(SystemParameterGroupEnum.NI, NIBracketEnum.Basic.toString(),
				BigDecimal.valueOf(12.0), BigDecimal.valueOf(12576.0), BigDecimal.valueOf(50265.0)));
		systemParams.add(new SystemParameter(SystemParameterGroupEnum.NI, NIBracketEnum.Additional.toString(),
				BigDecimal.valueOf(2), BigDecimal.valueOf(50268.0), null));

		systemParams.add(new SystemParameter(SystemParameterGroupEnum.StudentFinance,
				StudentFinancePlanEnum.Plan1.toString(), BigDecimal.valueOf(9.0), BigDecimal.valueOf(22015.0),
				null));
		systemParams.add(new SystemParameter(SystemParameterGroupEnum.StudentFinance,
				StudentFinancePlanEnum.Plan2.toString(), BigDecimal.valueOf(9.0), BigDecimal.valueOf(27295.0),
				null));

		return systemParams;

	}
}