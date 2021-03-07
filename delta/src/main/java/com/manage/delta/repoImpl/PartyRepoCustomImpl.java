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

import com.manage.delta.common.DateUtil;
import com.manage.delta.entity.Party;
import com.manage.delta.model.PartySO;
import com.manage.delta.model.PartySearchCriteriaSO;
import com.manage.delta.repo.PartyRepoCustom;

@Component
public class PartyRepoCustomImpl implements PartyRepoCustom {
	
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<PartySO> fetchParty(PartySearchCriteriaSO criteriaSO) {
		
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<PartySO> criteriaQuery = criteriaBuilder.createQuery(PartySO.class);
		Root<Party> fromParty = criteriaQuery.from(Party.class);
		
		criteriaQuery.select(criteriaBuilder.construct(PartySO.class, fromParty.get("partyId"),fromParty.get("name"),
				fromParty.get("email"),fromParty.get("contactNumber"),fromParty.get("startDate")));
		
		List<Predicate> predicates = new ArrayList<>();

		if(!StringUtils.equalsIgnoreCase(criteriaSO.getName(), "ALL")) {
			predicates.add(criteriaBuilder.equal(fromParty.get("name") , criteriaSO.getName()));
		}
		
		if(!StringUtils.isEmpty(criteriaSO.getEmail())) {
			predicates.add(criteriaBuilder.equal(fromParty.get("email") , criteriaSO.getEmail()));
		}
		
		if(!StringUtils.isEmpty(criteriaSO.getStartDate())) {
			predicates.add(criteriaBuilder.greaterThanOrEqualTo(fromParty.get("startDate") , DateUtil.convertStringToDate(criteriaSO.getStartDate())));
		}
		
		criteriaQuery.where(criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()])));
		
		return entityManager.createQuery(criteriaQuery).getResultList();
	}

}
