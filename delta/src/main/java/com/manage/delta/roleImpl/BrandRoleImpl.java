package com.manage.delta.roleImpl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.manage.delta.common.CrudIndicator;
import com.manage.delta.entity.Brand;
import com.manage.delta.entity.Stock;
import com.manage.delta.entity.StockSerialNumber;
import com.manage.delta.model.BrandListSO;
import com.manage.delta.model.BrandSO;
import com.manage.delta.model.BrandSearchSO;
import com.manage.delta.repo.BrandRepo;
import com.manage.delta.repo.StockRepo;
import com.manage.delta.role.BrandRole;

@Component
public class BrandRoleImpl implements BrandRole{

	@Autowired
	private BrandRepo brandRepo;
	
	@Autowired
	private StockRepo stockRepo;

	@Override
	public BrandListSO saveBrand(BrandListSO brandListSO) {

		if(brandListSO == null || CollectionUtils.isEmpty(brandListSO.getBrandSOList())) return brandListSO;

		for (BrandSO brandSO : brandListSO.getBrandSOList()) {

			if(CrudIndicator.DELETE.equals(brandSO.getCurdIndicator())) {

				brandRepo.deleteById(brandSO.getBrandId());
			}
			else {

				Brand brand = new Brand();

				BeanUtils.copyProperties(brandSO, brand);

				brandRepo.save(brand);

			}
		}

		return brandListSO;
	}

	@Override
	public BrandListSO fetchBrand(BrandSearchSO criteriaSO) {

		BrandListSO brandListSO = new BrandListSO();

		if(null == criteriaSO) {
			return brandListSO;
		}

		List<BrandSO> list = brandRepo.fetchBrand(criteriaSO);

		if(!StringUtils.equalsAnyIgnoreCase(criteriaSO.getProductName(), "ALL") ||!StringUtils.equalsAnyIgnoreCase(criteriaSO.getPartyName(), "ALL")) {

			if(!CollectionUtils.isEmpty(list)) {

				ListIterator<BrandSO> listItreator = list.listIterator();

				while(listItreator.hasNext()) {

					BrandSO brand = listItreator.next();

					if(!StringUtils.equalsAnyIgnoreCase(criteriaSO.getProductName(), "ALL") ) {

						if(StringUtils.isEmpty(brand.getProductNames()) || !brand.getProductNames().contains(criteriaSO.getProductName())) {
							listItreator.remove();
							continue;
						}
					}

					if(!StringUtils.equalsAnyIgnoreCase(criteriaSO.getPartyName(), "ALL")) {
						if(StringUtils.isEmpty(brand.getPartyNames())  || !brand.getPartyNames().contains(criteriaSO.getPartyName())) {
							listItreator.remove();
						}
					}
				}
			}
		}

		brandListSO.setBrandSOList(list);

		return brandListSO;

	}

	@Override
	public List<String> findAllBrand() {
		List<String> list = brandRepo.findAllBrand();
		list.add(0, "ALL");
		return list;
	}

	@Override
	public BrandListSO getBrandSpecificDetails() {
		
		BrandListSO brandListSO = new BrandListSO();
		
		List<Brand> brandList = brandRepo.findAll();

		for(Brand brand : brandList) {
			
			brandListSO.getBrandNameList().add(brand.getName());
			
			if(!StringUtils.isEmpty(brand.getPartyNames())) {
				brandListSO.getBrandPartyList().add(Arrays.asList(brand.getPartyNames().split(",")));
			}
			else {
				brandListSO.getBrandPartyList().add(new ArrayList<>());
			}
			
			if(!StringUtils.isEmpty(brand.getProductNames())) {
				brandListSO.getBrandProductList().add(Arrays.asList(brand.getProductNames().split(",")));
			}
			else {
				brandListSO.getBrandProductList().add(new ArrayList<>());
			}
		}
		
		List<Stock> stockList = stockRepo.findAll();
		
		if(!CollectionUtils.isEmpty(stockList)) {
			
			Map<String,List<String>> map = new HashMap<>();
			
			for(Stock stock : stockList) {
				map.putIfAbsent(stock.getBrandName() +"_" + stock.getProduct(), new ArrayList<>());
				
				if(!CollectionUtils.isEmpty(stock.getStockSerialNumberSet())) {
					for(StockSerialNumber serial : stock.getStockSerialNumberSet()) {
						map.get(stock.getBrandName() +"_" + stock.getProduct()).add(serial.getSerialNumber());
					}
				}
			}
			
			for(String key : map.keySet()) {
				brandListSO.getBrandProuducts().add(key);
				brandListSO.getSerialNumberList().add(map.get(key));
			}
		}

		return brandListSO;
	}
}
