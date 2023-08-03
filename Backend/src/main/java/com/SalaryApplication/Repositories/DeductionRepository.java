package com.SalaryApplication.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SalaryApplication.Models.Deduction;
import com.SalaryApplication.Models.Enums.DeductionTypeEnum;

@Repository
public interface DeductionRepository extends JpaRepository<Deduction, Integer>{
    
    List<Deduction> findByType(DeductionTypeEnum type);
    List<Deduction> findByUserId(Integer id);
    List<Deduction> findByCreatedById(Integer id);
    List<Deduction> findByUserIdAndType(Integer userId, DeductionTypeEnum type);
}
