package com.manage.delta.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.manage.delta.delegate.PartyDelegate;
import com.manage.delta.delegate.StockDelegate;
import com.manage.delta.model.InvoiceListSO;

@Controller
public class InvoiceController {
	
	@Autowired
	private PartyDelegate partyDelegate;
	
	@Autowired
	private StockDelegate stockDelegate;
	
	@GetMapping("/invoice")
	public String viewHomePage(Model model) {
		model.addAttribute("partyNameList", partyDelegate.findAllParty());
		return "invoice";
	}
	
	@PostMapping("/invoice/saveInvoice")
	public @ResponseBody InvoiceListSO saveInvoicDetails(@RequestBody InvoiceListSO invoiceListSO) {
		return stockDelegate.saveInvoicDetails(invoiceListSO);
	}

}
