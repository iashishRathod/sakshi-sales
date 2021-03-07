package com.manage.delta.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.manage.delta.delegate.PartyDelegate;
import com.manage.delta.model.PartyListSO;
import com.manage.delta.model.PartySearchCriteriaSO;

@Controller
public class PartyController {
	
	@Autowired
	private PartyDelegate partyDelegate;
	
	@GetMapping("/party")
	public String viewHomePage(Model model) {
		model.addAttribute("nameList", partyDelegate.findAllParty());
		return "party";
	}
	
	@PostMapping(value= "/party/saveParty")
	public @ResponseBody PartyListSO saveParty(@RequestBody PartyListSO partyListSO){
		return partyDelegate.saveParty(partyListSO);
	}
	
	@PostMapping(value= "/party/fetchParty")
	public @ResponseBody PartyListSO fetchParty(@RequestBody PartySearchCriteriaSO criteriaSO){
		return partyDelegate.fetchParty(criteriaSO);
	}
}
