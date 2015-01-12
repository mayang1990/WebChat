package com.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.model.UserModel;
import com.service.MessageService;
import com.service.NoticeService;
import com.service.UserService;

@Controller
public class LoginController {
	@Autowired
	private UserService userservice;
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private MessageService messageservice;
	@Autowired
	private NoticeService noticeservice;
	@RequestMapping("/login")
	public ModelAndView login(UserModel users){
		ModelAndView mav = new ModelAndView();
		HttpSession session=request.getSession(false);
		String captcha1=request.getParameter("captcha").toString();
		String captcha2=session.getAttribute("captcha").toString();
		if (captcha1.equals(captcha2)) {
			if (userservice.login(users).equals("success")) {
				session.setAttribute("USER_ID", users.getUSER_ID());
				List<Map<String, Object>> list=userservice.getuser(users.getUSER_ID());
				Map<String, Object> map=list.get(0);
				session.setAttribute("USER_NAME", map.get("USER_NAME").toString());
				mav.setViewName("app_window");
				return mav;
			}
			else if (userservice.login(users).equals("none")) {
				mav.setViewName("top");
				mav.addObject("error_message","<script>alert('用户不存在');</script>");
				return mav;
			}
			else if (userservice.login(users).equals("passworderror")) {
				mav.setViewName("top");
				mav.addObject("error_message","<script>alert('密码错误');</script>");
				return mav;
			}
			else {
				return mav;
			}
			
		} else {
			mav.setViewName("top");
			mav.addObject("error_message","<script>alert('验证码错误');</script>");
			return mav;
		}
	}
	
	@RequestMapping("/lastonline")
	public ModelAndView lastonline()
	{
		HttpSession session=request.getSession(false);
		userservice.lastonline(session.getAttribute("USER_ID").toString());
		return null;
	}//更新用户的最后在线时间。
	
	@RequestMapping("/displaymyself")
	public @ResponseBody Map<String, Object> displaymyself()
	{
		HttpSession session=request.getSession(false);
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("USER_NAME", session.getAttribute("USER_NAME").toString());
		map.put("USER_ID", session.getAttribute("USER_ID").toString());
		return map;
	}//显示当前登录用户的信息。
	
	@RequestMapping("/getmessage")
	public @ResponseBody List<Map<String, Object>> getmessage()
	{
		HttpSession session=request.getSession(false);
		return messageservice.getmessagetoreceive(session.getAttribute("USER_ID").toString());
	}//获取当前用户待接收的消息。
	
	@RequestMapping("/getnotice")
	public @ResponseBody List<Map<String, Object>> getnotice()
	{
		HttpSession session=request.getSession(false);
		return noticeservice.getnotice(session.getAttribute("USER_ID").toString());
	}//获取当前登录用户待接收的通知。
}
