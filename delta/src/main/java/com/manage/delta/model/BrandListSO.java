package com.manage.delta.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class BrandListSO extends PaginationData implements Serializable{

	private static final long serialVersionUID = -1711428989155261062L;
	
	private List<BrandSO> brandSOList;
	private List<String> brandNameList;
	private List<List<String>> brandProductList;
	private List<List<String>> brandPartyList;
	private List<String> brandProuducts;
	private List<List<String>> serialNumberList;
	
	public List<BrandSO> getBrandSOList() {
		if(null == brandSOList) brandSOList = new ArrayList<>();
		return brandSOList;
	}

	public void setBrandSOList(List<BrandSO> brandSOList) {
		this.brandSOList = brandSOList;
	}

	public List<String> getBrandNameList() {
		if(null == brandNameList) brandNameList = new ArrayList<>();
		return brandNameList;
	}

	public void setBrandNameList(List<String> brandNameList) {
		this.brandNameList = brandNameList;
	}

	public List<List<String>> getBrandProductList() {
		if(null == brandProductList) brandProductList = new ArrayList<>();
		return brandProductList;
	}

	public void setBrandProductList(List<List<String>> brandProductList) {
		this.brandProductList = brandProductList;
	}

	public List<List<String>> getBrandPartyList() {
		if(null == brandPartyList) brandPartyList = new ArrayList<>();
		return brandPartyList;
	}

	public void setBrandPartyList(List<List<String>> brandPartyList) {
		this.brandPartyList = brandPartyList;
	}

	public List<String> getBrandProuducts() {
		if(null == brandProuducts) brandProuducts = new ArrayList<>();
		return brandProuducts;
	}

	public void setBrandProuducts(List<String> brandProuducts) {
		this.brandProuducts = brandProuducts;
	}

	public List<List<String>> getSerialNumberList() {
		if(null == serialNumberList) serialNumberList = new ArrayList<>();
		return serialNumberList;
	}

	public void setSerialNumberList(List<List<String>> serialNumberList) {
		this.serialNumberList = serialNumberList;
	}
}
