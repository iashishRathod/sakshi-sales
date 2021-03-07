package com.manage.delta.services;

import com.manage.delta.model.InvoiceListSO;
import com.manage.delta.model.StockListSO;
import com.manage.delta.model.StockSO;
import com.manage.delta.model.StockSerachSO;
import com.manage.delta.model.UpdateSerialSO;

public interface StockServices {
	
	public StockSO getStockDetailsBySerialNumber(String serialNumber);

	public StockListSO saveStockDetails(StockListSO stockListSO);

	public StockListSO fetchStockDetails(StockSerachSO stockSerachSO);

	public InvoiceListSO saveInvoicDetails(InvoiceListSO invoiceListSO);

	public StockSO updateSerialNumber(UpdateSerialSO serialSO);
	

}
