package com.manage.delta.roleImpl;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.manage.delta.common.CrudIndicator;
import com.manage.delta.common.DateUtil;
import com.manage.delta.entity.JobNode;
import com.manage.delta.entity.Stock;
import com.manage.delta.entity.StockSerialNumber;
import com.manage.delta.model.InvoiceListSO;
import com.manage.delta.model.InvoiceSO;
import com.manage.delta.model.StockListSO;
import com.manage.delta.model.StockSO;
import com.manage.delta.model.StockSerachSO;
import com.manage.delta.model.StockSerialSO;
import com.manage.delta.model.UpdateSerialSO;
import com.manage.delta.repo.JobNodeRepo;
import com.manage.delta.repo.StockRepo;
import com.manage.delta.repo.StockSerialRepo;
import com.manage.delta.role.StockRole;

@Component
public class StockRoleImpl implements StockRole {

	@Autowired
	private StockSerialRepo stockSerialRepo;

	@Autowired
	private StockRepo stockRepo;
	
	@Autowired
	private JobNodeRepo jobNodeRepo;

	@Override
	public StockSO getStockDetailsBySerialNumber(String serialNumber) {

		StockSO stockSO = new StockSO();
		
		StockSerialNumber stockSerial = stockSerialRepo.findBySerialNumber(serialNumber);

		if(stockSerial == null) {
			stockSO.getErrorList().add("Serial Number not Exist");
			return stockSO;
		}
		
		if(stockSerial.getAllocationDate() == null) {
			stockSO.getErrorList().add("Serial number not allocated!");
			return stockSO;
		}

		stockSO.setBrandName(stockSerial.getStock().getBrandName());
		stockSO.setProduct(stockSerial.getStock().getProduct());
		stockSO.getStockSerialSO().add(new StockSerialSO(stockSerial.getStockSerialId(), stockSerial.getSerialNumber(), stockSerial.getInStock(), stockSerial.getAllocationDate()));
		stockSO.setValid(checkValidity(stockSerial.getAllocationDate() , stockSO));
		
		if(!stockSO.isValid()) {
			stockSO.getErrorList().add("Product was allocated on " + stockSerial.getAllocationDate() +". Hence warrenty has Expired");
		}

		return stockSO;
	}
	
	@Override
	public StockListSO saveStockDetails(StockListSO stockListSO) {
		
		if(stockListSO == null || CollectionUtils.isEmpty(stockListSO.getStockSOList())) return stockListSO;

		for (StockSO stockSO : stockListSO.getStockSOList()) {

			if(CrudIndicator.DELETE.equals(stockSO.getCurdIndicator())) {

				stockRepo.deleteById(stockSO.getStockId());
			}
			else if(CrudIndicator.NEW.equalsIgnoreCase(stockSO.getCurdIndicator())){

				Stock stock = new Stock();

				BeanUtils.copyProperties(stockSO, stock);
				
				stock.setStockInDate(DateUtil.convertStringToDate(stockSO.getStockInDate()));
				
				stockRepo.save(stock);
				
				buildSerialEntity(stock,stockSO.getBrandName(),0);

			}
			else {
				
				Optional<Stock> stockOptional = stockRepo.findById(stockSO.getStockId());
				
				Stock stock = stockOptional.get();
				
				int qty = stock.getQty() - stockSO.getQty();
				
				BeanUtils.copyProperties(stockSO, stock);
				
				stockRepo.save(stock);
				
				if(qty > 0) {
					buildSerialEntity(stock,stockSO.getBrandName(),0);
				}
				else if(qty < 0){
					
					List<StockSerialNumber> list = stockSerialRepo.findByStockId(stock.getStockId());
					
					qty = Math.abs(qty);
					int count = 0;
					for(StockSerialNumber s : list) {
						if(s.getAllocationDate() == null) {
							stockSerialRepo.deleteById(s.getStockSerialId());
							count++;
						}
						if(count == qty) break;
					}
				}
			}
		}

		return stockListSO;
	
	}
	
