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
@Table(name = "det_brnd")
public class Brand implements Serializable{

	private static final long serialVersionUID = 6466319746999401688L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.TABLE, generator="brndSeq")
	@TableGenerator(name="brndSeq",table="sys_uuid",pkColumnName = "sequence_name",valueColumnName = "next_val",pkColumnValue="brndSeq")
	@Column(name = "brnd_id")
	private Long brandId;
	
	@Column(name = "brnd_name")
	private String name;
	
	@Column(name = "brnd_desc")
	private String desc;
	
	@Column(name = "brnd_email")
	private String email;
	
	@Column(name = "brnd_partynames")
	private String partyNames;
	
	@Column(name = "brnd_prdnames")
	private String productNames;
	
	public Long getBrandId() {
		return brandId;
	}

	public void setBrandId(Long brandId) {
		this.brandId = brandId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPartyNames() {
		return partyNames;
	}

	public void setPartyNames(String partyNames) {
		this.partyNames = partyNames;
	}

	public String getProductNames() {
		return productNames;
	}

	public void setProductNames(String productNames) {
		this.productNames = productNames;
	}
}