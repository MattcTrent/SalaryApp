package com.SalaryApplication.Models.Authentication.Responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
    private UserInfo user;
	private MessageResponse message;

    public AuthResponse(UserInfo userInfo, MessageResponse message) {
        this.user = userInfo;
	    this.message = message;
	  }
}
