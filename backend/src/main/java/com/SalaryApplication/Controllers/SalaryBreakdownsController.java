package com.SalaryApplication.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SalaryApplication.Models.SalaryBreakdown;
import com.SalaryApplication.Services.SalaryBreakdownService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/salarybreakdowns")
public class SalaryBreakdownsController {

    @Autowired
    private SalaryBreakdownService salaryBreakdownService;

    @GetMapping("/{username}")
    public ResponseEntity<SalaryBreakdown> getUser(@PathVariable String username) {
        SalaryBreakdown breakdown = salaryBreakdownService.getSalaryBreakdown(username);
        if (breakdown == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(breakdown);
    }
}
