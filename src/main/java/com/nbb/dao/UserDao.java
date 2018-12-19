package com.nbb.dao;


import java.util.List;

import com.nbb.models.LutUser;

public interface UserDao {

	LutUser findByUserName(String username);
//	void inserBatch(List<FinCtt5> datas);
	public Object PeaceCrud(Object obj, String domainname, String method,Long obj_id,int page_val,int maxresult,String whereclause);
	public Object getHQLResult(String hqlString,String type);
	public List<?> kendojson(String request, String domain);
	public int resulsetcount(String request, String domain);
	Object findAll(String domain, String whereclause);
	Object saveOrUpdate(Object obj);
	public Object findById(String domain,long id, String whereclause);
	void deleteById(String domain,long id, String whereclause);
	public List<?> jData(Integer pageSize,Integer skip,String sortStr,String searchStr,String domain);
	public Object getNativeSQLResult(String queryStr, String type);
	int jDataCount(String str, String string);
}