package com.nbb.models;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the lut_role database table.
 * 
 */
@Entity
@Table(name="lut_role")
@NamedQuery(name="LutRole.findAll", query="SELECT l FROM LutRole l")
public class LutRole implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	private int accessid;

	private byte isstate;

	private String roleauth;

	private String rolename;

	//bi-directional many-to-one association to LnkMenurole
	@OneToMany(mappedBy="lutRole")
	@OrderBy("orderid")
	private List<LnkMenurole> lnkMenuroles;

	//bi-directional many-to-one association to LnkUserrole
	@OneToMany(mappedBy="lutRole")
	private List<LnkUserrole> lnkUserroles;

	public LutRole() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getAccessid() {
		return this.accessid;
	}

	public void setAccessid(int accessid) {
		this.accessid = accessid;
	}

	public byte getIsstate() {
		return this.isstate;
	}

	public void setIsstate(byte isstate) {
		this.isstate = isstate;
	}

	public String getRoleauth() {
		return this.roleauth;
	}

	public void setRoleauth(String roleauth) {
		this.roleauth = roleauth;
	}

	public String getRolename() {
		return this.rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	public List<LnkMenurole> getLnkMenuroles() {
		return this.lnkMenuroles;
	}

	public void setLnkMenuroles(List<LnkMenurole> lnkMenuroles) {
		this.lnkMenuroles = lnkMenuroles;
	}

	public LnkMenurole addLnkMenurole(LnkMenurole lnkMenurole) {
		getLnkMenuroles().add(lnkMenurole);
		lnkMenurole.setLutRole(this);

		return lnkMenurole;
	}

	public LnkMenurole removeLnkMenurole(LnkMenurole lnkMenurole) {
		getLnkMenuroles().remove(lnkMenurole);
		lnkMenurole.setLutRole(null);

		return lnkMenurole;
	}

	public List<LnkUserrole> getLnkUserroles() {
		return this.lnkUserroles;
	}

	public void setLnkUserroles(List<LnkUserrole> lnkUserroles) {
		this.lnkUserroles = lnkUserroles;
	}

	public LnkUserrole addLnkUserrole(LnkUserrole lnkUserrole) {
		getLnkUserroles().add(lnkUserrole);
		lnkUserrole.setLutRole(this);

		return lnkUserrole;
	}

	public LnkUserrole removeLnkUserrole(LnkUserrole lnkUserrole) {
		getLnkUserroles().remove(lnkUserrole);
		lnkUserrole.setLutRole(null);

		return lnkUserrole;
	}

}