package com.manage.delta.servicesImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manage.delta.model.BrandListSO;
import com.manage.delta.model.BrandSearchSO;
import com.manage.delta.role.BrandRole;
import com.manage.delta.services.BrandServices;

@Service
public class BrandServicesImpl implements BrandServices {
	
	@Autowired
	private BrandRole brandRole;

	@Override
	public BrandListSO saveBrand(BrandListSO brandListSO) {
		return brandRole.saveBrand(brandListSO);
	}

	@Override
	public List<String> findAllBrand() {
		return brandRole.findAllBrand();
	}

	@Override
	public BrandListSO fetchBrand(BrandSearchSO criteriaSO) {
		return brandRole.fetchBrand(criteriaSO);
	}

	@Override
	public BrandListSO getBrandSpecificDetails() {
		return brandRole.getBrandSpecificDetails();
	}


}
