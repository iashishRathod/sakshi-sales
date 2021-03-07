package com.manage.delta.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity
@Table(name = "det_stksrl")
public class StockSerialNumber  implements Serializable{

	private static final long serialVersionUID = 4160191644447545833L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.TABLE, generator="stksrlSeq")
	@TableGenerator(name="stksrlSeq",table="sys_uuid",pkColumnName = "sequence_name",valueColumnName = "next_val",pkColumnValue="stksrlSeq")
	@Column(name = "stksrl_id")
	private Long stockSerialId;
	
	@Column(name = "srl_num")
	private String serialNumber;
	
	@Column(name = "exp_ind")
	private String inStock;
	
	@Column(name = "alloc_date")
	private Date allocationDate;
	
	@Column(name = "rmk")
	private String remarks;
	
	@ManyToOne
	@JoinColumn(name = "stk_id")
	private Stock stock;
	
	public StockSerialNumber() {}

	public Long getStockSerialId() {
		return stockSerialId;
	}

	public void setStockSerialId(Long stockSerialId) {
		this.stockSerialId = stockSerialId;
	}

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	public String getInStock() {
		return inStock;
	}

	public void setInStock(String inStock) {
		this.inStock = inStock;
	}

	public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
	}

	public Date getAllocationDate() {
		return allocationDate;
	}

	public void setAllocationDate(Date allocationDate) {
		this.allocationDate = allocationDate;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public StockSerialNumber(Long stockSerialId, String serialNumber, String inStock,String remarks,Stock stock) {
		super();
		this.stockSerialId = stockSerialId;
		this.serialNumber = serialNumber;
		this.inStock = inStock;
		this.remarks = remarks;
		this.stock = stock;
	}
}
