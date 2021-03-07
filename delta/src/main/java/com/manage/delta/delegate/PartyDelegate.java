package com.manage.delta.delegate;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.manage.delta.model.PartyListSO;
import com.manage.delta.model.PartySearchCriteriaSO;
import com.manage.delta.services.PartyServices;

@Component
public class PartyDelegate {
	
	@Autowired
	private PartyServices partyService;

	public PartyListSO fetchParty(PartySearchCriteriaSO criteriaSO) {
		return partyService.fetchParty(criteriaSO);
	}

	public PartyListSO saveParty(PartyListSO partyListSO) {
		return partyService.saveParty(partyListSO);
	}

	public List<String> findAllParty() {
		return partyService.findAllParty();
	}
}
