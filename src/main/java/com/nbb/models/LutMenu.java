package com.nbb.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.List;


/**
 * The persistent class for the lut_menu database table.
 * 
 */
@Entity
@Table(name="lut_menu")
@NamedQuery(name="LutMenu.findAll", query="SELECT l FROM LutMenu l")
public class LutMenu implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	private int isactive;

	private String menuname;

	private int orderid;

	private String stateurl;

	private String uicon; 
	
	private Long parentid;
	
	//bi-directional many-to-one association to LnkMenurole
	@OneToMany(mappedBy="lutMenu")
	@OrderBy("orderid")
	@JsonBackReference
	private List<LnkMenurole> lnkMenuroles;

	//bi-directional many-to-one association to LutMenu
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name="parentid", nullable = true,insertable=false,updatable=false)
	private LutMenu lutMenu;

	//bi-directional many-to-one association to LutMenu
	@OneToMany(mappedBy="lutMenu")
	@JsonBackReference
	private List<LutMenu> lutMenus;

	public LutMenu() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getParentid() {
		return parentid;
	}

	public void setParentid(Long parentid) {
		this.parentid = parentid;
	}

	public int getIsactive() {
		return this.isactive;
	}

	public void setIsactive(int isactive) {
		this.isactive = isactive;
	}

	public String getMenuname() {
		return this.menuname;
	}

	public void setMenuname(String menuname) {
		this.menuname = menuname;
	}

	public int getOrderid() {
		return this.orderid;
	}

	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}

	public String getStateurl() {
		return this.stateurl;
	}

	public void setStateurl(String stateurl) {
		this.stateurl = stateurl;
	}

	public String getUicon() {
		return this.uicon;
	}

	public void setUicon(String uicon) {
		this.uicon = uicon;
	}

	public List<LnkMenurole> getLnkMenuroles() {
		return this.lnkMenuroles;
	}

	public void setLnkMenuroles(List<LnkMenurole> lnkMenuroles) {
		this.lnkMenuroles = lnkMenuroles;
	}

	public LnkMenurole addLnkMenurole(LnkMenurole lnkMenurole) {
		getLnkMenuroles().add(lnkMenurole);
		lnkMenurole.setLutMenu(this);

		return lnkMenurole;
	}

	public LnkMenurole removeLnkMenurole(LnkMenurole lnkMenurole) {
		getLnkMenuroles().remove(lnkMenurole);
		lnkMenurole.setLutMenu(null);

		return lnkMenurole;
	}

	public LutMenu getLutMenu() {
		return this.lutMenu;
	}

	public void setLutMenu(LutMenu lutMenu) {
		this.lutMenu = lutMenu;
	}

	public List<LutMenu> getLutMenus() {
		return this.lutMenus;
	}

	public void setLutMenus(List<LutMenu> lutMenus) {
		this.lutMenus = lutMenus;
	}

	public LutMenu addLutMenus(LutMenu lutMenus) {
		getLutMenus().add(lutMenus);
		lutMenus.setLutMenu(this);

		return lutMenus;
	}

	public LutMenu removeLutMenus(LutMenu lutMenus) {
		getLutMenus().remove(lutMenus);
		lutMenus.setLutMenu(null);

		return lutMenus;
	}

}