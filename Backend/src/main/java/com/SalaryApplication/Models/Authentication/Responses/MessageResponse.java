package com.SalaryApplication.Models.Authentication.Responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageResponse {
	private String message;
	private String token;

	public MessageResponse(String message) {
		this.message = message;
	}

	public MessageResponse(String message, String token) {
		this.message = message;
		this.token = token;
	}
}