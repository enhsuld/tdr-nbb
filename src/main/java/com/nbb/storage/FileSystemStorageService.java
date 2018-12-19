package com.nbb.storage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

@Service
public class FileSystemStorageService implements StorageService {

    private Path rootLocation;

    @Autowired
    public FileSystemStorageService(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
    }

    @Override
    public String store(MultipartFile file,String path,String filename) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + file.getOriginalFilename());
            }
            String pathString= "upload-dir"+ File.separator+path;
            File dtx = new File(pathString);
    	    if(!dtx.exists()){
    	    	dtx.mkdirs();
			}
            
    	    this.rootLocation=Paths.get(pathString);  
    	    Path currentRelativePath = Paths.get("");
			String realpath = currentRelativePath.toAbsolutePath().toString()+File.separator+pathString;
    	    Files.copy(file.getInputStream(), this.rootLocation.resolve(filename));
    	    return realpath;
        } catch (IOException e) {
        	
            throw new StorageException("Failed to store file " + file.getOriginalFilename(), e);
        }
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(path -> this.rootLocation.relativize(path));
        } catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }

    }

    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
        	Path currentRelativePath = Paths.get("");
        	String realpath = currentRelativePath.toAbsolutePath().toString();
            String file = realpath+File.separator+filename;
            System.out.println("@@"+file);
            this.rootLocation=load(file);
            
            Path fl=load(file);
            Resource resource = new UrlResource(fl.toUri());
            if(resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageFileNotFoundException("Could not read file: " + filename);

            }
        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    public void init() {
        try {
        	if(!Files.exists(rootLocation)){
        		Files.createDirectory(rootLocation);
        	}
            
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }
}
