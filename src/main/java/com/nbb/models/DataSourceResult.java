package com.nbb.models;

import java.util.List;

public class DataSourceResult {

	private List<?> Data;
	private long Total;
	
	public List<?> getData() {
		return Data;
	}
	public void setData(List<?> data) {
		Data = data;
	}
	public long getTotal() {
		return Total;
	}
	public void setTotal(long count) {
		Total = count;
	}
	
}
