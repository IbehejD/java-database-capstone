package com.project.back_end.DTO;

public class Login {

    private String identifier; // Represents the email address used for logging into the system.
    private String password; // Represents the password associated with the email address.

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
