package com.manage.delta.model;

import java.io.Serializable;

public class PaginationData implements Serializable {
	
	private static final long serialVersionUID = 2203880580630147611L;
	
	private int pageNumber;
	private int pageSize;
	private String sortBy;
	private String orderBy;
	
	public int getPageNumber() {
		return pageNumber;
	}
	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public String getSortBy() {
		return sortBy;
	}
	public void setSortBy(String sortBy) {
		this.sortBy = sortBy;
	}
	public String getOrderBy() {
		return orderBy;
	}
	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}
}
