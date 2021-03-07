package com.manage.delta.model;

import java.io.Serializable;

public class BaseRequestSO implements Serializable{
	
	private static final long serialVersionUID = 3834833753425937302L;
	
	private String curdIndicator;
	
	public String getCurdIndicator() {
		return curdIndicator;
	}
	public void setCurdIndicator(String curdIndicator) {
		this.curdIndicator = curdIndicator;
	}
}
