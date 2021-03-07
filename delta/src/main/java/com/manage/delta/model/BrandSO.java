package com.manage.delta.model;

public class BrandSO extends BaseRequestSO {

	private static final long serialVersionUID = 8391286019113858245L;
	
	private Long brandId;
	private String name;
	private String desc;
	private String email;
	private String partyNames;
	private String productNames;
	
	public BrandSO() {}
	
	public Long getBrandId() {
		return brandId;
	}
	public void setBrandId(Long brandId) {
		this.brandId = brandId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	public String getPartyNames() {
		return partyNames;
	}

	public void setPartyNames(String partyNames) {
		this.partyNames = partyNames;
	}

	public String getProductNames() {
		return productNames;
	}

	public void setProductNames(String productNames) {
		this.productNames = productNames;
	}

	public BrandSO(Long brandId, String name, String desc, String email, String partyNames,String productNames) {
		super();
		this.brandId = brandId;
		this.name = name;
		this.desc = desc;
		this.email = email;
		this.partyNames = partyNames;
		this.productNames = productNames;
	}
}
