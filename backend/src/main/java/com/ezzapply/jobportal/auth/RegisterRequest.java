package com.ezzapply.jobportal.auth;

import com.ezzapply.jobportal.user.UserRole;

public class RegisterRequest {
    public String fullName;
    public String email;
    public String password;
    public UserRole role;
}
