package com.manage.delta.model;

import java.math.BigDecimal;

public class InvoiceSO extends BaseRequestSO{

	private static final long serialVersionUID = -2621331124892007221L;
	
	private String brandName;
	private String product;
	private String serialNumbers;
	private String qty;
	private BigDecimal amount;
	
	
	public String getBrandName() {
		return brandName;
	}
	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
	public String getSerialNumbers() {
		return serialNumbers;
	}
	public void setSerialNumbers(String serialNumbers) {
		this.serialNumbers = serialNumbers;
	}
	public String getQty() {
		return qty;
	}
	public void setQty(String qty) {
		this.qty = qty;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
}
