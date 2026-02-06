package miniapp.dto.request;

public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String username;    // ← ADD THIS FIELD
    private String email;
    private String password;
    
    // No-args constructor
    public RegisterRequest() {
    }
    
    // All-args constructor (update)
    public RegisterRequest(String firstName, String lastName, String username, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;    // ← ADD
        this.email = email;
        this.password = password;
    }
    
    // Getters and Setters (add username)
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getUsername() {    // ← ADD THIS GETTER
        return username;
    }
    
    public void setUsername(String username) {  // ← ADD THIS SETTER
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    // toString for debugging (update)
    @Override
    public String toString() {
        return "RegisterRequest{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", username='" + username + '\'' +    // ← ADD
                ", email='" + email + '\'' +
                ", password='[PROTECTED]'" +
                '}';
    }
}