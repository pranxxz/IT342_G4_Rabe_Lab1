package miniapp.controller;

import miniapp.entity.UserEntity;
import miniapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000") 
public class UserController {

    @Autowired
    private UserService service;

    // CREATE 
    @PostMapping("/add")
    public UserEntity addAccount(@RequestBody UserEntity account) {
        return service.addAccount(account);
    }

    // READ ALL
    @GetMapping("/all")
    public List<UserEntity> getAllAccounts() {
        return service.getAllAccounts();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Optional<UserEntity> getAccountById(@PathVariable int id) {
        return service.getAccountById(id);
    }
    
    // NEW: GET CURRENT USER (for logged-in user)
    @GetMapping("/current")
    public ResponseEntity<?> getCurrentUser() {
        try {
            System.out.println("Getting current user...");
            
            // Get authentication from Spring Security
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            
            if (auth == null || !auth.isAuthenticated() || auth.getName().equals("anonymousUser")) {
                System.out.println("User not authenticated");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
            }
            
            String username = auth.getName();
            System.out.println("✅Authenticated user: " + username);
            
            // Find user by username (email in your case)
            Optional<UserEntity> userAccountOpt = service.findByUsername(username);
            
            if (userAccountOpt.isEmpty()) {
                System.out.println("❌ User account not found for username: " + username);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User account not found");
            }
            
            UserEntity userAccount = userAccountOpt.get();
            System.out.println("Found user account: ID=" + userAccount.getId() + 
                               ", Username=" + userAccount.getUsername());
            
            // Create response
            Map<String, Object> response = new HashMap<>();
            response.put("id", userAccount.getId());
            response.put("username", userAccount.getUsername());
            
            System.out.println("Sending response: " + response);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("Error getting current user: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteAccount(@PathVariable int id) {
        service.deleteAccount(id);
        return "User account with ID " + id + " has been deleted.";
    }
}