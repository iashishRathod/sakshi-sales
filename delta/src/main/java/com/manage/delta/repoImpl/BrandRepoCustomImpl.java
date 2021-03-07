package com.manage.delta.repoImpl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;

import com.manage.delta.entity.Brand;
import com.manage.delta.model.BrandSO;
import com.manage.delta.model.BrandSearchSO;
import com.manage.delta.repo.BrandRepoCustom;

public class BrandRepoCustomImpl implements BrandRepoCustom{
	
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<BrandSO> fetchBrand(BrandSearchSO criteriaSO) {
		
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<BrandSO> criteriaQuery = criteriaBuilder.createQuery(BrandSO.class);
		Root<Brand> fromBrand = criteriaQuery.from(Brand.class);
		
		criteriaQuery.select(criteriaBuilder.construct(BrandSO.class, fromBrand.get("brandId"),fromBrand.get("name"),
				fromBrand.get("desc"),fromBrand.get("email"),fromBrand.get("partyNames") , fromBrand.get("productNames")));
		
		List<Predicate> predicates = new ArrayList<>();

		if(!StringUtils.equalsIgnoreCase(criteriaSO.getBrandName(), "ALL")) {
			predicates.add(criteriaBuilder.equal(fromBrand.get("name") , criteriaSO.getBrandName()));
		}
		
		if(!StringUtils.isEmpty(criteriaSO.getEmail())) {
			predicates.add(criteriaBuilder.equal(fromBrand.get("email") , criteriaSO.getEmail()));
		}
		
		criteriaQuery.where(criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()])));
		
		return entityManager.createQuery(criteriaQuery).getResultList();
	
	}

}
