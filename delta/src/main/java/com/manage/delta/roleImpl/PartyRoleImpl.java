package com.manage.delta.roleImpl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.manage.delta.common.CrudIndicator;
import com.manage.delta.common.DateUtil;
import com.manage.delta.entity.Party;
import com.manage.delta.model.PartyListSO;
import com.manage.delta.model.PartySO;
import com.manage.delta.model.PartySearchCriteriaSO;
import com.manage.delta.repo.PartyRepo;
import com.manage.delta.role.PartyRole;

@Component
public class PartyRoleImpl implements PartyRole {
	
	@Autowired
	private PartyRepo partyRepo;

	@Override
	public PartyListSO fetchParty(PartySearchCriteriaSO criteriaSO) {
		
		PartyListSO partyListSO = new PartyListSO();
		
		if(null == criteriaSO) {
			return partyListSO;
		}
		
		partyListSO.setPartySOList(partyRepo.fetchParty(criteriaSO));
		
		return partyListSO;
	}

	@Override
	public PartyListSO saveParty(PartyListSO partyListSO) {

		if(partyListSO == null || CollectionUtils.isEmpty(partyListSO.getPartySOList())) return partyListSO;

		for (PartySO partySO : partyListSO.getPartySOList()) {

			if(CrudIndicator.DELETE.equals(partySO.getCurdIndicator())) {

				partyRepo.deleteById(partySO.getPartyId());
			}
			else {

				Party party = new Party();

				BeanUtils.copyProperties(partySO, party);
				
				party.setStartDate(DateUtil.convertStringToDate(partySO.getStartDate()));

				partyRepo.save(party);

			}
		}

		return partyListSO;
	}

	@Override
	public List<String> findAllParty() {
		List<String> list = partyRepo.findAllParty();
		list.add(0, "ALL");
		return list;
	}
}
