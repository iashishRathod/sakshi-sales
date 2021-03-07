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
@Table(name = "det_prd")
public class Product  implements Serializable {
	
	private static final long serialVersionUID = -5025790442260754939L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.TABLE, generator="prdSeq")
	@TableGenerator(name="prdSeq",table="sys_uuid",pkColumnName = "sequence_name",valueColumnName = "next_val",pkColumnValue="prdSeq")
	@Column(name = "prd_id")
	private Long productId;
	
	@Column(name = "prd_name")
	private String name;
	
	@Column(name = "prd_typ")
	private String type;
	
	public Product() {}
	
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
}
