package com.manage.delta.repo;

import java.util.List;

import com.manage.delta.model.StockSO;
import com.manage.delta.model.StockSerachSO;

public interface StockRepoCustom {
	
	public List<StockSO> getStockDetails(StockSerachSO stockSerachSO);
	
}
