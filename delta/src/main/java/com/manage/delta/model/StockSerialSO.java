package com.manage.delta.model;

import java.io.Serializable;
import java.util.Date;

public class StockSerialSO extends BaseRequestSO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Long stockSerialId;
	private String serialNumber;
	private String inStock;
	private Date allocationDate;
	private String remarks;
	
	public StockSerialSO() {}
	
	public Long getStockSerialId() {
		return stockSerialId;
	}
	public void setStockSerialId(Long stockSerialId) {
		this.stockSerialId = stockSerialId;
	}
	public String getSerialNumber() {
		return serialNumber;
	}
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}
	public String getInStock() {
		return inStock;
	}
	public void setInStock(String inStock) {
		this.inStock = inStock;
	}
	public Date getAllocationDate() {
		return allocationDate;
	}
	public void setAllocationDate(Date allocationDate) {
		this.allocationDate = allocationDate;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public StockSerialSO(Long stockSerialId, String serialNumber, String inStock, Date allocationDate) {
		super();
		this.stockSerialId = stockSerialId;
		this.serialNumber = serialNumber;
		this.inStock = inStock;
		this.allocationDate = allocationDate;
	}
}
