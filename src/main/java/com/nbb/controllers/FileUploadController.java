package com.nbb.controllers;

import org.apache.commons.io.FilenameUtils;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellValue;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.util.NumberToTextConverter;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nbb.dao.UserDao;
import com.nbb.models.FileUpload;
import com.nbb.services.FileUploadService;
import com.nbb.storage.StorageFileNotFoundException;
import com.nbb.storage.StorageService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import java.io.File;

@RestController
public class FileUploadController {

	@Autowired
	StorageService storageService;
	
	@Autowired
	FileUploadService fileUploadService;
	
	
	@Autowired
	private UserDao dao;

	List<String> files = new ArrayList<String>();


	
	
	@PostMapping("/api/file/upload/{path}/{aan}/{payroll}")
	public String handleFileUpload(@RequestParam("file") MultipartFile file,@RequestParam("fileAdmin") MultipartFile fileAdmin,@PathVariable String path, @PathVariable int  aan, @PathVariable int  payroll,Model model, HttpServletRequest req) throws IllegalStateException,Exception,StorageFileNotFoundException, IOException {
				
		//	storageService.store(file);
			String filename = "";
			String SAVE_DIR = "upload-dir";
			JSONObject result = new JSONObject();

			String furl = "/" + SAVE_DIR + "/" + filename;
			
			List<FileUpload> fl=  (List<FileUpload>) dao.getHQLResult("from FileUpload t where t.aan='"+aan+"' and payroll="+payroll+"", "list");
			
		
			
			if (fl.size()>0){
				for(FileUpload fle:fl){
					// File delfile = new File(fle.getFileurl());
					 Resource resfile = storageService.loadAsResource(fle.getFileurl());
			         if(resfile.exists()) { 
			        	 File delfile = resfile.getFile();
			        	 if(delfile.delete()){
			     			System.out.println(delfile.getName() + " is deleted!");
			     		}else{
			     			System.out.println("Delete operation is failed.");
			     		}
			         } else {
			        	 System.out.println("File not found.");
		    		 }
					 dao.PeaceCrud(null, "FileUpload", "delete", (long) fle.getId(), 0, 0, null);
				}
			}
						
			FileUpload fu= fileUploadService.uploadFile(file,fileAdmin, SAVE_DIR, furl,aan,payroll);			
			ObjectMapper mapper = new ObjectMapper();
			return mapper.writeValueAsString(fu);
			
	}

	@GetMapping("/gellallfiles")
	public String getListFiles(Model model) {
		model.addAttribute("files",
				files.stream()
						.map(fileName -> MvcUriComponentsBuilder
								.fromMethodName(FileUploadController.class, "getFile", fileName).build().toString())
						.collect(Collectors.toList()));
		model.addAttribute("totalFiles", "TotalFiles: " + files.size());
		return "listFiles";
	}

	@GetMapping("/api/files/{id}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable long id) {
		FileUpload fl=  (FileUpload) dao.getHQLResult("from FileUpload t where t.id='"+id+"'", "current");
		Resource file = storageService.loadAsResource(fl.getFileurl());
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fl.getFilename() + "\"")
				.body(file);
	}
	@GetMapping("/api/file/name/{type}/{name}")
	@ResponseBody
	public ResponseEntity<Resource> getFileName(@PathVariable long type,@PathVariable String name) {
		FileUpload fl=  (FileUpload) dao.getHQLResult("from FileUpload t where t.filename='"+name+"' or t.filenameAdmin='"+name+"'", "current");
		Resource file = storageService.loadAsResource(fl.getFileurl());
		String fileName="";
		if(type==1){
			 file = storageService.loadAsResource(fl.getFileurl());
			 fileName=fl.getFilename();
		}
		else{
			 fileName=fl.getFilenameAdmin();
			 file = storageService.loadAsResource(fl.getFileurlAdmin());
		}
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
				.body(file);
	}

}
