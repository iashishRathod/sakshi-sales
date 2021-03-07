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
@Table(name = "det_user")
public class User  implements Serializable {
	
	private static final long serialVersionUID = -7756553909036216693L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.TABLE, generator="userSeq")
	@TableGenerator(name="userSeq",table="sys_uuid",pkColumnName = "sequence_name",valueColumnName = "next_val",pkColumnValue="userSeq")
	@Column(name = "usr_id")
	private Long userId;
	
	@Column(name = "usr_name")
	private String userName;
	
	@Column(name = "fname")
	private String firstName;
	
	@Column(name = "lname")
	private String lastName;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "pass")
	private String password;
	
	public User() {}
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public User(Long userId, String userName, String firstName, String lastName, String email, String password) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}
	
	
}
