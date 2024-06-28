package com.baseus.bookingsystem.security;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfig {

    private UserDetailsService userDetailsService;

    private JwtAuthenticationFilter authenticationFilter;

    private JWTAuthenticationEntryPoint authenticationEntryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.authorizeHttpRequests(configurer ->
                            configurer
                                    .requestMatchers("/api/auth/register").permitAll()
                                    .requestMatchers("/api/auth/**").permitAll()
                                    .requestMatchers(HttpMethod.GET,"/api/showtimes/**").permitAll()
                                    .requestMatchers(HttpMethod.GET, "/api/seats/**").permitAll()
                                    .requestMatchers(HttpMethod.POST, "/api/reservations").permitAll()
                                    .requestMatchers(HttpMethod.GET, "/api/movies/showing").permitAll()
                                    .anyRequest().authenticated()

                            //TODO Add permit ALL for non logged in users, place this above anyRequest.authenticated
                );
        //use Basic Authentication
//        http.httpBasic(Customizer.withDefaults());
        //disable CSRF
        //in general not required for stateless REST APIs that use POST PUT DELETE ETC
        http.csrf(csrf -> csrf.disable());
        http.exceptionHandling(exception -> exception.authenticationEntryPoint(authenticationEntryPoint));
        http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}
