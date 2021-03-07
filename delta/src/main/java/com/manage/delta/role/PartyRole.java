package com.manage.delta.role;

import java.util.List;

import com.manage.delta.model.PartyListSO;
import com.manage.delta.model.PartySearchCriteriaSO;

public interface PartyRole {

	PartyListSO fetchParty(PartySearchCriteriaSO criteriaSO);

	PartyListSO saveParty(PartyListSO partyListSO);

	List<String> findAllParty();


}
