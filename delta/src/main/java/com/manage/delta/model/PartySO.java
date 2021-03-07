package com.manage.delta.model;

import java.util.Date;

import com.manage.delta.common.DateUtil;

public class PartySO extends BaseRequestSO {

	private static final long serialVersionUID = 6318908153369435355L;
	
	private Long partyId;
	private String name;
	private String email;
	private String contactNumber;
	private String startDate;
	
	public PartySO() {}
	
	public Long getPartyId() {
		return partyId;
	}
	public void setPartyId(Long partyId) {
		this.partyId = partyId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	
	public PartySO(Long partyId, String name, String email, String contactNumber,Date startDate) {
		super();
		this.partyId = partyId;
		this.name = name;
		this.email = email;
		this.contactNumber = contactNumber;
		this.startDate = DateUtil.convertDateToString(startDate);
	}

	@Override
	public String toString() {
		return "PartySO [partyId=" + partyId + ", name=" + name + ", email=" + email + ", contactNumber="
				+ contactNumber + "]";
	}
}
