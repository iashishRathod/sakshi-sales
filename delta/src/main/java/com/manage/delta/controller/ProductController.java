package com.manage.delta.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.manage.delta.delegate.ProductDelegate;
import com.manage.delta.model.ProductListSO;
import com.manage.delta.model.ProductSearchCriteriaSO;

@Controller
public class ProductController {
	
	@Autowired
	private ProductDelegate productDelegate;
	
	@GetMapping("/product")
	public String viewHomePage(Model model) {
		model.addAttribute("nameList", productDelegate.findAllProducts());
		model.addAttribute("typeList", productDelegate.findAllProductsType());
		return "product";
	}
	
	@PostMapping(value= "/product/saveProduct")
	public @ResponseBody ProductListSO saveProduct(@RequestBody ProductListSO productListSO){
		return productDelegate.saveProduct(productListSO);
	}
	
	@PostMapping(value= "/product/fetchProducts")
	public @ResponseBody ProductListSO fetchProducts(@RequestBody ProductSearchCriteriaSO productSearchCriteriaSO){
		return productDelegate.fetchProducts(productSearchCriteriaSO);
	}
}
