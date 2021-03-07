package com.manage.delta.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.manage.delta.entity.Brand;

@Repository
public interface BrandRepo extends JpaRepository<Brand, Long> ,BrandRepoCustom{

	@Query(" select DISTINCT(name) from Brand")
	List<String> findAllBrand();

	@Query(" select productNames from Brand where name =:name ")
	String findByBrandName(@Param("name")String brandName);

}
