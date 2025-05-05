package com.ecommerce.webstore_app.security.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponse {

    private Long id;
    private String username;
    @JsonIgnore
    private String jwtToken;
    private List<String> roles;

    public UserInfoResponse(Long id, String username, List<String> roles) {
        this.id = id;
        this.username = username;
        this.roles = roles;
    }
//
//    public UserInfoResponse(Long id, String username, String jwtToken, List<String> roles) {
//        this.id = id;
//        this.username = username;
//        this.jwtToken = jwtToken;
//        this.roles = roles;
//    }
}
