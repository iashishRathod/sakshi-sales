package com.manage.delta.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.manage.delta.entity.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> , ProductRepoCustom{

	@Query(" select DISTINCT(name) from Product")
	List<String> findAllProducts();

	@Query(" select DISTINCT(type) from Product")
	List<String> findAllProductsType();

}
