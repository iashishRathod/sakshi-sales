package com.manage.delta.model;

public class ProductSO extends BaseRequestSO {
	 
	private static final long serialVersionUID = 7514503012572220009L;
	
	private Long productId;
	private String name;
	private String type;
	
	public ProductSO() {}
	
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	public ProductSO(Long productId, String name, String type) {
		super();
		this.productId = productId;
		this.name = name;
		this.type = type;
	}

	@Override
	public String toString() {
		return "ProductSO [productId=" + productId + ", name=" + name + ", type=" + type + "]";
	}
}
