package com.manage.delta.services;

import java.util.List;

import com.manage.delta.model.ProductListSO;
import com.manage.delta.model.ProductSearchCriteriaSO;

public interface ProductService {
	
	public ProductListSO saveProduct(ProductListSO productListSO);
	
	public ProductListSO fetchProducts(ProductSearchCriteriaSO criteriaSO);

	public List<String> findAllProducts();
	
	public List<String> findAllProductsType();

	public List<String> findAllProductsAndType();

}
