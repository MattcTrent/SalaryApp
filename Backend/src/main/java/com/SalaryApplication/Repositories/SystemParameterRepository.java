package com.SalaryApplication.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SalaryApplication.Models.SystemParameter;
import com.SalaryApplication.Models.Enums.SystemParameterGroupEnum;

@Repository
public interface SystemParameterRepository extends JpaRepository<SystemParameter, Integer>{
    
    List<SystemParameter> findByParameterGroup(SystemParameterGroupEnum parameterGroup);
}