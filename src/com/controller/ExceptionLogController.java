package com.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.service.ExceptionService;

@Controller
public class ExceptionLogController {
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private ExceptionService exceptionservice;
	
	@RequestMapping("/displayexceptionlog")
	public ModelAndView displayexceptionlog()
	{
		ModelAndView mav=new ModelAndView();
		mav.setViewName("exceptionlog");
		mav.addObject("exceptionlog", exceptionservice.displayexception());
		return mav;
	}//显示所有异常日志。
	
	@RequestMapping("/gethashCode")
	public ModelAndView gethashCode()
	{
		HttpSession session=request.getSession(false);
		session.setAttribute("hashCode", request.getParameter("selected_hashCode"));
		return null;
	}//获取选定的hashCode。
	
	@RequestMapping("/stacktrace")
	public ModelAndView stacktrace()
	{	
		HttpSession session=request.getSession(false);
		ModelAndView mav=new ModelAndView();
		mav.setViewName("stacktrace");
		mav.addObject("stacktrace", exceptionservice.stacktrace(session.getAttribute("hashCode").toString()));
		return mav;
	}//获取堆栈跟踪。
}
