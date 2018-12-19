package com.nbb.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;


/**
 * The persistent class for the lnk_userrole database table.
 * 
 */
@Entity
@Table(name="lnk_userrole")
@NamedQuery(name="LnkUserrole.findAll", query="SELECT l FROM LnkUserrole l")
public class LnkUserrole implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private long roleid;
	
	private long userid;

	//bi-directional many-to-one association to LutRole
	@ManyToOne
	@JoinColumn(name="roleid",insertable=false,updatable=false)
	@JsonBackReference
	private LutRole lutRole;

	//bi-directional many-to-one association to LutUser
	@ManyToOne
	@JoinColumn(name="userid",insertable=false,updatable=false)
	@JsonBackReference
	private LutUser lutUser;

	public LnkUserrole() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public LutRole getLutRole() {
		return this.lutRole;
	}

	public void setLutRole(LutRole lutRole) {
		this.lutRole = lutRole;
	}

	public LutUser getLutUser() {
		return this.lutUser;
	}

	public void setLutUser(LutUser lutUser) {
		this.lutUser = lutUser;
	}

	public long getRoleid() {
		return roleid;
	}

	public void setRoleid(long roleid) {
		this.roleid = roleid;
	}

	public long getUserid() {
		return userid;
	}

	public void setUserid(long userid) {
		this.userid = userid;
	}
	
}