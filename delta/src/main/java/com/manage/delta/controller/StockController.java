package com.manage.delta.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.manage.delta.delegate.BrandDelegate;
import com.manage.delta.delegate.ProductDelegate;
import com.manage.delta.delegate.StockDelegate;
import com.manage.delta.model.BrandListSO;
import com.manage.delta.model.StockListSO;
import com.manage.delta.model.StockSerachSO;

@Controller
public class StockController {

	@Autowired
	private StockDelegate stockDelegate;

	@Autowired
	private ProductDelegate productDelegate;

	@Autowired
	private BrandDelegate brandDelegate;
	
	@GetMapping("/stock")
	public String viewHomePage(Model model) {
		model.addAttribute("productNameList", productDelegate.findAllProductsAndType());
		model.addAttribute("nameList", brandDelegate.findAllBrand());
		return "stock";
	}

	@PostMapping("/stock/saveStockDetails")
	public @ResponseBody StockListSO saveStockDetails(@RequestBody StockListSO stockListSO){
		return stockDelegate.saveStockDetails(stockListSO);
	}

	@PostMapping("/stock/fetchStockDetails")
	public @ResponseBody StockListSO fetchStockDetails(@RequestBody StockSerachSO stockSerachSO){
		return stockDelegate.fetchStockDetails(stockSerachSO);
	}
	@PostMapping("/stock/getBrandSpecificDetails")
	public @ResponseBody BrandListSO getBrandSpecificDetails(@RequestBody StockSerachSO stockSerachSO) {
		return brandDelegate.getBrandSpecificDetails();
	}
}
