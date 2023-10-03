package com.SalaryApplication.Controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SalaryApplication.Models.Role;
import com.SalaryApplication.Models.User;
import com.SalaryApplication.Models.Authentication.Requests.AuthRequest;
import com.SalaryApplication.Models.Authentication.Responses.AuthResponse;
import com.SalaryApplication.Models.Authentication.Responses.MessageResponse;
import com.SalaryApplication.Models.Authentication.Responses.UserInfo;
import com.SalaryApplication.Models.Enums.RoleEnum;
import com.SalaryApplication.Repositories.RoleRepository;
import com.SalaryApplication.Repositories.UserRepository;
import com.SalaryApplication.Security.Filters.JWT.JwtUtils;
import com.SalaryApplication.Security.Services.CustomUserDetails;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthRequest authRequest) {

    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

    String jwt = jwtUtils.generateTokenFromUsername(userDetails.getUsername());
    // ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());
    // .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
    return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, jwt.toString())
        .body(new AuthResponse(new UserInfo(userDetails.getId(),
            userDetails.getUsername(),
            userDetails.getEmail(),
            roles), new MessageResponse("Login Successfull", jwt)));
  }

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@Valid @RequestBody AuthRequest authRequest) {
    if (userRepository.existsByUsername(authRequest.getUsername())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(authRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = new User(authRequest.getUsername(),
        encoder.encode(authRequest.getPassword()),
        authRequest.getFirstName(),
        authRequest.getLastName(),
        authRequest.getEmail(),
        authRequest.getSalary(),
        authRequest.getPensionPercentage(),
        authRequest.isPensionSalarySacrifice(),
        authRequest.getStudentFinancePlan());

    Set<Role> roles = new HashSet<>();

    Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER)
        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    roles.add(userRole);

    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new AuthResponse(null, new MessageResponse("User registered successfully!")));
  }

  @PostMapping("/logout")
  public ResponseEntity<?> logoutUser() {
    ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new MessageResponse("You've been signed out!"));
  }
}
