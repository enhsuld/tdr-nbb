package com.nbb.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;


/**
 * The persistent class for the lut_users database table.
 * 
 */
@Entity
@Table(name="lut_users")
@NamedQuery(name="LutUser.findAll", query="SELECT l FROM LutUser l")
public class LutUser implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private long planid;	
	private long balance;
	private String email;
	
	@Transient
	private String roleid;

	private boolean isactive;
	private String mobile;
	
	@Column(name="org_name")
	private String orgName;
	
	@Column(name="org_code")
	private String orgCode;
	
	private String password;
	private String username;	
	private String flname;
	private String flurl;		
	private long autype;
			
	//bi-directional many-to-one association to LnkUserrole
	@OneToMany(mappedBy="lutUser")
	@JsonManagedReference
	private List<LnkUserrole> lnkUserroles;
	

	public LutUser() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getAutype() {
		return autype;
	}

	public void setAutype(long autype) {
		this.autype = autype;
	}

	public String getRoleid() {
		return roleid;
	}

	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean getIsactive() {
		return this.isactive;
	}

	public void setIsactive(boolean isactive) {
		this.isactive = isactive;
	}
	
	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public long getPlanid() {
		return planid;
	}

	public void setPlanid(long planid) {
		this.planid = planid;
	}

	public long getBalance() {
		return balance;
	}

	public void setBalance(long balance) {
		this.balance = balance;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFlname() {
		return flname;
	}

	public void setFlname(String flname) {
		this.flname = flname;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}

	public String getFlurl() {
		return flurl;
	}

	public void setFlurl(String flurl) {
		this.flurl = flurl;
	}

	public List<LnkUserrole> getLnkUserroles() {
		return this.lnkUserroles;
	}

	public void setLnkUserroles(List<LnkUserrole> lnkUserroles) {
		this.lnkUserroles = lnkUserroles;
	}

	public LnkUserrole addLnkUserrole(LnkUserrole lnkUserrole) {
		getLnkUserroles().add(lnkUserrole);
		lnkUserrole.setLutUser(this);

		return lnkUserrole;
	}

	public LnkUserrole removeLnkUserrole(LnkUserrole lnkUserrole) {
		getLnkUserroles().remove(lnkUserrole);
		lnkUserrole.setLutUser(null);

		return lnkUserrole;
	}
	
}