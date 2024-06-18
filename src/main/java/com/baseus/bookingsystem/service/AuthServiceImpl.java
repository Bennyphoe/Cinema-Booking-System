package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.dto.LoginDto;
import com.baseus.bookingsystem.dto.RegisterDto;
import com.baseus.bookingsystem.entity.Role;
import com.baseus.bookingsystem.entity.User;
import com.baseus.bookingsystem.exception.APIException;
import com.baseus.bookingsystem.repository.RoleRepository;
import com.baseus.bookingsystem.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements  AuthService{

    private UserRepository userRepository;

    private AuthenticationManager authenticationManager;

    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public String register(RegisterDto registerDto) {
        String username = registerDto.getUsername();
        String password = registerDto.getPassword();
        if (userRepository.findByUsername(username).isPresent()) {
            throw new APIException(HttpStatus.BAD_REQUEST, "Username already Exist!");
        }
        System.out.println(password);
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));

        List<String> roles = registerDto.getRoles();
        for (String role: roles) {
            Role newRole = new Role();
            newRole.setRole("ROLE_" + role);
            newUser.addRole(newRole);
        }

        userRepository.save(newUser);

        return newUser.toString();

    }

    @Override
    public String login(LoginDto loginDto) {
        String username = loginDto.getUsername();
        String password = loginDto.getPassword();
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return "User logged in successfully!";
    }
}
