package com.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.MessageService;

@Controller
public class MessageController {
	@Autowired
	private MessageService messageservice;
	@Autowired
	private HttpServletRequest request;
	
	@RequestMapping("/getrecentmessage")
	public @ResponseBody List<Map<String, Object>> getrecentmessage()
	{
		HttpSession session=request.getSession(false);
		return messageservice.getrecentmessage(session.getAttribute("USER_ID").toString(), request.getParameter("FRIEND_ID"));
	}//获取最近30天的一对一聊天消息。
	
	@RequestMapping("/getrecentgroupmessage")
	public @ResponseBody List<Map<String, Object>> getrecentgroupmessage()
	{
		return messageservice.getrecentgroupmessage(request.getParameter("G_ID"));
	}//获取最近30天的群聊天消息。
}
