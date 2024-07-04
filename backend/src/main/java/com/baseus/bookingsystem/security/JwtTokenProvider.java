package com.baseus.bookingsystem.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.jwt-secret}")
    private String secretKey;

    @Value("${app.jwt-expiration-milliseconds}")
    private long jwtExpirationDate;

    // Generate A token
    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expiredDate = new Date(currentDate.getTime() + jwtExpirationDate);

        return Jwts.builder().subject(username).issuedAt(new Date()).expiration(expiredDate).signWith(key()).compact();
    }

    private SecretKey key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    // Get username from JWT
    public String getUsername(String token) {
        //use the same secret key that is used to generate the token, then have to pass the token to parseSignedClaims which returns the payload of the token
        Claims claims = Jwts.parser().verifyWith(key()).build().parseSignedClaims(token).getPayload();
        //Get the username from the payload
        return claims.getSubject();
    }

    // Validate JWT Token
    public boolean validateToken(String token) {
        Jwts.parser().verifyWith(key()).build().parse(token);
        return true;
    }
}
