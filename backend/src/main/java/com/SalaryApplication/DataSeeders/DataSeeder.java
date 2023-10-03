package com.SalaryApplication.DataSeeders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class DataSeeder implements CommandLineRunner {

	@Autowired
	SystemParameterSeeder systemParamSeeder;

	@Autowired
	RoleSeeder roleSeeder;

	@Autowired
	UserSeeder userSeeder;

	@Override
	public void run(String... args) throws Exception {
		loadData();
	}

	private void loadData() {
        systemParamSeeder.loadData();
        roleSeeder.loadData();
        userSeeder.loadData();
	}
}