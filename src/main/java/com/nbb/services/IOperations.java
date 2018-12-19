package com.nbb.services;

import org.springframework.data.domain.Page;

public interface IOperations<T> {
	 public Page<T> findPaginated(final int page, final int size);
}
