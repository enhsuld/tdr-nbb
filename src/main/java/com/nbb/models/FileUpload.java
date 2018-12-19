package com.nbb.models;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The persistent class for the FILE_UPLOAD database table.
 * 
 */
@Entity
@Table(name="file_upload")
@NamedQuery(name="FileUpload.findAll", query="SELECT f FROM FileUpload f")
public class FileUpload implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private String filename;
	@Column(name="filename_admin")
	private String filenameAdmin;
	private String name;
	@Column(name="name_admin")
	private String nameAdmin;

	private long filesize;
	@Column(name="filesize_admin")
	private long filesizeAdmin;
	
	private int aan;
	
	private int autype;	
	private int payroll;

	private String fileurl;
	@Column(name="fileurl_admin")
	private String fileurlAdmin;

	private String mimetype;
	@Column(name="mimetype_admin")
	private String mimetypeAdmin;


    public FileUpload() {
        // Default Constructor
    }
	  
	public String getFilename() {
		return this.filename;
	}
	
	public int getPayroll() {
		return payroll;
	}

	public void setPayroll(int payroll) {
		this.payroll = payroll;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getFilesize() {
		return this.filesize;
	}

	public void setFilesize(long filesize) {
		this.filesize = filesize;
	}

	public String getFileurl() {
		return this.fileurl;
	}

	public void setFileurl(String fileurl) {
		this.fileurl = fileurl;
	}

	public String getMimetype() {
		return this.mimetype;
	}

	public void setMimetype(String mimetype) {
		this.mimetype = mimetype;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public int getAutype() {
		return autype;
	}

	public void setAutype(int autype) {
		this.autype = autype;
	}

	public int getAan() {
		return aan;
	}

	public void setAan(int aan) {
		this.aan = aan;
	}

	public String getFilenameAdmin() {
		return filenameAdmin;
	}

	public void setFilenameAdmin(String filenameAdmin) {
		this.filenameAdmin = filenameAdmin;
	}

	public String getNameAdmin() {
		return nameAdmin;
	}

	public void setNameAdmin(String nameAdmin) {
		this.nameAdmin = nameAdmin;
	}

	public long getFilesizeAdmin() {
		return filesizeAdmin;
	}

	public void setFilesizeAdmin(long filesizeAdmin) {
		this.filesizeAdmin = filesizeAdmin;
	}

	public String getFileurlAdmin() {
		return fileurlAdmin;
	}

	public void setFileurlAdmin(String fileurlAdmin) {
		this.fileurlAdmin = fileurlAdmin;
	}

	public String getMimetypeAdmin() {
		return mimetypeAdmin;
	}

	public void setMimetypeAdmin(String mimetypeAdmin) {
		this.mimetypeAdmin = mimetypeAdmin;
	}
	
	
	
}