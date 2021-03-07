package com.manage.delta.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

@Entity
@Table(name = "det_party")
public class Party  implements Serializable{
	
	private static final long serialVersionUID = 2943066712064117336L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.TABLE, generator="partySeq")
	@TableGenerator(name="partySeq",table="sys_uuid",pkColumnName = "sequence_name",valueColumnName = "next_val",pkColumnValue="partySeq")
	@Column(name = "prty_id")
	private Long partyId;
	
	@Column(name = "prty_name")
	private String name;
	
	@Column(name = "email")
	private String email;

	@Column(name = "cnt_num")
	private String contactNumber;
	
	@Column(name = "start_date")
	private Date startDate;
	
	public Party() {}
	
	public Long getPartyId() {
		return partyId;
	}
	public void setPartyId(Long partyId) {
		this.partyId = partyId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
}
