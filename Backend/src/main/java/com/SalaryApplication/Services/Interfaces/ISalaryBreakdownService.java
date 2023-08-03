package com.SalaryApplication.Services.Interfaces;

import com.SalaryApplication.Models.SalaryBreakdown;
import com.SalaryApplication.Models.User;

public interface ISalaryBreakdownService {
    SalaryBreakdown getSalaryBreakdown(Integer userID);
    SalaryBreakdown getSalaryBreakdown(String userName);
    SalaryBreakdown getSalaryBreakdown(User user);
}

