package com.manage.delta.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manage.delta.entity.Stock;

@Repository
public interface StockRepo extends JpaRepository<Stock, Long> , StockRepoCustom{
	

}
