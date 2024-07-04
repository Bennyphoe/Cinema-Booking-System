package com.baseus.bookingsystem.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RegisterDto {
    private String username;
    private String password;
    private List<String> roles;
}
