package com.manage.delta.servicesImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manage.delta.model.ProductListSO;
import com.manage.delta.model.ProductSearchCriteriaSO;
import com.manage.delta.role.ProductRole;
import com.manage.delta.services.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private ProductRole productRole;

	@Override
	@Transactional
	public ProductListSO saveProduct(ProductListSO productListSO) {
		return productRole.saveProduct(productListSO);
	}

	@Override
	@Transactional
	public ProductListSO fetchProducts(ProductSearchCriteriaSO criteriaSO) {
		return productRole.fetchProducts(criteriaSO);
	}

	@Override
	public List<String> findAllProducts() {
		return productRole.findAllProducts();
	}

	@Override
	public List<String> findAllProductsType() {
		return productRole.findAllProductsType();
	}

	@Override
	public List<String> findAllProductsAndType() {
		return productRole.findAllProductsAndType();
	}
}
