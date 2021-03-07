package com.manage.delta.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.manage.delta.entity.Party;

@Repository
public interface PartyRepo extends JpaRepository<Party, Long> , PartyRepoCustom {

	@Query(" select DISTINCT(name) from Party")
	List<String> findAllParty();

}
