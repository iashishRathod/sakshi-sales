package com.manage.delta.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity
@Table(name = "det_node")
public class JobNode  implements Serializable{
	
	private static final long serialVersionUID = 3331460696905019599L;

	@Id
	@GeneratedValue(strategy=GenerationType.TABLE, generator="nodeSeq")
	@TableGenerator(name="nodeSeq",table="sys_uuid",pkColumnName = "sequence_name",valueColumnName = "next_val",pkColumnValue="nodeSeq")
	@Column(name = "node_id")
	private Long nodeId;
	
	@Column(name = "node_name")
	private String name;
	
	@Column(name = "node_nxt")
	private Integer nextValue;
	
	public JobNode() {}

	public Long getNodeId() {
		return nodeId;
	}

	public void setNodeId(Long nodeId) {
		this.nodeId = nodeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getNextValue() {
		return nextValue;
	}

	public void setNextValue(Integer nextValue) {
		this.nextValue = nextValue;
	}

	public JobNode(Long nodeId, String name, Integer nextValue) {
		super();
		this.nodeId = nodeId;
		this.name = name;
		this.nextValue = nextValue;
	}
}
