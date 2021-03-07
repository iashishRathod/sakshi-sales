package com.manage.delta.role;

import java.util.List;

import com.manage.delta.model.BrandListSO;
import com.manage.delta.model.BrandSearchSO;

public interface BrandRole {
	
	BrandListSO saveBrand(BrandListSO brandListSO);

	List<String> findAllBrand();

	BrandListSO fetchBrand(BrandSearchSO criteriaSO);
	
	BrandListSO getBrandSpecificDetails();
	
}
