package com.baseus.bookingsystem.service;

import com.baseus.bookingsystem.dto.LoginDto;
import com.baseus.bookingsystem.dto.RegisterDto;
import com.baseus.bookingsystem.exception.APIException;

public interface AuthService {
    String register(RegisterDto registerDto);
    String login(LoginDto loginDto);
}
