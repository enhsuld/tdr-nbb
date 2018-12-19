package com.nbb.models;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the lnk_menurole database table.
 * 
 */
@Entity
@Table(name="lnk_menurole")
@NamedQuery(name="LnkMenurole.findAll", query="SELECT l FROM LnkMenurole l")
public class LnkMenurole implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	private int orderid;

	private int rcreate;

	private int rdelete;

	private int rexport;

	private int rread;

	private int rupdate;
	
	private long roleid;
	
	private long menuid;


	//bi-directional many-to-one association to LutMenu
	@ManyToOne
	@JoinColumn(name="menuid", nullable=false, insertable=false,updatable=false)
	private LutMenu lutMenu;

	//bi-directional many-to-one association to LutRole
	@ManyToOne
	@JoinColumn(name="roleid", nullable=false, insertable=false,updatable=false)
	private LutRole lutRole;

	public LnkMenurole() {
	}

	public long getId() {
		return this.id;
	}

	public long getRoleid() {
		return roleid;
	}

	public void setRoleid(long roleid) {
		this.roleid = roleid;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getOrderid() {
		return this.orderid;
	}

	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}

	public int getRcreate() {
		return this.rcreate;
	}

	public void setRcreate(int rcreate) {
		this.rcreate = rcreate;
	}

	public int getRdelete() {
		return this.rdelete;
	}

	public void setRdelete(int rdelete) {
		this.rdelete = rdelete;
	}

	public int getRexport() {
		return this.rexport;
	}

	public void setRexport(int rexport) {
		this.rexport = rexport;
	}

	public int getRread() {
		return this.rread;
	}

	public void setRread(int rread) {
		this.rread = rread;
	}

	public int getRupdate() {
		return this.rupdate;
	}

	public void setRupdate(int rupdate) {
		this.rupdate = rupdate;
	}
	
	public long getMenuid() {
		return menuid;
	}

	public void setMenuid(long menuid) {
		this.menuid = menuid;
	}

	public LutMenu getLutMenu() {
		return this.lutMenu;
	}

	public void setLutMenu(LutMenu lutMenu) {
		this.lutMenu = lutMenu;
	}

	public LutRole getLutRole() {
		return this.lutRole;
	}

	public void setLutRole(LutRole lutRole) {
		this.lutRole = lutRole;
	}

}