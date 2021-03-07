package com.manage.delta.repo;

import java.util.List;

import com.manage.delta.model.BrandSO;
import com.manage.delta.model.BrandSearchSO;

public interface BrandRepoCustom {
	
	List<BrandSO> fetchBrand(BrandSearchSO criteriaSO);

}
