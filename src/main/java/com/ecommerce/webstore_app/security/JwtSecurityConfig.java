//package com.ecommerce.webstore_app.jwt;
//
//import com.ecommerce.webstore_app.security.jwt.AuthEntryPointJwt;
//import com.ecommerce.webstore_app.security.jwt.AuthTokenFilter;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.provisioning.JdbcUserDetailsManager;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import javax.sql.DataSource;
//
//import static org.springframework.security.config.Customizer.withDefaults;
///*
//* This Security Config file is useful if you need jwt along with spring security standard UserDetails and UserDetailsService
//* However if you wanted to customize your User details with UserDetails and UserDetailsServie then use customized
//* UserDetailsService Implmenetation instead of DataSource alogng with DaoAuthenticationProvider
//* */
//@Configuration
//@EnableWebSecurity
//public class JwtSecurityConfig {
//
//    @Autowired
//    private DataSource dataSource;
//
//    @Autowired
//    private AuthEntryPointJwt unauthorizedHandler;
//
//    @Bean
//    public AuthTokenFilter authenticateJwtTokenFilter () {
//        return new AuthTokenFilter();
//    }
//
//    @Bean
//    public SecurityFilterChain cutomizeSecurityFilterChain(HttpSecurity http) throws Exception {
//        http.authorizeHttpRequests(
//                auth -> auth
//                        .requestMatchers("/db/**").permitAll()
//                        .requestMatchers("/api/auth/**").permitAll()
//                        .anyRequest().authenticated());
//        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//        http.exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler));
//        http.headers(header -> header.frameOptions(opt -> opt.sameOrigin()));
//        http.csrf(csrf -> csrf.disable());
//        http.addFilterBefore(authenticateJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
//        return http.build();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public UserDetailsService customUserDetailsService(DataSource dataSource) {
//        return new JdbcUserDetailsManager(dataSource);
//    }
//
//    @Bean
//    public CommandLineRunner initDatabase(UserDetailsService customUserDetailsService) {
//        return args -> {
//            JdbcUserDetailsManager manager = (JdbcUserDetailsManager) customUserDetailsService;
//            UserDetails user1 = User.withUsername("user1")
//                    .password(passwordEncoder().encode("dummy1"))
//                    .roles("USER", "ADMIN")
//                    .build();
//
//            UserDetails admin = User.withUsername("admin")
//                    .password(passwordEncoder().encode("dummy2"))
//                    .roles("ADMIN")
//                    .build();
//
//            var jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);
//            jdbcUserDetailsManager.createUser(user1);
//            jdbcUserDetailsManager.createUser(admin);
//        };
//    }
//
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//        return configuration.getAuthenticationManager();
//    }
//
//}
//
//
////    @Bean
////    public UserDetailsService customUserDetailsService(PasswordEncoder passwordEncoder, DataSource dataSource) {
////        UserDetails user1 = User.withUsername("user1")
////                .password(passwordEncoder.encode("dummy1"))
////                .roles("USER")
////                .build();
////
////        UserDetails admin = User.withUsername("admin")
////                .password(passwordEncoder.encode("dummy2"))
////                .roles("ADMIN")
////                .build();
////
////        var jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);
////        jdbcUserDetailsManager.createUser(user1);
////        jdbcUserDetailsManager.createUser(admin);
////
////        return jdbcUserDetailsManager;
////    }