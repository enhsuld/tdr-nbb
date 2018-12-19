package com.nbb;

import java.security.Principal;

import javax.annotation.Resource;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import com.nbb.storage.StorageProperties;
import com.nbb.storage.StorageService;

@SpringBootApplication
@EntityScan(
        basePackageClasses = {PrivateAuditApplication.class, Jsr310JpaConverters.class}
)
@EnableConfigurationProperties(StorageProperties.class)
public class PrivateAuditApplication  implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(PrivateAuditApplication.class, args);
	}
	
	
	@Resource
	StorageService storageService;
	@Override
	public void run(String... args) throws Exception {
		//storageService.deleteAll();
		storageService.init();
	}
}
