package com.manage.delta.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.manage.delta.entity.JobNode;

public interface JobNodeRepo extends JpaRepository<JobNode, Long> {

	JobNode findByName(String jobName);

}
