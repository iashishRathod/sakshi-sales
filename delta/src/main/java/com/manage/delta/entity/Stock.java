package com.manage.delta.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity
@Table(name = "det_stk")
public class Stock  implements Serializable {

	private static final long serialVersionUID = 7085256721981958603L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.TABLE, generator="stkSeq")
	@TableGenerator(name="stkSeq",table="sys_uuid",pkColumnName = "sequence_name",valueColumnName = "next_val",pkColumnValue="stkSeq")
	@Column(name = "stk_id")
	private Long stockId;
	
	@Column(name = "prd_name")
	private String product;
	
	@Column(name = "ttl_pcs")
	private Integer qty;
	
	@Column(name = "brnd_name")
	private String brandName;
	
	@Column(name = "stk_indate")
	private Date stockInDate;
	
	@OneToMany(cascade = { javax.persistence.CascadeType.ALL }, mappedBy = "stock", fetch = FetchType.EAGER)
	private Set<StockSerialNumber> stockSerialNumberSet;
	
	public Stock() {}
	
	public Long getStockId() {
		return stockId;
	}
	public void setStockId(Long stockId) {
		this.stockId = stockId;
	}
	public Integer getQty() {
		return qty;
	}
	public void setQty(Integer qty) {
		this.qty = qty;
	}

	public Set<StockSerialNumber> getStockSerialNumberSet() {
		return stockSerialNumberSet;
	}

	public void setStockSerialNumberSet(Set<StockSerialNumber> stockSerialNumberSet) {
		this.stockSerialNumberSet = stockSerialNumberSet;
	}

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public Date getStockInDate() {
		return stockInDate;
	}

	public void setStockInDate(Date stockInDate) {
		this.stockInDate = stockInDate;
	}
}
