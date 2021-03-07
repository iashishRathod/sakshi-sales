package com.manage.delta.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class StockListSO extends PaginationData implements Serializable{
	
	private static final long serialVersionUID = -3157918616687676837L;
	
	private List<StockSO> stockSOList;

	public List<StockSO> getStockSOList() {
		if(null == stockSOList) stockSOList = new ArrayList<>();
		return stockSOList;
	}

	public void setStockSOList(List<StockSO> stockSOList) {
		this.stockSOList = stockSOList;
	}
}
