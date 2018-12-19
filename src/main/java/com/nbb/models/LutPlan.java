package com.nbb.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;



/**
 * The persistent class for the lut_staus database table.
 * 
 */
@Entity
@Table(name="lut_plan")
@NamedQuery(name="LutPlan.findAll", query="SELECT l FROM LutPlan l")
public class LutPlan implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	private String name;
	
	private String price;

	@Column(name="audit_count")
	private int auditCount;
	
	
	@Column(name="disk_size")
	private int diskSize;
	
	private boolean isactive;
	
	@Column(name="create_date")
	private String createDate;

	public LutPlan() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public int getAuditCount() {
		return auditCount;
	}

	public void setAuditCount(int auditCount) {
		this.auditCount = auditCount;
	}

	public int getDiskSize() {
		return diskSize;
	}

	public void setDiskSize(int diskSize) {
		this.diskSize = diskSize;
	}

	public boolean isIsactive() {
		return isactive;
	}

	public void setIsactive(boolean isactive) {
		this.isactive = isactive;
	}

}