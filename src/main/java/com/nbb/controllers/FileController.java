package com.nbb.controllers;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.formula.FormulaParseException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.NumberToTextConverter;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.dom4j.DocumentException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import com.nbb.dao.UserDao;
import com.nbb.models.FileConverted;
import com.nbb.models.FileUpload;
import com.nbb.models.LnkUserrole;
import com.nbb.models.LutPlan;
import com.nbb.models.LutRole;
import com.nbb.models.LutUser;
import com.nbb.services.FileUploadService;
import com.nbb.services.UserService;
import com.nbb.storage.StorageService;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.formula.eval.NotImplementedException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
@RestController
public class FileController {

	@Autowired
	StorageService storageService;
	
	@Autowired
	FileUploadService fileUploadService;
	
	@Autowired
	private UserDao dao;
	
	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	/*@GetMapping("/api/excel/delete/attach/{id}")
	@ResponseBody
	public boolean deleteFormFile(@PathVariable long id) {
		LnkAuditFormFile main = (LnkAuditFormFile) dao.getHQLResult("from LnkAuditFormFile t where t.id='"+id+"'", "current");
		Path currentRelativePath = Paths.get("");
		String realpath = currentRelativePath.toAbsolutePath().toString();
		File file = new File(realpath+File.separator+main.getFileurl());
		if(file.exists()){
			file.delete();
			dao.PeaceCrud(main, "LnkAuditFormFile", "delete", (long) id, 0, 0, null);
			return true;
		}
		else{
			return false;
		}
	}*/
	
	@PostMapping("/api/file/user/import")
	@ResponseBody
	public Boolean getFileUser(@RequestParam("file") MultipartFile file, Principal pr,HttpServletRequest req,HttpServletResponse response) throws EncryptedDocumentException, InvalidFormatException, IOException {
		//Path currentRelativePath = Paths.get("");
		//String realpath = currentRelativePath.toAbsolutePath().toString();
		
		InputStream str= file.getInputStream();
		Workbook workbook = WorkbookFactory.create(str); 
		Sheet sht=workbook.getSheet("Sheet1");
		FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
		List<LutRole> rl= (List<LutRole>) dao.getHQLResult("from LutRole t where t.roleauth='nyabo'", "list");
		if(sht!=null){
			for(int y=0;y<sht.getLastRowNum();y++){
				Row row = sht.getRow(y);
				
				LutUser us =null;
				String username="";
				switch (evaluator.evaluateInCell(row.getCell(3)).getCellType()) 
				{
				case Cell.CELL_TYPE_STRING:
					username=row.getCell(3).getStringCellValue(); 
					break;
				case Cell.CELL_TYPE_NUMERIC:
					username=String.valueOf((int) row.getCell(3).getNumericCellValue());  
					break;
				}
				
				List<LutUser> usiz= (List<LutUser>) dao.getHQLResult("from LutUser t where t.username='"+username+"'", "list");
				if(usiz.size()==0){
					 us =new LutUser();
				}
				else{
					 us =usiz.get(0);
				}
				if(row.getCell(0)!=null){
					switch (evaluator.evaluateInCell(row.getCell(0)).getCellType()) 
					{
					case Cell.CELL_TYPE_STRING:
						us.setOrgName(row.getCell(0).getStringCellValue());   											
						break;
					case Cell.CELL_TYPE_NUMERIC:
						us.setOrgName(String.valueOf(row.getCell(0).getNumericCellValue()));   											
						break;
					}
				}
				
				if(row.getCell(1)!=null){
					switch (evaluator.evaluateInCell(row.getCell(1)).getCellType()) 
					{
					case Cell.CELL_TYPE_STRING:
						us.setOrgCode(row.getCell(1).getStringCellValue());   											
						break;
					case Cell.CELL_TYPE_NUMERIC:
						us.setOrgCode(String.valueOf(row.getCell(1).getNumericCellValue()));   											
						break;
					}
				}
				
				if(row.getCell(2)!=null){
					switch (evaluator.evaluateInCell(row.getCell(2)).getCellType()) 
					{
					case Cell.CELL_TYPE_STRING:
						us.setMobile(row.getCell(2).getStringCellValue());   											
						break;
					case Cell.CELL_TYPE_NUMERIC:
						us.setMobile(String.valueOf(row.getCell(2).getNumericCellValue()));   											
						break;
					}
				}
				if(row.getCell(3)!=null){
					switch (evaluator.evaluateInCell(row.getCell(3)).getCellType()) 
					{
					case Cell.CELL_TYPE_STRING:
						username=row.getCell(3).getStringCellValue();
						us.setUsername(row.getCell(3).getStringCellValue());   
						us.setPassword(passwordEncoder.encode(row.getCell(3).getStringCellValue()));   
						break;
					case Cell.CELL_TYPE_NUMERIC:
						username=String.valueOf((int) row.getCell(3).getNumericCellValue());
						us.setUsername(String.valueOf((int) row.getCell(3).getNumericCellValue()));  
						us.setPassword(passwordEncoder.encode(String.valueOf((int) row.getCell(3).getNumericCellValue())));   
						break;
					}
				}
				if(row.getCell(4)!=null){
					switch (evaluator.evaluateInCell(row.getCell(4)).getCellType()) 
					{
					case Cell.CELL_TYPE_NUMERIC:
						LutPlan pl= (LutPlan) dao.getHQLResult("from LutPlan t where t.id='"+(int) row.getCell(4).getNumericCellValue()+"'", "current");
						if(pl!=null){
							us.setPlanid(pl.getId());
							us.setBalance(pl.getAuditCount());
						}
						
						break;
					}
				}
				us.setIsactive(true);
				
				
				
				if(usiz.size()==0){
					dao.PeaceCrud(us, "LutUser", "save", (long) 0, 0, 0, null);
					LnkUserrole lnk=new LnkUserrole();
					lnk.setRoleid(rl.get(0).getId());
					lnk.setUserid(us.getId());
					dao.PeaceCrud(lnk, "LnkUserrole", "save", (long) 0, 0, 0, null);
				}
				else{
					dao.PeaceCrud(us, "LutUser", "update", (long) us.getId(), 0, 0, null);
					
					dao.PeaceCrud(null, "LnkUserrole", "delete", (long) us.getId(), 0, 0, "userid");	
					
					LnkUserrole lnk=new LnkUserrole();
					lnk.setRoleid(rl.get(0).getId());
					lnk.setUserid(us.getId());
					dao.PeaceCrud(lnk, "LnkUserrole", "save", (long) 0, 0, 0, null);
				}
			}
			return true;
		}
		return false;
	}
	
