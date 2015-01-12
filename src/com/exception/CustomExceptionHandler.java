package com.exception;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import com.service.ExceptionService;

@Transactional(readOnly = false, rollbackFor=Exception.class)
public class CustomExceptionHandler implements HandlerExceptionResolver {
	
	@Autowired
	private ExceptionService exceptionservice;

	public ModelAndView resolveException(HttpServletRequest request,HttpServletResponse response, Object handler, Exception exception) {
		System.out.println("CustomExceptionHandler..........................");

		for (int i = 0; i < exception.getStackTrace().length; i++) {
			//exceptionservice.addexception(Integer.toString(exception.hashCode()),exception.toString(), exception.getStackTrace()[i].toString());
		}
		if (exception instanceof MaxUploadSizeExceededException) {
			try {
				throw exception;
			} catch (Exception e) {
				// TODO Auto-generated catch block
				//e.printStackTrace();
			}
		}
		else if (exception instanceof NullPointerException) {
			
		}
		else {
			System.out.println(exception.toString());
			for (int i = 0; i < exception.getStackTrace().length; i++) {
				System.out.println(exception.getStackTrace()[i].toString());
			}
			System.out.println(exception);
		}
		return null;
	}

}
