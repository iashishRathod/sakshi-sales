package com.manage.delta.servicesImpl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manage.delta.model.InvoiceListSO;
import com.manage.delta.model.StockListSO;
import com.manage.delta.model.StockSO;
import com.manage.delta.model.StockSerachSO;
import com.manage.delta.model.UpdateSerialSO;
import com.manage.delta.role.StockRole;
import com.manage.delta.services.StockServices;

@Service
public class StockServicesImpl implements StockServices{
	
	@Autowired
	private StockRole stockRole;

	@Override
	@Transactional
	public StockSO getStockDetailsBySerialNumber(String serialNumber) {
		return stockRole.getStockDetailsBySerialNumber(serialNumber);
	}

	@Override
	@Transactional
	public StockListSO saveStockDetails(StockListSO stockListSO) {
		return stockRole.saveStockDetails(stockListSO);
	}

	@Override
	@Transactional
	public StockListSO fetchStockDetails(StockSerachSO stockSerachSO) {
		return stockRole.fetchStockDetails(stockSerachSO);
	}

	@Override
	public InvoiceListSO saveInvoicDetails(InvoiceListSO invoiceListSO) {
		return stockRole.saveInvoicDetails(invoiceListSO);
	}

	@Override
	public StockSO updateSerialNumber(UpdateSerialSO serialSO) {
		return stockRole.updateSerialNumber(serialSO);
	}

}
