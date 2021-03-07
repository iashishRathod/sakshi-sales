package com.manage.delta.model;

import java.io.Serializable;

public class PartySearchCriteriaSO extends PaginationData implements Serializable {

	private static final long serialVersionUID = 758525426991597627L;
	
	private String name;
	private String startDate;
	private String email;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public PartySearchCriteriaSO() {
		super();
	}
	public PartySearchCriteriaSO(String name, String startDate,String email) {
		super();
		this.name = name;
		this.startDate = startDate;
		this.email = email;
	}
}
