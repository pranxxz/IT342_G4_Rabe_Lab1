package miniapp.controller;

import miniapp.dto.request.LoginRequest;
import miniapp.dto.request.RegisterRequest;
import miniapp.dto.response.AuthResponse;
import miniapp.service.UserService;  

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;  

    // Check if email exists
    @GetMapping("/check-email/{email}")
    public ResponseEntity<Boolean> checkEmail(@PathVariable String email) {
        boolean exists = userService.emailExists(email);  //service method
        return ResponseEntity.ok(exists);
    }
    
    // Check if username exists 
    @GetMapping("/check-username/{username}")
    public ResponseEntity<Boolean> checkUsername(@PathVariable String username) {
        boolean exists = userService.usernameExists(username);   //service method
        return ResponseEntity.ok(exists);
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        // Input validation 
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(AuthResponse.error("Email is required"));
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(AuthResponse.error("Password is required"));
        }
        
        // Delegate business logic to service
        AuthResponse response = userService.loginUser(request);
        
        // Return appropriate HTTP status based on service response
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        // Input validation 
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(AuthResponse.error("Email is required"));
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(AuthResponse.error("Password is required"));
        }
        if (request.getFirstName() == null || request.getFirstName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(AuthResponse.error("First name is required"));
        }
        if (request.getLastName() == null || request.getLastName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(AuthResponse.error("Last name is required"));
        }
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(AuthResponse.error("Username is required"));
        }
        
        // Delegate business logic to service
        AuthResponse response = userService.registerUser(request);
        
        // Map service response to appropriate HTTP status
        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            // Check error type to return appropriate HTTP status
            String errorMsg = response.getMessage().toLowerCase();
            if (errorMsg.contains("already") || errorMsg.contains("taken") || errorMsg.contains("exist")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/dashboard")
    public ResponseEntity<String> getDashboard() {
        return ResponseEntity.ok("Welcome to your dashboard!");
    }
}