	@PostMapping("/api/checker")
	public String checker(@RequestParam("file") MultipartFile file,Principal pr,HttpServletRequest req) throws IllegalStateException, IOException, NumberFormatException,ParseException, InvalidFormatException, JSONException {
				
			String SAVE_DIR = "upload-dir";
			String furl = File.separator + SAVE_DIR ;
			String filename = file.getOriginalFilename();
    		String newfilename = file.getOriginalFilename();
    		int newindex=newfilename.lastIndexOf('.');
    		String newlastOne=(newfilename.substring(newindex +1));
    	    String newuuid = UUID.randomUUID().toString()+"."+newlastOne;	
    	    //storageService.store(file,pr.getName(),newuuid);
    	    
    	    if(FilenameUtils.getExtension(file.getOriginalFilename()).equalsIgnoreCase("xlsx") || FilenameUtils.getExtension(file.getOriginalFilename()).equalsIgnoreCase("xls")){

            	InputStream stt= file.getInputStream();
            	Workbook workbook = WorkbookFactory.create(stt); 
            	
    			FileInputStream zagwar = null;
    			File files = null;
    			Path currentRelativePath = Paths.get("");
    			String realpath = currentRelativePath.toAbsolutePath().toString();
    			
    			List<FileUpload> fl=(List<FileUpload>) dao.getHQLResult("from FileUpload t where t.autype=1 and t.aan=1 order by t.id desc", "list");
    		
    			
    			JSONObject arr= new JSONObject();
    			JSONObject err= new JSONObject();
    			int count=0;
    			if(fl.size()>0){
    				files = new File(realpath+fl.get(0).getFileurlAdmin());				
    				if(files.exists()){
    					zagwar = new FileInputStream(files);
    				}
    				else{
    					JSONObject robj=new JSONObject();
    					robj.put("support", true);
    		    		robj.put("excel", false);
    		    		robj.put("error", arr);
    		    		robj.put("file", false);
    		    		return robj.toString(); 
    				}
    			}
    			else{
    				JSONObject robj=new JSONObject();
    				robj.put("support", true);
    	    		robj.put("excel", false);
    	    		robj.put("error", arr);
    	    		robj.put("file", false);
    	    		return robj.toString(); 
    			}
    			
    			
    			Workbook zbook = WorkbookFactory.create(zagwar); 
    			JSONArray errList= new JSONArray();
    			JSONArray sheetList= new JSONArray();
    			for(int i=0;i<workbook.getNumberOfSheets()-6;i++){
    				Sheet sht=zbook.getSheet(workbook.getSheetName(i));
    				if(sht!=null){
    					Row drow = workbook.getSheetAt(i).getRow(6);
    					Row zrow = sht.getRow(6);
    					if(workbook.getSheetName(i).equalsIgnoreCase("15.Journal") || workbook.getSheetName(i).equalsIgnoreCase("Journal")){
    						drow = workbook.getSheetAt(i).getRow(3);
    						zrow = sht.getRow(3);
    					}
    					if(workbook.getSheetName(i).equalsIgnoreCase("16.Assets") || workbook.getSheetName(i).equalsIgnoreCase("Assets") 
    							|| workbook.getSheetName(i).equalsIgnoreCase("17.Inventory") || workbook.getSheetName(i).equalsIgnoreCase("19.Budget")){
    						drow = workbook.getSheetAt(i).getRow(4);
    						zrow = sht.getRow(4);
    					}
    					if(workbook.getSheetName(i).equalsIgnoreCase("18.Payroll") || workbook.getSheetName(i).equalsIgnoreCase("Payroll")){
    						drow = workbook.getSheetAt(i).getRow(1);
    						zrow = sht.getRow(1);						 
    					}
    					if(workbook.getSheetName(i).equalsIgnoreCase("12.CTT7") || workbook.getSheetName(i).equalsIgnoreCase("12.CTT7")){
    						drow = workbook.getSheetAt(i).getRow(7);
    						zrow = sht.getRow(7);
    					}
    					if(drow!=null){
    						for(int y=0;y<drow.getLastCellNum();y++){
    							Cell cl = drow.getCell(y);
    							if(zrow!=null){
    								Cell zcl = zrow.getCell(y);
    								if(cl!=null && zcl!=null){		
    									JSONObject errObj= new JSONObject();
    									if(workbook.getSheetName(i).equalsIgnoreCase("2.CT1A") || workbook.getSheetName(i).equalsIgnoreCase("CT1A") ||
    									   workbook.getSheetName(i).equalsIgnoreCase("3.CT2A") || workbook.getSheetName(i).equalsIgnoreCase("CT2A") ||
    									   workbook.getSheetName(i).equalsIgnoreCase("4.CT3A") || workbook.getSheetName(i).equalsIgnoreCase("CT3A") ||
    									   workbook.getSheetName(i).equalsIgnoreCase("5.CT4A") || workbook.getSheetName(i).equalsIgnoreCase("CT4A") ||
    									   workbook.getSheetName(i).equalsIgnoreCase("6.CTT1") || workbook.getSheetName(i).equalsIgnoreCase("7.CTT2") ||
    									   workbook.getSheetName(i).equalsIgnoreCase("8.CTT3") || workbook.getSheetName(i).equalsIgnoreCase("9.CTT4") ||
    									   workbook.getSheetName(i).equalsIgnoreCase("10.CTT5") || workbook.getSheetName(i).equalsIgnoreCase("11.CTT6") ||
    									   workbook.getSheetName(i).equalsIgnoreCase("15.Journal") || workbook.getSheetName(i).equalsIgnoreCase("Journal")){
    										if(!String.valueOf(cl.getRichStringCellValue().getString().trim()).equalsIgnoreCase(String.valueOf(zcl.getRichStringCellValue().getString().trim()))){									
    											errObj.put("sheetname", cl.getSheet().getSheetName());
    											errObj.put("bagana", cl.getRichStringCellValue().getString());
    											errObj.put("bagana2", zcl.getRichStringCellValue().getString());
    											errList.put(errObj);
    										}								
    									}
    								}
    							}												
    						}
    					}
    					else{
    						JSONObject errObj= new JSONObject();
    						errObj.put("sheetname", workbook.getSheetName(i));
    						sheetList.put(errObj);
    						
    					}
    				}
    				else{
    					JSONObject errObj= new JSONObject();
    					errObj.put("sheetname", workbook.getSheetName(i));
    					sheetList.put(errObj);
    				}
    			}
    			
    			
    			JSONArray arr1= new JSONArray();
    			FormulaEvaluator evaluator = zbook.getCreationHelper().createFormulaEvaluator();
    			FormulaEvaluator wevaluator = workbook.getCreationHelper().createFormulaEvaluator();
    			if(sheetList.length()>0){
    				err.put("additionalSheet", sheetList);
    				err.put("excel", false);
    				err.put("sheet", false);				
    				return  err.toString();
    			}
    			else{
    				Sheet hch=zbook.getSheet("ЧХ");
    				if(hch!=null){
    					Row row4 = hch.getRow(4);
    					Row row5 = hch.getRow(5);
    					Row row6 = hch.getRow(6);
    					Row row7 = hch.getRow(7);
    					Row row8 = hch.getRow(8);
    					Row row12 = hch.getRow(12);
    					Row row13 = hch.getRow(13);
    					Row row14 = hch.getRow(14);
    					Row row15 = hch.getRow(15);
    					
    					Cell cell41 = row4.getCell(1);
    					Cell cell4 = row4.getCell(2);
    					Cell cell5 = row5.getCell(2);
    					Cell cell6 = row6.getCell(2);
    					Cell cell7 = row7.getCell(2);
    					Cell cell8 = row8.getCell(2);
    					Cell cell12 = row12.getCell(2);
    					Cell cell13 = row13.getCell(2);
    					Cell cell14 = row14.getCell(2);
    					Cell cell15 = row15.getCell(2);
    					
    				}
    				here: for(int i=0;i<workbook.getNumberOfSheets();i++){
    					//FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
    					Sheet sheet = zbook.getSheet(workbook.getSheetAt(i).getSheetName().trim());
    					FormulaEvaluator evaluatorZbook = zbook.getCreationHelper().createFormulaEvaluator();
    					FormulaEvaluator eval= workbook.getCreationHelper().createFormulaEvaluator();
    					Sheet dataSheet = workbook.getSheetAt(i);
    					if(sheet!=null){
    						System.out.println("sheetname"+sheet.getSheetName());
    						
    						if(sheet.getSheetName().equalsIgnoreCase("23.TRIAL BALANCE")){
    							for(int k=5; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {
    									Iterator cellIterator = row.cellIterator();
    									while (cellIterator.hasNext()) {

    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());    											
    											break;
    										}
    									}    									
    									count = count + 1;

    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}

    						//	dao.inserBatch(datas,"23.TRIAL BALANCE",mid);

    						}
    						else if(sheet.getSheetName().equalsIgnoreCase("25.CBWS")){
    								
    							for(int k=6; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {
    									Iterator cellIterator = row.cellIterator();
    									while (cellIterator.hasNext()) {
    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());    										
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());    											
    											break;
    										}
    									}
    									//dao.PeaceCrud(form, "FinCbw", "save", (long) 0, 0, 0, null);
    									count = count + 1;
    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}

    							//dao.inserBatch(datas,"25.CBWS",mid);
    						}

    						else if(sheet.getSheetName().equalsIgnoreCase( "24.ABWS" )){
    											
    							for(int k=5; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {
    									Iterator cellIterator = row.cellIterator();
    									while (cellIterator.hasNext()) {

    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());    											
    											break;
    										}
    									}    								
    									count = count + 1;
    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}
    						}

    						else if(sheet.getSheetName().equalsIgnoreCase( "21.TGT1A" )){
    							for(int k=5; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);

    								
    								try {
    									Iterator cellIterator = row.cellIterator();
    									while (cellIterator.hasNext()) {
    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());	
    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());	
    											
    											break;
    										}
    									}
    									count = count + 1;

    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}
    						}

    		
    						else if(sheet.getSheetName().equalsIgnoreCase( "5.Inventory" )){
    							for(int k=5; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {							
    									Iterator cellIterator = row.cellIterator();

    									while (cellIterator.hasNext()) {

    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());
    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());    											
    											break;
    										}
    									}
    									count = count + 1;

    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}
    						}

    						else if(sheet.getSheetName().equalsIgnoreCase("4.Assets")){
    							for(int k=5; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								Iterator cellIterator = row.cellIterator();

    								while (cellIterator.hasNext()) {

    									Cell cell = (Cell) cellIterator.next();
    									Cell zcell =crow.getCell(cell.getColumnIndex());
    									switch (evaluator.evaluateInCell(cell).getCellType()) 
    									{
    									case Cell.CELL_TYPE_STRING:
    										zcell.setCellValue(cell.getStringCellValue());
    										
    										break;
    									case Cell.CELL_TYPE_NUMERIC:
    										zcell.setCellValue(cell.getNumericCellValue());
    										
    										break;
    									}
    								}
    								count = count + 1;
    							}
    							//dao.inserBatch(datas,"4.Assets",mid);
    						}
    						else if(sheet.getSheetName().equalsIgnoreCase("19.Budget")){
    							for(int k=5; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    													
    								try {
    									Iterator cellIterator = row.cellIterator();
    									while (cellIterator.hasNext()) {
    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());
    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());
    											
    											break;
    										case Cell.CELL_TYPE_BLANK:
    											if (cell.getColumnIndex() == 1) {
    												
    											//	dao.inserBatch(datas,"19.Budget",mid);
    												continue here;
    											}
    											break;
    										}
    									}
    									count = count + 1;
    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}

    							//dao.inserBatch(datas,"19.Budget",mid);
    						}
    					
    						
    						else if(sheet.getSheetName().equalsIgnoreCase("2.CT1A") || sheet.getSheetName().equalsIgnoreCase("СБД")){
    							int mnCount=4;
    							for(int k=mnCount; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    					
    								try {    									
    									Iterator cellIterator = row.cellIterator();
    									while (cellIterator.hasNext()) {
    										Cell cell = (Cell) cellIterator.next();
    										
    										
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										
    										switch (cell.getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:	
    											zcell.setCellValue(cell.getNumericCellValue());
    											break;											
    										}
    									}
    									count = count + 1;
    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}
    						}
    						else if(sheet.getSheetName().equalsIgnoreCase("6.CTT1")){ 
    							for(int k=7; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {
    									Iterator cellIterator = row.cellIterator();
    									while (cellIterator.hasNext()) {

    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());    											
    											break;
    										}
    									}    									
    									count = count + 1;

    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}
    						}
    						else if(sheet.getSheetName().equalsIgnoreCase("7.CTT2")){
    							for(int k=7; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {
    									Iterator cellIterator = row.cellIterator();

    									while (cellIterator.hasNext()) {

    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());    											
    											break;
    										}
    									}    									
    									count = count + 1;

    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}
    						}
    						else if(sheet.getSheetName().equalsIgnoreCase("8.CTT3")){
    							for(int k=7; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {
    									Iterator cellIterator = row.cellIterator();

    									while (cellIterator.hasNext()) {
    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());    											
    											break;    										
    										}
    									}    									
    									count = count + 1;

    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}
    						}
    						else if(sheet.getSheetName().equalsIgnoreCase("9.CTT4")){
    							for(int k=7; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {
    									Iterator cellIterator = row.cellIterator();

    									while (cellIterator.hasNext()) {

    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());    											
    											break;
    										}
    									}    									
    									count = count + 1;
    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true); 
    								}
    							}
    						}
    						else if(sheet.getSheetName().equalsIgnoreCase("10.CTT5")){
    							for(int k=8; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {
    									Iterator cellIterator = row.cellIterator();

    									while (cellIterator.hasNext()) {
    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());    											
    											break;
    										}
    									}
    									count = count + 1;

    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true); 
    								}
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("11.CTT6")){
    							for(int k=7; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {
    									Iterator cellIterator = row.cellIterator();

    									while (cellIterator.hasNext()) {

    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());
    											

    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());    										
    											break;
    										}
    									}
    									count = count + 1;

    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}

    						}
    						else if(sheet.getSheetName().equalsIgnoreCase("12.CTT7")){
    							for(int k=9; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {
    									Iterator cellIterator = row.cellIterator();

    									while (cellIterator.hasNext()) {

    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());
    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());    											
    											break;
    										}
    									}
    									count = count + 1;

    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}
    						}
    						else if(sheet.getSheetName().equalsIgnoreCase("13.CTT8")){    							
    							for(int k=7; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {
    									Iterator cellIterator = row.cellIterator();
    									while (cellIterator.hasNext()) {

    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());    										
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());    											
    											break;
    										}
    									}    								
    									count = count + 1;

    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}
    						}
    						else if(sheet.getSheetName().equalsIgnoreCase("14.CTT9")){
    							for(int k=7; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {
    									
    									Iterator cellIterator = row.cellIterator();
    									while (cellIterator.hasNext()) {
    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());    										
    											break;
    										}
    									}    								
    									count = count + 1;

    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}
    						}
    						else if(sheet.getSheetName().equalsIgnoreCase("20.TGT1")){
    							System.out.println("sheet.getLastRowNum() ===== " + dataSheet.getLastRowNum());
    							for(int k=7; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    						
    								try {
    									Iterator cellIterator = row.cellIterator();
    									while (cellIterator.hasNext()) {
    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());    											
    											break;
    										}
    									}
    								
    									count = count + 1;
    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}   
    						}
    						else if(sheet.getSheetName().equalsIgnoreCase("22.NT2")){
    							for(int k=6; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {
    									Iterator cellIterator = row.cellIterator();
    									while (cellIterator.hasNext()) {										
    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (evaluator.evaluateInCell(cell).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											zcell.setCellValue(cell.getNumericCellValue());
    											break;    											
    										}
    									}    									
    									count = count + 1;

    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}
    						}
    						else if(sheet.getSheetName().equalsIgnoreCase("4.CT3A") || sheet.getSheetName().equalsIgnoreCase("МГТ")){    							
    							int mnCount=4;
    							for(int k=mnCount; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {
    									Iterator cellIterator = row.cellIterator();
    									while (cellIterator.hasNext()) {
    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (cell.getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());
    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:	
    											zcell.setCellValue(cell.getNumericCellValue());    													
    											break;
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = evaluator.evaluate(cell);
    											zcell.setCellValue(cellValue.getNumberValue());    											
    											break;
    										}
    									}
    									count = count + 1;

    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}
    						}
    						else if(sheet.getSheetName().equalsIgnoreCase("5.CT4A") || sheet.getSheetName().equalsIgnoreCase("ӨӨТ")){
    							int mnCount=4;
    							for(int k=mnCount; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {    									
    									Iterator cellIterator = row.cellIterator();
    									while (cellIterator.hasNext()) {
    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (cell.getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:	
    											zcell.setCellValue(cell.getNumericCellValue());
    													
    											break;
    										}
    									}
    									count = count + 1;
    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}
    						}
    						else if(sheet.getSheetName().equalsIgnoreCase("3.CT2A") || sheet.getSheetName().equalsIgnoreCase("ОДТ") ){
    							int mnCount=4;
    							for(int k=mnCount; k <= dataSheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								try {
    									Iterator cellIterator = row.cellIterator();
    									while (cellIterator.hasNext()) {
    										Cell cell = (Cell) cellIterator.next();
    										Cell zcell =crow.getCell(cell.getColumnIndex());
    										switch (cell.getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											zcell.setCellValue(cell.getStringCellValue());    											
    											break;
    										case Cell.CELL_TYPE_NUMERIC:	
    											zcell.setCellValue(cell.getNumericCellValue());
    																			
    											break;
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = evaluator.evaluate(cell);    											
    											zcell.setCellValue(cellValue.getNumberValue());
    											break;
    										}
    									}
    									count = count + 1;
    								}  catch (Exception e) {
    									arr.put("count",count-1);
    									arr.put("response",true);
    								}
    							}
    						}
    						
    						
    						else if(sheet!=null && sheet.getSheetName().trim().equals("15.Journal") || sheet.getSheetName().trim().equals("Journal")){						
    			
    							int mnCount=4;
    							
    							for(int kk=mnCount; kk <= dataSheet.getLastRowNum();kk++){
    								Row currentRow = dataSheet.getRow(kk);
    								if(currentRow!=null){
    									Cell data1 = currentRow.getCell(0);								
    									Cell data2 = currentRow.getCell(1);
    									Cell data3 = currentRow.getCell(2);
    									Cell data4 = currentRow.getCell(3);
    									Cell data5 = currentRow.getCell(4);
    									Cell data6 = currentRow.getCell(5);
    									Cell data7 = currentRow.getCell(6);
    									Cell data8 = currentRow.getCell(7);
    									Cell data9 = currentRow.getCell(8);
    									Cell data10 = currentRow.getCell(9);
    									Cell data11 = currentRow.getCell(10);
    									Cell data12 = currentRow.getCell(11);
    									Cell data13 = currentRow.getCell(12);
    									Cell data14 = currentRow.getCell(13);
    									Cell data15 = currentRow.getCell(14);
    									Cell data16 = currentRow.getCell(15);
    									Cell data17 = currentRow.getCell(16);
    									Cell data18 = currentRow.getCell(17);
    									Cell data19 = currentRow.getCell(18);
    									Cell data20 = currentRow.getCell(19);
    									Cell data21 = currentRow.getCell(20);
    									Cell data22 = currentRow.getCell(21);
    									
    									Row crow = workbook.getSheetAt(i).getRow(kk);
    									Cell cell1 = null;
    									if(crow.getCell(0)!=null){
    										cell1 = crow.getCell(0);
    									}
    									else{
    										cell1=crow.createCell(0);
    									}
    									
    									Cell cell2 =null;
    									if(crow.getCell(1)!=null){
    										cell2 = crow.getCell(1);
    									}
    									else{
    										cell2=crow.createCell(1);
    									}
    									
    									Cell cell3 =null;
    									if(crow.getCell(2)!=null){
    										cell3 = crow.getCell(2);
    									}
    									else{
    										cell3=crow.createCell(2);
    									}
    									
    									Cell cell4 =null;
    									if(crow.getCell(3)!=null){
    										cell4 = crow.getCell(3);
    									}
    									else{
    										cell4=crow.createCell(3);
    									}
    									
    									Cell cell5 =null;
    									if(crow.getCell(4)!=null){
    										cell5 = crow.getCell(4);
    									}
    									else{
    										cell5=crow.createCell(4);
    									}
    									
    									Cell cell18 =null;
    									if(crow.getCell(17)!=null){
    										cell18 = crow.getCell(17);
    									}
    									else{
    										cell18=crow.createCell(17);
    									}
    							
    									Cell cell6 = crow.getCell(5);
    									Cell cell7 = crow.getCell(6);
    									Cell cell8 = crow.getCell(7);
    									Cell cell9 = crow.getCell(8);
    									Cell cell10 = crow.getCell(9);
    									Cell cell11 = crow.getCell(10);
    									Cell cell12 = crow.getCell(11);
    									Cell cell13 = crow.getCell(12);
    									Cell cell14 = crow.getCell(13);
    									Cell cell15 = crow.getCell(14);
    									Cell cell16 = crow.getCell(15);
    									Cell cell17 = crow.getCell(16);
    									Cell cell19 = crow.getCell(18);
    									Cell cell20 = crow.getCell(19);
    									Cell cell21 = crow.getCell(20);
    									
    									if(data1!=null){
    										switch (wevaluator.evaluateInCell(data1).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell1.setCellValue(data1.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											long a = (long) data1.getNumericCellValue();
    											cell1.setCellValue(data1.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data1);
    											cell1.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									
    									if(data2!=null){
    										switch (wevaluator.evaluateInCell(data2).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell2.setCellValue(data2.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:								
    											cell2.setCellValue(data2.getNumericCellValue());
    											
    											if (HSSFDateUtil.isCellDateFormatted(data2)) {
    										  		Date d1 = data2.getDateCellValue();
    									    		SimpleDateFormat df = new SimpleDateFormat("MM/dd/YYYY");
    									            String formattedDate = df.format(d1);
    												cell2.setCellValue(formattedDate);
    										    }																					
    											break;										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data2);
    											cell2.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									
    									if(data3!=null){
    										switch (wevaluator.evaluateInCell(data3).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell3.setCellValue(data3.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											long a = (long) data3.getNumericCellValue();
    											cell3.setCellValue(data3.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data3);
    											cell3.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    								
    									if(data4!=null){
    										switch (wevaluator.evaluateInCell(data4).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell4.setCellValue(data4.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											cell4.setCellValue(data4.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data4);
    											cell4.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									if(data5!=null){
    										switch (wevaluator.evaluateInCell(data5).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell5.setCellValue(data5.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											cell5.setCellValue(data5.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data5);
    											cell5.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									if(data6!=null){
    										switch (wevaluator.evaluateInCell(data6).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell6.setCellValue(data6.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											cell6.setCellValue(data6.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 									
    											final CellValue cellValue = wevaluator.evaluate(data6);
    											cell6.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									if(data7!=null){
    										switch (wevaluator.evaluateInCell(data7).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell7.setCellValue(data7.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											cell7.setCellValue(data7.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data7);
    											cell7.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									
    									if(data8!=null){
    										switch (wevaluator.evaluateInCell(data8).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell8.setCellValue(data8.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											long a = (long) data8.getNumericCellValue();
    											cell8.setCellValue(data8.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data8);
    											cell8.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									if(data9!=null){
    										switch (wevaluator.evaluateInCell(data9).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell9.setCellValue(data9.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											long a = (long) data9.getNumericCellValue();
    											cell9.setCellValue(data9.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data9);
    											cell9.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									if(data10!=null){
    										switch (wevaluator.evaluateInCell(data10).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell10.setCellValue(data10.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											long a = (long) data10.getNumericCellValue();
    											cell10.setCellValue(data10.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data10);
    											cell10.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									if(data11!=null){
    										switch (wevaluator.evaluateInCell(data11).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell11.setCellValue(data11.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											cell11.setCellValue(data11.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data11);
    											cell11.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									if(data12!=null){
    										switch (wevaluator.evaluateInCell(data12).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell12.setCellValue(data12.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											cell12.setCellValue(data12.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data12);
    											cell12.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									if(data13!=null){
    										switch (wevaluator.evaluateInCell(data13).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell13.setCellValue(data13.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											cell13.setCellValue(data13.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data13);
    											cell13.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									if(data14!=null){
    										switch (wevaluator.evaluateInCell(data14).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell14.setCellValue(data14.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											cell14.setCellValue(data14.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data14);
    											cell14.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									if(data15!=null){
    										switch (wevaluator.evaluateInCell(data15).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell15.setCellValue(data15.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											cell15.setCellValue(data15.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data15);
    											cell15.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									if(data16!=null){
    										switch (wevaluator.evaluateInCell(data16).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell16.setCellValue(data16.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											cell16.setCellValue(data16.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 											
    											final CellValue cellValue = wevaluator.evaluate(data16);
    											cell16.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									if(data17!=null){
    										switch (wevaluator.evaluateInCell(data17).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell17.setCellValue(data17.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											cell17.setCellValue(data17.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = evaluator.evaluate(data17);
    											cell17.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									if(data18!=null){
    										switch (wevaluator.evaluateInCell(data18).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell18.setCellValue(data18.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											cell18.setCellValue(data18.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data18);
    											cell18.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									if(data19!=null){
    										switch (wevaluator.evaluateInCell(data19).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell19.setCellValue(data19.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											cell19.setCellValue(data19.getNumericCellValue());
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data19);
    											cell19.setCellValue(data18.getStringCellValue());
    								            break;
    										}
    									}
    									if(data20!=null){
    										switch (wevaluator.evaluateInCell(data20).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											cell20.setCellValue(data20.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											cell20.setCellValue(data20.getNumericCellValue());
    											break;
    										case Cell.CELL_TYPE_BLANK:
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data20);
    											cell20.setCellValue(cellValue.getStringValue());
    								            break;
    										}
    									}
    									if(data21!=null){
    										switch (wevaluator.evaluateInCell(data21).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											//cell21.setCellValue(data21.getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    										//	cell21.setCellValue(data21.getNumericCellValue());
    											break;
    										case Cell.CELL_TYPE_BLANK:
    											break;
    										
    										case Cell.CELL_TYPE_FORMULA: 
    											final CellValue cellValue = wevaluator.evaluate(data21);
    								            break;
    										}
    									}						
    						    	
    								}
    							}							
    						}

    					}
    					else{
    						JSONObject errObj= new JSONObject();
							errObj.put("sheetname", workbook.getSheetName(i));
							sheetList.put(errObj);
    					}
    								
    				}
    			
    			
		            Sheet sh = zbook.getSheet("1"); 
			        if(sh.getSheetName().equalsIgnoreCase("1")){
			        	 for(Row r : sh) { 
				        	if(r!=null && r.getRowNum()>0){
				        		for(Cell c : r) {
				        			if(c.getColumnIndex()==3){
				        				final CellValue cell3Value = evaluator.evaluate(r.getCell(3));
				        				if(cell3Value!=null){
				        					switch (cell3Value.getCellType()) {
				                    	    case Cell.CELL_TYPE_STRING:
				                    	        break;
				                    	    case Cell.CELL_TYPE_NUMERIC:
				                    	    	if(cell3Value.getNumberValue()!=0){
				                    	    		if(cell3Value.getNumberValue()==1){
				    		        					JSONObject obj= new JSONObject();
				    		        					if(r.getCell(0)!=null){
				    		        						switch (r.getCell(1).getCellType()) {
				    				                    	    case Cell.CELL_TYPE_STRING:
				    				                    	    	obj.put("code1", r.getCell(1).getStringCellValue());
				    				                    	        break;
				    				                    	    case Cell.CELL_TYPE_NUMERIC:
				    				                    	    	obj.put("code1", r.getCell(1).getNumericCellValue());
				    				                    	        break;
				    		        						}
				    		        						switch (r.getCell(2).getCellType()) {
				    			                    	    case Cell.CELL_TYPE_STRING:
				    			                    	    	obj.put("code2", r.getCell(2).getStringCellValue());
				    			                    	        break;
				    			                    	    case Cell.CELL_TYPE_NUMERIC:
				    			                    	    	obj.put("code2", r.getCell(2).getNumericCellValue());
				    			                    	        break;
				    			                    	    case Cell.CELL_TYPE_FORMULA:
				    			                    	    	final CellValue cellValue = evaluator.evaluate(r.getCell(2));
				    			                    	    	switch (cellValue.getCellType()) {
				    					                    	    case Cell.CELL_TYPE_STRING:
				    					                    	    	if(cellValue.getStringValue()!=null){
				    					                    	    		obj.put("code2", cellValue.getStringValue());
				    					                    	    	}
				    					                    	    	else{
				    					                    	    		obj.put("code2", "null");
				    					                    	    	}
				    					                    	        break;
				    					                    	    case Cell.CELL_TYPE_NUMERIC:
				    					                    	    	if(cellValue.getNumberValue()!=0){
				    					                    	    		obj.put("code2", cellValue.getNumberValue());
				    					                    	    	}
				    					                    	    	else{
				    					                    	    		obj.put("code2", "null");
				    					                    	    	}
				    					                    	        break;
				    			        						}
				    			                    	        break;
				    		        						}
				    			        					final CellValue cellValue = evaluator.evaluate(r.getCell(3));
				    			        					obj.put("sheet", r.getCell(0).getStringCellValue());
				    			        					switch (cellValue.getCellType()) {
				    				                    	    case Cell.CELL_TYPE_STRING:
				    				                    	    	obj.put("dif", cellValue.getStringValue());
				    				                    	        break;
				    				                    	    case Cell.CELL_TYPE_NUMERIC:
				    				                    	    	obj.put("dif", cellValue.getNumberValue());
				    				                    	        break;
				    		        						}
				    			        					obj.put("dif", cell3Value.getNumberValue());
				    			        					arr1.put(obj);
				    		        					}
				    		        				}
				                    	    	}
				                    	        break;
				        					}
				        				}
				        			}
					            } 
				        	}
				        } 
			        }
    		            
    		        
    				JSONObject robj=new JSONObject();

    				/*if(arr1.length()>0 || arr.length()>0){
    					robj.put("support", false);
    		    		robj.put("excel", false);
    		    		robj.put("diff", arr1);
    		    		robj.put("diff", arr1);
    		    		sheetList
    		    		robj.put("error", arr);
    		    		return robj.toString();
    				}

    				if(errList.length()>0 || sheetList.length()>0 || arr1.length()>0 || errMsg.length()>0 || aldaataiSheet.length()>0){
    					robj.put("prefilter", errList);
    					robj.put("additionalSheet", sheetList);
    					robj.put("formula", errMsg);
    					robj.put("error", arr1);
    					robj.put("naalt", false);
						robj.put("naaltList", aldaataiSheet);
						robj.put("excel", false);
						robj.put("support", false);
    					return  robj.toString();
    				}*/

    				if(errList.length()>0 || sheetList.length()>0 || arr1.length()>0 || arr.length()>0 || sheetList.length()>0){
    					robj.put("prefilter", errList);
    					robj.put("additionalSheet", sheetList);
    					robj.put("formula", arr);
    					robj.put("diff", arr1);
						robj.put("excel", false);
						robj.put("support", false);	
    					return  robj.toString();
    				}
    				
    				if(err.length()==0 && arr1.length()==0){
    					
    					String uuid = UUID.randomUUID().toString()+".xlsx";

    		            if(zbook.getSheet("15.Journal")!=null){
    		            	for(int i=0;i<zbook.getSheet("15.Journal").getLastRowNum()+1;i++){
    							Row currentRow = zbook.getSheet("15.Journal").getRow(i);
    							if(currentRow!=null){
    								if(currentRow.getCell(0)==null){
    									zbook.getSheet("15.Journal").removeRow(currentRow);
    								}
    							}						
    						}
    		            }
    		            if(zbook.getSheet("Journal")!=null){
    		            	for(int i=0;i<zbook.getSheet("Journal").getLastRowNum()+1;i++){
    							Row currentRow = zbook.getSheet("Journal").getRow(i);
    							if(currentRow!=null){
    								if(currentRow.getCell(0)==null){
    									zbook.getSheet("Journal").removeRow(currentRow);
    								}
    							}						
    						}
    		            }
    		      //      zbook.write(fout);
    		    //        fout.close();
    		     //       workbook.write(incfout);
    		    //        incfout.close();
    		          //  fis.close();


    		    		Date d1 = new Date();
    		    		SimpleDateFormat df = new SimpleDateFormat("MM/dd/YYYY HH:mm a");
    		            String formattedDate = df.format(d1);
    		            
    		    		
    		    		robj.put("nyabo", true);    		    		
    		    		robj.put("error", arr);
    				}
    				else{
    					robj.put("support", true);
    		    		robj.put("excel", false);
    		    		robj.put("error", arr);
    				}
    	    		return robj.toString();
    			}    		
    		}
    	    
			return "true";
	}
	
	@PostMapping("/api/nyabo")
	public String nyaboFormUpload(@RequestParam("file") MultipartFile file,Principal pr,HttpServletRequest req) throws IllegalStateException, IOException, NumberFormatException,ParseException, InvalidFormatException, JSONException {
				
			String SAVE_DIR = "upload-dir";
			String furl = File.separator + SAVE_DIR ;
			String filename = file.getOriginalFilename();
    		String newfilename = file.getOriginalFilename();
    		int newindex=newfilename.lastIndexOf('.');
    		String newlastOne=(newfilename.substring(newindex +1));
    	    String newuuid = UUID.randomUUID().toString()+"."+newlastOne;	
    	    //storageService.store(file,pr.getName(),newuuid);
    	    
    	    if(FilenameUtils.getExtension(file.getOriginalFilename()).equalsIgnoreCase("xlsx") || FilenameUtils.getExtension(file.getOriginalFilename()).equalsIgnoreCase("xls")){

            	InputStream stt= file.getInputStream();
            	Workbook workbook = WorkbookFactory.create(stt); 
            	
    			FileInputStream zagwar = null;
    			File files = null;
    			Path currentRelativePath = Paths.get("");
    			String realpath = currentRelativePath.toAbsolutePath().toString();
    			
    			List<FileUpload> fl=(List<FileUpload>) dao.getHQLResult("from FileUpload t where t.autype=1 and t.aan=1 order by t.id desc", "list");
    		
    			
    			JSONObject arr= new JSONObject();
    			JSONObject err= new JSONObject();
    			int count=0;
    			if(fl.size()>0){
    				files = new File(realpath+fl.get(0).getFileurlAdmin());				
    				if(files.exists()){
    					zagwar = new FileInputStream(files);
    				}
    				else{
    					JSONObject robj=new JSONObject();
    					robj.put("support", true);
    		    		robj.put("excel", false);
    		    		robj.put("error", arr);
    		    		robj.put("file", false);
    		    		return robj.toString(); 
    				}
    			}
    			else{
    				JSONObject robj=new JSONObject();
    				robj.put("support", true);
    	    		robj.put("excel", false);
    	    		robj.put("error", arr);
    	    		robj.put("file", false);
    	    		return robj.toString(); 
    			}
    			
    			
    			Workbook zbook = WorkbookFactory.create(zagwar); 
    			JSONArray errList= new JSONArray();
    			JSONArray sheetList= new JSONArray();
    			for(int i=0;i<workbook.getNumberOfSheets()-6;i++){
    				Sheet sht=zbook.getSheet(workbook.getSheetName(i));
    				if(sht!=null){
    					Row drow = workbook.getSheetAt(i).getRow(6);
    					Row zrow = sht.getRow(6);
    					if(workbook.getSheetName(i).equalsIgnoreCase("15.Journal") || workbook.getSheetName(i).equalsIgnoreCase("Journal")){
    						drow = workbook.getSheetAt(i).getRow(3);
    						zrow = sht.getRow(3);
    					}
    					if(workbook.getSheetName(i).equalsIgnoreCase("16.Assets") || workbook.getSheetName(i).equalsIgnoreCase("Assets") 
    							|| workbook.getSheetName(i).equalsIgnoreCase("17.Inventory") || workbook.getSheetName(i).equalsIgnoreCase("19.Budget")){
    						drow = workbook.getSheetAt(i).getRow(4);
    						zrow = sht.getRow(4);
    					}
    					if(workbook.getSheetName(i).equalsIgnoreCase("18.Payroll") || workbook.getSheetName(i).equalsIgnoreCase("Payroll")){
    						drow = workbook.getSheetAt(i).getRow(1);
    						zrow = sht.getRow(1);						 
    					}
    					if(workbook.getSheetName(i).equalsIgnoreCase("12.CTT7") || workbook.getSheetName(i).equalsIgnoreCase("12.CTT7")){
    						drow = workbook.getSheetAt(i).getRow(7);
    						zrow = sht.getRow(7);
    					}
    					if(drow!=null){
    						for(int y=0;y<drow.getLastCellNum();y++){
    							Cell cl = drow.getCell(y);
    							if(zrow!=null){
    								Cell zcl = zrow.getCell(y);
    								if(cl!=null && zcl!=null){		
    									JSONObject errObj= new JSONObject();
    									if(workbook.getSheetName(i).equalsIgnoreCase("2.CT1A") || workbook.getSheetName(i).equalsIgnoreCase("CT1A") ||
    									   workbook.getSheetName(i).equalsIgnoreCase("3.CT2A") || workbook.getSheetName(i).equalsIgnoreCase("CT2A") ||
    									   workbook.getSheetName(i).equalsIgnoreCase("4.CT3A") || workbook.getSheetName(i).equalsIgnoreCase("CT3A") ||
    									   workbook.getSheetName(i).equalsIgnoreCase("5.CT4A") || workbook.getSheetName(i).equalsIgnoreCase("CT4A") ||
    									   workbook.getSheetName(i).equalsIgnoreCase("6.CTT1") || workbook.getSheetName(i).equalsIgnoreCase("7.CTT2") ||
    									   workbook.getSheetName(i).equalsIgnoreCase("8.CTT3") || workbook.getSheetName(i).equalsIgnoreCase("9.CTT4") ||
    									   workbook.getSheetName(i).equalsIgnoreCase("10.CTT5") || workbook.getSheetName(i).equalsIgnoreCase("11.CTT6") ||
    									   workbook.getSheetName(i).equalsIgnoreCase("15.Journal") || workbook.getSheetName(i).equalsIgnoreCase("Journal")){
    										if(!String.valueOf(cl.getRichStringCellValue().getString().trim()).equalsIgnoreCase(String.valueOf(zcl.getRichStringCellValue().getString().trim()))){									
    											errObj.put("sheetname", cl.getSheet().getSheetName());
    											errObj.put("bagana", cl.getRichStringCellValue().getString());
    											errObj.put("bagana2", zcl.getRichStringCellValue().getString());
    											errList.put(errObj);
    										}								
    									}
    								}
    							}												
    						}
    					}
    					else{
    						JSONObject errObj= new JSONObject();
    						errObj.put("sheetname", workbook.getSheetName(i));
    						sheetList.put(errObj);
    						
    					}
    				}
    				else{
    					JSONObject errObj= new JSONObject();
    					errObj.put("sheetname", workbook.getSheetName(i));
    					sheetList.put(errObj);
    				}
    			}
    			
    			
    			JSONArray arr1= new JSONArray();
    			FormulaEvaluator evaluator = zbook.getCreationHelper().createFormulaEvaluator();
    			
    			FormulaEvaluator wevaluator = workbook.getCreationHelper().createFormulaEvaluator();
    			JSONArray aldaataiSheet=new JSONArray();
    	        JSONArray errMsg= new JSONArray();	
    			
    			if(sheetList.length()>0){
    				err.put("additionalSheet", sheetList);
    				err.put("excel", false);
    				err.put("support", false);				
    				return  err.toString();
    			}
    			else{
    				Sheet hch=zbook.getSheet("ЧХ");
    				if(hch!=null){
    					Row row4 = hch.getRow(4);
    					Row row5 = hch.getRow(5);
    					Row row6 = hch.getRow(6);
    					Row row7 = hch.getRow(7);
    					Row row8 = hch.getRow(8);
    					Row row12 = hch.getRow(12);
    					Row row13 = hch.getRow(13);
    					Row row14 = hch.getRow(14);
    					Row row15 = hch.getRow(15);
    					
    					Cell cell41 = row4.getCell(1);
    					Cell cell4 = row4.getCell(2);
    					Cell cell5 = row5.getCell(2);
    					Cell cell6 = row6.getCell(2);
    					Cell cell7 = row7.getCell(2);
    					Cell cell8 = row8.getCell(2);
    					Cell cell12 = row12.getCell(2);
    					Cell cell13 = row13.getCell(2);
    					Cell cell14 = row14.getCell(2);
    					Cell cell15 = row15.getCell(2);
    					
    				}
    				here: for(int i=0;i<workbook.getNumberOfSheets();i++){
    					//FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
    					Sheet sheet = zbook.getSheet(workbook.getSheetAt(i).getSheetName().trim());				
    					FormulaEvaluator evaluatorZbook = zbook.getCreationHelper().createFormulaEvaluator();
    					FormulaEvaluator eval= workbook.getCreationHelper().createFormulaEvaluator();
    					Sheet dataSheet = workbook.getSheetAt(i);
    					if(sheet!=null){
    						System.out.println("sheetname"+sheet.getSheetName());
    						
    						if(sheet.getSheetName().equalsIgnoreCase("23.TRIAL BALANCE")){    									
    							for(int k=5; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								if(row!=null){
    									Cell codeCell = dataSheet.getRow(k).getCell(0);
    									try {
    										if(row.getCell(0)!=null){
            									String str="";
        										switch (eval.evaluateInCell(row.getCell(0)).getCellType()) 
        										{
        										case Cell.CELL_TYPE_STRING:
        											str=row.getCell(0).getStringCellValue();
        											break;
        										case Cell.CELL_TYPE_NUMERIC:
        											str=String.valueOf(row.getCell(0).getNumericCellValue());
        											break;
        										}
        										if(str.length()>0){
        											String formula="value("+str+")";
        											codeCell.setCellFormula(formula);  
        											CellValue cellValue = eval.evaluate(codeCell);    	
        										}											
        									}
    									}
    									catch (FormulaParseException e) {
    										JSONObject errObject = new JSONObject();
    										errObject.put("sheet", sheet.getSheetName());
    										errObject.put("error", e.getMessage());
									    }
    									for(int y=0;y<10;y++){		
    										Cell ss = dataSheet.getRow(0).createCell(100+y);
    										int cc=y+3;
    										
    										String formula="VLOOKUP("+crow.getCell(0).getNumericCellValue()+",A6:L600,"+cc+",FALSE)";
    										ss.setCellFormula(formula);    										
    										Cell zcell =crow.getCell(cc-1);
    										CellValue cellValue = eval.evaluate(ss);    	
    										if(cellValue.getNumberValue()!=0){
    											zcell.setCellValue(cellValue.getNumberValue());    	 
    										}    										
    									}
    								}    								
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("2.CT1A")){    									
    							for(int k=7; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								
    								
    								if(row!=null){
    									if(row.getCell(0)!=null){
        									Cell codeCell = dataSheet.getRow(k).getCell(0);
        									try {
        										if(row.getCell(0)!=null){
                									String str="";
            										switch (eval.evaluateInCell(row.getCell(0)).getCellType()) 
            										{
            										case Cell.CELL_TYPE_STRING:
            											str=row.getCell(0).getStringCellValue();
            											break;
            										case Cell.CELL_TYPE_NUMERIC:
            											str=String.valueOf(row.getCell(0).getNumericCellValue());
            											break;
            										}
            										if(str.length()>0){
            											String formula="value("+str+")";
            											codeCell.setCellFormula(formula);  
            											CellValue cellValue = eval.evaluate(codeCell);    	
            										}											
            									}
        									}
        									catch (FormulaParseException e) {
        										JSONObject errObject = new JSONObject();
        										errObject.put("sheet", sheet.getSheetName());
        										errObject.put("error", e.getMessage());
        										errMsg.put(errObject);
    									    }											
    									}
    								}
    								
    								if(row!=null){
    									for(int y=0;y<3;y++){		
    										Cell ss = dataSheet.getRow(0).createCell(100+y);
    										int cc=y+3;
    										String str="";
    										if(row.getCell(0)!=null){
    											switch (evaluator.evaluateInCell(crow.getCell(0)).getCellType()) 
    											{
    											case Cell.CELL_TYPE_STRING:
    												str=crow.getCell(0).getStringCellValue();
    												break;
    											case Cell.CELL_TYPE_NUMERIC:
    												str=String.valueOf(crow.getCell(0).getNumericCellValue());
    												break;
    											}
    											if(str.length()>0){
    												String formula="VLOOKUP("+str+",A8:D300,"+cc+",FALSE)";
    												ss.setCellFormula(formula);    										
    												Cell zcell =crow.getCell(cc-1);
    												CellValue cellValue = eval.evaluate(ss);    	
    												if(cellValue.getNumberValue()!=0){
    													zcell.setCellValue(cellValue.getNumberValue());    	 
    												} 
    											}											
    										}										   										
    									}
    								}									
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("3.CT2A")){    									
    							for(int k=7; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								if(row!=null){
    									Cell codeCell = dataSheet.getRow(k).getCell(0);
    									try {
    										if(row.getCell(0)!=null){
            									String str="";
        										switch (eval.evaluateInCell(row.getCell(0)).getCellType()) 
        										{
        										case Cell.CELL_TYPE_STRING:
        											str=row.getCell(0).getStringCellValue();
        											break;
        										case Cell.CELL_TYPE_NUMERIC:
        											str=String.valueOf(row.getCell(0).getNumericCellValue());
        											break;
        										}
        										if(str.length()>0){
        											String formula="value("+str+")";
        											codeCell.setCellFormula(formula);  
        											CellValue cellValue = eval.evaluate(codeCell);    	
        										}											
        									}
    									}
    									catch (FormulaParseException e) {
    										JSONObject errObject = new JSONObject();
    										errObject.put("sheet", sheet.getSheetName());
    										errObject.put("error", e.getMessage());
    										errMsg.put(errObject);
									    }
    									for(int y=0;y<3;y++){		
    										Cell ss = dataSheet.getRow(0).createCell(100+y);
    										int cc=y+3;
    										String str="";
    										if(row.getCell(0)!=null){
    											switch (evaluator.evaluateInCell(crow.getCell(0)).getCellType()) 
    											{
    											case Cell.CELL_TYPE_STRING:
    												str=crow.getCell(0).getStringCellValue();
    												break;
    											case Cell.CELL_TYPE_NUMERIC:
    												str=String.valueOf(crow.getCell(0).getNumericCellValue());
    												break;
    											}
    											if(str.length()>0){
    												String formula="VLOOKUP("+str+",A8:D300,"+cc+",FALSE)";
    												ss.setCellFormula(formula);    										
    												Cell zcell =crow.getCell(cc-1);
    												CellValue cellValue = eval.evaluate(ss);    	
    												if(cellValue.getNumberValue()!=0){
    													zcell.setCellValue(cellValue.getNumberValue());    	 
    												} 
    											}											
    										}										   										
    									}
    								}    								
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("4.CT3A")){    									
    							for(int k=7; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								if(row!=null){
    									Cell codeCell = dataSheet.getRow(k).getCell(0);
    									try {
    										if(row.getCell(0)!=null){
            									String str="";
        										switch (eval.evaluateInCell(row.getCell(0)).getCellType()) 
        										{
        										case Cell.CELL_TYPE_STRING:
        											str=row.getCell(0).getStringCellValue();
        											break;
        										case Cell.CELL_TYPE_NUMERIC:
        											str=String.valueOf(row.getCell(0).getNumericCellValue());
        											break;
        										}
        										if(str.length()>0){
        											String formula="value("+str+")";
        											codeCell.setCellFormula(formula);  
        											CellValue cellValue = eval.evaluate(codeCell);    	
        										}											
        									}
    									}
    									catch (FormulaParseException e) {
    										JSONObject errObject = new JSONObject();
    										errObject.put("sheet", sheet.getSheetName());
    										errObject.put("error", e.getMessage());
    										errMsg.put(errObject);
									    }
    									for(int y=0;y<3;y++){		
    										Cell ss = dataSheet.getRow(0).createCell(100+y);
    										int cc=y+3;
    										String str="";
    										if(row.getCell(0)!=null){
    											switch (evaluator.evaluateInCell(crow.getCell(0)).getCellType()) 
    											{
    											case Cell.CELL_TYPE_STRING:
    												str=crow.getCell(0).getStringCellValue();
    												break;
    											case Cell.CELL_TYPE_NUMERIC:
    												str=String.valueOf(crow.getCell(0).getNumericCellValue());
    												break;
    											}
    											if(str.length()>0){
    												String formula="VLOOKUP("+str+",A8:D350,"+cc+",FALSE)";
    												ss.setCellFormula(formula);    										
    												Cell zcell =crow.getCell(cc-1);
    												CellValue cellValue = eval.evaluate(ss);    	
    												if(cellValue.getNumberValue()!=0){
    													zcell.setCellValue(cellValue.getNumberValue());    	 
    												} 
    											}											
    										}										   										
    									}
    								}    								
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("5.CT4A")){    									
    							for(int k=7; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow= sheet.getRow(k);
    								if(row!=null){
    									Cell codeCell = dataSheet.getRow(k).getCell(0);
    									if(codeCell!=null){
    										switch (evaluator.evaluateInCell(codeCell).getCellType()) 
											{
											case Cell.CELL_TYPE_STRING:
												if(codeCell.getStringCellValue().equalsIgnoreCase("C01")){
	        										crow= sheet.getRow(7);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("C02")){
	        										crow= sheet.getRow(8);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("C03")){
	        										crow= sheet.getRow(9);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("C04")){
	        										crow= sheet.getRow(10);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("C05")){
	        										crow= sheet.getRow(11);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("C06")){
	        										crow= sheet.getRow(12);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("C07")){
	        										crow= sheet.getRow(13);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("C08")){
	        										crow= sheet.getRow(14);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("D01")){
	        										crow= sheet.getRow(15);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("D02")){
	        										crow= sheet.getRow(16);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("D03")){
	        										crow= sheet.getRow(17);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("D04")){
	        										crow= sheet.getRow(18);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("D05")){
	        										crow= sheet.getRow(19);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("D06")){
	        										crow= sheet.getRow(20);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("D07")){
	        										crow= sheet.getRow(21);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("D08")){
	        										crow= sheet.getRow(22);
	        									}
	        									if(codeCell.getStringCellValue().equalsIgnoreCase("D09")){
	        										crow= sheet.getRow(23);
	        									}
												break;        									
											}
    									}
        								/*if(row.getCell(0)!=null){
        									String str="";
    										switch (eval.evaluateInCell(row.getCell(0)).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											str=row.getCell(0).getStringCellValue();
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											str=String.valueOf(row.getCell(0).getNumericCellValue());
    											break;
    										}
    										if(str.length()>0){
    											String formula="value("+str+")";
    											codeCell.setCellFormula(formula);  
    											CellValue cellValue = eval.evaluate(codeCell);    	
    										}											
    									}*/
    									for(int y=0;y<4;y++){		
    										Cell ss = dataSheet.getRow(0).createCell(100+y);
    										int cc=y+3;
    										String str="";
    										if(row.getCell(0)!=null){
    											switch (evaluator.evaluateInCell(crow.getCell(0)).getCellType()) 
    											{
    											case Cell.CELL_TYPE_STRING:
    												str=crow.getCell(0).getStringCellValue();
    												break;
    											case Cell.CELL_TYPE_NUMERIC:
    												str=String.valueOf(crow.getCell(0).getNumericCellValue());
    												break;
    											}
    											int r=k+1;
    											if(str.length()>0){
    												String formula="VLOOKUP(A"+r+",A8:G30,"+cc+",FALSE)";
    												ss.setCellFormula(formula);    	
    												System.out.println("#"+formula);
    												Cell zcell =crow.getCell(cc-1);
    												CellValue cellValue = eval.evaluate(ss);    	
    												if(cellValue.getNumberValue()!=0){
    													zcell.setCellValue(cellValue.getNumberValue());    	 
    												} 
    											}											
    										}										   										
    									}
    								}    								
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("6.CTT1")){    									
    							for(int k=7; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								if(row!=null){
    									if(row.getCell(0)!=null){
        									Cell codeCell = dataSheet.getRow(k).getCell(0);
        									try {
        										if(row.getCell(0)!=null){
                									String str="";
            										switch (eval.evaluateInCell(row.getCell(0)).getCellType()) 
            										{
            										case Cell.CELL_TYPE_STRING:
            											str=row.getCell(0).getStringCellValue();
            											break;
            										case Cell.CELL_TYPE_NUMERIC:
            											str=String.valueOf(row.getCell(0).getNumericCellValue());
            											break;
            										}
            										if(str.length()>0){
            											String formula="value("+str+")";
            											codeCell.setCellFormula(formula);  
            											CellValue cellValue = eval.evaluate(codeCell);    	
            										}											
            									}
        									}
        									catch (FormulaParseException e) {
        										JSONObject errObject = new JSONObject();
        										errObject.put("sheet", sheet.getSheetName());
        										errObject.put("error", e.getMessage());
        										errMsg.put(errObject);
    									    }										
    									}
    									if(crow!=null){
    										for(int y=0;y<6;y++){		
        										Cell ss = dataSheet.getRow(0).createCell(100+y);
        										int cc=y+3;
        										String str="";
        										if(row.getCell(0)!=null && crow.getCell(0)!=null){
        											switch (evaluator.evaluateInCell(crow.getCell(0)).getCellType()) 
        											{
        											case Cell.CELL_TYPE_STRING:
        												str=crow.getCell(0).getStringCellValue();
        												break;
        											case Cell.CELL_TYPE_NUMERIC:
        												str=String.valueOf(crow.getCell(0).getNumericCellValue());
        												break;
        											}
        											if(str.length()>0){
        												String formula="VLOOKUP("+str+",A8:F30,"+cc+",FALSE)";
        												ss.setCellFormula(formula);    										
        												Cell zcell =crow.getCell(cc-1);
        												CellValue cellValue = eval.evaluate(ss);    	
        												if(cellValue.getNumberValue()!=0){
        													zcell.setCellValue(cellValue.getNumberValue());    	 
        												} 
        											}											
        										}										   										
        									}
    									}    								
    								}									
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("7.CTT2")){    									
    							for(int k=7; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);    								
    								if(row!=null){
    									Cell codeCell = dataSheet.getRow(k).getCell(0);
    									try {
    										if(row.getCell(0)!=null){
            									String str="";
        										switch (eval.evaluateInCell(row.getCell(0)).getCellType()) 
        										{
        										case Cell.CELL_TYPE_STRING:
        											str=row.getCell(0).getStringCellValue();
        											break;
        										case Cell.CELL_TYPE_NUMERIC:
        											str=String.valueOf(row.getCell(0).getNumericCellValue());
        											break;
        										}
        										if(str.length()>0){
        											String formula="value("+str+")";
        											codeCell.setCellFormula(formula);  
        											CellValue cellValue = eval.evaluate(codeCell);    	
        										}											
        									}
    									}
    									catch (FormulaParseException e) {
    										JSONObject errObject = new JSONObject();
    										errObject.put("sheet", sheet.getSheetName());
    										errObject.put("error", e.getMessage());
    										errMsg.put(errObject);
									    }
    									for(int y=0;y<6;y++){		
    										Cell ss = dataSheet.getRow(0).createCell(100+y);
    										int cc=y+3;
    										String str="";
    										if(row.getCell(0)!=null){
    											switch (evaluator.evaluateInCell(crow.getCell(0)).getCellType()) 
    											{
    											case Cell.CELL_TYPE_STRING:
    												str=crow.getCell(0).getStringCellValue();
    												break;
    											case Cell.CELL_TYPE_NUMERIC:
    												str=String.valueOf(crow.getCell(0).getNumericCellValue());
    												break;
    											}
    											if(str.length()>0){
    												String formula="VLOOKUP("+str+",A8:F12,"+cc+",FALSE)";
    												ss.setCellFormula(formula);    										
    												Cell zcell =crow.getCell(cc-1);
    												CellValue cellValue = eval.evaluate(ss);    	
    												if(cellValue.getNumberValue()!=0){
    													zcell.setCellValue(cellValue.getNumberValue());    	 
    												} 
    											}											
    										}										   										
    									}
    								}									
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("8.CTT3")){    									
    							for(int k=7; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);    								
    								if(row!=null){
    									Cell codeCell = dataSheet.getRow(k).getCell(0);
    									try {
    										if(row.getCell(0)!=null){
            									String str="";
        										switch (eval.evaluateInCell(row.getCell(0)).getCellType()) 
        										{
        										case Cell.CELL_TYPE_STRING:
        											str=row.getCell(0).getStringCellValue();
        											break;
        										case Cell.CELL_TYPE_NUMERIC:
        											str=String.valueOf(row.getCell(0).getNumericCellValue());
        											break;
        										}
        										if(str.length()>0){
        											String formula="value("+str+")";
        											codeCell.setCellFormula(formula);  
        											CellValue cellValue = eval.evaluate(codeCell);    	
        										}											
        									}
    									}
    									catch (FormulaParseException e) {
    										JSONObject errObject = new JSONObject();
    										errObject.put("sheet", sheet.getSheetName());
    										errObject.put("error", e.getMessage());
    										errMsg.put(errObject);
									    }
        								if(crow!=null){
        									for(int y=0;y<6;y++){		
        										Cell ss = dataSheet.getRow(0).createCell(100+y);
        										int cc=y+3;
        										String str="";
        										if(row.getCell(0)!=null && crow.getCell(0)!=null){
        											switch (evaluator.evaluateInCell(crow.getCell(0)).getCellType()) 
        											{
        											case Cell.CELL_TYPE_STRING:
        												str=crow.getCell(0).getStringCellValue();
        												break;
        											case Cell.CELL_TYPE_NUMERIC:
        												str=String.valueOf(crow.getCell(0).getNumericCellValue());
        												break;
        											}
        											if(str.length()>0){
        												String formula="VLOOKUP("+str+",A8:F45,"+cc+",FALSE)";
        												ss.setCellFormula(formula);    										
        												Cell zcell =crow.getCell(cc-1);
        												CellValue cellValue = eval.evaluate(ss);    	
        												if(cellValue.getNumberValue()!=0){
        													zcell.setCellValue(cellValue.getNumberValue());    	 
        												} 
        											}											
        										}										   										
        									}
        								}
    									
    								}									
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("9.CTT4")){    									
    							for(int k=7; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    							
    								if(row!=null){
    									Cell codeCell = dataSheet.getRow(k).getCell(0);
    									try {
    										if(row.getCell(0)!=null){
            									String str="";
        										switch (eval.evaluateInCell(row.getCell(0)).getCellType()) 
        										{
        										case Cell.CELL_TYPE_STRING:
        											str=row.getCell(0).getStringCellValue();
        											break;
        										case Cell.CELL_TYPE_NUMERIC:
        											str=String.valueOf(row.getCell(0).getNumericCellValue());
        											break;
        										}
        										if(str.length()>0){
        											String formula="value("+str+")";
        											codeCell.setCellFormula(formula);  
        											CellValue cellValue = eval.evaluate(codeCell);    	
        										}											
        									}
    									}
    									catch (FormulaParseException e) {
    										JSONObject errObject = new JSONObject();
    										errObject.put("sheet", sheet.getSheetName());
    										errObject.put("error", e.getMessage());
    										errMsg.put(errObject);
									    }
    									for(int y=0;y<6;y++){		
    										Cell ss = dataSheet.getRow(0).createCell(100+y);
    										int cc=y+3;
    										String str="";
    										if(row.getCell(0)!=null){
    											switch (evaluator.evaluateInCell(crow.getCell(0)).getCellType()) 
    											{
    											case Cell.CELL_TYPE_STRING:
    												str=crow.getCell(0).getStringCellValue();
    												break;
    											case Cell.CELL_TYPE_NUMERIC:
    												str=String.valueOf(crow.getCell(0).getNumericCellValue());
    												break;
    											}
    											if(str.length()>0){
    												String formula="VLOOKUP("+str+",A8:F20,"+cc+",FALSE)";
    												ss.setCellFormula(formula);    										
    												Cell zcell =crow.getCell(cc-1);
    												CellValue cellValue = eval.evaluate(ss);    	
    												if(cellValue.getNumberValue()!=0){
    													zcell.setCellValue(cellValue.getNumberValue());    	 
    												} 
    											}											
    										}										   										
    									}
    								}									
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("10.CTT5")){    									
    							for(int k=7; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    							
    								if(row!=null){
    									Cell codeCell = dataSheet.getRow(k).getCell(0);
    									try {
    										if(row.getCell(0)!=null){
            									String str="";
        										switch (eval.evaluateInCell(row.getCell(0)).getCellType()) 
        										{
        										case Cell.CELL_TYPE_STRING:
        											str=row.getCell(0).getStringCellValue();
        											break;
        										case Cell.CELL_TYPE_NUMERIC:
        											str=String.valueOf(row.getCell(0).getNumericCellValue());
        											break;
        										}
        										if(str.length()>0){
        											String formula="value("+str+")";
        											codeCell.setCellFormula(formula);  
        											CellValue cellValue = eval.evaluate(codeCell);    	
        										}											
        									}
    									}
    									catch (FormulaParseException e) {
    										JSONObject errObject = new JSONObject();
    										errObject.put("sheet", sheet.getSheetName());
    										errObject.put("error", e.getMessage());
    										errMsg.put(errObject);
									    }
    									for(int y=0;y<14;y++){		
    										Cell ss = dataSheet.getRow(0).createCell(100+y);
    										int cc=y+3;
    										String str="";
    										if(row.getCell(0)!=null){
    											switch (evaluator.evaluateInCell(crow.getCell(0)).getCellType()) 
    											{
    											case Cell.CELL_TYPE_STRING:
    												str=crow.getCell(0).getStringCellValue();
    												break;
    											case Cell.CELL_TYPE_NUMERIC:
    												str=String.valueOf(crow.getCell(0).getNumericCellValue());
    												break;
    											}
    											if(str.length()>0){
    												String formula="VLOOKUP("+str+",A8:Q25,"+cc+",FALSE)";
    												ss.setCellFormula(formula);    										
    												Cell zcell =crow.getCell(cc-1);
    												CellValue cellValue = eval.evaluate(ss);    	
    												if(cellValue.getNumberValue()!=0){
    													zcell.setCellValue(cellValue.getNumberValue());    	 
    												} 
    											}											
    										}										   										
    									}
    								}									
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("11.CTT6")){    									
    							for(int k=7; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);
    								
    								if(row!=null){
    									Cell codeCell = dataSheet.getRow(k).getCell(0);
    									try {
    										if(row.getCell(0)!=null){
            									String str="";
        										switch (eval.evaluateInCell(row.getCell(0)).getCellType()) 
        										{
        										case Cell.CELL_TYPE_STRING:
        											str=row.getCell(0).getStringCellValue();
        											break;
        										case Cell.CELL_TYPE_NUMERIC:
        											str=String.valueOf(row.getCell(0).getNumericCellValue());
        											break;
        										}
        										if(str.length()>0){
        											String formula="value("+str+")";
        											codeCell.setCellFormula(formula);  
        											CellValue cellValue = eval.evaluate(codeCell);    	
        										}											
        									}
    									}
    									catch (FormulaParseException e) {
    										JSONObject errObject = new JSONObject();
    										errObject.put("sheet", sheet.getSheetName());
    										errObject.put("error", e.getMessage());
    										errMsg.put(errObject);
									    }
    									for(int y=0;y<6;y++){		
    										Cell ss = dataSheet.getRow(0).createCell(100+y);
    										int cc=y+3;
    										String str="";
    										if(row.getCell(0)!=null){
    											switch (evaluator.evaluateInCell(crow.getCell(0)).getCellType()) 
    											{
    											case Cell.CELL_TYPE_STRING:
    												str=crow.getCell(0).getStringCellValue();
    												break;
    											case Cell.CELL_TYPE_NUMERIC:
    												str=String.valueOf(crow.getCell(0).getNumericCellValue());
    												break;
    											}
    											if(str.length()>0){
    												String formula="VLOOKUP("+str+",A8:F30,"+cc+",FALSE)";
    												ss.setCellFormula(formula);    										
    												Cell zcell =crow.getCell(cc-1);
    												CellValue cellValue = eval.evaluate(ss);    	
    												if(cellValue.getNumberValue()!=0){
    													zcell.setCellValue(cellValue.getNumberValue());    	 
    												} 
    											}											
    										}										   										
    									}
    								}									
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("12.CTT7")){    									
    							for(int k=9; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);    							
    								if(row!=null){
    									
    									Cell codeCell = dataSheet.getRow(k).getCell(0);
    									try {
    										if(row.getCell(0)!=null){
            									String str="";
        										switch (eval.evaluateInCell(row.getCell(0)).getCellType()) 
        										{
        										case Cell.CELL_TYPE_STRING:
        											str=row.getCell(0).getStringCellValue();
        											break;
        										case Cell.CELL_TYPE_NUMERIC:
        											str=String.valueOf(row.getCell(0).getNumericCellValue());
        											break;
        										}
        										if(str.length()>0){
        											String formula="value("+str+")";
        											codeCell.setCellFormula(formula);  
        											CellValue cellValue = eval.evaluate(codeCell);    	
        										}											
        									}
    									}
    									catch (FormulaParseException e) {
    										JSONObject errObject = new JSONObject();
    										errObject.put("sheet", sheet.getSheetName());
    										errObject.put("error", e.getMessage());
    										errMsg.put(errObject);
									    }
										for(int y=0;y<13;y++){		
    										Cell ss = dataSheet.getRow(k).createCell(100+y);
    										int cc=y+3;
    										String str="";
    										if(row.getCell(0)!=null){
    											switch (evaluator.evaluateInCell(crow.getCell(0)).getCellType()) 
    											{
    											case Cell.CELL_TYPE_STRING:
    												str=crow.getCell(0).getStringCellValue();
    												break;
    											case Cell.CELL_TYPE_NUMERIC:
    												str=String.valueOf(crow.getCell(0).getNumericCellValue());
    												break;
    											}
    											if(str.length()>0){
    												String formula="VLOOKUP("+str+",A8:P40,"+cc+",FALSE)";
    												ss.setCellFormula(formula);    										
    												Cell zcell =crow.getCell(cc-1);
    												CellValue cellValue = eval.evaluate(ss);    	
    												if(cellValue.getNumberValue()!=0){
    													zcell.setCellValue(cellValue.getNumberValue());    	 
    												} 
    											}											
    										}										   										
    									}   									
    								}									
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("13.CTT8")){    									
    							for(int k=7; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);    							
    								if(row!=null && crow!=null){
    									Cell codeCell = dataSheet.getRow(k).getCell(0);
    									try {
    										if(row.getCell(0)!=null){
            									String str="";
        										switch (eval.evaluateInCell(row.getCell(0)).getCellType()) 
        										{
        										case Cell.CELL_TYPE_STRING:
        											str=row.getCell(0).getStringCellValue();
        											break;
        										case Cell.CELL_TYPE_NUMERIC:
        											str=String.valueOf(row.getCell(0).getNumericCellValue());
        											break;
        										}
        										if(str.length()>0){
        											String formula="value("+str+")";
        											codeCell.setCellFormula(formula);  
        											CellValue cellValue = eval.evaluate(codeCell);    	
        										}											
        									}
    									}
    									catch (FormulaParseException e) {
    										JSONObject errObject = new JSONObject();
    										errObject.put("sheet", sheet.getSheetName());
    										errObject.put("error", e.getMessage());
    										errMsg.put(errObject);
									    }
        								
    									for(int y=0;y<6;y++){		
    										Cell ss = dataSheet.getRow(0).createCell(100+y);
    										int cc=y+3;
    										String str="";
    										if(row.getCell(0)!=null && crow.getCell(0)!=null){
    											switch (evaluator.evaluateInCell(crow.getCell(0)).getCellType()) 
    											{
    											case Cell.CELL_TYPE_STRING:
    												str=crow.getCell(0).getStringCellValue();
    												break;
    											case Cell.CELL_TYPE_NUMERIC:
    												str=String.valueOf(crow.getCell(0).getNumericCellValue());
    												break;
    											}
    											if(str.length()>0){
    												String formula="VLOOKUP("+str+",A8:F70,"+cc+",FALSE)";
    												ss.setCellFormula(formula);    										
    												Cell zcell =crow.getCell(cc-1);
    												CellValue cellValue = eval.evaluate(ss);    	
    												if(cellValue.getNumberValue()!=0){
    													zcell.setCellValue(cellValue.getNumberValue());    	 
    												} 
    											}											
    										}										   										
    									}
    								}									
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("14.CTT9")){    									
    							for(int k=7; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);    							
    								if(row!=null){
    									Cell codeCell = dataSheet.getRow(k).getCell(0);
    									try {
    										if(row.getCell(0)!=null){
            									String str="";
        										switch (eval.evaluateInCell(row.getCell(0)).getCellType()) 
        										{
        										case Cell.CELL_TYPE_STRING:
        											str=row.getCell(0).getStringCellValue();
        											break;
        										case Cell.CELL_TYPE_NUMERIC:
        											str=String.valueOf(row.getCell(0).getNumericCellValue());
        											break;
        										}
        										if(str.length()>0){
        											String formula="value("+str+")";
        											codeCell.setCellFormula(formula);  
        											CellValue cellValue = eval.evaluate(codeCell);    	
        										}											
        									}
    									}
    									catch (FormulaParseException e) {
    										JSONObject errObject = new JSONObject();
    										errObject.put("sheet", sheet.getSheetName());
    										errObject.put("error", e.getMessage());
    										errMsg.put(errObject);
									    }
    									for(int y=0;y<6;y++){		
    										Cell ss = dataSheet.getRow(0).createCell(100+y);
    										int cc=y+3;
    										String str="";
    										if(row.getCell(0)!=null){
    											switch (evaluator.evaluateInCell(crow.getCell(0)).getCellType()) 
    											{
    											case Cell.CELL_TYPE_STRING:
    												str=crow.getCell(0).getStringCellValue();
    												break;
    											case Cell.CELL_TYPE_NUMERIC:
    												str=String.valueOf(crow.getCell(0).getNumericCellValue());
    												break;
    											}
    											if(str.length()>0){
    												String formula="VLOOKUP("+str+",A8:F40,"+cc+",FALSE)";
    												ss.setCellFormula(formula);    										
    												Cell zcell =crow.getCell(cc-1);
    												CellValue cellValue = eval.evaluate(ss);    	
    												if(cellValue.getNumberValue()!=0){
    													zcell.setCellValue(cellValue.getNumberValue());    	 
    												} 
    											}											
    										}										   										
    									}
    								}									
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("19.Budget")){    									
    							for(int k=7; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);    							
    								if(row!=null){
    									Cell codeCell = dataSheet.getRow(k).getCell(2);
        								/*if(row.getCell(2)!=null){
        									int str=0;
    										switch (evaluator.evaluateInCell(row.getCell(2)).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											str=Integer.parseInt(row.getCell(2).getStringCellValue());
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											str=(int) row.getCell(2).getNumericCellValue();
    											break;
    										}
    										if(str>0){
    											String formula="value("+str+")";
    											codeCell.setCellFormula(formula);  
    											CellValue cellValue = eval.evaluate(codeCell);    	
    										}											
    									}*/
    									/*for(int y=0;y<14;y++){		
    										Cell ss = dataSheet.getRow(0).createCell(100+y);
    										int cc=y+3;
    										String str="";
    										if(row.getCell(2)!=null){
    											switch (evaluator.evaluateInCell(crow.getCell(2)).getCellType()) 
    											{
    											case Cell.CELL_TYPE_STRING:
    												str=crow.getCell(2).getStringCellValue();
    												break;
    											case Cell.CELL_TYPE_NUMERIC:
    												str=String.valueOf(crow.getCell(2).getNumericCellValue());
    												break;
    											}
    											if(str.length()>0){
    												String formula="VLOOKUP("+str+",A8:Q120,"+cc+",FALSE)";
    												ss.setCellFormula(formula);    										
    												Cell zcell =crow.getCell(cc-1);
    												CellValue cellValue = eval.evaluate(ss);    	
    												if(cellValue.getNumberValue()!=0){
    													zcell.setCellValue(cellValue.getNumberValue());    	 
    												} 
    											}											
    										}										   										
    									}*/
    								}									
    							}
    						}
    						if(sheet.getSheetName().equalsIgnoreCase("20.TGT1")){    									
    							for(int k=7; k <= sheet.getLastRowNum();k++){
    								Row row = dataSheet.getRow(k);
    								Row crow = sheet.getRow(k);    								
    								if(row!=null){
    									Cell codeCell = dataSheet.getRow(k).getCell(2);
        								if(row.getCell(2)!=null){
        									String str="";
    										switch (evaluator.evaluateInCell(row.getCell(2)).getCellType()) 
    										{
    										case Cell.CELL_TYPE_STRING:
    											str=row.getCell(2).getStringCellValue();
    											break;
    										case Cell.CELL_TYPE_NUMERIC:
    											str=String.valueOf(row.getCell(2).getNumericCellValue());
    											break;
    										}
    										if(str.length()>0){
    											String formula="value("+str+")";
    											codeCell.setCellFormula(formula);  
    											CellValue cellValue = eval.evaluate(codeCell);    	
    										}											
    									}
    									for(int y=0;y<6;y++){		
    										Cell ss = dataSheet.getRow(0).createCell(100+y);
    										int cc=y+3;
    										String str="";
    										if(row.getCell(2)!=null){
    											switch (evaluator.evaluateInCell(crow.getCell(2)).getCellType()) 
    											{
    											case Cell.CELL_TYPE_STRING:
    												str=crow.getCell(2).getStringCellValue();
    												break;
    											case Cell.CELL_TYPE_NUMERIC:
    												str=String.valueOf(crow.getCell(2).getNumericCellValue());
    												break;
    											}
    											if(str.length()>0){
    												String formula="VLOOKUP("+str+",C8:H200,"+cc+",FALSE)";
    												ss.setCellFormula(formula);    										
    												Cell zcell =crow.getCell(cc+1);
    												CellValue cellValue = eval.evaluate(ss);    	
    												if(cellValue.getNumberValue()!=0){
    													zcell.setCellValue(cellValue.getNumberValue());    	 
    												} 
    											}											
    										}										   										
    									}
    								}									
    							}
    						}    	
    						
    						
    						
    						
    						if(sheet!=null && dataSheet.getSheetName().trim().equals("1.Info") || sheet!=null && dataSheet.getSheetName().trim().equals("16.Assets") 
    								|| sheet!=null && dataSheet.getSheetName().trim().equals("15.Journal") || sheet!=null && dataSheet.getSheetName().trim().equals("Journal")
    								|| sheet!=null && dataSheet.getSheetName().trim().equals("17.Inventory") || sheet!=null && dataSheet.getSheetName().trim().equals("18.Payroll")
    								|| sheet!=null && dataSheet.getSheetName().trim().equals("19.Budget") 
    								|| sheet!=null && dataSheet.getSheetName().trim().equals("21.TGT1A") || sheet!=null && dataSheet.getSheetName().trim().equals("22.NT2")
    								|| sheet!=null && dataSheet.getSheetName().trim().equals("23.TRIAL BALANCE") || sheet!=null && dataSheet.getSheetName().trim().equals("24.ABWS")
    								|| sheet!=null && dataSheet.getSheetName().trim().equals("25.CBWS")){

								for(int kk=2;kk<dataSheet.getLastRowNum()+1;kk++){
									Row currentRow= dataSheet.getRow(kk);	
									if(currentRow!=null){
										if(currentRow.getCell(0)!=null){											
											Row r = dataSheet.getRow(kk);	
											Row dr=null;
											if(sheet.getRow(kk)!=null){
												dr=sheet.getRow(kk);
											}
											else{
												dr=sheet.createRow(kk);
											}
											for (int p = 0; p < 60; p++) {
							                    Cell columnHeaderCell =null;
							                    if(sheet.getRow(kk).getCell(p)!=null){
							                    	columnHeaderCell = sheet.getRow(kk).getCell(p);
							                    }
							                    else{
							                    	columnHeaderCell = sheet.getRow(kk).createCell(p);
							                    }
							                    try{
							                    	if(currentRow.getCell(p)!=null){
							                    	    switch (wevaluator.evaluateInCell(currentRow.getCell(p)).getCellType()) 
														{
														case Cell.CELL_TYPE_STRING:
															columnHeaderCell.setCellValue(currentRow.getCell(p).getStringCellValue());
															break;
														case Cell.CELL_TYPE_NUMERIC:
															columnHeaderCell.setCellValue(currentRow.getCell(p).getNumericCellValue());
															break;
									                    case Cell.CELL_TYPE_FORMULA:
									                    	final CellValue cellValue = evaluator.evaluate(currentRow.getCell(p));
									                    	columnHeaderCell.setCellValue(String.valueOf(cellValue.getNumberValue()));
												            break;
														}
								                    }
							                    }
							                    catch(RuntimeException e){
							                    	JSONObject aldaa=new JSONObject();
							                    	aldaa.put("rowIndex", currentRow.getCell(p).getRowIndex()+1);
							                    	aldaa.put("columnIndex", currentRow.getCell(p).getColumnIndex()+1);
							                    	aldaa.put("sheetname", workbook.getSheetAt(i).getSheetName().trim());
							                    	aldaataiSheet.put(aldaa);
							                    }								                    
							                    					                   
							                }
										}
									}	
								}							
							}
    					}
    					else{
	                    	
    						JSONObject errObj= new JSONObject();
    						errObj.put("sheetname", workbook.getSheetName(i));
    						sheetList.put(errObj);
    					}
    								
    				
    				}
    				
    			
    				
    				JSONArray arr3 = new JSONArray();
    				
    				Sheet sh = zbook.getSheet("3"); 
			        if(sh.getSheetName().equalsIgnoreCase("3")){
			        	 for(Row r : sh) { 
				        	if(r!=null && r.getRowNum()>0){
				        		for(Cell c : r) {
				        			if(c.getColumnIndex()==7){
				        				final CellValue cell3Value = evaluator.evaluate(r.getCell(7));
				        				if(cell3Value!=null){
				        					switch (cell3Value.getCellType()) {
				                    	    case Cell.CELL_TYPE_STRING:
				                    	        break;
				                    	    case Cell.CELL_TYPE_NUMERIC:
				                    	    	if(cell3Value.getNumberValue()!=0){
				    		        					JSONObject obj= new JSONObject();
				    		        					if(r.getCell(0)!=null){
				    		        						switch (r.getCell(0).getCellType()) {
				    				                    	    case Cell.CELL_TYPE_STRING:
				    				                    	    	obj.put("sheet", r.getCell(0).getStringCellValue());
				    				                    	        break;
				    				                    	    case Cell.CELL_TYPE_NUMERIC:
				    				                    	    	obj.put("sheet", r.getCell(0).getNumericCellValue());
				    				                    	        break;
				    		        						}
				    		        						switch (r.getCell(1).getCellType()) {
					    			                    	    case Cell.CELL_TYPE_STRING:
					    			                    	    	obj.put("code", r.getCell(1).getStringCellValue());
					    			                    	        break;
					    			                    	    case Cell.CELL_TYPE_NUMERIC:
					    			                    	    	obj.put("code", r.getCell(1).getNumericCellValue());
					    			                    	        break;
					    			                    	    case Cell.CELL_TYPE_FORMULA:
				    			                    	    	final CellValue cellValue = evaluator.evaluate(r.getCell(1));
				    			                    	    	switch (cellValue.getCellType()) {
				    					                    	    case Cell.CELL_TYPE_STRING:
				    					                    	    	if(cellValue.getStringValue()!=null){
				    					                    	    		obj.put("code", cellValue.getStringValue());
				    					                    	    	}
				    					                    	    	else{
				    					                    	    		obj.put("code", "null");
				    					                    	    	}
				    					                    	        break;
				    					                    	    case Cell.CELL_TYPE_NUMERIC:
				    					                    	    	if(cellValue.getNumberValue()!=0){
				    					                    	    		obj.put("code", cellValue.getNumberValue());
				    					                    	    	}
				    					                    	    	else{
				    					                    	    		obj.put("code", "null");
				    					                    	    	}
				    					                    	        break;
				    			        						}
				    			                    	        break;
				    		        						}
				    		        						switch (r.getCell(2).getCellType()) {
					    			                    	    case Cell.CELL_TYPE_STRING:
					    			                    	    	obj.put("dans", r.getCell(2).getStringCellValue());
					    			                    	        break;
					    			                    	    case Cell.CELL_TYPE_NUMERIC:
					    			                    	    	obj.put("dans", r.getCell(2).getNumericCellValue());
					    			                    	        break;
				    		        						}
				    		        						switch (r.getCell(3).getCellType()) {
					    			                    	    case Cell.CELL_TYPE_STRING:
					    			                    	    	obj.put("uld", r.getCell(3).getStringCellValue());
					    			                    	        break;
					    			                    	    case Cell.CELL_TYPE_NUMERIC:
					    			                    	    	obj.put("uld", r.getCell(3).getNumericCellValue());
					    			                    	        break;
				    		        						}
				    		        						switch (r.getCell(4).getCellType()) {
					    			                    	    case Cell.CELL_TYPE_STRING:
					    			                    	    	obj.put("uldDun", r.getCell(4).getStringCellValue());
					    			                    	        break;
					    			                    	    case Cell.CELL_TYPE_NUMERIC:
					    			                    	    	obj.put("uldDun", r.getCell(4).getNumericCellValue());
					    			                    	        break;
					    			                    	    case Cell.CELL_TYPE_BLANK:
					    			                    	    	obj.put("uldDun", "0");
					    			                    	        break;
					    			                    	    case Cell.CELL_TYPE_FORMULA:
				    			                    	    	final CellValue cellValue = evaluator.evaluate(r.getCell(4));
				    			                    	    	switch (cellValue.getCellType()) {
				    					                    	    case Cell.CELL_TYPE_STRING:
				    					                    	    	if(cellValue.getStringValue()!=null){
				    					                    	    		obj.put("uldDun", cellValue.getStringValue());
				    					                    	    	}
				    					                    	    	else{
				    					                    	    		obj.put("uldDun", "0");
				    					                    	    	}
				    					                    	        break;
				    					                    	    case Cell.CELL_TYPE_NUMERIC:
				    					                    	    	if(cellValue.getNumberValue()!=0){
				    					                    	    		obj.put("uldDun", cellValue.getNumberValue());
				    					                    	    	}
				    					                    	    	else{
				    					                    	    		obj.put("uldDun", "0");
				    					                    	    	}
				    					                    	        break;
				    			        						}
				    			                    	        break;
				    		        						}
				    		        						switch (r.getCell(5).getCellType()) {
					    			                    	    case Cell.CELL_TYPE_STRING:
					    			                    	    	obj.put("tulgalt", r.getCell(5).getStringCellValue());
					    			                    	        break;
					    			                    	    case Cell.CELL_TYPE_NUMERIC:
					    			                    	    	obj.put("tulgalt", r.getCell(5).getNumericCellValue());
					    			                    	        break;
				    		        						}
				    		        						if(r.getCell(6)!=null){
				    		        							switch (r.getCell(6).getCellType()) {
						    			                    	    case Cell.CELL_TYPE_STRING:
						    			                    	    	obj.put("uldDun2", r.getCell(6).getStringCellValue());
						    			                    	        break;
						    			                    	    case Cell.CELL_TYPE_NUMERIC:
						    			                    	    	obj.put("uldDun2", r.getCell(6).getNumericCellValue());
						    			                    	        break;
						    			                    	    case Cell.CELL_TYPE_BLANK:
						    			                    	    	obj.put("uldDun2", "0");
						    			                    	        break;
						    			                    	    case Cell.CELL_TYPE_FORMULA:
					    			                    	    	final CellValue cellValue = evaluator.evaluate(r.getCell(6));
					    			                    	    	switch (cellValue.getCellType()) {
					    					                    	    case Cell.CELL_TYPE_STRING:
					    					                    	    	if(cellValue.getStringValue()!=null){
					    					                    	    		obj.put("uldDun2", cellValue.getStringValue());
					    					                    	    	}
					    					                    	    	else{
					    					                    	    		obj.put("uldDun2", "0");
					    					                    	    	}
					    					                    	        break;
					    					                    	    case Cell.CELL_TYPE_NUMERIC:
					    					                    	    	if(cellValue.getNumberValue()!=0){
					    					                    	    		obj.put("uldDun2", cellValue.getNumberValue());
					    					                    	    	}
					    					                    	    	else{
					    					                    	    		obj.put("uldDun2", "0");
					    					                    	    	}
					    					                    	        break;
					    			        						}
					    			                    	        break;
					    		        						}
				    		        						}
				    		        						if(r.getCell(7)!=null){
				    		        							switch (r.getCell(7).getCellType()) {
						    			                    	    case Cell.CELL_TYPE_STRING:
						    			                    	    	obj.put("zuruu", r.getCell(7).getStringCellValue());
						    			                    	        break;
						    			                    	    case Cell.CELL_TYPE_NUMERIC:
						    			                    	    	obj.put("zuruu", r.getCell(7).getNumericCellValue());
						    			                    	        break;
						    			                    	    case Cell.CELL_TYPE_BLANK:
						    			                    	    	obj.put("zuruu", "0");
						    			                    	        break;
						    			                    	    case Cell.CELL_TYPE_FORMULA:
					    			                    	    	final CellValue cellValue = evaluator.evaluate(r.getCell(7));
					    			                    	    	switch (cellValue.getCellType()) {
					    					                    	    case Cell.CELL_TYPE_STRING:
					    					                    	    	if(cellValue.getStringValue()!=null){
					    					                    	    		obj.put("zuruu", cellValue.getStringValue());
					    					                    	    	}
					    					                    	    	else{
					    					                    	    		obj.put("zuruu", "0");
					    					                    	    	}
					    					                    	        break;
					    					                    	    case Cell.CELL_TYPE_NUMERIC:
					    					                    	    	if(cellValue.getNumberValue()>1 ||cellValue.getNumberValue()<-1){
					    					                    	    		obj.put("zuruu", cellValue.getNumberValue());
					    					                    	    		arr3.put(obj);
					    					                    	    	}
					    					                    	        break;
					    			        						}
					    			                    	        break;
					    		        						}
				    		        						}				    		        						
				    		        					}
				    		        				}
				                    	        break;
				        					}
				        				}
				        			}
					            } 
				        	}
				        } 
			        }
			        
			    
    		
    		        
			        JSONObject robj=new JSONObject();
    				
    				if(errList.length()>0 || sheetList.length()>0 || arr1.length()>0 || errMsg.length()>0 || aldaataiSheet.length()>0){
    					robj.put("prefilter", errList);
    					robj.put("additionalSheet", sheetList);
    					robj.put("formula", errMsg);
    					robj.put("error", arr1);
    					robj.put("naalt", false);
						robj.put("naaltList", aldaataiSheet);
						robj.put("excel", false);
						robj.put("support", false);	
    					return  robj.toString();
    				}
    				
    				
    				if(err.length()==0){
    					
    					String uuid = UUID.randomUUID().toString()+".xlsx";

    					File directory = new File(realpath+File.separator+"upload-dir"+File.separator+pr.getName());
    					if (! directory.exists()){
    					        directory.mkdir();
					    }
					    LutUser loguser= (LutUser) dao.getHQLResult("from LutUser t where t.username='"+pr.getName()+"'", "current");
    		            FileOutputStream fout = new FileOutputStream(realpath+File.separator+"upload-dir"+File.separator+pr.getName()+ File.separator+uuid);
    		            File oldFile=new File(realpath+File.separator+loguser.getFlurl());
    		            if(oldFile.exists()){    		            	
    		            	oldFile.delete();
    		            	System.out.println("file deleted");
    		            }
    		          
    		            String incuid = UUID.randomUUID().toString()+".xlsx";    		            
    		            
    		    	    furl = furl+File.separator+pr.getName()+ File.separator+uuid ;		
    		    		Date d1 = new Date();
    		    		SimpleDateFormat df = new SimpleDateFormat("MM/dd/YYYY HH:mm a");
    		            String formattedDate = df.format(d1);
    		     	    FileConverted newFile = new FileConverted();
    		    		newFile.setName(file.getOriginalFilename());
    		    		newFile.setFsize(file.getSize()/1024);    		    	
    		    		newFile.setFdate(formattedDate);
    		    		newFile.setUserid(loguser.getId());
    		    		newFile.setFlurl(furl);
    		    		
    		    		loguser.setFlurl(furl);
    		    		loguser.setFlname(file.getOriginalFilename());
    		    		dao.PeaceCrud(loguser, "LutUser", "update", (long) loguser.getId(), 0, 0, null);
    		            
    		    		robj.put("support", true);
    		    		robj.put("excel", true);
    		    		robj.put("diff", arr3);

    		            if(zbook.getSheet("15.Journal")!=null){
    		            	for(int i=0;i<zbook.getSheet("15.Journal").getLastRowNum()+1;i++){
    							Row currentRow = zbook.getSheet("15.Journal").getRow(i);
    							if(currentRow!=null){
    								if(currentRow.getCell(0)==null){
    									zbook.getSheet("15.Journal").removeRow(currentRow);
    								}
    							}						
    						}
    		            }
    		            if(zbook.getSheet("Journal")!=null){
    		            	for(int i=0;i<zbook.getSheet("Journal").getLastRowNum()+1;i++){
    							Row currentRow = zbook.getSheet("Journal").getRow(i);
    							if(currentRow!=null){
    								if(currentRow.getCell(0)==null){
    									zbook.getSheet("Journal").removeRow(currentRow);
    								}
    							}						
    						}
    		            }
    		            zbook.write(fout);
    		            fout.close();
    		            return robj.toString();
    				}
    			}
    		
    		}
    	    
			return "true";
	}



	@PostMapping("/api/tsh/{id}")
	public String handleExcelFormUpload(@RequestParam("file") MultipartFile file, @PathVariable long id, Principal pr) throws IllegalStateException, IOException, NumberFormatException,ParseException, InvalidFormatException, JSONException {

		String SAVE_DIR = "upload-dir";
		String furl = "/" + SAVE_DIR ;
		JSONArray arr=new JSONArray();
		Path currentRelativePath = Paths.get("");
		String realpath = currentRelativePath.toAbsolutePath().toString();

		List<FileUpload> fl=(List<FileUpload>) dao.getHQLResult("from FileUpload t where t.autype=1 and t.aan=1 order by t.id desc", "list");
		FileInputStream zagwar = null;
		File files = null;
		JSONObject err= new JSONObject();
		int count=0;
		LutUser loguser= (LutUser) dao.getHQLResult("from LutUser t where t.username='"+pr.getName()+"'", "current");
		File oldFile1=new File(realpath+File.separator+loguser.getFlurl());

		if(fl.size()>0){
			files = new File(realpath+fl.get(0).getFileurlAdmin());
			if(files.exists()){
				if(oldFile1.exists()){
					zagwar = new FileInputStream(oldFile1);
				}
				else{
					zagwar = new FileInputStream(files);
				}

				Workbook wb =WorkbookFactory.create(zagwar);

				InputStream fis = file.getInputStream();


				String newfilename = file.getOriginalFilename();
				int newindex=newfilename.lastIndexOf('.');
				String newlastOne=(newfilename.substring(newindex +1));
				InputStream ffis=file.getInputStream();
				Workbook fbook = new XSSFWorkbook(ffis);

				if(id==1){
					JSONArray header= new JSONArray();
					final List<JSONObject> objs = new ArrayList<JSONObject>();
					FormulaEvaluator evaluator = wb.getCreationHelper().createFormulaEvaluator();
					List<String> headerArr = new ArrayList<String>();
					int counter=0;
					int dcounter=0;
					List<String> str= Arrays.asList("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12");
					for(String name:str){
						Sheet st=fbook.getSheet(name);
						if(st!=null){
							Row rw=fbook.getSheet(name).getRow(1);
							if(rw!=null){
								for(int y=0;y<rw.getLastCellNum();y++){
									Cell data1=rw.getCell(y);
									JSONObject title=new JSONObject();
									if(data1!=null){
										if(data1.getCellType()==1){
											if(!headerArr.contains(data1.getStringCellValue())){
												for(int t=y;t<rw.getLastCellNum();t++){
													Cell data2=rw.getCell(t);
													if(data2!=null){
														if(data2.getCellType()==1){
															if(data1.getStringCellValue().equalsIgnoreCase(data2.getStringCellValue()) && data1.getColumnIndex()!=data2.getColumnIndex()){
																JSONObject dub=new JSONObject();
																dub.put("title", data1.getStringCellValue());
																dub.put("index", t);
																objs.add(dub);
															}
														}
													}
												}

												headerArr.add(data1.getStringCellValue());
												title.put("title", data1.getStringCellValue());
												title.put("index", y);
												counter++;
												objs.add(title);
											}
										}
									}
								}
							}
						}
					}
					List<JSONObject> orderedList = new ArrayList<JSONObject>();
					int ocount=0;
					for(int y=0;y<objs.size();y++){
						for(JSONObject obj:objs){
							if(obj.getInt("index")==y){
								obj.put("order", ocount);
								orderedList.add(obj);
								ocount++;
							}
						}
					}

					CellStyle cs=wb.createCellStyle();
					cs.setBorderBottom(CellStyle.BORDER_THIN);
					cs.setBottomBorderColor(IndexedColors.BLACK.getIndex());
					cs.setBorderTop(CellStyle.BORDER_THIN);
					cs.setTopBorderColor(IndexedColors.BLACK.getIndex());
					cs.setBorderLeft(CellStyle.BORDER_THIN);
					cs.setLeftBorderColor(IndexedColors.BLACK.getIndex());
					cs.setBorderRight(CellStyle.BORDER_THIN);
					cs.setRightBorderColor(IndexedColors.BLACK.getIndex());
					cs.setWrapText(true);
					cs.setAlignment(CellStyle.ALIGN_CENTER);
					cs.setVerticalAlignment(CellStyle.VERTICAL_CENTER);


					CellStyle style=wb.createCellStyle();
					style.setFillForegroundColor(HSSFColor.LIGHT_BLUE.index);
					style.setFillPattern(CellStyle.SOLID_FOREGROUND);
					style.setBorderBottom(CellStyle.BORDER_THIN);
					style.setBottomBorderColor(IndexedColors.BLACK.getIndex());
					style.setBorderTop(CellStyle.BORDER_THIN);
					style.setTopBorderColor(IndexedColors.BLACK.getIndex());
					style.setBorderLeft(CellStyle.BORDER_THIN);
					style.setLeftBorderColor(IndexedColors.BLACK.getIndex());
					style.setBorderRight(CellStyle.BORDER_THIN);
					style.setRightBorderColor(IndexedColors.BLACK.getIndex());
					style.setWrapText(true);
					style.setAlignment(CellStyle.ALIGN_CENTER);
					style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
					//************ Negtgel **************//

					Sheet nCominSheet =wb.getSheet("negtgel");

					for(int i=0; i<wb.getNumberOfSheets();i++){
						System.out.println(wb.getSheetAt(i).getSheetName());
					}

					for(int i=0;i<nCominSheet.getLastRowNum();i++){
						Row re=nCominSheet.getRow(i);
						if(re!=null){
							nCominSheet.removeRow(re);
						}
					}

					Row nTitleRowS=nCominSheet.createRow(1);
					for(int i=0;i<orderedList.size();i++){
						JSONObject obj=orderedList.get(i);
						Cell title=nTitleRowS.getCell(i+20);
						if(title==null){
							title=nTitleRowS.createCell(i+20);
							title.setCellValue(obj.getString("title"));
							title.setCellStyle(cs);
						}
						else{
							if(title.getCellType()==1){
								title.setCellValue(obj.getString("title"));
							}
						}
					}

					Cell titleSar=nTitleRowS.createCell(0);
					titleSar.setCellValue("Сар");
					titleSar.setCellStyle(style);

					Cell title=nTitleRowS.getCell(1);
					title=nTitleRowS.createCell(1);
					title.setCellValue("Хувь");
					title.setCellStyle(style);

					Cell title1=nTitleRowS.getCell(2);
					title1=nTitleRowS.createCell(2);
					title1.setCellValue("Аудитаар НДШ");
					title1.setCellStyle(style);

					Cell title2=nTitleRowS.getCell(3);
					title2=nTitleRowS.createCell(3);
					title2.setCellValue("Аудитаар ХХОАТ");
					title2.setCellStyle(style);
					Cell title3=nTitleRowS.getCell(4);
					title3=nTitleRowS.createCell(4);
					title3.setCellValue("Зөрүү");
					title3.setCellStyle(style);
					Cell title4=nTitleRowS.getCell(5);
					title4=nTitleRowS.createCell(5);
					title4.setCellValue("Зөрүү");
					title4.setCellStyle(style);
					Cell title5=nTitleRowS.getCell(6);
					title5=nTitleRowS.createCell(6);
					title5.setCellValue("Лист");
					title5.setCellStyle(style);
					Cell title6=nTitleRowS.getCell(7);
					title6=nTitleRowS.createCell(7);
					title6.setCellValue("Нярай");
					title6.setCellStyle(style);
					Cell title7=nTitleRowS.getCell(8);
					title7=nTitleRowS.createCell(8);
					title7.setCellValue("Хоол");
					title7.setCellStyle(style);
					Cell title8=nTitleRowS.getCell(9);
					title8=nTitleRowS.createCell(9);
					title8.setCellValue("Унаа");
					title8.setCellStyle(style);
					Cell title9=nTitleRowS.getCell(10);
					title9=nTitleRowS.createCell(10);
					title9.setCellValue("Бүгд дүн");
					title9.setCellStyle(style);
					Cell title10=nTitleRowS.getCell(11);
					title10=nTitleRowS.createCell(11);
					title10.setCellValue("НДШ");
					title10.setCellStyle(style);
					Cell title11=nTitleRowS.getCell(12);
					title11=nTitleRowS.createCell(12);
					title11.setCellValue("ХХОАТ");
					title11.setCellStyle(style);
					Cell title12=nTitleRowS.getCell(13);
					title12=nTitleRowS.createCell(13);
					title12.setCellValue("Цалингийн зардал");
					title12.setCellStyle(style);
					Cell title13=nTitleRowS.getCell(14);
					title13=nTitleRowS.createCell(14);
					title13.setCellValue("НДШ цэвэр");
					title13.setCellStyle(style);
					Cell title14=nTitleRowS.getCell(15);
					title14=nTitleRowS.createCell(15);
					title14.setCellValue("ХХОАТ цэвэр");
					title14.setCellStyle(style);
					Cell title15=nTitleRowS.getCell(16);
					title15=nTitleRowS.createCell(16);
					title15.setCellValue("Цалингийн зардал ХХДХ их");
					title15.setCellStyle(style);
					Cell title16=nTitleRowS.getCell(17);
					title16=nTitleRowS.createCell(17);
					title16.setCellValue("Цалингийн зардал ХХДХ их хувь");
					title16.setCellStyle(style);
					Cell title17=nTitleRowS.getCell(18);
					title17=nTitleRowS.createCell(18);
					title17.setCellValue("Тооцсон НДШ хувь 7.8 хувь");
					title17.setCellStyle(style);
					Cell title18=nTitleRowS.getCell(19);
					title18=nTitleRowS.createCell(19);
					title18.setCellValue(" ");
					title18.setCellStyle(style);

					int rowCounter=0;



					for(String shName:str){
						Sheet cominSheet =fbook.getSheet(shName);
						Sheet sh=wb.getSheet("negtgel");
						if(cominSheet!=null){
							for(int y=2;y<cominSheet.getLastRowNum();y++){
								if(cominSheet.getRow(y)!=null){
									Row rw=sh.createRow(y+rowCounter);
									for(int j=0;j<cominSheet.getRow(y).getLastCellNum()+10;j++){
										if(cominSheet.getRow(y).getCell(j)!=null){
											Cell mTitle=cominSheet.getRow(1).getCell(j);
											Row wbTitle=sh.getRow(1);
											int col=0;
											List<Integer> strArray=new ArrayList<>();
											for(int c=20;c<sh.getRow(1).getLastCellNum();c++){
												Cell wCell=sh.getRow(1).getCell(c);
												if(mTitle!=null && wCell!=null){
													if(mTitle.getStringCellValue().equalsIgnoreCase(wCell.getStringCellValue())){
														if(mTitle.getColumnIndex()==wCell.getColumnIndex()){
															col=mTitle.getColumnIndex();
														}
														else{
															col=wCell.getColumnIndex();

														}
														strArray.add(wCell.getColumnIndex());
													}
												}
												else{
													c++;
												}
											}
											for(Integer a:strArray){
												if(mTitle!=null){
													Cell cl = rw.createCell(a);
													switch (cominSheet.getRow(y).getCell(j).getCellTypeEnum()) {
														case STRING:
															if(NumberUtils.isDigits(cominSheet.getRow(y).getCell(j).getStringCellValue().replace(",", ""))){
																cl.setCellValue(Double.parseDouble(cominSheet.getRow(y).getCell(j).getStringCellValue().replace(",", "")));
															}
															else if(NumberUtils.isDigits(cominSheet.getRow(y).getCell(j).getStringCellValue().replace(".0", ""))){
																cl.setCellValue(Double.parseDouble(cominSheet.getRow(y).getCell(j).getStringCellValue().replace(".0", "")));
															}
															else{
																cl.setCellValue(cominSheet.getRow(y).getCell(j).getStringCellValue().replace(",", ""));
															}
															break;
														case NUMERIC:
															cl.setCellValue(cominSheet.getRow(y).getCell(j).getNumericCellValue());
															break;
													}
												}
											}

										}
									}


									int rownum=y+rowCounter+1;

									Cell titleNum=rw.createCell(0);
									titleNum.setCellValue(Integer.parseInt(cominSheet.getSheetName()));

									Cell huvi=rw.createCell(1);

									String strFormulahuvi= "IF((K"+rownum+"-G"+rownum+"-H"+rownum+">2400000),11,(L"+rownum+"/(K"+rownum+"-G"+rownum+"-H"+rownum+")*100))";
									huvi.setCellFormula(strFormulahuvi);



									Cell andsh=rw.createCell(2);
									String strFormulaandsh= "IF(N"+rownum+">2400000,240000,(N"+rownum+"*S"+rownum+")/100)";
									//		andsh.setCellType(Cell.CELL_TYPE_FORMULA);
									andsh.setCellFormula(strFormulaandsh);

									Cell hoat=rw.createCell(3);

									String strss="IF(S"+rownum+"=0,0,IF((N"+rownum+"-I"+rownum+")>2400000,((((((N"+rownum+"-I"+rownum+"-J"+rownum+")-240000))*0.1+(I"+rownum+"+J"+rownum+")*0.1)))-7000,((((((N"+rownum+"-I"+rownum+"-J"+rownum+")-(N"+rownum+"-I"+rownum+"-J"+rownum+")*S"+rownum+"/100)))*0.1+(I"+rownum+"+J"+rownum+")*0.1)-7000)))";
									String strFormulahoat= "IF((ISNUMBER(U"+rownum+"*1)=CH"+rownum+"),0,(K"+rownum+"-L"+rownum+")*0.1-R"+rownum+"+(I"+rownum+"+J"+rownum+")*0.011)";
									//	hoat.setCellType(Cell.CELL_TYPE_FORMULA);
									hoat.setCellFormula(strFormulahoat);

									Cell zuruu=rw.createCell(4);
									String strs1="C"+rownum+"-O"+rownum+"";
									String strFormulazuruu= "IF((ISNUMBER(U"+rownum+"*1)=CH"+rownum+"),0,C"+rownum+"-L"+rownum+")";
									//		zuruu.setCellType(Cell.CELL_TYPE_FORMULA);
									zuruu.setCellFormula(strFormulazuruu);

									Cell zuruu1=rw.createCell(5);
									String strFormulazuruu1= "IF((ISNUMBER(U"+rownum+"*1)=CH"+rownum+"),0,D"+rownum+"-M"+rownum+")";
									String strs2="D"+rownum+"-P"+rownum+"";
									//		zuruu1.setCellType(Cell.CELL_TYPE_FORMULA);
									zuruu1.setCellFormula(strs2);

									Cell col=rw.createCell(6);
									String strFormulacol= "SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!B$1,negtgel!U"+rownum+":BL"+rownum+") + SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!B$2,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!B$3,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!B$4,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!B$5,negtgel!U"+rownum+":BL"+rownum+")";
									//		col.setCellType(Cell.CELL_TYPE_FORMULA);
									col.setCellFormula(strFormulacol);

									Cell col1=rw.createCell(7);
									String strFormulacol1= "SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!F$1,negtgel!U"+rownum+":BL"+rownum+") + SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!F$2,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!F$3,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!F$4,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!F$5,negtgel!U"+rownum+":BL"+rownum+")";
									//		col1.setCellType(Cell.CELL_TYPE_FORMULA);
									col1.setCellFormula(strFormulacol1);

									Cell col2=rw.createCell(8);
									String strFormulacol2= "SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!H$1,negtgel!U"+rownum+":BL"+rownum+") + SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!H$2,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!H$3,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!H$4,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!H$5,negtgel!U"+rownum+":BL"+rownum+")";
									//			col2.setCellType(Cell.CELL_TYPE_FORMULA);
									col2.setCellFormula(strFormulacol2);

									Cell col3=rw.createCell(9);
									String strFormulacol3= "SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!J$1,negtgel!U"+rownum+":BL"+rownum+") + SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!J$2,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!J$3,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!J$4,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!J$5,negtgel!U"+rownum+":BL"+rownum+")";
									//		col3.setCellType(Cell.CELL_TYPE_FORMULA);
									col3.setCellFormula(strFormulacol3);

									Cell col4=rw.createCell(10);
									String strFormulacol4= "SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!L$1,negtgel!U"+rownum+":BL"+rownum+") + SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!L$2,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!L$3,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!L$4,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!L$5,negtgel!U"+rownum+":BL"+rownum+")";
									//		col4.setCellType(Cell.CELL_TYPE_FORMULA);
									col4.setCellFormula(strFormulacol4);

									Cell col5=rw.createCell(11);
									String strFormulacol5= "SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!N$1,negtgel!U"+rownum+":BL"+rownum+") + SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!N$2,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!N$3,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!N$4,negtgel!U"+rownum+":BL"+rownum+")+SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!N$5,negtgel!U"+rownum+":BL"+rownum+")";
									//		col5.setCellType(Cell.CELL_TYPE_FORMULA);
									col5.setCellFormula(strFormulacol5);

									Cell col6=rw.createCell(12);
									String strFormulacol6= "SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!P$1,negtgel!U"+rownum+":BL"+rownum+") + SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!P$2,negtgel!U"+rownum+":BL"+rownum+")+ SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!P$3,negtgel!U"+rownum+":BL"+rownum+")+ SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!P$4,negtgel!U"+rownum+":BL"+rownum+")+ SUMIF(negtgel!U$2:BL$2,'Tsalin uzuulelt'!P$5,negtgel!U"+rownum+":BL"+rownum+")";
									//		col6.setCellType(Cell.CELL_TYPE_FORMULA);
									col6.setCellFormula(strFormulacol6);

									Cell col7=rw.createCell(13);
									String strFormulacol7= "IF(ISNUMBER(U"+rownum+"*1)=CF"+rownum+",0,K"+rownum+"-H"+rownum+"-G"+rownum+")";
									//		col7.setCellType(Cell.CELL_TYPE_FORMULA);
									col7.setCellFormula(strFormulacol7);

									Cell col8=rw.createCell(14);
									String strFormulacol8= "IF(ISNUMBER(U"+rownum+"*1)=CF"+rownum+",0,L"+rownum+")";
									//		col8.setCellType(Cell.CELL_TYPE_FORMULA);
									col8.setCellFormula(strFormulacol8);

									Cell col9=rw.createCell(15);

									//		Cell test=cominSheet.getRow(rownum).getCell(cellnum);

									String strFormulacol9= "IF(ISNUMBER(U"+rownum+"*1)=CF"+rownum+",0,M"+rownum+")";
									//		col9.setCellType(Cell.CELL_TYPE_FORMULA);
									col9.setCellFormula(strFormulacol9);

									Cell col10=rw.createCell(16);
									String strFormulacol10= "IF(N"+rownum+">2400000,N"+rownum+",0)";
									//	col10.setCellType(Cell.CELL_TYPE_FORMULA);
									col10.setCellFormula(strFormulacol10);

									Cell col11=rw.createCell(17);
									//String strFormulacol11= "IF(L"+rownum+"/Q"+rownum+"*100<3,2,10)";


									String strFormulacol11= "IF(N"+rownum+"<561797,13333.33,IF(N"+rownum+"<1123595,11666.67,IF(N"+rownum+"<1685393,10000,IF(N"+rownum+"<2247191,8333.33,IF(N"+rownum+"<2664000,6666.6,IF(N"+rownum+"<2764000,5000,IF(N"+rownum+"<3264000,0,0)))))))";

									//		col11.setCellType(Cell.CELL_TYPE_FORMULA);
									col11.setCellFormula(strFormulacol11);

									Cell col12=rw.createCell(18);
									//	String strFormulacol12= "IF(B"+rownum+">8,10,7.8)";

									String strs3="IF(CH"+rownum+"=0,0,IF(B"+rownum+">9,10,IF(B"+rownum+">8,B"+rownum+",IF(B"+rownum+">7.7,7.8,IF(B"+rownum+">3,B"+rownum+",IF(B"+rownum+">1.5,2))))))";

									String strS="IF(B"+rownum+">10,11,IF(B"+rownum+">8.7,8.8,IF(B"+rownum+">3,B"+rownum+",IF(B"+rownum+">1.5,2))))";

									String strFormulacol12= "IF(B"+rownum+">9,10,IF(B"+rownum+">8,B"+rownum+",IF(B"+rownum+">7.7,7.8,IF(B"+rownum+">3,B"+rownum+",IF(B"+rownum+">1.5,2)))))";
									//		col12.setCellType(Cell.CELL_TYPE_FORMULA);
									col12.setCellFormula(strS);

									Cell col13=rw.createCell(19);
									String strFormulacol13= "IF(Q"+rownum+"=0,S"+rownum+",R"+rownum+")";
									//		col13.setCellType(Cell.CELL_TYPE_FORMULA);
									col13.setCellFormula(strFormulacol13);

									Cell col14=rw.createCell(85);

									String strFormulacol14= "IFERROR(U"+rownum+"*1,0)";
									//		col13.setCellType(Cell.CELL_TYPE_FORMULA);
									col14.setCellFormula(strFormulacol14);


								}
							}
							rowCounter=rowCounter+cominSheet.getLastRowNum();
						}
					}

					//************ Negtgel **************//

					if(orderedList.size()==0){
						return "false";
					}

					System.out.println("orderedlist"+orderedList.toString());
					System.out.println("orderedlist size"+orderedList.size());
				}
				else if(id==2){
					System.out.println(fbook.getSheetAt(0).getLastRowNum());
					int r=12;
					for(int s=0;s<fbook.getNumberOfSheets();s++){
						Sheet sht=fbook.getSheetAt(s);
						if(s>0){
							r=r+sht.getLastRowNum();
						}
						for(int kk=r;kk<sht.getLastRowNum();kk++){
							Row currentRow = wb.getSheet("huulga").createRow(kk);
							Cell data0=currentRow.createCell(0);
							Cell data26=currentRow.createCell(25);

							if(sht.getRow(kk)!=null){

								switch (sht.getRow(kk).getCell(0).getCellTypeEnum()) {
									case STRING:
										SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy");
										DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

										System.out.println(sht.getRow(kk).getCell(0).getStringCellValue());
										//Date date = sdf.parse(sht.getRow(kk).getCell(0).getStringCellValue());
										Date date;

										try {
											date = dateFormat.parse(sht.getRow(kk).getCell(0).getStringCellValue());
											System.out.println(date);
											SimpleDateFormat simpleDateformat = new SimpleDateFormat("MM"); // three digit abbreviation
											data26.setCellValue(Integer.parseInt(simpleDateformat.format(date)));
										} catch (ParseException e) {
											e.printStackTrace();
										}



									/*	newFile.setJmonth(Integer.parseInt(simpleDateformat.format(date)));
										newFile.setData2(data2.getStringCellValue());*/
										data0.setCellValue(sht.getRow(kk).getCell(0).getStringCellValue());

										break;
									case NUMERIC:

										if (DateUtil.isCellDateFormatted(sht.getRow(kk).getCell(0))) {
										//	SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
											DateFormat dateFormat1 = new SimpleDateFormat("dd/MM/yyyy");
											System.out.print(dateFormat1.format(sht.getRow(kk).getCell(0).getDateCellValue()) + "\t\t");
											String dt=dateFormat1.format(sht.getRow(kk).getCell(0).getDateCellValue());
											SimpleDateFormat sdf1= new SimpleDateFormat("dd/MM/yyyy");
											Date date1 = sdf1.parse(dt);
											SimpleDateFormat simpleDateformat1 = new SimpleDateFormat("MM"); // three digit abbreviation
											data0.setCellValue(dt);
											data26.setCellValue(Integer.parseInt(simpleDateformat1.format(date1)));

										}

										break;
								}
							}

							for(int y=1;y<10;y++){
								Cell data1 = currentRow.createCell(y);
								if(sht.getRow(kk)!=null){
									if(sht.getRow(kk).getCell(y)!=null){
										switch (sht.getRow(kk).getCell(y).getCellTypeEnum()) {
											case STRING:
												data1.setCellValue(sht.getRow(kk).getCell(y).getStringCellValue());
												break;
											case NUMERIC:
												data1.setCellValue(sht.getRow(kk).getCell(y).getNumericCellValue());
												break;
										}
									}
								}
							}
						}
					}

				}


				String uuid = UUID.randomUUID().toString()+".xlsx";

				File oldFile=new File(realpath+File.separator+loguser.getFlurl());
				if(oldFile.exists()){
					oldFile.delete();
					System.out.println("file deleted");
				}

				String incuid = UUID.randomUUID().toString()+".xlsx";

				furl = furl+File.separator+pr.getName()+ File.separator+uuid ;
				Date d1 = new Date();
				SimpleDateFormat df = new SimpleDateFormat("MM/dd/YYYY HH:mm a");
				String formattedDate = df.format(d1);
				FileConverted newFile = new FileConverted();
				newFile.setName(file.getOriginalFilename());
				newFile.setFsize(file.getSize()/1024);
				newFile.setFdate(formattedDate);
				newFile.setUserid(loguser.getId());
				newFile.setFlurl(furl);

				loguser.setFlurl(furl);
				loguser.setFlname(file.getOriginalFilename());
				dao.PeaceCrud(loguser, "LutUser", "update", (long) loguser.getId(), 0, 0, null);

				fis.close();

				FileOutputStream out = new FileOutputStream(realpath+File.separator+"upload-dir"+File.separator+pr.getName()+ File.separator+uuid);
				wb.write(out);
				out.close();

				return "true";
			}
		}

		return arr.toString();
	}
	
	@GetMapping("/api/file/download/excel")
	@ResponseBody
	public void getFile(Principal pr,HttpServletRequest req,HttpServletResponse response) throws EncryptedDocumentException, InvalidFormatException, IOException {
		LutUser loguser= (LutUser) dao.getHQLResult("from LutUser t where t.username='"+pr.getName()+"'", "current");
		Path currentRelativePath = Paths.get("");
		String realpath = currentRelativePath.toAbsolutePath().toString();
		if(loguser.getFlurl()!=null){
			File con=new File(realpath+loguser.getFlurl());
			FileInputStream str= new FileInputStream(con);
			Workbook workbook = WorkbookFactory.create(str); 
			
			List<String> shArr= Arrays.asList("1.Info", "2.CT1A", "3.CT2A", "4.CT3A", "5.CT4A", "6.CTT1", "7.CTT2", "8.CTT3", "9.CTT4", "10.CTT5", "11.CTT6", "12.CTT7","13.CTT8","14.CTT9","15.Journal","16.Assets","17.Inventory","18.Payroll","19.Budget","20.TGT1","21.TGT1A","22.NT2","23.TRIAL BALANCE","24.ABWS","25.CBWS");
			FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
			for(String item:shArr){
				Sheet sh=workbook.getSheet(item);

				 for(Row r : sh) {
			        	if(r!=null){
			        		 for(Cell c : r) {
				                if (c != null && c.getCellTypeEnum()== CellType.FORMULA) {
				                    String formula = c.getCellFormula();
				                    if (formula != null) {
				                    	c.setCellFormula(formula);
				                    	CellValue cellValue = evaluator.evaluate(c);
				                    	switch (cellValue.getCellTypeEnum()) {
				                    	    case STRING:
				                    	    	c.setCellType(CellType.STRING);
				                    	    	c.setCellValue(cellValue.getStringValue());
				                    	        break;
				                    	    case BOOLEAN:
				                    	        System.out.print(cellValue.getBooleanValue());
				                    	        break;
				                    	    case NUMERIC:
				                    	    	c.setCellType(CellType.NUMERIC);
				                    	    	c.setCellValue(cellValue.getNumberValue());
				                    	        break;
				                    	}
				                        evaluator.clearAllCachedResultValues();
				                    }
				                }
				            }
			        	}
			        }
			}
			//evaluator.evaluateAll();		
			for(int i=workbook.getNumberOfSheets()-1;i>=0;i--){
				Sheet st=workbook.getSheetAt(i);
				boolean sheet=false;
				for(String nm:shArr){
					if(nm.toUpperCase().equalsIgnoreCase(st.getSheetName().trim().toUpperCase())){
						 sheet=true;
					}
				}
				if(!sheet){
					workbook.removeSheetAt(i);
				}
			}

	        try (ServletOutputStream outputStream = response.getOutputStream()) {
				response.setContentType("application/ms-excel; charset=UTF-8");
				response.setCharacterEncoding("UTF-8");
	            response.setHeader("Content-Disposition","attachment; filename*=UTF-8''"+"Audit-it-"+loguser.getFlname());
	            workbook.write(outputStream);
	            outputStream.close();
	        }
		}		
	}

	@GetMapping("/api/file/download/survey")
	@ResponseBody
	public void getSurvey(Principal pr,HttpServletRequest req,HttpServletResponse response) throws EncryptedDocumentException, InvalidFormatException, IOException {
		LutUser loguser= (LutUser) dao.getHQLResult("from LutUser t where t.username='"+pr.getName()+"'", "current");
		Path currentRelativePath = Paths.get("");
		String realpath = currentRelativePath.toAbsolutePath().toString();
		if(loguser.getFlurl()!=null){
			File con=new File(realpath+loguser.getFlurl());
			FileInputStream str= new FileInputStream(con);
			Workbook workbook = WorkbookFactory.create(str);

			List<String> shArr= Arrays.asList("huulga","negtgel","niit","А-6.1","А-6.2","А-6.3","СТХ");
			FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
			for(String item:shArr){
				Sheet sh=workbook.getSheet(item);
				if(sh!=null){
					for(Row r : sh) {
						if(r!=null){
							for(Cell c : r) {
								if (c != null && c.getCellTypeEnum()== CellType.FORMULA) {
									String formula = c.getCellFormula();
									if (formula != null) {
										c.setCellFormula(formula);
										CellValue cellValue = evaluator.evaluate(c);
										switch (cellValue.getCellTypeEnum()) {
											case STRING:
												c.setCellType(CellType.STRING);
												c.setCellValue(cellValue.getStringValue());
												break;
											case BOOLEAN:
												System.out.print(cellValue.getBooleanValue());
												break;
											case NUMERIC:
												c.setCellType(CellType.NUMERIC);
												c.setCellValue(cellValue.getNumberValue());
												break;
										}
										evaluator.clearAllCachedResultValues();
									}
								}
							}
						}
					}
				}
			}
			//evaluator.evaluateAll();
			for(int i=workbook.getNumberOfSheets()-1;i>=0;i--){
				Sheet st=workbook.getSheetAt(i);
				boolean sheet=false;
				for(String nm:shArr){
					if(nm.toUpperCase().equalsIgnoreCase(st.getSheetName().trim().toUpperCase())){
						sheet=true;
					}
				}
				if(!sheet){
					workbook.removeSheetAt(i);
				}
			}

			try (ServletOutputStream outputStream = response.getOutputStream()) {
				response.setContentType("application/ms-excel; charset=UTF-8");
				response.setCharacterEncoding("UTF-8");
				response.setHeader("Content-Disposition","attachment; filename*=UTF-8''"+"Audit-it-"+loguser.getFlname()+".xlsx");
				workbook.write(outputStream);
				outputStream.close();
			}
		}
	}
	
	@GetMapping("/api/file/verify/excel")
	@ResponseBody
	public String getFileVerify(Principal pr,HttpServletRequest req,HttpServletResponse response) throws EncryptedDocumentException, InvalidFormatException, IOException {
		LutUser loguser= (LutUser) dao.getHQLResult("from LutUser t where t.username='"+pr.getName()+"'", "current");
		Path currentRelativePath = Paths.get("");
		String realpath = currentRelativePath.toAbsolutePath().toString();
		JSONObject obj=new JSONObject();
		if(loguser!=null){
			if(loguser.getFlurl()!=null){
				File fl=new File(realpath+File.separator+loguser.getFlurl());
				if(fl.exists()){
					if(loguser.getBalance()>0){
						loguser.setBalance(loguser.getBalance()-1);
						obj.put("excel", true);
						obj.put("balance", loguser.getBalance());
						dao.PeaceCrud(loguser, "LutUser", "update", (long) loguser.getId(), 0, 0, null);	
					}
					else{
						obj.put("balance", false);
					}
				}else{
					obj.put("file", false);
				}
			}
		}
		
		return obj.toString();
	}
	
	@GetMapping("/api/file/download/{id}")
	@ResponseBody
	public void getFileConv(@PathVariable long id, Principal pr,HttpServletRequest req,HttpServletResponse response) throws EncryptedDocumentException, InvalidFormatException, IOException {
		FileConverted fl=  (FileConverted) dao.getHQLResult("from FileConverted t where t.id='"+id+"'", "current");
		Path currentRelativePath = Paths.get("");
		String realpath = currentRelativePath.toAbsolutePath().toString();
		
		File con=new File(realpath+fl.getFlurl());
		FileInputStream str= new FileInputStream(con);
		Workbook workbook = WorkbookFactory.create(str); 
		
		List<String> shArr= Arrays.asList("3","1.Info", "2.CT1A", "3.CT2A", "4.CT3A", "5.CT4A", "6.CTT1", "7.CTT2", "8.CTT3", "9.CTT4", "10.CTT5", "11.CTT6", "12.CTT7","13.CTT8","14.CTT9","15.Journal","16.Assets","17.Inventory","18.Payroll","19.Budget","20.TGT1","21.TGT1A","22.NT2","23.TRIAL BALANCE","24.ABWS","25.CBWS");
		FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
		
		for(String item:shArr){
			Sheet sh=workbook.getSheet(item);
			 for(Row r : sh) { 
		        	if(r!=null){
		        		 for(Cell c : r) { 
			                if (c != null && c.getCellTypeEnum()== CellType.FORMULA) { 
			                    String formula = c.getCellFormula(); 
			                    if (formula != null) { 
			                    	c.setCellFormula(formula);	    				                    	
			                    	CellValue cellValue = evaluator.evaluate(c);	    				                    	 
			                    	switch (cellValue.getCellTypeEnum()) {
			                    	    case STRING:	    				                    	    	
			                    	    	c.setCellType(CellType.STRING);
			                    	    	c.setCellValue(cellValue.getStringValue());
			                    	        break;
			                    	    case BOOLEAN:
			                    	        System.out.print(cellValue.getBooleanValue());
			                    	        break;
			                    	    case NUMERIC:
			                    	    	c.setCellType(CellType.NUMERIC);
			                    	    	c.setCellValue(cellValue.getNumberValue());
			                    	        break;
			                    	}
			                        evaluator.clearAllCachedResultValues();                       
			                    } 
			                } 
			            } 
		        	}
		        }
		}
		//evaluator.evaluateAll();		
		for(int i=workbook.getNumberOfSheets()-1;i>=0;i--){
			Sheet st=workbook.getSheetAt(i);	
		
			boolean sheet=false;
			for(String nm:shArr){
				if(nm.toUpperCase().equalsIgnoreCase(st.getSheetName().trim().toUpperCase())){
					 sheet=true;
				}
			}
			if(!sheet){
				workbook.removeSheetAt(i);
			}
		}

        try (ServletOutputStream outputStream = response.getOutputStream()) {
			response.setContentType("application/ms-excel; charset=UTF-8");
			response.setCharacterEncoding("UTF-8");
            response.setHeader("Content-Disposition","attachment; filename*=UTF-8''"+"Audit-it-"+fl.getName()+".xlsx");
            workbook.write(outputStream);
            outputStream.close();
        }
	}

	@GetMapping("/api/file/sheet/excel")
	@ResponseBody
	public void getFileSheet(Principal pr,HttpServletRequest req,HttpServletResponse response) throws EncryptedDocumentException, InvalidFormatException, IOException {
		LutUser loguser= (LutUser) dao.getHQLResult("from LutUser t where t.username='"+pr.getName()+"'", "current");
		//FileConverted fl=  (FileConverted) dao.getHQLResult("from FileConverted t where t.id='"+id+"'", "current");
		Path currentRelativePath = Paths.get("");
		String realpath = currentRelativePath.toAbsolutePath().toString();
		if(loguser!=null){
			File con=new File(realpath+loguser.getFlurl());
			if(con.exists()){
				FileInputStream str= new FileInputStream(con);
				Workbook workbook = WorkbookFactory.create(str); 
				
				List<String> shArr= Arrays.asList("А-6.1","А-6.2", "А-6.3", "СТХ", "negtgel","niit","huulga");
				FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
				
				for(String item:shArr){
					Sheet sh=workbook.getSheet(item);
					if(sh!=null){
						for(Row r : sh) { 
				        	if(r!=null){
				        		 for(Cell c : r) { 
					                if (c != null && c.getCellTypeEnum()== CellType.FORMULA) { 
					                    String formula = c.getCellFormula(); 
					                    if (formula != null) { 
					                    	c.setCellFormula(formula);	    				                    	
					                    	CellValue cellValue = evaluator.evaluate(c);	    				                    	 
					                    	switch (cellValue.getCellTypeEnum()) {
					                    	    case STRING:	    				                    	    	
					                    	    	c.setCellType(CellType.STRING);
					                    	    	c.setCellValue(cellValue.getStringValue());
					                    	        break;
					                    	    case BOOLEAN:
					                    	        System.out.print(cellValue.getBooleanValue());
					                    	        break;
					                    	    case NUMERIC:
					                    	    	c.setCellType(CellType.NUMERIC);
					                    	    	c.setCellValue(cellValue.getNumberValue());
					                    	        break;
					                    	}
					                        evaluator.clearAllCachedResultValues();                       
					                    } 
					                } 
					            } 
				        	}
				        }
					}				 
				}
				
				
			
				for(int i=workbook.getNumberOfSheets()-1;i>=0;i--){
					Sheet st=workbook.getSheetAt(i);	
				
					boolean sheet=false;
					for(String nm:shArr){
						if(nm.toUpperCase().equalsIgnoreCase(st.getSheetName().trim().toUpperCase())){
							 sheet=true;
						}
					}
					if(!sheet){
						workbook.removeSheetAt(i);
					}
				}

		        try (ServletOutputStream outputStream = response.getOutputStream()) {
					response.setContentType("application/ms-excel; charset=UTF-8");
					response.setCharacterEncoding("UTF-8");
		            response.setHeader("Content-Disposition","attachment; filename*=UTF-8''"+"Audit-it-"+loguser.getFlname()+".xlsx");
		            workbook.write(outputStream);
		            outputStream.close();
		        }
			}
		}
			
	}
	
	
	/*@RequestMapping(value="/api/excel/verify/report/{mid}/{id}",method=RequestMethod.GET)
	public boolean verify(@PathVariable long id,@PathVariable long mid,HttpServletRequest req,HttpServletResponse response) throws JSONException, DocumentException, Exception {
		JsonObject obj= new JsonObject();
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (!(auth instanceof AnonymousAuthenticationToken)) {
			FileInputStream fis = null;
			LnkAuditReport main = (LnkAuditReport) dao.getHQLResult("from LnkAuditReport t where t.id='"+id+"'", "current");
			Path currentRelativePath = Paths.get("");
			String realpath = currentRelativePath.toAbsolutePath().toString();
			if(main!=null){
				File file = new File(realpath+File.separator+main.getFileurl());
				if(main.getFileurl()==null){
					return false;
				}
				else if(!file.exists()){
					return false;
				}
				else{
					return true;
				}
			}			
    		
		}
		return false;
	}*/
	
	/*@GetMapping("formfile/{id}")
	@ResponseBody
	public ResponseEntity<Resource> getFileName(@PathVariable int id) {
		LnkAuditFormFile fl=  (LnkAuditFormFile) dao.getHQLResult("from LnkAuditFormFile t where t.id='"+id+"'", "current");
		Resource file = storageService.loadAsResource(fl.getFileurl());
		
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fl.getName() + "\"")
				.body(file);
	}
	
	@GetMapping("/api/excel/export/report/{appid}/{id}")
	@ResponseBody
	public ResponseEntity<Resource> getFileNotloh(@PathVariable long id,@PathVariable long appid) {
		LnkAuditReport fl=  (LnkAuditReport) dao.getHQLResult("from LnkAuditReport t where t.id='"+id+"'", "current");
		Resource file = storageService.loadAsResource(fl.getFileurl());
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fl.getFilename() + "\"")
				.body(file);
	}
	
	@GetMapping("/api/excel/delete/report/{appid}/{id}")
	@ResponseBody
	public boolean deleteReport(@PathVariable long id,@PathVariable long appid) {
		LnkAuditReport main = (LnkAuditReport) dao.getHQLResult("from LnkAuditReport t where t.id='"+id+"'", "current");
		Path currentRelativePath = Paths.get("");
		String realpath = currentRelativePath.toAbsolutePath().toString();
		File file = new File(realpath+File.separator+main.getFileurl());
		if(file.exists()){
			file.delete();
			dao.PeaceCrud(main, "LnkAuditReport", "delete", (long) id, 0, 0, null);
			return true;
		}
		else{
			return false;
		}
	}*/

}
