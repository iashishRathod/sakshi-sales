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
import org.springframework.stereotype.Component;

import com.manage.delta.entity.Product;
import com.manage.delta.model.ProductSO;
import com.manage.delta.model.ProductSearchCriteriaSO;
import com.manage.delta.repo.ProductRepoCustom;

@Component
public class ProductRepoCustomImpl implements ProductRepoCustom {
	
	@PersistenceContext
	private EntityManager entityManager;
	

	@Override
	public List<ProductSO> fetchProducts(ProductSearchCriteriaSO criteriaSO) {
		
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<ProductSO> criteriaQuery = criteriaBuilder.createQuery(ProductSO.class);
		Root<Product> fromParty = criteriaQuery.from(Product.class);
		
		criteriaQuery.select(criteriaBuilder.construct(ProductSO.class, fromParty.get("productId") , fromParty.get("name"),fromParty.get("type"))).distinct(true);
		
		List<Predicate> predicates = new ArrayList<>();

		if(!StringUtils.equalsIgnoreCase(criteriaSO.getProductName(), "ALL")) {
			predicates.add(criteriaBuilder.equal(fromParty.get("name") , criteriaSO.getProductName()));
		}
		
		if(!StringUtils.equalsIgnoreCase(criteriaSO.getProductType(), "ALL")) {
			predicates.add(criteriaBuilder.equal(fromParty.get("type") , criteriaSO.getProductType()));
		}
		
		criteriaQuery.where(criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()])));
		
		return entityManager.createQuery(criteriaQuery).getResultList();
	
	}

}
