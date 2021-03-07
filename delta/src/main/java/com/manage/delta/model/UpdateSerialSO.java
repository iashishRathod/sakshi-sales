package com.manage.delta.model;

public class UpdateSerialSO extends BaseRequestSO {

	private static final long serialVersionUID = 5740273745875720411L;
	
	private String currSerialNumber;
	private String newSerialNumber;
	public String getCurrSerialNumber() {
		return currSerialNumber;
	}
	public void setCurrSerialNumber(String currSerialNumber) {
		this.currSerialNumber = currSerialNumber;
	}
	public String getNewSerialNumber() {
		return newSerialNumber;
	}
	public void setNewSerialNumber(String newSerialNumber) {
		this.newSerialNumber = newSerialNumber;
	}
}
