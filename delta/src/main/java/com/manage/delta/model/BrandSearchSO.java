package com.manage.delta.model;

import java.io.Serializable;

public class BrandSearchSO extends PaginationData implements Serializable{

	private static final long serialVersionUID = -4280483396715473142L;
	
	private String brandName;
	private String email;
	private String partyName;
	private String productName;
	
	public String getBrandName() {
		return brandName;
	}
	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPartyName() {
		return partyName;
	}
	public void setPartyName(String partyName) {
		this.partyName = partyName;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
}
