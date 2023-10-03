package com.SalaryApplication.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SalaryApplication.Models.User;
import com.SalaryApplication.Models.Authentication.Responses.MessageResponse;
import com.SalaryApplication.Repositories.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UserRepository userRepo;

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userRepo.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Integer id) {
        Optional<User> user = userRepo.findById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user.get());
    }

    @GetMapping("/byUsername/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username) {
        Optional<User> user = userRepo.findByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putUser(@PathVariable Integer id, @RequestBody User user) {
        Optional<User> existingUser = userRepo.findById(id);
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }
        else{
            //done because password cant be edited yet and done want to blank this out when saving
            user.setPassword(existingUser.get().getPassword());
        }
        userRepo.save(user);
        return ResponseEntity.ok().body(new MessageResponse("User updated."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        Optional<User> existingUser = userRepo.findById(id);
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }
        userRepo.delete(existingUser.get());
        return ResponseEntity.ok().body(new MessageResponse("User deleted."));
    }
}
