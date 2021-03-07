package com.manage.delta.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.manage.delta.delegate.StockDelegate;
import com.manage.delta.model.StockSO;
import com.manage.delta.model.StockSerialSO;
import com.manage.delta.model.UpdateSerialSO;

@Controller
public class HomeController {
	
	@Autowired
	private StockDelegate stockDelegate;
	
	@GetMapping("/home")
	public String viewHomePage() {
		return "home";
	}
	
	@PostMapping("/home/getStockDetailsBySerialNumber")
	public @ResponseBody StockSO getStockDetailsBySerialNumber(@RequestBody StockSerialSO serialSO) {
		return stockDelegate.getStockDetailsBySerialNumber(serialSO.getSerialNumber());
	}
	
	@PostMapping("/home/updateSerialNumber")
	public @ResponseBody StockSO updateSerialNumber(@RequestBody UpdateSerialSO serialSO) {
		return stockDelegate.updateSerialNumber(serialSO);
	}

}
