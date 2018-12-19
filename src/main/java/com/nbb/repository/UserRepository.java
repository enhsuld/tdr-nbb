/*
 * Copyright 2011-2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.nbb.repository;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.nbb.models.LutUser;



/**
 * Repository to manage {@link Account} instances.
 * 
 * @author Oliver Gierke
 */
public interface UserRepository extends CrudRepository<LutUser, Long> {

	List<LutUser> findAll(PageRequest request);

	/*@Query("SELECT * FROM CEduLutForm t where t.appid = :appid") 
    String findByAppId(@Param("appid") Long appid);*/
	
/*	@Query("SELECT t FROM LutUser t where t.appid = ?1") 
	List<LutUser> findByAppId(Integer appid);*/
	
	@Query("SELECT t FROM LutUser t where  t.username = ?1") 
	LutUser findByUserName(String username);
	
/*	@Query("SELECT t FROM LutUser t where t.isteacher=?2 and t.appid = ?1") 
	List<LutUser> findByAppIdWorker(Integer appid,boolean isteacher);*/
	
	
	/**
	 * Returns all accounts belonging to the given {@link Customer}.
	 * 
	 * @param customer
	 * @return
	 */
	//List<LutMenu> findByCustomer(LutMenu menu, PageRequest page);
}
