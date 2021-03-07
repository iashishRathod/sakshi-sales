package com.manage.delta.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ProductListSO extends PaginationData implements Serializable {
	
	private static final long serialVersionUID = -2500346040803158353L;

	private List<ProductSO> productList;

	public List<ProductSO> getProductList() {
		if(null == productList) productList = new ArrayList<>();
		return productList;
	}

	public void setProductList(List<ProductSO> productList) {
		this.productList = productList;
	}
}
