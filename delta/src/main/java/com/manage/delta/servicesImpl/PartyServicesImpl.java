package com.manage.delta.servicesImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manage.delta.model.PartyListSO;
import com.manage.delta.model.PartySearchCriteriaSO;
import com.manage.delta.role.PartyRole;
import com.manage.delta.services.PartyServices;

@Service
public class PartyServicesImpl implements PartyServices {
	
	@Autowired
	private PartyRole partyRole;

	@Override
	@Transactional
	public PartyListSO fetchParty(PartySearchCriteriaSO criteriaSO) {
		return partyRole.fetchParty(criteriaSO);
	}

	@Override
	@Transactional
	public PartyListSO saveParty(PartyListSO partyListSO) {
		return partyRole.saveParty(partyListSO);
	}

	@Override
	public List<String> findAllParty() {
		return partyRole.findAllParty();
	}

}
