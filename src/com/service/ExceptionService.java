package com.service;

import java.util.List;
import java.util.Map;

public interface ExceptionService {
	public void addexception(String EL_hashCode, String EL_Type, String EL_StackTrace);//添加一条异常信息。
	public List<Map<String, Object>> displayexception();//显示所有异常信息。
	public List<Map<String, Object>> stacktrace(String EL_hashCode);//堆栈跟踪。
}
