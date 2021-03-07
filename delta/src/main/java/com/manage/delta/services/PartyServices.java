package com.manage.delta.services;

import java.util.List;

import com.manage.delta.model.PartyListSO;
import com.manage.delta.model.PartySearchCriteriaSO;

public interface PartyServices {

	PartyListSO fetchParty(PartySearchCriteriaSO criteriaSO);

	PartyListSO saveParty(PartyListSO partyListSO);

	List<String> findAllParty();

}
