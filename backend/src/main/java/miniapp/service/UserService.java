package miniapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import miniapp.dto.request.LoginRequest;
import miniapp.dto.request.RegisterRequest;
import miniapp.dto.response.AuthResponse;
import miniapp.dto.response.UserResponse;
import miniapp.entity.UserEntity;
import miniapp.repository.UserRepository;
import miniapp.security.JwtUtils;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;
   
    public Optional<UserEntity> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public AuthResponse registerUser(RegisterRequest registerRequest) {
        try {
            // Check if username already exists
            if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
                return AuthResponse.error("Username already taken");
            }
            
            // Check if email already exists
            if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
                return AuthResponse.error("Email already registered");
            }

            // Create new user account
            UserEntity user = new UserEntity();
            user.setUsername(registerRequest.getUsername());      
            user.setEmail(registerRequest.getEmail());            
            user.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
            user.setFirstName(registerRequest.getFirstName());
            user.setLastName(registerRequest.getLastName());

            // Save to database
            UserEntity savedUser = userRepository.save(user);

            String jwtToken = jwtUtils.generateToken(savedUser);

            // Create UserResponse DTO
            UserResponse userResponse = new UserResponse(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getUsername(),
                savedUser.getFirstName(),
                savedUser.getLastName()
            );

            return AuthResponse.success("Registration successful", jwtToken, userResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return AuthResponse.error("Registration failed: " + e.getMessage());
        }
    }

    // Login user
    public AuthResponse loginUser(LoginRequest loginRequest) {
        try {
            // Find user by email
            Optional<UserEntity> userOptional = userRepository.findByEmail(loginRequest.getEmail());
            
            if (userOptional.isEmpty()) {
                return AuthResponse.error("Invalid email or password");
            }

            UserEntity user = userOptional.get();

            // Check password using PasswordEncoder
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
                return AuthResponse.error("Invalid email or password");
            }

            String jwtToken = jwtUtils.generateToken(user);

            // Create UserResponse DTO
            UserResponse userResponse = new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName()
            );

            return AuthResponse.success("Login successful", jwtToken, userResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return AuthResponse.error("Login failed: " + e.getMessage());
        }
    }

    // Check if email exists
    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();  
    }
    
    // Check if username exists
    public boolean usernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    // CREATE
    public UserEntity addAccount(UserEntity account) {
        // Encrypt password before saving
        if (account.getPasswordHash() != null && !account.getPasswordHash().startsWith("$2a$")) {
            account.setPasswordHash(passwordEncoder.encode(account.getPasswordHash()));
        }
        
        return userRepository.save(account);
    }

    // READ ALL
    public List<UserEntity> getAllAccounts() {
        return userRepository.findAll();
    }

    // READ ONE
    public Optional<UserEntity> getAccountById(int id) {
        return userRepository.findById(id);
    }

    // READ by username
    public Optional<UserEntity> getAccountByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    // READ by email
    public Optional<UserEntity> getAccountByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // DELETE
    public void deleteAccount(int id) {
        userRepository.deleteById(id);
    }
}