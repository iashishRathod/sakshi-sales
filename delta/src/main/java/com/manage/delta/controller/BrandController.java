package com.manage.delta.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.manage.delta.delegate.BrandDelegate;
import com.manage.delta.delegate.PartyDelegate;
import com.manage.delta.delegate.ProductDelegate;
import com.manage.delta.model.BrandListSO;
import com.manage.delta.model.BrandSearchSO;

@Controller
public class BrandController {
	
	@Autowired
	private BrandDelegate brandDelegate;
	
	@Autowired
	private PartyDelegate partyDelegate;
	
	@Autowired
	private ProductDelegate productDelegate;
	
	@GetMapping("/brand")
	public String viewHomePage(Model model) {
		model.addAttribute("partyNameList", partyDelegate.findAllParty());
		model.addAttribute("productNameList", productDelegate.findAllProductsAndType());
		model.addAttribute("nameList", brandDelegate.findAllBrand());
		return "brand";
	}
	
	@PostMapping(value= "/brand/saveBrand")
	public @ResponseBody BrandListSO saveBrand(@RequestBody BrandListSO brandListSO){
		return brandDelegate.saveBrand(brandListSO);
	}
	
	@PostMapping(value= "/brand/fetchBrand")
	public @ResponseBody BrandListSO fetchBrand(@RequestBody BrandSearchSO criteriaSO){
		return brandDelegate.fetchBrand(criteriaSO);
	}
	
	@GetMapping(value="/brand/getProductNameAndType")
	public @ResponseBody List<String> getProductNameAndType(){
		return productDelegate.findAllProductsAndType();
	}
	
	@GetMapping(value="/brand/getParty")
	public @ResponseBody List<String> getParty(){
		return partyDelegate.findAllParty();
	}

}
