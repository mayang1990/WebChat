package com.service.implement;

import java.util.List;
import java.util.Map;

import com.dao.ExceptionDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.service.ExceptionService;

@Service
public class ExceptionServiceImpl implements ExceptionService {
	@Autowired
	private ExceptionDao exceptiondao;
	
	@Override
	public void addexception(String EL_hashCode, String EL_Type, String EL_StackTrace) {
		exceptiondao.addexception(EL_hashCode, EL_Type, EL_StackTrace);
	}

	@Override
	public List<Map<String, Object>> displayexception() {
		return exceptiondao.displayexception();
	}

	@Override
	public List<Map<String, Object>> stacktrace(String EL_hashCode) {
		return exceptiondao.stacktrace(EL_hashCode);
	}//堆栈跟踪。

}
