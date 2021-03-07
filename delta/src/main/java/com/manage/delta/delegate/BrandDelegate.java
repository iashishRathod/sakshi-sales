package com.manage.delta.delegate;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.manage.delta.model.BrandListSO;
import com.manage.delta.model.BrandSearchSO;
import com.manage.delta.services.BrandServices;

@Component
public class BrandDelegate {
	
	@Autowired
	private BrandServices brandServices;

	public BrandListSO saveBrand(BrandListSO brandListSO) {
		return brandServices.saveBrand(brandListSO);
	}

	public List<String> findAllBrand() {
		return brandServices.findAllBrand();
	}

	public BrandListSO fetchBrand(BrandSearchSO criteriaSO) {
		return brandServices.fetchBrand(criteriaSO);
	}

	public BrandListSO getBrandSpecificDetails() {
		return brandServices.getBrandSpecificDetails();
	}

}
