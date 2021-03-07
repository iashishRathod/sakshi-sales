package com.manage.delta.repo;

import java.util.List;

import com.manage.delta.model.PartySO;
import com.manage.delta.model.PartySearchCriteriaSO;

public interface PartyRepoCustom {
	
	List<PartySO> fetchParty(PartySearchCriteriaSO criteriaSO);

}
