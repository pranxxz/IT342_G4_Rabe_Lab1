package miniapp.dto.response;

public class AuthResponse {
    private boolean success;
    private String message;
    private String token;
    private UserResponse user;  
    
    public AuthResponse() {}
    
    public AuthResponse(boolean success, String message, String token, UserResponse user) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.user = user;
    }
    
    // Static factory methods
    public static AuthResponse success(String message, String token, UserResponse user) {
        return new AuthResponse(true, message, token, user);
    }
    
    public static AuthResponse error(String message) {
        return new AuthResponse(false, message, null, null);
    }
    
    // Getters and Setters
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public UserResponse getUser() { return user; }
    public void setUser(UserResponse user) { this.user = user; }
}