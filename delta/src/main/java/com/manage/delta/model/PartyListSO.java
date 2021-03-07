package com.manage.delta.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class PartyListSO extends PaginationData implements Serializable {

	private static final long serialVersionUID = -5940270229180507137L;
	
	private List<PartySO> partySOList;

	public List<PartySO> getPartySOList() {
		if(partySOList == null) partySOList = new ArrayList<>();
		return partySOList;
	}

	public void setPartySOList(List<PartySO> partySOList) {
		this.partySOList = partySOList;
	}

}
