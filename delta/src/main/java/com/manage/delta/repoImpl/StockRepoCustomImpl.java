package com.manage.delta.repoImpl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.manage.delta.common.DateUtil;
import com.manage.delta.entity.Stock;
import com.manage.delta.entity.StockSerialNumber;
import com.manage.delta.model.StockSO;
import com.manage.delta.model.StockSerachSO;
import com.manage.delta.repo.StockRepoCustom;

@Component
public class StockRepoCustomImpl implements StockRepoCustom {
	
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<StockSO> getStockDetails(StockSerachSO stockSerachSO) {
		
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<StockSO> criteriaQuery = criteriaBuilder.createQuery(StockSO.class);
		Root<Stock> fromStock = criteriaQuery.from(Stock.class);
		
		List<Predicate> predicates = new ArrayList<>();

		if(!StringUtils.equalsIgnoreCase(stockSerachSO.getBrandName(), "ALL")) {
			predicates.add(criteriaBuilder.equal(fromStock.get("brandName") , stockSerachSO.getBrandName()));
		}

		if(!StringUtils.equalsIgnoreCase(stockSerachSO.getProductName(), "ALL")) {
			predicates.add(criteriaBuilder.equal(fromStock.get("product") , stockSerachSO.getProductName()));
		}
		
		if(!StringUtils.isEmpty(stockSerachSO.getStockInDate())) {
			predicates.add(criteriaBuilder.equal(fromStock.get("stockInDate") ,  DateUtil.convertStringToDate(stockSerachSO.getStockInDate())));
		}
		
		if(!StringUtils.equalsIgnoreCase("ALL", stockSerachSO.getInUse())) {
			Join<Stock, StockSerialNumber> joinSerial = fromStock.join("stockSerialNumberSet", JoinType.INNER);
			predicates.add(criteriaBuilder.equal(joinSerial.get("inStock"), stockSerachSO.getInUse()));
		}
	
		criteriaQuery.select(criteriaBuilder.construct(StockSO.class, fromStock.get("stockId"),fromStock.get("brandName"),fromStock.get("product"),
				fromStock.get("stockInDate"),fromStock.get("qty")));
		
		criteriaQuery.where(criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()])));
		
		TypedQuery<StockSO> typedQuery = entityManager.createQuery(criteriaQuery);
		
		return typedQuery.getResultList();
		
	}
}