	@Override
	public StockListSO fetchStockDetails(StockSerachSO stockSerachSO) {
		
		StockListSO stockListSO = new StockListSO();
		
		if(stockSerachSO == null) return stockListSO;
		
		List<StockSO> list = stockRepo.getStockDetails(stockSerachSO);
		
		for(StockSO stockSO : list) {
			
			Integer qty = stockSO.getQty();
			int count = 0;
			
			List<StockSerialSO> stockSerialSOList = getStockSerialSOList(stockSO.getStockId());
			
			if(CollectionUtils.isEmpty(stockSerialSOList)) continue;
			
			stockSO.setStockSerialSO(stockSerialSOList);
			
			for(StockSerialSO serialSO : stockSO.getStockSerialSO()) {
				
				if(StringUtils.equalsIgnoreCase(serialSO.getInStock(), "N")) {
					count++;
				}
			}
			
			stockSO.setAllocated(count);
			stockSO.setInStock(qty - count);
		}
		
		stockListSO.setStockSOList(list);
		return stockListSO;
	}
	
	
	@Override
	public InvoiceListSO saveInvoicDetails(InvoiceListSO invoiceListSO) {
		
		if(invoiceListSO == null || CollectionUtils.isEmpty(invoiceListSO.getInvoiceSOList())) return invoiceListSO;
		
		Date invoiceDate = DateUtil.convertStringToDate(invoiceListSO.getInvoiceDate());
		String partyName = invoiceListSO.getPartyName();
		
		
		for(InvoiceSO invoiceSO : invoiceListSO.getInvoiceSOList()) {
			
			List<String> serialNumberList = getSerialNumberList(invoiceSO.getSerialNumbers());
			
			for(String serial: serialNumberList) {
				
				StockSerialNumber number = stockSerialRepo.fetchSerialNumber(invoiceSO.getBrandName(),invoiceSO.getProduct(),serial);
				
				number.setRemarks(number.getRemarks() + "," + partyName +"-"+invoiceDate);
				number.setAllocationDate(invoiceDate);
				number.setInStock("N");
				
				stockSerialRepo.save(number);
				
			}
		}
		
		return invoiceListSO;
	}
	
	@Override
	public StockSO updateSerialNumber(UpdateSerialSO serialSO) {
		
		StockSO stockSO = new StockSO();
		
		if(serialSO == null) return stockSO;
		
		StockSerialNumber currSerialNumber = stockSerialRepo.findBySerialNumber(serialSO.getCurrSerialNumber());
		Date date = new Date();
		currSerialNumber.setRemarks(currSerialNumber.getRemarks() + "," + "has returned  on " + date);
		
		stockSerialRepo.save(currSerialNumber);
		
		StockSerialNumber serialNumber = stockSerialRepo.findBySerialNumber(serialSO.getNewSerialNumber());
		serialNumber.setAllocationDate(currSerialNumber.getAllocationDate());
		serialNumber.setInStock("N");
		currSerialNumber.setRemarks(currSerialNumber.getRemarks() + "," + "has exchanged with  " + serialSO.getCurrSerialNumber() + "on " + date);
		
		return stockSO;
	}
	
	private List<String> getSerialNumberList(String serialNumbers) {
		return Arrays.asList(serialNumbers.split(","));
	}

	private List<StockSerialSO> getStockSerialSOList(Long stockId) {
		
		List<StockSerialNumber> serialNumberList = stockSerialRepo.findByStockId(stockId);
		
		List<StockSerialSO> list = new ArrayList<>();
		
		if(CollectionUtils.isEmpty(serialNumberList)) return list;
		
		for(StockSerialNumber stockSerialNumber : serialNumberList) {
			
			StockSerialSO serialSO = new StockSerialSO();
			
			BeanUtils.copyProperties(stockSerialNumber, serialSO);
			list.add(serialSO);
			
		}
		
		return list;
	}

	private void buildSerialEntity(Stock stock, String brandName, int updateQty) {
		
		String jobName = getJobName(brandName);
		
		JobNode node = jobNodeRepo.findByName(jobName);
		
		int startValue;
		
		if(node == null) {
			startValue = 1;
			node = new JobNode();
		}
		else {
			startValue = node.getNextValue();
		}
		
		int qty = updateQty == 0 ? stock.getQty() : updateQty;
		
		for(int count = 1 ; count <= qty ; count++  ) {

			stockSerialRepo.save(new StockSerialNumber(null, jobName +""+ String.format("%04d", startValue) , "Y","In Stock" +"-" +stock.getStockInDate(),stock));
			startValue++;

		}
		
		node.setName(jobName);
		node.setNextValue(startValue);
		
		jobNodeRepo.save(node);
		
	}

	private String getJobName(String brandName) {

		Calendar cal = Calendar.getInstance();

		String year  = String.valueOf(cal.get(Calendar.YEAR)).substring(2);
		String month = String.format("%02d", cal.get(Calendar.MONTH) + 1);
		String date  = String.format("%02d", cal.get(Calendar.DAY_OF_MONTH));

		return new StringBuilder().append(Character.toUpperCase(brandName.charAt(0))).append(year).append(month).append(date).toString();
	}

	private boolean checkValidity(Date allocationDate, StockSO stockSO) {

		long diff = ChronoUnit.DAYS.between(allocationDate.toInstant(), new Date().toInstant());
		stockSO.setDaysLeft(180 - (int)diff);
		return diff < 180;
	}
}
