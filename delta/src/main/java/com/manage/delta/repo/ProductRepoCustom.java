package com.manage.delta.repo;

import java.util.List;

import com.manage.delta.model.ProductSO;
import com.manage.delta.model.ProductSearchCriteriaSO;

public interface ProductRepoCustom {
	
	List<ProductSO> fetchProducts(ProductSearchCriteriaSO criteriaSO);

}
