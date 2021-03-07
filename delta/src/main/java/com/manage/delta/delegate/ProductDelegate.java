package com.manage.delta.delegate;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.manage.delta.model.ProductListSO;
import com.manage.delta.model.ProductSearchCriteriaSO;
import com.manage.delta.services.ProductService;

@Component
public class ProductDelegate {

	@Autowired
	private ProductService productService;

	public ProductListSO saveProduct(ProductListSO productListSO) {
		return productService.saveProduct(productListSO);
	}

	public ProductListSO fetchProducts(ProductSearchCriteriaSO productSearchCriteriaSO) {
		return productService.fetchProducts(productSearchCriteriaSO);
	}

	public List<String> findAllProducts() {
		return productService.findAllProducts();
	}
	
	public List<String> findAllProductsType() {
		return productService.findAllProductsType();
	}

	public List<String> findAllProductsAndType() {
		return productService.findAllProductsAndType();
	}
}
