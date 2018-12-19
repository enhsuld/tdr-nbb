package com.nbb.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nbb.dao.UserDao;
import com.nbb.models.FileUpload;
import com.nbb.repository.FileUploadRepository;


@Service("FileUploadService")
public class FileUploadService {

	@Autowired
	FileUploadRepository fileUploadRepository;
	
	@Autowired
	private UserDao dao;


	// Retrieve file
	public FileUpload findByFilename(String filename) {
		return fileUploadRepository.findByFilename(filename);
	}

	// Upload the file
	public FileUpload uploadFile(MultipartFile mfile, MultipartFile afile, String path,String downdir,int aan,int payroll) throws IllegalStateException, IOException {

		String filename = mfile.getOriginalFilename();
		String filenameAdmin = afile.getOriginalFilename();
		int index=filename.lastIndexOf('.');
		int indexAdmin=filenameAdmin.lastIndexOf('.');
		String lastOne=(filename.substring(index +1));
		String lastOneAdmin=(filenameAdmin.substring(indexAdmin +1));
		System.out.println(lastOne);;
		long size = mfile.getSize();

		String fname=UUID.randomUUID().toString();
		String fnameAdmin=UUID.randomUUID().toString();
		
		String uuid = fname+"."+lastOne;
		
		String uuidAdmin = fnameAdmin+"."+lastOneAdmin;
		
		
		File folder = new File(path);
		if(!folder.exists()){
			folder.mkdirs();
		}
		if (!mfile.isEmpty() && !afile.isEmpty()) {
			try {
				Files.copy(mfile.getInputStream(), Paths.get(path, uuid));
				Files.copy(afile.getInputStream(), Paths.get(path, uuidAdmin));
			} catch (IOException|RuntimeException e) {
				System.out.println("aldaa");
			}
		} else {
			System.out.println("empty"); 
			return null;
		}

		String furl = downdir +uuid;

		FileUpload newFile = new FileUpload();
		newFile.setFilenameAdmin(filenameAdmin);
		newFile.setFilesizeAdmin(afile.getSize()/1024);
		newFile.setMimetypeAdmin(lastOneAdmin);
		newFile.setFileurlAdmin(downdir+uuidAdmin);
		newFile.setNameAdmin(uuidAdmin);
		
		if(payroll>2){
			newFile.setAutype(2);
		}
		else{
			newFile.setAutype(1);
		}
		
		newFile.setFilename(filename);
		newFile.setFilesize(size/1024);
		newFile.setMimetype(lastOne);
		newFile.setFileurl(furl);
		newFile.setName(uuid);
		newFile.setAan(aan);
		newFile.setPayroll(payroll);
		fileUploadRepository.save(newFile);

		return newFile;

	}



}