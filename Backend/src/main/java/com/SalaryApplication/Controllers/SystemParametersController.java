package com.SalaryApplication.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import com.SalaryApplication.Models.SystemParameter;
import com.SalaryApplication.Models.Authentication.Responses.MessageResponse;
import com.SalaryApplication.Repositories.SystemParameterRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/systemparameters")
public class SystemParametersController {

    @Autowired
    private SystemParameterRepository systemParamRepo;

    @GetMapping
    public ResponseEntity<List<SystemParameter>> getSystemParameters() {
        List<SystemParameter> systemParameters = systemParamRepo.findAll();
        return ResponseEntity.ok(systemParameters);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SystemParameter> getSystemParameter(@PathVariable Integer id) {
        Optional<SystemParameter> systemParameter = systemParamRepo.findById(id);
        if (systemParameter == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(systemParameter.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putSystemParameter(@PathVariable Integer id, @RequestBody SystemParameter systemParameter) {
        Optional<SystemParameter> systemPara = systemParamRepo.findById(id);
        if (systemPara == null) {
            return ResponseEntity.notFound().build();
        }
        systemParamRepo.save(systemParameter);
        return ResponseEntity.ok().body(new MessageResponse("System parameter updated."));
    }

    @PostMapping
    public ResponseEntity<SystemParameter> postSystemParameter(@RequestBody SystemParameter systemParameter) {
        systemParamRepo.save(systemParameter);

        return ResponseEntity
                .created(UriComponentsBuilder.fromPath("/api/systemparameters/{id}")
                .buildAndExpand(systemParameter.getId()).toUri())
                .body(systemParameter);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSystemParameter(@PathVariable Integer id) {
        Optional<SystemParameter> systemPara = systemParamRepo.findById(id);
        if (systemPara == null) {
            return ResponseEntity.notFound().build();
        }
        systemParamRepo.delete(systemPara.get());
        return ResponseEntity.ok().body(new MessageResponse("System parameter deleted."));
    }
}

