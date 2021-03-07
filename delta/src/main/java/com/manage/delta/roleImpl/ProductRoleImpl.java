package com.manage.delta.roleImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.manage.delta.common.CrudIndicator;
import com.manage.delta.entity.Product;
import com.manage.delta.model.ProductListSO;
import com.manage.delta.model.ProductSO;
import com.manage.delta.model.ProductSearchCriteriaSO;
import com.manage.delta.repo.ProductRepo;
import com.manage.delta.role.ProductRole;

@Component
public class ProductRoleImpl implements ProductRole {
	
	@Autowired
	private ProductRepo productRepo;

	@Override
	public ProductListSO saveProduct(ProductListSO productListSO) {

		if(productListSO == null || CollectionUtils.isEmpty(productListSO.getProductList())) return productListSO;

		for (ProductSO productSO : productListSO.getProductList()) {

			if(CrudIndicator.DELETE.equals(productSO.getCurdIndicator())) {

				productRepo.deleteById(productSO.getProductId());
			}
			else {

				Product product = new Product();

				BeanUtils.copyProperties(productSO, product);

				productRepo.save(product);

			}
		}

		return productListSO;
	}

	@Override
	public ProductListSO fetchProducts(ProductSearchCriteriaSO criteriaSO) {

		ProductListSO productListSO = new ProductListSO();
		
		if(criteriaSO == null) return productListSO;
		
		List<ProductSO> productSOList = productRepo.fetchProducts(criteriaSO);
		
		productListSO.setProductList(productSOList);
		
		return productListSO;
	}

	@Override
	public List<String> findAllProducts() {
		List<String> list = productRepo.findAllProducts();
		list.add(0, "ALL");
		return list;
	}
	
	@Override
	public List<String> findAllProductsType() {
		List<String> list = productRepo.findAllProductsType();
		list.add(0, "ALL");
		return list;
	}

	@Override
	public List<String> findAllProductsAndType() {
		List<Product> productList = productRepo.findAll();
		
		List<String> list = new ArrayList<>();
		list.add("ALL");
		
		if(!CollectionUtils.isEmpty(productList)) {
			
			for(Product product : productList) {
				list.add(product.getName()+"-"+product.getType());
			}
		}
		
		return list;
	}
}
