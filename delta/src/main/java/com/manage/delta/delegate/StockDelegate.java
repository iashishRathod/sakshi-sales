package com.manage.delta.delegate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.manage.delta.model.InvoiceListSO;
import com.manage.delta.model.StockListSO;
import com.manage.delta.model.StockSO;
import com.manage.delta.model.StockSerachSO;
import com.manage.delta.model.UpdateSerialSO;
import com.manage.delta.services.StockServices;

@Component
public class StockDelegate {
	
	@Autowired
	private StockServices stockServices;
	
	public StockListSO saveStockDetails(StockListSO stockListSO) {
		return stockServices.saveStockDetails(stockListSO);
	}

	public StockListSO fetchStockDetails(StockSerachSO stockSerachSO) {
		return stockServices.fetchStockDetails(stockSerachSO);
	}

	public StockSO getStockDetailsBySerialNumber(String serialNumber) {
		return stockServices.getStockDetailsBySerialNumber(serialNumber);
	}

	public InvoiceListSO saveInvoicDetails(InvoiceListSO invoiceListSO) {
		return stockServices.saveInvoicDetails(invoiceListSO);
	}

	public StockSO updateSerialNumber(UpdateSerialSO serialSO) {
		return stockServices.updateSerialNumber(serialSO);
	}
}
