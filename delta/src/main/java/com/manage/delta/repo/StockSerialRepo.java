package com.manage.delta.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.manage.delta.entity.StockSerialNumber;

@Repository
public interface StockSerialRepo extends JpaRepository<StockSerialNumber, Long> {

	@Query("select serial from StockSerialNumber serial where serial.serialNumber =:serialNumber ")
	StockSerialNumber findBySerialNumber(@Param("serialNumber") String serialNumber);

	@Query("from StockSerialNumber serial where serial.stock.stockId =:stockId ")
	List<StockSerialNumber> findByStockId(@Param("stockId")Long stockId);

	@Query("SELECT s from StockSerialNumber s join s.stock stock where stock.brandName =:brandName and stock.product =:product and s.serialNumber =:serial ")
	StockSerialNumber fetchSerialNumber(@Param("brandName")String brandName, @Param("product")String product,@Param("serial") String serial);

}
