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

import com.nbb.models.LnkMenurole;
import com.nbb.models.LnkUserrole;
import com.nbb.models.LutUser;

public interface LnkUserRoleRepository extends CrudRepository<LnkUserrole, Long> {

	List<LutUser> findAll(PageRequest request);
	
	@Query("SELECT t FROM LnkUserrole t where t.roleid = ?1") 
	List<LnkUserrole> findById(long appid);
	
}
