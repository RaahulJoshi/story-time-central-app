
package com.libraryhub.dto;

import com.libraryhub.model.Role;
import com.libraryhub.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    
    private Long id;
    private String username;
    private String email;
    private String role;
    private String firstName;
    private String lastName;
    
    public static UserDto fromEntity(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        
        // Get highest role
        String role = "USER";
        Set<String> roles = user.getRoles().stream()
            .map(Role::getName)
            .collect(Collectors.toSet());
        
        if (roles.contains("ADMIN")) {
            role = "ADMIN";
        } else if (roles.contains("LIBRARIAN")) {
            role = "LIBRARIAN";
        }
        
        dto.setRole(role);
        
        return dto;
    }
}
