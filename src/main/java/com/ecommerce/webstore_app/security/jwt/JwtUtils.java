package com.ecommerce.webstore_app.security.jwt;

import com.ecommerce.webstore_app.security.service.UserDetailsImpl;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.crypto.SecretKey;
import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${spring.app.secretkey}")
    private String secret;

    @Value("${spring.app.expirems}")
    private int expireMs;

//  From here let's write code for Cookie based Jwt Authentization
    @Value("${spring.app.cookieName}")
    private String cookieName;

    public String getJwtFromCookie(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, cookieName);
        if (cookie != null) {
            return cookie.getValue();
        }else {
            return null;
        }
    }

//    responsible for cookie creation on authentication with sign in API
    public ResponseCookie generateJwtCookie(UserDetailsImpl userDetails){
        String jwt = generateTokenFromUsername(userDetails.getUsername());
        ResponseCookie responseCookie = ResponseCookie.from(cookieName, jwt).path("/api")
                .maxAge(24*60*60)
                .secure(false)
                .httpOnly(false)
                .build();
        return responseCookie;
    }

//    responsible for making cookie null for sign out API
    public ResponseCookie getCleanJwtCookie() {
        ResponseCookie responseCookie = ResponseCookie.from(cookieName, null).path("/api")
                .build();
        return responseCookie;
    }
//    This is getting bearer from header Authorization direction
//    public String getJwtFromHeader(HttpServletRequest request){
//        String auth = request.getHeader("Authorization");
//        if (auth != null && auth.startsWith("Bearer ")){
//            return auth.substring(7);
//        }
//        return null;
//    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    public String generateTokenFromUsername(String username) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = userDetails.getUsername();
        return Jwts.builder()
                .issuer("self")
                .subject(username)
                .issuedAt(Date.from(Instant.now())) // Set issued at time
                .expiration(Date.from(Instant.now().plusMillis(expireMs)))
                .claim("scope", createScope(authentication))
                .signWith(key())
                .compact();
    }

    public String generateUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) key()).build()
                .parseSignedClaims(token)
                .getPayload().getSubject();
    }

    public boolean validateJwtToken(String authToken) {

        try {
            System.out.println("Validate");
            Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(authToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;

    }

    private String createScope(Authentication authentication) {
        // Convert authorities to a space-separated string
      return authentication.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .collect(Collectors.joining(" "));
    }


}
