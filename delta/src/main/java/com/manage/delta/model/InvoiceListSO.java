package com.manage.delta.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class InvoiceListSO extends PaginationData implements Serializable{

	private static final long serialVersionUID = -6380903037210399811L;
	
	private String invoiceDate;
	private String partyName;
	private List<InvoiceSO> invoiceSOList;
	
	
	public String getInvoiceDate() {
		return invoiceDate;
	}
	public void setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
	}
	public String getPartyName() {
		return partyName;
	}
	public void setPartyName(String partyName) {
		this.partyName = partyName;
	}
	public List<InvoiceSO> getInvoiceSOList() {
		if(null == invoiceSOList) invoiceSOList = new ArrayList<>();
		return invoiceSOList;
	}
	public void setInvoiceSOList(List<InvoiceSO> invoiceSOList) {
		this.invoiceSOList = invoiceSOList;
	}
}
