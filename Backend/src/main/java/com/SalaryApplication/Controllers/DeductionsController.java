package com.SalaryApplication.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.SalaryApplication.Models.Deduction;
import com.SalaryApplication.Models.Authentication.Responses.MessageResponse;
import com.SalaryApplication.Repositories.DeductionRepository;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/deductions")
public class DeductionsController {
    
    @Autowired
    private DeductionRepository deductionsRepo;

    @GetMapping
    public ResponseEntity<List<Deduction>> getDeductions() {
        List<Deduction> deductions = deductionsRepo.findAll();
        return ResponseEntity.ok(deductions);
    }


    @GetMapping("/byUser/{userId}")
    public ResponseEntity<List<Deduction>> getUser(@PathVariable Integer userId) {
        List<Deduction> deductions = deductionsRepo.findByCreatedById(userId);
        return ResponseEntity.ok(deductions);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Deduction> getDeduction(@PathVariable Integer id) {
        Optional<Deduction> deduction = deductionsRepo.findById(id);
        if (deduction == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(deduction.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putDeduction(@PathVariable Integer id, @RequestBody Deduction deduction) {
        Optional<Deduction> existingDeduction = deductionsRepo.findById(id);
        if (existingDeduction == null) {
            return ResponseEntity.notFound().build();
        } else {
            deduction.setUser(existingDeduction.get().getUser());
        }

        deductionsRepo.save(deduction);
        return ResponseEntity.ok().body(new MessageResponse("Deduction updated."));
    }

    @PostMapping
    public ResponseEntity<Deduction> postDeduction(@RequestBody Deduction deduction) {
        deductionsRepo.save(deduction);

        return ResponseEntity
                .created(UriComponentsBuilder.fromPath("/api/deductions/{id}")
                .buildAndExpand(deduction.getId()).toUri())
                .body(deduction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDeduction(@PathVariable Integer id) {
        Optional<Deduction> existingDeduction = deductionsRepo.findById(id);
        if (existingDeduction == null) {
            return ResponseEntity.notFound().build();
        }
        deductionsRepo.delete(existingDeduction.get());
        return ResponseEntity.ok().body(new MessageResponse("Deduction deleted."));
    }
}
