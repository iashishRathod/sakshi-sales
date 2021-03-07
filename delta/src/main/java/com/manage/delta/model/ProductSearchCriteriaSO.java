package com.manage.delta.model;

public class ProductSearchCriteriaSO extends PaginationData{

	private static final long serialVersionUID = -7757783291559175255L;
	
	private String productType;
	private String productName;
	
	public String getProductType() {
		return productType;
	}
	public void setProductType(String productType) {
		this.productType = productType;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
}
