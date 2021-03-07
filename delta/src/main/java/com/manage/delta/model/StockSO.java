package com.manage.delta.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.manage.delta.common.DateUtil;

public class StockSO extends BaseRequestSO {

	private static final long serialVersionUID = 3173166751528495728L;
	
	private Long stockId;
	private Integer qty;
	private Integer allocated;
	private Integer inStock;
	private String brandName;
	private String product;
	private String stockInDate;
	private boolean isValid;
	private int daysLeft;
	private List<String> errorList;
	
	private List<StockSerialSO> stockSerialSO;
	
	public StockSO() {}
	
	public Long getStockId() {
		return stockId;
	}
	public void setStockId(Long stockId) {
		this.stockId = stockId;
	}
	public Integer getQty() {
		return qty;
	}
	public void setQty(Integer qty) {
		this.qty = qty;
	}
	
	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public List<StockSerialSO> getStockSerialSO() {
		if(null == stockSerialSO ) stockSerialSO = new ArrayList<>();
		return stockSerialSO;
	}

	public void setStockSerialSO(List<StockSerialSO> stockSerialSO) {
		this.stockSerialSO = stockSerialSO;
	}

	public boolean isValid() {
		return isValid;
	}

	public void setValid(boolean isValid) {
		this.isValid = isValid;
	}

	public int getDaysLeft() {
		return daysLeft;
	}

	public void setDaysLeft(int daysLeft) {
		this.daysLeft = daysLeft;
	}

	public Integer getAllocated() {
		return allocated;
	}

	public void setAllocated(Integer allocated) {
		this.allocated = allocated;
	}

	public Integer getInStock() {
		return inStock;
	}

	public void setInStock(Integer inStock) {
		this.inStock = inStock;
	}

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public String getStockInDate() {
		return stockInDate;
	}

	public void setStockInDate(String stockInDate) {
		this.stockInDate = stockInDate;
	}

	public StockSO(Long stockId, String brandName, String product ,
			Date stockInDate, Integer qty ) {
		super();
		this.stockId = stockId;
		this.qty = qty;
		this.brandName = brandName;
		this.product = product;
		this.stockInDate = DateUtil.convertDateToString(stockInDate);
	}

	public List<String> getErrorList() {
		if(null == errorList) errorList = new ArrayList<>();
		return errorList;
	}

	public void setErrorList(List<String> errorList) {
		this.errorList = errorList;
	}
}