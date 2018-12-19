package com.nbb.configs;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@ComponentScan
@EnableTransactionManagement
public class DatabaseConfig extends WebMvcConfigurerAdapter {
  
  @Autowired
  private DataSource dataSource;

  @Bean
  public LocalSessionFactoryBean sessionFactory() {
    LocalSessionFactoryBean sessionFactoryBean = new LocalSessionFactoryBean();
    sessionFactoryBean.setDataSource(dataSource);
    sessionFactoryBean.setPackagesToScan("com.nbb.models");
    Properties hibernateProperties = new Properties();
    hibernateProperties.put("hibernate.enable_lazy_load_no_trans", "true");    
    sessionFactoryBean.setHibernateProperties(hibernateProperties);
    
    return sessionFactoryBean;
  }
  
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("uploads/**").addResourceLocations("/uploads/");
  }	

} 