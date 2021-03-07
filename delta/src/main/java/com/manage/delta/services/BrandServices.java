package com.manage.delta.services;

import java.util.List;

import com.manage.delta.model.BrandListSO;
import com.manage.delta.model.BrandSearchSO;

public interface BrandServices {

	BrandListSO saveBrand(BrandListSO brandListSO);

	List<String> findAllBrand();

	BrandListSO fetchBrand(BrandSearchSO criteriaSO);

	BrandListSO getBrandSpecificDetails();

}
